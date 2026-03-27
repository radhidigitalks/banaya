"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FoodCanvasProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

// ── geometry helpers ──────────────────────────────────────────────────────────
function mat(color: string, roughness = 0.7, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function cylinder(rt: number, rb: number, h: number, seg = 48) {
  return new THREE.CylinderGeometry(rt, rb, h, seg);
}

function sphere(r: number, ws = 32, hs = 16) {
  return new THREE.SphereGeometry(r, ws, hs);
}

function box(w: number, h: number, d: number) {
  return new THREE.BoxGeometry(w, h, d);
}

function torus(r: number, tube: number, rs = 16, ts = 64) {
  return new THREE.TorusGeometry(r, tube, rs, ts);
}

function add(parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, pos?: [number, number, number], rot?: [number, number, number], scale?: [number, number, number]) {
  const mesh = new THREE.Mesh(geo, m);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (pos) mesh.position.set(...pos);
  if (rot) mesh.rotation.set(...rot);
  if (scale) mesh.scale.set(...scale);
  parent.add(mesh);
  return mesh;
}

// ── Wooden Plate ──────────────────────────────────────────────────────────────
function makePlate() {
  const g = new THREE.Group();
  add(g, cylinder(2.6, 2.8, 0.18, 80), mat("#c8a96e", 0.55));
  add(g, torus(2.65, 0.06, 16, 80), mat("#a07840", 0.7), [0, 0.09, 0], [Math.PI / 2, 0, 0]);
  add(g, cylinder(2.0, 2.0, 0.06, 80), mat("#d4b07a", 0.4, 0.02), [0, 0.1, 0]);
  for (const x of [-0.6, -0.2, 0.2, 0.6]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 4.8), new THREE.MeshStandardMaterial({ color: "#b08040", roughness: 1, transparent: true, opacity: 0.18 }));
    m.position.set(x, 0.12, 0);
    m.rotation.x = -Math.PI / 2;
    g.add(m);
  }
  return g;
}

// ── Burger ────────────────────────────────────────────────────────────────────
function makeBurger() {
  const g = new THREE.Group();
  add(g, cylinder(0.52, 0.56, 0.22, 40), mat("#c8860a", 0.75));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    add(g, sphere(0.035, 8, 8), mat("#f0e0b0", 0.5), [Math.cos(a) * 0.3, 0.12, Math.sin(a) * 0.3]);
  }
  add(g, cylinder(0.5, 0.5, 0.16, 40), mat("#4a2008", 0.95), [0, 0.19, 0]);
  add(g, box(1.05, 0.05, 1.05), mat("#f5c518", 0.5, 0.05), [0, 0.28, 0]);
  add(g, cylinder(0.58, 0.58, 0.07, 40), mat("#3d7a35", 0.95), [0, 0.33, 0]);
  add(g, cylinder(0.5, 0.5, 0.06, 40), mat("#c0392b", 0.6), [0, 0.4, 0]);
  const topBun = add(g, sphere(0.52, 40, 20), mat("#d4920e", 0.7), [0, 0.62, 0]);
  topBun.scale.y = 0.72;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    add(g, sphere(0.03, 8, 8), mat("#f0e0b0", 0.5), [Math.cos(a) * 0.26, 0.9, Math.sin(a) * 0.26]);
  }
  return g;
}

// ── Fries ─────────────────────────────────────────────────────────────────────
function makeFries() {
  const g = new THREE.Group();
  add(g, box(0.65, 0.55, 0.55), mat("#d42b1e", 0.65));
  add(g, box(0.66, 0.12, 0.56), mat("#f5f5f5", 0.4), [0, 0.12, 0]);
  const fryData: [number, number, number, number][] = [
    [-0.2, 0, -0.06, 0.12], [-0.07, 0.06, 0.05, -0.09],
    [0.07, 0, -0.04, 0.14], [0.2, 0.04, 0.07, -0.06],
    [-0.13, 0.03, 0.09, 0.07], [0.13, 0, -0.09, -0.11],
    [0, 0.05, 0, 0.05],
  ];
  for (const [x, yOff, z, rot] of fryData) {
    add(g, box(0.085, 0.65, 0.085), mat("#f5c842", 0.55), [x, 0.55 + yOff, z], [rot, 0, rot * 0.4]);
  }
  return g;
}

// ── Pizza Slice ───────────────────────────────────────────────────────────────
function makePizza() {
  const g = new THREE.Group();

  function slice(r: number, offset = 0) {
    const s = new THREE.Shape();
    s.moveTo(offset, offset);
    s.absarc(0, 0, r, -Math.PI / 5.5 + offset * 0.2, Math.PI / 5.5 - offset * 0.2, false);
    s.lineTo(offset, offset);
    return s;
  }

  const base = new THREE.Mesh(
    new THREE.ExtrudeGeometry(slice(0.82), { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }),
    mat("#d4a055", 0.82)
  );
  base.castShadow = true;
  g.add(base);

  const sauce = new THREE.Mesh(new THREE.ExtrudeGeometry(slice(0.7, 0.05), { depth: 0.025, bevelEnabled: false }), mat("#c0392b", 0.7));
  sauce.position.z = 0.14;
  g.add(sauce);

  const cheese = new THREE.Mesh(new THREE.ExtrudeGeometry(slice(0.6, 0.08), { depth: 0.025, bevelEnabled: false }), mat("#f5e030", 0.45, 0.05));
  cheese.position.z = 0.165;
  g.add(cheese);

  for (const [px, pz] of [[0.18, 0.35], [0.35, 0.18], [0.0, 0.5], [0.28, 0.42]] as [number, number][]) {
    add(g, cylinder(0.085, 0.085, 0.04, 20), mat("#8b1a1a", 0.6), [px, pz, 0.2]);
  }

  g.rotation.x = -Math.PI / 2;
  g.rotation.z = Math.PI;
  return g;
}

// ── Donut ─────────────────────────────────────────────────────────────────────
function makeDonut() {
  const g = new THREE.Group();
  add(g, torus(0.44, 0.22, 28, 80), mat("#9b6b3a", 0.72), [0, 0, 0], [Math.PI / 2, 0, 0]);
  add(g, torus(0.44, 0.2, 28, 80), mat("#2c1200", 0.35, 0.08), [0, 0.05, 0], [Math.PI / 2, 0, 0]);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    add(g, sphere(0.06, 12, 12), mat("#2c1200", 0.3, 0.1), [Math.cos(a) * 0.44, -0.04, Math.sin(a) * 0.44]);
  }
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#e91e63", "#1abc9c"];
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + (i % 4) * 0.3;
    const r = 0.3 + (i % 3) * 0.1;
    add(g, box(0.07, 0.028, 0.018), mat(colors[i % colors.length], 0.35), [Math.cos(a) * r, 0.12, Math.sin(a) * r], [0, a, 0]);
  }
  return g;
}

// ── Particles ─────────────────────────────────────────────────────────────────
function makeParticles() {
  const count = 50;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, color: "#c9a962", transparent: true, opacity: 0.5, sizeAttenuation: true }));
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function FoodCanvas({ scrollProgress, mouse }: FoodCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scrollProgress: 0,
    mouse: { x: 0, y: 0 },
  });

  // keep latest props in ref so animation loop reads them without re-creating
  stateRef.current.scrollProgress = scrollProgress;
  stateRef.current.mouse = mouse;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#faf8f4");
    scene.fog = new THREE.Fog("#faf8f4", 18, 30);

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 8.5, 0.5);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xfff5e0, 1.0);
    fill.position.set(-4, 6, -3);
    scene.add(fill);

    const rim = new THREE.PointLight(0xc9a962, 1.4, 20);
    rim.position.set(0, 6, -4);
    scene.add(rim);

    // ── Ground shadow plane ───────────────────────────────────────────────────
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(5, 64),
      new THREE.MeshStandardMaterial({ color: "#e8d5b0", roughness: 1, transparent: true, opacity: 0.35 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.09;
    shadow.receiveShadow = true;
    scene.add(shadow);

    // ── Food objects ──────────────────────────────────────────────────────────
    const pivot = new THREE.Group();
    scene.add(pivot);

    pivot.add(makePlate());

    const burger = makeBurger();
    burger.position.set(-1.7, 0.42, -1.7);
    pivot.add(burger);

    const fries = makeFries();
    fries.position.set(1.8, 0.38, -1.6);
    pivot.add(fries);

    const pizza = makePizza();
    pizza.position.set(1.7, 0.14, 1.7);
    pivot.add(pizza);

    const donut = makeDonut();
    donut.position.set(-1.6, 0.26, 1.7);
    pivot.add(donut);

    const particles = makeParticles();
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
    const camPos = new THREE.Vector3(0, 8.5, 0.5);

    const animate = () => {
      raf = requestAnimationFrame(animate);

      const { scrollProgress: sp, mouse: m } = stateRef.current;

      // camera lerp — top-down → side view
      const targetY = THREE.MathUtils.lerp(8.5, 3.5, sp);
      const targetZ = THREE.MathUtils.lerp(0.5, 7.5, sp);
      const targetFov = THREE.MathUtils.lerp(42, 56, sp);

      camPos.x += (m.x * 1.2 - camPos.x) * 0.04;
      camPos.y += (targetY + m.y * 0.6 - camPos.y) * 0.06;
      camPos.z += (targetZ - camPos.z) * 0.06;

      camera.position.copy(camPos);
      camera.fov += (targetFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // slow auto-rotate
      pivot.rotation.y += 0.003;
      particles.rotation.y += 0.0015;

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

  return <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "100vh" }} />;
}
