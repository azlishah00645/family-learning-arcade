/* ============================================================
   Science Island — zone list (Science Year 1 KSSR Semakan).
   Data-driven: rename zones here; items/answers live in
   content/y1-science-content.js. Each zone wires content to
   the shared MinigameEngine plug-in types.
   `x`,`y` = the zone's spot on the island map (960 × 540).
   ============================================================ */
window.SCIENCE_ISLAND_ZONES = (function () {
  const C = window.Y1_SCIENCE_CONTENT;

  return [
    {
      id: "S1", name: "Scientific Skills", emoji: "🔍", x: 150, y: 165,
      stages: [
        { type: "dragTargets", config: {
          prompt: "Which sense do you use? Drag each thing to the right sense! 🤔",
          targets: C.S1.targets, items: C.S1.items } }
      ]
    },
    {
      id: "S2", name: "Science Room Rules", emoji: "⚠️", x: 320, y: 115,
      stages: [
        { type: "tapChoice", config: {
          rounds: C.S2.rounds.map(function (r) {
            return {
              prompt: "Is this SAFE in the science room?",
              big: r.scene,
              choices: ["✅ Safe", "❌ Not safe"],
              answer: r.safe ? "✅ Safe" : "❌ Not safe"
            };
          }) } }
      ]
    },
    {
      id: "S3", name: "Humans — My Senses", emoji: "🧒", x: 490, y: 145,
      stages: [
        { type: "dragTargets", config: {
          prompt: "Drag each action to the body part that does it! 🧒",
          targets: C.S3.targets, items: C.S3.items } }
      ]
    },
    {
      id: "S4", name: "Living & Non-Living", emoji: "🐱", x: 660, y: 115,
      stages: [
        { type: "binSort", config: {
          prompt: "Is it LIVING or NON-LIVING? Tap the right basket (or drag it in)!",
          bins: C.S4.bins, items: C.S4.items } }
      ]
    },
    {
      id: "S5", name: "Animals", emoji: "🦜", x: 810, y: 170,
      stages: [
        { type: "dragTargets", config: {
          prompt: "Which animal has this body part? Drag it over! 🐾",
          targets: C.S5.targets, items: C.S5.items } },
        { type: "tapChoice", config: { rounds: C.S5.rounds } }
      ]
    },
    {
      id: "S6", name: "Plants", emoji: "🌱", x: 820, y: 340,
      stages: [
        { type: "dragTargets", config: {
          prompt: "Build the plant! Drag each part to its place. 🪴",
          positioned: true, sceneEmoji: "🟫",
          targets: C.S6.slots, items: C.S6.parts } },
        { type: "binSort", config: {
          prompt: "Does this plant have FLOWERS? Sort it!",
          bins: C.S6.bins, items: C.S6.items } }
      ]
    },
    {
      id: "S7", name: "Magnets", emoji: "🧲", x: 655, y: 385,
      stages: [
        { type: "magnetLab", config: { items: C.S7.items } }
      ]
    },
    {
      id: "S8", name: "Absorption", emoji: "💧", x: 490, y: 340,
      stages: [
        { type: "predictReveal", config: {
          question: "💧 If we drip water on the {item} — will it SOAK IN?",
          yesLabel: "Yes, it soaks in! 💧",
          noLabel: "No, it rolls off! 🙅",
          yesResult: "It absorbs the water! 💧",
          noResult: "The water rolls off! 🙅",
          items: C.S8.items.map(function (it) {
            return { label: it.label, emoji: it.emoji, result: it.absorbs };
          }) } }
      ]
    },
    {
      id: "S9", name: "Earth", emoji: "🌍", x: 320, y: 390,
      stages: [
        { type: "tapFind", config: { scene: C.S9.scene, finds: C.S9.finds } },
        { type: "tapChoice", config: { rounds: C.S9.rounds } }
      ]
    },
    {
      id: "S10", name: "Technology", emoji: "🤖", x: 160, y: 330,
      stages: [
        { type: "dragTargets", config: {
          prompt: "Build the tower like the picture! &nbsp; <span class='mg-manual'>" + C.S10.manual + "</span>",
          positioned: true,
          targets: C.S10.slots, items: C.S10.blocks } },
        { type: "tapChoice", config: { rounds: C.S10.rounds } }
      ]
    }
  ];
})();
