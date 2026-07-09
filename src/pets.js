/* ============================================================
   PET SYSTEM — the retention engine 🐾
   Coins → eggs → wobble-wobble-CRACK → collectible low-poly
   pets that follow you through courses.

   ✏️ ADD A PET (no coding needed): copy one line in PET_SPECIES,
   change the name/colors, done. rarity: common/rare/epic/legendary.
   body: "round" or "box" · ears: cat/bunny/round/none ·
   extras: mane/antlers/horn/wings/beak/shell/mask/flame
   ============================================================ */
import * as THREE from "three";

export const RARITY = {
  common:    { label: "Common",    color: "#9ca3af", glow: "#e5e7eb" },
  rare:      { label: "Rare",      color: "#3b82f6", glow: "#93c5fd" },
  epic:      { label: "Epic",      color: "#a855f7", glow: "#d8b4fe" },
  legendary: { label: "LEGENDARY", color: "#f59e0b", glow: "#fde68a" }
};

export const PET_SPECIES = [
  /* --- common --- */
  { id: "cat",     name: "Cat",     rarity: "common", body: "box",   color: "#f59e0b", belly: "#fde68a", ears: "cat",   tail: "curl" },
  { id: "dog",     name: "Dog",     rarity: "common", body: "box",   color: "#a16207", belly: "#fef3c7", ears: "flop",  tail: "straight" },
  { id: "bunny",   name: "Bunny",   rarity: "common", body: "round", color: "#f8fafc", belly: "#fce7f3", ears: "bunny", tail: "puff" },
  { id: "duck",    name: "Duck",    rarity: "common", body: "round", color: "#fde047", ears: "none",  beak: true },
  { id: "chick",   name: "Chick",   rarity: "common", body: "round", color: "#fef08a", ears: "none",  beak: true },
  { id: "mouse",   name: "Mouse",   rarity: "common", body: "round", color: "#cbd5e1", belly: "#f1f5f9", ears: "round", tail: "straight" },
  { id: "piggy",   name: "Piggy",   rarity: "common", body: "box",   color: "#f9a8d4", ears: "cat",   tail: "curl", snout: true },
  { id: "froggy",  name: "Froggy",  rarity: "common", body: "round", color: "#4ade80", belly: "#d9f99d", ears: "none" },
  /* --- rare --- */
  { id: "fox",     name: "Fox",     rarity: "rare", body: "box",   color: "#fb923c", belly: "#ffedd5", ears: "cat",   tail: "puff" },
  { id: "owl",     name: "Owl",     rarity: "rare", body: "round", color: "#92400e", belly: "#fde68a", ears: "cat",  beak: true, wings: "small" },
  { id: "penguin", name: "Penguin", rarity: "rare", body: "round", color: "#1e293b", belly: "#f8fafc", ears: "none", beak: true, wings: "small" },
  { id: "turtle",  name: "Turtle",  rarity: "rare", body: "round", color: "#4ade80", ears: "none", shell: "#166534" },
  { id: "panda",   name: "Panda",   rarity: "rare", body: "box",   color: "#f8fafc", belly: "#f8fafc", ears: "round", mask: "#1e293b" },
  { id: "koala",   name: "Koala",   rarity: "rare", body: "round", color: "#94a3b8", belly: "#e2e8f0", ears: "round" },
  { id: "raccoon", name: "Raccoon", rarity: "rare", body: "box",   color: "#64748b", belly: "#e2e8f0", ears: "cat", mask: "#1e293b", tail: "puff" },
  /* --- epic --- */
  { id: "lion",    name: "Lion",    rarity: "epic", body: "box",   color: "#f59e0b", belly: "#fde68a", ears: "round", mane: "#b45309", tail: "straight" },
  { id: "wolf",    name: "Wolf",    rarity: "epic", body: "box",   color: "#6b7280", belly: "#e5e7eb", ears: "cat",   tail: "puff" },
  { id: "deer",    name: "Deer",    rarity: "epic", body: "box",   color: "#b45309", belly: "#fef3c7", ears: "flop",  antlers: true, tail: "puff" },
  { id: "robocat", name: "Robo-Cat", rarity: "epic", body: "box",  color: "#38bdf8", belly: "#0ea5e9", ears: "cat",   tail: "straight", robo: true },
  /* --- adventure pets (Year 3 launch) --- */
  { id: "gecko",   name: "Gecko",   rarity: "common", body: "box",   color: "#84cc16", belly: "#d9f99d", ears: "none", tail: "straight" },
  { id: "falcon",  name: "Falcon",  rarity: "rare",   body: "round", color: "#78350f", belly: "#fbbf24", ears: "none", beak: true, wings: "small" },
  { id: "shark",   name: "Shark",   rarity: "rare",   body: "box",   color: "#64748b", belly: "#f1f5f9", ears: "none", tail: "straight", horn: true },
  { id: "tiger",   name: "Tiger",   rarity: "epic",   body: "box",   color: "#f59e0b", belly: "#fde68a", ears: "round", mask: "#1e293b", tail: "straight" },
  { id: "raptor",  name: "Raptor",  rarity: "epic",   body: "box",   color: "#15803d", belly: "#bbf7d0", ears: "none", tail: "straight", antlers: true },
  /* --- science pets (Science World launch) --- */
  { id: "jellyfish", name: "Jellyfish", rarity: "common", body: "round", color: "#c4b5fd", belly: "#ede9fe", ears: "none", tail: "puff" },
  { id: "axolotl",   name: "Axolotl",   rarity: "rare",   body: "round", color: "#f9a8d4", belly: "#fce7f3", ears: "bunny", tail: "straight" },
  { id: "chameleon", name: "Chameleon", rarity: "rare",   body: "box",   color: "#84cc16", belly: "#d9f99d", ears: "round", tail: "curl" },
  { id: "octopus",   name: "Octopus",   rarity: "epic",   body: "round", color: "#f472b6", belly: "#fbcfe8", ears: "round", tail: "puff" },
  { id: "robobee",   name: "Robo-Bee",  rarity: "epic",   body: "round", color: "#fde047", belly: "#78350f", ears: "none", wings: "small", robo: true },
  /* --- legendary --- */
  { id: "dragon",  name: "Dragon",  rarity: "legendary", body: "box",   color: "#10b981", belly: "#a7f3d0", ears: "none", horn: true, wings: "big", tail: "straight" },
  { id: "unicorn", name: "Unicorn", rarity: "legendary", body: "box",   color: "#f8fafc", belly: "#fbcfe8", ears: "cat",  horn: true, mane: "#f0abfc", tail: "puff" },
  { id: "phoenix", name: "Phoenix", rarity: "legendary", body: "round", color: "#f97316", belly: "#fde047", ears: "none", beak: true, wings: "big", flame: true },
  { id: "goldtortoise", name: "Golden Tortoise", rarity: "legendary", body: "round", color: "#fbbf24", belly: "#fde68a", ears: "none", shell: "#b45309" },
  { id: "mechadragon", name: "Mecha-Dragon", rarity: "legendary", body: "box", color: "#38bdf8", belly: "#0ea5e9", ears: "cat", horn: true, wings: "big", tail: "straight", robo: true }
];

export const EGGS = {
  basic:   { name: "Basic Egg",   cost: 100, color: "#fef3c7", spot: "#86efac", odds: { common: 60, rare: 30, epic: 9,  legendary: 1 } },
  golden:  { name: "Golden Egg",  cost: 250, color: "#fcd34d", spot: "#f59e0b", odds: { common: 30, rare: 45, epic: 20, legendary: 5 } },
  mystery: { name: "Mystery Egg", cost: 500, color: "#7c3aed", spot: "#c4b5fd", odds: { common: 5,  rare: 40, epic: 40, legendary: 15 } }
};

/* ---------------- pet mesh builder (primitives) ---------------- */
function lam(c) { return new THREE.MeshLambertMaterial({ color: c }); }
function bx(g, w, h, d, c, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam(c));
  m.position.set(x, y, z); m.castShadow = true; g.add(m); return m;
}
function sp(g, r, c, x, y, z, sy) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), lam(c));
  m.position.set(x, y, z);
  if (sy) m.scale.y = sy;
  m.castShadow = true; g.add(m); return m;
}

export function buildPet(def) {
  const g = new THREE.Group();
  const C = def.color, B = def.belly || def.color;

  /* body + head */
  if (def.body === "round") {
    sp(g, 0.34, C, 0, 0.36, 0, 1.05);
    if (def.belly) sp(g, 0.26, B, 0, 0.32, 0.13);
    sp(g, 0.26, C, 0, 0.78, 0.02);
  } else {
    bx(g, 0.5, 0.42, 0.62, C, 0, 0.35, 0);
    if (def.belly) bx(g, 0.36, 0.3, 0.1, B, 0, 0.3, 0.29);
    bx(g, 0.42, 0.38, 0.4, C, 0, 0.75, 0.08);
    /* legs */
    bx(g, 0.13, 0.18, 0.13, C, -0.16, 0.09, 0.2);
    bx(g, 0.13, 0.18, 0.13, C, 0.16, 0.09, 0.2);
    bx(g, 0.13, 0.18, 0.13, C, -0.16, 0.09, -0.2);
    bx(g, 0.13, 0.18, 0.13, C, 0.16, 0.09, -0.2);
  }
  const headY = def.body === "round" ? 0.78 : 0.75;
  const headZ = def.body === "round" ? 0.02 : 0.08;

  /* face: eyes + nose */
  sp(g, 0.045, "#1e293b", -0.1, headY + 0.05, headZ + (def.body === "round" ? 0.23 : 0.2));
  sp(g, 0.045, "#1e293b", 0.1, headY + 0.05, headZ + (def.body === "round" ? 0.23 : 0.2));
  if (def.snout) bx(g, 0.16, 0.1, 0.08, "#f472b6", 0, headY - 0.03, headZ + 0.24);
  else if (def.beak) {
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 8), lam("#f59e0b"));
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, headY - 0.02, headZ + 0.3);
    g.add(beak);
  } else sp(g, 0.05, "#78350f", 0, headY - 0.04, headZ + (def.body === "round" ? 0.24 : 0.21));

  /* mask (panda/raccoon) */
  if (def.mask) {
    sp(g, 0.075, def.mask, -0.1, headY + 0.05, headZ + (def.body === "round" ? 0.19 : 0.16));
    sp(g, 0.075, def.mask, 0.1, headY + 0.05, headZ + (def.body === "round" ? 0.19 : 0.16));
    sp(g, 0.045, "#f8fafc", -0.1, headY + 0.06, headZ + (def.body === "round" ? 0.245 : 0.215));
    sp(g, 0.045, "#f8fafc", 0.1, headY + 0.06, headZ + (def.body === "round" ? 0.245 : 0.215));
  }

  /* ears */
  const earY = headY + 0.2, earZ = headZ;
  if (def.ears === "cat") {
    const e1 = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.16, 6), lam(C)); e1.position.set(-0.14, earY, earZ); g.add(e1);
    const e2 = e1.clone(); e2.position.x = 0.14; g.add(e2);
  } else if (def.ears === "bunny") {
    bx(g, 0.09, 0.34, 0.06, C, -0.11, earY + 0.1, earZ);
    bx(g, 0.09, 0.34, 0.06, C, 0.11, earY + 0.1, earZ);
  } else if (def.ears === "round") {
    sp(g, 0.09, def.mask || C, -0.16, earY, earZ);
    sp(g, 0.09, def.mask || C, 0.16, earY, earZ);
  } else if (def.ears === "flop") {
    bx(g, 0.09, 0.22, 0.07, C, -0.22, headY + 0.06, earZ);
    bx(g, 0.09, 0.22, 0.07, C, 0.22, headY + 0.06, earZ);
  }

  /* tail */
  if (def.tail === "curl") sp(g, 0.09, C, 0, 0.45, -0.36);
  else if (def.tail === "straight") bx(g, 0.08, 0.08, 0.3, C, 0, 0.45, -0.42);
  else if (def.tail === "puff") sp(g, 0.12, B, 0, 0.42, -0.38);

  /* extras */
  if (def.shell) sp(g, 0.3, def.shell, 0, 0.45, -0.05, 0.8);
  if (def.mane) {
    const mane = sp(g, 0.3, def.mane, 0, headY, headZ - 0.02);
    mane.scale.z = 0.7;
    sp(g, 0.26, C, 0, headY, headZ + 0.1); /* face pokes out */
    sp(g, 0.045, "#1e293b", -0.1, headY + 0.05, headZ + 0.32);
    sp(g, 0.045, "#1e293b", 0.1, headY + 0.05, headZ + 0.32);
  }
  if (def.antlers) {
    bx(g, 0.05, 0.24, 0.05, "#78350f", -0.13, earY + 0.1, earZ);
    bx(g, 0.14, 0.05, 0.05, "#78350f", -0.17, earY + 0.2, earZ);
    bx(g, 0.05, 0.24, 0.05, "#78350f", 0.13, earY + 0.1, earZ);
    bx(g, 0.14, 0.05, 0.05, "#78350f", 0.17, earY + 0.2, earZ);
  }
  if (def.horn) {
    const h = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.24, 6), lam("#fde047"));
    h.position.set(0, earY + 0.08, earZ + 0.08);
    g.add(h);
  }
  if (def.wings) {
    const s = def.wings === "big" ? 0.34 : 0.2;
    const w1 = bx(g, 0.06, s, s * 1.5, def.belly || "#f8fafc", -0.3, 0.55, -0.1);
    const w2 = bx(g, 0.06, s, s * 1.5, def.belly || "#f8fafc", 0.3, 0.55, -0.1);
    w1.rotation.z = 0.5; w2.rotation.z = -0.5;
  }
  if (def.robo) {
    const ant = bx(g, 0.03, 0.16, 0.03, "#0ea5e9", 0, earY + 0.12, earZ);
    sp(g, 0.05, "#f43f5e", 0, earY + 0.22, earZ);
  }
  if (def.flame) {
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 8), new THREE.MeshBasicMaterial({ color: "#fde047" }));
    f.position.set(0, 0.42, -0.44);
    f.rotation.x = -1.2;
    g.add(f);
  }
  return g;
}

/* ---------------- mini showcase renderer (hatch / collection / trophy) ---------------- */
let scRenderer = null, scScene = null, scCamera = null, scRaf = 0, scGroup = null, scSpin = true;

function showcaseCanvas(size) {
  if (!scRenderer) {
    scRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    scScene = new THREE.Scene();
    scCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    scCamera.position.set(0, 1.1, 2.6);
    scCamera.lookAt(0, 0.55, 0);
    scScene.add(new THREE.HemisphereLight(0xffffff, 0xb0c8e0, 1.1));
    const d = new THREE.DirectionalLight(0xfff2d0, 1.4);
    d.position.set(2, 4, 3);
    scScene.add(d);
  }
  scRenderer.setSize(size, size);
  scRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  return scRenderer.domElement;
}

function showcaseSet(group) {
  if (scGroup) scScene.remove(scGroup);
  scGroup = group;
  if (group) scScene.add(group);
  if (!scRaf) scLoop();
}
function scLoop() {
  scRaf = requestAnimationFrame(scLoop);
  if (scGroup && scSpin) scGroup.rotation.y += 0.02;
  if (scRenderer) scRenderer.render(scScene, scCamera);
}
function showcaseStop() {
  if (scRaf) { cancelAnimationFrame(scRaf); scRaf = 0; }
  if (scGroup) { scScene.remove(scGroup); scGroup = null; }
}
/* tests can step manually (hidden tabs have no RAF) */
export function _showcaseStep() { if (scGroup && scSpin) scGroup.rotation.y += 0.02; if (scRenderer) scRenderer.render(scScene, scCamera); }

/* generic mini-3D-viewer API (wardrobe preview etc.) */
export const Showcase = {
  canvas: function (size) { return showcaseCanvas(size); },
  set: function (group, spin) { scSpin = spin !== false; showcaseSet(group); },
  stop: showcaseStop,
  step: _showcaseStep
};

function buildEggMesh(tier) {
  const e = EGGS[tier];
  const g = new THREE.Group();
  const egg = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 12), lam(e.color));
  egg.scale.y = 1.3;
  egg.position.y = 0.55;
  g.add(egg);
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), lam(e.spot));
    const a = i / 5 * Math.PI * 2;
    s.position.set(Math.cos(a) * 0.36, 0.5 + Math.sin(i * 2.1) * 0.28, Math.sin(a) * 0.36);
    g.add(s);
  }
  return g;
}

function buildTrophy() {
  const g = new THREE.Group();
  const gold = "#fbbf24";
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 0.42, 14), lam(gold));
  cup.position.y = 0.85; g.add(cup);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.045, 8, 16), lam(gold));
  rim.rotation.x = Math.PI / 2; rim.position.y = 1.06; g.add(rim);
  const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 8, 14, Math.PI), lam(gold));
  h1.position.set(-0.4, 0.9, 0); h1.rotation.z = -Math.PI / 2; g.add(h1);
  const h2 = h1.clone(); h2.position.x = 0.4; h2.rotation.z = Math.PI / 2; g.add(h2);
  bx(g, 0.16, 0.22, 0.16, gold, 0, 0.55, 0);
  bx(g, 0.5, 0.14, 0.5, "#92400e", 0, 0.4, 0);
  bx(g, 0.62, 0.12, 0.62, "#78350f", 0, 0.28, 0);
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), new THREE.MeshBasicMaterial({ color: "#fde047" }));
  star.position.y = 1.28; g.add(star);
  return g;
}

/* ---------------- persistence helpers ---------------- */
function petsOf(profile) {
  if (!profile.pets) profile.pets = { owned: [], active: null };
  return profile.pets;
}
function uid() { return "pet" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

export function rollRarity(tier, rand) {
  const odds = EGGS[tier].odds;
  let r = (rand != null ? rand : Math.random()) * 100;
  for (const k of ["common", "rare", "epic", "legendary"]) {
    if (r < odds[k]) return k;
    r -= odds[k];
  }
  return "common";
}

function hatchSpecies(tier) {
  const rarity = rollRarity(tier);
  const pool = PET_SPECIES.filter(function (s) { return s.rarity === rarity; });
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ---------------- overlays ---------------- */
function overlay(cls, html) {
  const backdrop = document.createElement("div");
  backdrop.className = "q-backdrop";
  const box = document.createElement("div");
  box.className = "pet-box " + (cls || "");
  box.innerHTML = html;
  backdrop.appendChild(box);
  document.getElementById("overlay-root").appendChild(backdrop);
  return { backdrop: backdrop, box: box };
}

export const PetSystem = {

  buildActivePet: function (profile) {
    const pd = petsOf(profile);
    if (!pd.active) return null;
    const owned = pd.owned.find(function (o) { return o.uid === pd.active; });
    if (!owned) return null;
    const def = PET_SPECIES.find(function (s) { return s.id === owned.sp; });
    if (!def) return null;
    const pet = buildPet(def);
    pet.scale.setScalar(0.85);
    return pet;
  },

  grantEgg: function (profile, tier) {
    if (!profile.pendingEggs) profile.pendingEggs = [];
    profile.pendingEggs.push(tier);
    ProfileStore.saveProgress();
  },

  /* free-egg flow after first completion */
  offerHatch: function (profile, tier, onDone) {
    if (profile.pendingEggs && profile.pendingEggs.length) {
      tier = profile.pendingEggs.shift();
      ProfileStore.saveProgress();
    }
    PetSystem.hatch(profile, tier, onDone, true);
  },

  /* the suspense machine 🥚 */
  hatch: function (profile, tier, onDone, isFree) {
    const egg = EGGS[tier];
    const o = overlay("hatch-box",
      '<h2>' + (isFree ? "🎁 FREE EGG!" : "🥚 " + egg.name) + "</h2>" +
      '<div class="hatch-stage" id="hatch-stage"></div>' +
      '<div class="hatch-hint" id="hatch-hint">TAP THE EGG! 👆</div>');
    const stage = o.box.querySelector("#hatch-stage");
    const canvas = showcaseCanvas(Math.min(300, window.innerWidth - 120));
    stage.appendChild(canvas);
    const eggMesh = buildEggMesh(tier);
    scSpin = false;
    showcaseSet(eggMesh);

    let taps = 0;
    const hint = o.box.querySelector("#hatch-hint");
    function wobble() {
      let t = 0;
      const iv = setInterval(function () {
        t += 0.08;
        eggMesh.rotation.z = Math.sin(t * 24) * (0.25 + taps * 0.1);
        if (t > 0.45) { clearInterval(iv); eggMesh.rotation.z = 0; }
      }, 16);
    }

    stage.style.cursor = "pointer";
    stage.onclick = function () {
      taps++;
      Sound.bump();
      wobble();
      if (taps === 1) hint.textContent = "It's wobbling! Tap again! 👆";
      if (taps === 2) hint.textContent = "Something's coming!! 👆👆";
      if (taps >= 3) {
        stage.onclick = null;
        hint.textContent = "✨ CRACK! ✨";
        Sound.fanfare();
        setTimeout(function () {
          const sp = hatchSpecies(tier);
          const pd = petsOf(profile);
          const newPet = { uid: uid(), sp: sp.id, name: sp.name };
          pd.owned.push(newPet);
          if (!pd.active) pd.active = newPet.uid;
          ProfileStore.saveProgress();

          const petMesh = buildPet(sp);
          petMesh.scale.setScalar(1.35);
          scSpin = true;
          showcaseSet(petMesh);
          FX.confetti(sp.rarity === "legendary" ? 45 : 22);
          const r = RARITY[sp.rarity];
          hint.innerHTML =
            '<div class="rarity-tag" style="background:' + r.color + '">' + r.label + "</div>" +
            '<div class="pet-name-big">' + sp.name + "</div>";
          const btn = document.createElement("button");
          btn.className = "btn green";
          btn.textContent = "Awesome! 🎉";
          btn.onclick = function () {
            Sound.click();
            showcaseStop();
            o.backdrop.remove();
            if (onDone) onDone();
          };
          o.box.appendChild(btn);
        }, 500);
      }
    };
  },

  openShop: function (profile, onClose) {
    profile = ProfileStore.byId(profile.id);
    const o = overlay("shop-box",
      "<h2>🥚 Egg Shop</h2>" +
      '<div class="wallet big">🪙 <b>' + (profile.coins || 0) + "</b></div>" +
      '<div class="egg-grid">' +
      Object.keys(EGGS).map(function (k) {
        const e = EGGS[k];
        const can = (profile.coins || 0) >= e.cost;
        return '<div class="egg-card' + (can ? "" : " poor") + '" data-egg="' + k + '">' +
          '<div class="egg-art" style="background:' + e.color + ';border-color:' + e.spot + '">🥚</div>' +
          "<h3>" + e.name + "</h3>" +
          '<div class="egg-odds">' +
          Object.keys(e.odds).map(function (r) { return '<span style="color:' + RARITY[r].color + '">' + e.odds[r] + "%</span>"; }).join(" · ") +
          "</div>" +
          '<div class="egg-cost">🪙 ' + e.cost + "</div>" +
          "</div>";
      }).join("") +
      "</div>" +
      '<div class="form-actions"><button class="btn grey" id="shop-close">Close</button></div>');

    o.box.querySelector("#shop-close").onclick = function () { Sound.click(); o.backdrop.remove(); onClose(); };
    o.box.querySelectorAll(".egg-card:not(.poor)").forEach(function (card) {
      card.onclick = function () {
        const tier = card.getAttribute("data-egg");
        profile.coins -= EGGS[tier].cost;
        ProfileStore.saveProgress();
        Sound.coin();
        o.backdrop.remove();
        PetSystem.hatch(profile, tier, function () { PetSystem.openShop(profile, onClose); });
      };
    });
  },

  openCollection: function (profile, onClose) {
    profile = ProfileStore.byId(profile.id);
    const pd = petsOf(profile);
    const bySpecies = {};
    pd.owned.forEach(function (p) { (bySpecies[p.sp] = bySpecies[p.sp] || []).push(p); });

    let html = "<h2>🐾 My Pets (" + pd.owned.length + ")</h2>" + '<div class="pet-grid">';
    ["common", "rare", "epic", "legendary"].forEach(function (rar) {
      PET_SPECIES.filter(function (s) { return s.rarity === rar; }).forEach(function (s) {
        const owned = bySpecies[s.id];
        const isActive = owned && owned.some(function (p) { return p.uid === pd.active; });
        html += '<div class="pet-tile' + (owned ? " owned" : " unknown") + (isActive ? " active" : "") + '" data-sp="' + s.id + '" style="--glow:' + RARITY[s.rarity].color + '">' +
          '<div class="pet-dot" style="background:' + (owned ? s.color : "#334155") + '"></div>' +
          '<div class="pet-tile-name">' + (owned ? (owned[0].name + (owned.length > 1 ? " ×" + owned.length : "")) : "???") + "</div>" +
          (isActive ? '<div class="pet-equipped">FOLLOWING</div>' : "") +
          "</div>";
      });
    });
    html += "</div>" +
      '<div class="pet-detail hidden" id="pet-detail"></div>' +
      '<div class="form-actions"><button class="btn grey" id="pets-close">Close</button></div>';
    const o = overlay("pets-box", html);
    o.box.querySelector("#pets-close").onclick = function () { Sound.click(); showcaseStop(); o.backdrop.remove(); onClose(); };

    o.box.querySelectorAll(".pet-tile.owned").forEach(function (tile) {
      tile.onclick = function () {
        Sound.click();
        const spId = tile.getAttribute("data-sp");
        const s = PET_SPECIES.find(function (x) { return x.id === spId; });
        const mine = bySpecies[spId][0];
        const det = o.box.querySelector("#pet-detail");
        det.classList.remove("hidden");
        det.innerHTML =
          '<div class="pet-detail-stage" id="pd-stage"></div>' +
          '<div><div class="rarity-tag" style="background:' + RARITY[s.rarity].color + '">' + RARITY[s.rarity].label + "</div>" +
          '<input type="text" id="pd-name" maxlength="12" value="' + mine.name.replace(/"/g, "") + '">' +
          '<div class="form-actions">' +
          '<button class="btn green" id="pd-equip">' + (pd.active === mine.uid ? "✓ Following you" : "Follow me!") + "</button>" +
          '<button class="btn blue" id="pd-save">Save name</button>' +
          "</div></div>";
        const canvas = showcaseCanvas(170);
        det.querySelector("#pd-stage").appendChild(canvas);
        const mesh = buildPet(s);
        mesh.scale.setScalar(1.3);
        scSpin = true;
        showcaseSet(mesh);
        det.querySelector("#pd-equip").onclick = function () {
          pd.active = mine.uid;
          ProfileStore.saveProgress();
          Sound.correct();
          showcaseStop();
          o.backdrop.remove();
          PetSystem.openCollection(profile, onClose);
        };
        det.querySelector("#pd-save").onclick = function () {
          const v = det.querySelector("#pd-name").value.trim();
          if (v.length >= 2) {
            mine.name = v;
            ProfileStore.saveProgress();
            Sound.correct();
            FX.praise("Saved! 💛");
          }
        };
      };
    });
  },

  showTrophy: function (title, profile, onDone) {
    const o = overlay("trophy-box",
      "<h2>🏆 " + title + "</h2>" +
      '<div class="hatch-stage" id="trophy-stage"></div>' +
      '<div class="cert-name">' + (profile.avatar || "🙂") + " " + profile.name + "</div>" +
      '<div class="cert-text">completed EVERY course! Amazing!</div>');
    const canvas = showcaseCanvas(Math.min(280, window.innerWidth - 120));
    o.box.querySelector("#trophy-stage").appendChild(canvas);
    scSpin = true;
    showcaseSet(buildTrophy());
    Sound.fanfare();
    FX.confetti(45);
    const btn = document.createElement("button");
    btn.className = "btn green";
    btn.textContent = "Continue 🎉";
    btn.onclick = function () { Sound.click(); showcaseStop(); o.backdrop.remove(); onDone(); };
    o.box.appendChild(btn);
  }
};
