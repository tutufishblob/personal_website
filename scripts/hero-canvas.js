// hero-canvas.js
// Three.js background for the hero section: a full-viewport grid of deep,
// touching cubes (no gaps between them), each a random rainbow color,
// sliding forward/backward with an eased ping-pong motion (accelerates out
// of each turn, decelerates into the next) in an alternating checkerboard
// pattern. Lit by a single light positioned behind-and-above the camera.
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

  // ---- Cube grid (sized to cover the full viewport, no gaps) ----
  const SPACING = 1.5;       // center-to-center distance between cubes
  const FACE_SIZE = 1.65;    // wider than SPACING so faces overlap slightly - no visible seams
  const BOX_DEPTH = 5;       // deep boxes so the slide never reveals a gap behind them
  const GRID_Z = -3;         // resting plane of the grid

  const geometry = new THREE.BoxGeometry(FACE_SIZE, FACE_SIZE, BOX_DEPTH);
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
          speed: 0.55 + Math.random() * 0.35,     // per-cube timing variance
          travel: 2.6 + Math.random() * 1.6,       // per-cube distance variance
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

  // ---- Eased ping-pong slide (natural ease-in/out at each turnaround) ----
  const PERIOD = 3.4; // seconds for one leg of the back-and-forth

  function easedPingPong(t) {
    const cycle = PERIOD * 2;
    const x = ((t % cycle) + cycle) % cycle / cycle; // 0..1 across the full cycle
    const raw = x < 0.5 ? x * 2 : 2 - x * 2;          // 0..1..0 triangle (linear)
    const eased = raw * raw * (3 - 2 * raw);          // smoothstep: ease in/out at the ends
    return eased * 2 - 1;                              // -1..1
  }

  function animate(t) {
    const time = t * 0.001;

    for (const cube of cubes) {
      const { phase, parity, speed, travel } = cube.userData;
      const wave = easedPingPong(time * speed + phase);
      cube.position.z = GRID_Z + wave * travel * parity;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
