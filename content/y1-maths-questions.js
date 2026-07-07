/* ============================================================
   MATHS JUNGLE QUESTIONS — Year 1 Maths (KSSR Semakan, DLP English)

   ✏️ HOW TO EDIT (no coding needed!):
   1. Every question is ONE block between { and },
   2. To ADD a question: copy a whole block (including the comma
      after the closing } ), paste it on a new line, and change
      the words inside the "quotes".
   3. The parts of a block:
        level:      which chapter it belongs to ("M1" to "M8")
        difficulty: 1 = easy, 2 = medium, 3 = hard
                    (each game round asks 10 questions: 4 easy,
                    3 medium, 3 hard — in order, easy first!)
        question:   the question the child sees
        choices:    THREE answers in [ ], each in "quotes"
        answer:     the correct one — must match a choice EXACTLY
        emoji:      (optional) a big fun emoji above the question
        visual:     (optional) a drawn picture — examples:
          { type: "clock", hour: 3, minute: 0 }        minute: 0 or 30
          { type: "fraction", parts: 4, shaded: 1, shape: "circle" }
          { type: "shape", name: "triangle" }          also: square, circle,
                                                       rectangle, cube, sphere,
                                                       cone, cylinder
          { type: "pictograph", rows: [["Apples","🍎",4], ["Oranges","🍊",2]] }
          { type: "money", items: ["10 sen","5 sen","RM1"] }
   4. Keep at least 12 questions per difficulty spread per chapter
      (7 easy + 7 medium + 6 hard is a good mix) so the game has
      variety every time the child plays.
   5. Save the file, refresh the game — done! 🎉
   ============================================================ */

window.Y1_MATHS_QUESTIONS = [

  /* ============ M1 — Numbers up to 100 ============ */
  /* --- easy --- */
  { level: "M1", difficulty: 1, question: "How many bananas? 🍌🍌🍌", choices: ["2", "3", "4"], answer: "3", emoji: "🍌" },
  { level: "M1", difficulty: 1, question: "How many stars? ⭐⭐⭐⭐⭐⭐⭐", choices: ["6", "7", "8"], answer: "7", emoji: "⭐" },
  { level: "M1", difficulty: 1, question: "How many monkeys? 🐒🐒🐒🐒", choices: ["3", "4", "5"], answer: "4", emoji: "🐒" },
  { level: "M1", difficulty: 1, question: "How many flowers? 🌺🌺🌺🌺🌺🌺", choices: ["5", "6", "7"], answer: "6", emoji: "🌺" },
  { level: "M1", difficulty: 1, question: "How many ants? 🐜🐜", choices: ["1", "2", "3"], answer: "2", emoji: "🐜" },
  { level: "M1", difficulty: 1, question: "Which number comes after 5?", choices: ["4", "6", "7"], answer: "6", emoji: "🔢" },
  { level: "M1", difficulty: 1, question: "Which number comes before 10?", choices: ["9", "11", "8"], answer: "9", emoji: "🔢" },
  /* --- medium --- */
  { level: "M1", difficulty: 2, question: "Which number comes after 29?", choices: ["28", "30", "31"], answer: "30", emoji: "🔢" },
  { level: "M1", difficulty: 2, question: "Which number comes before 50?", choices: ["49", "51", "40"], answer: "49", emoji: "🔢" },
  { level: "M1", difficulty: 2, question: "Which number comes after 99?", choices: ["98", "100", "90"], answer: "100", emoji: "💯" },
  { level: "M1", difficulty: 2, question: "Which is MORE: 34 or 43?", choices: ["34", "43", "They are the same"], answer: "43", emoji: "⚖️" },
  { level: "M1", difficulty: 2, question: "Which is LESS: 68 or 86?", choices: ["68", "86", "They are the same"], answer: "68", emoji: "⚖️" },
  { level: "M1", difficulty: 2, question: "What comes next? 2, 4, 6, __", choices: ["7", "8", "10"], answer: "8", emoji: "🧩" },
  { level: "M1", difficulty: 2, question: "What comes next? 5, 10, 15, __", choices: ["16", "20", "25"], answer: "20", emoji: "🧩" },
  /* --- hard --- */
  { level: "M1", difficulty: 3, question: "What comes next? 10, 20, 30, __", choices: ["40", "50", "35"], answer: "40", emoji: "🧩" },
  { level: "M1", difficulty: 3, question: "In the number 47, which digit is in the TENS place?", choices: ["4", "7", "0"], answer: "4", emoji: "🔟" },
  { level: "M1", difficulty: 3, question: "In the number 82, which digit is in the ONES place?", choices: ["8", "2", "0"], answer: "2", emoji: "1️⃣" },
  { level: "M1", difficulty: 3, question: "6 tens and 3 ones make…", choices: ["36", "63", "93"], answer: "63", emoji: "🔟" },
  { level: "M1", difficulty: 3, question: "Which is the BIGGEST number?", choices: ["59", "95", "89"], answer: "95", emoji: "🏆" },
  { level: "M1", difficulty: 3, question: "Which is the SMALLEST number?", choices: ["21", "12", "22"], answer: "12", emoji: "🐜" },

  /* ============ M2 — Addition and Subtraction ============ */
  /* --- easy --- */
  { level: "M2", difficulty: 1, question: "2 + 2 = ?", choices: ["3", "4", "5"], answer: "4", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "3 + 2 = ?", choices: ["4", "5", "6"], answer: "5", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "4 + 3 = ?", choices: ["6", "7", "8"], answer: "7", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "5 + 5 = ?", choices: ["9", "10", "11"], answer: "10", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "6 − 1 = ?", choices: ["5", "4", "6"], answer: "5", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "8 − 3 = ?", choices: ["4", "5", "6"], answer: "5", emoji: "🧮" },
  { level: "M2", difficulty: 1, question: "10 − 4 = ?", choices: ["5", "6", "7"], answer: "6", emoji: "🧮" },
  /* --- medium --- */
  { level: "M2", difficulty: 2, question: "7 + 6 = ?", choices: ["12", "13", "14"], answer: "13", emoji: "🧮" },
  { level: "M2", difficulty: 2, question: "9 + 8 = ?", choices: ["16", "17", "18"], answer: "17", emoji: "🧮" },
  { level: "M2", difficulty: 2, question: "15 − 7 = ?", choices: ["7", "8", "9"], answer: "8", emoji: "🧮" },
  { level: "M2", difficulty: 2, question: "20 + 30 = ?", choices: ["40", "50", "60"], answer: "50", emoji: "🧮" },
  { level: "M2", difficulty: 2, question: "45 + 10 = ?", choices: ["55", "54", "46"], answer: "55", emoji: "🧮" },
  { level: "M2", difficulty: 2, question: "You have 4 sweets. Mum gives you 3 more. How many sweets now?", choices: ["6", "7", "8"], answer: "7", emoji: "🍬" },
  { level: "M2", difficulty: 2, question: "There are 9 birds on a tree. 4 fly away. How many are left?", choices: ["4", "5", "6"], answer: "5", emoji: "🐦" },
  /* --- hard --- */
  { level: "M2", difficulty: 3, question: "60 − 20 = ?", choices: ["30", "40", "50"], answer: "40", emoji: "🧮" },
  { level: "M2", difficulty: 3, question: "34 + 5 = ?", choices: ["38", "39", "40"], answer: "39", emoji: "🧮" },
  { level: "M2", difficulty: 3, question: "78 − 6 = ?", choices: ["71", "72", "73"], answer: "72", emoji: "🧮" },
  { level: "M2", difficulty: 3, question: "6 fish and 6 more fish. How many fish altogether?", choices: ["10", "12", "13"], answer: "12", emoji: "🐟" },
  { level: "M2", difficulty: 3, question: "25 + 25 = ?", choices: ["40", "50", "55"], answer: "50", emoji: "🧮" },
  { level: "M2", difficulty: 3, question: "50 − 25 = ?", choices: ["25", "35", "15"], answer: "25", emoji: "🧮" },

  /* ============ M3 — Fractions ============ */
  /* --- easy --- */
  { level: "M3", difficulty: 1, question: "What fraction of the pizza is orange?", choices: ["one half", "one quarter", "one whole"], answer: "one half",
    visual: { type: "fraction", parts: 2, shaded: 1, shape: "circle" } },
  { level: "M3", difficulty: 1, question: "What part of the cake is orange?", choices: ["one half", "one quarter", "one whole"], answer: "one half",
    visual: { type: "fraction", parts: 2, shaded: 1, shape: "square" } },
  { level: "M3", difficulty: 1, question: "How many parts is this pizza cut into?", choices: ["2", "3", "4"], answer: "2",
    visual: { type: "fraction", parts: 2, shaded: 1, shape: "circle" } },
  { level: "M3", difficulty: 1, question: "Cut a cake into 2 EQUAL parts. Each part is…", choices: ["one half", "one quarter", "one whole"], answer: "one half", emoji: "🎂" },
  { level: "M3", difficulty: 1, question: "The WHOLE pizza is orange! How much is that?", choices: ["one whole", "one half", "one quarter"], answer: "one whole",
    visual: { type: "fraction", parts: 2, shaded: 2, shape: "circle" } },
  { level: "M3", difficulty: 1, question: "The orange part is one…", choices: ["half", "quarter", "whole"], answer: "half",
    visual: { type: "fraction", parts: 2, shaded: 1, shape: "circle" } },
  { level: "M3", difficulty: 1, question: "How many HALVES make one whole?", choices: ["2", "3", "4"], answer: "2", emoji: "🍉" },
  /* --- medium --- */
  { level: "M3", difficulty: 2, question: "What fraction of the pizza is orange?", choices: ["one half", "one quarter", "one whole"], answer: "one quarter",
    visual: { type: "fraction", parts: 4, shaded: 1, shape: "circle" } },
  { level: "M3", difficulty: 2, question: "What part of the cake is orange?", choices: ["one half", "one quarter", "one whole"], answer: "one quarter",
    visual: { type: "fraction", parts: 4, shaded: 1, shape: "square" } },
  { level: "M3", difficulty: 2, question: "Cut a pizza into 4 EQUAL parts. Each part is…", choices: ["one quarter", "one half", "one whole"], answer: "one quarter", emoji: "🍕" },
  { level: "M3", difficulty: 2, question: "How many QUARTERS make one whole?", choices: ["2", "3", "4"], answer: "4", emoji: "🍊" },
  { level: "M3", difficulty: 2, question: "How many quarters are orange?", choices: ["1", "2", "3"], answer: "2",
    visual: { type: "fraction", parts: 4, shaded: 2, shape: "circle" } },
  { level: "M3", difficulty: 2, question: "How many parts are NOT orange?", choices: ["3", "2", "4"], answer: "3",
    visual: { type: "fraction", parts: 4, shaded: 1, shape: "circle" } },
  { level: "M3", difficulty: 2, question: "Which is SMALLER?", choices: ["one quarter", "one half", "They are the same"], answer: "one quarter", emoji: "🍰" },
  /* --- hard --- */
  { level: "M3", difficulty: 3, question: "How many quarters are orange?", choices: ["2", "3", "4"], answer: "3",
    visual: { type: "fraction", parts: 4, shaded: 3, shape: "circle" } },
  { level: "M3", difficulty: 3, question: "Which is BIGGER?", choices: ["one half", "one quarter", "They are the same"], answer: "one half", emoji: "🍰" },
  { level: "M3", difficulty: 3, question: "The whole cake is orange. How much of the cake is that?", choices: ["one whole", "one half", "one quarter"], answer: "one whole",
    visual: { type: "fraction", parts: 4, shaded: 4, shape: "square" } },
  { level: "M3", difficulty: 3, question: "Ali eats one HALF of a banana. Abu eats one QUARTER. Who eats more?", choices: ["Ali", "Abu", "Same"], answer: "Ali", emoji: "🍌" },
  { level: "M3", difficulty: 3, question: "Aina cut her pizza into 4 equal parts and ate 2 parts. How many quarters are left?", choices: ["2", "1", "3"], answer: "2", emoji: "🍕" },
  { level: "M3", difficulty: 3, question: "Two halves of a cake make…", choices: ["one whole cake", "one quarter", "one half"], answer: "one whole cake", emoji: "🎂" },

  /* ============ M4 — Money ============ */
  /* --- easy --- */
  { level: "M4", difficulty: 1, question: "How much is this coin?", choices: ["5 sen", "10 sen", "20 sen"], answer: "5 sen",
    visual: { type: "money", items: ["5 sen"] } },
  { level: "M4", difficulty: 1, question: "How much is this coin?", choices: ["20 sen", "5 sen", "50 sen"], answer: "20 sen",
    visual: { type: "money", items: ["20 sen"] } },
  { level: "M4", difficulty: 1, question: "How much money is this?", choices: ["20 sen", "10 sen", "30 sen"], answer: "20 sen",
    visual: { type: "money", items: ["10 sen", "10 sen"] } },
  { level: "M4", difficulty: 1, question: "How much money is this?", choices: ["10 sen", "5 sen", "25 sen"], answer: "10 sen",
    visual: { type: "money", items: ["5 sen", "5 sen"] } },
  { level: "M4", difficulty: 1, question: "How much money is this?", choices: ["RM2", "RM1", "RM3"], answer: "RM2",
    visual: { type: "money", items: ["RM1", "RM1"] } },
  { level: "M4", difficulty: 1, question: "Which coin is worth the MOST?", choices: ["50 sen", "20 sen", "5 sen"], answer: "50 sen", emoji: "🪙" },
  { level: "M4", difficulty: 1, question: "Which is worth MORE?", choices: ["RM5", "RM1", "50 sen"], answer: "RM5", emoji: "💵" },
  /* --- medium --- */
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["15 sen", "10 sen", "50 sen"], answer: "15 sen",
    visual: { type: "money", items: ["10 sen", "5 sen"] } },
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["30 sen", "20 sen", "40 sen"], answer: "30 sen",
    visual: { type: "money", items: ["20 sen", "10 sen"] } },
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["60 sen", "50 sen", "40 sen"], answer: "60 sen",
    visual: { type: "money", items: ["50 sen", "10 sen"] } },
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["RM6", "RM5", "RM4"], answer: "RM6",
    visual: { type: "money", items: ["RM5", "RM1"] } },
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["RM15", "RM10", "RM50"], answer: "RM15",
    visual: { type: "money", items: ["RM10", "RM5"] } },
  { level: "M4", difficulty: 2, question: "How much money is this?", choices: ["50 sen", "40 sen", "60 sen"], answer: "50 sen",
    visual: { type: "money", items: ["20 sen", "20 sen", "10 sen"] } },
  { level: "M4", difficulty: 2, question: "How many 10 sen coins make 50 sen?", choices: ["4", "5", "6"], answer: "5", emoji: "🪙" },
  /* --- hard --- */
  { level: "M4", difficulty: 3, question: "How much money is this?", choices: ["80 sen", "70 sen", "85 sen"], answer: "80 sen",
    visual: { type: "money", items: ["50 sen", "20 sen", "10 sen"] } },
  { level: "M4", difficulty: 3, question: "How much money is this?", choices: ["25 sen", "20 sen", "30 sen"], answer: "25 sen",
    visual: { type: "money", items: ["10 sen", "10 sen", "5 sen"] } },
  { level: "M4", difficulty: 3, question: "A sweet costs 10 sen. You pay with a 20 sen coin. How much change do you get?", choices: ["10 sen", "5 sen", "20 sen"], answer: "10 sen", emoji: "🍬" },
  { level: "M4", difficulty: 3, question: "A pencil costs RM1. A book costs RM5. Together they cost…", choices: ["RM6", "RM4", "RM5"], answer: "RM6", emoji: "✏️" },
  { level: "M4", difficulty: 3, question: "Ali has 50 sen. He buys a sweet for 20 sen. How much is left?", choices: ["30 sen", "20 sen", "40 sen"], answer: "30 sen", emoji: "🍬" },
  { level: "M4", difficulty: 3, question: "A toy costs RM3. Which money is ENOUGH to buy it?", choices: ["RM5", "RM1", "50 sen"], answer: "RM5", emoji: "🧸" },

  /* ============ M5 — Time ============ */
  /* --- easy --- */
  { level: "M5", difficulty: 1, question: "What time is it?", choices: ["3 o'clock", "4 o'clock", "12 o'clock"], answer: "3 o'clock",
    visual: { type: "clock", hour: 3, minute: 0 } },
  { level: "M5", difficulty: 1, question: "What time is it?", choices: ["6 o'clock", "7 o'clock", "8 o'clock"], answer: "7 o'clock",
    visual: { type: "clock", hour: 7, minute: 0 } },
  { level: "M5", difficulty: 1, question: "What time is it?", choices: ["12 o'clock", "1 o'clock", "11 o'clock"], answer: "12 o'clock",
    visual: { type: "clock", hour: 12, minute: 0 } },
  { level: "M5", difficulty: 1, question: "What time is it?", choices: ["9 o'clock", "10 o'clock", "8 o'clock"], answer: "9 o'clock",
    visual: { type: "clock", hour: 9, minute: 0 } },
  { level: "M5", difficulty: 1, question: "How many days are in one week?", choices: ["5", "6", "7"], answer: "7", emoji: "📅" },
  { level: "M5", difficulty: 1, question: "We eat breakfast in the…", choices: ["morning", "night", "evening"], answer: "morning", emoji: "🌅" },
  { level: "M5", difficulty: 1, question: "The moon and stars come out at…", choices: ["night", "morning", "noon"], answer: "night", emoji: "🌙" },
  /* --- medium --- */
  { level: "M5", difficulty: 2, question: "What time is it?", choices: ["half past 4", "half past 5", "4 o'clock"], answer: "half past 4",
    visual: { type: "clock", hour: 4, minute: 30 } },
  { level: "M5", difficulty: 2, question: "What time is it?", choices: ["half past 1", "1 o'clock", "half past 12"], answer: "half past 1",
    visual: { type: "clock", hour: 1, minute: 30 } },
  { level: "M5", difficulty: 2, question: "What time is it?", choices: ["half past 6", "6 o'clock", "half past 7"], answer: "half past 6",
    visual: { type: "clock", hour: 6, minute: 30 } },
  { level: "M5", difficulty: 2, question: "How many months are in one year?", choices: ["10", "11", "12"], answer: "12", emoji: "🗓️" },
  { level: "M5", difficulty: 2, question: "Which day comes after Monday?", choices: ["Sunday", "Tuesday", "Wednesday"], answer: "Tuesday", emoji: "📅" },
  { level: "M5", difficulty: 2, question: "Which month comes FIRST in the year?", choices: ["January", "June", "December"], answer: "January", emoji: "🗓️" },
  { level: "M5", difficulty: 2, question: "Which day is a WEEKEND day?", choices: ["Saturday", "Monday", "Wednesday"], answer: "Saturday", emoji: "🎈" },
  /* --- hard --- */
  { level: "M5", difficulty: 3, question: "What time is it?", choices: ["half past 10", "half past 11", "10 o'clock"], answer: "half past 10",
    visual: { type: "clock", hour: 10, minute: 30 } },
  { level: "M5", difficulty: 3, question: "What time is it?", choices: ["half past 11", "half past 12", "11 o'clock"], answer: "half past 11",
    visual: { type: "clock", hour: 11, minute: 30 } },
  { level: "M5", difficulty: 3, question: "Which day comes before Friday?", choices: ["Thursday", "Saturday", "Monday"], answer: "Thursday", emoji: "📅" },
  { level: "M5", difficulty: 3, question: "Which day comes BETWEEN Tuesday and Thursday?", choices: ["Wednesday", "Monday", "Friday"], answer: "Wednesday", emoji: "📅" },
  { level: "M5", difficulty: 3, question: "Which month comes after June?", choices: ["July", "May", "August"], answer: "July", emoji: "🗓️" },
  { level: "M5", difficulty: 3, question: "How many days are in TWO weeks?", choices: ["14", "7", "12"], answer: "14", emoji: "📅" },

  /* ============ M6 — Measurement ============ */
  /* --- easy --- */
  { level: "M6", difficulty: 1, question: "Which animal is HEAVIER?", choices: ["🐘 elephant", "🐭 mouse", "🐜 ant"], answer: "🐘 elephant", emoji: "⚖️" },
  { level: "M6", difficulty: 1, question: "Which is LIGHTER?", choices: ["🪶 feather", "🪨 rock", "🐘 elephant"], answer: "🪶 feather", emoji: "⚖️" },
  { level: "M6", difficulty: 1, question: "Which is LONGER?", choices: ["🚌 bus", "✏️ pencil", "🐜 ant"], answer: "🚌 bus", emoji: "📏" },
  { level: "M6", difficulty: 1, question: "Which animal is TALLER?", choices: ["🦒 giraffe", "🐱 cat", "🐹 hamster"], answer: "🦒 giraffe", emoji: "📏" },
  { level: "M6", difficulty: 1, question: "Which holds MORE water?", choices: ["🛁 bathtub", "☕ cup", "🥄 spoon"], answer: "🛁 bathtub", emoji: "💧" },
  { level: "M6", difficulty: 1, question: "A watermelon and a grape — which is HEAVIER?", choices: ["🍉 watermelon", "🍇 grape", "Same"], answer: "🍉 watermelon", emoji: "⚖️" },
  { level: "M6", difficulty: 1, question: "A snake and a worm — which is usually LONGER?", choices: ["🐍 snake", "🪱 worm", "Same"], answer: "🐍 snake", emoji: "📏" },
  /* --- medium --- */
  { level: "M6", difficulty: 2, question: "Which is SHORTER?", choices: ["✏️ pencil", "🚂 train", "🚌 bus"], answer: "✏️ pencil", emoji: "📏" },
  { level: "M6", difficulty: 2, question: "Which holds LESS water?", choices: ["🥄 spoon", "🪣 pail", "🛁 bathtub"], answer: "🥄 spoon", emoji: "💧" },
  { level: "M6", difficulty: 2, question: "Which is the HEAVIEST?", choices: ["🚗 car", "🚲 bicycle", "⚽ ball"], answer: "🚗 car", emoji: "⚖️" },
  { level: "M6", difficulty: 2, question: "Which is the LIGHTEST?", choices: ["📄 paper", "📚 books", "🪑 chair"], answer: "📄 paper", emoji: "⚖️" },
  { level: "M6", difficulty: 2, question: "Which is the TALLEST?", choices: ["🏢 tall building", "🏠 house", "⛺ tent"], answer: "🏢 tall building", emoji: "📏" },
  { level: "M6", difficulty: 2, question: "Which animal is the SHORTEST?", choices: ["🐹 hamster", "🐕 dog", "🐴 horse"], answer: "🐹 hamster", emoji: "📏" },
  { level: "M6", difficulty: 2, question: "Your bottle is FULL. Your friend's bottle is HALF full. Who has MORE water?", choices: ["Me", "My friend", "Same"], answer: "Me", emoji: "🍶" },
  /* --- hard --- */
  { level: "M6", difficulty: 3, question: "One ribbon is 10 cubes long. Another is 4 cubes long. Which is LONGER?", choices: ["10 cubes", "4 cubes", "Same"], answer: "10 cubes", emoji: "🎀" },
  { level: "M6", difficulty: 3, question: "A pencil is 8 clips long. A crayon is 5 clips long. Which is SHORTER?", choices: ["crayon", "pencil", "Same"], answer: "crayon", emoji: "🖍️" },
  { level: "M6", difficulty: 3, question: "Ali's rope is 9 sticks long. Abu's rope is 9 sticks long. Whose rope is LONGER?", choices: ["Same length", "Ali's", "Abu's"], answer: "Same length", emoji: "🪢" },
  { level: "M6", difficulty: 3, question: "Which is HEAVIER: a big balloon or a small stone?", choices: ["🪨 small stone", "🎈 big balloon", "Same"], answer: "🪨 small stone", emoji: "⚖️" },
  { level: "M6", difficulty: 3, question: "Which is the LONGEST?", choices: ["🚂 train", "🚌 bus", "🚗 car"], answer: "🚂 train", emoji: "📏" },
  { level: "M6", difficulty: 3, question: "Two glasses have the SAME water. One is tall, one is short. Which has more water?", choices: ["Same", "The tall one", "The short one"], answer: "Same", emoji: "🥛" },

  /* ============ M7 — Shapes and Space ============ */
  /* --- easy --- */
  { level: "M7", difficulty: 1, question: "What shape is this?", choices: ["triangle", "square", "circle"], answer: "triangle",
    visual: { type: "shape", name: "triangle" } },
  { level: "M7", difficulty: 1, question: "What shape is this?", choices: ["circle", "square", "triangle"], answer: "circle",
    visual: { type: "shape", name: "circle" } },
  { level: "M7", difficulty: 1, question: "What shape is this?", choices: ["square", "rectangle", "triangle"], answer: "square",
    visual: { type: "shape", name: "square" } },
  { level: "M7", difficulty: 1, question: "What shape is this?", choices: ["rectangle", "square", "circle"], answer: "rectangle",
    visual: { type: "shape", name: "rectangle" } },
  { level: "M7", difficulty: 1, question: "A football looks like which 3D shape?", choices: ["sphere", "cube", "cone"], answer: "sphere", emoji: "⚽" },
  { level: "M7", difficulty: 1, question: "An ice-cream cone looks like a…", choices: ["cone", "cube", "cylinder"], answer: "cone", emoji: "🍦" },
  { level: "M7", difficulty: 1, question: "Which shape has NO corners?", choices: ["circle", "square", "triangle"], answer: "circle", emoji: "⚪" },
  /* --- medium --- */
  { level: "M7", difficulty: 2, question: "What 3D shape is this?", choices: ["cube", "sphere", "cone"], answer: "cube",
    visual: { type: "shape", name: "cube" } },
  { level: "M7", difficulty: 2, question: "What 3D shape is this?", choices: ["sphere", "cube", "cylinder"], answer: "sphere",
    visual: { type: "shape", name: "sphere" } },
  { level: "M7", difficulty: 2, question: "What 3D shape is this?", choices: ["cone", "cylinder", "cube"], answer: "cone",
    visual: { type: "shape", name: "cone" } },
  { level: "M7", difficulty: 2, question: "What 3D shape is this?", choices: ["cylinder", "cone", "sphere"], answer: "cylinder",
    visual: { type: "shape", name: "cylinder" } },
  { level: "M7", difficulty: 2, question: "How many sides does a triangle have?", choices: ["2", "3", "4"], answer: "3", emoji: "🔺" },
  { level: "M7", difficulty: 2, question: "How many sides does a square have?", choices: ["3", "4", "5"], answer: "4", emoji: "🟩" },
  { level: "M7", difficulty: 2, question: "A tin of Milo looks like which 3D shape?", choices: ["cylinder", "cube", "sphere"], answer: "cylinder", emoji: "🥫" },
  /* --- hard --- */
  { level: "M7", difficulty: 3, question: "How many corners does a rectangle have?", choices: ["4", "3", "5"], answer: "4", emoji: "🟨" },
  { level: "M7", difficulty: 3, question: "A dice looks like which 3D shape?", choices: ["cube", "sphere", "cone"], answer: "cube", emoji: "🎲" },
  { level: "M7", difficulty: 3, question: "Which 3D shape can ROLL?", choices: ["sphere", "cube", "pyramid"], answer: "sphere", emoji: "🎳" },
  { level: "M7", difficulty: 3, question: "The cloud is ___ the house. ☁️🏠", choices: ["above", "below", "inside"], answer: "above", emoji: "☁️" },
  { level: "M7", difficulty: 3, question: "The cat is UNDER the table. Where is the cat?", choices: ["below the table", "on the table", "beside the table"], answer: "below the table", emoji: "🐱" },
  { level: "M7", difficulty: 3, question: "The ball is INSIDE the box. Where is the ball?", choices: ["inside the box", "outside the box", "on top of the box"], answer: "inside the box", emoji: "📦" },

  /* ============ M8 — Data (Pictographs) ============ */
  /* --- easy --- */
  { level: "M8", difficulty: 1, question: "How many apples are there?", choices: ["2", "4", "6"], answer: "4",
    visual: { type: "pictograph", rows: [["Apples", "🍎", 4], ["Oranges", "🍊", 2]] } },
  { level: "M8", difficulty: 1, question: "How many oranges are there?", choices: ["2", "3", "4"], answer: "2",
    visual: { type: "pictograph", rows: [["Apples", "🍎", 4], ["Oranges", "🍊", 2]] } },
  { level: "M8", difficulty: 1, question: "How many dogs are there?", choices: ["3", "4", "5"], answer: "5",
    visual: { type: "pictograph", rows: [["Cats", "🐱", 3], ["Dogs", "🐶", 5]] } },
  { level: "M8", difficulty: 1, question: "How many stars does Maya have?", choices: ["4", "5", "6"], answer: "6",
    visual: { type: "pictograph", rows: [["Ali", "⭐", 4], ["Maya", "⭐", 6]] } },
  { level: "M8", difficulty: 1, question: "How many cars are there?", choices: ["4", "6", "8"], answer: "8",
    visual: { type: "pictograph", rows: [["Bikes", "🚲", 4], ["Cars", "🚗", 8]] } },
  { level: "M8", difficulty: 1, question: "How many children chose blue?", choices: ["5", "6", "7"], answer: "7",
    visual: { type: "pictograph", rows: [["Red", "🔴", 2], ["Blue", "🔵", 7]] } },
  { level: "M8", difficulty: 1, question: "Which fruit has MORE?", choices: ["Apples", "Oranges", "Same"], answer: "Apples",
    visual: { type: "pictograph", rows: [["Apples", "🍎", 4], ["Oranges", "🍊", 2]] } },
  /* --- medium --- */
  { level: "M8", difficulty: 2, question: "Which animal has MORE?", choices: ["Cats", "Dogs", "Same"], answer: "Dogs",
    visual: { type: "pictograph", rows: [["Cats", "🐱", 3], ["Dogs", "🐶", 5]] } },
  { level: "M8", difficulty: 2, question: "Who has MORE stars?", choices: ["Ali", "Maya", "Same"], answer: "Maya",
    visual: { type: "pictograph", rows: [["Ali", "⭐", 4], ["Maya", "⭐", 6]] } },
  { level: "M8", difficulty: 2, question: "Which toy has more?", choices: ["Ball", "Teddy", "Same"], answer: "Same",
    visual: { type: "pictograph", rows: [["Ball", "⚽", 5], ["Teddy", "🧸", 5]] } },
  { level: "M8", difficulty: 2, question: "How many children like burger?", choices: ["3", "6", "9"], answer: "3",
    visual: { type: "pictograph", rows: [["Nasi lemak", "🍚", 6], ["Burger", "🍔", 3]] } },
  { level: "M8", difficulty: 2, question: "Which food do MORE children like?", choices: ["Nasi lemak", "Burger", "Same"], answer: "Nasi lemak",
    visual: { type: "pictograph", rows: [["Nasi lemak", "🍚", 6], ["Burger", "🍔", 3]] } },
  { level: "M8", difficulty: 2, question: "How many bikes are there?", choices: ["4", "8", "6"], answer: "4",
    visual: { type: "pictograph", rows: [["Bikes", "🚲", 4], ["Cars", "🚗", 8]] } },
  { level: "M8", difficulty: 2, question: "Which colour did FEWER children choose?", choices: ["Red", "Blue", "Same"], answer: "Red",
    visual: { type: "pictograph", rows: [["Red", "🔴", 2], ["Blue", "🔵", 7]] } },
  /* --- hard --- */
  { level: "M8", difficulty: 3, question: "How many MORE dogs than cats?", choices: ["1", "2", "3"], answer: "2",
    visual: { type: "pictograph", rows: [["Cats", "🐱", 3], ["Dogs", "🐶", 5]] } },
  { level: "M8", difficulty: 3, question: "How many MORE cars than bikes?", choices: ["2", "4", "6"], answer: "4",
    visual: { type: "pictograph", rows: [["Bikes", "🚲", 4], ["Cars", "🚗", 8]] } },
  { level: "M8", difficulty: 3, question: "How many children are there in TOTAL?", choices: ["8", "9", "10"], answer: "9",
    visual: { type: "pictograph", rows: [["Red", "🔴", 2], ["Blue", "🔵", 7]] } },
  { level: "M8", difficulty: 3, question: "How many fruits are there ALTOGETHER?", choices: ["6", "4", "2"], answer: "6",
    visual: { type: "pictograph", rows: [["Apples", "🍎", 4], ["Oranges", "🍊", 2]] } },
  { level: "M8", difficulty: 3, question: "How many animals are there ALTOGETHER?", choices: ["8", "7", "9"], answer: "8",
    visual: { type: "pictograph", rows: [["Cats", "🐱", 3], ["Dogs", "🐶", 5]] } },
  { level: "M8", difficulty: 3, question: "How many MORE rainy days on Tuesday than Monday?", choices: ["3", "6", "9"], answer: "3",
    visual: { type: "pictograph", rows: [["Monday", "☔", 3], ["Tuesday", "☔", 6]] } }
];
