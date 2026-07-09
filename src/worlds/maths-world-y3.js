/* ============================================================
   YEAR 3 MATHS WORLD — 9 obby courses = Year 3 KSSR Semakan
   Maths chapters. Registered {grade:"Year 3", subject:"maths"}.

   Tuned for a 9-year-old: faster movers, longer jumps, vanish
   combos, a vertical climbing segment per course, and a
   SPEED-RUN TIMER with personal bests (bragging rights only).

   10 checkpoints per course in RISING difficulty (1-4 easy,
   5-7 medium, 8-10 hard). Checkpoints 4 and 8 are STATIONS
   (build-the-number, sifir sprint, cashier, clock setter…).
   8 MCQs mix the procedural engine (C1–C4) with the fixed bank.
   PASS ≥7/10 first-try · 10 = 3⭐ · 8-9 = 2⭐ · 7 = 1⭐.
   ============================================================ */
import * as THREE from "three";
import { runCourse, Props, KENNEY_MODELS } from "../obby.js";
import { Assets, initEngine } from "../engine.js";
import { PetSystem } from "../pets.js";
import "../stations-y3.js";

export const Y3_COURSES = [
  { id: "C1", chapter: "Numbers up to 10 000",            name: "Summit of Thousands", emoji: "🏔️", station: "buildNumber",
    theme: { skyTop: "#3b82f6", skyBottom: "#dbeafe", fog: "#dbeafe", islandColor: "#94a3b8", platColor: "#64748b", props: ["numberBlock", "peakY3"], climb: true } },
  { id: "C2", chapter: "Add, Subtract, Multiply, Divide", name: "Operation Volcano",   emoji: "🌋", station: "sifirSprint",
    theme: { skyTop: "#7f1d1d", skyBottom: "#fb923c", fog: "#fdba74", islandColor: "#44403c", platColor: "#292524", props: ["lavaRock", "numberBlock"], ambient: 1.1 } },
  { id: "C3", chapter: "Fractions, Decimals & %",         name: "Slice Station",       emoji: "🛰️", station: "sliceMatch",
    theme: { skyTop: "#1e1b4b", skyBottom: "#6d28d9", fog: "#4c1d95", islandColor: "#6366f1", platColor: "#4338ca", props: ["pizza", "crystal"], space: true, ambient: 1.15 } },
  { id: "C4", chapter: "Money",                           name: "Bazaar Rush",         emoji: "🏮", station: "cashier",
    theme: { skyTop: "#312e81", skyBottom: "#f59e0b", fog: "#fbbf24", islandColor: "#b45309", platColor: "#78350f", props: ["bigCoin", "stall"] } },
  { id: "C5", chapter: "Time",                            name: "Chrono Canyon",       emoji: "⏳", station: "clockSetter",
    theme: { skyTop: "#c2410c", skyBottom: "#fed7aa", fog: "#fed7aa", islandColor: "#ea580c", platColor: "#9a3412", props: ["clockFace"] } },
  { id: "C6", chapter: "Length, Mass & Volume",           name: "Mega Lab Gauntlet",   emoji: "⚖️", station: "measureIt",
    theme: { skyTop: "#0f766e", skyBottom: "#99f6e4", fog: "#99f6e4", islandColor: "#14b8a6", platColor: "#115e59", props: ["ruler", "beakerY3"] } },
  { id: "C7", chapter: "Shapes",                          name: "Prism Peaks",         emoji: "🔮", station: "shapeFactory",
    theme: { skyTop: "#581c87", skyBottom: "#f0abfc", fog: "#e9d5ff", islandColor: "#a855f7", platColor: "#7e22ce", props: ["crystal", "shape"] } },
  { id: "C8", chapter: "Location",                        name: "Grid City Heist",     emoji: "🏙️", station: "treasureGrid",
    theme: { skyTop: "#0c4a6e", skyBottom: "#7dd3fc", fog: "#bae6fd", islandColor: "#475569", platColor: "#334155", props: ["barTower"] } },
  { id: "C9", chapter: "Data",                            name: "Stat Stadium",        emoji: "🏟️", station: "chartBuilder",
    theme: { skyTop: "#166534", skyBottom: "#bbf7d0", fog: "#bbf7d0", islandColor: "#22c55e", platColor: "#15803d", props: ["barTower", "shape"] } }
];

/* ---------- extra Y3 props ---------- */
function lam(c) { return new THREE.MeshLambertMaterial({ color: c }); }
Props.lavaRock = function () {
  const g = new THREE.Group();
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8), lam("#292524"));
  rock.position.y = 0.7; g.add(rock);
  const glow = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45), new THREE.MeshBasicMaterial({ color: "#f97316" }));
  glow.position.y = 0.7; g.add(glow);
  return g;
};
Props.crystal = function () {
  const g = new THREE.Group();
  const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.8), new THREE.MeshLambertMaterial({ color: "#c084fc", emissive: "#7e22ce", emissiveIntensity: 0.5 }));
  c.position.y = 1.4;
  c.scale.y = 1.6;
  g.add(c);
  g.userData.spinDeco = true;
  return g;
};
Props.stall = function () {
  const g = new THREE.Group();
  const table = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 1), lam("#92400e"));
  table.position.y = 0.8; g.add(table);
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), lam("#78350f")); leg1.position.set(-0.7, 0.4, 0); g.add(leg1);
  const leg2 = leg1.clone(); leg2.position.x = 0.7; g.add(leg2);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.4, 0.7, 4), lam(Math.random() < 0.5 ? "#ef4444" : "#f59e0b"));
  roof.position.y = 2; roof.rotation.y = Math.PI / 4; g.add(roof);
  return g;
};
Props.beakerY3 = function () {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.5, 1.4, 12, 1, true),
    new THREE.MeshLambertMaterial({ color: "#bae6fd", transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
  glass.position.y = 0.7; g.add(glass);
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.46, 0.6, 12), lam("#22d3ee"));
  liquid.position.y = 0.4; g.add(liquid);
  return g;
};
Props.peakY3 = function () {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.ConeGeometry(1.3, 2.8, 6), lam("#64748b"));
  m.position.y = 1.4; g.add(m);
  const snow = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.1, 6), lam("#f8fafc"));
  snow.position.y = 2.3; g.add(snow);
  return g;
};

/* ---------- seeded rng + generator (harder than Year 1) ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function generateCourse(courseIdx) {
  const def = Y3_COURSES[courseIdx];
  const rng = mulberry32(7000 + courseIdx * 53);
  const th = def.theme;
  const els = [];
  const climb = !!th.climb;

  const jumpsPerSeg = 5 + Math.floor(courseIdx / 3);   /* 5..7 — longer runs */
  const gap = 3.4 + courseIdx * 0.12;                  /* wider jumps than Y1 */

  let x = 0, y = 0, z = 0;
  els.push({ t: "island", x: 0, y: 0, z: 0, r: 6 });
  themeProps(0, 0, 0, 6, 3);
  z -= 6.5;

  function themeProps(cx, cy, cz, r, n) {
    for (let i = 0; i < n; i++) {
      const kind = th.props[Math.floor(rng() * th.props.length)];
      const a = rng() * Math.PI * 2, rr = r * (0.45 + rng() * 0.4);
      const e = { t: "deco", prop: kind, x: cx + Math.cos(a) * rr, y: cy, z: cz + Math.sin(a) * rr, ry: rng() * 6 };
      if (kind === "numberBlock") e.n = Math.floor(rng() * 8999) + 1000;
      if (kind === "shape") {
        e.shape = ["cube", "sphere", "cone", "cylinder"][Math.floor(rng() * 4)];
        e.color = ["#f472b6", "#60a5fa", "#4ade80", "#facc15"][Math.floor(rng() * 4)];
        e.y = cy + 1;
      }
      if (kind === "pizza") { e.frac = rng() < 0.5 ? 0.5 : 0.25; e.y = cy + 0.3; }
      if (kind === "bigCoin") e.y = cy + 1.6;
      if (kind === "barTower") { e.h = 2 + rng() * 5; e.color = ["#f59e0b", "#3b82f6", "#ef4444"][Math.floor(rng() * 3)]; }
      if (kind === "clockFace") e.y = cy + 2.6;
      if (kind === "ruler") e.y = cy + 0.2;
      els.push(e);
    }
  }

  for (let seg = 0; seg < 5; seg++) {
    const canMove = seg >= 0 && courseIdx + seg >= 1;      /* movers almost everywhere */
    const canVanish = courseIdx >= 2 || seg >= 3;
    const canConvey = courseIdx >= 3 && seg >= 2;
    const speedMul = 1 + courseIdx * 0.06 + seg * 0.06;    /* everything faster */

    /* segment 2 of every course = vertical climbing section */
    const vertical = seg === 2 && !climb;

    for (let j = 0; j < jumpsPerSeg; j++) {
      if (vertical) {
        /* tight upward stack, then it comes back down at the checkpoint */
        z -= 2.4;
        x += (rng() - 0.5) * 2.6;
        x = Math.max(-7, Math.min(7, x));
        y += 1.1;
      } else {
        z -= gap + rng() * 1.1;
        x += (rng() - 0.5) * 3.8;
        x = Math.max(-8, Math.min(8, x));
        if (climb) y += 0.8;
        else y = Math.max(0, y + (rng() - 0.5) * (0.8 + seg * 0.2));
      }

      const roll = rng();
      if (canVanish && roll < 0.2) {
        els.push({ t: "vanish", x: x, y: y, z: z, w: 2.8, d: 2.8, period: 3.4 - seg * 0.15, offset: rng() * 3 });
      } else if (canMove && roll < 0.42 && !vertical) {
        z -= 1.4;
        els.push({ t: "move", x: x, y: y, z: z, w: 2.8, d: 2.8, axis: rng() < 0.65 ? "x" : "z", range: 2.4 + rng() * 1.6, speed: 0.9 * speedMul, offset: rng() * 6 });
      } else if (canConvey && roll < 0.52) {
        els.push({ t: "convey", x: x, y: y, z: z, w: 3.2, d: 7, dirZ: rng() < 0.5 ? 1 : -1, speed: 2 });
        z -= 2.5;
      } else {
        els.push({ t: "plat", x: x, y: y, z: z, w: 2.6 + rng() * 1.2, d: 2.6 + rng() * 1, bob: rng() < 0.35 });
      }
      if (rng() < 0.6) els.push({ t: "coin", x: x, y: y, z: z });

      /* mid-segment question checkpoint */
      if (j === Math.floor(jumpsPerSeg / 2)) {
        z -= gap;
        if (vertical) y += 0.5;
        els.push({ t: "plat", x: x, y: y, z: z, w: 5, d: 4.5 });
        els.push({ t: "q", x: x, y: y, z: z });
      }
    }

    /* come back down after a vertical section */
    if (vertical) y = Math.max(0, y - jumpsPerSeg * 0.7);

    z -= gap + 1.5;
    x *= 0.5;
    els.push({ t: "island", x: x, y: y, z: z, r: 4 });
    els.push({ t: "q", x: x, y: y, z: z });
    themeProps(x, y, z, 4, 1);
    if (seg >= 1) {
      els.push({ t: "spin", x: x, y: y, z: z + 2.8, len: 4.8, speed: (1.3 + seg * 0.2) * (1 + courseIdx * 0.05) });
    }
    z -= 5;
  }

  z -= gap;
  els.push({ t: "island", x: 0, y: y, z: z - 2, r: 5.5 });
  els.push({ t: "finish", x: 0, y: y, z: z - 2 });
  themeProps(0, y, z - 2, 5, 3);
  return els;
}

/* ---------- 10 graded checkpoints: 8 MCQ + stations at 4 & 8 ----------
   Slots: 1,2,3 easy MCQ · 4 STATION · 5,6,7 medium MCQ ·
          8 STATION · 9,10 hard MCQ.
   MCQs mix the procedural engine (C1-C4, ~50%) with the fixed bank. */
const PASS_NEED = 7;

function sample(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a.slice(0, n);
}

function mcq(courseId, difficulty) {
  const gen = window.Y3MathEngine.generate(courseId, difficulty);
  const bank = (window.Y3_MATHS_QUESTIONS || []).filter(function (q) {
    return q.course === courseId && q.difficulty === difficulty;
  });
  if (gen && (Math.random() < 0.5 || !bank.length)) {
    gen.difficulty = difficulty;
    return gen;
  }
  const q = bank[Math.floor(Math.random() * bank.length)];
  return q || gen;
}

const STATION_DATA = function (courseId) {
  const S = window.Y3_MATHS_STATIONS || {};
  return S[courseId] || {};
};

function stationEntry(def, difficulty) {
  const data = STATION_DATA(def.id);
  const cfg = { title: def.name + " Challenge" };
  let type = def.station;
  if (type === "cashier") { cfg.items = data.items || []; cfg.title = "Bazaar Cashier"; }
  if (type === "clockSetter") { cfg.times = data.times || []; cfg.title = "Clock Setter"; }
  if (type === "measureIt") { cfg.tasks = data.tasks || []; cfg.tools = data.tools || []; cfg.title = "Measure It!"; }
  if (type === "shapeFactory") { type = "dragTargets"; cfg.targets = data.targets; cfg.items = sample(data.items, 5); cfg.title = "Shape Factory"; }
  if (type === "chartBuilder") { cfg.datasets = data.datasets || []; cfg.title = "Chart Builder"; }
  if (type === "buildNumber") cfg.title = "Build The Number";
  if (type === "sifirSprint") cfg.title = "Sifir Sprint";
  if (type === "sliceMatch") cfg.title = "Slice & Match";
  if (type === "treasureGrid") cfg.title = "Treasure Grid";
  return { type: "station", station: type, config: cfg, difficulty: difficulty };
}

function pickQuestions(def) {
  const easy = [mcq(def.id, 1), mcq(def.id, 1), mcq(def.id, 1)];
  const med = [mcq(def.id, 2), mcq(def.id, 2), mcq(def.id, 2)];
  const hard = [mcq(def.id, 3), mcq(def.id, 3)];
  return [
    easy[0], easy[1], easy[2], stationEntry(def, 1),
    med[0], med[1], med[2],
    stationEntry(def, 3), hard[0], hard[1]
  ];
}

/* ---------- progress ---------- */
const GAME_ID = "maths-world-y3";
function prog(profile) { return ProfileStore.getProgress(profile.id, GAME_ID); }
function courseData(p, id) { return (p && p.levels && p.levels[id]) || null; }
function isUnlocked(profile, i) {
  if (i === 0) return true;
  if (ProfileStore.settings().parentUnlock) return true;
  const prev = courseData(prog(profile), Y3_COURSES[i - 1].id);
  return !!(prev && prev.passed);
}
function fmtTime(s) {
  if (s == null) return "—";
  return Math.floor(s / 60) + ":" + ("0" + Math.floor(s % 60)).slice(-2);
}

/* ---------- world map ---------- */
let mapEl = null, currentProfile = null, onExitWorld = null, runHandle = null;

function showMap() {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const p = prog(profile);
  const el = document.createElement("div");
  el.className = "world-map y3-map";
  let html =
    '<div class="hub-topbar">' +
    '<button class="btn small grey" id="y3-back">◀ Subjects</button>' +
    '<span class="map-title">📐 Maths World · Year 3</span>' +
    '<span class="wallet">🪙 <b>' + (profile.coins || 0) + "</b></span>" +
    "</div>" +
    '<div class="map-actions">' +
    '<button class="btn orange" id="y3-shop">🥚 Egg Shop</button>' +
    '<button class="btn blue" id="y3-pets">🐾 My Pets (' + ((profile.pets && profile.pets.owned.length) || 0) + ")</button>" +
    "</div>" +
    '<div class="course-grid">';

  Y3_COURSES.forEach(function (c, i) {
    const unlocked = isUnlocked(profile, i);
    const d = courseData(p, c.id);
    html +=
      '<div class="course-card' + (unlocked ? "" : " locked") + '" data-i="' + i + '">' +
      '<div class="cc-emoji">' + (unlocked ? c.emoji : "🔒") + "</div>" +
      '<div class="cc-name">' + (i + 1) + ". " + c.name + "</div>" +
      '<div class="cc-chapter">' + c.chapter + "</div>" +
      '<div class="cc-stars">' + (d && d.stars ? Stars.str(d.stars) : (unlocked ? "☆☆☆" : "")) + "</div>" +
      (d && d.bestTime ? '<div class="cc-best">⏱️ best ' + fmtTime(d.bestTime) + "</div>" : "") +
      "</div>";
  });
  html += "</div>";
  el.innerHTML = html;
  document.getElementById("app").appendChild(el);
  mapEl = el;

  el.querySelector("#y3-back").onclick = function () { Sound.click(); removeMap(); onExitWorld(); };
  el.querySelector("#y3-shop").onclick = function () { Sound.click(); PetSystem.openShop(profile, showMap); };
  el.querySelector("#y3-pets").onclick = function () { Sound.click(); PetSystem.openCollection(profile, showMap); };
  el.querySelectorAll(".course-card:not(.locked)").forEach(function (card) {
    card.onclick = function () { Sound.click(); startCourse(parseInt(card.getAttribute("data-i"), 10)); };
  });
}
function removeMap() { if (mapEl) { mapEl.remove(); mapEl = null; } }

/* ---------- run + finish ---------- */
function startCourse(i) {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const def = Y3_COURSES[i];
  const d0 = courseData(prog(profile), def.id);
  const isReplay = !!(d0 && d0.plays > 0);

  runHandle = runCourse({
    title: def.emoji + " " + def.name,
    theme: def.theme,
    elements: generateCourse(i),
    questions: pickQuestions(def),
    profile: profile,
    coinFactor: isReplay ? 0.5 : 1,
    petGroup: PetSystem.buildActivePet(profile),
    spawn: { x: 0, y: 0, z: 2 },
    timer: true,
    onExit: function () { showMap(); },
    onFinish: function (res) { finishCourse(i, res); }
  });
}

function finishCourse(i, res) {
  const profile = ProfileStore.byId(currentProfile.id);
  const def = Y3_COURSES[i];
  const p = prog(profile);
  if (!p.levels) p.levels = {};
  const d = p.levels[def.id] || { stars: 0, best: 0, firstTry: 0, passed: false, plays: 0, bestTime: null };
  const firstCompletion = d.plays === 0;
  d.plays++;

  const passed = res.firstTry >= PASS_NEED;
  const stars = res.firstTry === 10 ? 3 : (res.firstTry >= 8 ? 2 : (passed ? 1 : 0));
  d.stars = Math.max(d.stars, stars);
  d.firstTry = Math.max(d.firstTry, res.firstTry);
  d.passed = d.passed || passed;

  /* speed-run personal best (bragging rights only) */
  const newRecord = d.bestTime == null || res.timeSec < d.bestTime;
  if (newRecord) d.bestTime = res.timeSec;

  let earned = res.coins + (firstCompletion ? 50 : 0);
  d.best = Math.max(d.best, earned);
  p.levels[def.id] = d;
  profile.coins = (profile.coins || 0) + earned;

  let freeEgg = false;
  if (firstCompletion) { PetSystem.grantEgg(profile, "basic"); freeEgg = true; }

  const allPassed = Y3_COURSES.every(function (c) { return p.levels[c.id] && p.levels[c.id].passed; });
  const newChampion = allPassed && !p.champion;
  if (newChampion) p.champion = true;
  ProfileStore.saveProgress();

  if (newRecord && !firstCompletion) {
    FX.praise("⏱️ NEW RECORD! " + fmtTime(res.timeSec));
    FX.confetti(20);
  }

  function report() {
    FamilyReport.show({
      gameTitle: "Maths World · Year 3",
      chapterLabel: "Course " + (i + 1) + " — " + def.name + " (" + def.chapter + ")",
      current: {
        profileId: profile.id,
        stars: stars,
        headline: [
          { label: "Time", value: "⏱️ " + fmtTime(res.timeSec) + (newRecord ? " — NEW RECORD!" : "") },
          { label: "Coins", value: "🪙 " + earned + (freeEgg ? " + FREE EGG 🥚" : "") },
          { label: "First-try answers", value: res.firstTry + " / 10" },
          { label: passed ? "PASSED! Next course unlocked!" : "Get " + PASS_NEED + "/10 to unlock the next course!", value: passed ? "✅" : "💪" }
        ]
      },
      columns: [{ key: "stars", label: "Stars" }, { key: "time", label: "Best time" }, { key: "coins", label: "Best coins" }],
      rows: ProfileStore.all().map(function (pl) {
        const pd = courseData(ProfileStore.peekProgress(pl.id, GAME_ID), def.id);
        return {
          profileId: pl.id, name: pl.name, avatar: pl.avatar || "🙂",
          played: !!pd,
          values: pd ? { stars: Stars.str(pd.stars), time: "⏱️ " + fmtTime(pd.bestTime), coins: pd.best } : {},
          sort: pd ? pd.stars * 100000 + (100000 - (pd.bestTime || 99999)) : 0
        };
      }),
      extra: [{ label: "🐾 My Pets", cls: "orange", fn: function () { PetSystem.openCollection(profile, showMap); } }],
      onReplay: function () { startCourse(i); },
      onNext: (passed && i < Y3_COURSES.length - 1) ? function () { startCourse(i + 1); } : null,
      onMenu: function () { showMap(); }
    });
  }

  setTimeout(function () {
    if (newChampion) PetSystem.showTrophy("Year 3 Maths Champion!", profile, report);
    else if (freeEgg) PetSystem.offerHatch(profile, "basic", report);
    else report();
  }, 300);
}

/* ---------- registration ---------- */
window.gameRegistry.register({
  id: GAME_ID,
  title: "Maths World Y3",
  grade: "Year 3",
  subject: "maths",
  icon: "📐",
  launch: function (opts) {
    currentProfile = opts.profile;
    onExitWorld = opts.onExit;
    initEngine();
    Assets.load(KENNEY_MODELS).then(showMap);
    return {
      destroy: function () {
        removeMap();
        if (runHandle) { try { runHandle._cleanup(); } catch (e) { /* done */ } runHandle = null; }
      }
    };
  }
});
