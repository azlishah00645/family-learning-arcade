# 🏝️ Science Island — BUILT (Phase 2) ✅

Year 1 Science explorer game. Registered as `{ grade: "Year 1", subject: "science" }`.

Walk around a top-down island (arrow keys, or tap where you want to go) and
enter 10 zones — the Science Year 1 KSSR Semakan units S1–S10 — each a
hands-on mini-game: drag-to-senses, safe/unsafe, living/non-living sorting,
build-a-plant, magnet and water-absorption virtual experiments, and more.

- **Engine:** all gameplay comes from the shared
  [`src/shared/minigameFramework.js`](../../shared/minigameFramework.js)
  (island map + 6 plug-in mini-game types). **Phase 4's Science Lab must
  reuse this engine** — new zones + content only.
- **Zones/wiring:** [`zones.js`](zones.js) — names, map spots, which plug-in
  each zone uses.
- **Content (edit me!):** [`/content/y1-science-content.js`](../../../content/y1-science-content.js)
  — every item, label, answer and prediction, non-coder format.
- **Scoring:** accuracy-based — pass ≥80%, 3⭐ = perfect, 2⭐ ≥90%, 1⭐ pass.
  Family Report after every zone; certificate after all 10.
