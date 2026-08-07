// hero-canvas.js
// Fullscreen animated wall of colorful cubes.
// Uses one InstancedMesh per color instead of instanceColor.

(function () {
  const canvas = document.getElementById("heroCanvas");
  const heroSection = document.querySelector(".hero-section");

  if (!canvas || !heroSection || typeof THREE === "undefined") return;

  // ------------------------------------------------------------
  // Renderer / Scene / Camera
  // ------------------------------------------------------------

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

  // ------------------------------------------------------------
  // Lighting
  // ------------------------------------------------------------

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 18, 22);
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(-6, 6, 18);
  scene.add(fill);
  scene.add(fill.target);

  // ------------------------------------------------------------
  // Palette
  // ------------------------------------------------------------

  const PALETTE = [
    0xff595e,
    0xff924c,
    0xffca3a,
    0x8ac926,
    0x52b788,
    0x38bdf8,
    0x4f46e5,
    0x9d4edd,
  ];

  // ------------------------------------------------------------
  // Grid
  // ------------------------------------------------------------

  const SPACING = 1.5;
  const FACE_SIZE = SPACING;
  const BOX_DEPTH = 9;
  const GRID_Z = -3;

  const geometry = new THREE.BoxGeometry(
    FACE_SIZE,
    FACE_SIZE,
    BOX_DEPTH
  );

  const dummy = new THREE.Object3D();

  let meshes = [];
  let cubes = [];

  function visibleSizeAt(depth) {
    const vFov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * depth;
    const width = height * camera.aspect;

    return { width, height };
  }

  function buildGrid() {
    // Remove previous meshes
    for (const mesh of meshes) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }

    meshes = [];
    cubes = [];

    const depth = camera.position.z - GRID_Z;
    const { width, height } = visibleSizeAt(depth);

    const cols = Math.ceil(width / SPACING) + 2;
    const rows = Math.ceil(height / SPACING) + 2;
    const cubeCount = cols * rows;

    // Create one InstancedMesh per palette color
    for (const color of PALETTE) {
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.55,
        metalness: 0,
      });

      const mesh = new THREE.InstancedMesh(
        geometry,
        material,
        cubeCount
      );

      mesh.count = 0;

      scene.add(mesh);
      meshes.push(mesh);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - (cols - 1) / 2) * SPACING;
        const y = (j - (rows - 1) / 2) * SPACING;

        const colorIndex = Math.floor(
          Math.random() * PALETTE.length
        );

        const mesh = meshes[colorIndex];
        const instance = mesh.count++;

        dummy.position.set(x, y, GRID_Z);
        dummy.updateMatrix();

        mesh.setMatrixAt(instance, dummy.matrix);

        cubes.push({
          mesh,
          instance,
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.15,
          travel: 0.35 + Math.random() * 0.35,
          parity: (i + j) % 2 === 0 ? 1 : -1,
        });
      }
    }

    for (const mesh of meshes) {
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  // ------------------------------------------------------------
  // Resize
  // ------------------------------------------------------------

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

  // ------------------------------------------------------------
  // Animation
  // ------------------------------------------------------------

  function animate(t) {
    const time = t * 0.001;

    for (const cube of cubes) {
      const z =
        GRID_Z +
        Math.sin(time * cube.speed + cube.phase) *
          cube.travel *
          cube.parity;

      dummy.position.set(cube.x, cube.y, z);
      dummy.updateMatrix();

      cube.mesh.setMatrixAt(cube.instance, dummy.matrix);
    }

    for (const mesh of meshes) {
      mesh.instanceMatrix.needsUpdate = true;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
