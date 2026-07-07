/* ============================================================
   Stars + FX helpers shared by all games.
   ============================================================ */
window.Stars = {
  /* "⭐⭐⭐" / "⭐⭐☆" style string */
  str: function (n, max) {
    max = max || 3;
    let s = "";
    for (let i = 0; i < max; i++) s += i < n ? "⭐" : "☆";
    return s;
  },

  /* Total stars stored in one game's progress object.
     Convention: prog.levels = { id: { stars: n } }, plus optional
     prog.bonusStars for score-based games (e.g. runners). */
  totalForGame: function (prog) {
    if (!prog) return 0;
    let total = prog.bonusStars || 0;
    if (prog.levels) {
      Object.keys(prog.levels).forEach(function (k) {
        total += prog.levels[k].stars || 0;
      });
    }
    return total;
  },

  /* Total stars for one profile in one subject, using the registry. */
  subjectTotal: function (profile, subject) {
    let total = 0;
    (window.gameRegistry ? gameRegistry.games : []).forEach(function (g) {
      if (g.subject !== subject) return;
      const prog = profile.progress && profile.progress[g.id];
      total += Stars.totalForGame(prog);
    });
    return total;
  }
};

window.FX = {
  confetti: function (count) {
    const emojis = ["🎉", "⭐", "✨", "🎊", "💛", "💙", "💚"];
    count = count || 18;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (5 + Math.random() * 90) + "vw";
      el.style.top = (Math.random() * 20) + "vh";
      el.style.animationDelay = (Math.random() * 0.25) + "s";
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 1900);
    }
  },

  praise: function (text) {
    const msgs = ["Great job! 🎉", "Awesome! ⭐", "Super! 💪", "You did it! 🥳", "Brilliant! ✨", "Well done! 🌟"];
    const el = document.createElement("div");
    el.className = "praise-toast";
    el.textContent = text || msgs[Math.floor(Math.random() * msgs.length)];
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 950);
  }
};
