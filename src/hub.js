/* ============================================================
   Arcade Hub — title → profile select → SUBJECT select → game.

   GAME REGISTRY (how future games plug in):
     gameRegistry.register({
       id: "maths-jungle",          // unique, also the progress key
       title: "Maths Jungle",
       grade: "Year 1",             // "Year 1" | "Year 3" | "Form 1"
       subject: "maths",            // "maths" | "science"
       icon: "🐒",
       launch: function ({ containerId, profile, onExit }) { ... }
     });
   The subject cards are rendered FROM this registry — a new game
   is one new module + one register() call. A game may register
   twice (e.g. Quiz Quest for both subjects).
   ============================================================ */

window.gameRegistry = {
  games: [],
  register: function (def) { this.games.push(def); },
  find: function (grade, subject) {
    return this.games.find(function (g) {
      return g.grade === grade && g.subject === subject;
    }) || null;
  }
};

window.Hub = (function () {
  const GRADES = ["Year 1", "Year 3", "Form 1"];
  const AVATARS = ["🦁", "🐯", "🐼", "🦄", "🐸", "🦊", "🐵", "🐰", "🦖", "🚀", "🌟", "🍉"];
  const SUBJECTS = [
    { key: "maths", label: "MATHS", emoji: "📐", cls: "maths" },
    { key: "science", label: "SCIENCE", emoji: "🔬", cls: "science" }
  ];

  const app = document.getElementById("app");
  let activeGame = null; /* whatever the launched game returns (may expose destroy()) */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- title screen ---------------- */
  function showTitle() {
    app.innerHTML =
      '<div class="hub-screen title-hero">' +
      "<h1>Family Learning Arcade</h1>" +
      '<div class="emoji-row">🐒 📐 🔬 🏝️ 🏃 🧪 ⚔️</div>' +
      '<button class="btn green" id="btn-start">▶ PLAY</button>' +
      "</div>";
    document.getElementById("btn-start").onclick = function () {
      Sound.click();
      showProfiles();
    };
  }

  /* ---------------- profile select ---------------- */
  function showProfiles() {
    const profiles = ProfileStore.all();
    let html =
      '<div class="hub-screen">' +
      '<div class="hub-topbar">' +
      '<button class="btn small grey" id="btn-back">◀ Back</button>' +
      '<button class="btn small grey" id="btn-parent">⚙️ Parents</button>' +
      "</div>" +
      '<h2 class="screen-title">Who is playing? 👋</h2>' +
      '<div class="card-grid">';

    profiles.forEach(function (p) {
      const total = Stars.subjectTotal(p, "maths") + Stars.subjectTotal(p, "science");
      html +=
        '<div class="card profile-card" data-id="' + p.id + '">' +
        '<div class="avatar">' + p.avatar + "</div>" +
        '<div class="name">' + esc(p.name) + "</div>" +
        '<div class="grade-tag">' + esc(p.grade) + "</div>" +
        '<div class="stars-line">⭐ ' + total + "</div>" +
        "</div>";
    });
    html +=
      '<div class="card add-card" id="btn-new">' +
      '<div class="avatar">➕</div>' +
      '<div class="name">New Player</div>' +
      "</div></div></div>";
    app.innerHTML = html;

    document.getElementById("btn-back").onclick = function () { Sound.click(); showTitle(); };
    document.getElementById("btn-parent").onclick = function () { Sound.click(); showParentCorner(showProfiles); };
    document.getElementById("btn-new").onclick = function () { Sound.click(); showCreateProfile(); };
    app.querySelectorAll(".profile-card").forEach(function (card) {
      card.onclick = function () {
        Sound.click();
        ProfileStore.setCurrent(card.getAttribute("data-id"));
        showSubjects();
      };
    });
  }

  /* ---------------- create profile ---------------- */
  function showCreateProfile() {
    let avatar = AVATARS[0];
    let grade = null;

    let html =
      '<div class="hub-screen">' +
      '<div class="hub-topbar"><button class="btn small grey" id="btn-back">◀ Back</button><span></span></div>' +
      '<h2 class="screen-title">New Player ✨</h2>' +
      '<div class="form-card">' +
      '<label>Your name (everyone will see your scores!)</label>' +
      '<input type="text" id="inp-name" maxlength="14" placeholder="Type your name…" autocomplete="off">' +
      "<label>Pick your avatar</label>" +
      '<div class="picker-row" id="row-avatar">' +
      AVATARS.map(function (a, i) {
        return '<button class="pick' + (i === 0 ? " selected" : "") + '" data-a="' + a + '">' + a + "</button>";
      }).join("") +
      "</div>" +
      "<label>Which class are you in?</label>" +
      '<div class="picker-row" id="row-grade">' +
      GRADES.map(function (g) {
        return '<button class="pick grade-pick" data-g="' + g + '">' + g + "</button>";
      }).join("") +
      "</div>" +
      '<div class="form-error" id="form-err"></div>' +
      '<div class="form-actions"><button class="btn green" id="btn-create">Let\'s Go! 🚀</button></div>' +
      "</div></div>";
    app.innerHTML = html;

    document.getElementById("btn-back").onclick = function () { Sound.click(); showProfiles(); };

    app.querySelectorAll("#row-avatar .pick").forEach(function (b) {
      b.onclick = function () {
        Sound.click();
        app.querySelectorAll("#row-avatar .pick").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        avatar = b.getAttribute("data-a");
      };
    });
    app.querySelectorAll("#row-grade .pick").forEach(function (b) {
      b.onclick = function () {
        Sound.click();
        app.querySelectorAll("#row-grade .pick").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        grade = b.getAttribute("data-g");
      };
    });

    document.getElementById("btn-create").onclick = function () {
      const name = document.getElementById("inp-name").value.trim();
      const err = document.getElementById("form-err");
      if (name.length < 2) {
        err.textContent = "Please type your name first (at least 2 letters) 😊";
        return;
      }
      if (!grade) {
        err.textContent = "Please choose your class 😊";
        return;
      }
      Sound.correct();
      ProfileStore.create(name, avatar, grade);
      showSubjects();
    };
  }

  /* ---------------- subject select ---------------- */
  function showSubjects() {
    const me = ProfileStore.current();
    if (!me) { showProfiles(); return; }

    let html =
      '<div class="hub-screen">' +
      '<div class="hub-topbar">' +
      '<button class="btn small grey" id="btn-back">◀ Players</button>' +
      '<span style="color:#fff;font-weight:800;font-size:22px">' + me.avatar + " " + esc(me.name) +
      ' <span style="font-size:16px;opacity:.85">(' + esc(me.grade) + ")</span></span>" +
      '<button class="btn small grey" id="btn-parent">⚙️</button>' +
      "</div>" +
      '<h2 class="screen-title">Pick a subject! 🎮</h2>' +
      '<div class="subject-grid">';

    SUBJECTS.forEach(function (s) {
      const game = gameRegistry.find(me.grade, s.key);
      if (game) {
        const prog = ProfileStore.peekProgress(me.id, game.id);
        const stars = Stars.totalForGame(prog);
        html +=
          '<div class="subject-card ' + s.cls + '" data-subject="' + s.key + '">' +
          '<div class="subject-emoji">' + s.emoji + "</div>" +
          "<h3>" + s.label + "</h3>" +
          '<div class="game-title">' + game.icon + " " + esc(game.title) + "</div>" +
          '<div class="stars-line">⭐ ' + stars + " stars</div>" +
          "</div>";
      } else {
        html +=
          '<div class="subject-card locked ' + s.cls + '">' +
          '<div class="subject-emoji">' + s.emoji + "</div>" +
          "<h3>" + s.label + "</h3>" +
          '<div class="game-title">Coming Soon 🔒</div>' +
          '<div class="stars-line">Stay tuned!</div>' +
          "</div>";
      }
    });
    html += "</div>";

    /* family star board */
    html += '<div class="board"><h3>🌟 Family Star Board</h3><table>' +
      "<tr><th></th><th style='text-align:left'>Player</th><th>📐 Maths</th><th>🔬 Science</th><th>Total</th></tr>";
    const ranked = ProfileStore.all().map(function (p) {
      const m = Stars.subjectTotal(p, "maths");
      const s = Stars.subjectTotal(p, "science");
      return { p: p, m: m, s: s, t: m + s };
    }).sort(function (a, b) { return b.t - a.t; });
    const medals = ["🥇", "🥈", "🥉"];
    ranked.forEach(function (r, i) {
      html += "<tr" + (r.p.id === me.id ? ' class="me"' : "") + "><td>" + (medals[i] || (i + 1) + ".") + "</td>" +
        '<td class="pname">' + r.p.avatar + " " + esc(r.p.name) + "</td>" +
        "<td>⭐ " + r.m + "</td><td>⭐ " + r.s + "</td><td><b>" + r.t + "</b></td></tr>";
    });
    html += "</table></div></div>";

    app.innerHTML = html;

    document.getElementById("btn-back").onclick = function () { Sound.click(); showProfiles(); };
    document.getElementById("btn-parent").onclick = function () { Sound.click(); showParentCorner(showSubjects); };
    app.querySelectorAll(".subject-card[data-subject]").forEach(function (card) {
      card.onclick = function () {
        Sound.click();
        launchGame(me.grade, card.getAttribute("data-subject"));
      };
    });
  }

  /* ---------------- launching games ---------------- */
  function launchGame(grade, subject) {
    const game = gameRegistry.find(grade, subject);
    const me = ProfileStore.current();
    if (!game || !me) return;

    document.getElementById("app").classList.add("hidden");
    document.getElementById("game-root").classList.remove("hidden");

    activeGame = game.launch({
      containerId: "game-container",
      profile: me,
      onExit: exitGame
    });
  }

  function exitGame() {
    if (activeGame && typeof activeGame.destroy === "function") {
      try { activeGame.destroy(); } catch (e) { /* already gone */ }
    }
    activeGame = null;
    TouchControls.hide();
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("game-root").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    showSubjects(); /* refresh stars */
  }

  /* ---------------- parent corner ---------------- */
  function showParentCorner(onClose) {
    const root = document.getElementById("overlay-root");
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    const modal = document.createElement("div");
    modal.className = "modal";
    backdrop.appendChild(modal);

    function render() {
      const st = ProfileStore.settings();
      let html = "<h3>⚙️ Parent Corner</h3>" +
        '<div class="row"><span>🔊 Sound</span><button class="btn small ' + (st.sound !== false ? "green" : "grey") + '" id="pc-sound">' + (st.sound !== false ? "ON" : "OFF") + "</button></div>" +
        '<div class="row"><span>🔓 Unlock all levels (all games)</span><button class="btn small ' + (st.parentUnlock ? "orange" : "grey") + '" id="pc-unlock">' + (st.parentUnlock ? "ON" : "OFF") + "</button></div>";
      ProfileStore.all().forEach(function (p) {
        html += '<div class="row"><span>' + p.avatar + " " + esc(p.name) + "</span><span>" +
          '<button class="btn small blue" data-reset="' + p.id + '">Reset</button> ' +
          '<button class="btn small red" data-del="' + p.id + '">Delete</button></span></div>';
      });
      html += '<div class="form-actions"><button class="btn grey" id="pc-close">Close</button></div>';
      modal.innerHTML = html;

      modal.querySelector("#pc-sound").onclick = function () { Sound.toggle(); Sound.click(); render(); };
      modal.querySelector("#pc-unlock").onclick = function () {
        ProfileStore.setSetting("parentUnlock", !ProfileStore.settings().parentUnlock);
        Sound.click(); render();
      };
      modal.querySelectorAll("[data-reset]").forEach(function (b) {
        b.onclick = function () {
          if (confirm("Reset ALL progress for this player?")) {
            ProfileStore.resetProgress(b.getAttribute("data-reset"));
            render();
          }
        };
      });
      modal.querySelectorAll("[data-del]").forEach(function (b) {
        b.onclick = function () {
          if (confirm("Delete this player completely?")) {
            ProfileStore.remove(b.getAttribute("data-del"));
            render();
          }
        };
      });
      modal.querySelector("#pc-close").onclick = function () {
        Sound.click(); backdrop.remove(); onClose();
      };
    }

    render();
    root.appendChild(backdrop);
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    showTitle();
  });

  return { showTitle: showTitle, showProfiles: showProfiles, showSubjects: showSubjects, exitGame: exitGame };
})();
