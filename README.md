# 🎮 Obby Academy

A 3D obstacle-course ("obby") learning game for kids — jump across floating
islands, dodge spinning bars, answer questions from the Malaysian KSSR
textbook at glowing checkpoints, earn coins, and hatch collectible pets that
follow you around. Built with Three.js, runs in any modern browser, saves on
the device (no accounts, no internet needed after loading).

**Flow:** choose your profile → pick a world (📐 Maths / 🔬 Science) →
play courses → earn coins → hatch pets 🥚

| Grade | 📐 Maths | 🔬 Science |
|---|---|---|
| Year 1 | 🌍 **Maths World** — 8 obby courses (ready!) | 🔬 **Science World** — 10 obby courses (ready!) |
| Year 3 | coming later | coming later |
| Form 1 | coming later | coming later |

**Maths World courses** (= Year 1 KSSR Semakan chapters):
Counting Meadows · Sunny Bridge Run · Pizza Peaks · Coin Canyon ·
Clocktower Climb · Giant's Kitchen · Geometry Galaxy · Chart City

**Science World courses** (= Science Year 1 KSSR Semakan units):
Observation Outpost · Safety Lab · Body Bay · Sorting Swamp ·
Animal Archipelago · Garden Grove · Magnet Mines · Sponge Springs ·
Earth Overlook · Builder's Workshop — with hands-on **science stations**
(drag-the-senses, spot-the-danger, living/non-living sorting, build-a-plant,
magnet lab, soak-or-not predictions, find-it-on-Earth, build-the-tower)
at checkpoints 3, 6 and 9 of every course.

**Controls:** desktop = WASD/arrows + Space to jump, drag to look around.
Phone/tablet = left joystick + big JUMP button.

---

## ▶️ Run it on your computer

You can't double-click `index.html` (browsers block the 3D files that way).
Use a tiny local server — pick ONE:

**Option A — VS Code:** install the free "Live Server" extension → open this
folder → right-click `index.html` → **Open with Live Server**.

**Option B — Command line (needs Node.js):** open a terminal in this folder,
type `npx serve .`, then open the address it shows.

> Internet is needed the first time (the 3D engine loads from a CDN); after
> that the browser caches it.

## 🌍 Put it online for FREE (GitHub Pages)

1. Create a free account at [github.com](https://github.com).
2. **+** (top right) → **New repository** → name it, keep **Public** → create.
3. On the repo page click **uploading an existing file** and drag EVERYTHING
   in this folder (`index.html`, `src`, `content`, `assets`) into it → **Commit changes**.
4. **Settings → Pages** → Branch: **main**, folder **/(root)** → **Save**.
5. Wait ~2 minutes, refresh — GitHub shows your link:
   `https://YOURNAME.github.io/REPONAME/`. Open it on the kids' devices and
   **Add to Home Screen**. 🎉

**To update later:** upload the changed files again — same link.

> ⭐ Progress, coins and pets save **per device** (browser storage). Each
> child should play on the same device; don't clear browser data.

---

## ✏️ Edit the questions (no coding!)

Open [`content/y1-maths-questions.js`](content/y1-maths-questions.js) in any
text editor. Every question is one copy-paste block:

```js
{ level: "M2", difficulty: 1, question: "4 + 3 = ?", choices: ["6","7","8"], answer: "7" },
```

- `level`: `"M1"`–`"M8"` = Course 1–8 · `difficulty`: 1 easy / 2 medium / 3 hard
- `answer` must match one choice EXACTLY
- Picture questions (clocks, fraction pizzas, money, shapes, pictographs)
  are explained in the file header
- Each course asks 10 per run (4 easy + 3 medium + 3 hard, easy first)
- **Unlocking (Maths):** all 10 correct on the FIRST try (3⭐) unlocks the
  next course. 8–9/10 = 2⭐, otherwise 1⭐ — replay to improve!
  (To make it easier, lower `PASS_NEED` in `src/worlds/maths-world.js`.)

**Science questions** live in
[`content/y1-science-content.js`](content/y1-science-content.js) — same
copy-paste style (`unit: "U1".."U10"`, difficulty 1–3, 30 per unit).
Checkpoints run easy → hard: 1–4 easy, 5–7 medium, 8–10 hard, and
checkpoints 3/6/9 are **stations** — their draggable items/labels/answers
are edited at the bottom of the same file (one item per line).
**Unlocking (Science):** at least 7/10 first-try passes; 10/10 = 3⭐,
8–9 = 2⭐, 7 = 1⭐ (`PASS_NEED` in `src/worlds/science-world.js`).

## 🐾 Add a pet (one line!)

Open [`src/pets.js`](src/pets.js), find `PET_SPECIES`, copy any line and
change the name/colors:

```js
{ id: "hamster", name: "Hamster", rarity: "common", body: "round", color: "#fbbf24", ears: "round", tail: "puff" },
```

`rarity`: common / rare / epic / legendary · `body`: "box" or "round" ·
`ears`: cat / bunny / round / flop / none · extras: `mane`, `antlers`,
`horn: true`, `wings: "small"|"big"`, `beak: true`, `shell`, `mask`, `snout`.

## 💰 Game economy (for reference)

Correct answer **+10** coins (replays +5) · scattered coins **+1** ·
first completion of a course **+50 and a FREE Basic Egg** ·
Egg Shop: Basic 100 / Golden 250 / Mystery 500 ·
Hatch odds (Basic): 60% Common / 30% Rare / 9% Epic / 1% Legendary —
better eggs shift the odds up.

---

## 🧩 For future build sessions: how worlds plug in

The hub renders subject cards **from the registry** — nothing hardcoded:

```js
gameRegistry.register({
  id: "science-world", title: "Science World",
  grade: "Year 1",          // "Year 1" | "Year 3" | "Form 1"
  subject: "science",       // "maths" | "science"
  icon: "🔬",
  launch({ containerId, profile, onExit }) { /* return { destroy() } */ }
});
```

Add the module to `src/main.js` imports (ES module) — done.

**The building blocks** (all reusable):

| File | What it gives you |
|---|---|
| [`src/engine.js`](src/engine.js) | Renderer, sky/fog/lights, Kenney GLB loader (`Assets`), blocky avatar (`buildCharacter`), **CharacterController** (jump feel: coyote time, buffer, air control), touch joystick, quality toggle |
| [`src/obby.js`](src/obby.js) | `runCourse({theme, elements, questions, …})` — platforms, movers, vanish tiles, conveyors, spinners, coins, checkpoints, question gates, finish portal, respawns, HUD, pet follower |
| [`src/worlds/maths-world.js`](src/worlds/maths-world.js) | Example world: themed course generator + map screen + progress + Family Report — copy this shape for new worlds |
| [`src/pets.js`](src/pets.js) | Pet species, egg shop, hatch ceremony, collection screen, `buildActivePet(profile)` — shared wallet & collection across all worlds |
| `src/shared/` | `questionPopup.js` (question panel + drawn visuals), `siblingCompare.js` (**Family Report** — call after EVERY course), `sound.js`, `stars.js` |
| `src/profiles.js` | Profiles, per-profile progress (`prog.levels[courseId] = {stars, passed…}`), coins, pets, settings |

Progress convention: save under `prog.levels[courseId]` and the hub's star
board + subject cards count everything automatically.

*(The old 2D version of this app is preserved on the `2d-arcade` git branch.)*
