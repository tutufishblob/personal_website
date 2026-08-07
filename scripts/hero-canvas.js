// hero-canvas.js
// Three.js background for the hero section: a full-viewport, INSTANCED grid
// of deep, exactly-tiling cubes (no gaps, no z-fighting) in a tasteful rainbow
// palette. Each cube gently "breathes" forward/backward on a slow sine wave,
// alternating in a checkerboard pattern.

(function () {
  const canvas = document.getElementById("heroCanvas");
  const heroSection = document.querySelector(".hero-section");
  if (!canvas || !heroSection || typeof THREE === "undefined") return;

  // ---- Renderer / Scene / Camera ----
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
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

  // ------------------------------------------------------------------
  // Lighting (brighter so colors actually show)
  // ------------------------------------------------------------------

  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 18, 22);
  key.target.position.set(0, 0, 0);
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(-6, 6, 18);
  fill.target.position.set(0, 0, 0);
  scene.add(fill);
  scene.add(fill.target);

  // ------------------------------------------------------------------
  // Tasteful rainbow palette
  // ------------------------------------------------------------------

  const PALETTE = [
    0xff595e, // coral
    0xff924c, // orange
    0xffca3a, // yellow
    0x8ac926, // lime
    0x52b788, // emerald
    0x38bdf8, // cyan
    0x4f46e5, // indigo
    0x9d4edd, // violet
  ];

  function pickColor() {
    const color = new THREE.Color(
      PALETTE[Math.floor(Math.random() * PALETTE.length)]
    );

    // Tiny variation so repeated colors don't look identical.
    color.offsetHSL(
      0,
      (Math.random() - 0.5) * 0.03,
      (Math.random() - 0.5) * 0.06
    );

    return color;
  }

  // ------------------------------------------------------------------
  // Cube grid
  // ------------------------------------------------------------------

  const SPACING = 1.5;
  const FACE_SIZE = SPACING;
  const BOX_DEPTH = 9;
  const GRID_Z = -3;

  const geometry = new THREE.BoxGeometry(
    FACE_SIZE,
    FACE_SIZE,
    BOX_DEPTH
  );

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.55,
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

    instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      count
    );

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
        speeds[idx] = 0.35 + Math.random() * 0.15;
        travels[idx] = 0.35 + Math.random() * 0.35;
        parities[idx] = (i + j) % 2 === 0 ? 1 : -1;

        dummy.position.set(x, y, GRID_Z);
        dummy.updateMatrix();

        instancedMesh.setMatrixAt(idx, dummy.matrix);
        instancedMesh.setColorAt(idx, pickColor());

        idx++;
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;

    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }

    scene.add(instancedMesh);
  }

  // ------------------------------------------------------------------
  // Resize
  // ------------------------------------------------------------------

  function resize() {
    const w = heroSection.clientWidth;
    const h = heroSection.clientHeight;

    renderer.setSize(w, h, false);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    buildGrid();
  }

  window.addEventListener("resize", resize);

  resize();

  // ------------------------------------------------------------------
  // Animation
  // ------------------------------------------------------------------

  function animate(t) {
    const time = t * 0.001;

    if (instancedMesh) {
      const count = xPositions.length;

      for (let i = 0; i < count; i++) {
        const z =
          GRID_Z +
          Math.sin(time * speeds[i] + phases[i]) *
            travels[i] *
            parities[i];

        dummy.position.set(
          xPositions[i],
          yPositions[i],
          z
        );

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
