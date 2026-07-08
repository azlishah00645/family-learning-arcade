/* ============================================================
   OBBY ACADEMY — module entry point.
   Imports the engine + worlds (each world registers itself into
   window.gameRegistry) and exposes what the classic-script hub
   needs on window.Obby: title-screen 3D background, avatar
   builder + palette for the wardrobe, and test hooks.
   ============================================================ */
import * as THREE from "three";
import {
  initEngine, createWorldScene, makeCamera, runScene, stopScene,
  setQuality, isLowGfx, buildCharacter, AVATAR_COLORS, Assets, stepFrame, Input
} from "./engine.js";
import { KENNEY_MODELS, Props } from "./obby.js";
import { PetSystem, PET_SPECIES, EGGS, buildPet, rollRarity, Showcase } from "./pets.js";
import "./worlds/maths-world.js";

/* ---------------- title-screen background ---------------- */
let titleRunning = false;

function startTitleBg() {
  initEngine();
  const world = createWorldScene({ skyTop: "#4aa8ff", skyBottom: "#cdeeff", fog: "#cdeeff" });
  const scene = world.scene;
  const camera = makeCamera();
  camera.position.set(0, 7, 14);
  camera.lookAt(0, 1.5, 0);

  const isle = new THREE.Group();
  scene.add(isle);

  function lam(c) { return new THREE.MeshLambertMaterial({ color: c }); }
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(7, 4.6, 2, 18), lam("#4ade80"));
  ground.position.y = -1;
  ground.receiveShadow = true;
  isle.add(ground);
  const dirt = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 1, 3.4, 12), lam("#92623a"));
  dirt.position.y = -3.6;
  isle.add(dirt);

  /* mini obby ring on the island */
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 2), lam(["#f59e0b", "#3b82f6", "#ec4899", "#22d3ee", "#a855f7", "#facc15"][i]));
    p.position.set(Math.cos(a) * 4.6, 0.8 + Math.sin(i * 1.7) * 0.9, Math.sin(a) * 4.6);
    p.castShadow = true;
    isle.add(p);
  }
  const hero = buildCharacter({ shirt: "#ef4444", pants: "#1e3a8a" });
  hero.position.y = 0;
  isle.add(hero);
  const buddy = buildPet(PET_SPECIES[0]);
  buddy.position.set(1.3, 0, 0.8);
  buddy.scale.setScalar(0.9);
  isle.add(buddy);

  Assets.load(["flag", "cloud"]).then(function () {
    const f = Assets.spawn("flag");
    if (f) { f.position.set(-1.6, 0, -1); f.scale.setScalar(1.8); isle.add(f); }
    for (let i = 0; i < 4; i++) {
      const c = Assets.spawn("cloud");
      if (c) {
        c.position.set(-14 + i * 9, 6 + (i % 2) * 2.5, -8 - (i % 3) * 4);
        c.scale.setScalar(2.2);
        scene.add(c);
      }
    }
  });

  titleRunning = true;
  runScene(scene, camera, function (dt, t) {
    isle.rotation.y = t * 0.14;
    hero.animate(dt, 0, true, 1 + Math.sin(t * 2.4) * 0.02);
    buddy.position.y = Math.abs(Math.sin(t * 3)) * 0.2;
  });
}

function stopTitleBg() {
  if (titleRunning) { stopScene(); titleRunning = false; }
}

/* ---------------- exposed to the hub (classic script) ---------------- */
window.Obby = {
  startTitleBg: startTitleBg,
  stopTitleBg: stopTitleBg,
  buildCharacter: buildCharacter,
  AVATAR_COLORS: AVATAR_COLORS,
  setQuality: setQuality,
  isLowGfx: isLowGfx,
  Showcase: Showcase,
  PetSystem: PetSystem,
  PET_SPECIES: PET_SPECIES,
  /* test hooks */
  _stepFrame: stepFrame,
  _rollRarity: rollRarity,
  _EGGS: EGGS,
  _Input: Input
};

/* boot the hub once modules are ready (hub.js listens for this) */
window.dispatchEvent(new Event("obby-ready"));
