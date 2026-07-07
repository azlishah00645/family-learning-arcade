/* ============================================================
   Sound — small Web Audio helper. No audio files needed.
   All games should use these so the parent sound toggle works
   everywhere.
   ============================================================ */
window.Sound = (function () {
  let ctx = null;

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function on() {
    return window.ProfileStore ? ProfileStore.settings().sound !== false : true;
  }

  function tone(freq, dur, type, delay, vol) {
    if (!on()) return;
    const c = ac();
    if (!c) return;
    const t = c.currentTime + (delay || 0);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol || 0.12, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }

  return {
    isOn: on,
    toggle: function () {
      ProfileStore.setSetting("sound", !on());
      return on();
    },
    click:   function () { tone(600, 0.08, "square", 0, 0.06); },
    coin:    function () { tone(900, 0.07, "square"); tone(1350, 0.12, "square", 0.07); },
    jump:    function () { tone(300, 0.12, "sine"); tone(500, 0.1, "sine", 0.06); },
    correct: function () { tone(523, 0.12, "sine"); tone(659, 0.12, "sine", 0.1); tone(784, 0.22, "sine", 0.2); },
    wrong:   function () { tone(220, 0.2, "triangle", 0, 0.08); },
    bump:    function () { tone(160, 0.12, "triangle", 0, 0.08); },
    fanfare: function () {
      tone(523, 0.15, "sine"); tone(659, 0.15, "sine", 0.14);
      tone(784, 0.15, "sine", 0.28); tone(1046, 0.4, "sine", 0.42);
      tone(784, 0.3, "triangle", 0.42, 0.05);
    }
  };
})();
