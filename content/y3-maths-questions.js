/* ============================================================
   YEAR 3 MATHS QUESTIONS — fixed bank (KSSR Semakan, DLP English)
   Used by Year 3 Maths World checkpoints, MIXED with questions
   from the procedural engine (y3-math-engine.js) for the
   arithmetic chapters.

   ✏️ HOW TO EDIT (no coding needed!):
   1. One question = one block between { and }, — copy, paste, edit.
   2. Parts:
        course:     "C1".."C9" (see the world map for names)
        difficulty: 1 = easy, 2 = medium, 3 = hard
                    (each course asks 10: checkpoints 1-4 easy,
                    5-7 medium, 8-10 hard — always rising)
        question / choices (THREE) / answer (must match EXACTLY)
        visual:     optional drawn picture — same as Year 1:
          { type:"clock", hour:3, minute:0|30 }
          { type:"fraction", parts:4, shaded:1, shape:"circle" }
          { type:"pictograph", rows:[["Blue","🔵",7],["Red","🔴",2]] }
          { type:"money", items:["RM5","50 sen"] }
   3. Keep at least 10 easy + 7 medium + 7 hard per course.
   ✏️ STATION data (the mini-games at checkpoints 4 and 8) is at
   the bottom — one item per line, same copy-paste style.
   ============================================================ */

window.Y3_MATHS_QUESTIONS = [

/* ============ C1 — Numbers up to 10 000 ============ */
{ course: "C1", difficulty: 1, question: "What is the value of the digit 3 in 3 452?", choices: ["3000", "300", "3"], answer: "3000" },
{ course: "C1", difficulty: 1, question: "What number comes after 6 999?", choices: ["7000", "6998", "7100"], answer: "7000" },
{ course: "C1", difficulty: 1, question: "What number comes before 5 000?", choices: ["4999", "5001", "4990"], answer: "4999" },
{ course: "C1", difficulty: 1, question: "How do we write 'two thousand and fifty'?", choices: ["2050", "2500", "250"], answer: "2050" },
{ course: "C1", difficulty: 1, question: "In 8 217, which digit is in the HUNDREDS place?", choices: ["2", "8", "1"], answer: "2" },
{ course: "C1", difficulty: 1, question: "Which is the SMALLEST: 4 505, 4 055, 4 550?", choices: ["4055", "4505", "4550"], answer: "4055" },
{ course: "C1", difficulty: 1, question: "Count in thousands: 3 000, 4 000, ___?", choices: ["5000", "4100", "6000"], answer: "5000" },
{ course: "C1", difficulty: 1, question: "9 999 + 1 = ?", choices: ["10000", "9998", "10009"], answer: "10000" },
{ course: "C1", difficulty: 1, question: "Which number is 'six thousand three hundred'?", choices: ["6300", "6030", "630"], answer: "6300" },
{ course: "C1", difficulty: 1, question: "In 7 084, which digit is in the TENS place?", choices: ["8", "0", "4"], answer: "8" },
{ course: "C1", difficulty: 2, question: "Which is BIGGER: 4 890 or 4 908?", choices: ["4908", "4890", "They are equal"], answer: "4908" },
{ course: "C1", difficulty: 2, question: "Complete the pattern: 2 500, 3 000, 3 500, ___", choices: ["4000", "3600", "4500"], answer: "4000" },
{ course: "C1", difficulty: 2, question: "5 000 + 300 + 40 + 2 = ?", choices: ["5342", "5432", "5324"], answer: "5342" },
{ course: "C1", difficulty: 2, question: "Arrange from SMALLEST: 3 210, 3 021, 3 120 — which comes first?", choices: ["3021", "3120", "3210"], answer: "3021" },
{ course: "C1", difficulty: 2, question: "Which number has 7 in the THOUSANDS place?", choices: ["7245", "2745", "2475"], answer: "7245" },
{ course: "C1", difficulty: 2, question: "Complete: 9 100, 9 200, 9 300, ___", choices: ["9400", "9310", "10300"], answer: "9400" },
{ course: "C1", difficulty: 2, question: "1 000 more than 4 350 is ___?", choices: ["5350", "4450", "4360"], answer: "5350" },
{ course: "C1", difficulty: 3, question: "Round 7 468 to the nearest HUNDRED.", choices: ["7500", "7400", "7470"], answer: "7500" },
{ course: "C1", difficulty: 3, question: "Round 3 219 to the nearest THOUSAND.", choices: ["3000", "4000", "3200"], answer: "3000" },
{ course: "C1", difficulty: 3, question: "I am a number. My thousands digit is 5, my ones digit is 8, and my other digits are 0. What am I?", choices: ["5008", "5080", "5800"], answer: "5008" },
{ course: "C1", difficulty: 3, question: "I am between 6 990 and 7 010. My ones digit is 5. What am I?", choices: ["6995 or 7005", "6985", "7015"], answer: "6995 or 7005" },
{ course: "C1", difficulty: 3, question: "Which number rounds to 8 000 (nearest thousand)?", choices: ["7623", "8590", "7099"], answer: "7623" },
{ course: "C1", difficulty: 3, question: "In the number 9 099, the digit 9 appears in which places?", choices: ["Thousands, tens and ones", "Thousands and hundreds only", "Hundreds and ones only"], answer: "Thousands, tens and ones" },
{ course: "C1", difficulty: 3, question: "What is 10 less than 8 003?", choices: ["7993", "8013", "7903"], answer: "7993" },

/* ============ C2 — Add, Subtract, Multiply, Divide ============ */
{ course: "C2", difficulty: 1, question: "6 × 5 = ?", choices: ["30", "25", "35"], answer: "30" },
{ course: "C2", difficulty: 1, question: "4 × 10 = ?", choices: ["40", "14", "44"], answer: "40" },
{ course: "C2", difficulty: 1, question: "3 × 4 = ?", choices: ["12", "9", "16"], answer: "12" },
{ course: "C2", difficulty: 1, question: "45 + 23 = ?", choices: ["68", "58", "78"], answer: "68" },
{ course: "C2", difficulty: 1, question: "76 − 34 = ?", choices: ["42", "32", "52"], answer: "42" },
{ course: "C2", difficulty: 1, question: "20 ÷ 5 = ?", choices: ["4", "5", "3"], answer: "4" },
{ course: "C2", difficulty: 1, question: "Double of 8 is ___?", choices: ["16", "10", "18"], answer: "16" },
{ course: "C2", difficulty: 1, question: "Half of 20 is ___?", choices: ["10", "5", "40"], answer: "10" },
{ course: "C2", difficulty: 1, question: "5 × 5 = ?", choices: ["25", "20", "30"], answer: "25" },
{ course: "C2", difficulty: 1, question: "30 ÷ 10 = ?", choices: ["3", "10", "20"], answer: "3" },
{ course: "C2", difficulty: 2, question: "7 × 8 = ?", choices: ["56", "54", "63"], answer: "56" },
{ course: "C2", difficulty: 2, question: "9 × 6 = ?", choices: ["54", "56", "45"], answer: "54" },
{ course: "C2", difficulty: 2, question: "72 ÷ 8 = ?", choices: ["9", "8", "7"], answer: "9" },
{ course: "C2", difficulty: 2, question: "63 ÷ 7 = ?", choices: ["9", "8", "7"], answer: "9" },
{ course: "C2", difficulty: 2, question: "346 + 278 = ?", choices: ["624", "614", "524"], answer: "624" },
{ course: "C2", difficulty: 2, question: "512 − 176 = ?", choices: ["336", "346", "436"], answer: "336" },
{ course: "C2", difficulty: 2, question: "There are 8 plates with 6 kuih on each. How many kuih altogether?", choices: ["48", "42", "56"], answer: "48" },
{ course: "C2", difficulty: 3, question: "A box holds 6 eggs. Mother buys 4 boxes and uses 5 eggs. How many eggs are LEFT?", choices: ["19", "24", "14"], answer: "19" },
{ course: "C2", difficulty: 3, question: "▲ × 7 = 56. What is ▲?", choices: ["8", "7", "9"], answer: "8" },
{ course: "C2", difficulty: 3, question: "54 ÷ ▲ = 6. What is ▲?", choices: ["9", "8", "6"], answer: "9" },
{ course: "C2", difficulty: 3, question: "Ali reads 9 pages a day. After 6 days, how many pages MORE to finish a 60-page book?", choices: ["6", "54", "9"], answer: "6" },
{ course: "C2", difficulty: 3, question: "A van carries 8 pupils. How many vans for 35 pupils? (Everyone must get a seat!)", choices: ["5", "4", "8"], answer: "5" },
{ course: "C2", difficulty: 3, question: "3 packets of 9 stickers, then Ali gives away 7. How many left?", choices: ["20", "27", "34"], answer: "20" },
{ course: "C2", difficulty: 3, question: "Which TWO numbers multiply to make 36?", choices: ["4 and 9", "5 and 7", "6 and 7"], answer: "4 and 9" },

/* ============ C3 — Fractions, Decimals & Percentages ============ */
{ course: "C3", difficulty: 1, question: "What fraction is shaded?", choices: ["1/4", "1/2", "3/4"], answer: "1/4",
  visual: { type: "fraction", parts: 4, shaded: 1, shape: "circle" } },
{ course: "C3", difficulty: 1, question: "What fraction is shaded?", choices: ["2/3", "1/3", "2/2"], answer: "2/3",
  visual: { type: "fraction", parts: 3, shaded: 2, shape: "square" } },
{ course: "C3", difficulty: 1, question: "Which is a PROPER fraction (top smaller than bottom)?", choices: ["3/8", "8/3", "8/8"], answer: "3/8" },
{ course: "C3", difficulty: 1, question: "One whole pizza cut into 8 equal slices. Each slice is ___?", choices: ["1/8", "8/1", "1/4"], answer: "1/8" },
{ course: "C3", difficulty: 1, question: "0.5 means how many tenths?", choices: ["5 tenths", "5 ones", "50 tenths"], answer: "5 tenths" },
{ course: "C3", difficulty: 1, question: "How do we write 'seven tenths' as a decimal?", choices: ["0.7", "7.0", "0.07"], answer: "0.7" },
{ course: "C3", difficulty: 1, question: "Which fraction means HALF?", choices: ["1/2", "1/3", "2/1"], answer: "1/2" },
{ course: "C3", difficulty: 1, question: "What fraction is NOT shaded?", choices: ["3/4", "1/4", "4/4"], answer: "3/4",
  visual: { type: "fraction", parts: 4, shaded: 1, shape: "square" } },
{ course: "C3", difficulty: 1, question: "Which is a decimal number?", choices: ["2.4", "24", "2/4"], answer: "2.4" },
{ course: "C3", difficulty: 1, question: "1/4 of a cake plus 1/4 more of the SAME cake = ?", choices: ["2/4", "1/8", "2/8"], answer: "2/4" },
{ course: "C3", difficulty: 2, question: "Which fraction is EQUAL to 1/2?", choices: ["2/4", "1/4", "2/3"], answer: "2/4" },
{ course: "C3", difficulty: 2, question: "Write 2/8 in its SIMPLEST form.", choices: ["1/4", "1/2", "2/4"], answer: "1/4" },
{ course: "C3", difficulty: 2, question: "Which is BIGGER: 0.3 or 0.7?", choices: ["0.7", "0.3", "They are equal"], answer: "0.7" },
{ course: "C3", difficulty: 2, question: "1/2 + 1/4 = ?", choices: ["3/4", "2/6", "1/6"], answer: "3/4" },
{ course: "C3", difficulty: 2, question: "Which is SMALLER: 0.9 or 0.19?", choices: ["0.19", "0.9", "They are equal"], answer: "0.19" },
{ course: "C3", difficulty: 2, question: "Which decimal equals 3/10?", choices: ["0.3", "3.10", "0.03"], answer: "0.3" },
{ course: "C3", difficulty: 2, question: "Which fraction is equal to 2/3?", choices: ["4/6", "3/2", "2/6"], answer: "4/6" },
{ course: "C3", difficulty: 3, question: "Write 5/4 as a MIXED number.", choices: ["1 1/4", "4 1/5", "1 4/5"], answer: "1 1/4" },
{ course: "C3", difficulty: 3, question: "0.25 of the 100 squares are red. How many squares are red?", choices: ["25", "4", "75"], answer: "25" },
{ course: "C3", difficulty: 3, question: "50% of a pizza is the same as ___?", choices: ["half the pizza", "a quarter", "the whole pizza"], answer: "half the pizza" },
{ course: "C3", difficulty: 3, question: "Write 1 3/4 as an IMPROPER fraction.", choices: ["7/4", "4/7", "13/4"], answer: "7/4" },
{ course: "C3", difficulty: 3, question: "Which is the BIGGEST: 0.5, 1/4, or 0.75?", choices: ["0.75", "0.5", "1/4"], answer: "0.75" },
{ course: "C3", difficulty: 3, question: "25% of the class are boys. What fraction is that?", choices: ["1/4", "1/2", "2/5"], answer: "1/4" },
{ course: "C3", difficulty: 3, question: "3/4 − 1/4 = ?", choices: ["2/4", "2/8", "4/8"], answer: "2/4" },

/* ============ C4 — Money ============ */
{ course: "C4", difficulty: 1, question: "RM2.50 + RM1.20 = ?", choices: ["RM3.70", "RM3.50", "RM4.70"], answer: "RM3.70" },
{ course: "C4", difficulty: 1, question: "How much money is this?", choices: ["RM5.50", "RM5.05", "RM10.50"], answer: "RM5.50",
  visual: { type: "money", items: ["RM5", "50 sen"] } },
{ course: "C4", difficulty: 1, question: "RM1 is the same as how many sen?", choices: ["100 sen", "10 sen", "1000 sen"], answer: "100 sen" },
{ course: "C4", difficulty: 1, question: "RM4.00 + RM3.00 = ?", choices: ["RM7.00", "RM6.00", "RM8.00"], answer: "RM7.00" },
{ course: "C4", difficulty: 1, question: "Which is worth the MOST?", choices: ["RM50", "RM10", "RM5"], answer: "RM50" },
{ course: "C4", difficulty: 1, question: "A pencil costs 80 sen. A pen costs RM1.20. Which is CHEAPER?", choices: ["The pencil", "The pen", "Same price"], answer: "The pencil" },
{ course: "C4", difficulty: 1, question: "RM10 − RM4 = ?", choices: ["RM6", "RM5", "RM14"], answer: "RM6" },
{ course: "C4", difficulty: 1, question: "How much money is this?", choices: ["RM16", "RM11", "RM20"], answer: "RM16",
  visual: { type: "money", items: ["RM10", "RM5", "RM1"] } },
{ course: "C4", difficulty: 1, question: "Two 50 sen coins make ___?", choices: ["RM1", "RM5", "50 sen"], answer: "RM1" },
{ course: "C4", difficulty: 1, question: "RM3.50 + RM2.00 = ?", choices: ["RM5.50", "RM5.00", "RM3.70"], answer: "RM5.50" },
{ course: "C4", difficulty: 2, question: "A book costs RM6.40. You pay RM10. Your change is ___?", choices: ["RM3.60", "RM4.60", "RM3.40"], answer: "RM3.60" },
{ course: "C4", difficulty: 2, question: "Which combination makes RM5.60?", choices: ["RM5 + 50 sen + 10 sen", "RM5 + 20 sen", "RM5 + 5 sen + 10 sen"], answer: "RM5 + 50 sen + 10 sen" },
{ course: "C4", difficulty: 2, question: "Nasi lemak RM2.50 and teh tarik RM1.80. Total?", choices: ["RM4.30", "RM4.50", "RM3.30"], answer: "RM4.30" },
{ course: "C4", difficulty: 2, question: "RM7.90 + RM2.10 = ?", choices: ["RM10.00", "RM9.00", "RM10.10"], answer: "RM10.00" },
{ course: "C4", difficulty: 2, question: "You pay RM5 for a drink costing RM3.20. Change?", choices: ["RM1.80", "RM2.80", "RM1.20"], answer: "RM1.80" },
{ course: "C4", difficulty: 2, question: "Which is MORE: RM8.05 or RM8.50?", choices: ["RM8.50", "RM8.05", "They are equal"], answer: "RM8.50" },
{ course: "C4", difficulty: 2, question: "3 kuih at RM1.20 each. Total?", choices: ["RM3.60", "RM3.20", "RM2.40"], answer: "RM3.60" },
{ course: "C4", difficulty: 3, question: "Aiman has RM50. He buys a book for RM18.90 and a pen for RM3.50. How much is LEFT?", choices: ["RM27.60", "RM28.60", "RM22.40"], answer: "RM27.60" },
{ course: "C4", difficulty: 3, question: "Mother buys fish for RM12.80 and vegetables for RM5.60. She pays RM20. Change?", choices: ["RM1.60", "RM2.60", "RM1.40"], answer: "RM1.60" },
{ course: "C4", difficulty: 3, question: "A toy costs RM9.90. Adam saves RM2.50 each week. After 4 weeks can he buy it, and how much extra?", choices: ["Yes, 10 sen extra", "No, short by RM1", "Yes, RM1 extra"], answer: "Yes, 10 sen extra" },
{ course: "C4", difficulty: 3, question: "Two brothers share the cost of a RM15 gift EQUALLY. Each pays ___?", choices: ["RM7.50", "RM7.00", "RM8.50"], answer: "RM7.50" },
{ course: "C4", difficulty: 3, question: "1 packet of milk is RM4.80. How much for 2 packets, paying with RM10 — what is the change?", choices: ["40 sen", "RM1.40", "RM4.80"], answer: "40 sen" },
{ course: "C4", difficulty: 3, question: "Sara has three RM1 notes, two 50 sen and one 20 sen. How much altogether?", choices: ["RM4.20", "RM4.70", "RM3.70"], answer: "RM4.20" },
{ course: "C4", difficulty: 3, question: "Which is enough to buy a RM7.35 lunch: RM7.30, RM7.05 or RM7.50?", choices: ["RM7.50", "RM7.30", "RM7.05"], answer: "RM7.50" },

/* ============ C5 — Time ============ */
{ course: "C5", difficulty: 1, question: "What time is it?", choices: ["8 o'clock", "12 o'clock", "6 o'clock"], answer: "8 o'clock",
  visual: { type: "clock", hour: 8, minute: 0 } },
{ course: "C5", difficulty: 1, question: "What time is it?", choices: ["half past 2", "half past 6", "2 o'clock"], answer: "half past 2",
  visual: { type: "clock", hour: 2, minute: 30 } },
{ course: "C5", difficulty: 1, question: "How many days are in a week?", choices: ["7", "5", "12"], answer: "7" },
{ course: "C5", difficulty: 1, question: "How many months are in a year?", choices: ["12", "10", "7"], answer: "12" },
{ course: "C5", difficulty: 1, question: "How many minutes are in ONE hour?", choices: ["60", "30", "100"], answer: "60" },
{ course: "C5", difficulty: 1, question: "Which month comes after March?", choices: ["April", "May", "February"], answer: "April" },
{ course: "C5", difficulty: 1, question: "School starts in the ___.", choices: ["morning", "night", "midnight"], answer: "morning" },
{ course: "C5", difficulty: 1, question: "What time is it?", choices: ["11 o'clock", "10 o'clock", "12 o'clock"], answer: "11 o'clock",
  visual: { type: "clock", hour: 11, minute: 0 } },
{ course: "C5", difficulty: 1, question: "Which day comes after Friday?", choices: ["Saturday", "Thursday", "Monday"], answer: "Saturday" },
{ course: "C5", difficulty: 1, question: "How many hours are in ONE day?", choices: ["24", "12", "60"], answer: "24" },
{ course: "C5", difficulty: 2, question: "The minute hand points at 3. We say ___.", choices: ["quarter past", "quarter to", "half past"], answer: "quarter past" },
{ course: "C5", difficulty: 2, question: "The minute hand points at 9. We say ___.", choices: ["quarter to", "quarter past", "o'clock"], answer: "quarter to" },
{ course: "C5", difficulty: 2, question: "How many minutes from 4:00 to 4:45?", choices: ["45 minutes", "15 minutes", "40 minutes"], answer: "45 minutes" },
{ course: "C5", difficulty: 2, question: "Recess starts at 10:00 and ends at 10:30. How long is recess?", choices: ["30 minutes", "60 minutes", "10 minutes"], answer: "30 minutes" },
{ course: "C5", difficulty: 2, question: "Which is LONGER: 1 hour or 45 minutes?", choices: ["1 hour", "45 minutes", "They are equal"], answer: "1 hour" },
{ course: "C5", difficulty: 2, question: "Today is Wednesday. What day was YESTERDAY?", choices: ["Tuesday", "Thursday", "Monday"], answer: "Tuesday" },
{ course: "C5", difficulty: 2, question: "How many days are in 3 weeks?", choices: ["21", "14", "30"], answer: "21" },
{ course: "C5", difficulty: 3, question: "A movie starts at 3:30 and ends at 5:00. How long is the movie?", choices: ["1 hour 30 minutes", "1 hour", "2 hours"], answer: "1 hour 30 minutes" },
{ course: "C5", difficulty: 3, question: "The bus left at 8:15 and arrived 45 minutes later. What time did it arrive?", choices: ["9:00", "8:45", "9:15"], answer: "9:00" },
{ course: "C5", difficulty: 3, question: "Football practice is 2:45 to 4:15. How long is practice?", choices: ["1 hour 30 minutes", "1 hour 15 minutes", "2 hours"], answer: "1 hour 30 minutes" },
{ course: "C5", difficulty: 3, question: "Ali sleeps at 9:30 pm and wakes at 6:30 am. How long did he sleep?", choices: ["9 hours", "8 hours", "10 hours"], answer: "9 hours" },
{ course: "C5", difficulty: 3, question: "Today is 29 March. In 3 days it will be ___.", choices: ["1 April", "31 March", "2 April"], answer: "1 April" },
{ course: "C5", difficulty: 3, question: "A cake needs 40 minutes to bake. It goes in at 5:35. When is it ready?", choices: ["6:15", "6:05", "5:75"], answer: "6:15" },
{ course: "C5", difficulty: 3, question: "Which is the SHORTEST time?", choices: ["70 minutes", "2 hours", "1 hour 30 minutes"], answer: "70 minutes" },

/* ============ C6 — Length, Mass & Volume of Liquid ============ */
{ course: "C6", difficulty: 1, question: "We measure water in ___.", choices: ["millilitres (ml)", "kilograms (kg)", "centimetres (cm)"], answer: "millilitres (ml)" },
{ course: "C6", difficulty: 1, question: "We measure how HEAVY something is in ___.", choices: ["grams (g)", "metres (m)", "litres (l)"], answer: "grams (g)" },
{ course: "C6", difficulty: 1, question: "We measure the LENGTH of a pencil in ___.", choices: ["centimetres (cm)", "litres (l)", "kilograms (kg)"], answer: "centimetres (cm)" },
{ course: "C6", difficulty: 1, question: "Which tool measures LENGTH?", choices: ["Ruler", "Thermometer", "Cup"], answer: "Ruler" },
{ course: "C6", difficulty: 1, question: "Which tool measures MASS (weight)?", choices: ["Weighing scale", "Ruler", "Stopwatch"], answer: "Weighing scale" },
{ course: "C6", difficulty: 1, question: "Which is HEAVIER: 5 kg of rice or 1 kg of sugar?", choices: ["5 kg of rice", "1 kg of sugar", "Same"], answer: "5 kg of rice" },
{ course: "C6", difficulty: 1, question: "Which is LONGER: 9 m or 4 m?", choices: ["9 m", "4 m", "Same"], answer: "9 m" },
{ course: "C6", difficulty: 1, question: "A big bottle holds MORE water than a small cup. True?", choices: ["True", "False", "Cannot know"], answer: "True" },
{ course: "C6", difficulty: 1, question: "Which unit is best for a LONG road?", choices: ["metres (m)", "centimetres (cm)", "millilitres (ml)"], answer: "metres (m)" },
{ course: "C6", difficulty: 1, question: "Which holds about 1 LITRE?", choices: ["A big milk carton", "A teaspoon", "A swimming pool"], answer: "A big milk carton" },
{ course: "C6", difficulty: 2, question: "100 cm is the same as ___.", choices: ["1 m", "10 m", "1 km"], answer: "1 m" },
{ course: "C6", difficulty: 2, question: "1 000 g is the same as ___.", choices: ["1 kg", "10 kg", "100 kg"], answer: "1 kg" },
{ course: "C6", difficulty: 2, question: "1 000 ml is the same as ___.", choices: ["1 litre", "10 litres", "1 kg"], answer: "1 litre" },
{ course: "C6", difficulty: 2, question: "Which is MORE: 500 ml or 1 litre?", choices: ["1 litre", "500 ml", "Same"], answer: "1 litre" },
{ course: "C6", difficulty: 2, question: "A table is 2 m long. That is the same as ___ cm.", choices: ["200", "20", "2000"], answer: "200" },
{ course: "C6", difficulty: 2, question: "Which is LIGHTER: 900 g or 1 kg?", choices: ["900 g", "1 kg", "Same"], answer: "900 g" },
{ course: "C6", difficulty: 2, question: "A jug has 750 ml of juice. Adam pours in 250 ml more. Total?", choices: ["1 litre", "900 ml", "1 100 ml"], answer: "1 litre" },
{ course: "C6", difficulty: 3, question: "A rope is 2 m long. Ali cuts off 75 cm. How long is the rope now, in cm?", choices: ["125 cm", "135 cm", "175 cm"], answer: "125 cm" },
{ course: "C6", difficulty: 3, question: "A watermelon is 2 kg 500 g. A papaya is 1 kg 300 g. Total mass?", choices: ["3 kg 800 g", "3 kg 200 g", "4 kg 800 g"], answer: "3 kg 800 g" },
{ course: "C6", difficulty: 3, question: "A pail holds 5 l. It has 2 l 400 ml inside. How much MORE fits?", choices: ["2 l 600 ml", "3 l 400 ml", "2 l 400 ml"], answer: "2 l 600 ml" },
{ course: "C6", difficulty: 3, question: "Sara is 1 m 32 cm tall. Her brother is 1 m 8 cm. Who is taller and by how much?", choices: ["Sara, by 24 cm", "Brother, by 24 cm", "Sara, by 32 cm"], answer: "Sara, by 24 cm" },
{ course: "C6", difficulty: 3, question: "Which is the HEAVIEST?", choices: ["1 kg 900 g", "1 500 g", "1 kg 90 g"], answer: "1 kg 900 g" },
{ course: "C6", difficulty: 3, question: "3 ribbons, each 40 cm, tied end to end (ignore knots). Total length?", choices: ["120 cm", "80 cm", "140 cm"], answer: "120 cm" },
{ course: "C6", difficulty: 3, question: "A recipe needs 1 l of milk. Mum has 350 ml. How much MORE does she need?", choices: ["650 ml", "750 ml", "350 ml"], answer: "650 ml" },

/* ============ C7 — Shapes ============ */
{ course: "C7", difficulty: 1, question: "How many sides does a TRIANGLE have?", choices: ["3", "4", "5"], answer: "3" },
{ course: "C7", difficulty: 1, question: "How many corners does a SQUARE have?", choices: ["4", "3", "6"], answer: "4" },
{ course: "C7", difficulty: 1, question: "Which shape is perfectly round?", choices: ["Circle", "Square", "Triangle"], answer: "Circle" },
{ course: "C7", difficulty: 1, question: "A ball is which 3D shape?", choices: ["Sphere", "Cube", "Cone"], answer: "Sphere" },
{ course: "C7", difficulty: 1, question: "A dice is which 3D shape?", choices: ["Cube", "Sphere", "Cylinder"], answer: "Cube" },
{ course: "C7", difficulty: 1, question: "A tin of Milo is which 3D shape?", choices: ["Cylinder", "Cube", "Pyramid"], answer: "Cylinder" },
{ course: "C7", difficulty: 1, question: "How many sides does a RECTANGLE have?", choices: ["4", "2", "6"], answer: "4" },
{ course: "C7", difficulty: 1, question: "An ice-cream cone is which 3D shape?", choices: ["Cone", "Cuboid", "Sphere"], answer: "Cone" },
{ course: "C7", difficulty: 1, question: "Which 2D shape has NO corners?", choices: ["Circle", "Rectangle", "Triangle"], answer: "Circle" },
{ course: "C7", difficulty: 1, question: "A shoe box is which 3D shape?", choices: ["Cuboid", "Sphere", "Cone"], answer: "Cuboid" },
{ course: "C7", difficulty: 2, question: "Which shape has 6 SQUARE faces?", choices: ["Cube", "Cuboid", "Pyramid"], answer: "Cube" },
{ course: "C7", difficulty: 2, question: "How many faces does a CUBOID have?", choices: ["6", "4", "8"], answer: "6" },
{ course: "C7", difficulty: 2, question: "How many edges does a CUBE have?", choices: ["12", "6", "8"], answer: "12" },
{ course: "C7", difficulty: 2, question: "How many corners (vertices) does a cube have?", choices: ["8", "6", "12"], answer: "8" },
{ course: "C7", difficulty: 2, question: "A square pyramid's BASE is which shape?", choices: ["Square", "Triangle", "Circle"], answer: "Square" },
{ course: "C7", difficulty: 2, question: "Which 3D shape has NO flat face at all?", choices: ["Sphere", "Cylinder", "Cone"], answer: "Sphere" },
{ course: "C7", difficulty: 2, question: "A cylinder has how many FLAT faces?", choices: ["2", "1", "3"], answer: "2" },
{ course: "C7", difficulty: 3, question: "The NET of a cube is made of how many squares?", choices: ["6", "4", "8"], answer: "6" },
{ course: "C7", difficulty: 3, question: "I have 5 faces and 8 edges. What am I?", choices: ["Square pyramid", "Cube", "Cylinder"], answer: "Square pyramid" },
{ course: "C7", difficulty: 3, question: "How many lines of SYMMETRY does a square have?", choices: ["4", "2", "1"], answer: "4" },
{ course: "C7", difficulty: 3, question: "Which 3D shape can ROLL and also STACK flat?", choices: ["Cylinder", "Sphere", "Cube"], answer: "Cylinder" },
{ course: "C7", difficulty: 3, question: "I have 1 curved face and 1 flat circular face. What am I?", choices: ["Cone", "Cylinder", "Sphere"], answer: "Cone" },
{ course: "C7", difficulty: 3, question: "A cuboid has 6 faces. How many PAIRS of equal faces?", choices: ["3", "6", "2"], answer: "3" },
{ course: "C7", difficulty: 3, question: "Which letter has a line of symmetry: F, A, or G?", choices: ["A", "F", "G"], answer: "A" },

/* ============ C8 — Location ============ */
{ course: "C8", difficulty: 1, question: "The cat is UNDER the table. Where is the cat?", choices: ["Below the table", "On the table", "Beside the table"], answer: "Below the table" },
{ course: "C8", difficulty: 1, question: "The clock hangs ___ the whiteboard.", choices: ["above", "under", "inside"], answer: "above" },
{ course: "C8", difficulty: 1, question: "Ali sits BETWEEN Abu and Ah Meng. Who is in the middle?", choices: ["Ali", "Abu", "Ah Meng"], answer: "Ali" },
{ course: "C8", difficulty: 1, question: "Your RIGHT hand is the one you ___ with (for most people).", choices: ["write", "smell", "hear"], answer: "write" },
{ course: "C8", difficulty: 1, question: "The ball rolled ___ the goal.", choices: ["into", "above", "under the sky"], answer: "into" },
{ course: "C8", difficulty: 1, question: "The bird flies ___ the trees.", choices: ["above", "below", "inside"], answer: "above" },
{ course: "C8", difficulty: 1, question: "The shoes are ___ the shoe rack, on level two.", choices: ["on", "under", "behind the sky"], answer: "on" },
{ course: "C8", difficulty: 1, question: "Turn LEFT from facing the door — which way is that if the window is on your left?", choices: ["Towards the window", "Towards the door", "Straight up"], answer: "Towards the window" },
{ course: "C8", difficulty: 1, question: "The school is NEXT TO the mosque. 'Next to' means ___.", choices: ["beside", "far from", "under"], answer: "beside" },
{ course: "C8", difficulty: 1, question: "The fish tank is IN FRONT OF the class. Where is it?", choices: ["At the front", "At the back", "On the roof"], answer: "At the front" },
{ course: "C8", difficulty: 2, question: "On a grid, Ali is at row 2, column 3. Which comes FIRST when we say his position (row, column)?", choices: ["Row 2", "Column 3", "Neither"], answer: "Row 2" },
{ course: "C8", difficulty: 2, question: "The treasure is 2 squares RIGHT of the tree. If the tree is at column 4, the treasure is at column ___.", choices: ["6", "2", "5"], answer: "6" },
{ course: "C8", difficulty: 2, question: "Sara is at row 1. She moves UP 3 rows. Now she is at row ___.", choices: ["4", "3", "2"], answer: "4" },
{ course: "C8", difficulty: 2, question: "Which position is in the SAME column as (row 2, column 5)?", choices: ["(row 4, column 5)", "(row 2, column 2)", "(row 5, column 2)"], answer: "(row 4, column 5)" },
{ course: "C8", difficulty: 2, question: "The library is 3 blocks EAST of school. To go back to school from the library, walk 3 blocks ___.", choices: ["West", "East", "North"], answer: "West" },
{ course: "C8", difficulty: 2, question: "A robot at column 2 moves right 2, then right 1 more. Which column now?", choices: ["5", "4", "3"], answer: "5" },
{ course: "C8", difficulty: 2, question: "From the map key: 🏥 is one square LEFT of 🏫. If 🏫 is at column 3, 🏥 is at column ___.", choices: ["2", "4", "3"], answer: "2" },
{ course: "C8", difficulty: 3, question: "Start at (row 1, column 1). Move 2 right, 3 up. Where are you?", choices: ["(row 4, column 3)", "(row 3, column 4)", "(row 2, column 3)"], answer: "(row 4, column 3)" },
{ course: "C8", difficulty: 3, question: "Path A: 3 squares right then 1 up. Path B: 1 right then 1 up then 2 right. Which path is SHORTER?", choices: ["Both are the same (4 squares)", "Path A", "Path B"], answer: "Both are the same (4 squares)" },
{ course: "C8", difficulty: 3, question: "A knight moves 2 up and 1 right from (row 1, column 2). Where does it land?", choices: ["(row 3, column 3)", "(row 2, column 4)", "(row 3, column 1)"], answer: "(row 3, column 3)" },
{ course: "C8", difficulty: 3, question: "Ali walks 4 squares right, then 4 squares LEFT. How far is he from where he started?", choices: ["0 squares", "8 squares", "4 squares"], answer: "0 squares" },
{ course: "C8", difficulty: 3, question: "The treasure is NOT in row 1, NOT in column 3, and IS next to the palm tree at (2,1). Where is it?", choices: ["(row 2, column 2)", "(row 1, column 2)", "(row 2, column 3)"], answer: "(row 2, column 2)" },
{ course: "C8", difficulty: 3, question: "Facing NORTH, you turn right. Now you face ___.", choices: ["East", "West", "South"], answer: "East" },
{ course: "C8", difficulty: 3, question: "From (row 3, column 3), which is FARTHER: (row 3, column 6) or (row 5, column 3)?", choices: ["(row 3, column 6)", "(row 5, column 3)", "Both same"], answer: "(row 3, column 6)" },

/* ============ C9 — Data ============ */
{ course: "C9", difficulty: 1, question: "How many pupils like nasi lemak?", choices: ["6", "3", "9"], answer: "6",
  visual: { type: "pictograph", rows: [["Nasi lemak", "🍚", 6], ["Burger", "🍔", 3]] } },
{ course: "C9", difficulty: 1, question: "How many pupils chose blue?", choices: ["7", "2", "5"], answer: "7",
  visual: { type: "pictograph", rows: [["Blue", "🔵", 7], ["Red", "🔴", 2]] } },
{ course: "C9", difficulty: 1, question: "Which fruit is the MOST popular?", choices: ["Apple", "Orange", "Banana"], answer: "Apple",
  visual: { type: "pictograph", rows: [["Apple", "🍎", 8], ["Orange", "🍊", 4], ["Banana", "🍌", 5]] } },
{ course: "C9", difficulty: 1, question: "How many cats are there?", choices: ["4", "6", "2"], answer: "4",
  visual: { type: "pictograph", rows: [["Cats", "🐱", 4], ["Dogs", "🐶", 6]] } },
{ course: "C9", difficulty: 1, question: "Which pet has the FEWEST?", choices: ["Rabbits", "Cats", "Dogs"], answer: "Rabbits",
  visual: { type: "pictograph", rows: [["Cats", "🐱", 5], ["Dogs", "🐶", 7], ["Rabbits", "🐰", 3]] } },
{ course: "C9", difficulty: 1, question: "A tally of ||||  (crossed) means ___.", choices: ["5", "4", "6"], answer: "5" },
{ course: "C9", difficulty: 1, question: "In a bar chart, the TALLEST bar shows the ___.", choices: ["biggest number", "smallest number", "prettiest colour"], answer: "biggest number" },
{ course: "C9", difficulty: 1, question: "How many footballs?", choices: ["5", "3", "8"], answer: "5",
  visual: { type: "pictograph", rows: [["Football", "⚽", 5], ["Badminton", "🏸", 3]] } },
{ course: "C9", difficulty: 1, question: "Data means ___.", choices: ["information we collect", "a kind of fruit", "a game"], answer: "information we collect" },
{ course: "C9", difficulty: 1, question: "Which sport did 3 pupils choose?", choices: ["Badminton", "Football", "Neither"], answer: "Badminton",
  visual: { type: "pictograph", rows: [["Football", "⚽", 5], ["Badminton", "🏸", 3]] } },
{ course: "C9", difficulty: 2, question: "How many MORE chose blue than red?", choices: ["5", "9", "2"], answer: "5",
  visual: { type: "pictograph", rows: [["Blue", "🔵", 7], ["Red", "🔴", 2]] } },
{ course: "C9", difficulty: 2, question: "How many MORE dogs than cats?", choices: ["2", "10", "4"], answer: "2",
  visual: { type: "pictograph", rows: [["Cats", "🐱", 4], ["Dogs", "🐶", 6]] } },
{ course: "C9", difficulty: 2, question: "Each symbol = 2 pupils. 4 symbols = how many pupils?", choices: ["8", "4", "6"], answer: "8" },
{ course: "C9", difficulty: 2, question: "Apples 8, oranges 4. How many FEWER oranges than apples?", choices: ["4", "12", "2"], answer: "4" },
{ course: "C9", difficulty: 2, question: "Which TWO days have the SAME count?", choices: ["Mon and Wed", "Mon and Tue", "Tue and Wed"], answer: "Mon and Wed",
  visual: { type: "pictograph", rows: [["Mon", "📚", 4], ["Tue", "📚", 6], ["Wed", "📚", 4]] } },
{ course: "C9", difficulty: 2, question: "The bar for kittens shows 9 and for puppies shows 6. Total animals?", choices: ["15", "3", "12"], answer: "15" },
{ course: "C9", difficulty: 2, question: "A survey collected: 5, 7, 3. Which number is in the MIDDLE size?", choices: ["5", "7", "3"], answer: "5" },
{ course: "C9", difficulty: 3, question: "How many pupils were surveyed in TOTAL?", choices: ["17", "8", "12"], answer: "17",
  visual: { type: "pictograph", rows: [["Apple", "🍎", 8], ["Orange", "🍊", 4], ["Banana", "🍌", 5]] } },
{ course: "C9", difficulty: 3, question: "Are cats and rabbits TOGETHER more than dogs?", choices: ["Yes, 8 vs 7", "No, 7 vs 8", "They are equal"], answer: "Yes, 8 vs 7",
  visual: { type: "pictograph", rows: [["Cats", "🐱", 5], ["Dogs", "🐶", 7], ["Rabbits", "🐰", 3]] } },
{ course: "C9", difficulty: 3, question: "Each symbol = 5 books. Row shows 3 symbols and a HALF symbol. How many books?", choices: ["17 or 18 (about 17½)", "35", "8"], answer: "17 or 18 (about 17½)" },
{ course: "C9", difficulty: 3, question: "Class A read 24 books, Class B read 18. How many more must Class B read to EQUAL Class A?", choices: ["6", "42", "8"], answer: "6" },
{ course: "C9", difficulty: 3, question: "Votes: durian 9, mango 6, rambutan 2. Which statement is TRUE?", choices: ["Durian beat mango and rambutan combined... no — check: 6+2=8, durian 9. TRUE", "Mango got the fewest votes", "Rambutan beat mango"], answer: "Durian beat mango and rambutan combined... no — check: 6+2=8, durian 9. TRUE" },
{ course: "C9", difficulty: 3, question: "A chart shows 5, 10, 15 stickers over 3 weeks. If the pattern continues, week 4 = ?", choices: ["20", "15", "25"], answer: "20" },
{ course: "C9", difficulty: 3, question: "12 boys and 9 girls were surveyed. How many MORE boys than girls, and what is the total?", choices: ["3 more, 21 total", "3 more, 20 total", "21 more, 3 total"], answer: "3 more, 21 total" }
];

/* ============================================================
   STATION DATA — the mini-games at checkpoints 4 and 8.
   ============================================================ */
window.Y3_MATHS_STATIONS = {

  /* C3 — drag each fraction/decimal to its equal partner */
  C3: { type: "dragTargets", title: "Match each one to its EQUAL partner!",
    targets: [
      { id: "half",    label: "1/2" },
      { id: "quarter", label: "1/4" },
      { id: "threeq",  label: "3/4" },
      { id: "whole",   label: "1 whole" }
    ],
    items: [
      { label: "2/4",  target: "half" },
      { label: "0.5",  target: "half" },
      { label: "0.25", target: "quarter" },
      { label: "2/8",  target: "quarter" },
      { label: "0.75", target: "threeq" },
      { label: "6/8",  target: "threeq" },
      { label: "4/4",  target: "whole" },
      { label: "1.0",  target: "whole" }
    ] },

  /* C7 — drag each property card to its shape */
  C7: { type: "dragTargets", title: "Drag each clue to the RIGHT shape!",
    targets: [
      { id: "cube",     label: "Cube" },
      { id: "sphere",   label: "Sphere" },
      { id: "cylinder", label: "Cylinder" },
      { id: "pyramid",  label: "Square pyramid" }
    ],
    items: [
      { label: "6 square faces",        target: "cube" },
      { label: "12 edges, 8 corners",   target: "cube" },
      { label: "No flat face",          target: "sphere" },
      { label: "Rolls every way",       target: "sphere" },
      { label: "2 circle faces",        target: "cylinder" },
      { label: "Like a Milo tin",       target: "cylinder" },
      { label: "5 faces, square base",  target: "pyramid" },
      { label: "Pointy top, 8 edges",   target: "pyramid" }
    ] },

  /* C9 — drag the correct count to each category (from the tally) */
  C9: { type: "dragTargets", title: "Read the tally, then drag the right NUMBER to each sport!",
    tally: "Football: |||| |||   ·   Badminton: ||||   ·   Sepak takraw: |||| |||| |   ·   Swimming: ||",
    targets: [
      { id: "football",  label: "Football" },
      { id: "badminton", label: "Badminton" },
      { id: "takraw",    label: "Sepak takraw" },
      { id: "swimming",  label: "Swimming" }
    ],
    items: [
      { label: "8",  target: "football" },
      { label: "5",  target: "badminton" },
      { label: "11", target: "takraw" },
      { label: "2",  target: "swimming" }
    ] }
};

/* ============================================================
   STATION DATA — the mini-games at checkpoints 4 and 8.
   One item per line: copy, paste, edit. (C1 build-the-number,
   C2 sifir sprint, C3 slice match and C8 treasure grid make
   their own puzzles automatically from the maths engine.)
   ============================================================ */
window.Y3_MATHS_STATIONS = {

  /* C4 — bazaar cashier: shop items (price in RM.sen) */
  C4: { items: [
    { name: "kite",        price: 3.70 },
    { name: "keropok",     price: 2.50 },
    { name: "toy car",     price: 6.20 },
    { name: "comic book",  price: 4.90 },
    { name: "water bottle", price: 5.50 },
    { name: "apam balik",  price: 1.80 },
    { name: "badminton shuttle", price: 7.40 },
    { name: "sticker pack", price: 2.10 }
  ] },

  /* C5 — clock setter: times the big clock can ask for */
  C5: { times: [
    { label: "3 o'clock",        h: 3,  m: 0 },
    { label: "half past 7",      h: 7,  m: 30 },
    { label: "quarter past 4",   h: 4,  m: 15 },
    { label: "quarter to 9",     h: 8,  m: 45 },
    { label: "half past 11",     h: 11, m: 30 },
    { label: "quarter past 10",  h: 10, m: 15 },
    { label: "quarter to 2",     h: 1,  m: 45 },
    { label: "6 o'clock",        h: 6,  m: 0 }
  ] },

  /* C6 — measure it: drag the right tool, then read the value */
  C6: { tasks: [
    { object: "a pencil",         tool: "ruler",     value: "14 cm",  wrongs: ["12 cm", "16 cm"] },
    { object: "water in a jug",   tool: "cylinder",  value: "300 ml", wrongs: ["200 ml", "350 ml"] },
    { object: "a bag of sugar",   tool: "scale",     value: "1 kg",   wrongs: ["1 g", "10 kg"] },
    { object: "a school desk",    tool: "ruler",     value: "1 m",    wrongs: ["1 cm", "10 m"] },
    { object: "milk for a recipe", tool: "cylinder", value: "250 ml", wrongs: ["25 ml", "2 l"] },
    { object: "a watermelon",     tool: "scale",     value: "3 kg",   wrongs: ["3 g", "30 kg"] }
  ],
  tools: [
    { id: "ruler",    label: "Ruler (cm/m)" },
    { id: "cylinder", label: "Measuring cylinder (ml/l)" },
    { id: "scale",    label: "Weighing scale (g/kg)" }
  ] },

  /* C7 — shape factory: drag each property to its 3D shape */
  C7: { targets: [
    { id: "cube",     label: "Cube" },
    { id: "cuboid",   label: "Cuboid" },
    { id: "pyramid",  label: "Square pyramid" },
    { id: "cylinder", label: "Cylinder" },
    { id: "sphere",   label: "Sphere" }
  ],
  items: [
    { label: "6 square faces",            target: "cube" },
    { label: "6 rectangle faces",         target: "cuboid" },
    { label: "5 faces and 8 edges",       target: "pyramid" },
    { label: "2 flat circle faces",       target: "cylinder" },
    { label: "no flat face at all",       target: "sphere" },
    { label: "a shoe box shape",          target: "cuboid" },
    { label: "it can roll any way",       target: "sphere" },
    { label: "pointy top, square bottom", target: "pyramid" }
  ] },

  /* C9 — chart builder: build the bar chart, then answer */
  C9: { datasets: [
    { title: "Favourite food (tally)",
      categories: [ { name: "Nasi lemak", count: 6 }, { name: "Burger", count: 3 }, { name: "Laksa", count: 4 } ],
      question: { q: "How many MORE chose Nasi lemak than Burger?", choices: ["3", "2", "9"], answer: "3" } },
    { title: "Balls in the store (count)",
      categories: [ { name: "Football", count: 5 }, { name: "Netball", count: 2 }, { name: "Sepak takraw", count: 7 } ],
      question: { q: "How many balls are there ALTOGETHER?", choices: ["14", "12", "10"], answer: "14" } },
    { title: "Pets in our class (tally)",
      categories: [ { name: "Cat", count: 8 }, { name: "Fish", count: 4 }, { name: "Bird", count: 2 } ],
      question: { q: "Which pet is the MOST popular?", choices: ["Cat", "Fish", "Bird"], answer: "Cat" } }
  ] }
};
