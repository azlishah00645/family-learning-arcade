/* ============================================================
   MATHS JUNGLE — Year 1 Maths side-scrolling platformer.
   Run, jump, collect coins, answer 10 question gates per chapter
   (picked 4 easy + 3 medium + 3 hard, ordered easy → hard).
   Registered for { grade: "Year 1", subject: "maths" }.
   ============================================================ */
(function () {
  const GAME_ID = "maths-jungle";
  const TITLE = "Maths Jungle";
  const CHARACTERS = ["🧒", "👧", "🤖"];
  /* 10 question gates per chapter (kept clear of the two pits) */
  const GATE_XS = [600, 980, 1360, 1740, 2120, 2500, 2950, 3300, 3650, 4000];
  const GATES_N = GATE_XS.length;
  const PASS_N = 8; /* pass = at least 8/10 first-try */
  const WORLD_W = 4800;
  const VIEW_W = 960, VIEW_H = 540;

  let container = null, profile = null, onExit = null;
  let phaserGame = null;
  let levelSelectEl = null;
  let hudHomeBtn = null;

  /* ---------------- progress helpers ---------------- */
  function prog() { return ProfileStore.getProgress(profile.id, GAME_ID); }

  function levelData(p, levelId) {
    return (p && p.levels && p.levels[levelId]) || null;
  }

  function isUnlocked(i) {
    if (i === 0) return true;
    if (ProfileStore.settings().parentUnlock) return true;
    const prev = levelData(prog(), MATHS_JUNGLE_LEVELS[i - 1].id);
    return !!(prev && prev.passed);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Picks 10 questions: 4 easy + 3 medium + 3 hard (random within
     each difficulty), then sorts them easy → hard so every chapter
     ramps up gently. */
  function pickQuestions(levelId) {
    const bank = (window.Y1_MATHS_QUESTIONS || []).filter(function (q) { return q.level === levelId; });
    function tier(d) { return shuffle(bank.filter(function (q) { return (q.difficulty || 2) === d; })); }
    let picked = tier(1).slice(0, 4).concat(tier(2).slice(0, 3), tier(3).slice(0, 3));
    if (picked.length < GATES_N) { /* a tier ran short — top up from the rest */
      const left = shuffle(bank.filter(function (q) { return picked.indexOf(q) === -1; }));
      picked = picked.concat(left.slice(0, GATES_N - picked.length));
    }
    while (picked.length < GATES_N && bank.length) picked.push(bank[Math.floor(Math.random() * bank.length)]);
    picked.sort(function (a, b) { return (a.difficulty || 2) - (b.difficulty || 2); });
    return picked.slice(0, GATES_N);
  }

  /* ---------------- level select (DOM) ---------------- */
  function showLevelSelect() {
    destroyPhaser();
    removeLevelSelect();

    const p = prog();
    if (!p.character) p.character = CHARACTERS[0];

    const el = document.createElement("div");
    el.className = "level-select";
    let html =
      '<div class="hub-topbar">' +
      '<button class="btn small grey" id="mj-back">◀ Subjects</button>' +
      '<span style="color:#fff;font-weight:900;font-size:26px">🐒 Maths Jungle</span>' +
      "<span></span></div>" +
      '<div class="char-row"><span class="label">Your explorer:</span>' +
      CHARACTERS.map(function (c) {
        return '<button class="char-pick' + (c === p.character ? " selected" : "") + '" data-c="' + c + '">' + c + "</button>";
      }).join("") +
      "</div>" +
      '<div class="level-grid">';

    MATHS_JUNGLE_LEVELS.forEach(function (lv, i) {
      const unlocked = isUnlocked(i);
      const d = levelData(p, lv.id);
      html +=
        '<div class="level-card' + (unlocked ? "" : " locked") + '" data-i="' + i + '">' +
        '<div class="lv-num">CHAPTER ' + (i + 1) + "</div>" +
        '<div style="font-size:34px">' + (unlocked ? lv.emoji : "🔒") + "</div>" +
        '<div class="lv-name">' + lv.name + "</div>" +
        '<div class="lv-stars">' + (d ? Stars.str(d.stars) : (unlocked ? "☆☆☆" : "")) + "</div>" +
        "</div>";
    });
    html += "</div>";
    el.innerHTML = html;

    document.getElementById("game-root").appendChild(el);
    levelSelectEl = el;

    el.querySelector("#mj-back").onclick = function () { Sound.click(); onExit(); };
    el.querySelectorAll(".char-pick").forEach(function (b) {
      b.onclick = function () {
        Sound.click();
        el.querySelectorAll(".char-pick").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        p.character = b.getAttribute("data-c");
        ProfileStore.saveProgress();
      };
    });
    el.querySelectorAll(".level-card:not(.locked)").forEach(function (card) {
      card.onclick = function () {
        Sound.click();
        startLevel(parseInt(card.getAttribute("data-i"), 10));
      };
    });
  }

  function removeLevelSelect() {
    if (levelSelectEl) { levelSelectEl.remove(); levelSelectEl = null; }
  }

  /* ---------------- Phaser play scene ---------------- */
  function startLevel(levelIndex) {
    removeLevelSelect();
    destroyPhaser();

    phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: "game-container",
      width: VIEW_W,
      height: VIEW_H,
      backgroundColor: MATHS_JUNGLE_LEVELS[levelIndex].sky,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: { default: "arcade", arcade: { gravity: { y: 1300 }, debug: false } },
      scene: [makePlayScene(levelIndex)]
    });

    TouchControls.show();
    addHomeButton(function () { showLevelSelect(); });
  }

  function addHomeButton(onHome) {
    removeHomeButton();
    hudHomeBtn = document.createElement("button");
    hudHomeBtn.className = "btn small grey";
    hudHomeBtn.textContent = "🏠";
    hudHomeBtn.style.cssText = "position:fixed;top:10px;right:10px;z-index:160;font-size:24px;";
    hudHomeBtn.onclick = function () { Sound.click(); onHome(); };
    document.getElementById("game-root").appendChild(hudHomeBtn);
  }

  function removeHomeButton() {
    if (hudHomeBtn) { hudHomeBtn.remove(); hudHomeBtn = null; }
  }

  function destroyPhaser() {
    removeHomeButton();
    if (phaserGame) {
      try { phaserGame.destroy(true); } catch (e) { /* already destroyed */ }
      phaserGame = null;
    }
    document.getElementById("game-container").innerHTML = "";
  }

  function makePlayScene(levelIndex) {
    const level = MATHS_JUNGLE_LEVELS[levelIndex];

    return {
      key: "play",

      create: function () {
        const scene = this;
        scene.levelIndex = levelIndex;
        scene.questions = pickQuestions(level.id);
        scene.results = [];          /* true = first-try correct */
        scene.score = 0;
        scene.gatesOpened = 0;
        scene.asking = false;
        scene.finished = false;
        scene.checkpointX = 80;
        scene.bumpCooldown = 0;

        scene.physics.world.setBounds(0, 0, WORLD_W, VIEW_H + 400);
        scene.cameras.main.setBounds(0, 0, WORLD_W, VIEW_H);
        scene.cameras.main.setBackgroundColor(level.sky);

        /* --- decorative background --- */
        for (let i = 0; i < 10; i++) {
          scene.add.text(200 + i * 480, 60 + (i % 3) * 40, "☁️", { fontSize: "44px" }).setScrollFactor(0.4);
        }
        for (let i = 0; i < 26; i++) {
          const d = level.deco[i % level.deco.length];
          scene.add.text(120 + i * 185, 415 + (i % 2) * 14, d, { fontSize: "46px" });
        }
        scene.add.text(WORLD_W - 260, 340, "🏰", { fontSize: "80px" });

        /* --- ground (with two small pits) --- */
        const platforms = scene.physics.add.staticGroup();
        const groundColor = 0x8b5a2b, grassColor = 0x22c55e;
        const pits = [[1150, 1300], [2750, 2900]];
        let gx = 0;
        function groundSeg(x1, x2) {
          const w = x2 - x1;
          const r = scene.add.rectangle(x1 + w / 2, 512, w, 56, groundColor);
          scene.physics.add.existing(r, true);
          platforms.add(r);
          const g = scene.add.rectangle(x1 + w / 2, 482, w, 10, grassColor);
          scene.physics.add.existing(g, true);
          platforms.add(g);
        }
        pits.forEach(function (pit) { groundSeg(gx, pit[0]); gx = pit[1]; });
        groundSeg(gx, WORLD_W);

        /* --- floating platforms + coins --- */
        scene.coinsGroup = scene.physics.add.staticGroup();
        function coin(x, y) {
          const c = scene.add.text(x, y, "🪙", { fontSize: "28px" });
          scene.physics.add.existing(c, true);
          scene.coinsGroup.add(c);
        }
        for (let i = 0; i < 9; i++) {
          const px = 420 + i * 500 + (i % 3) * 60;
          const py = i % 2 === 0 ? 370 : 300;
          const plat = scene.add.rectangle(px, py, 170, 22, 0xa16207);
          scene.physics.add.existing(plat, true);
          platforms.add(plat);
          coin(px - 40, py - 46);
          coin(px + 8, py - 46);
        }
        for (let i = 0; i < 12; i++) coin(300 + i * 380, 440);

        /* --- question gates --- */
        scene.gates = scene.physics.add.staticGroup();
        GATE_XS.forEach(function (x, idx) {
          const gate = scene.add.rectangle(x, 400, 30, 168, 0x7c3aed);
          gate.setStrokeStyle(4, 0x4c1d95);
          scene.physics.add.existing(gate, true);
          gate.setData("idx", idx);
          gate.setData("open", false);
          scene.gates.add(gate);
          const q = scene.add.text(x - 16, 280, "❓", { fontSize: "34px" });
          gate.setData("label", q);
          scene.tweens.add({ targets: q, y: 265, duration: 700, yoyo: true, repeat: -1 });
        });

        /* --- snail (gentle obstacle) --- */
        scene.snail = scene.add.text(1900, 440, "🐌", { fontSize: "36px" });
        scene.physics.add.existing(scene.snail);
        scene.snail.body.setAllowGravity(true);
        scene.snail.body.setVelocityX(35);
        scene.snailMin = 1750; scene.snailMax = 2150;
        scene.physics.add.collider(scene.snail, platforms);

        /* --- flag --- */
        scene.flag = scene.add.text(WORLD_W - 210, 420, "🚩", { fontSize: "58px" });
        scene.physics.add.existing(scene.flag, true);

        /* --- player --- */
        const character = prog().character || CHARACTERS[0];
        scene.player = scene.add.text(80, 380, character, { fontSize: "40px" });
        scene.physics.add.existing(scene.player);
        scene.player.body.setSize(34, 42).setOffset(4, 4);
        scene.player.body.setMaxVelocity(400, 900);

        scene.physics.add.collider(scene.player, platforms);
        scene.physics.add.collider(scene.player, scene.gates, function (player, gate) {
          scene.hitGate(gate);
        });
        scene.physics.add.overlap(scene.player, scene.coinsGroup, function (player, c) {
          c.destroy();
          scene.score += 2;
          Sound.coin();
          scene.updateHud();
        });
        scene.physics.add.overlap(scene.player, scene.snail, function () {
          if (scene.time.now < scene.bumpCooldown) return;
          scene.bumpCooldown = scene.time.now + 1000;
          scene.player.body.setVelocity(-260, -280);
          Sound.bump();
        });
        scene.physics.add.overlap(scene.player, scene.flag, function () {
          scene.levelComplete();
        });

        scene.cameras.main.startFollow(scene.player, true, 0.12, 0.12);
        scene.cursors = scene.input.keyboard.createCursorKeys();

        /* --- HUD --- */
        scene.hudLevel = scene.add.text(12, 10, "Ch " + (levelIndex + 1) + ": " + level.name,
          { fontSize: "20px", fontStyle: "bold", color: "#1e293b", backgroundColor: "#ffffffcc", padding: { x: 8, y: 4 } }).setScrollFactor(0);
        scene.hudScore = scene.add.text(12, 44, "",
          { fontSize: "20px", fontStyle: "bold", color: "#1e293b", backgroundColor: "#ffffffcc", padding: { x: 8, y: 4 } }).setScrollFactor(0);
        scene.updateHud();
      },

      /* Custom scene methods must live in `extend` — Phaser only reads
         the standard lifecycle keys (create/update/…) off a config object. */
      extend: {

      updateHud: function () {
        this.hudScore.setText("⭐ " + this.score + "   ❓ " + this.gatesOpened + "/" + GATES_N);
      },

      hitGate: function (gate) {
        const scene = this;
        if (gate.getData("open") || scene.asking || scene.finished) return;
        scene.asking = true;
        scene.player.body.setVelocity(0, 0);
        scene.physics.pause();

        const idx = gate.getData("idx");
        QuestionPopup.show(scene.questions[idx], { index: idx + 1, total: GATES_N })
          .then(function (res) {
            scene.results[idx] = !!res.firstTry;
            scene.score += 10;
            scene.gatesOpened++;
            gate.setData("open", true);
            gate.body.enable = false;
            scene.checkpointX = gate.x + 60;
            const label = gate.getData("label");
            if (label) label.setText("✅");
            scene.tweens.add({ targets: gate, alpha: 0.25, y: gate.y - 120, duration: 500 });
            scene.updateHud();
            scene.physics.resume();
            scene.asking = false;
          });
      },

      levelComplete: function () {
        const scene = this;
        if (scene.finished || scene.asking) return;
        /* must open all gates before finishing (gates physically block the path anyway) */
        scene.finished = true;
        scene.physics.pause();
        Sound.fanfare();
        FX.confetti(30);

        const firstTry = scene.results.filter(Boolean).length;
        const passed = firstTry >= PASS_N;
        const stars = firstTry === GATES_N ? 3 : (firstTry >= GATES_N - 1 ? 2 : 1);

        /* save under this profile */
        const p = prog();
        if (!p.levels) p.levels = {};
        const lv = p.levels[level.id] || { stars: 0, best: 0, firstTry: 0, passed: false, plays: 0 };
        lv.plays++;
        lv.stars = Math.max(lv.stars, stars);
        lv.best = Math.max(lv.best, scene.score);
        lv.firstTry = Math.max(lv.firstTry, firstTry);
        lv.passed = lv.passed || passed;
        p.levels[level.id] = lv;

        const allPassed = MATHS_JUNGLE_LEVELS.every(function (l) {
          return p.levels[l.id] && p.levels[l.id].passed;
        });
        const newChampion = allPassed && !p.champion;
        if (newChampion) p.champion = true;
        ProfileStore.saveProgress();

        function showReport() {
          FamilyReport.show({
            gameTitle: TITLE,
            chapterLabel: "Chapter " + (levelIndex + 1) + " — " + level.name,
            current: {
              profileId: profile.id,
              stars: stars,
              headline: [
                { label: "Score", value: scene.score },
                { label: "First-try answers", value: firstTry + " / " + GATES_N },
                { label: passed ? "PASSED!" : "Keep trying!", value: passed ? "✅" : "💪" }
              ]
            },
            columns: [{ key: "stars", label: "Stars" }, { key: "score", label: "Best score" }],
            rows: ProfileStore.all().map(function (pl) {
              const d = levelData(ProfileStore.peekProgress(pl.id, GAME_ID), level.id);
              return {
                profileId: pl.id, name: pl.name, avatar: pl.avatar,
                played: !!d,
                values: d ? { stars: Stars.str(d.stars), score: d.best } : {},
                sort: d ? d.stars * 10000 + d.best : 0
              };
            }),
            onReplay: function () { startLevel(levelIndex); },
            onNext: (passed && levelIndex < MATHS_JUNGLE_LEVELS.length - 1)
              ? function () { startLevel(levelIndex + 1); }
              : null,
            onMenu: function () { showLevelSelect(); }
          });
        }

        setTimeout(function () {
          if (newChampion) showCertificate(showReport);
          else showReport();
        }, 700);
      }

      }, /* end extend */

      update: function () {
        const scene = this;
        if (scene.asking || scene.finished || !scene.player || !scene.player.body) return;

        /* snail patrol */
        if (scene.snail && scene.snail.body) {
          if (scene.snail.x < scene.snailMin) scene.snail.body.setVelocityX(35);
          if (scene.snail.x > scene.snailMax) scene.snail.body.setVelocityX(-35);
        }

        const t = TouchControls.state;
        const left = scene.cursors.left.isDown || t.left;
        const right = scene.cursors.right.isDown || t.right;
        const jump = scene.cursors.up.isDown || scene.cursors.space.isDown || t.jump;
        const onFloor = scene.player.body.blocked.down || scene.player.body.touching.down;

        if (left) scene.player.body.setVelocityX(-230);
        else if (right) scene.player.body.setVelocityX(230);
        else scene.player.body.setVelocityX(0);

        if (jump && onFloor) {
          scene.player.body.setVelocityY(-640);
          Sound.jump();
        }

        /* fell into a pit → respawn at checkpoint, no lives lost */
        if (scene.player.y > VIEW_H + 120) {
          scene.player.setPosition(scene.checkpointX, 300);
          scene.player.body.setVelocity(0, 0);
          Sound.bump();
        }
      }
    };
  }

  /* ---------------- champion certificate ---------------- */
  function showCertificate(onContinue) {
    const root = document.getElementById("overlay-root");
    const backdrop = document.createElement("div");
    backdrop.className = "q-backdrop";
    const box = document.createElement("div");
    box.className = "cert-box";
    box.innerHTML =
      '<div class="cert-trophy">🏆</div>' +
      "<h2>Maths Kingdom Champion!</h2>" +
      '<div class="cert-text">This certificate is proudly awarded to</div>' +
      '<div class="cert-name">' + profile.avatar + " " + profile.name + "</div>" +
      '<div class="cert-text">for completing ALL 8 chapters of Maths Jungle! 🎉</div>';
    const btn = document.createElement("button");
    btn.className = "btn green";
    btn.style.marginTop = "18px";
    btn.textContent = "Continue 🎉";
    btn.onclick = function () { Sound.fanfare(); backdrop.remove(); onContinue(); };
    box.appendChild(btn);
    backdrop.appendChild(box);
    root.appendChild(backdrop);
    FX.confetti(40);
  }

  /* ---------------- registration ---------------- */
  gameRegistry.register({
    id: GAME_ID,
    title: TITLE,
    grade: "Year 1",
    subject: "maths",
    icon: "🐒",
    launch: function (opts) {
      container = document.getElementById(opts.containerId);
      profile = opts.profile;
      onExit = opts.onExit;
      showLevelSelect();
      return {
        destroy: function () {
          destroyPhaser();
          removeLevelSelect();
        }
      };
    }
  });
})();
