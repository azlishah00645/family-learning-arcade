/* ============================================================
   MinigameEngine — shared zone-map + mini-game framework.

   Built for Science Island (Phase 2). Science Lab (Phase 4)
   REUSES this engine: same map + plug-ins, different zones,
   theme and content. Do not fork it — extend it.

   A game supplies ZONES. Each zone = 1..n STAGES. Each stage
   runs a registered MINI-GAME TYPE (plug-in).

   MinigameEngine.launch({
     gameId, title, icon,
     theme: { sea, sand, grass, deco: ["🌴", ...] },   // map colours (hex ints)
     zones: [{ id, name, emoji, x, y,
               stages: [{ type: "dragTargets", config: {...} }] }],
     certificate: { heading, line },
     containerId, profile, onExit          // passed in by the hub
   }) → { destroy }

   Built-in plug-in types (register more with registerType):
     dragTargets    drag chips onto labelled targets
                    (flat row, or positioned on a scene)
     tapChoice      rounds of big-button questions
     binSort        sort items one-by-one into baskets (tap or drag)
     magnetLab      free magnet experiment, then recall quiz
     predictReveal  predict → watch the result → score prediction
     tapFind        tap the named thing in a scene

   SCORING: plug-ins call api.right() / api.wrong() once per
   scorable attempt. accuracy = right / (right + wrong).
   Pass ≥ 80%. Stars: 100% = 3⭐, ≥90% = 2⭐, ≥80% = 1⭐.
   Progress saved as prog.levels[zoneId] = {stars,best,passed,plays}
   (same shape as other games, so the hub star board just works).
   After EVERY zone the shared FamilyReport is shown.
   ============================================================ */
window.MinigameEngine = (function () {

  const types = {};
  function registerType(name, run) { types[name] = run; }

  /* ---------------- tiny DOM helpers ---------------- */
  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Drag helper — works with mouse AND touch (pointer events).
     onDrop(dropEl|null) gets the element matching dropSelector
     under the release point (null = dropped nowhere useful). */
  function makeDraggable(chip, dropSelector, onDrop) {
    chip.classList.add("mg-draggable");
    chip.addEventListener("pointerdown", function (e) {
      if (chip.classList.contains("mg-locked")) return;
      e.preventDefault();
      try { chip.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
      const w = chip.offsetWidth, h = chip.offsetHeight;
      chip.classList.add("dragging");
      function place(ev) {
        chip.style.left = (ev.clientX - w / 2) + "px";
        chip.style.top = (ev.clientY - h / 2) + "px";
      }
      place(e);
      function onMove(ev) { place(ev); }
      function onUp(ev) {
        chip.removeEventListener("pointermove", onMove);
        chip.removeEventListener("pointerup", onUp);
        chip.removeEventListener("pointercancel", onUp);
        try { chip.releasePointerCapture(e.pointerId); } catch (err) { /* ok */ }
        chip.classList.remove("dragging");
        let hit = null;
        const stack = document.elementsFromPoint(ev.clientX, ev.clientY);
        for (let i = 0; i < stack.length; i++) {
          if (stack[i] === chip || chip.contains(stack[i])) continue;
          const m = stack[i].closest ? stack[i].closest(dropSelector) : null;
          if (m) { hit = m; break; }
        }
        onDrop(hit);
      }
      chip.addEventListener("pointermove", onMove);
      chip.addEventListener("pointerup", onUp);
      chip.addEventListener("pointercancel", onUp);
    });
  }
  function resetChip(chip) {
    chip.style.left = ""; chip.style.top = "";
  }
  function feedback(host, text, good) {
    const fb = host.querySelector(".mg-feedback");
    if (!fb) return;
    fb.textContent = text;
    fb.className = "mg-feedback " + (good ? "good" : "retry");
    if (!good) {
      fb.classList.remove("pop"); void fb.offsetWidth; fb.classList.add("pop");
    }
  }

  /* ============================================================
     PLUG-IN: dragTargets
     config: { prompt, targets:[{id,label,emoji,x?,y?}],
               items:[{label,emoji,target}],
               positioned?: true, sceneEmoji?: "🪴" }
     ============================================================ */
  registerType("dragTargets", function (host, cfg, api) {
    return new Promise(function (resolve) {
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">' + cfg.prompt + "</div>"));

      let wrap;
      if (cfg.positioned) {
        wrap = el('<div class="mg-scene"></div>');
        if (cfg.sceneEmoji) wrap.appendChild(el('<div class="mg-scene-bg">' + cfg.sceneEmoji + "</div>"));
      } else {
        wrap = el('<div class="mg-targets"></div>');
      }
      cfg.targets.forEach(function (t) {
        const tEl = el('<div class="mg-target" data-id="' + esc(t.id) + '">' +
          (t.emoji ? '<div class="t-emoji">' + t.emoji + "</div>" : "") +
          '<div class="t-label">' + esc(t.label) + "</div>" +
          '<div class="t-slot"></div></div>');
        if (cfg.positioned) {
          tEl.classList.add("pos");
          tEl.style.left = t.x + "%";
          tEl.style.top = t.y + "%";
        }
        wrap.appendChild(tEl);
      });
      host.appendChild(wrap);

      const tray = el('<div class="mg-tray"></div>');
      host.appendChild(tray);
      host.appendChild(el('<div class="mg-feedback"></div>'));

      let remaining = cfg.items.length;
      shuffle(cfg.items).forEach(function (it) {
        const chip = el('<div class="mg-chip">' + (it.emoji ? it.emoji + " " : "") + esc(it.label) + "</div>");
        tray.appendChild(chip);
        makeDraggable(chip, ".mg-target", function (drop) {
          if (!drop) { resetChip(chip); return; }
          if (drop.getAttribute("data-id") === it.target) {
            api.right();
            chip.classList.add("mg-locked", "placed");
            resetChip(chip);
            drop.querySelector(".t-slot").appendChild(chip);
            drop.classList.add("got");
            FX.praise();
            feedback(host, "", true);
            remaining--;
            if (remaining === 0) setTimeout(resolve, 700);
          } else {
            api.wrong();
            resetChip(chip);
            drop.classList.add("shake-mini");
            setTimeout(function () { drop.classList.remove("shake-mini"); }, 450);
            feedback(host, "Try again! 💪 Where does it really go?", false);
          }
        });
      });
    });
  });

  /* ============================================================
     PLUG-IN: tapChoice
     config: { prompt?, rounds:[{prompt,big?,choices:[..],answer}],
               shuffleRounds?: true }
     Rounds play IN ORDER (author content easy → hard!);
     set shuffleRounds: true for random order. Wrong answers
     retry gently (round only advances on correct).
     ============================================================ */
  registerType("tapChoice", function (host, cfg, api) {
    return new Promise(function (resolve) {
      const rounds = cfg.shuffleRounds === true ? shuffle(cfg.rounds) : cfg.rounds.slice();
      let i = 0;

      function round() {
        if (i >= rounds.length) return resolve();
        const r = rounds[i];
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">' +
          (cfg.prompt ? cfg.prompt + "<br>" : "") + r.prompt + "</div>"));
        if (r.big) host.appendChild(el('<div class="mg-big">' + r.big + "</div>"));
        const row = el('<div class="mg-choices"></div>');
        let done = false;
        shuffle(r.choices).forEach(function (c) {
          const b = el('<button class="mg-choice">' + c + "</button>");
          b.onclick = function () {
            if (done) return;
            if (c === r.answer) {
              done = true;
              api.right();
              b.classList.add("good");
              FX.praise();
              feedback(host, "Correct! 🎉", true);
              setTimeout(function () { i++; round(); }, 750);
            } else {
              api.wrong();
              b.classList.add("bad");
              feedback(host, "Try again! 💪 You can do it!", false);
            }
          };
          row.appendChild(b);
        });
        host.appendChild(row);
        host.appendChild(el('<div class="mg-feedback"></div>'));
        host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + rounds.length + "</div>"));
      }
      round();
    });
  });

  /* ============================================================
     PLUG-IN: binSort
     config: { prompt, bins:[{id,label,emoji}],
               items:[{label,emoji,bin}] }
     One item at a time; TAP a basket or DRAG the item into it.
     Items play IN ORDER — author content easy → hard!
     ============================================================ */
  registerType("binSort", function (host, cfg, api) {
    return new Promise(function (resolve) {
      const items = cfg.items.slice();
      let i = 0;

      function round() {
        if (i >= items.length) return resolve();
        const it = items[i];
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">' + cfg.prompt + "</div>"));
        const itemEl = el('<div class="mg-conveyor"><div class="mg-chip mg-sort-item">' +
          (it.emoji ? it.emoji + " " : "") + esc(it.label) + "</div></div>");
        host.appendChild(itemEl);
        const binRow = el('<div class="mg-bins"></div>');
        let done = false;
        function judge(binId, binEl) {
          if (done) return;
          if (binId === it.bin) {
            done = true;
            api.right();
            binEl.classList.add("good");
            FX.praise();
            feedback(host, "Yes! 🎉", true);
            setTimeout(function () { i++; round(); }, 700);
          } else {
            api.wrong();
            binEl.classList.add("shake-mini");
            setTimeout(function () { binEl.classList.remove("shake-mini"); }, 450);
            feedback(host, "Hmm, try the other basket! 💪", false);
          }
        }
        cfg.bins.forEach(function (b) {
          const bEl = el('<div class="mg-bin" data-id="' + esc(b.id) + '"><div class="t-emoji">' +
            (b.emoji || "🧺") + '</div><div class="t-label">' + esc(b.label) + "</div></div>");
          bEl.onclick = function () { judge(b.id, bEl); };
          binRow.appendChild(bEl);
        });
        host.appendChild(binRow);
        host.appendChild(el('<div class="mg-feedback"></div>'));
        host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + items.length + "</div>"));

        const chip = itemEl.querySelector(".mg-sort-item");
        makeDraggable(chip, ".mg-bin", function (drop) {
          resetChip(chip);
          if (!drop) return;
          judge(drop.getAttribute("data-id"), drop);
        });
      }
      round();
    });
  });

  /* ============================================================
     PLUG-IN: magnetLab
     config: { items:[{label,emoji,magnetic}] }
     Phase A (not scored): drag the magnet onto every item and
     watch what happens. Phase B (scored): recall quiz.
     ============================================================ */
  registerType("magnetLab", function (host, cfg, api) {
    return new Promise(function (resolve) {
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">🧲 Drag the magnet onto every object. What sticks?</div>'));
      const grid = el('<div class="mg-lab-grid"></div>');
      cfg.items.forEach(function (it, idx) {
        grid.appendChild(el('<div class="mg-lab-item" data-i="' + idx + '"><div class="t-emoji">' +
          it.emoji + '</div><div class="t-label">' + esc(it.label) + '</div><div class="mg-lab-badge"></div></div>'));
      });
      host.appendChild(grid);
      const dock = el('<div class="mg-magnet-dock"><div class="mg-chip mg-magnet">🧲</div></div>');
      host.appendChild(dock);
      host.appendChild(el('<div class="mg-feedback"></div>'));

      let tested = 0;
      const magnet = dock.querySelector(".mg-magnet");
      makeDraggable(magnet, ".mg-lab-item", function (drop) {
        resetChip(magnet);
        if (!drop || drop.classList.contains("tested")) return;
        const it = cfg.items[parseInt(drop.getAttribute("data-i"), 10)];
        drop.classList.add("tested", it.magnetic ? "stuck" : "nopull");
        drop.querySelector(".mg-lab-badge").textContent = it.magnetic ? "🧲 It sticks!" : "🙅 No pull";
        if (it.magnetic) { Sound.coin(); FX.praise("It sticks! 🧲"); } else { Sound.bump(); }
        tested++;
        if (tested === cfg.items.length) {
          feedback(host, "All tested, great scientist! 🥼", true);
          const btn = el('<button class="btn green mg-next-btn">Quiz time! ▶</button>');
          btn.onclick = function () {
            Sound.click();
            types.tapChoice(host, {
              rounds: cfg.items.map(function (it2) {
                return {
                  prompt: "Did the magnet pull the <b>" + esc(it2.label) + "</b>?",
                  big: it2.emoji,
                  choices: ["Yes! It sticks 🧲", "No pull 🙅"],
                  answer: it2.magnetic ? "Yes! It sticks 🧲" : "No pull 🙅"
                };
              })
            }, api).then(resolve);
          };
          host.appendChild(btn);
        }
      });
    });
  });

  /* ============================================================
     PLUG-IN: predictReveal
     config: { question, yesLabel, noLabel, yesResult, noResult,
               items:[{label,emoji,result}], effect: "water" }
     Child PREDICTS, watches the animation, prediction is scored.
     Items play IN ORDER — author content easy → hard!
     ============================================================ */
  registerType("predictReveal", function (host, cfg, api) {
    return new Promise(function (resolve) {
      const items = cfg.items.slice();
      let i = 0;

      function round() {
        if (i >= items.length) return resolve();
        const it = items[i];
        host.innerHTML = "";
        host.appendChild(el('<div class="mg-prompt">' + cfg.question.replace("{item}", "<b>" + esc(it.label) + "</b>") + "</div>"));
        const stageEl = el('<div class="mg-predict-stage"><div class="mg-big">' + it.emoji + "</div></div>");
        host.appendChild(stageEl);
        const row = el('<div class="mg-choices"></div>');
        let done = false;
        [{ label: cfg.yesLabel, val: true }, { label: cfg.noLabel, val: false }].forEach(function (opt) {
          const b = el('<button class="mg-choice">' + opt.label + "</button>");
          b.onclick = function () {
            if (done) return;
            done = true;
            Sound.click();
            row.querySelectorAll(".mg-choice").forEach(function (x) { x.disabled = true; });
            const drop = el('<div class="mg-drop">💧</div>');
            stageEl.appendChild(drop);
            setTimeout(function () {
              drop.remove();
              const bigEl = stageEl.querySelector(".mg-big");
              bigEl.classList.add(it.result ? "soaked" : "dry");
              const correct = opt.val === it.result;
              if (correct) api.right(); else api.wrong();
              feedback(host,
                (it.result ? cfg.yesResult : cfg.noResult) +
                (correct ? "  You predicted RIGHT! 🎉" : "  Good try — now you know! 💡"),
                correct);
              if (correct) FX.praise();
              setTimeout(function () { i++; round(); }, 1500);
            }, 900);
          };
          row.appendChild(b);
        });
        host.appendChild(row);
        host.appendChild(el('<div class="mg-feedback"></div>'));
        host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + items.length + "</div>"));
      }
      round();
    });
  });

  /* ============================================================
     PLUG-IN: tapFind
     config: { intro?, scene:[{id,emoji,label,x,y}],
               finds:[{id,prompt}] }
     ============================================================ */
  registerType("tapFind", function (host, cfg, api) {
    return new Promise(function (resolve) {
      host.innerHTML = "";
      const promptEl = el('<div class="mg-prompt"></div>');
      host.appendChild(promptEl);
      const scene = el('<div class="mg-scene mg-find-scene"></div>');
      cfg.scene.forEach(function (s) {
        const sEl = el('<div class="mg-find" data-id="' + esc(s.id) + '"><div class="t-emoji">' +
          s.emoji + '</div><div class="t-label">' + esc(s.label) + "</div></div>");
        sEl.style.left = s.x + "%";
        sEl.style.top = s.y + "%";
        scene.appendChild(sEl);
      });
      host.appendChild(scene);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      const progEl = el('<div class="mg-progress"></div>');
      host.appendChild(progEl);

      let i = 0;
      function setFind() {
        if (i >= cfg.finds.length) return resolve();
        promptEl.innerHTML = cfg.finds[i].prompt;
        progEl.textContent = (i + 1) + " / " + cfg.finds.length;
      }
      scene.querySelectorAll(".mg-find").forEach(function (sEl) {
        sEl.onclick = function () {
          if (i >= cfg.finds.length || sEl.classList.contains("found")) return;
          if (sEl.getAttribute("data-id") === cfg.finds[i].id) {
            api.right();
            sEl.classList.add("found");
            FX.praise();
            feedback(host, "You found it! 🎉", true);
            i++;
            setTimeout(setFind, 600);
          } else {
            api.wrong();
            sEl.classList.add("shake-mini");
            setTimeout(function () { sEl.classList.remove("shake-mini"); }, 450);
            feedback(host, "Not that one — try again! 💪", false);
          }
        };
      });
      setFind();
    });
  });

  /* ============================================================
     ENGINE — island map + zone runner
     ============================================================ */
  function launch(opts) {
    const profile = opts.profile;
    const GAME_ID = opts.gameId;
    const zones = opts.zones;
    const theme = opts.theme || {};
    let phaserGame = null;
    let mapScene = null;
    let overlayEl = null;
    let homeBtn = null;
    let refreshMarkers = null;

    function prog() { return ProfileStore.getProgress(profile.id, GAME_ID); }
    function zoneData(p, id) { return (p && p.levels && p.levels[id]) || null; }
    function isUnlocked(i) {
      if (i === 0) return true;
      if (ProfileStore.settings().parentUnlock) return true;
      const prev = zoneData(prog(), zones[i - 1].id);
      return !!(prev && prev.passed);
    }
    function markerStatus(i) {
      const d = zoneData(prog(), zones[i].id);
      if (!isUnlocked(i)) return "🔒";
      return d ? Stars.str(d.stars) : "☆☆☆";
    }

    /* ---------------- island map (Phaser) ---------------- */
    function showMap() {
      destroyPhaser();
      phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: opts.containerId,
        width: 960, height: 540,
        backgroundColor: theme.sea || 0x0e7490,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        physics: { default: "arcade", arcade: { debug: false } },
        scene: [{
          key: "map",
          create: function () {
            const scene = this;
            mapScene = scene;
            const W = 960, H = 540;

            /* island */
            const g = scene.add.graphics();
            g.fillStyle(theme.sand || 0xfcd34d);
            g.fillEllipse(W / 2, H / 2, W - 70, H - 50);
            g.fillStyle(theme.grass || 0x4ade80);
            g.fillEllipse(W / 2, H / 2, W - 190, H - 150);
            (theme.deco || ["🌴", "🌺"]).forEach(function (d, di) {
              for (let k = 0; k < 3; k++) {
                const dx = 130 + ((di * 3 + k) * 167) % 710;
                const dy = 90 + ((di * 5 + k * 3) * 97) % 370;
                scene.add.text(dx, dy, d, { fontSize: "26px" }).setAlpha(0.5);
              }
            });
            scene.add.text(W / 2, 26, opts.icon + " " + opts.title + " — walk to a zone!", {
              fontSize: "22px", fontStyle: "bold", color: "#ffffff",
              backgroundColor: "#00000055", padding: { x: 12, y: 5 }
            }).setOrigin(0.5, 0);

            /* zone markers */
            scene.zoneMarkers = zones.map(function (z, i) {
              const badge = scene.add.text(z.x, z.y, z.emoji, { fontSize: "42px" }).setOrigin(0.5);
              const name = scene.add.text(z.x, z.y + 30, (i + 1) + ". " + z.name, {
                fontSize: "13px", fontStyle: "bold", color: "#1e293b",
                backgroundColor: "#ffffffcc", padding: { x: 5, y: 2 }
              }).setOrigin(0.5, 0);
              const status = scene.add.text(z.x, z.y + 50, "", {
                fontSize: "13px", color: "#1e293b",
                backgroundColor: "#ffffffcc", padding: { x: 5, y: 2 }
              }).setOrigin(0.5, 0);
              return { badge: badge, status: status, name: name };
            });
            refreshMarkers = function () {
              zones.forEach(function (z, i) {
                scene.zoneMarkers[i].status.setText(markerStatus(i));
                scene.zoneMarkers[i].badge.setAlpha(isUnlocked(i) ? 1 : 0.45);
              });
            };
            refreshMarkers();

            /* player */
            scene.player = scene.add.text(90, 460, "🧭", { fontSize: "38px" }).setOrigin(0.5);
            scene.physics.add.existing(scene.player);
            scene.player.body.setCollideWorldBounds(true);
            scene.cursors = scene.input.keyboard.createCursorKeys();
            scene.moveTarget = null;
            scene.armed = true;
            scene.lockToast = 0;
            scene.input.on("pointerdown", function (p) {
              scene.moveTarget = { x: p.worldX, y: p.worldY };
            });
          },

          update: function () {
            const scene = this;
            if (!scene.player || !scene.player.body) return;
            const body = scene.player.body;
            const SPEED = 240;

            let vx = 0, vy = 0;
            if (scene.cursors.left.isDown) vx = -SPEED;
            else if (scene.cursors.right.isDown) vx = SPEED;
            if (scene.cursors.up.isDown) vy = -SPEED;
            else if (scene.cursors.down.isDown) vy = SPEED;

            if (vx || vy) {
              scene.moveTarget = null;
              body.setVelocity(vx, vy);
            } else if (scene.moveTarget) {
              const dx = scene.moveTarget.x - scene.player.x;
              const dy = scene.moveTarget.y - scene.player.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 8) { scene.moveTarget = null; body.setVelocity(0, 0); }
              else body.setVelocity(dx / dist * SPEED, dy / dist * SPEED);
            } else {
              body.setVelocity(0, 0);
            }

            /* zone proximity */
            let nearAny = false;
            for (let i = 0; i < zones.length; i++) {
              const dzx = zones[i].x - scene.player.x;
              const dzy = zones[i].y - scene.player.y;
              if (Math.sqrt(dzx * dzx + dzy * dzy) < 48) {
                nearAny = true;
                if (!scene.armed) break;
                if (isUnlocked(i)) {
                  scene.armed = false;
                  scene.moveTarget = null;
                  body.setVelocity(0, 0);
                  Sound.coin();
                  scene.scene.pause();
                  startZone(i);
                } else if (scene.time.now > scene.lockToast) {
                  scene.lockToast = scene.time.now + 1500;
                  FX.praise("Finish zone " + i + " first! 🔒");
                  Sound.bump();
                }
                break;
              }
            }
            if (!nearAny) scene.armed = true;
          }
        }]
      });

      addHomeButton();
    }

    function addHomeButton() {
      removeHomeButton();
      homeBtn = document.createElement("button");
      homeBtn.className = "btn small grey";
      homeBtn.textContent = "◀ Subjects";
      homeBtn.style.cssText = "position:fixed;top:10px;left:10px;z-index:160;";
      homeBtn.onclick = function () { Sound.click(); opts.onExit(); };
      document.getElementById("game-root").appendChild(homeBtn);
    }
    function removeHomeButton() {
      if (homeBtn) { homeBtn.remove(); homeBtn = null; }
    }
    function destroyPhaser() {
      if (phaserGame) {
        try { phaserGame.destroy(true); } catch (e) { /* gone */ }
        phaserGame = null;
        mapScene = null;
      }
      const c = document.getElementById(opts.containerId);
      if (c) c.innerHTML = "";
    }
    function removeOverlay() {
      if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    }
    function backToMap() {
      removeOverlay();
      if (refreshMarkers) refreshMarkers();
      if (mapScene) {
        mapScene.armed = false;
        mapScene.moveTarget = null;
        try { mapScene.scene.resume(); } catch (e) { /* ok */ }
      }
    }

    /* ---------------- zone runner (DOM overlay) ---------------- */
    function startZone(i) {
      removeOverlay();
      const zone = zones[i];
      overlayEl = document.createElement("div");
      overlayEl.className = "mg-overlay";
      overlayEl.innerHTML =
        '<div class="mg-header">' +
        '<button class="btn small grey" id="mg-quit">✖</button>' +
        '<span class="mg-title">' + zone.emoji + " Zone " + (i + 1) + ": " + esc(zone.name) + "</span>" +
        '<span class="mg-score" id="mg-score">✔ 0</span>' +
        "</div>" +
        '<div class="mg-stage" id="mg-stage"></div>';
      document.getElementById("game-root").appendChild(overlayEl);

      const session = { right: 0, wrong: 0 };
      const scoreEl = overlayEl.querySelector("#mg-score");
      const api = {
        right: function () { session.right++; Sound.correct(); scoreEl.textContent = "✔ " + session.right; },
        wrong: function () { session.wrong++; Sound.wrong(); }
      };
      overlayEl.querySelector("#mg-quit").onclick = function () {
        Sound.click();
        backToMap();
      };

      const stageHost = overlayEl.querySelector("#mg-stage");
      let chain = Promise.resolve();
      zone.stages.forEach(function (st) {
        chain = chain.then(function () {
          if (!overlayEl) return Promise.reject("quit");
          return types[st.type](stageHost, st.config, api);
        });
      });
      chain.then(function () {
        if (!overlayEl) return;
        finishZone(i, session);
      }).catch(function () { /* quit mid-zone — nothing to save */ });
    }

    function finishZone(i, session) {
      const zone = zones[i];
      const total = session.right + session.wrong;
      const acc = total ? Math.round(session.right / total * 100) : 0;
      const passed = acc >= 80;
      const stars = acc === 100 ? 3 : (acc >= 90 ? 2 : (passed ? 1 : 0));

      const p = prog();
      if (!p.levels) p.levels = {};
      const d = p.levels[zone.id] || { stars: 0, best: 0, firstTry: 0, passed: false, plays: 0 };
      d.plays++;
      d.stars = Math.max(d.stars, stars);
      d.best = Math.max(d.best, acc);
      d.passed = d.passed || passed;
      p.levels[zone.id] = d;
      const allPassed = zones.every(function (z) { return p.levels[z.id] && p.levels[z.id].passed; });
      const newChampion = allPassed && !p.champion;
      if (newChampion) p.champion = true;
      ProfileStore.saveProgress();

      removeOverlay();
      Sound.fanfare();
      FX.confetti(passed ? 28 : 12);

      function showReport() {
        FamilyReport.show({
          gameTitle: opts.title,
          chapterLabel: "Zone " + (i + 1) + " — " + zone.name,
          current: {
            profileId: profile.id,
            stars: stars,
            headline: [
              { label: "Accuracy", value: acc + "%" },
              { label: passed ? "PASSED!" : "Keep trying!", value: passed ? "✅" : "💪" }
            ]
          },
          columns: [{ key: "stars", label: "Stars" }, { key: "best", label: "Best accuracy" }],
          rows: ProfileStore.all().map(function (pl) {
            const zd = zoneData(ProfileStore.peekProgress(pl.id, GAME_ID), zone.id);
            return {
              profileId: pl.id, name: pl.name, avatar: pl.avatar,
              played: !!zd,
              values: zd ? { stars: Stars.str(zd.stars), best: zd.best + "%" } : {},
              sort: zd ? zd.stars * 1000 + zd.best : 0
            };
          }),
          onReplay: function () { startZone(i); },
          onNext: (passed && i < zones.length - 1) ? function () { startZone(i + 1); } : null,
          onMenu: function () { backToMap(); }
        });
      }

      setTimeout(function () {
        if (newChampion && opts.certificate) showCertificate(showReport);
        else showReport();
      }, 600);
    }

    function showCertificate(onContinue) {
      const root = document.getElementById("overlay-root");
      const backdrop = document.createElement("div");
      backdrop.className = "q-backdrop";
      const box = document.createElement("div");
      box.className = "cert-box";
      box.innerHTML =
        '<div class="cert-trophy">🏆</div>' +
        "<h2>" + esc(opts.certificate.heading) + "</h2>" +
        '<div class="cert-text">This certificate is proudly awarded to</div>' +
        '<div class="cert-name">' + profile.avatar + " " + esc(profile.name) + "</div>" +
        '<div class="cert-text">' + esc(opts.certificate.line) + "</div>";
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

    /* ---------------- boot ---------------- */
    showMap();

    return {
      destroy: function () {
        removeOverlay();
        removeHomeButton();
        destroyPhaser();
      },
      /* exposed for tests / future games */
      _startZone: startZone,
      _getMapScene: function () { return mapScene; }
    };
  }

  return { launch: launch, registerType: registerType, types: types };
})();
