/* ============================================================
   MATHS WORLD — 8 themed obby courses = Year 1 KSSR Semakan
   Maths chapters. Registered {grade:"Year 1", subject:"maths"}.
   Course layouts are GENERATED from the definitions below
   (seeded, so each course is always the same shape).
   Rename / reorder courses here — no coding needed.
   ============================================================ */
import * as THREE from "three";
import { runCourse, KENNEY_MODELS } from "../obby.js";
import { Assets, initEngine } from "../engine.js";
import { PetSystem } from "../pets.js";

export const MATHS_COURSES = [
  { id: "C1", chapter: "Numbers up to 100",        name: "Counting Meadows",  emoji: "🔢",
    theme: { skyTop: "#4aa8ff", skyBottom: "#c9ecff", fog: "#c9ecff", islandColor: "#4ade80", platColor: "#65a30d", props: ["numberBlock"] } },
  { id: "C2", chapter: "Addition and Subtraction", name: "Sunny Bridge Run",  emoji: "🌉",
    theme: { skyTop: "#38bdf8", skyBottom: "#fef3c7", fog: "#fef3c7", islandColor: "#a3e635", platColor: "#b45309", props: ["numberBlock"] } },
  { id: "C3", chapter: "Fractions",                name: "Pizza Peaks",       emoji: "🍕",
    theme: { skyTop: "#f59e0b", skyBottom: "#fde68a", fog: "#fde68a", islandColor: "#fbbf24", platColor: "#d97706", props: ["pizza"] } },
  { id: "C4", chapter: "Money",                    name: "Coin Canyon",       emoji: "🪙",
    theme: { skyTop: "#fb923c", skyBottom: "#ffedd5", fog: "#ffd8a8", islandColor: "#e0975a", platColor: "#c2703d", props: ["bigCoin"] } },
  { id: "C5", chapter: "Time",                     name: "Clocktower Climb",  emoji: "⏰",
    theme: { skyTop: "#7c3aed", skyBottom: "#fbcfe8", fog: "#e9d5ff", islandColor: "#a78bfa", platColor: "#6d28d9", props: ["clockFace"], climb: true } },
  { id: "C6", chapter: "Measurement",              name: "Giant's Kitchen",   emoji: "📏",
    theme: { skyTop: "#14b8a6", skyBottom: "#ccfbf1", fog: "#ccfbf1", islandColor: "#2dd4bf", platColor: "#0f766e", props: ["ruler"] } },
  { id: "C7", chapter: "Shapes and Space",         name: "Geometry Galaxy",   emoji: "🔷",
    theme: { skyTop: "#1e1b4b", skyBottom: "#7c3aed", fog: "#4c1d95", islandColor: "#6366f1", platColor: "#4338ca", props: ["shape"], space: true, ambient: 1.15 } },
  { id: "C8", chapter: "Data (Pictographs)",       name: "Chart City",        emoji: "📊",
    theme: { skyTop: "#0ea5e9", skyBottom: "#fda4af", fog: "#fbcfe8", islandColor: "#94a3b8", platColor: "#64748b", props: ["barTower"] } }
];

/* ---------------- seeded rng ---------------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---------------- course layout generator ----------------
   Path runs toward -Z. 5 segments, each ends at a QUESTION
   checkpoint island. Obstacle variety grows with course index. */
export function generateCourse(courseIdx) {
  const def = MATHS_COURSES[courseIdx];
  const rng = mulberry32(1000 + courseIdx * 77);
  const els = [];
  const th = def.theme;
  const climb = !!th.climb;

  const jumpsPerSeg = 4 + Math.floor(courseIdx / 2);   /* 4..7 */
  const gap = 3.1 + courseIdx * 0.12;                  /* jump distance ramps */
  const shapeKinds = ["cube", "sphere", "cone", "cylinder"];
  const shapeColors = ["#f472b6", "#60a5fa", "#4ade80", "#facc15", "#c084fc"];

  let x = 0, y = 0, z = 0;

  /* start island */
  els.push({ t: "island", x: 0, y: 0, z: 0, r: 6 });
  themeProps(0, 0, 0, 6, 3);
  z -= 6.5;

  function themeProps(cx, cy, cz, r, n) {
    for (let i = 0; i < n; i++) {
      const kind = th.props[Math.floor(rng() * th.props.length)];
      const a = rng() * Math.PI * 2, rr = r * (0.45 + rng() * 0.4);
      const e = { t: "deco", prop: kind, x: cx + Math.cos(a) * rr, y: cy, z: cz + Math.sin(a) * rr, ry: rng() * 6 };
      if (kind === "numberBlock") e.n = Math.floor(rng() * 99) + 1;
      if (kind === "pizza") { e.frac = rng() < 0.5 ? 0.5 : 0.25; e.y = cy + 0.3; }
      if (kind === "shape") { e.shape = shapeKinds[Math.floor(rng() * 4)]; e.color = shapeColors[Math.floor(rng() * 5)]; e.y = cy + 1; }
      if (kind === "clockFace") { e.y = cy + 2.6; }
      if (kind === "barTower") { e.h = 2 + rng() * 4; e.color = shapeColors[Math.floor(rng() * 5)]; }
      if (kind === "bigCoin") { e.y = cy + 1.6; }
      if (kind === "ruler") { e.y = cy + 0.2; }
      els.push(e);
    }
  }

  for (let seg = 0; seg < 5; seg++) {
    /* platform run */
    for (let j = 0; j < jumpsPerSeg; j++) {
      z -= gap + rng() * 0.9;
      x += (rng() - 0.5) * 3.4;
      x = Math.max(-7, Math.min(7, x));
      if (climb) y += 0.7;
      else y = Math.max(0, y + (rng() - 0.5) * 1.1);

      const roll = rng();
      const canMove = courseIdx >= 1 && seg >= 1;
      const canVanish = courseIdx >= 3;
      const canConvey = courseIdx >= 4;

      if (canVanish && roll < 0.18) {
        els.push({ t: "vanish", x: x, y: y, z: z, w: 3, d: 3, period: 3.8, offset: rng() * 3 });
      } else if (canMove && roll < 0.36) {
        z -= 1.2; /* moving gaps need a touch more room */
        els.push({ t: "move", x: x, y: y, z: z, w: 3, d: 3, axis: rng() < 0.7 ? "x" : "z", range: 2.2 + rng() * 1.2, speed: 0.8 + courseIdx * 0.06, offset: rng() * 6 });
      } else if (canConvey && roll < 0.48) {
        els.push({ t: "convey", x: x, y: y, z: z, w: 3.4, d: 6, dirZ: rng() < 0.5 ? 1 : -1, speed: 1.6 });
        z -= 2;
      } else {
        els.push({ t: "plat", x: x, y: y, z: z, w: 2.8 + rng() * 1.4, d: 2.8 + rng() * 1, bob: rng() < 0.35 });
      }
      if (rng() < 0.65) els.push({ t: "coin", x: x, y: y, z: z });

      /* mid-segment QUESTION checkpoint on a wide platform
         (2 questions per segment × 5 segments = 10 per course) */
      if (j === Math.floor(jumpsPerSeg / 2)) {
        z -= gap;
        els.push({ t: "plat", x: x, y: y, z: z, w: 5, d: 4.5 });
        els.push({ t: "q", x: x, y: y, z: z });
      }
    }

    /* question checkpoint island */
    z -= gap + 1.5;
    x *= 0.5;
    els.push({ t: "island", x: x, y: y, z: z, r: 4 });
    els.push({ t: "q", x: x, y: y, z: z });
    themeProps(x, y, z, 4, 1);
    /* spinner guard on later courses (on the island, before the flag) */
    if (courseIdx >= 2 && seg >= 2) {
      els.push({ t: "spin", x: x, y: y, z: z + 2.8, len: 4.6, speed: 1.2 + courseIdx * 0.12 });
    }
    z -= 5;
  }

  /* finish island */
  z -= gap;
  els.push({ t: "island", x: 0, y: y, z: z - 2, r: 5.5 });
  els.push({ t: "finish", x: 0, y: y, z: z - 2 });
  themeProps(0, y, z - 2, 5, 3);

  return els;
}

/* ---------------- questions: reuse the Year 1 bank ----------------
   Bank uses level:"M1".."M8" — course C1..C8 maps 1:1.
   Picks 10 (4 easy, 3 medium, 3 hard), ordered easy → hard. */
const Q_PER_COURSE = 10;
const PASS_NEED = 10; /* first-try correct needed to unlock the next course */

function pickQuestions(courseId) {
  const lvl = "M" + courseId.slice(1);
  const bank = (window.Y1_MATHS_QUESTIONS || []).filter(function (q) { return q.level === lvl; });
  function tier(d) {
    const t = bank.filter(function (q) { return (q.difficulty || 2) === d; });
    for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const tmp = t[i]; t[i] = t[j]; t[j] = tmp; }
    return t;
  }
  let picked = tier(1).slice(0, 4).concat(tier(2).slice(0, 3), tier(3).slice(0, 3));
  if (picked.length < Q_PER_COURSE) {
    const left = bank.filter(function (q) { return picked.indexOf(q) === -1; });
    picked = picked.concat(left.slice(0, Q_PER_COURSE - picked.length));
  }
  while (picked.length < Q_PER_COURSE && bank.length) picked.push(bank[Math.floor(Math.random() * bank.length)]);
  picked.sort(function (a, b) { return (a.difficulty || 2) - (b.difficulty || 2); });
  return picked.slice(0, Q_PER_COURSE);
}

/* ---------------- progress ---------------- */
const GAME_ID = "maths-world";
function prog(profile) { return ProfileStore.getProgress(profile.id, GAME_ID); }
function courseData(p, id) { return (p && p.levels && p.levels[id]) || null; }
function isUnlocked(profile, i) {
  if (i === 0) return true;
  if (ProfileStore.settings().parentUnlock) return true;
  const prev = courseData(prog(profile), MATHS_COURSES[i - 1].id);
  return !!(prev && prev.passed);
}

/* ---------------- world map screen (DOM) ---------------- */
let mapEl = null, currentProfile = null, onExitWorld = null;

function showMap() {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const p = prog(profile);
  const el = document.createElement("div");
  el.className = "world-map maths-map";
  let html =
    '<div class="hub-topbar">' +
    '<button class="btn small grey" id="mw-back">◀ Subjects</button>' +
    '<span class="map-title">📐 Maths World</span>' +
    '<span class="wallet">🪙 <b>' + (profile.coins || 0) + "</b></span>" +
    "</div>" +
    '<div class="map-actions">' +
    '<button class="btn orange" id="mw-shop">🥚 Egg Shop</button>' +
    '<button class="btn blue" id="mw-pets">🐾 My Pets (' + ((profile.pets && profile.pets.owned.length) || 0) + ")</button>" +
    "</div>" +
    '<div class="course-grid">';

  MATHS_COURSES.forEach(function (c, i) {
    const unlocked = isUnlocked(profile, i);
    const d = courseData(p, c.id);
    html +=
      '<div class="course-card' + (unlocked ? "" : " locked") + '" data-i="' + i + '">' +
      '<div class="cc-emoji">' + (unlocked ? c.emoji : "🔒") + "</div>" +
      '<div class="cc-name">' + (i + 1) + ". " + c.name + "</div>" +
      '<div class="cc-chapter">' + c.chapter + "</div>" +
      '<div class="cc-stars">' + (d ? Stars.str(d.stars) : (unlocked ? "☆☆☆" : "")) + "</div>" +
      "</div>";
  });
  html += "</div>";
  el.innerHTML = html;
  document.getElementById("app").appendChild(el);
  mapEl = el;

  el.querySelector("#mw-back").onclick = function () { Sound.click(); removeMap(); onExitWorld(); };
  el.querySelector("#mw-shop").onclick = function () { Sound.click(); PetSystem.openShop(profile, showMap); };
  el.querySelector("#mw-pets").onclick = function () { Sound.click(); PetSystem.openCollection(profile, showMap); };
  el.querySelectorAll(".course-card:not(.locked)").forEach(function (card) {
    card.onclick = function () {
      Sound.click();
      startCourse(parseInt(card.getAttribute("data-i"), 10));
    };
  });
}

function removeMap() {
  if (mapEl) { mapEl.remove(); mapEl = null; }
}

/* ---------------- run one course ---------------- */
let runHandle = null;

function startCourse(i) {
  removeMap();
  const profile = ProfileStore.byId(currentProfile.id);
  const def = MATHS_COURSES[i];
  const p = prog(profile);
  const d0 = courseData(p, def.id);
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
  const def = MATHS_COURSES[i];
  const p = prog(profile);
  if (!p.levels) p.levels = {};
  const d = p.levels[def.id] || { stars: 0, best: 0, firstTry: 0, passed: false, plays: 0 };
  const firstCompletion = d.plays === 0;
  d.plays++;

  /* PERFECT run required: 10/10 first-try unlocks the next course */
  const stars = res.firstTry === Q_PER_COURSE ? 3 : (res.firstTry >= Q_PER_COURSE - 2 ? 2 : 1);
  const passed = res.firstTry >= PASS_NEED;
  d.stars = Math.max(d.stars, stars);
  d.firstTry = Math.max(d.firstTry, res.firstTry);
  d.passed = d.passed || passed;

  let earned = res.coins + (firstCompletion ? 50 : 0);
  d.best = Math.max(d.best, earned);
  p.levels[def.id] = d;
  profile.coins = (profile.coins || 0) + earned;

  /* free Basic Egg on first completion */
  let freeEgg = false;
  if (firstCompletion) {
    PetSystem.grantEgg(profile, "basic");
    freeEgg = true;
  }

  const allPassed = MATHS_COURSES.every(function (c) { return p.levels[c.id] && p.levels[c.id].passed; });
  const newChampion = allPassed && !p.champion;
  if (newChampion) p.champion = true;
  ProfileStore.saveProgress();

  function report() {
    FamilyReport.show({
      gameTitle: "Maths World",
      chapterLabel: "Course " + (i + 1) + " — " + def.name + " (" + def.chapter + ")",
      current: {
        profileId: profile.id,
        stars: stars,
        headline: [
          { label: "Coins earned", value: "🪙 " + earned + (freeEgg ? " + FREE EGG 🥚" : "") },
          { label: "First-try answers", value: res.firstTry + " / " + Q_PER_COURSE },
          { label: passed ? "PERFECT! Next course unlocked!" : "Get " + PASS_NEED + "/" + Q_PER_COURSE + " to unlock the next course!", value: passed ? "✅" : "💪" }
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
      onNext: (passed && i < MATHS_COURSES.length - 1) ? function () { startCourse(i + 1); } : null,
      onMenu: function () { showMap(); }
    });
  }

  setTimeout(function () {
    if (newChampion) PetSystem.showTrophy("Maths World Champion!", profile, report);
    else if (freeEgg) PetSystem.offerHatch(profile, "basic", report);
    else report();
  }, 300);
}

/* ---------------- registration ---------------- */
window.gameRegistry.register({
  id: GAME_ID,
  title: "Maths World",
  grade: "Year 1",
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
