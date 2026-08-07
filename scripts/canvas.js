// hero-canvas.js
// Three.js background for the hero section: a grid of diffuse cubes that
// oscillate forward/backward in an alternating (checkerboard) pattern.
// Lit by a single light positioned behind-and-above the camera.
//
// Include AFTER three.js is loaded, e.g. in <head> or before </body>:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
// <script src="scripts/hero-canvas.js"></script>

(function () {
  const canvas = document.getElementById('heroCanvas');
  const heroSection = document.querySelector('.hero-section');
  if (!canvas || !heroSection || typeof THREE === 'undefined') return;

  // ---- Renderer / Scene / Camera ----
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true, // transparent so the section's own background still shows through
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    heroSection.clientWidth / heroSection.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 3, 14);
  camera.lookAt(0, 0, 0);

  // ---- Lighting ----
  // Faint ambient so the shadow-side of each cube isn't pure black.
  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  // Key light: behind and above the camera, aimed back down at the grid.
  // "Behind the camera" = further along +z than the camera; "above" = higher y.
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2, 18, 22); // behind (z>14) and above (y high) the camera
  key.target.position.set(0, 0, 0);
  scene.add(key);
  scene.add(key.target);

  // ---- Cube grid ----
  const COLS = 12;
  const ROWS = 7;
  const SPACING = 1.6;
  const CUBE_SIZE = 1;

  // Diffuse material: matte, no specular highlight, no metalness.
  const material = new THREE.MeshLambertMaterial({ color: 0x8a8fa3 });
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  const cubes = [];
  const group = new THREE.Group();

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const cube = new THREE.Mesh(geometry, material);
      const x = (i - (COLS - 1) / 2) * SPACING;
      const y = (j - (ROWS - 1) / 2) * SPACING;
      cube.position.set(x, y, 0);

      // Alternating (checkerboard) phase: even/odd cells move opposite directions.
      const parity = (i + j) % 2 === 0 ? 1 : -1;
      cube.userData = {
        baseZ: 0,
        phase: (i * 0.4 + j * 0.4),
        parity,
      };
      group.add(cube);
      cubes.push(cube);
    }
  }

  group.position.z = -4; // push the grid slightly behind the origin/camera focus
  scene.add(group);

  // ---- Resize handling ----
  function resize() {
    const w = heroSection.clientWidth;
    const h = heroSection.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // ---- Animation loop ----
  const TRAVEL = 2.2; // how far forward/back each cube swings
  const SPEED = 0.9;

  function animate(t) {
    const time = t * 0.001 * SPEED;

    for (const cube of cubes) {
      const { phase, parity } = cube.userData;
      cube.position.z = Math.sin(time + phase) * TRAVEL * parity;

      // subtle rotation for extra shading variation as they move
      cube.rotation.x = Math.sin(time * 0.3 + phase) * 0.15;
      cube.rotation.y = Math.cos(time * 0.3 + phase) * 0.15;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
