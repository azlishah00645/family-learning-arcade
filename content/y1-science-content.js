/* ============================================================
   SCIENCE ISLAND CONTENT — Year 1 Science (KSSR Semakan, DLP English)

   ✏️ HOW TO EDIT (no coding needed!):
   Every zone (S1–S10) has its own section below. Each line
   between { and } is ONE item — copy a whole line (with its
   comma), paste it, and change the words in "quotes".

   The important fields:
     item / label : what the child sees (emoji + words)
     target / bin : which answer it belongs to — must match one
                    of that zone's target/bin ids EXACTLY
     safe / magnetic / absorbs : true or false (no quotes!)
     prompt, choices, answer   : quiz lines — answer must match
                                 one choice exactly
   Save the file, refresh the game — done! 🎉
   ============================================================ */

window.Y1_SCIENCE_CONTENT = {

  /* ========== S1 — Scientific Skills: Which sense? ========== */
  S1: {
    targets: [
      { id: "eyes",   label: "Eyes — see",     emoji: "👀" },
      { id: "ears",   label: "Ears — hear",    emoji: "👂" },
      { id: "nose",   label: "Nose — smell",   emoji: "👃" },
      { id: "tongue", label: "Tongue — taste", emoji: "👅" },
      { id: "hand",   label: "Hand — touch",   emoji: "✋" }
    ],
    items: [
      { label: "rainbow",       emoji: "🌈", target: "eyes" },
      { label: "ringing bell",  emoji: "🔔", target: "ears" },
      { label: "smelly durian", emoji: "🍈", target: "nose" },
      { label: "cold ice",      emoji: "🧊", target: "hand" },
      { label: "sweet candy",   emoji: "🍬", target: "tongue" },
      { label: "flower scent",  emoji: "🌸", target: "nose" },
      { label: "loud drum",     emoji: "🥁", target: "ears" },
      { label: "bright moon",   emoji: "🌙", target: "eyes" },
      { label: "sour lemon",    emoji: "🍋", target: "tongue" },
      { label: "soft teddy",    emoji: "🧸", target: "hand" }
    ]
  },

  /* ========== S2 — Science Room Rules: safe or not? ========== */
  S2: {
    rounds: [
      { scene: "🏃💨 Running in the science room",              safe: false },
      { scene: "🥽 Wearing goggles for an experiment",          safe: true },
      { scene: "🍔 Eating in the science room",                 safe: false },
      { scene: "🧹 Cleaning up after an experiment",            safe: true },
      { scene: "👅🧪 Tasting things from a bottle",             safe: false },
      { scene: "🙋 Asking the teacher before touching tools",   safe: true },
      { scene: "🔥 Playing with fire",                          safe: false },
      { scene: "🧤 Wearing gloves to hold hot things",          safe: true },
      { scene: "✂️🤾 Throwing scissors to a friend",            safe: false },
      { scene: "🚶 Walking slowly and carefully",               safe: true }
    ]
  },

  /* ========== S3 — Humans: my five senses ========== */
  S3: {
    targets: [
      { id: "eyes",   label: "Eyes",   emoji: "👀" },
      { id: "ears",   label: "Ears",   emoji: "👂" },
      { id: "nose",   label: "Nose",   emoji: "👃" },
      { id: "tongue", label: "Tongue", emoji: "👅" },
      { id: "hand",   label: "Skin",   emoji: "✋" }
    ],
    items: [
      { label: "Seeing",             emoji: "🖼️", target: "eyes" },
      { label: "Hearing",            emoji: "🎵", target: "ears" },
      { label: "Smelling",           emoji: "💐", target: "nose" },
      { label: "Tasting",            emoji: "🍦", target: "tongue" },
      { label: "Touching",           emoji: "🪶", target: "hand" },
      { label: "Watching TV",        emoji: "📺", target: "eyes" },
      { label: "Listening to birds", emoji: "🐦", target: "ears" },
      { label: "Feeling hot water",  emoji: "♨️", target: "hand" },
      { label: "Smelling cooking",   emoji: "🍳", target: "nose" },
      { label: "Tasting nasi lemak", emoji: "🍚", target: "tongue" }
    ]
  },

  /* ========== S4 — Living vs Non-Living ========== */
  S4: {
    bins: [
      { id: "living",    label: "LIVING",     emoji: "🌱" },
      { id: "nonliving", label: "NON-LIVING", emoji: "🪨" }
    ],
    items: [
      { label: "cat",       emoji: "🐱", bin: "living" },
      { label: "tree",      emoji: "🌳", bin: "living" },
      { label: "rock",      emoji: "🪨", bin: "nonliving" },
      { label: "car",       emoji: "🚗", bin: "nonliving" },
      { label: "fish",      emoji: "🐟", bin: "living" },
      { label: "pencil",    emoji: "✏️", bin: "nonliving" },
      { label: "sunflower", emoji: "🌻", bin: "living" },
      { label: "chair",     emoji: "🪑", bin: "nonliving" },
      { label: "bird",      emoji: "🐦", bin: "living" },
      { label: "ball",      emoji: "⚽", bin: "nonliving" },
      { label: "baby",      emoji: "👶", bin: "living" },
      { label: "robot",     emoji: "🤖", bin: "nonliving" }
    ]
  },

  /* ========== S5 — Animals: parts, movement, covering ========== */
  S5: {
    targets: [
      { id: "bird",     label: "Bird",     emoji: "🐦" },
      { id: "fish",     label: "Fish",     emoji: "🐟" },
      { id: "elephant", label: "Elephant", emoji: "🐘" },
      { id: "cat",      label: "Cat",      emoji: "🐱" }
    ],
    items: [
      { label: "wings",    emoji: "🪽", target: "bird" },
      { label: "beak",     emoji: "🔻", target: "bird" },
      { label: "fins",     emoji: "🌊", target: "fish" },
      { label: "gills",    emoji: "〰️", target: "fish" },
      { label: "trunk",    emoji: "🐘", target: "elephant" },
      { label: "big ears", emoji: "👂", target: "elephant" },
      { label: "whiskers", emoji: "〽️", target: "cat" },
      { label: "soft fur", emoji: "🧶", target: "cat" }
    ],
    rounds: [
      { prompt: "How does a bird move?",              big: "🐦", choices: ["Fly", "Swim", "Crawl"],           answer: "Fly" },
      { prompt: "How does a fish move?",              big: "🐟", choices: ["Swim", "Fly", "Hop"],             answer: "Swim" },
      { prompt: "How does a snake move?",             big: "🐍", choices: ["Slither", "Fly", "Jump"],         answer: "Slither" },
      { prompt: "How does a frog move?",              big: "🐸", choices: ["Hop", "Fly", "Slither"],          answer: "Hop" },
      { prompt: "What covers a chicken's body?",      big: "🐔", choices: ["Feathers", "Fur", "Scales"],      answer: "Feathers" },
      { prompt: "What covers a cat's body?",          big: "🐱", choices: ["Fur", "Feathers", "Shell"],       answer: "Fur" },
      { prompt: "What covers a fish's body?",         big: "🐟", choices: ["Scales", "Fur", "Feathers"],      answer: "Scales" },
      { prompt: "What covers a turtle's body?",       big: "🐢", choices: ["Hard shell", "Fur", "Feathers"],  answer: "Hard shell" }
    ]
  },

  /* ========== S6 — Plants: build-a-plant + flowering sort ========== */
  S6: {
    slots: [
      { id: "flower", label: "Flower", x: 50, y: 6 },
      { id: "leaf",   label: "Leaf",   x: 76, y: 34 },
      { id: "stem",   label: "Stem",   x: 50, y: 46 },
      { id: "roots",  label: "Roots",  x: 50, y: 82 }
    ],
    parts: [
      { label: "flower", emoji: "🌸", target: "flower" },
      { label: "leaf",   emoji: "🍃", target: "leaf" },
      { label: "stem",   emoji: "🎋", target: "stem" },
      { label: "roots",  emoji: "🫚", target: "roots" }
    ],
    bins: [
      { id: "flowering", label: "FLOWERING",     emoji: "🌸" },
      { id: "nonflower", label: "NON-FLOWERING", emoji: "🌿" }
    ],
    items: [
      { label: "rose",      emoji: "🌹", bin: "flowering" },
      { label: "sunflower", emoji: "🌻", bin: "flowering" },
      { label: "hibiscus",  emoji: "🌺", bin: "flowering" },
      { label: "bamboo",    emoji: "🎋", bin: "nonflower" },
      { label: "pine tree", emoji: "🌲", bin: "nonflower" },
      { label: "fern",      emoji: "🌿", bin: "nonflower" },
      { label: "tulip",     emoji: "🌷", bin: "flowering" },
      { label: "moss",      emoji: "🍀", bin: "nonflower" }
    ]
  },

  /* ========== S7 — Magnets: what does it pull? ========== */
  S7: {
    items: [
      { label: "paper clip",  emoji: "📎", magnetic: true },
      { label: "iron nail",   emoji: "🔩", magnetic: true },
      { label: "steel spoon", emoji: "🥄", magnetic: true },
      { label: "safety pin",  emoji: "🧷", magnetic: true },
      { label: "wood block",  emoji: "🪵", magnetic: false },
      { label: "paper",       emoji: "📄", magnetic: false },
      { label: "plastic cup", emoji: "🥤", magnetic: false },
      { label: "leaf",        emoji: "🍃", magnetic: false },
      { label: "eraser",      emoji: "🩹", magnetic: false }
    ]
  },

  /* ========== S8 — Absorption: will it soak up water? ========== */
  S8: {
    items: [
      { label: "tissue paper", emoji: "🧻", absorbs: true },
      { label: "sponge",       emoji: "🧽", absorbs: true },
      { label: "cotton shirt", emoji: "👕", absorbs: true },
      { label: "newspaper",    emoji: "📰", absorbs: true },
      { label: "plastic cup",  emoji: "🥤", absorbs: false },
      { label: "tin can",      emoji: "🥫", absorbs: false },
      { label: "glass",        emoji: "🪟", absorbs: false },
      { label: "balloon",      emoji: "🎈", absorbs: false },
      { label: "sock",         emoji: "🧦", absorbs: true },
      { label: "metal spoon",  emoji: "🥄", absorbs: false }
    ]
  },

  /* ========== S9 — Earth: land, water, mountains ========== */
  S9: {
    scene: [
      { id: "mountain", label: "mountain", emoji: "⛰️", x: 18, y: 12 },
      { id: "sea",      label: "sea",      emoji: "🌊", x: 74, y: 64 },
      { id: "river",    label: "river",    emoji: "🏞️", x: 46, y: 38 },
      { id: "forest",   label: "forest",   emoji: "🌳", x: 16, y: 62 },
      { id: "beach",    label: "beach",    emoji: "🏖️", x: 74, y: 14 }
    ],
    finds: [
      { id: "mountain", prompt: "Tap the MOUNTAIN! ⛰️ (very high land)" },
      { id: "sea",      prompt: "Tap the SEA! 🌊 (big salty water)" },
      { id: "river",    prompt: "Tap the RIVER! 🏞️ (water flowing on land)" },
      { id: "forest",   prompt: "Tap the FOREST! 🌳 (land full of trees)" },
      { id: "beach",    prompt: "Tap the BEACH! 🏖️ (sand next to the sea)" }
    ],
    rounds: [
      { prompt: "Which one is LAND?",                     big: "🗺️", choices: ["⛰️ mountain", "🌊 sea", "☁️ cloud"],   answer: "⛰️ mountain" },
      { prompt: "Which one is WATER?",                    big: "🗺️", choices: ["🌊 sea", "⛰️ mountain", "🌳 forest"],  answer: "🌊 sea" },
      { prompt: "Where do fish live?",                    big: "🐟", choices: ["In the sea", "On a mountain", "In a tree"], answer: "In the sea" },
      { prompt: "Plants grow their roots in the…",        big: "🌱", choices: ["soil", "sky", "sea"],                  answer: "soil" },
      { prompt: "Is there MORE land or water on Earth?",  big: "🌍", choices: ["Water", "Land", "Same"],               answer: "Water" }
    ]
  },

  /* ========== S10 — Technology: build + which tool? ========== */
  S10: {
    manual: "🟥<br>🟨<br>🟦",
    slots: [
      { id: "top",    label: "Top",    x: 50, y: 8 },
      { id: "middle", label: "Middle", x: 50, y: 42 },
      { id: "base",   label: "Base",   x: 50, y: 76 }
    ],
    blocks: [
      { label: "red block",    emoji: "🟥", target: "top" },
      { label: "yellow block", emoji: "🟨", target: "middle" },
      { label: "blue block",   emoji: "🟦", target: "base" }
    ],
    rounds: [
      { prompt: "Which tool helps us CUT paper?",            big: "📄", choices: ["✂️ scissors", "🥄 spoon", "📏 ruler"],       answer: "✂️ scissors" },
      { prompt: "Which tool helps us SEE tiny things?",      big: "🐜", choices: ["🔍 magnifying glass", "🔨 hammer", "🧹 broom"], answer: "🔍 magnifying glass" },
      { prompt: "Which tool helps us DIG the soil?",         big: "🌱", choices: ["⛏️ digging tool", "✏️ pencil", "🎈 balloon"], answer: "⛏️ digging tool" },
      { prompt: "Which helps us CARRY heavy things?",        big: "📦", choices: ["🛒 trolley", "✂️ scissors", "🖍️ crayon"],    answer: "🛒 trolley" },
      { prompt: "Which tool MEASURES how long something is?", big: "🐛", choices: ["📏 ruler", "🥄 spoon", "🎺 trumpet"],        answer: "📏 ruler" },
      { prompt: "Which helps us TELL THE TIME?",             big: "🌞", choices: ["⏰ clock", "🪑 chair", "👟 shoe"],            answer: "⏰ clock" },
      { prompt: "Which holds papers TOGETHER?",              big: "📚", choices: ["📎 paper clip", "⚽ ball", "🍎 apple"],       answer: "📎 paper clip" }
    ]
  }
};
