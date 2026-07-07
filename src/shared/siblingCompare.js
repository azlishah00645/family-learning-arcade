/* ============================================================
   FamilyReport — shared "Family Report" screen.

   EVERY game must call this right after a player completes a
   chapter / level / run. It shows the player's own result BIG,
   then a friendly sibling comparison table across ALL profiles.
   Encouraging tone only — never shaming.

   Usage:
     FamilyReport.show({
       gameTitle:   "Maths Jungle",
       chapterLabel:"Chapter M2 — Addition and Subtraction",
       current: {
         profileId, stars: 2,
         headline: [ {label:"Score", value:"120"},
                     {label:"First-try answers", value:"4 / 5"} ]
       },
       columns: [ {key:"stars", label:"Stars"}, {key:"score", label:"Best score"} ],
       rows: [   // one per profile (build from ProfileStore.all())
         { profileId, name, avatar, played: true,
           values: { stars:"⭐⭐", score:"120" }, sort: 2120 },
         { profileId, name, avatar, played: false }
       ],
       onReplay: fn, onNext: fn|null, onMenu: fn
     });
   Rows are ranked by `sort` (higher = better) with 🥇🥈🥉 medals.
   ============================================================ */
window.FamilyReport = (function () {

  function show(opts) {
    const root = document.getElementById("overlay-root");
    const backdrop = document.createElement("div");
    backdrop.className = "q-backdrop";

    const box = document.createElement("div");
    box.className = "report-box";
    backdrop.appendChild(box);

    const me = ProfileStore.byId(opts.current.profileId) || { name: "?", avatar: "🙂" };

    /* --- header + player's own result --- */
    let html =
      "<h2>🎉 Family Report</h2>" +
      '<div class="rep-sub">' + esc(opts.gameTitle) + " · " + esc(opts.chapterLabel) + "</div>" +
      '<div class="rep-hero">' +
      '<div class="rep-avatar">' + me.avatar + "</div>" +
      '<div class="rep-name">' + esc(me.name) + "</div>" +
      '<div class="rep-stars">' + Stars.str(opts.current.stars || 0) + "</div>" +
      '<div class="rep-lines">' +
      (opts.current.headline || []).map(function (h) {
        return esc(h.label) + ": <b>" + esc(String(h.value)) + "</b>";
      }).join(" &nbsp;·&nbsp; ") +
      "</div></div>";

    /* --- sibling table --- */
    const played = opts.rows.filter(function (r) { return r.played; })
      .sort(function (a, b) { return (b.sort || 0) - (a.sort || 0); });
    const notPlayed = opts.rows.filter(function (r) { return !r.played; });
    const medals = ["🥇", "🥈", "🥉"];

    html += '<table class="rep-table"><tr><th></th><th style="text-align:left">Player</th>';
    opts.columns.forEach(function (c) { html += "<th>" + esc(c.label) + "</th>"; });
    html += "</tr>";

    played.forEach(function (r, i) {
      const meRow = r.profileId === opts.current.profileId ? ' class="me"' : "";
      html += "<tr" + meRow + "><td>" + (medals[i] || (i + 1) + ".") + "</td>" +
        '<td class="pname">' + r.avatar + " " + esc(r.name) + "</td>";
      opts.columns.forEach(function (c) {
        html += "<td>" + esc(String(r.values[c.key] != null ? r.values[c.key] : "—")) + "</td>";
      });
      html += "</tr>";
    });
    notPlayed.forEach(function (r) {
      html += '<tr><td>🌱</td><td class="pname">' + r.avatar + " " + esc(r.name) + "</td>" +
        '<td class="notplayed" colspan="' + opts.columns.length + '">Not played yet — challenge them!</td></tr>';
    });
    html += "</table>";

    /* --- encouraging nudge --- */
    const myRow = played.find(function (r) { return r.profileId === opts.current.profileId; });
    const myRank = played.indexOf(myRow);
    let nudge = "";
    if (played.length <= 1) {
      nudge = "You set the family score! Challenge everyone to beat you! 😎";
    } else if (myRank === 0) {
      nudge = "You're leading the family! Keep it up! 🏆";
    } else if (myRank > 0) {
      nudge = "Beat " + esc(played[myRank - 1].name) + "'s score! You can do it! 🔥";
    }
    if (nudge) html += '<div class="rep-nudge">' + nudge + "</div>";

    box.innerHTML = html;

    /* --- buttons --- */
    const actions = document.createElement("div");
    actions.className = "rep-actions";
    function addBtn(label, cls, fn) {
      const b = document.createElement("button");
      b.className = "btn " + cls;
      b.textContent = label;
      b.onclick = function () { Sound.click(); backdrop.remove(); fn(); };
      actions.appendChild(b);
    }
    addBtn("🔁 Replay", "orange", opts.onReplay);
    if (opts.onNext) addBtn("➡️ Next Chapter", "green", opts.onNext);
    addBtn("🏠 Back to Menu", "blue", opts.onMenu);
    box.appendChild(actions);

    root.appendChild(backdrop);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  return { show: show };
})();
