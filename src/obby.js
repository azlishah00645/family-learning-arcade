/* ============================================================
   OBBY ACADEMY — course runtime.
   Takes a course definition (list of elements) + questions and
   runs it: platforms (static / moving / vanishing / conveyor),
   spinning bars, coins, checkpoints, question checkpoints with
   barriers, finish portal, respawns, HUD, pet follower.
   Element types (built by the world's course generator):
     plat    { x,y,z, w,d, color, bob? }        static platform
     move    { ..., axis:"x"|"y", range, speed }  moving platform
     vanish  { ..., period, offset }             disappearing tile
     convey  { ..., dirX, dirZ, speed }          conveyor belt
     spin    { x,y,z, len, speed }               spinning bar (knockback)
     coin    { x,y,z }
     check   { x,y,z }                           checkpoint flag
     q       { x,y,z, facing? }                  question checkpoint + barrier
     finish  { x,y,z }
     island  { x,y,z, r, color }                 big round ground island
     deco    { model|prop, x,y,z, s?, ry?, color? }
   ============================================================ */
import * as THREE from "three";
import {
  initEngine, createWorldScene, makeCamera, runScene, stopScene,
  disposeScene, Assets, buildCharacter, CharacterController, TouchUI, Input
} from "./engine.js";

export const KENNEY_MODELS = [
  "coin", "flag", "grass", "grass-small", "cloud",
  "platform", "platform-medium", "platform-large", "platform-grass-large-round", "brick"
];

/* ---------- tiny helpers ---------- */
function lambert(color) { return new THREE.MeshLambertMaterial({ color: color }); }

function boxMesh(w, h, d, color) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert(color));
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

/* theme prop builders — chunky primitives, bright palette */
export const Props = {
  numberBlock: function (o) {
    const g = new THREE.Group();
    const b = boxMesh(1.6, 1.6, 1.6, o.color || "#f59e0b");
    g.add(b);
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const x = c.getContext("2d");
    x.fillStyle = "#ffffff"; x.font = "bold 90px Arial"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(String(o.n != null ? o.n : Math.floor(Math.random() * 99) + 1), 64, 70);
    const tex = new THREE.CanvasTexture(c);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    plane.position.z = 0.81;
    g.add(plane);
    return g;
  },
  pizza: function (o) {
    /* half or quarter pizza cylinder */
    const frac = o.frac || 0.5;
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.4, 20, 1, false, 0, Math.PI * 2 * frac), lambert("#fbbf24"));
    base.castShadow = true;
    g.add(base);
    const crust = new THREE.Mesh(new THREE.TorusGeometry(2, 0.22, 8, 20, Math.PI * 2 * frac), lambert("#d97706"));
    crust.rotation.x = Math.PI / 2;
    crust.position.y = 0.2;
    g.add(crust);
    for (let i = 0; i < Math.round(6 * frac); i++) {
      const a = (i + 0.5) / (6 * frac) * Math.PI * 2 * frac;
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 10), lambert("#ef4444"));
      p.position.set(Math.cos(a) * 1.2, 0.26, Math.sin(a) * 1.2);
      g.add(p);
    }
    return g;
  },
  bigCoin: function (o) {
    const g = new THREE.Group();
    const c = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.25, 22), lambert(o.color || "#fcd34d"));
    c.rotation.x = Math.PI / 2;
    c.castShadow = true;
    g.add(c);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.16, 8, 22), lambert("#b45309"));
    g.add(rim);
    g.userData.spinDeco = true;
    return g;
  },
  clockFace: function () {
    const g = new THREE.Group();
    const face = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.3, 24), lambert("#fef9c3"));
    face.rotation.x = Math.PI / 2;
    g.add(face);
    const hand1 = boxMesh(0.16, 1.5, 0.1, "#1e293b"); hand1.position.set(0, 0.75, 0.25); g.add(hand1);
    const hand2 = boxMesh(0.12, 1.1, 0.1, "#3b82f6"); hand2.rotation.z = -1.6; hand2.position.set(0.5, 0, 0.25); g.add(hand2);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.18, 8, 24), lambert("#b45309"));
    g.add(rim);
    return g;
  },
  shape: function (o) {
    const mats = lambert(o.color || "#a855f7");
    let geo;
    if (o.shape === "sphere") geo = new THREE.SphereGeometry(1.1, 14, 10);
    else if (o.shape === "cone") geo = new THREE.ConeGeometry(1.1, 1.9, 14);
    else if (o.shape === "cylinder") geo = new THREE.CylinderGeometry(0.9, 0.9, 1.8, 14);
    else geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const m = new THREE.Mesh(geo, mats);
    m.castShadow = true;
    return m;
  },
  ruler: function () {
    const g = new THREE.Group();
    const body = boxMesh(6, 0.3, 1.4, "#fde68a");
    g.add(body);
    for (let i = 0; i < 11; i++) {
      const tick = boxMesh(0.08, 0.08, i % 5 === 0 ? 0.8 : 0.45, "#92400e");
      tick.position.set(-2.75 + i * 0.55, 0.19, i % 5 === 0 ? -0.25 : -0.42);
      g.add(tick);
    }
    return g;
  },
  barTower: function (o) {
    const g = new THREE.Group();
    const h = o.h || 3;
    const b = boxMesh(1.6, h, 1.6, o.color || "#3b82f6");
    b.position.y = h / 2;
    g.add(b);
    return g;
  }
};

/* ============================================================
   runCourse(opts)
     theme, elements, questions[5], profile, coinFactor,
     petGroup?, onFinish(result), onExit()
   result = { firstTry, coins, questions:5 }
   ============================================================ */
export function runCourse(opts) {
  initEngine();
  const world = createWorldScene(opts.theme);
  const scene = world.scene;
  const camera = makeCamera();

  const collidables = [];
  const movers = [];      /* fn(dt, t) per animated element */
  const coins = [];
  const qPoints = [];
  const checkpoints = [];
  let finishObj = null;
  const effects = [];

  /* ---------- element builders ---------- */
  function platBase(e, color) {
    let mesh;
    /* Kenney platform models for standard sizes, tinted boxes otherwise */
    mesh = boxMesh(e.w || 3, 0.6, e.d || 3, color || e.color || opts.theme.platColor || "#8b5cf6");
    mesh.position.set(e.x, e.y - 0.3, e.z);
    scene.add(mesh);
    collidables.push(mesh);
    if (e.bob) {
      mesh.userData.isMoving = true;
      const baseY = mesh.position.y, ph = Math.random() * 6;
      movers.push(function (dt, t) { mesh.position.y = baseY + Math.sin(t * 0.9 + ph) * 0.18; });
    }
    return mesh;
  }

  const builders = {
    island: function (e) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(e.r || 6, (e.r || 6) * 0.75, 1.6, 18), lambert(e.color || opts.theme.islandColor || "#4ade80"));
      m.position.set(e.x, e.y - 0.8, e.z);
      m.receiveShadow = true;
      scene.add(m);
      collidables.push(m);
      /* skirt */
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry((e.r || 6) * 0.75, 0.7, 2.4, 12), lambert("#92623a"));
      skirt.position.set(e.x, e.y - 2.7, e.z);
      scene.add(skirt);
      if (Assets.has("grass")) {
        for (let i = 0; i < 3; i++) {
          const gr = Assets.spawn("grass");
          const a = Math.random() * 6.28, rr = (e.r || 6) * (0.3 + Math.random() * 0.5);
          gr.position.set(e.x + Math.cos(a) * rr, e.y, e.z + Math.sin(a) * rr);
          gr.scale.setScalar(1.4);
          scene.add(gr);
        }
      }
    },
    plat: platBase,
    move: function (e) {
      const m = platBase(e, e.color || "#f97316");
      m.userData.isMoving = true;
      const base = m.position.clone(), ph = e.offset || 0;
      movers.push(function (dt, t) {
        const s = Math.sin(t * (e.speed || 0.8) + ph) * (e.range || 3);
        if (e.axis === "y") m.position.y = base.y + Math.abs(s) * 0.6;
        else if (e.axis === "z") m.position.z = base.z + s;
        else m.position.x = base.x + s;
      });
    },
    vanish: function (e) {
      const m = platBase(e, e.color || "#22d3ee");
      m.material.transparent = true;
      const period = e.period || 3.6, off = e.offset || 0;
      movers.push(function (dt, t) {
        const ph = ((t + off) % period) / period;
        if (ph < 0.55) { m.userData.solid = true; m.material.opacity = 1; m.visible = true; }
        else if (ph < 0.7) { m.userData.solid = true; m.material.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 14)); } /* telegraph blink */
        else { m.userData.solid = false; m.material.opacity = 0.12; }
      });
    },
    convey: function (e) {
      const m = platBase(e, e.color || "#64748b");
      const dir = new THREE.Vector3(e.dirX || 0, 0, e.dirZ || 1).normalize().multiplyScalar(e.speed || 2);
      m.userData.convey = dir;
      /* stripes so the belt reads as moving */
      for (let i = 0; i < 3; i++) {
        const stripe = boxMesh((e.w || 3) * 0.86, 0.06, 0.3, "#fde047");
        stripe.position.set(e.x, e.y + 0.04, e.z);
        scene.add(stripe);
        const L = (e.d || 3);
        movers.push(function (dt, t) {
          const s = ((t * (e.speed || 2) + i * L / 3) % L) - L / 2;
          stripe.position.z = e.z + s * (e.dirZ >= 0 ? 1 : -1);
        });
      }
    },
    spin: function (e) {
      const pivot = new THREE.Group();
      pivot.position.set(e.x, e.y + 0.55, e.z);
      const bar = boxMesh(e.len || 5, 0.45, 0.45, "#ef4444");
      pivot.add(bar);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.7, 10), lambert("#7f1d1d"));
      pivot.add(hub);
      scene.add(pivot);
      movers.push(function (dt, t) { pivot.rotation.y = t * (e.speed || 1.6); });
      pivot.userData.knock = { len: (e.len || 5) / 2, y: e.y + 0.55 };
      spinners.push(pivot);
    },
    coin: function (e) {
      let m = Assets.spawn("coin");
      if (m) { m.scale.setScalar(1.5); }
      else {
        m = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 12), lambert("#fcd34d"));
        m.rotation.x = Math.PI / 2;
      }
      m.position.set(e.x, e.y + 0.8, e.z);
      scene.add(m);
      m.userData.baseY = e.y + 0.8;
      coins.push(m);
    },
    check: function (e) {
      addFlag(e, false);
    },
    q: function (e) {
      const flag = addFlag(e, true);
      /* barrier just behind the flag */
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(6, 4.4, 0.5),
        new THREE.MeshLambertMaterial({ color: "#a855f7", transparent: true, opacity: 0.55, emissive: "#7c3aed", emissiveIntensity: 0.5 })
      );
      const fx = e.facing || 0; /* barrier faces travel direction (z-) by default */
      wall.position.set(e.x, e.y + 2.2, e.z - 1.6);
      wall.rotation.y = fx;
      scene.add(wall);
      qPoints.push({ x: e.x, y: e.y, z: e.z, wall: wall, flag: flag, asked: false });
    },
    finish: function (e) {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.3, 10, 24), new THREE.MeshLambertMaterial({ color: "#22d3ee", emissive: "#0891b2", emissiveIntensity: 0.7 }));
      ring.position.y = 2.3;
      g.add(ring);
      const disc = new THREE.Mesh(new THREE.CircleGeometry(1.8, 24), new THREE.MeshBasicMaterial({ color: "#a5f3fc", transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
      disc.position.y = 2.3;
      g.add(disc);
      g.position.set(e.x, e.y, e.z);
      scene.add(g);
      movers.push(function (dt, t) { ring.rotation.y = t * 1.2; disc.rotation.z = -t; });
      finishObj = { x: e.x, y: e.y, z: e.z, group: g };
    },
    deco: function (e) {
      let m = null;
      if (e.model && Assets.has(e.model)) m = Assets.spawn(e.model);
      else if (e.prop && Props[e.prop]) m = Props[e.prop](e);
      if (!m) return;
      m.position.set(e.x, e.y, e.z);
      if (e.s) m.scale.setScalar(e.s);
      if (e.ry) m.rotation.y = e.ry;
      scene.add(m);
      if (m.userData.spinDeco) movers.push(function (dt, t) { m.rotation.y = t * 0.5; });
    }
  };

  const spinners = [];

  function addFlag(e, isQ) {
    let flag = Assets.spawn("flag");
    if (flag) { flag.scale.setScalar(1.6); }
    else {
      flag = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.6, 8), lambert("#64748b"));
      pole.position.y = 1.3;
      flag.add(pole);
      const cloth = boxMesh(1, 0.6, 0.06, isQ ? "#a855f7" : "#22c55e");
      cloth.position.set(0.55, 2.1, 0);
      flag.add(cloth);
    }
    flag.position.set(e.x + 1.6, e.y, e.z);
    scene.add(flag);
    /* glow ring on the ground */
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.1, 1.5, 24),
      new THREE.MeshBasicMaterial({ color: isQ ? "#c084fc" : "#86efac", transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(e.x, e.y + 0.06, e.z);
    scene.add(ring);
    movers.push(function (dt, t) { ring.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08); });
    if (!isQ) checkpoints.push({ x: e.x, y: e.y, z: e.z, reached: false, ring: ring });
    return flag;
  }

  /* ---------- build all elements ---------- */
  opts.elements.forEach(function (e) { if (builders[e.t]) builders[e.t](e); });

  /* decorative clouds */
  for (let i = 0; i < 8; i++) {
    let cl = Assets.spawn("cloud");
    if (!cl) { cl = boxMesh(3, 1, 1.6, "#ffffff"); }
    cl.position.set(-30 + Math.random() * 60, 10 + Math.random() * 8, -Math.random() * 80);
    cl.scale.setScalar(2 + Math.random() * 2);
    scene.add(cl);
    (function (c, sp) { movers.push(function (dt) { c.position.x += sp * dt; if (c.position.x > 45) c.position.x = -45; }); })(cl, 0.4 + Math.random() * 0.5);
  }

  /* ---------- player ---------- */
  const avatar = buildCharacter(opts.profile.colors || {});
  scene.add(avatar);
  const spawnAt = new THREE.Vector3(opts.spawn ? opts.spawn.x : 0, (opts.spawn ? opts.spawn.y : 0) + 0.2, opts.spawn ? opts.spawn.z : 0);
  avatar.position.copy(spawnAt);
  let respawnPoint = spawnAt.clone();

  const ctrl = new CharacterController(avatar, camera, {
    collidables: collidables,
    spawn: spawnAt,
    fallY: (opts.fallY != null ? opts.fallY : -12),
    onFall: function () { knockback("Oops! Try again 😄"); }
  });
  camera.position.set(spawnAt.x, spawnAt.y + 6, spawnAt.z + 9);

  /* ---------- pet follower ---------- */
  let pet = opts.petGroup || null;
  if (pet) {
    scene.add(pet);
    pet.position.copy(spawnAt).add(new THREE.Vector3(-1.4, 0, 1.2));
  }

  /* ---------- HUD ---------- */
  const hud = document.createElement("div");
  hud.className = "obby-hud";
  hud.innerHTML =
    '<button class="btn small grey" id="obby-exit">✖</button>' +
    '<span class="hud-course">' + opts.title + "</span>" +
    '<span class="hud-coins">🪙 <b id="hud-coins">0</b></span>';
  document.getElementById("hud-root").appendChild(hud);
  TouchUI.show();

  let running = true, finished = false;
  let coinCount = 0;
  const results = [];
  const t0 = performance.now();

  function toast(msg, cls) {
    const el = document.createElement("div");
    el.className = "obby-toast " + (cls || "");
    el.textContent = msg;
    document.getElementById("hud-root").appendChild(el);
    setTimeout(function () { el.remove(); }, 1400);
  }

  function addCoins(n) {
    coinCount += n;
    const el = document.getElementById("hud-coins");
    if (el) {
      el.textContent = coinCount;
      el.parentElement.classList.remove("bump");
      void el.parentElement.offsetWidth;
      el.parentElement.classList.add("bump");
    }
  }

  function sparkle(pos, color, n) {
    for (let i = 0; i < (n || 14); i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), new THREE.MeshBasicMaterial({ color: color || "#fde047" }));
      p.position.copy(pos);
      scene.add(p);
      const v = new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6 + 2, (Math.random() - 0.5) * 6);
      effects.push({ mesh: p, vel: v, life: 0.9 });
    }
  }

  function knockback(msg) {
    Sound.bump();
    ctrl.respawn(respawnPoint);
    if (msg) toast(msg);
    const flash = document.createElement("div");
    flash.className = "respawn-flash";
    document.getElementById("hud-root").appendChild(flash);
    setTimeout(function () { flash.remove(); }, 350);
  }

  function cleanup() {
    running = false;
    stopScene();
    TouchUI.hide();
    hud.remove();
    disposeScene(scene);
  }

  hud.querySelector("#obby-exit").onclick = function () {
    Sound.click();
    cleanup();
    opts.onExit();
  };

  /* ---------- question checkpoint ---------- */
  let asking = false;
  function askQuestion(qp, idx) {
    asking = true;
    qp.asked = true;
    ctrl.frozen = true;
    respawnPoint = new THREE.Vector3(qp.x, qp.y + 0.2, qp.z);
    Sound.coin();
    const q = opts.questions[idx];
    /* a checkpoint can be an MCQ or an interactive STATION (science) */
    const runner = (q && q.type === "station" && window.Stations)
      ? window.Stations.run(q.station, q.config, { index: idx + 1, total: opts.questions.length })
      : QuestionPopup.show(q, { index: idx + 1, total: opts.questions.length });
    runner
      .then(function (res) {
        results[idx] = !!res.firstTry;
        addCoins(opts.coinFactor < 1 ? 5 : 10);
        toast(res.firstTry ? "+10 🪙 First try! 🌟" : "+ coins 🪙 You got it!", "good");
        sparkle(new THREE.Vector3(qp.x, qp.y + 2, qp.z - 1.6), "#c084fc", 22);
        Sound.fanfare();
        /* dissolve the barrier */
        const wall = qp.wall;
        effects.push({
          custom: function (dt) {
            wall.material.opacity -= dt * 1.4;
            wall.position.y += dt * 2.5;
            if (wall.material.opacity <= 0) { scene.remove(wall); return false; }
            return true;
          }
        });
        const wi = collidables.indexOf(qp.wallCollider);
        ctrl.frozen = false;
        asking = false;
      });
  }

  /* ---------- main loop ---------- */
  const petTarget = new THREE.Vector3();
  runScene(scene, camera, function (dt, t) {
    if (!running) return;
    ctrl.update(dt);
    movers.forEach(function (fn) { fn(dt, t); });

    /* coins */
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      c.rotation.y += dt * 3;
      c.position.y = c.userData.baseY + Math.sin(t * 2 + i) * 0.12;
      if (c.position.distanceTo(ctrl.pos) < 1.25) {
        sparkle(c.position, "#fde047", 8);
        Sound.coin();
        addCoins(1);
        scene.remove(c);
        coins.splice(i, 1);
      }
    }

    /* plain checkpoints */
    checkpoints.forEach(function (cp) {
      if (!cp.reached && Math.abs(ctrl.pos.x - cp.x) < 2 && Math.abs(ctrl.pos.z - cp.z) < 2 && Math.abs(ctrl.pos.y - cp.y) < 2.5) {
        cp.reached = true;
        cp.ring.material.color.set("#fde047");
        respawnPoint = new THREE.Vector3(cp.x, cp.y + 0.2, cp.z);
        Sound.correct();
        toast("Checkpoint! 🚩", "good");
        sparkle(new THREE.Vector3(cp.x, cp.y + 1.5, cp.z), "#86efac", 12);
      }
    });

    /* question checkpoints */
    if (!asking) {
      for (let i = 0; i < qPoints.length; i++) {
        const qp = qPoints[i];
        if (!qp.asked && Math.abs(ctrl.pos.x - qp.x) < 2.2 && Math.abs(ctrl.pos.z - qp.z) < 2.2 && Math.abs(ctrl.pos.y - qp.y) < 2.5) {
          askQuestion(qp, i);
          break;
        }
      }
    }

    /* spinners knockback */
    if (!asking) {
      for (let i = 0; i < spinners.length; i++) {
        const sp = spinners[i];
        const local = ctrl.pos.clone().sub(sp.position);
        local.applyAxisAngle(new THREE.Vector3(0, 1, 0), -sp.rotation.y);
        if (Math.abs(local.x) < sp.userData.knock.len && Math.abs(local.z) < 0.7 &&
            ctrl.pos.y > sp.position.y - 1.2 && ctrl.pos.y < sp.position.y + 1) {
          knockback("Bonk! Back to the flag 🙃");
          break;
        }
      }
    }

    /* finish portal */
    if (finishObj && !finished && !asking &&
        Math.abs(ctrl.pos.x - finishObj.x) < 2 && Math.abs(ctrl.pos.z - finishObj.z) < 1.6 &&
        ctrl.pos.y > finishObj.y - 1 && ctrl.pos.y < finishObj.y + 4) {
      finished = true;
      ctrl.frozen = true;
      Sound.fanfare();
      sparkle(new THREE.Vector3(finishObj.x, finishObj.y + 2, finishObj.z), "#22d3ee", 30);
      FX.confetti(30);
      setTimeout(function () {
        cleanup();
        opts.onFinish({
          firstTry: results.filter(Boolean).length,
          total: opts.questions.length,
          coins: coinCount,
          timeSec: Math.round((performance.now() - t0) / 1000)
        });
      }, 900);
    }

    /* effects */
    for (let i = effects.length - 1; i >= 0; i--) {
      const fx = effects[i];
      if (fx.custom) {
        if (!fx.custom(dt)) effects.splice(i, 1);
        continue;
      }
      fx.life -= dt;
      fx.vel.y -= 14 * dt;
      fx.mesh.position.addScaledVector(fx.vel, dt);
      fx.mesh.rotation.x += dt * 6; fx.mesh.rotation.y += dt * 7;
      if (fx.life <= 0) { scene.remove(fx.mesh); effects.splice(i, 1); }
    }

    /* pet follow: bob along behind the player, teleport if left behind */
    if (pet) {
      petTarget.set(
        ctrl.pos.x - Math.sin(avatar.rotation.y) * 1.6 - 0.7,
        ctrl.pos.y,
        ctrl.pos.z - Math.cos(avatar.rotation.y) * 1.6 + 0.4
      );
      const d = pet.position.distanceTo(petTarget);
      if (d > 15) pet.position.copy(petTarget);
      else {
        const k = Math.min(1, dt * (d > 4 ? 6 : 3.2));
        pet.position.lerp(petTarget, k);
      }
      pet.position.y = petTarget.y + 0.25 + Math.abs(Math.sin(t * 5)) * 0.18; /* happy bob */
      pet.rotation.y = avatar.rotation.y;
    }
  });

  const handle = {
    /* handles for automated tests */
    _ctrl: ctrl,
    _questions: opts.questions,
    _qPoints: qPoints,
    _coins: coins,
    _checkpoints: checkpoints,
    _finish: function () { return finishObj; },
    _cleanup: cleanup
  };
  window.__obbyRun = handle; /* test hook */
  return handle;
}
