/* ============================================================
   QuestionPopup — big friendly question popup with 3 large
   tappable answer buttons. Used by all quiz-style games.

   Usage:
     QuestionPopup.show(q, { index: 2, total: 5 }).then(result => {
       // result.firstTry === true if answered correctly on 1st tap
     });

   The popup only closes on a CORRECT answer — wrong answers get a
   gentle "Try again!", the choices reshuffle, and the child keeps
   going. It never blocks permanently.

   Question object (see /content files):
     { question, choices: [..], answer, emoji?, visual? }
   Supported visual types (drawn, no images needed):
     { type:"clock", hour: 3, minute: 0 | 30 }
     { type:"fraction", parts: 4, shaded: 1, shape: "circle"|"square" }
     { type:"shape", name: "triangle"|"square"|"circle"|"rectangle"|
                            "cube"|"sphere"|"cone"|"cylinder" }
     { type:"pictograph", rows: [["Apples","🍎",4], ["Oranges","🍊",2]] }
     { type:"money", items: ["10 sen","10 sen","5 sen"] }
   ============================================================ */
window.QuestionPopup = (function () {

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- visual renderers (SVG / DOM) ---------- */

  function svgEl(w, h, inner) {
    const d = document.createElement("div");
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '">' + inner + "</svg>";
    return d.firstChild;
  }

  function clockSVG(hour, minute) {
    let ticks = "";
    for (let i = 1; i <= 12; i++) {
      const a = (i * 30 - 90) * Math.PI / 180;
      const x = 100 + Math.cos(a) * 78, y = 100 + Math.sin(a) * 78;
      ticks += '<text x="' + x + '" y="' + (y + 7) + '" text-anchor="middle" font-size="20" font-weight="bold" fill="#334155">' + i + "</text>";
    }
    const mAng = (minute * 6 - 90) * Math.PI / 180;
    const hAng = ((hour % 12) * 30 + minute * 0.5 - 90) * Math.PI / 180;
    return svgEl(200, 200,
      '<circle cx="100" cy="100" r="95" fill="#fef9c3" stroke="#f59e0b" stroke-width="8"/>' +
      ticks +
      '<line x1="100" y1="100" x2="' + (100 + Math.cos(hAng) * 45) + '" y2="' + (100 + Math.sin(hAng) * 45) + '" stroke="#1e293b" stroke-width="9" stroke-linecap="round"/>' +
      '<line x1="100" y1="100" x2="' + (100 + Math.cos(mAng) * 66) + '" y2="' + (100 + Math.sin(mAng) * 66) + '" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="100" cy="100" r="7" fill="#1e293b"/>');
  }

  function fractionSVG(parts, shaded, shape) {
    if (shape === "square") {
      let cells = "";
      const w = 180 / parts;
      for (let i = 0; i < parts; i++) {
        cells += '<rect x="' + (10 + i * w) + '" y="30" width="' + w + '" height="140" fill="' + (i < shaded ? "#fb923c" : "#fff7ed") + '" stroke="#9a3412" stroke-width="4"/>';
      }
      return svgEl(200, 200, cells);
    }
    /* pizza-style circle */
    let slices = "";
    for (let i = 0; i < parts; i++) {
      const a1 = (i * 360 / parts - 90) * Math.PI / 180;
      const a2 = ((i + 1) * 360 / parts - 90) * Math.PI / 180;
      const x1 = 100 + Math.cos(a1) * 85, y1 = 100 + Math.sin(a1) * 85;
      const x2 = 100 + Math.cos(a2) * 85, y2 = 100 + Math.sin(a2) * 85;
      const large = 360 / parts > 180 ? 1 : 0;
      slices += '<path d="M100,100 L' + x1 + "," + y1 + " A85,85 0 " + large + ",1 " + x2 + "," + y2 + ' Z" fill="' + (i < shaded ? "#fb923c" : "#fef3c7") + '" stroke="#9a3412" stroke-width="4"/>';
    }
    return svgEl(200, 200, slices);
  }

  function shapeSVG(name) {
    const shapes = {
      triangle: '<polygon points="100,25 180,170 20,170" fill="#60a5fa" stroke="#1d4ed8" stroke-width="6"/>',
      square: '<rect x="35" y="35" width="130" height="130" fill="#4ade80" stroke="#15803d" stroke-width="6"/>',
      circle: '<circle cx="100" cy="100" r="72" fill="#f472b6" stroke="#be185d" stroke-width="6"/>',
      rectangle: '<rect x="20" y="60" width="160" height="85" fill="#fbbf24" stroke="#b45309" stroke-width="6"/>',
      cube: '<rect x="45" y="70" width="95" height="95" fill="#93c5fd" stroke="#1d4ed8" stroke-width="5"/><polygon points="45,70 75,40 170,40 140,70" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="5"/><polygon points="140,70 170,40 170,135 140,165" fill="#60a5fa" stroke="#1d4ed8" stroke-width="5"/>',
      sphere: '<circle cx="100" cy="100" r="72" fill="#a78bfa" stroke="#6d28d9" stroke-width="6"/><ellipse cx="100" cy="100" rx="72" ry="24" fill="none" stroke="#6d28d9" stroke-width="4" stroke-dasharray="8 7"/>',
      cone: '<polygon points="100,25 160,150 40,150" fill="#fdba74" stroke="#c2410c" stroke-width="5"/><ellipse cx="100" cy="150" rx="60" ry="20" fill="#fb923c" stroke="#c2410c" stroke-width="5"/>',
      cylinder: '<rect x="45" y="50" width="110" height="105" fill="#5eead4" stroke="#0f766e" stroke-width="5"/><ellipse cx="100" cy="50" rx="55" ry="18" fill="#99f6e4" stroke="#0f766e" stroke-width="5"/><ellipse cx="100" cy="155" rx="55" ry="18" fill="#2dd4bf" stroke="#0f766e" stroke-width="5"/>'
    };
    return svgEl(200, 200, shapes[name] || shapes.circle);
  }

  function pictographEl(rows) {
    const box = document.createElement("div");
    box.className = "q-pictograph";
    rows.forEach(function (r) {
      const line = document.createElement("div");
      const label = document.createElement("span");
      label.className = "pg-label";
      label.textContent = r[0] + " ";
      line.appendChild(label);
      line.appendChild(document.createTextNode(" " + r[1].repeat(r[2])));
      box.appendChild(line);
    });
    return box;
  }

  function moneySVG(items) {
    const notes = { "RM1": "#93c5fd", "RM5": "#86efac", "RM10": "#fca5a5", "RM20": "#fdba74", "RM50": "#5eead4" };
    let inner = "", x = 10;
    items.forEach(function (it) {
      if (notes[it]) {
        inner += '<rect x="' + x + '" y="55" width="105" height="60" rx="8" fill="' + notes[it] + '" stroke="#334155" stroke-width="3"/>' +
          '<text x="' + (x + 52) + '" y="93" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">' + it + "</text>";
        x += 118;
      } else {
        inner += '<circle cx="' + (x + 40) + '" cy="85" r="40" fill="#fde68a" stroke="#a16207" stroke-width="4"/>' +
          '<text x="' + (x + 40) + '" y="80" text-anchor="middle" font-size="19" font-weight="bold" fill="#78350f">' + it.replace(" sen", "") + "</text>" +
          '<text x="' + (x + 40) + '" y="102" text-anchor="middle" font-size="15" font-weight="bold" fill="#78350f">sen</text>';
        x += 93;
      }
    });
    return svgEl(Math.max(x + 5, 120), 170, inner);
  }

  function renderVisual(v) {
    if (!v) return null;
    try {
      if (v.type === "clock") return clockSVG(v.hour, v.minute || 0);
      if (v.type === "fraction") return fractionSVG(v.parts, v.shaded, v.shape || "circle");
      if (v.type === "shape") return shapeSVG(v.name);
      if (v.type === "pictograph") return pictographEl(v.rows);
      if (v.type === "money") return moneySVG(v.items);
    } catch (e) { /* a broken visual should never block a question */ }
    return null;
  }

  /* ---------- popup ---------- */

  function show(q, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      const root = document.getElementById("overlay-root");
      const backdrop = document.createElement("div");
      backdrop.className = "q-backdrop";

      const box = document.createElement("div");
      box.className = "q-box";
      backdrop.appendChild(box);

      let firstAttempt = true;

      function build() {
        box.innerHTML = "";
        if (q.emoji && !q.visual) {
          const em = document.createElement("div");
          em.className = "q-emoji";
          em.textContent = q.emoji;
          box.appendChild(em);
        }
        const qt = document.createElement("div");
        qt.className = "q-text";
        qt.textContent = q.question;
        box.appendChild(qt);

        const vis = renderVisual(q.visual);
        if (vis) {
          const wrap = document.createElement("div");
          wrap.className = "q-visual";
          wrap.appendChild(vis);
          box.appendChild(wrap);
        }

        const list = document.createElement("div");
        list.className = "q-choices";
        shuffle(q.choices).forEach(function (choice) {
          const b = document.createElement("button");
          b.className = "q-choice";
          b.textContent = choice;
          b.onclick = function () { answer(b, choice); };
          list.appendChild(b);
        });
        box.appendChild(list);

        const fb = document.createElement("div");
        fb.className = "q-feedback";
        box.appendChild(fb);

        if (opts.total) {
          const pr = document.createElement("div");
          pr.className = "q-progress";
          pr.textContent = "Question " + opts.index + " of " + opts.total;
          box.appendChild(pr);
        }
      }

      let locked = false;
      function answer(btn, choice) {
        if (locked) return;
        if (String(choice) === String(q.answer)) {
          locked = true;
          btn.classList.add("correct");
          const fb = box.querySelector(".q-feedback");
          fb.textContent = "Correct! 🎉";
          fb.className = "q-feedback good";
          Sound.correct();
          FX.confetti(14);
          const wasFirst = firstAttempt;
          setTimeout(function () {
            backdrop.remove();
            resolve({ firstTry: wasFirst });
          }, 850);
        } else {
          firstAttempt = false;
          btn.classList.add("wrong-flash");
          const fb = box.querySelector(".q-feedback");
          fb.textContent = "Try again! 💪 You can do it!";
          fb.className = "q-feedback retry";
          Sound.wrong();
          box.classList.remove("shake");
          void box.offsetWidth; /* restart animation */
          box.classList.add("shake");
          setTimeout(build, 700); /* reshuffle choices */
        }
      }

      build();
      root.appendChild(backdrop);
    });
  }

  return { show: show, renderVisual: renderVisual };
})();
