/* ============================================================
   YEAR 3 MATHS ENGINE — procedural question generator.
   Feeds the arithmetic-heavy chapters of Year 3 Maths World
   (C1 numbers, C2 operations, C3 fractions/decimals, C4 money)
   and the Sifir Sprint station. You normally don't edit this —
   add hand-written questions in y3-maths-questions.js instead.

   Every wrong answer is PLAUSIBLE on purpose: neighbouring
   times-table values (7×8 → 54/63), off-by-one place values,
   carry/borrow slips — never random junk.
   ============================================================ */
window.Y3MathEngine = (function () {

  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function distractors(answer, candidates) {
    const d = [];
    shuffle(candidates).forEach(function (v) {
      if (d.length < 2 && v !== answer && v > 0 && d.indexOf(v) === -1) d.push(v);
    });
    let bump = 1;
    while (d.length < 2) {
      const v = answer + bump;
      if (v > 0 && v !== answer && d.indexOf(v) === -1) d.push(v);
      bump = bump > 0 ? -bump : -bump + 1;
    }
    return d;
  }
  function make(question, answer, candidates) {
    const d = distractors(answer, candidates);
    return { question: question, answer: String(answer), choices: shuffle([String(answer), String(d[0]), String(d[1])]) };
  }
  function makeStr(question, answer, wrongs) {
    return { question: question, answer: answer, choices: shuffle([answer].concat(wrongs.slice(0, 2))) };
  }
  function fmtRM(sen) { return "RM" + Math.floor(sen / 100) + "." + ("0" + (sen % 100)).slice(-2); }

  /* ---------- core generators ---------- */

  function generateMultiplication(tables, difficulty) {
    const a = pick(tables), b = rnd(2, 9);
    const ans = a * b;
    if (difficulty >= 3 && Math.random() < 0.5) {
      /* find the unknown: ▲ × a = ans */
      return make("▲ × " + a + " = " + ans + ".  What is ▲?", b, [b - 1, b + 1, b + 2, a]);
    }
    return make(a + " × " + b + " = ?", ans,
      [(a - 1) * b, (a + 1) * b, a * (b - 1), a * (b + 1), ans + a, ans - a]);
  }

  function generateDivision(tables, difficulty) {
    const a = pick(tables), b = rnd(2, 9);
    const prod = a * b;
    if (difficulty >= 3 && Math.random() < 0.4) {
      return make(prod + " ÷ ▲ = " + b + ".  What is ▲?", a, [a - 1, a + 1, b, a + 2]);
    }
    return make(prod + " ÷ " + a + " = ?", b, [b - 1, b + 1, b - 2, b + 2, a]);
  }

  function generateAddSub(maxValue, regroup) {
    let a, b;
    const add = Math.random() < 0.55;
    if (maxValue <= 100) {
      a = rnd(12, 87);
      b = add ? rnd(5, 99 - a) : rnd(4, a - 3);
      if (!regroup) { /* keep it carry-free */
        const ao = a % 10, bo = b % 10;
        if (add && ao + bo > 9) b -= (ao + bo) - 9;
        if (!add && bo > ao) b -= (bo - ao);
        if (b < 1) b = 1;
      }
    } else {
      a = rnd(120, 880);
      b = add ? rnd(45, 990 - a) : rnd(35, a - 20);
    }
    const ans = add ? a + b : a - b;
    const step = maxValue <= 100 ? 10 : 100;
    return make(a + (add ? " + " : " − ") + b + " = ?", ans,
      [ans + step, ans - step, ans + 1, ans - 1, ans + 2].map(Math.round));
  }

  /* C1 — numbers up to 10 000 */
  function generatePlaceValue(difficulty) {
    if (difficulty === 1) {
      if (Math.random() < 0.5) {
        const n = rnd(1001, 9998);
        return Math.random() < 0.5
          ? make("What number comes AFTER " + n + "?", n + 1, [n - 1, n + 10, n + 2])
          : make("What number comes BEFORE " + n + "?", n - 1, [n + 1, n - 10, n - 2]);
      }
      /* value of a digit */
      const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      const num = digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];
      const place = rnd(0, 3);
      const val = digits[place] * [1000, 100, 10, 1][place];
      const wrong1 = digits[place];
      const wrong2 = digits[place] * [100, 1000, 100, 10][place];
      return make("What is the VALUE of the digit " + digits[place] + " in " + num + "?", val, [wrong1, wrong2, val * 10, Math.max(1, val / 10)]);
    }
    if (difficulty === 2) {
      if (Math.random() < 0.5) {
        /* compare — same digits swapped (the classic trap) */
        const th = rnd(2, 9), h = rnd(0, 9), t = rnd(1, 9), o = rnd(0, 9);
        const n1 = th * 1000 + h * 100 + t * 10 + o;
        const n2 = th * 1000 + h * 100 + o * 10 + t;
        const big = Math.max(n1, n2), small = Math.min(n1, n2);
        if (n1 === n2) return generatePlaceValue(2);
        return makeStr("Which is BIGGER: " + small + " or " + big + "?", String(big), [String(small), "They are equal"]);
      }
      /* pattern */
      const start = rnd(2, 12) * 250, step2 = pick([100, 250, 500, 1000]);
      const seq = [start, start + step2, start + step2 * 2];
      return make(seq.join(", ") + ", ___ ?  What comes next?", start + step2 * 3,
        [start + step2 * 4, start + step2 * 2, start + step2 * 3 + 100]);
    }
    /* hard: rounding */
    const n = rnd(1050, 9840);
    const to = pick([100, 1000]);
    const ans = Math.round(n / to) * to;
    return make("Round " + n + " to the nearest " + (to === 100 ? "hundred" : "thousand") + ".", ans,
      [ans + to, ans - to, Math.floor(n / to) * to === ans ? ans + to : Math.floor(n / to) * to]);
  }

  /* C3 — fractions & decimals (numeric parts) */
  function generateFracDec(difficulty) {
    if (difficulty === 1) {
      const den = pick([2, 3, 4, 5, 8]);
      const numr = rnd(1, den - 1);
      return makeStr("A cake is cut into " + den + " EQUAL parts. Ali eats " + numr + ". What fraction did he eat?",
        numr + "/" + den, [den + "/" + numr, numr + "/" + (den + 1)]);
    }
    if (difficulty === 2) {
      if (Math.random() < 0.5) {
        const d1 = (rnd(1, 9) / 10), d2 = (rnd(1, 9) / 10);
        if (d1 === d2) return generateFracDec(2);
        const big = Math.max(d1, d2);
        return makeStr("Which is BIGGER: " + d1.toFixed(1) + " or " + d2.toFixed(1) + "?", big.toFixed(1),
          [Math.min(d1, d2).toFixed(1), "They are equal"]);
      }
      const base = pick([[1, 2, 2, 4], [1, 2, 3, 6], [1, 4, 2, 8], [2, 3, 4, 6], [1, 3, 2, 6]]);
      return makeStr(base[0] + "/" + base[1] + " is the SAME as ___?", base[2] + "/" + base[3],
        [base[2] + "/" + (base[3] + 1), (base[2] + 1) + "/" + base[3]]);
    }
    /* hard: decimal ↔ fraction / percent */
    const kind = rnd(0, 2);
    if (kind === 0) return makeStr("0.5 is the same as ___?", "1/2", ["1/5", "5/1"]);
    if (kind === 1) return makeStr("0.25 of 100 squares are red. How many squares are red?", "25", ["4", "75"]);
    return makeStr("50% of a pizza is the same as ___?", "half the pizza", ["a quarter of the pizza", "the whole pizza"]);
  }

  /* C4 — money (totals & change, in sen internally) */
  function generateMoney(difficulty) {
    if (difficulty === 1) {
      const a = rnd(1, 8) * 100 + pick([0, 50]);
      const b = rnd(1, 8) * 100 + pick([0, 20, 50]);
      const ans = a + b;
      return makeStr(fmtRM(a) + " + " + fmtRM(b) + " = ?", fmtRM(ans),
        [fmtRM(ans + 100), fmtRM(Math.max(20, ans - 100))]);
    }
    if (difficulty === 2) {
      const price = rnd(2, 9) * 100 + pick([10, 20, 50, 80]);
      const ans = 1000 - price;
      return makeStr("A toy costs " + fmtRM(price) + ". You pay RM10. How much change?", fmtRM(ans),
        [fmtRM(ans + 100), fmtRM(Math.max(10, ans - 100))]);
    }
    /* hard: two purchases from RM50 */
    const p1 = rnd(10, 25) * 100 + pick([0, 50, 90]);
    const p2 = rnd(2, 9) * 100 + pick([0, 50]);
    const ans = 5000 - p1 - p2;
    return makeStr("Aiman has RM50. He buys a book for " + fmtRM(p1) + " and a pen for " + fmtRM(p2) + ". How much is left?",
      fmtRM(ans), [fmtRM(ans + 100), fmtRM(Math.max(10, ans - 100))]);
  }

  /* C2 — operations, difficulty-mixed */
  function generateOps(difficulty) {
    const r = Math.random();
    if (difficulty === 1) {
      if (r < 0.55) return generateMultiplication([2, 3, 4, 5, 10], 1);
      return generateAddSub(100, false);
    }
    if (difficulty === 2) {
      if (r < 0.4) return generateMultiplication([6, 7, 8, 9], 2);
      if (r < 0.7) return generateDivision([3, 4, 6, 7, 8, 9], 2);
      return generateAddSub(1000, true);
    }
    if (r < 0.45) return generateMultiplication([6, 7, 8, 9], 3);
    if (r < 0.8) return generateDivision([4, 6, 7, 8, 9], 3);
    return generateAddSub(1000, true);
  }

  /* sifir sprint feed: quick single-fact questions */
  function sprintQuestion() {
    return Math.random() < 0.7
      ? generateMultiplication([2, 3, 4, 5, 6, 7, 8, 9], 1)
      : generateDivision([2, 3, 4, 5, 6, 7, 8, 9], 1);
  }

  /* course router: returns a question or null (= use the fixed bank) */
  function generate(courseId, difficulty) {
    if (courseId === "C1") return generatePlaceValue(difficulty);
    if (courseId === "C2") return generateOps(difficulty);
    if (courseId === "C3") return generateFracDec(difficulty);
    if (courseId === "C4") return generateMoney(difficulty);
    return null;
  }

  return {
    generate: generate,
    sprintQuestion: sprintQuestion,
    generateMultiplication: generateMultiplication,
    generateDivision: generateDivision,
    generateAddSub: generateAddSub,
    generatePlaceValue: generatePlaceValue,
    generateFracDec: generateFracDec,
    generateMoney: generateMoney
  };
})();
