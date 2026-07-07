# 🏝️ Science Island — stub (built in Phase 2)

Year 1 Science explorer game. Registers as `{ grade: "Year 1", subject: "science" }`.

Top-down island with 10 zones (Science Year 1 KSSR Semakan units S1–S10),
each zone a hands-on mini-game (drag-to-senses, sorting, virtual magnet &
absorption experiments, etc.).

Phase 2 must build the zone-map + mini-game framework as a **shared engine**
(e.g. `src/shared/minigameFramework.js`) — Phase 4's Science Lab reuses it.
Content goes in `/content/y1-science-content.js`.
