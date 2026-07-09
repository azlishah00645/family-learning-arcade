/* ============================================================
   YEAR 3 STATIONS — adventure-grade mini-games, registered into
   the shared Stations engine (checkpoints 4 and 8 of every
   Year 3 Maths course). Scored like all stations: right/wrong
   per action, ≥80% accuracy on the first attempt = correct.

   buildNumber  C1  drag digit blocks into Th/H/T/O slots
   sifirSprint  C2  60-second rapid-fire times tables
   sliceMatch   C3  match equivalent fractions + number line
   cashier      C4  pay the exact price, then pick the change
   clockSetter  C5  drag the clock hands to the stated time
   measureIt    C6  pick the right tool, read the value
   (C7 uses the shared dragTargets with shape data)
   treasureGrid C8  follow grid directions to the treasure
   chartBuilder C9  build a bar chart from a tally, then answer
   ============================================================ */
import { Stations } from "./stations.js";

function el(html) { const d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function sample(arr, n) { return shuffle(arr).slice(0, n); }
function feedback(host, text, good) {
  const fb = host.querySelector(".mg-feedback");
  if (!fb) return;
  fb.textContent = text;
  fb.className = "mg-feedback " + (good ? "good" : "retry");
}
function choiceRow(host, choices, answer, api, onDone) {
  const row = el('<div class="mg-choices"></div>');
  let done = false;
  shuffle(choices).forEach(function (c) {
    const b = el('<button class="mg-choice">' + esc(c) + "</button>");
    b.onclick = function () {
      if (done) return;
      if (c === answer) {
        done = true;
        api.right();
        b.classList.add("good");
        FX.praise();
        setTimeout(onDone, 650);
      } else {
        api.wrong();
        b.classList.add("bad");
        feedback(host, "Try again! 💪", false);
      }
    };
    row.appendChild(b);
  });
  return row;
}

/* number → words (up to 9999, Year 3 style) */
export function numberToWords(n) {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function below100(x) {
    if (x < 20) return ones[x];
    return tens[Math.floor(x / 10)] + (x % 10 ? "-" + ones[x % 10] : "");
  }
  let out = "";
  const th = Math.floor(n / 1000), h = Math.floor(n % 1000 / 100), r = n % 100;
  if (th) out += ones[th] + " thousand";
  if (h) out += (out ? " " : "") + ones[h] + " hundred";
  if (r) out += (out ? " and " : "") + below100(r);
  return out || "zero";
}

/* ---------- C1: build the number ---------- */
Stations.types.buildNumber = function (host, cfg, api) {
  return new Promise(function (resolve) {
    /* two rounds, harder second */
    let round = 0;
    function play() {
      if (round >= 2) return resolve();
      round++;
      /* digits all different, may include a 0 in round 2 */
      const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const digs = [pool[0], round === 2 && Math.random() < 0.5 ? 0 : pool[1], pool[2], pool[3]];
      const target = digs[0] * 1000 + digs[1] * 100 + digs[2] * 10 + digs[3];
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Build the number:<br><b>"' + numberToWords(target) + '"</b></div>'));
      const slotRow = el('<div class="mg-targets"></div>');
      const places = [["th", "Thousands"], ["h", "Hundreds"], ["t", "Tens"], ["o", "Ones"]];
      places.forEach(function (p) {
        slotRow.appendChild(el('<div class="mg-target y3-slot" data-id="' + p[0] + '"><div class="t-label">' + p[1] + '</div><div class="t-slot"></div></div>'));
      });
      host.appendChild(slotRow);
      const tray = el('<div class="mg-tray"></div>');
      host.appendChild(tray);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + round + " / 2</div>"));

      const want = { th: digs[0], h: digs[1], t: digs[2], o: digs[3] };
      const filled = {};
      /* tray: the 4 digits + 2 decoys */
      const decoys = pool.slice(4, 6);
      shuffle(digs.concat(decoys)).forEach(function (d) {
        const chip = el('<div class="mg-chip y3-digit">' + d + "</div>");
        tray.appendChild(chip);
        Stations._drag(chip, ".mg-target", function (drop) {
          Stations._reset(chip);
          if (!drop) return;
          const slot = drop.getAttribute("data-id");
          if (filled[slot]) return;
          if (want[slot] === d) {
            api.right();
            filled[slot] = true;
            chip.classList.add("mg-locked", "placed");
            drop.querySelector(".t-slot").appendChild(chip);
            drop.classList.add("got");
            FX.praise();
            if (Object.keys(filled).length === 4) {
              feedback(host, target + " — built it! 🏗️", true);
              setTimeout(play, 900);
            }
          } else {
            api.wrong();
            drop.classList.add("shake-mini");
            setTimeout(function () { drop.classList.remove("shake-mini"); }, 450);
            feedback(host, "Listen again: " + numberToWords(target), false);
          }
        });
      });
    }
    play();
  });
};

/* ---------- C2: sifir sprint (60-second rapid fire) ---------- */
Stations.types.sifirSprint = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const DURATION = 60;
    let left = DURATION, hits = 0, ended = false;
    host.innerHTML = "";
    host.appendChild(el('<div class="mg-prompt">⚡ SIFIR SPRINT! Answer as many as you can in 60 seconds!</div>'));
    const timerEl = el('<div class="y3-sprint-timer">60</div>');
    host.appendChild(timerEl);
    const qEl = el('<div class="mg-big y3-sprint-q"></div>');
    host.appendChild(qEl);
    const row = el('<div class="mg-choices"></div>');
    host.appendChild(row);
    host.appendChild(el('<div class="mg-feedback"></div>'));
    const hitEl = el('<div class="mg-progress">answered: 0</div>');
    host.appendChild(hitEl);

    function nextQ() {
      if (ended) return;
      const q = window.Y3MathEngine.sprintQuestion();
      qEl.textContent = q.question;
      row.innerHTML = "";
      q.choices.forEach(function (c) {
        const b = el('<button class="mg-choice y3-sprint-btn">' + esc(c) + "</button>");
        b.onclick = function () {
          if (ended) return;
          if (c === q.answer) {
            api.right();
            hits++;
            hitEl.textContent = "answered: " + hits;
            FX.praise("+1 ⚡");
            nextQ();
          } else {
            api.wrong();
            b.classList.add("bad");
            Sound.wrong();
            feedback(host, "Oops — keep going!", false);
          }
        };
        row.appendChild(b);
      });
    }
    nextQ();
    const iv = setInterval(function () {
      left--;
      timerEl.textContent = left;
      if (left <= 10) timerEl.classList.add("hot");
      if (left <= 0) {
        ended = true;
        clearInterval(iv);
        feedback(host, "TIME! You answered " + hits + "! 🏁", true);
        setTimeout(resolve, 1200);
      }
    }, 1000);
  });
};

/* ---------- C3: slice and match ---------- */
Stations.types.sliceMatch = function (host, cfg, api) {
  return new Promise(function (resolve) {
    /* phase A: drag equivalent fractions onto their simplest form */
    const PAIRS = [["2/4", "1/2"], ["3/6", "1/2"], ["5/10", "1/2"], ["2/6", "1/3"], ["3/9", "1/3"], ["2/8", "1/4"], ["3/12", "1/4"]];
    const picked = sample(PAIRS, 4);
    const targets = Array.from(new Set(picked.map(function (p) { return p[1]; })));
    host.innerHTML = "";
    host.appendChild(el('<div class="mg-prompt">Match each fraction to its SIMPLEST form!</div>'));
    const wrap = el('<div class="mg-targets"></div>');
    targets.forEach(function (t) {
      wrap.appendChild(el('<div class="mg-target" data-id="' + t + '"><div class="t-label y3-frac">' + t + '</div><div class="t-slot"></div></div>'));
    });
    host.appendChild(wrap);
    const tray = el('<div class="mg-tray"></div>');
    host.appendChild(tray);
    host.appendChild(el('<div class="mg-feedback"></div>'));

    let remaining = picked.length;
    shuffle(picked).forEach(function (pair) {
      const chip = el('<div class="mg-chip y3-frac">' + pair[0] + "</div>");
      tray.appendChild(chip);
      Stations._drag(chip, ".mg-target", function (drop) {
        Stations._reset(chip);
        if (!drop) return;
        if (drop.getAttribute("data-id") === pair[1]) {
          api.right();
          chip.classList.add("mg-locked", "placed");
          drop.querySelector(".t-slot").appendChild(chip);
          drop.classList.add("got");
          FX.praise();
          remaining--;
          if (remaining === 0) setTimeout(phaseB, 700);
        } else {
          api.wrong();
          drop.classList.add("shake-mini");
          setTimeout(function () { drop.classList.remove("shake-mini"); }, 450);
          feedback(host, "Not equal! Try another target 💪", false);
        }
      });
    });

    /* phase B: place the decimal on the number line */
    function phaseB() {
      const asks = sample([["0.5", 1], ["0.25", 0], ["0.75", 2]], 2);
      let i = 0;
      function round() {
        if (i >= asks.length) return resolve();
        const ask = asks[i];
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">Tap where <b>' + ask[0] + "</b> sits on the number line!</div>"));
        const line = el('<div class="y3-numline"><span class="nl-end">0</span>' +
          '<button class="nl-dot" data-i="0"></button><button class="nl-dot" data-i="1"></button><button class="nl-dot" data-i="2"></button>' +
          '<span class="nl-end">1</span></div>');
        host.appendChild(line);
        host.appendChild(el('<div class="mg-feedback"></div>'));
        host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + asks.length + "</div>"));
        line.querySelectorAll(".nl-dot").forEach(function (dot) {
          dot.onclick = function () {
            if (parseInt(dot.getAttribute("data-i"), 10) === ask[1]) {
              api.right();
              dot.classList.add("good");
              FX.praise();
              i++;
              setTimeout(round, 650);
            } else {
              api.wrong();
              dot.classList.add("bad");
              feedback(host, "Think: how far along is " + ask[0] + "? 💪", false);
            }
          };
        });
      }
      round();
    }
  });
};

/* ---------- C4: bazaar cashier ---------- */
Stations.types.cashier = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const DENOMS = [[500, "RM5"], [100, "RM1"], [50, "50 sen"], [20, "20 sen"], [10, "10 sen"]];
    const customers = sample(cfg.items, 2);
    let ci = 0;
    function fmtRM(sen) { return "RM" + Math.floor(sen / 100) + "." + ("0" + (sen % 100)).slice(-2); }

    function customer() {
      if (ci >= customers.length) return resolve();
      const item = customers[ci];
      const price = Math.round(item.price * 100);
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Customer buys a <b>' + esc(item.name) + "</b> for <b>" + fmtRM(price) + "</b>.<br>Tap money to pay the EXACT price!</div>"));
      const payEl = el('<div class="y3-paytray">Paid: <b id="y3-paid">RM0.00</b></div>');
      host.appendChild(payEl);
      const row = el('<div class="mg-choices y3-money-row"></div>');
      let paid = 0, done = false;
      DENOMS.forEach(function (d) {
        const b = el('<button class="mg-choice y3-money">' + d[1] + "</button>");
        b.onclick = function () {
          if (done) return;
          Sound.coin();
          paid += d[0];
          payEl.querySelector("#y3-paid").textContent = fmtRM(paid);
          if (paid === price) {
            done = true;
            api.right();
            FX.praise("Exact! 🎉");
            setTimeout(change, 800);
          } else if (paid > price) {
            api.wrong();
            feedback(host, "Too much! Start again — pay EXACTLY " + fmtRM(price), false);
            paid = 0;
            payEl.querySelector("#y3-paid").textContent = fmtRM(0);
          }
        };
        row.appendChild(b);
      });
      host.appendChild(row);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">customer ' + (ci + 1) + " / " + customers.length + "</div>"));

      function change() {
        const chg = 1000 - price;
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">Now the NEXT customer pays <b>RM10</b> for the ' + esc(item.name) + " (" + fmtRM(price) + ").<br>How much CHANGE?</div>"));
        host.appendChild(choiceRow(host, [fmtRM(chg), fmtRM(chg + 100), fmtRM(Math.max(10, chg - 100))], fmtRM(chg), api, function () {
          ci++;
          customer();
        }));
        host.appendChild(el('<div class="mg-feedback"></div>'));
      }
    }
    customer();
  });
};

/* ---------- C5: clock setter (drag the hands) ---------- */
Stations.types.clockSetter = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const times = sample(cfg.times, 2);
    let ti = 0;
    function round() {
      if (ti >= times.length) return resolve();
      const t = times[ti];
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Drag the hands to show:<br><b>' + esc(t.label) + "</b><br><span class='y3-hint'>(long hand = minutes, short hand = hours)</span></div>"));
      const size = Math.min(240, window.innerWidth - 140);
      const wrap = el('<div class="y3-clock" style="width:' + size + "px;height:" + size + 'px"></div>');
      host.appendChild(wrap);

      let curH = 12, curM = 0;
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 200 200");
      svg.style.width = "100%"; svg.style.height = "100%";
      svg.innerHTML =
        '<circle cx="100" cy="100" r="95" fill="#fef9c3" stroke="#f59e0b" stroke-width="8"/>' +
        Array.from({ length: 12 }, function (_, i) {
          const a = ((i + 1) * 30 - 90) * Math.PI / 180;
          return '<text x="' + (100 + Math.cos(a) * 78) + '" y="' + (107 + Math.sin(a) * 78) + '" text-anchor="middle" font-size="20" font-weight="bold" fill="#334155">' + (i + 1) + "</text>";
        }).join("") +
        '<line id="y3-hh" x1="100" y1="100" x2="100" y2="60" stroke="#1e293b" stroke-width="9" stroke-linecap="round"/>' +
        '<line id="y3-mh" x1="100" y1="100" x2="100" y2="35" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="100" cy="100" r="7" fill="#1e293b"/>';
      wrap.appendChild(svg);

      function draw() {
        const mA = (curM * 6 - 90) * Math.PI / 180;
        const hA = ((curH % 12) * 30 + curM * 0.5 - 90) * Math.PI / 180;
        const mh = svg.querySelector("#y3-mh"), hh = svg.querySelector("#y3-hh");
        mh.setAttribute("x2", 100 + Math.cos(mA) * 66); mh.setAttribute("y2", 100 + Math.sin(mA) * 66);
        hh.setAttribute("x2", 100 + Math.cos(hA) * 42); hh.setAttribute("y2", 100 + Math.sin(hA) * 42);
      }
      draw();

      /* drag: inner half = hour hand, outer half = minute hand */
      let dragging = null;
      function angleOf(e) {
        const r = wrap.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        return { ang: Math.atan2(dy, dx) * 180 / Math.PI + 90, dist: Math.sqrt(dx * dx + dy * dy) / (r.width / 2) };
      }
      wrap.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        const a = angleOf(e);
        dragging = a.dist < 0.45 ? "h" : "m";
        move(e);
      });
      function move(e) {
        if (!dragging) return;
        let ang = angleOf(e).ang;
        if (ang < 0) ang += 360;
        if (dragging === "m") curM = Math.round(ang / 30) * 5 % 60;      /* snap 5 min */
        else curH = (Math.round(ang / 30) + 11) % 12 + 1;                 /* snap hour */
        draw();
      }
      wrap.addEventListener("pointermove", move);
      window.addEventListener("pointerup", function up() { dragging = null; });

      const check = el('<button class="btn green">CHECK ⏰</button>');
      check.onclick = function () {
        const okH = curH === t.h || (t.m >= 30 && curH === t.h); /* hour hand at stated hour */
        if (okH && curM === t.m) {
          api.right();
          FX.praise("Perfect time! ⏰");
          ti++;
          setTimeout(round, 800);
        } else {
          api.wrong();
          feedback(host, "Not quite — " + t.label + " means " + (t.m === 0 ? t.h + ":00" : t.h + ":" + t.m) + ". Try again!", false);
        }
      };
      host.appendChild(check);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + (ti + 1) + " / " + times.length + "</div>"));
    }
    round();
  });
};

/* ---------- C6: measure it ---------- */
Stations.types.measureIt = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const tasks = sample(cfg.tasks, 3);
    let i = 0;
    function round() {
      if (i >= tasks.length) return resolve();
      const task = tasks[i];
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Measure <b>' + esc(task.object) + "</b> — drag the RIGHT tool onto it!</div>"));
      const target = el('<div class="mg-target y3-object" data-id="obj"><div class="t-label">' + esc(task.object) + '</div><div class="t-slot"></div></div>');
      host.appendChild(target);
      const tray = el('<div class="mg-tray"></div>');
      shuffle(cfg.tools).forEach(function (tool) {
        const chip = el('<div class="mg-chip">' + esc(tool.label) + "</div>");
        tray.appendChild(chip);
        Stations._drag(chip, ".mg-target", function (drop) {
          Stations._reset(chip);
          if (!drop) return;
          if (tool.id === task.tool) {
            api.right();
            FX.praise();
            readPhase();
          } else {
            api.wrong();
            feedback(host, "Wrong tool for " + task.object + "! 💪", false);
          }
        });
      });
      host.appendChild(tray);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + tasks.length + "</div>"));

      function readPhase() {
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">The ' + esc(cfg.tools.find(function (x) { return x.id === task.tool; }).label) + " shows… what is the measurement of " + esc(task.object) + "?</div>"));
        host.appendChild(choiceRow(host, [task.value].concat(task.wrongs), task.value, api, function () { i++; round(); }));
        host.appendChild(el('<div class="mg-feedback"></div>'));
      }
    }
    round();
  });
};

/* ---------- C8: treasure grid ---------- */
Stations.types.treasureGrid = function (host, cfg, api) {
  return new Promise(function (resolve) {
    let round = 0;
    function play() {
      if (round >= 2) return resolve();
      round++;
      const legs = [];
      const nLegs = round + 1; /* 2 then 3 instructions */
      let px = 0, py = 4; /* bottom-left of a 5×5 grid */
      let tx = px, ty = py;
      const dirs = [["right", 1, 0], ["up", 0, -1], ["left", -1, 0], ["down", 0, 1]];
      for (let L = 0; L < nLegs; L++) {
        const opts = dirs.filter(function (d) {
          const nx = tx + d[1] * 2, ny = ty + d[2] * 2;
          return nx >= 0 && nx <= 4 && ny >= 0 && ny <= 4;
        });
        const d = opts[Math.floor(Math.random() * opts.length)];
        const steps = 1 + Math.floor(Math.random() * 2) + (round - 1); /* 1-3 */
        let s = steps;
        while (s > 0 && tx + d[1] >= 0 && tx + d[1] <= 4 && ty + d[2] >= 0 && ty + d[2] <= 4) { tx += d[1]; ty += d[2]; s--; }
        legs.push({ dir: d[0], n: steps - s });
      }
      const plan = legs.filter(function (l) { return l.n > 0; });
      const moves = [];
      plan.forEach(function (l) { for (let k = 0; k < l.n; k++) moves.push(l.dir); });
      if (!moves.length) { play(); return; }

      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Follow the map: <b>' +
        plan.map(function (l) { return l.n + " " + l.dir; }).join(", then ") + "</b></div>"));
      const grid = el('<div class="y3-grid"></div>');
      const cells = [];
      for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 5; gx++) {
        const c = el('<div class="y3-cell"></div>');
        grid.appendChild(c);
        cells.push(c);
      }
      host.appendChild(grid);
      function cellAt(cx, cy) { return cells[cy * 5 + cx]; }
      cellAt(px, py).classList.add("hero");
      cellAt(tx, ty).classList.add("treasure");

      const pad = el('<div class="y3-dpad">' +
        '<button data-d="up">⬆</button><div class="dpad-mid"><button data-d="left">⬅</button><button data-d="right">➡</button></div><button data-d="down">⬇</button></div>');
      host.appendChild(pad);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + round + " / 2</div>"));

      let mi = 0;
      pad.querySelectorAll("button").forEach(function (b) {
        b.onclick = function () {
          const dir = b.getAttribute("data-d");
          if (mi >= moves.length) return;
          if (dir === moves[mi]) {
            api.right();
            cellAt(px, py).classList.remove("hero");
            if (dir === "right") px++; if (dir === "left") px--;
            if (dir === "up") py--; if (dir === "down") py++;
            cellAt(px, py).classList.add("hero");
            Sound.coin();
            mi++;
            if (mi >= moves.length) {
              FX.praise("TREASURE! 💎");
              FX.confetti(14);
              setTimeout(play, 900);
            }
          } else {
            api.wrong();
            feedback(host, "Check the map — next move is different! 🧭", false);
          }
        };
      });
    }
    play();
  });
};

/* ---------- C9: chart builder ---------- */
Stations.types.chartBuilder = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const ds = sample(cfg.datasets, 1)[0];
    host.innerHTML = "";
    host.appendChild(el('<div class="mg-prompt">' + esc(ds.title) + " — tap ➕ until each bar matches its tally!</div>"));
    const wrap = el('<div class="y3-chart"></div>');
    let doneCount = 0;
    ds.categories.forEach(function (cat) {
      const col = el('<div class="y3-col">' +
        '<div class="y3-tally">' + "𝍸".repeat(Math.floor(cat.count / 5)) + "|".repeat(cat.count % 5) + " (" + cat.count + ")</div>" +
        '<div class="y3-bar"><div class="y3-fill" style="height:0%"></div></div>' +
        '<button class="mg-choice y3-plus">➕</button>' +
        '<div class="y3-cat">' + esc(cat.name) + "</div></div>");
      let cur = 0, locked = false;
      col.querySelector(".y3-plus").onclick = function () {
        if (locked) return;
        cur++;
        col.querySelector(".y3-fill").style.height = Math.min(100, cur / 10 * 100) + "%";
        if (cur === cat.count) {
          locked = true;
          api.right();
          col.classList.add("good");
          Sound.correct();
          doneCount++;
          if (doneCount === ds.categories.length) setTimeout(questionPhase, 700);
        } else if (cur > cat.count) {
          api.wrong();
          feedback(host, "Too many! The tally says " + cat.count + " — starting that bar again.", false);
          cur = 0;
          col.querySelector(".y3-fill").style.height = "0%";
        }
      };
      wrap.appendChild(col);
    });
    host.appendChild(wrap);
    host.appendChild(el('<div class="mg-feedback"></div>'));

    function questionPhase() {
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">' + esc(ds.question.q) + "</div>"));
      host.appendChild(choiceRow(host, ds.question.choices, ds.question.answer, api, resolve));
      host.appendChild(el('<div class="mg-feedback"></div>'));
    }
  });
};

export const Y3Stations = true;
