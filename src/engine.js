/* ============================================================
   OBBY ACADEMY — 3D engine (Three.js).
   One renderer for the whole app. Worlds create scenes with
   createWorldScene(), spawn Kenney GLB props with Assets,
   build blocky avatars with buildCharacter(), and drive the
   player with CharacterController (the jumping feel lives
   there — coyote time, jump buffer, air control, squash &
   stretch). Nothing here knows about courses or questions.
   ============================================================ */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/* ---------------- renderer core ---------------- */

let renderer = null, clock = null, rafId = 0;
let activeScene = null, activeCamera = null, updateFn = null;
let lowGfx = false;

export function initEngine() {
  if (renderer) return;
  lowGfx = !!(window.ProfileStore && ProfileStore.settings().lowGfx);
  renderer = new THREE.WebGLRenderer({ antialias: !lowGfx, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowGfx ? 1 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = !lowGfx;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.getElementById("stage").appendChild(renderer.domElement);
  clock = new THREE.Clock();
  window.addEventListener("resize", onResize);
}

function onResize() {
  if (!renderer) return;
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (activeCamera) {
    activeCamera.aspect = window.innerWidth / window.innerHeight;
    activeCamera.updateProjectionMatrix();
  }
}

export function setQuality(low) {
  /* renderer AA can't change live — remember and rebuild on reload */
  lowGfx = low;
  if (!renderer) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 1.75));
  renderer.shadowMap.enabled = !low;
}
export function isLowGfx() { return lowGfx; }

/* Run a scene. updateFn(dt, elapsed) is called every frame. */
export function runScene(scene, camera, fn) {
  activeScene = scene; activeCamera = camera; updateFn = fn;
  onResize();
  if (!rafId) loop();
}

function loop() {
  rafId = requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05); /* clamp huge tab-switch deltas */
  if (updateFn) updateFn(dt, clock.elapsedTime);
  if (activeScene && activeCamera) renderer.render(activeScene, activeCamera);
}

export function stopScene() {
  updateFn = null; activeScene = null; activeCamera = null;
  if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  if (renderer) renderer.clear();
}

/* Manually advance one frame — used by automated tests where
   requestAnimationFrame doesn't tick (hidden tabs). */
let manualT = 0;
export function stepFrame(dt) {
  manualT += dt;
  if (updateFn) updateFn(dt, (clock ? clock.elapsedTime : 0) + manualT);
  if (renderer && activeScene && activeCamera) renderer.render(activeScene, activeCamera);
}

export function disposeScene(scene) {
  scene.traverse(function (o) {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    }
  });
}

/* ---------------- sky, lights, fog ---------------- */

const skyCache = {};
function gradientTexture(top, bottom) {
  const key = top + "_" + bottom;
  if (skyCache[key]) return skyCache[key];
  const c = document.createElement("canvas");
  c.width = 2; c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 2, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  skyCache[key] = tex;
  return tex;
}

/* theme: { skyTop, skyBottom, fog, sunColor?, ambient? } */
export function createWorldScene(theme) {
  const scene = new THREE.Scene();
  scene.background = gradientTexture(theme.skyTop || "#7ec8ff", theme.skyBottom || "#dff2ff");
  scene.fog = new THREE.Fog(new THREE.Color(theme.fog || theme.skyBottom || "#dff2ff"), 38, 95);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xb0c8e0, theme.ambient != null ? theme.ambient : 0.95);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(theme.sunColor || 0xfff2d0, 1.25);
  sun.position.set(14, 26, 10);
  if (!lowGfx) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -30; sun.shadow.camera.right = 30;
    sun.shadow.camera.top = 30; sun.shadow.camera.bottom = -30;
    sun.shadow.camera.far = 80;
    sun.shadow.bias = -0.0005;
  }
  scene.add(sun);
  scene.add(sun.target);
  return { scene: scene, sun: sun };
}

export function makeCamera() {
  return new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 300);
}

/* ---------------- Kenney GLB assets ---------------- */

const loader = new GLTFLoader();
const templates = {};

export const Assets = {
  /* preload a list of model names (assets/models/<name>.glb) */
  load: function (names) {
    return Promise.all(names.map(function (n) {
      if (templates[n]) return Promise.resolve();
      return new Promise(function (resolve) {
        loader.load("assets/models/" + n + ".glb", function (glb) {
          glb.scene.traverse(function (o) {
            if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
          });
          templates[n] = glb.scene;
          resolve();
        }, undefined, function () { templates[n] = null; resolve(); }); /* missing asset → caller falls back to primitives */
      });
    }));
  },
  has: function (n) { return !!templates[n]; },
  spawn: function (n) {
    if (!templates[n]) return null;
    return templates[n].clone(true);
  }
};

/* ---------------- blocky character ---------------- */

const FACE_CACHE = {};
function faceTexture(kind) {
  if (FACE_CACHE[kind]) return FACE_CACHE[kind];
  const c = document.createElement("canvas");
  c.width = 128; c.height = 128;
  const x = c.getContext("2d");
  x.fillStyle = "#1e293b";
  /* eyes */
  x.beginPath(); x.arc(40, 52, 9, 0, 7); x.fill();
  x.beginPath(); x.arc(88, 52, 9, 0, 7); x.fill();
  /* smile */
  x.strokeStyle = "#1e293b"; x.lineWidth = 7; x.lineCap = "round";
  x.beginPath(); x.arc(64, 68, 24, 0.25 * Math.PI, 0.75 * Math.PI); x.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  FACE_CACHE[kind] = tex;
  return tex;
}

export const AVATAR_COLORS = {
  skin:  ["#ffd7a8", "#f2b184", "#c98a5b", "#8d5a3a", "#ffe9c9"],
  shirt: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#14b8a6", "#ec4899", "#f8fafc"],
  pants: ["#1e3a8a", "#374151", "#166534", "#7c2d12", "#4c1d95", "#0e7490", "#be123c", "#111827"]
};

/* colors: {skin, shirt, pants} (hex strings). Returns a Group
   ~1.5 units tall with .parts for animation + .setColors(). */
export function buildCharacter(colors) {
  colors = colors || {};
  const g = new THREE.Group();
  const mats = {
    skin:  new THREE.MeshLambertMaterial({ color: colors.skin  || AVATAR_COLORS.skin[0] }),
    shirt: new THREE.MeshLambertMaterial({ color: colors.shirt || AVATAR_COLORS.shirt[1] }),
    pants: new THREE.MeshLambertMaterial({ color: colors.pants || AVATAR_COLORS.pants[0] })
  };
  function box(w, h, d, mat, x, y, z) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    g.add(m);
    return m;
  }
  const legL = box(0.22, 0.5, 0.24, mats.pants, -0.14, 0.25, 0);
  const legR = box(0.22, 0.5, 0.24, mats.pants,  0.14, 0.25, 0);
  const torso = box(0.55, 0.55, 0.32, mats.shirt, 0, 0.78, 0);
  const armL = box(0.16, 0.5, 0.2, mats.shirt, -0.38, 0.78, 0);
  const armR = box(0.16, 0.5, 0.2, mats.shirt,  0.38, 0.78, 0);
  const head = box(0.5, 0.46, 0.44, mats.skin, 0, 1.3, 0);
  /* face plate */
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.38),
    new THREE.MeshBasicMaterial({ map: faceTexture("happy"), transparent: true })
  );
  face.position.set(0, 1.3, 0.225);
  g.add(face);

  /* limbs pivot at their tops for swing animation */
  [legL, legR, armL, armR].forEach(function (limb) {
    limb.geometry.translate(0, -0.25, 0);
    limb.position.y += 0.25;
  });

  g.parts = { legL: legL, legR: legR, armL: armL, armR: armR, torso: torso, head: head, face: face };
  g.mats = mats;
  g.setColors = function (c) {
    if (c.skin) mats.skin.color.set(c.skin);
    if (c.shirt) mats.shirt.color.set(c.shirt);
    if (c.pants) mats.pants.color.set(c.pants);
  };
  /* walk-cycle + squash driver; call every frame */
  g.animate = function (dt, speed, grounded, squash) {
    g.walkT = (g.walkT || 0) + dt * (4 + speed * 2.2);
    const swing = grounded ? Math.sin(g.walkT) * Math.min(1, speed / 6) * 0.8 : 0.35;
    g.parts.legL.rotation.x = swing;
    g.parts.legR.rotation.x = -swing;
    g.parts.armL.rotation.x = -swing * 0.8;
    g.parts.armR.rotation.x = swing * 0.8;
    /* springy squash & stretch */
    g.scaleTarget = squash;
    g.scale.y += (squash - g.scale.y) * Math.min(1, dt * 14);
    g.scale.x = g.scale.z = 1 + (1 - g.scale.y) * 0.6;
  };
  return g;
}

/* ---------------- input (keyboard + touch) ---------------- */

export const Input = {
  x: 0, z: 0,             /* move intent, -1..1 (screen space; rotated by camera) */
  jumpPressed: false,     /* edge — consumed by the controller into its buffer */
  jumpHeld: false,
  orbit: { dx: 0, dy: 0 } /* accumulated camera drag since last frame */
};

const keys = {};
window.addEventListener("keydown", function (e) {
  if (e.repeat) return;
  keys[e.code] = true;
  if (e.code === "Space") { Input.jumpPressed = true; Input.jumpHeld = true; }
});
window.addEventListener("keyup", function (e) {
  keys[e.code] = false;
  if (e.code === "Space") Input.jumpHeld = false;
});

function keyboardAxes() {
  let x = 0, z = 0;
  if (keys.KeyA || keys.ArrowLeft) x -= 1;
  if (keys.KeyD || keys.ArrowRight) x += 1;
  if (keys.KeyW || keys.ArrowUp) z -= 1;
  if (keys.KeyS || keys.ArrowDown) z += 1;
  return { x: x, z: z };
}

/* Virtual joystick + JUMP button (created once, shown per run). */
let touchUI = null, joyState = { active: false, x: 0, z: 0 };
export const TouchUI = {
  show: function () {
    const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    if (touchUI) { touchUI.classList.remove("hidden"); return; }
    touchUI = document.createElement("div");
    touchUI.className = "touch3d-layer";
    touchUI.innerHTML =
      '<div class="joy-zone" id="joy-zone"><div class="joy-base" id="joy-base"><div class="joy-knob" id="joy-knob"></div></div></div>' +
      '<button class="jump-btn" id="jump-btn">JUMP</button>';
    document.getElementById("hud-root").appendChild(touchUI);

    const zone = touchUI.querySelector("#joy-zone");
    const base = touchUI.querySelector("#joy-base");
    const knob = touchUI.querySelector("#joy-knob");
    zone.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      zone.setPointerCapture(e.pointerId);
      joyState.active = true;
      base.style.left = (e.clientX - 60) + "px";
      base.style.top = (e.clientY - 60) + "px";
      base.classList.add("live");
      moveKnob(e);
    });
    function moveKnob(e) {
      const r = base.getBoundingClientRect();
      let dx = e.clientX - (r.left + 60), dy = e.clientY - (r.top + 60);
      const len = Math.sqrt(dx * dx + dy * dy);
      const max = 46;
      if (len > max) { dx = dx / len * max; dy = dy / len * max; }
      knob.style.transform = "translate(" + dx + "px," + dy + "px)";
      joyState.x = dx / max; joyState.z = dy / max;
    }
    zone.addEventListener("pointermove", function (e) { if (joyState.active) moveKnob(e); });
    function joyEnd() {
      joyState.active = false; joyState.x = 0; joyState.z = 0;
      knob.style.transform = "";
      base.classList.remove("live");
    }
    zone.addEventListener("pointerup", joyEnd);
    zone.addEventListener("pointercancel", joyEnd);

    const jb = touchUI.querySelector("#jump-btn");
    jb.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      Input.jumpPressed = true;
      Input.jumpHeld = true;
    });
    jb.addEventListener("pointerup", function () { Input.jumpHeld = false; });
    jb.addEventListener("pointercancel", function () { Input.jumpHeld = false; });
  },
  hide: function () {
    if (touchUI) touchUI.classList.add("hidden");
    joyState.active = false; joyState.x = 0; joyState.z = 0;
  }
};

/* camera orbit drag: anywhere on the stage that isn't UI */
(function () {
  let dragging = false, px = 0, py = 0;
  const stage = document.getElementById("stage");
  stage.addEventListener("pointerdown", function (e) {
    dragging = true; px = e.clientX; py = e.clientY;
  });
  window.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    Input.orbit.dx += (e.clientX - px);
    Input.orbit.dy += (e.clientY - py);
    px = e.clientX; py = e.clientY;
  });
  window.addEventListener("pointerup", function () { dragging = false; });
})();

/* ---------------- character controller ---------------- */

/* The obby feel. opts.collidables = array of meshes whose TOPS are
   walkable (each with userData.solid !== false). */
export function CharacterController(avatar, camera, opts) {
  const self = this;
  opts = opts || {};
  this.avatar = avatar;
  this.camera = camera;
  this.collidables = opts.collidables || [];
  this.pos = avatar.position;
  this.vel = new THREE.Vector3();
  this.grounded = false;
  this.groundObj = null;
  this.lastGroundedAt = -99;
  this.lastJumpAt = -99;
  this.spawn = (opts.spawn || new THREE.Vector3(0, 3, 0)).clone();
  this.frozen = false;
  this.squash = 1;
  this.yaw = opts.yaw != null ? opts.yaw : 0;   /* camera behind player (+Z), course runs toward -Z */
  this.pitch = 0.32;
  this.camDist = opts.camDist || 8.5;
  this.time = 0;
  this.onFall = opts.onFall || function () { self.respawn(); };

  const GRAVITY = -30, JUMP_V = 11.5, SPEED = 6.2;
  const COYOTE = 0.12, BUFFER = 0.16, AIR_CTRL = 0.7;
  const ray = new THREE.Raycaster();
  const DOWN = new THREE.Vector3(0, -1, 0);
  const prevPlatformPos = new THREE.Vector3();
  let jumpBufferT = 0; /* seconds left in which a queued press still fires */

  this.respawn = function (p) {
    const target = p || self.spawn;
    self.pos.copy(target);
    self.vel.set(0, 0, 0);
    self.grounded = false;
    self.squash = 1;
  };

  this.teleport = function (p, yaw) {
    self.respawn(p);
    if (yaw != null) self.yaw = yaw;
  };

  this.update = function (dt) {
    self.time += dt;
    const now = self.time;

    /* --- camera orbit from drag --- */
    self.yaw -= Input.orbit.dx * 0.0045;
    self.pitch = Math.max(0.08, Math.min(0.9, self.pitch + Input.orbit.dy * 0.003));
    Input.orbit.dx = 0; Input.orbit.dy = 0;

    /* --- input → world-space move dir (camera relative) --- */
    const ka = keyboardAxes();
    let ix = ka.x + joyState.x, iz = ka.z + joyState.z;
    const ilen = Math.sqrt(ix * ix + iz * iz);
    if (ilen > 1) { ix /= ilen; iz /= ilen; }
    const sin = Math.sin(self.yaw), cos = Math.cos(self.yaw);
    const moveX = self.frozen ? 0 : (ix * cos - iz * sin);
    const moveZ = self.frozen ? 0 : (ix * sin + iz * cos);
    const moving = !self.frozen && ilen > 0.08;

    /* --- horizontal velocity --- */
    const ctrl = self.grounded ? 1 : AIR_CTRL;
    const targetVx = moveX * SPEED, targetVz = moveZ * SPEED;
    const accel = self.grounded ? 20 : 11;
    self.vel.x += (targetVx - self.vel.x) * Math.min(1, accel * ctrl * dt);
    self.vel.z += (targetVz - self.vel.z) * Math.min(1, accel * ctrl * dt);

    /* --- jump: buffered + coyote time --- */
    if (Input.jumpPressed) { jumpBufferT = BUFFER; Input.jumpPressed = false; }
    else jumpBufferT = Math.max(0, jumpBufferT - dt);
    const wantJump = !self.frozen && jumpBufferT > 0;
    if (wantJump && (self.grounded || now - self.lastGroundedAt < COYOTE) && now - self.lastJumpAt > 0.2) {
      self.vel.y = JUMP_V;
      self.grounded = false;
      self.lastJumpAt = now;
      jumpBufferT = 0;
      self.squash = 1.18;
      if (window.Sound) Sound.jump();
    }
    /* variable jump height: release space early → shorter hop */
    if (!Input.jumpHeld && self.vel.y > 4) self.vel.y += GRAVITY * 1.1 * dt;

    /* --- gravity --- */
    self.vel.y += GRAVITY * dt;
    if (self.vel.y < -28) self.vel.y = -28;

    /* --- carry by moving platform (before own motion) --- */
    if (self.grounded && self.groundObj && self.groundObj.userData.isMoving) {
      const d = self.groundObj.position.clone().sub(prevPlatformPos);
      self.pos.add(d);
    }
    if (self.grounded && self.groundObj && self.groundObj.userData.convey) {
      self.pos.addScaledVector(self.groundObj.userData.convey, dt);
    }

    /* --- integrate --- */
    self.pos.x += self.vel.x * dt;
    self.pos.z += self.vel.z * dt;
    self.pos.y += self.vel.y * dt;

    /* --- ground check (raycast down from knee height) --- */
    self.groundObj = null;
    let wasGrounded = self.grounded;
    self.grounded = false;
    if (self.vel.y <= 0.01) {
      ray.set(new THREE.Vector3(self.pos.x, self.pos.y + 0.6, self.pos.z), DOWN);
      ray.far = 0.75 + Math.max(0, -self.vel.y) * dt;
      const solids = self.collidables.filter(function (m) { return m.userData.solid !== false; });
      const hits = ray.intersectObjects(solids, false);
      if (hits.length) {
        self.pos.y = hits[0].point.y;
        self.vel.y = 0;
        self.grounded = true;
        self.groundObj = hits[0].object;
        self.lastGroundedAt = now;
        if (!wasGrounded) { self.squash = 0.78; }
      }
    }
    if (self.groundObj) prevPlatformPos.copy(self.groundObj.position);

    /* --- fell off the world --- */
    if (self.pos.y < (opts.fallY != null ? opts.fallY : -12)) self.onFall();

    /* --- avatar facing + animation --- */
    if (moving) {
      const targetRot = Math.atan2(self.vel.x, self.vel.z);
      let d = targetRot - self.avatar.rotation.y;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      self.avatar.rotation.y += d * Math.min(1, dt * 12);
    }
    self.squash += (1 - self.squash) * Math.min(1, dt * 10);
    const hSpeed = Math.sqrt(self.vel.x * self.vel.x + self.vel.z * self.vel.z);
    self.avatar.animate(dt, hSpeed, self.grounded, self.squash);

    /* --- camera follow (smooth, slightly elevated) --- */
    const cx = self.pos.x + Math.sin(self.yaw) * Math.cos(self.pitch) * self.camDist;
    const cz = self.pos.z + Math.cos(self.yaw) * Math.cos(self.pitch) * self.camDist;
    const cy = self.pos.y + 1.2 + Math.sin(self.pitch) * self.camDist;
    const k = 1 - Math.pow(0.0001, dt); /* framerate-independent smoothing */
    self.camera.position.x += (cx - self.camera.position.x) * k;
    self.camera.position.y += (cy - self.camera.position.y) * k;
    self.camera.position.z += (cz - self.camera.position.z) * k;
    self.camera.lookAt(self.pos.x, self.pos.y + 1.4, self.pos.z);
  };
}
