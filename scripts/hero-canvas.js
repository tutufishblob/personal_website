// hero-canvas.js
// Three.js background for the hero section: a full-viewport grid of cubes,
// each a random rainbow color, sliding forward/backward in a straight-line
// (linear, not eased) motion, alternating in a checkerboard pattern.
// Lit by a single light positioned behind-and-above the camera.
//
// Include AFTER three.js is loaded:
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
  camera.position.set(0, 0, 14);
  camera.lookAt(0, 0, 0);

  // ---- Lighting ----
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  // Key light: behind and above the camera, aimed back down at the grid.
  const key = new THREE.DirectionalLight(0xffffff, 1.0);
  key.position.set(2, 18, 22); // behind (z>14) and above (y high) the camera
  key.target.position.set(0, 0, 0);
  scene.add(key);
  scene.add(key.target);

  // ---- Cube grid (sized to cover the full viewport) ----
  const SPACING = 1.5;
  const CUBE_SIZE = 1.2;
  const GRID_Z = -3; // plane the grid sits on

  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
  const group = new THREE.Group();
  scene.add(group);

  let cubes = [];

  function visibleSizeAt(depth) {
    const vFov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * depth;
    const width = height * camera.aspect;
    return { width, height };
  }

  function randomColor() {
    // Full-spectrum rainbow, a fresh random hue per cube.
    return new THREE.Color().setHSL(Math.random(), 0.75, 0.55);
  }

  function buildGrid() {
    for (const cube of cubes) {
      group.remove(cube);
      cube.material.dispose();
    }
    cubes = [];

    const depth = camera.position.z - GRID_Z;
    const { width, height } = visibleSizeAt(depth);

    // Extra padding so edges stay covered while cubes move closer/farther,
    // which changes how much screen area each one appears to occupy.
    const cols = Math.ceil(width / SPACING) + 4;
    const rows = Math.ceil(height / SPACING) + 4;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const material = new THREE.MeshLambertMaterial({ color: randomColor() });
        const cube = new THREE.Mesh(geometry, material);

        const x = (i - (cols - 1) / 2) * SPACING;
        const y = (j - (rows - 1) / 2) * SPACING;
        cube.position.set(x, y, GRID_Z);

        const parity = (i + j) % 2 === 0 ? 1 : -1;
        cube.userData = {
          phase: Math.random() * Math.PI * 2,
          parity,
          speed: 0.6 + Math.random() * 0.3,
        };

        group.add(cube);
        cubes.push(cube);
      }
    }
  }

  // ---- Resize handling ----
  function resize() {
    const w = heroSection.clientWidth;
    const h = heroSection.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    buildGrid(); // rebuild so the grid always fully covers the viewport
  }
  window.addEventListener('resize', resize);
  resize();

  // ---- Linear (triangle-wave) slide in/out ----
  const TRAVEL = 3.5; // world units each cube swings forward/back
  const PERIOD = 3.2; // seconds per full forward-back cycle

  // Triangle wave: output ramps -1..1..-1 in perfectly straight lines (no easing).
  function triangleWave(t) {
    return 2 * Math.abs(2 * (t / PERIOD - Math.floor(t / PERIOD + 0.5))) - 1;
  }

  function animate(t) {
    const time = t * 0.001;

    for (const cube of cubes) {
      const { phase, parity, speed } = cube.userData;
      const wave = triangleWave(time * speed + phase);
      cube.position.z = GRID_Z + wave * TRAVEL * parity;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
