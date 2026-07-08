/* ============================================================
   SCIENCE WORLD — 10 themed obby courses = Science Year 1 KSSR
   Semakan units. Registered {grade:"Year 1", subject:"science"}.

   10 question checkpoints per course in RISING difficulty:
   1-4 easy · 5-7 medium · 8-10 hard. Checkpoints 3, 6 and 9 are
   INTERACTIVE STATIONS (drag/tap mini-games from stations.js);
   the other 7 are MCQ. Pass = at least 7/10 first-try.
   Rename / reorder courses here — no coding needed.
   ============================================================ */
import * as THREE from "three";
import { runCourse, Props } from "../obby.js";
import { Assets, initEngine } from "../engine.js";
import { PetSystem } from "../pets.js";
import { Stations } from "../stations.js";
import { KENNEY_MODELS } from "../obby.js";

export const SCIENCE_COURSES = [
  { id: "U1",  chapter: "Scientific Skills",    name: "Observation Outpost", emoji: "🔭",
    theme: { skyTop: "#22c55e", skyBottom: "#d9f99d", fog: "#d9f99d", islandColor: "#16a34a", platColor: "#7c5c36", props: ["scope", "shape"] } },
  { id: "U2",  chapter: "Science Room Rules",   name: "Safety Lab",          emoji: "🥽",
    theme: { skyTop: "#0ea5e9", skyBottom: "#e0f2fe", fog: "#e0f2fe", islandColor: "#94a3b8", platColor: "#475569", props: ["beaker"] } },
  { id: "U3",  chapter: "Humans",               name: "Body Bay",            emoji: "🧒",
    theme: { skyTop: "#38bdf8", skyBottom: "#fef9c3", fog: "#fef9c3", islandColor: "#fcd34d", platColor: "#0e7490", props: ["statue"] } },
  { id: "U4",  chapter: "Living & Non-Living",  name: "Sorting Swamp",       emoji: "🐸",
    theme: { skyTop: "#65a30d", skyBottom: "#d9f99d", fog: "#bef264", islandColor: "#4d7c0f", platColor: "#3f6212", props: ["lily"] } },
  { id: "U5",  chapter: "Animals",              name: "Animal Archipelago",  emoji: "🐾",
    theme: { skyTop: "#06b6d4", skyBottom: "#cffafe", fog: "#cffafe", islandColor: "#fbbf24", platColor: "#b45309", props: ["shape"] } },
  { id: "U6",  chapter: "Plants",               name: "Garden Grove",        emoji: "🌻",
    theme: { skyTop: "#84cc16", skyBottom: "#fef08a", fog: "#ecfccb", islandColor: "#65a30d", platColor: "#166534", props: ["bigFlower"] } },
  { id: "U7",  chapter: "Magnets",              name: "Magnet Mines",        emoji: "🧲",
    theme: { skyTop: "#334155", skyBottom: "#94a3b8", fog: "#64748b", islandColor: "#57534e", platColor: "#44403c", props: ["magRock"], ambient: 1.15 } },
  { id: "U8",  chapter: "Absorption",           name: "Sponge Springs",      emoji: "💧",
    theme: { skyTop: "#0891b2", skyBottom: "#a5f3fc", fog: "#a5f3fc", islandColor: "#fde047", platColor: "#eab308", props: ["sponge"] } },
  { id: "U9",  chapter: "Earth",                name: "Earth Overlook",      emoji: "🌍",
    theme: { skyTop: "#1d4ed8", skyBottom: "#bfdbfe", fog: "#bfdbfe", islandColor: "#78716c", platColor: "#57534e", props: ["peak"], climb: true } },
  { id: "U10", chapter: "Technology",           name: "Builder's Workshop",  emoji: "🔧",
    theme: { skyTop: "#f97316", skyBottom: "#fed7aa", fog: "#fed7aa", islandColor: "#a16207", platColor: "#78350f", props: ["gear", "barTower"] } }
];

/* ---------------- science theme props (added to the shared set) ---------------- */
function lam(c) { return new THREE.MeshLambertMaterial({ color: c }); }

Props.beaker = function () {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.55, 1.6, 12, 1, true),
    new THREE.MeshLambertMaterial({ color: "#bae6fd", transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
  glass.position.y = 0.8; g.add(glass);
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.52, 0.7, 12), lam(["#4ade80", "#f472b6", "#60a5fa"][Math.floor(Math.random() * 3)]));
  liquid.position.y = 0.45; g.add(liquid);
  return g;
};
Props.scope = function () {
  const g = new THREE.Group();
  const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 6), lam("#78350f"));
  leg1.position.set(-0.3, 0.8, 0); leg1.rotation.z = 0.25; g.add(leg1);
  const leg2 = leg1.clone(); leg2.position.x = 0.3; leg2.rotation.z = -0.25; g.add(leg2);
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.3, 10), lam("#f59e0b"));
  tube.position.y = 1.7; tube.rotation.x = -0.9; g.add(tube);
  return g;
};
Props.statue = function () {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.6), lam("#fde68a"));
  body.position.y = 1; g.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.6), lam("#fde68a"));
  head.position.y = 2; g.add(head);
  return g;
};
Props.lily = function () {
  const g = new THREE.Group();
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.12, 12, 1, false, 0.6, 5.7), lam("#22c55e"));
  g.add(pad);
  const bloom = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.4, 8), lam("#f9a8d4"));
  bloom.position.set(0.4, 0.25, 0.2); g.add(bloom);
  return g;
};
Props.bigFlower = function () {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.4, 8), lam("#16a34a"));
  stem.position.y = 1.2; g.add(stem);
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), lam("#92400e"));
  center.position.y = 2.5; g.add(center);
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), lam("#fde047"));
    petal.scale.set(1.2, 0.5, 0.7);
    petal.position.set(Math.cos(a) * 0.5, 2.5, Math.sin(a) * 0.5);
    g.add(petal);
  }
  return g;
};
Props.magRock = function () {
  const g = new THREE.Group();
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7), lam("#57534e"));
  rock.position.y = 1.6; g.add(rock);
  const tip1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.4), lam("#ef4444"));
  tip1.position.set(0, 1.6, 0.7); g.add(tip1);
  const tip2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.4), lam("#3b82f6"));
  tip2.position.set(0, 1.6, -0.7); g.add(tip2);
  g.userData.spinDeco = true;
  return g;
};
Props.sponge = function () {
  const g = new THREE.Group();
  const s = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 1), lam("#fde047"));
  s.position.y = 0.35; g.add(s);
  for (let i = 0; i < 5; i++) {
    const hole = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), lam("#ca8a04"));
    hole.position.set(-0.6 + i * 0.3, 0.72, (i % 2) * 0.4 - 0.2);
    g.add(hole);
  }
  return g;
};
Props.peak = function () {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.6, 7), lam("#78716c"));
  m.position.y = 1.3; g.add(m);
  const snow = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 7), lam("#f8fafc"));
  snow.position.y = 2.15; g.add(snow);
  return g;
};
Props.gear = function () {
  const g = new THREE.Group();
  const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.3, 8), lam("#f59e0b"));
  wheel.rotation.x = Math.PI / 2;
  wheel.position.y = 1.4; g.add(wheel);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.3), lam("#b45309"));
    tooth.position.set(Math.cos(a) * 1, 1.4 + Math.sin(a) * 1, 0);
    g.add(tooth);
  }
  g.userData.spinDeco = true;
  return g;
};

/* ---------------- seeded rng + course generator ---------------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Same skeleton as Maths World (5 segments × [mid-q + island-q] =
   10 checkpoints) but tighter spacing so courses stay 6–8 min,
   and obstacles ramp WITHIN the course (later segments harder). */
export function generateCourse(courseIdx) {
  const def = SCIENCE_COURSES[courseIdx];
  const rng = mulberry32(4000 + courseIdx * 91);
  const th = def.theme;
  const els = [];
  const climb = !!th.climb;

  const jumpsPerSeg = 3 + Math.floor(courseIdx / 3); /* 3..6 */
  const gap = 3.0 + courseIdx * 0.1;

  let x = 0, y = 0, z = 0;
  els.push({ t: "island", x: 0, y: 0, z: 0, r: 6 });
  themeProps(0, 0, 0, 6, 3);
  z -= 6.5;

  function themeProps(cx, cy, cz, r, n) {
    for (let i = 0; i < n; i++) {
      const kind = th.props[Math.floor(rng() * th.props.length)];
      const a = rng() * Math.PI * 2, rr = r * (0.45 + rng() * 0.4);
      const e = { t: "deco", prop: kind, x: cx + Math.cos(a) * rr, y: cy, z: cz + Math.sin(a) * rr, ry: rng() * 6 };
      if (kind === "shape") {
        e.shape = ["cube", "sphere", "cone", "cylinder"][Math.floor(rng() * 4)];
        e.color = ["#f472b6", "#60a5fa", "#4ade80", "#facc15"][Math.floor(rng() * 4)];
        e.y = cy + 1;
      }
      if (kind === "barTower") { e.h = 2 + rng() * 3; e.color = "#f59e0b"; }
      if (kind === "magRock") { e.y = cy + rng() * 1.5; }
      els.push(e);
    }
  }

  for (let seg = 0; seg < 5; seg++) {
    /* within-course ramp: features unlock as segments advance */
    const canMove = (courseIdx >= 1 && seg >= 1) || seg >= 3;
    const canVanish = courseIdx >= 4 && seg >= 2;
    const canConvey = courseIdx >= 6 && seg >= 3;

    for (let j = 0; j < jumpsPerSeg; j++) {
      z -= gap + rng() * 0.8;
      x += (rng() - 0.5) * 3.2;
      x = Math.max(-7, Math.min(7, x));
      if (climb) y += 0.65;
      else y = Math.max(0, y + (rng() - 0.5) * (0.6 + seg * 0.18));

      const roll = rng();
      if (canVanish && roll < 0.16 + seg * 0.02) {
        els.push({ t: "vanish", x: x, y: y, z: z, w: 3, d: 3, period: 3.9 - seg * 0.15, offset: rng() * 3 });
      } else if (canMove && roll < 0.34) {
        z -= 1.2;
        els.push({ t: "move", x: x, y: y, z: z, w: 3, d: 3, axis: rng() < 0.7 ? "x" : "z", range: 2 + rng() * 1.2 + seg * 0.15, speed: 0.75 + seg * 0.08, offset: rng() * 6 });
      } else if (canConvey && roll < 0.46) {
        els.push({ t: "convey", x: x, y: y, z: z, w: 3.4, d: 6, dirZ: rng() < 0.5 ? 1 : -1, speed: 1.5 });
        z -= 2;
      } else {
        els.push({ t: "plat", x: x, y: y, z: z, w: 2.9 + rng() * 1.3, d: 2.8 + rng() * 1, bob: rng() < 0.3 });
      }
      if (rng() < 0.6) els.push({ t: "coin", x: x, y: y, z: z });

      /* mid-segment question checkpoint */
      if (j === Math.floor(jumpsPerSeg / 2)) {
        z -= gap;
        els.push({ t: "plat", x: x, y: y, z: z, w: 5, d: 4.5 });
        els.push({ t: "q", x: x, y: y, z: z });
      }
    }

    /* island question checkpoint */
    z -= gap + 1.5;
    x *= 0.5;
    els.push({ t: "island", x: x, y: y, z: z, r: 4, color: th.islandColor });
    els.push({ t: "q", x: x, y: y, z: z });
    themeProps(x, y, z, 4, 1);
    if (seg >= 2 && courseIdx >= 2) {
      els.push({ t: "spin", x: x, y: y, z: z + 2.8, len: 4.4, speed: 1 + seg * 0.15 + courseIdx * 0.06 });
    }
    z -= 5;
  }

  z -= gap;
  els.push({ t: "island", x: 0, y: y, z: z - 2, r: 5.5 });
  els.push({ t: "finish", x: 0, y: y, z: z - 2 });
  themeProps(0, y, z - 2, 5, 3);
  return els;
}

/* ---------------- 10 graded checkpoints (7 MCQ + 3 stations) ----------------
   Slots: 1,2,4 easy MCQ · 3 STATION · 5,7 medium MCQ · 6 STATION ·
          8,10 hard MCQ · 9 STATION. Stations sample fresh items each run. */
const Q_PER_COURSE = 10;
const PASS_NEED = 7;

function sample(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a.slice(0, n);
}

function stationEntry(unitId, difficulty) {
  const st = window.Y1_SCIENCE_CONTENT.stations[unitId];
  const cfg = { type: st.type, title: st.title };
  if (st.type === "dragTargets") { cfg.targets = st.targets; cfg.items = sample(st.items, 5); }
  else if (st.type === "binSort") { cfg.bins = st.bins; cfg.items = sample(st.items, 6); }
  else if (st.type === "tapWrong") {
    cfg.items = sample(st.items.filter(function (i) { return !i.safe; }), 4)
      .concat(sample(st.items.filter(function (i) { return i.safe; }), 4));
  }
  else if (st.type === "magnet") { cfg.items = sample(st.items, 6); }
  else if (st.type === "predict") { cfg.items = sample(st.items, 5); }
  else if (st.type === "tapFind") { cfg.scene = st.scene; cfg.finds = sample(st.finds, 4); }
  else if (st.type === "buildSlots") { cfg.slots = st.slots; cfg.items = st.items; }
  return { type: "station", station: st.type, config: cfg, difficulty: difficulty };
}

function pickQuestions(unitId) {
  const bank = (window.Y1_SCIENCE_CONTENT.questions || []).filter(function (q) { return q.unit === unitId; });
  function tier(d, n) { return sample(bank.filter(function (q) { return q.difficulty === d; }), n); }
  const easy = tier(1, 3), med = tier(2, 2), hard = tier(3, 2);
  return [
    easy[0], easy[1], stationEntry(unitId, 1), easy[2],
    med[0], stationEntry(unitId, 2), med[1],
    hard[0], stationEntry(unitId, 3), hard[1]
  ];
}

/* ---------------- progress ---------------- */
const GAME_ID = "science-world";
function prog(profile) { return ProfileStore.getProgress(profile.id, GAME_ID); }
function courseData(p, id) { return (p && p.levels && p.levels[id]) || null; }
function isUnlocked(profile, i) {
  if (i === 0) return true;
  if (ProfileStore.settings().parentUnlock) return true;
  const prev = courseData(prog(profile), SCIENCE_COURSES[i - 1].id);
  return !!(prev && prev.passed);
}

/* ---------------- world map (DOM) ---------------- */
let mapEl = null, currentProfile = null, onExitWorld = null, runHandle = null;

function showMap() {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const p = prog(profile);
  const el = document.createElement("div");
  el.className = "world-map science-map";
  let html =
    '<div class="hub-topbar">' +
    '<button class="btn small grey" id="sw-back">◀ Subjects</button>' +
    '<span class="map-title">🔬 Science World</span>' +
    '<span class="wallet">🪙 <b>' + (profile.coins || 0) + "</b></span>" +
    "</div>" +
    '<div class="map-actions">' +
    '<button class="btn orange" id="sw-shop">🥚 Egg Shop</button>' +
    '<button class="btn blue" id="sw-pets">🐾 My Pets (' + ((profile.pets && profile.pets.owned.length) || 0) + ")</button>" +
    "</div>" +
    '<div class="course-grid">';

  SCIENCE_COURSES.forEach(function (c, i) {
    const unlocked = isUnlocked(profile, i);
    const d = courseData(p, c.id);
    html +=
      '<div class="course-card' + (unlocked ? "" : " locked") + '" data-i="' + i + '">' +
      '<div class="cc-emoji">' + (unlocked ? c.emoji : "🔒") + "</div>" +
      '<div class="cc-name">' + (i + 1) + ". " + c.name + "</div>" +
      '<div class="cc-chapter">' + c.chapter + "</div>" +
      '<div class="cc-stars">' + (d && d.stars ? Stars.str(d.stars) : (unlocked ? "☆☆☆" : "")) + "</div>" +
      "</div>";
  });
  html += "</div>";
  el.innerHTML = html;
  document.getElementById("app").appendChild(el);
  mapEl = el;

  el.querySelector("#sw-back").onclick = function () { Sound.click(); removeMap(); onExitWorld(); };
  el.querySelector("#sw-shop").onclick = function () { Sound.click(); PetSystem.openShop(profile, showMap); };
  el.querySelector("#sw-pets").onclick = function () { Sound.click(); PetSystem.openCollection(profile, showMap); };
  el.querySelectorAll(".course-card:not(.locked)").forEach(function (card) {
    card.onclick = function () { Sound.click(); startCourse(parseInt(card.getAttribute("data-i"), 10)); };
  });
}
function removeMap() { if (mapEl) { mapEl.remove(); mapEl = null; } }

/* ---------------- run + finish ---------------- */
function startCourse(i) {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const def = SCIENCE_COURSES[i];
  const d0 = courseData(prog(profile), def.id);
  const isReplay = !!(d0 && d0.plays > 0);

  runHandle = runCourse({
    title: def.emoji + " " + def.name,
    theme: def.theme,
    elements: generateCourse(i),
    questions: pickQuestions(def.id),
    profile: profile,
    coinFactor: isReplay ? 0.5 : 1,
    petGroup: PetSystem.buildActivePet(profile),
    spawn: { x: 0, y: 0, z: 2 },
    onExit: function () { showMap(); },
    onFinish: function (res) { finishCourse(i, res); }
  });
}

function finishCourse(i, res) {
  const profile = ProfileStore.byId(currentProfile.id);
  const def = SCIENCE_COURSES[i];
  const p = prog(profile);
  if (!p.levels) p.levels = {};
  const d = p.levels[def.id] || { stars: 0, best: 0, firstTry: 0, passed: false, plays: 0 };
  const firstCompletion = d.plays === 0;
  d.plays++;

  /* pass ≥7/10 first-try · 10 = 3⭐ · 8-9 = 2⭐ · 7 = 1⭐ */
  const passed = res.firstTry >= PASS_NEED;
  const stars = res.firstTry === 10 ? 3 : (res.firstTry >= 8 ? 2 : (passed ? 1 : 0));
  d.stars = Math.max(d.stars, stars);
  d.firstTry = Math.max(d.firstTry, res.firstTry);
  d.passed = d.passed || passed;

  let earned = res.coins + (firstCompletion ? 50 : 0);
  d.best = Math.max(d.best, earned);
  p.levels[def.id] = d;
  profile.coins = (profile.coins || 0) + earned;

  let freeEgg = false;
  if (firstCompletion) { PetSystem.grantEgg(profile, "basic"); freeEgg = true; }

  const allPassed = SCIENCE_COURSES.every(function (c) { return p.levels[c.id] && p.levels[c.id].passed; });
  const newChampion = allPassed && !p.champion;
  if (newChampion) p.champion = true;
  ProfileStore.saveProgress();

  function report() {
    FamilyReport.show({
      gameTitle: "Science World",
      chapterLabel: "Course " + (i + 1) + " — " + def.name + " (" + def.chapter + ")",
      current: {
        profileId: profile.id,
        stars: stars,
        headline: [
          { label: "Coins earned", value: "🪙 " + earned + (freeEgg ? " + FREE EGG 🥚" : "") },
          { label: "First-try answers", value: res.firstTry + " / 10" },
          { label: passed ? "PASSED! Next course unlocked!" : "Almost there! Get " + PASS_NEED + "/10", value: passed ? "✅" : "💪" }
        ]
      },
      columns: [{ key: "stars", label: "Stars" }, { key: "coins", label: "Best coins" }],
      rows: ProfileStore.all().map(function (pl) {
        const pd = courseData(ProfileStore.peekProgress(pl.id, GAME_ID), def.id);
        return {
          profileId: pl.id, name: pl.name, avatar: pl.avatar || "🙂",
          played: !!pd,
          values: pd ? { stars: Stars.str(pd.stars), coins: pd.best } : {},
          sort: pd ? pd.stars * 10000 + pd.best : 0
        };
      }),
      extra: [{ label: "🐾 My Pets", cls: "orange", fn: function () { PetSystem.openCollection(profile, showMap); } }],
      onReplay: function () { startCourse(i); },
      onNext: (passed && i < SCIENCE_COURSES.length - 1) ? function () { startCourse(i + 1); } : null,
      onMenu: function () { showMap(); }
    });
  }

  setTimeout(function () {
    if (newChampion) PetSystem.showTrophy("Science World Champion!", profile, report);
    else if (freeEgg) PetSystem.offerHatch(profile, "basic", report);
    else report();
  }, 300);
}

/* ---------------- registration ---------------- */
window.gameRegistry.register({
  id: GAME_ID,
  title: "Science World",
  grade: "Year 1",
  subject: "science",
  icon: "🔬",
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
