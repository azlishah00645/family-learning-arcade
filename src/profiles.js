/* ============================================================
   ProfileStore — profiles, progress and settings in localStorage.
   Every score/star is saved under a named profile.
   Progress shape per game is decided by the game itself, e.g.:
     profile.progress["maths-jungle"] = {
       character: "🧒",
       levels: { M1: { stars: 3, best: 120, firstTry: 5, passed: true, plays: 2 } }
     }
   ============================================================ */
window.ProfileStore = (function () {
  const KEY = "fla_data_v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  let data = load();
  if (!data || !Array.isArray(data.profiles)) {
    data = { profiles: [], currentId: null, settings: { sound: true, parentUnlock: false } };
  }
  if (!data.settings) data.settings = { sound: true, parentUnlock: false };

  function save() { localStorage.setItem(KEY, JSON.stringify(data)); }

  function byId(id) { return data.profiles.find(function (p) { return p.id === id; }) || null; }

  return {
    all: function () { return data.profiles.slice(); },
    byId: byId,

    current: function () { return byId(data.currentId); },
    setCurrent: function (id) { data.currentId = id; save(); },

    create: function (name, avatar, grade, colors) {
      const p = {
        id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name: name.trim(),
        avatar: avatar,
        grade: grade,
        colors: colors || null,   /* {skin, shirt, pants} for the 3D blocky avatar */
        coins: 0,                  /* shared wallet across worlds (pet eggs) */
        pets: { owned: [], active: null },
        created: Date.now(),
        progress: {}
      };
      data.profiles.push(p);
      data.currentId = p.id;
      save();
      return p;
    },

    remove: function (id) {
      data.profiles = data.profiles.filter(function (p) { return p.id !== id; });
      if (data.currentId === id) data.currentId = null;
      save();
    },

    resetProgress: function (id) {
      const p = byId(id);
      if (p) { p.progress = {}; save(); }
    },

    /* Returns a live progress object for profile+game (created if missing).
       Mutate it, then call saveProgress() to persist. */
    getProgress: function (profileId, gameId) {
      const p = byId(profileId);
      if (!p) return {};
      if (!p.progress) p.progress = {};
      if (!p.progress[gameId]) p.progress[gameId] = {};
      return p.progress[gameId];
    },

    /* Read-only peek (does NOT create) — used by the Family Report. */
    peekProgress: function (profileId, gameId) {
      const p = byId(profileId);
      return (p && p.progress && p.progress[gameId]) || null;
    },

    saveProgress: function () { save(); },

    settings: function () { return data.settings; },
    setSetting: function (key, value) { data.settings[key] = value; save(); }
  };
})();
