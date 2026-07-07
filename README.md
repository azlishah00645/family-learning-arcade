# 🎮 Family Learning Arcade

One web app, one link, games for all three kids — built around the Malaysian
KSSR/KSSM (DLP English) syllabus.

**How it works:** open the app → choose your profile → choose a subject
(📐 Maths or 🔬 Science) → the right game for your grade starts.

| Grade | 📐 Maths | 🔬 Science |
|---|---|---|
| Year 1 | 🐒 **Maths Jungle** (ready!) | 🏝️ Science Island (coming soon) |
| Year 3 | 🏃 Sifir Dash (coming soon) | 🧪 Science Lab (coming soon) |
| Form 1 | ⚔️ Quiz Quest (coming soon) | ⚔️ Quiz Quest (coming soon) |

Everything is saved on the device (no internet account needed). Each child has
their own profile, and after every chapter the **Family Report** compares
stars with their siblings — friendly competition included 😄

---

## ▶️ How to run it on your computer

You can't just double-click `index.html` (browsers block the game files that
way). You need a tiny local server — pick ONE of these:

**Option A — VS Code (easiest if you have it):**
1. Install the free "Live Server" extension in VS Code.
2. Open this folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**. Done!

**Option B — Command line (needs Node.js installed):**
1. Open a terminal / PowerShell in this folder.
2. Type: `npx serve .`
3. Open the address it shows (usually `http://localhost:3000`).

---

## 🌍 Put it online for FREE (GitHub Pages)

Do this once, then the kids can play on any phone/tablet from one link.

1. Go to [github.com](https://github.com) and sign in (create a free account
   if you don't have one).
2. Click the **+** at the top right → **New repository**.
3. Name it `family-learning-arcade`, keep it **Public**, click
   **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Drag **everything inside this folder** (the `index.html` file and the
   `src` and `content` folders) into the upload box. Wait, then click
   **Commit changes**.
6. In the repo, go to **Settings → Pages** (left sidebar).
7. Under "Branch", choose **main** and folder **/(root)**, click **Save**.
8. Wait 1–2 minutes, refresh the page — GitHub shows your link, e.g.
   `https://YOURNAME.github.io/family-learning-arcade/`
9. Open that link on the kids' devices and bookmark it. 🎉

**To update the app later:** upload the changed files again the same way
(step 4–5). The link stays the same.

> ⭐ Progress and stars are saved **per device** (in the browser). Each child
> should always play on the same device, and don't clear the browser data.

---

## ✏️ Editing questions (no coding!)

All questions live in the `content/` folder — currently
[`content/y1-maths-questions.js`](content/y1-maths-questions.js).

Open the file in any text editor. Every question is one block like this:

```js
{ level: "M2", question: "4 + 3 = ?", choices: ["6","7","8"], answer: "7", emoji: "🧮" },
```

- **To change a question:** edit the words inside the `"quotes"` and save.
- **To add a question:** copy a whole block (including the comma at the end),
  paste it on a new line, and edit it.
- `answer` must match one of the `choices` **exactly**.
- The header at the top of the file explains the picture questions
  (clocks, fractions, money, shapes, pictographs).

Save the file, refresh the game — that's it.

## 📖 Chapter names

Chapter names and order live in
[`src/games/maths-jungle/levels.js`](src/games/maths-jungle/levels.js) —
edit the text in quotes, no coding needed. The `id` (M1–M8) must match the
`level` field in the questions file.

---

## 🧩 For future build sessions: how games plug in

The hub renders the subject cards **from the game registry** — nothing is
hardcoded. A new game is one folder in `src/games/` plus one `register()`
call:

```js
gameRegistry.register({
  id: "science-island",        // unique — also the progress-save key
  title: "Science Island",
  grade: "Year 1",             // "Year 1" | "Year 3" | "Form 1"
  subject: "science",          // "maths" | "science"
  icon: "🏝️",
  launch: function ({ containerId, profile, onExit }) {
    // build your game inside #containerId, call onExit() to go back.
    // Return { destroy() } so the hub can clean up.
  }
});
```

Then add its `<script>` tags to `index.html` (under "Games"). A game may
register twice (Quiz Quest registers for both subjects).

**Shared components every game should use** (in `src/shared/`):

| File | What it gives you |
|---|---|
| `questionPopup.js` | Big friendly question popup (`QuestionPopup.show(q, {index,total})` → Promise with `{firstTry}`) |
| `siblingCompare.js` | **Family Report** screen — call `FamilyReport.show({...})` after EVERY chapter/level/run |
| `stars.js` | Star strings, per-subject totals, `FX.confetti()` / `FX.praise()` |
| `sound.js` | Web Audio bleeps that respect the parent sound toggle |
| `touchControls.js` | On-screen ◀ ▶ ⬆ buttons for phones |
| `profiles.js` (in `src/`) | `ProfileStore.getProgress(profileId, gameId)` → mutate → `ProfileStore.saveProgress()` |

Progress convention: `prog.levels = { levelId: { stars, best, passed, ... } }`
(plus optional `prog.bonusStars` for score-based games) — then the hub's star
board and subject cards count everything automatically.
