/* ============================================================
   OBBY ACADEMY HUB — title → profile select → SUBJECT select →
   world. Classic script; 3D bits come from window.Obby (main.js).

   WORLD REGISTRY (how future worlds plug in):
     gameRegistry.register({
       id: "maths-world", title: "Maths World",
       grade: "Year 1",           // "Year 1" | "Year 3" | "Form 1"
       subject: "maths",          // "maths" | "science"
       icon: "📐",
       launch: function ({ containerId, profile, onExit }) { ... }
     });
   The subject cards render FROM this registry — a new world is
   one module + one register() call.
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
  const AUTO_AVATARS = ["🦁", "🐯", "🐼", "🦄", "🐸", "🦊", "🐵", "🐰", "🦖", "🚀"];
  const SUBJECTS = [
    { key: "maths", label: "MATHS WORLD", emoji: "📐", cls: "maths" },
    { key: "science", label: "SCIENCE WORLD", emoji: "🔬", cls: "science" }
  ];

  const app = document.getElementById("app");
  let activeGame = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* mini color-block chip for a profile (2D representation of the avatar) */
  function chip(p) {
    const c = p.colors || {};
    return '<span class="avatar-chip">' +
      '<span style="background:' + (c.skin || "#ffd7a8") + '"></span>' +
      '<span style="background:' + (c.shirt || "#3b82f6") + '"></span>' +
      '<span style="background:' + (c.pants || "#1e3a8a") + '"></span></span>';
  }

  /* ---------------- title ---------------- */
  function showTitle() {
    Obby.startTitleBg();
    app.innerHTML =
      '<div class="hub-screen title-hero glass">' +
      '<h1 class="game-logo">OBBY<br>ACADEMY</h1>' +
      '<div class="tagline">Jump. Answer. Hatch. 🥚</div>' +
      '<button class="btn green xl" id="btn-start">▶ PLAY</button>' +
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
      '<div class="hub-screen glass">' +
      '<div class="hub-topbar">' +
      '<button class="btn small grey" id="btn-back">◀ Back</button>' +
      '<button class="btn small grey" id="btn-parent">⚙️ Parents</button>' +
      "</div>" +
      '<h2 class="screen-title">Who is playing? 👋</h2>' +
      '<div class="card-grid">';

    profiles.forEach(function (p) {
      const total = Stars.subjectTotal(p, "maths") + Stars.subjectTotal(p, "science");
      const pets = (p.pets && p.pets.owned.length) || 0;
      html +=
        '<div class="card profile-card" data-id="' + p.id + '">' +
        '<div class="avatar">' + (p.avatar || "🙂") + "</div>" +
        chip(p) +
        '<div class="name">' + esc(p.name) + "</div>" +
        '<div class="grade-tag">' + esc(p.grade) + "</div>" +
        '<div class="stars-line">⭐ ' + total + " &nbsp;🐾 " + pets + "</div>" +
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

  /* ---------------- create profile / wardrobe ---------------- */
  function colorRows(colors) {
    function row(kind, label) {
      return "<label>" + label + "</label>" +
        '<div class="picker-row" data-kind="' + kind + '">' +
        Obby.AVATAR_COLORS[kind].map(function (c) {
          return '<button class="pick swatch' + (colors[kind] === c ? " selected" : "") + '" data-c="' + c + '" style="background:' + c + '"></button>';
        }).join("") +
        "</div>";
    }
    return row("skin", "Skin") + row("shirt", "Shirt") + row("pants", "Pants");
  }

  function bindColorRows(root, colors, onChange) {
    root.querySelectorAll(".picker-row[data-kind]").forEach(function (rowEl) {
      const kind = rowEl.getAttribute("data-kind");
      rowEl.querySelectorAll(".swatch").forEach(function (b) {
        b.onclick = function () {
          Sound.click();
          rowEl.querySelectorAll(".swatch").forEach(function (x) { x.classList.remove("selected"); });
          b.classList.add("selected");
          colors[kind] = b.getAttribute("data-c");
          onChange();
        };
      });
    });
  }

  function attachPreview(el, colors) {
    const canvas = Obby.Showcase.canvas(150);
    el.innerHTML = "";
    el.appendChild(canvas);
    let ch = Obby.buildCharacter(colors);
    Obby.Showcase.set(ch, true);
    return function refresh() {
      ch = Obby.buildCharacter(colors);
      Obby.Showcase.set(ch, true);
    };
  }

  function showCreateProfile() {
    const colors = { skin: Obby.AVATAR_COLORS.skin[0], shirt: Obby.AVATAR_COLORS.shirt[1], pants: Obby.AVATAR_COLORS.pants[0] };
    let grade = null;

    app.innerHTML =
      '<div class="hub-screen glass">' +
      '<div class="hub-topbar"><button class="btn small grey" id="btn-back">◀ Back</button><span></span></div>' +
      '<h2 class="screen-title">New Player ✨</h2>' +
      '<div class="form-card with-preview">' +
      '<div class="preview-pane" id="char-preview"></div>' +
      '<div class="form-fields">' +
      "<label>Your name (everyone will see your scores!)</label>" +
      '<input type="text" id="inp-name" maxlength="14" placeholder="Type your name…" autocomplete="off">' +
      colorRows(colors) +
      "<label>Which class are you in?</label>" +
      '<div class="picker-row" id="row-grade">' +
      GRADES.map(function (g) { return '<button class="pick grade-pick" data-g="' + g + '">' + g + "</button>"; }).join("") +
      "</div>" +
      '<div class="form-error" id="form-err"></div>' +
      '<div class="form-actions"><button class="btn green" id="btn-create">Let\'s Go! 🚀</button></div>' +
      "</div></div></div>";

    document.getElementById("btn-back").onclick = function () { Sound.click(); Obby.Showcase.stop(); showProfiles(); };
    const refresh = attachPreview(document.getElementById("char-preview"), colors);
    bindColorRows(app, colors, refresh);

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
      if (name.length < 2) { err.textContent = "Please type your name first (at least 2 letters) 😊"; return; }
      if (!grade) { err.textContent = "Please choose your class 😊"; return; }
      Sound.correct();
      const avatar = AUTO_AVATARS[ProfileStore.all().length % AUTO_AVATARS.length];
      ProfileStore.create(name, avatar, grade, colors);
      Obby.Showcase.stop();
      showSubjects();
    };
  }

  function showWardrobe() {
    const me = ProfileStore.current();
    if (!me) { showProfiles(); return; }
    const colors = Object.assign({ skin: Obby.AVATAR_COLORS.skin[0], shirt: Obby.AVATAR_COLORS.shirt[1], pants: Obby.AVATAR_COLORS.pants[0] }, me.colors || {});

    app.innerHTML =
      '<div class="hub-screen glass">' +
      '<div class="hub-topbar"><button class="btn small grey" id="btn-back">◀ Back</button><span class="map-title">👕 Wardrobe</span><span></span></div>' +
      '<div class="form-card with-preview">' +
      '<div class="preview-pane" id="char-preview"></div>' +
      '<div class="form-fields">' + colorRows(colors) +
      '<div class="form-actions"><button class="btn green" id="btn-save">Save ✅</button></div>' +
      "</div></div></div>";

    document.getElementById("btn-back").onclick = function () { Sound.click(); Obby.Showcase.stop(); showSubjects(); };
    const refresh = attachPreview(document.getElementById("char-preview"), colors);
    bindColorRows(app, colors, refresh);
    document.getElementById("btn-save").onclick = function () {
      me.colors = colors;
      ProfileStore.saveProgress();
      Sound.correct();
      FX.praise("Looking good! 😎");
      Obby.Showcase.stop();
      showSubjects();
    };
  }

  /* ---------------- subject select ---------------- */
  function showSubjects() {
    const me = ProfileStore.current();
    if (!me) { showProfiles(); return; }
    const pets = (me.pets && me.pets.owned.length) || 0;

    let html =
      '<div class="hub-screen glass">' +
      '<div class="hub-topbar">' +
      '<button class="btn small grey" id="btn-back">◀ Players</button>' +
      '<span class="topbar-name">' + (me.avatar || "🙂") + " " + esc(me.name) +
      ' <span class="topbar-grade">(' + esc(me.grade) + ')</span></span>' +
      '<button class="btn small grey" id="btn-parent">⚙️</button>' +
      "</div>" +
      '<div class="me-strip">🪙 ' + (me.coins || 0) + " &nbsp;·&nbsp; 🐾 " + pets +
      ' &nbsp;·&nbsp; <button class="btn small blue" id="btn-wardrobe">👕 Wardrobe</button></div>' +
      '<h2 class="screen-title">Pick your world! 🌍</h2>' +
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
    html += '<div class="board"><h3>🌟 Family Board</h3><table>' +
      "<tr><th></th><th style='text-align:left'>Player</th><th>📐</th><th>🔬</th><th>🐾 Pets</th><th>Total ⭐</th></tr>";
    const ranked = ProfileStore.all().map(function (p) {
      const m = Stars.subjectTotal(p, "maths");
      const s = Stars.subjectTotal(p, "science");
      return { p: p, m: m, s: s, pets: (p.pets && p.pets.owned.length) || 0, t: m + s };
    }).sort(function (a, b) { return b.t - a.t; });
    const medals = ["🥇", "🥈", "🥉"];
    ranked.forEach(function (r, i) {
      html += "<tr" + (r.p.id === me.id ? ' class="me"' : "") + "><td>" + (medals[i] || (i + 1) + ".") + "</td>" +
        '<td class="pname">' + (r.p.avatar || "🙂") + " " + esc(r.p.name) + "</td>" +
        "<td>⭐" + r.m + "</td><td>⭐" + r.s + "</td><td>" + r.pets + "</td><td><b>" + r.t + "</b></td></tr>";
    });
    html += "</table></div></div>";

    app.innerHTML = html;

    document.getElementById("btn-back").onclick = function () { Sound.click(); showProfiles(); };
    document.getElementById("btn-parent").onclick = function () { Sound.click(); showParentCorner(showSubjects); };
    document.getElementById("btn-wardrobe").onclick = function () { Sound.click(); showWardrobe(); };
    app.querySelectorAll(".subject-card[data-subject]").forEach(function (card) {
      card.onclick = function () {
        Sound.click();
        launchGame(me.grade, card.getAttribute("data-subject"));
      };
    });
  }

  /* ---------------- launching worlds ---------------- */
  function launchGame(grade, subject) {
    const game = gameRegistry.find(grade, subject);
    const me = ProfileStore.current();
    if (!game || !me) return;
    Obby.stopTitleBg();
    app.innerHTML = "";
    activeGame = game.launch({ containerId: "stage", profile: me, onExit: exitGame });
  }

  function exitGame() {
    if (activeGame && typeof activeGame.destroy === "function") {
      try { activeGame.destroy(); } catch (e) { /* already gone */ }
    }
    activeGame = null;
    showSubjects();
    Obby.startTitleBg();
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
        '<div class="row"><span>🎮 Low graphics (for slow phones)</span><button class="btn small ' + (st.lowGfx ? "orange" : "grey") + '" id="pc-gfx">' + (st.lowGfx ? "ON" : "OFF") + "</button></div>" +
        '<div class="row"><span>🔓 Unlock all courses (all worlds)</span><button class="btn small ' + (st.parentUnlock ? "orange" : "grey") + '" id="pc-unlock">' + (st.parentUnlock ? "ON" : "OFF") + "</button></div>";
      ProfileStore.all().forEach(function (p) {
        html += '<div class="row"><span>' + (p.avatar || "🙂") + " " + esc(p.name) + "</span><span>" +
          '<button class="btn small blue" data-reset="' + p.id + '">Reset</button> ' +
          '<button class="btn small red" data-del="' + p.id + '">Delete</button></span></div>';
      });
      html += '<div class="form-actions"><button class="btn grey" id="pc-close">Close</button></div>';
      modal.innerHTML = html;

      modal.querySelector("#pc-sound").onclick = function () { Sound.toggle(); Sound.click(); render(); };
      modal.querySelector("#pc-gfx").onclick = function () {
        const v = !ProfileStore.settings().lowGfx;
        ProfileStore.setSetting("lowGfx", v);
        Obby.setQuality(v);
        Sound.click(); render();
      };
      modal.querySelector("#pc-unlock").onclick = function () {
        ProfileStore.setSetting("parentUnlock", !ProfileStore.settings().parentUnlock);
        Sound.click(); render();
      };
      modal.querySelectorAll("[data-reset]").forEach(function (b) {
        b.onclick = function () {
          if (confirm("Reset ALL progress, coins and pets for this player?")) {
            const p = ProfileStore.byId(b.getAttribute("data-reset"));
            if (p) { p.coins = 0; p.pets = { owned: [], active: null }; }
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
  let booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    showTitle();
  }
  /* modules dispatch obby-ready; if they already did, boot on DOM ready */
  window.addEventListener("obby-ready", function () {
    if (document.readyState !== "loading") boot();
    else document.addEventListener("DOMContentLoaded", boot);
  });
  document.addEventListener("DOMContentLoaded", function () {
    if (window.Obby) boot();
  });

  return { showTitle: showTitle, showProfiles: showProfiles, showSubjects: showSubjects, exitGame: exitGame };
})();
