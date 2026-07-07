/* ============================================================
   TouchControls — on-screen ◀ ▶ ⬆ buttons for phones/tablets.
   Games poll TouchControls.state.{left,right,jump} each frame.
   Buttons appear automatically on touch devices when show() is
   called; on desktop they stay hidden (keyboard is used).
   ============================================================ */
window.TouchControls = (function () {
  const state = { left: false, right: false, jump: false };
  let layer = null;

  function isTouchDevice() {
    return ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  }

  function bind(btn, key) {
    function down(e) { e.preventDefault(); state[key] = true; }
    function up(e) { e.preventDefault(); state[key] = false; }
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointercancel", up);
    btn.addEventListener("pointerleave", up);
    btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  return {
    state: state,

    show: function () {
      if (!isTouchDevice()) return;
      if (layer) { layer.classList.remove("hidden"); return; }
      layer = document.createElement("div");
      layer.className = "touch-layer";
      layer.innerHTML =
        '<div class="touch-btn" id="tc-left">◀</div>' +
        '<div class="touch-btn" id="tc-right">▶</div>' +
        '<div class="touch-btn" id="tc-jump">⬆</div>';
      document.body.appendChild(layer);
      bind(layer.querySelector("#tc-left"), "left");
      bind(layer.querySelector("#tc-right"), "right");
      bind(layer.querySelector("#tc-jump"), "jump");
    },

    hide: function () {
      state.left = state.right = state.jump = false;
      if (layer) layer.classList.add("hidden");
    }
  };
})();
