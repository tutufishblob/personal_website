// hero-canvas.js
// Three.js background for the hero section: a full-viewport, INSTANCED grid
// of deep, exactly-tiling cubes (no gaps, no z-fighting) in a nuanced,
// curated color palette. Each cube gently "breathes" forward/backward on a
// slow sine wave, alternating in a checkerboard pattern. A key + fill light
// pair (both behind/above the camera) gives each face visible shading.
//
// Include AFTER three.js (0.130+ needed for InstancedMesh.setColorAt):
// <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
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

  // ---- Lighting (key + fill, both behind/above the camera, for visible shading) ----
  const ambient = new THREE.AmbientLight(0xffffff, 0.22); // low, so faces actually shade
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(2, 18, 22); // behind (z > camera z) and above (high y) the camera
  key.target.position.set(0, 0, 0);
  scene.add(key);
  scene.add(key.target);

  // Softer fill from the other side, so shadowed faces aren't pure black
  // but still read as darker than the lit faces - gives real dimension.
  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-6, 6, 18);
  fill.target.position.set(0, 0, 0);
  scene.add(fill);
  scene.add(fill.target);

  // ---- Curated, nuanced color palette (muted, not neon-rainbow) ----
  const PALETTE = [
    0x5c6f68, // sage
    0xb4654a, // terracotta
    0xc6a15b, // ochre
    0x4a5a7a, // slate blue
    0x8b5e6b, // mauve
    0x6e8894, // dusty teal
    0xa67c52, // warm tan
    0x5a4a6e, // muted plum
  ];

  function pickColor() {
    const base = new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    // Small per-instance lightness jitter so same-hue cubes aren't identical.
    base.offsetHSL(0, 0, (Math.random() - 0.5) * 0.08);
    return base;
  }

  // ---- Cube grid (instanced, exact tiling, deep) ----
  const SPACING = 1.5;      // center-to-center distance
  const FACE_SIZE = SPACING; // exactly tiling faces - no overlap, no z-fighting, no gaps
  const BOX_DEPTH = 9;       // deep boxes: motion never reveals a gap behind them
  const GRID_Z = -3;         // resting plane of the grid

  const geometry = new THREE.BoxGeometry(FACE_SIZE, FACE_SIZE, BOX_DEPTH);
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true, // required for per-instance color via setColorAt
    roughness: 0.85,
    metalness: 0,
  });

  const dummy = new THREE.Object3D();
  let instancedMesh = null;
  let xPositions = [];
  let yPositions = [];
  let phases = [];
  let speeds = [];
  let travels = [];
  let parities = [];

  function visibleSizeAt(depth) {
    const vFov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * depth;
    const width = height * camera.aspect;
    return { width, height };
  }

  function buildGrid() {
    if (instancedMesh) {
      scene.remove(instancedMesh);
      instancedMesh.dispose();
    }

    const depth = camera.position.z - GRID_Z;
    const { width, height } = visibleSizeAt(depth);

    const cols = Math.ceil(width / SPACING) + 2;
    const rows = Math.ceil(height / SPACING) + 2;
    const count = cols * rows;

    instancedMesh = new THREE.InstancedMesh(geometry, material, count);

    xPositions = new Array(count);
    yPositions = new Array(count);
    phases = new Array(count);
    speeds = new Array(count);
    travels = new Array(count);
    parities = new Array(count);

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - (cols - 1) / 2) * SPACING;
        const y = (j - (rows - 1) / 2) * SPACING;

        xPositions[idx] = x;
        yPositions[idx] = y;
        phases[idx] = Math.random() * Math.PI * 2;
        speeds[idx] = 0.35 + Math.random() * 0.15;   // slow, breathing pace
        travels[idx] = 0.35 + Math.random() * 0.35;  // small motion - "slide less"
        parities[idx] = (i + j) % 2 === 0 ? 1 : -1;

        dummy.position.set(x, y, GRID_Z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(idx, dummy.matrix);
        instancedMesh.setColorAt(idx, pickColor());

        idx++;
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    scene.add(instancedMesh);
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

  // ---- Breathing motion: slow, continuous sine wave, small amplitude ----
  function animate(t) {
    const time = t * 0.001;

    if (instancedMesh) {
      const count = xPositions.length;
      for (let i = 0; i < count; i++) {
        const z = GRID_Z + Math.sin(time * speeds[i] + phases[i]) * travels[i] * parities[i];
        dummy.position.set(xPositions[i], yPositions[i], z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
