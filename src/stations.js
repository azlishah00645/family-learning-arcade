/* ============================================================
   STATIONS — interactive checkpoint mini-games (Science World).
   A station opens as a full-screen panel (like a question) and
   resolves { firstTry } — true when the child completed it with
   at least 80% right actions. Gentle retries, never blocks.

   Types: dragTargets · buildSlots · binSort · tapWrong ·
          magnet · predict · tapFind
   All drag interactions use pointer events (big hit areas,
   generous drops) so they work on small touchscreens.
   ============================================================ */

const PASS_ACC = 0.8;

/* ---------- helpers ---------- */
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
function feedback(host, text, good) {
  const fb = host.querySelector(".mg-feedback");
  if (!fb) return;
  fb.textContent = text;
  fb.className = "mg-feedback " + (good ? "good" : "retry");
}
function makeDraggable(chip, dropSelector, onDrop) {
  chip.classList.add("mg-draggable");
  chip.addEventListener("pointerdown", function (e) {
    if (chip.classList.contains("mg-locked")) return;
    e.preventDefault();
    try { chip.setPointerCapture(e.pointerId); } catch (err) { /* gone */ }
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
function resetChip(chip) { chip.style.left = ""; chip.style.top = ""; }

/* ---------- plug-ins (host, cfg, api) → Promise ---------- */
const types = {};

/* drag chips onto labelled targets (flat row) */
types.dragTargets = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const wrap = el('<div class="mg-targets"></div>');
    cfg.targets.forEach(function (t) {
      wrap.appendChild(el('<div class="mg-target" data-id="' + esc(t.id) + '">' +
        '<div class="t-label">' + esc(t.label) + '</div><div class="t-slot"></div></div>'));
    });
    host.appendChild(wrap);
    const tray = el('<div class="mg-tray"></div>');
    host.appendChild(tray);
    host.appendChild(el('<div class="mg-feedback"></div>'));

    let remaining = cfg.items.length;
    shuffle(cfg.items).forEach(function (it) {
      const chip = el('<div class="mg-chip">' + esc(it.label) + "</div>");
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
          if (remaining === 0) setTimeout(resolve, 650);
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
};

/* positioned drag (build the plant / tower) */
types.buildSlots = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const scene = el('<div class="mg-scene"></div>');
    cfg.slots.forEach(function (t) {
      const tEl = el('<div class="mg-target pos" data-id="' + esc(t.id) + '">' +
        '<div class="t-label">' + esc(t.label) + '</div><div class="t-slot"></div></div>');
      tEl.style.left = t.x + "%";
      tEl.style.top = t.y + "%";
      scene.appendChild(tEl);
    });
    host.appendChild(scene);
    const tray = el('<div class="mg-tray"></div>');
    host.appendChild(tray);
    host.appendChild(el('<div class="mg-feedback"></div>'));

    let remaining = cfg.items.length;
    shuffle(cfg.items).forEach(function (it) {
      const chip = el('<div class="mg-chip">' + esc(it.label) + "</div>");
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
          remaining--;
          if (remaining === 0) setTimeout(resolve, 650);
        } else {
          api.wrong();
          resetChip(chip);
          feedback(host, "Try again! 💪 Look at the plan!", false);
        }
      });
    });
  });
};

/* sort items one-by-one into two bins (tap or drag) */
types.binSort = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const items = shuffle(cfg.items);
    let i = 0;
    function round() {
      if (i >= items.length) return resolve();
      const it = items[i];
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-conveyor"><div class="mg-chip mg-sort-item">' + esc(it.label) + "</div></div>"));
      const binRow = el('<div class="mg-bins"></div>');
      let done = false;
      function judge(binId, binEl) {
        if (done) return;
        if (binId === it.bin) {
          done = true;
          api.right();
          binEl.classList.add("good");
          FX.praise();
          setTimeout(function () { i++; round(); }, 600);
        } else {
          api.wrong();
          binEl.classList.add("shake-mini");
          setTimeout(function () { binEl.classList.remove("shake-mini"); }, 450);
          feedback(host, "Hmm, try the other bin! 💪", false);
        }
      }
      cfg.bins.forEach(function (b) {
        const bEl = el('<div class="mg-bin" data-id="' + esc(b.id) + '"><div class="t-label">' + esc(b.label) + "</div></div>");
        bEl.onclick = function () { judge(b.id, bEl); };
        binRow.appendChild(bEl);
      });
      host.appendChild(binRow);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + items.length + "</div>"));
      const chip = host.querySelector(".mg-sort-item");
      makeDraggable(chip, ".mg-bin", function (drop) {
        resetChip(chip);
        if (!drop) return;
        judge(drop.getAttribute("data-id"), drop);
      });
    }
    round();
  });
};

/* tap ALL the wrong/unsafe behaviours in a busy scene */
types.tapWrong = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const items = shuffle(cfg.items);
    const grid = el('<div class="mg-lab-grid"></div>');
    let unsafeLeft = items.filter(function (x) { return !x.safe; }).length;
    items.forEach(function (it) {
      const card = el('<div class="mg-lab-item st-scene-card"><div class="t-label">' + esc(it.label) + '</div><div class="mg-lab-badge"></div></div>');
      card.onclick = function () {
        if (card.classList.contains("tested")) return;
        if (!it.safe) {
          api.right();
          card.classList.add("tested", "stuck");
          card.querySelector(".mg-lab-badge").textContent = "❌ NOT SAFE!";
          Sound.correct();
          FX.praise("Spotted it! 👀");
          unsafeLeft--;
          if (unsafeLeft === 0) { feedback(host, "You found them ALL! 🥼", true); setTimeout(resolve, 800); }
        } else {
          api.wrong();
          card.classList.add("shake-mini");
          setTimeout(function () { card.classList.remove("shake-mini"); }, 450);
          Sound.wrong();
          feedback(host, "That one is SAFE! Find the unsafe ones 💪", false);
        }
      };
      grid.appendChild(card);
    });
    host.appendChild(grid);
    host.appendChild(el('<div class="mg-feedback"></div>'));
  });
};

/* swing the magnet past objects (free play), then tap all that stuck */
types.magnet = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const items = shuffle(cfg.items);
    const grid = el('<div class="mg-lab-grid"></div>');
    items.forEach(function (it, idx) {
      grid.appendChild(el('<div class="mg-lab-item" data-i="' + idx + '"><div class="t-label">' + esc(it.label) + '</div><div class="mg-lab-badge"></div></div>'));
    });
    host.appendChild(grid);
    const dock = el('<div class="mg-magnet-dock"><div class="mg-chip mg-magnet">MAGNET 🧲</div></div>');
    host.appendChild(dock);
    host.appendChild(el('<div class="mg-feedback"></div>'));

    let tested = 0;
    const magnet = dock.querySelector(".mg-magnet");
    makeDraggable(magnet, ".mg-lab-item", function (drop) {
      resetChip(magnet);
      if (!drop || drop.classList.contains("tested")) return;
      const it = items[parseInt(drop.getAttribute("data-i"), 10)];
      drop.classList.add("tested", it.magnetic ? "stuck" : "nopull");
      drop.querySelector(".mg-lab-badge").textContent = it.magnetic ? "CLICK! It sticks!" : "No pull";
      if (it.magnetic) Sound.coin(); else Sound.bump();
      tested++;
      if (tested === items.length) {
        feedback(host, "Now — tap everything the magnet PULLED! 🧲", true);
        /* recall phase (this is the scored part) */
        let magLeft = items.filter(function (x) { return x.magnetic; }).length;
        grid.querySelectorAll(".mg-lab-item").forEach(function (card) {
          card.classList.remove("tested", "stuck", "nopull");
          card.querySelector(".mg-lab-badge").textContent = "";
          const it2 = items[parseInt(card.getAttribute("data-i"), 10)];
          card.onclick = function () {
            if (card.classList.contains("tested")) return;
            if (it2.magnetic) {
              api.right();
              card.classList.add("tested", "stuck");
              card.querySelector(".mg-lab-badge").textContent = "🧲 YES!";
              Sound.correct();
              magLeft--;
              if (magLeft === 0) { feedback(host, "Magnet master! 🌟", true); setTimeout(resolve, 800); }
            } else {
              api.wrong();
              card.classList.add("shake-mini");
              setTimeout(function () { card.classList.remove("shake-mini"); }, 450);
              Sound.wrong();
              feedback(host, "The magnet did NOT pull that one! 💪", false);
            }
          };
        });
        dock.remove();
      }
    });
  });
};

/* predict absorb / not, watch the water drip result */
types.predict = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const items = shuffle(cfg.items);
    let i = 0;
    function round() {
      if (i >= items.length) return resolve();
      const it = items[i];
      host.innerHTML = "";
      host.appendChild(el('<div class="mg-prompt">Water drips on the <b>' + esc(it.label) + "</b> — will it SOAK IN?</div>"));
      const stage = el('<div class="mg-predict-stage"><div class="mg-big st-material">' + esc(it.label) + "</div></div>");
      host.appendChild(stage);
      const row = el('<div class="mg-choices"></div>');
      let done = false;
      [{ label: "Soaks in! 💧", val: true }, { label: "Rolls off! 🙅", val: false }].forEach(function (opt) {
        const b = el('<button class="mg-choice">' + opt.label + "</button>");
        b.onclick = function () {
          if (done) return;
          done = true;
          Sound.click();
          row.querySelectorAll(".mg-choice").forEach(function (x) { x.disabled = true; });
          const drop = el('<div class="mg-drop">💧</div>');
          stage.appendChild(drop);
          setTimeout(function () {
            drop.remove();
            stage.querySelector(".mg-big").classList.add(it.absorbs ? "soaked" : "dry");
            const correct = opt.val === it.absorbs;
            if (correct) { api.right(); FX.praise(); } else api.wrong();
            feedback(host,
              (it.absorbs ? "It soaks it up!" : "It rolls right off!") +
              (correct ? "  You predicted RIGHT! 🎉" : "  Good try — now you know! 💡"), correct);
            setTimeout(function () { i++; round(); }, 1300);
          }, 800);
        };
        row.appendChild(b);
      });
      host.appendChild(row);
      host.appendChild(el('<div class="mg-feedback"></div>'));
      host.appendChild(el('<div class="mg-progress">' + (i + 1) + " / " + items.length + "</div>"));
    }
    round();
  });
};

/* tap the named feature in a scene */
types.tapFind = function (host, cfg, api) {
  return new Promise(function (resolve) {
    const promptEl = el('<div class="mg-prompt"></div>');
    host.appendChild(promptEl);
    const scene = el('<div class="mg-scene mg-find-scene"></div>');
    cfg.scene.forEach(function (s) {
      const sEl = el('<div class="mg-find" data-id="' + esc(s.id) + '"><div class="t-label">' + esc(s.label) + "</div></div>");
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
      promptEl.textContent = cfg.finds[i].prompt;
      progEl.textContent = (i + 1) + " / " + cfg.finds.length;
    }
    scene.querySelectorAll(".mg-find").forEach(function (sEl) {
      sEl.onclick = function () {
        if (i >= cfg.finds.length || sEl.classList.contains("found")) return;
        if (sEl.getAttribute("data-id") === cfg.finds[i].id) {
          api.right();
          sEl.classList.add("found");
          FX.praise();
          i++;
          setTimeout(setFind, 500);
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
};

/* ---------- runner ---------- */
export const Stations = {
  types: types,
  _drag: makeDraggable,   /* reused by grade-specific station packs */
  _reset: resetChip,
  /* run(type, cfg, meta) → Promise<{firstTry}> */
  run: function (type, cfg, meta) {
    return new Promise(function (resolve) {
      const backdrop = document.createElement("div");
      backdrop.className = "mg-overlay st-overlay";
      backdrop.innerHTML =
        '<div class="mg-header"><span></span>' +
        '<span class="mg-title">🔬 ' + esc(cfg.title || "Science Station") + "</span>" +
        '<span class="mg-score" id="st-score">✔ 0</span></div>' +
        '<div class="mg-stage" id="st-stage"></div>' +
        (meta && meta.total ? '<div class="mg-progress st-meta">Checkpoint ' + meta.index + " / " + meta.total + "</div>" : "");
      document.getElementById("overlay-root").appendChild(backdrop);

      const session = { right: 0, wrong: 0 };
      const api = {
        right: function () { session.right++; Sound.correct(); backdrop.querySelector("#st-score").textContent = "✔ " + session.right; },
        wrong: function () { session.wrong++; }
      };
      types[type](backdrop.querySelector("#st-stage"), cfg, api).then(function () {
        const total = session.right + session.wrong;
        const acc = total ? session.right / total : 0;
        const ok = acc >= PASS_ACC;
        FX.confetti(ok ? 18 : 8);
        setTimeout(function () {
          backdrop.remove();
          resolve({ firstTry: ok });
        }, 500);
      });
    });
  }
};

window.Stations = Stations; /* used by the shared obby checkpoint runner */
