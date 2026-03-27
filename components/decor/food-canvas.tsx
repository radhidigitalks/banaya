"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FoodCanvasProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

// Real food images from Unsplash — high quality, top-down / angled shots
const FOOD_ITEMS = [
  {
    // wooden serving board / plate — center
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=90",
    position: [0, 0, 0] as [number, number, number],
    size: [5.5, 5.5] as [number, number],
    elevation: 0,
    isPlate: true,
  },
  {
    // cheeseburger top-down
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=90",
    position: [-2.2, 0.08, -2.0] as [number, number, number],
    size: [2.2, 2.2] as [number, number],
    elevation: 0.08,
  },
  {
    // french fries
    url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=90",
    position: [2.3, 0.08, -1.9] as [number, number, number],
    size: [2.0, 2.0] as [number, number],
    elevation: 0.08,
  },
  {
    // pizza slice top-down
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=90",
    position: [2.1, 0.08, 2.1] as [number, number, number],
    size: [2.2, 2.2] as [number, number],
    elevation: 0.08,
  },
  {
    // chocolate donut
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=90",
    position: [-2.0, 0.08, 2.2] as [number, number, number],
    size: [2.0, 2.0] as [number, number],
    elevation: 0.08,
  },
];

// Soft drop shadow under each food item
function makeShadowPlane(size: number) {
  const geo = new THREE.PlaneGeometry(size, size);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

export default function FoodCanvas({ scrollProgress, mouse }: FoodCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scrollProgress: 0, mouse: { x: 0, y: 0 } });
  stateRef.current.scrollProgress = scrollProgress;
  stateRef.current.mouse = mouse;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f0e8");

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      44,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 9, 1);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff8f0, 2.2));

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 10, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 30;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.001;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xfff0d0, 0.8);
    fill.position.set(-5, 6, -3);
    scene.add(fill);

    // ── Table surface ─────────────────────────────────────────────────────────
    const tableGeo = new THREE.PlaneGeometry(20, 20);
    const tableMat = new THREE.MeshStandardMaterial({
      color: "#e8dcc8",
      roughness: 0.85,
      metalness: 0,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.01;
    table.receiveShadow = true;
    scene.add(table);

    // ── Load textures & build food planes ─────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const pivot = new THREE.Group();
    scene.add(pivot);

    const foodMeshes: THREE.Mesh[] = [];

    FOOD_ITEMS.forEach((item) => {
      loader.load(item.url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.generateMipmaps = true;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const geo = new THREE.PlaneGeometry(item.size[0], item.size[1]);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.6,
          metalness: 0,
          transparent: !item.isPlate,
          alphaTest: item.isPlate ? 0 : 0.05,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(...item.position);
        mesh.position.y = item.elevation;
        mesh.castShadow = !item.isPlate;
        mesh.receiveShadow = true;
        pivot.add(mesh);
        foodMeshes.push(mesh);

        // drop shadow under food items (not plate)
        if (!item.isPlate) {
          const shadow = makeShadowPlane(item.size[0] * 0.85);
          shadow.position.set(item.position[0], 0.005, item.position[2]);
          pivot.add(shadow);
        }
      });
    });

    // ── Floating dust particles ───────────────────────────────────────────────
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = Math.random() * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.04,
        color: "#c9a962",
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf: number;
    const camPos = new THREE.Vector3(0, 9, 1);
    let time = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      const { scrollProgress: sp, mouse: m } = stateRef.current;

      // camera: top-down → angled side view on scroll
      const targetY = THREE.MathUtils.lerp(9, 4.5, sp);
      const targetZ = THREE.MathUtils.lerp(1, 8, sp);
      const targetFov = THREE.MathUtils.lerp(44, 58, sp);

      camPos.x += (m.x * 1.5 - camPos.x) * 0.035;
      camPos.y += (targetY + m.y * 0.5 - camPos.y) * 0.055;
      camPos.z += (targetZ - camPos.z) * 0.055;

      camera.position.copy(camPos);
      camera.fov += (targetFov - camera.fov) * 0.04;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // gentle auto-rotate
      pivot.rotation.y += 0.0022;

      // subtle float on each food item
      foodMeshes.forEach((mesh, i) => {
        if (i === 0) return; // plate stays flat
        mesh.position.y = FOOD_ITEMS[i]?.elevation + Math.sin(time + i * 1.2) * 0.04;
      });

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", minHeight: "100vh" }}
    />
  );
}
