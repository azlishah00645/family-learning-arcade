/* ============================================================
   SCIENCE ISLAND — Year 1 Science exploration game.
   Walk around the island, enter a zone, DO the science!
   Registered for { grade: "Year 1", subject: "science" }.
   All gameplay comes from the shared MinigameEngine
   (src/shared/minigameFramework.js) — zones in zones.js,
   items/answers in content/y1-science-content.js.
   ============================================================ */
(function () {
  gameRegistry.register({
    id: "science-island",
    title: "Science Island",
    grade: "Year 1",
    subject: "science",
    icon: "🏝️",
    launch: function (opts) {
      return MinigameEngine.launch({
        gameId: "science-island",
        title: "Science Island",
        icon: "🏝️",
        theme: {
          sea: 0x0e7490,
          sand: 0xfcd34d,
          grass: 0x4ade80,
          deco: ["🌴", "🌺", "🦜", "🐚"]
        },
        zones: SCIENCE_ISLAND_ZONES,
        certificate: {
          heading: "Science Island Champion!",
          line: "for exploring ALL 10 zones of Science Island! 🎉"
        },
        containerId: opts.containerId,
        profile: opts.profile,
        onExit: opts.onExit
      });
    }
  });
})();
