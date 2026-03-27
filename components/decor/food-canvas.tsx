"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FoodCanvasProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
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
    renderer.toneMappingExposure = 1.05;
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
    camera.position.set(0, 8, 1);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff8f0, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
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
    const fill = new THREE.DirectionalLight(0xfff0d0, 0.7);
    fill.position.set(-5, 6, -3);
    scene.add(fill);

    // ── Table surface ─────────────────────────────────────────────────────────
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ color: "#ede4d0", roughness: 0.9 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.01;
    table.receiveShadow = true;
    scene.add(table);

    // ── Texture loader ────────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();

    const pivot = new THREE.Group();
    scene.add(pivot);

    // ── Plate (plat.png) ──────────────────────────────────────────────────────
    let plateMesh: THREE.Mesh | null = null;
    loader.load("/plat.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      plateMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5.5, 5.5),
        new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.55,
          metalness: 0.0,
        })
      );
      plateMesh.rotation.x = -Math.PI / 2;
      plateMesh.position.set(0, 0.01, 0);
      plateMesh.receiveShadow = true;
      plateMesh.castShadow = false;
      pivot.add(plateMesh);
    });

    // ── Slice (slice-1.png) — starts off-screen, slides in on scroll ──────────
    let sliceMesh: THREE.Mesh | null = null;

    // slice starts far away and above, then lands on plate
    const SLICE_START = new THREE.Vector3(6, 3, -5);   // off-screen start
    const SLICE_END   = new THREE.Vector3(0.3, 0.08, 0.2); // resting on plate

    loader.load("/slice-1.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      sliceMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 3.2),
        new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          alphaTest: 0.05,
          roughness: 0.5,
          metalness: 0.0,
        })
      );
      sliceMesh.rotation.x = -Math.PI / 2;
      sliceMesh.position.copy(SLICE_START);
      sliceMesh.castShadow = true;
      pivot.add(sliceMesh);
    });

    // ── Soft shadow under slice ───────────────────────────────────────────────
    const sliceShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 3.0),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    sliceShadow.rotation.x = -Math.PI / 2;
    sliceShadow.position.set(SLICE_END.x, 0.005, SLICE_END.z);
    pivot.add(sliceShadow);

    // ── Floating dust particles ───────────────────────────────────────────────
    const pCount = 55;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = Math.random() * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.045,
        color: "#c9a962",
        transparent: true,
        opacity: 0.45,
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
    const camPos = new THREE.Vector3(0, 8, 1);
    let time = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      const { scrollProgress: sp, mouse: m } = stateRef.current;

      // ── Camera scroll: top-down → angled ─────────────────────────────────
      const targetY   = THREE.MathUtils.lerp(8, 4.5, sp);
      const targetZ   = THREE.MathUtils.lerp(1, 8,   sp);
      const targetFov = THREE.MathUtils.lerp(44, 58,  sp);

      camPos.x += (m.x * 1.4 - camPos.x) * 0.035;
      camPos.y += (targetY + m.y * 0.5 - camPos.y) * 0.055;
      camPos.z += (targetZ - camPos.z) * 0.055;

      camera.position.copy(camPos);
      camera.fov += (targetFov - camera.fov) * 0.04;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // ── Plate gentle float ────────────────────────────────────────────────
      if (plateMesh) {
        plateMesh.position.y = 0.01 + Math.sin(time * 0.6) * 0.015;
      }

      // ── Slice animation on scroll ─────────────────────────────────────────
      // slice starts entering at sp=0.15, fully landed at sp=0.55
      if (sliceMesh) {
        const t = THREE.MathUtils.smoothstep(sp, 0.15, 0.55);

        sliceMesh.position.x = THREE.MathUtils.lerp(SLICE_START.x, SLICE_END.x, t);
        sliceMesh.position.z = THREE.MathUtils.lerp(SLICE_START.z, SLICE_END.z, t);

        // arc drop: high in air → lands on plate
        const arcY = THREE.MathUtils.lerp(SLICE_START.y, SLICE_END.y, t)
          + Math.sin(t * Math.PI) * 1.8;
        sliceMesh.position.y = arcY;

        // slight rotation as it falls
        sliceMesh.rotation.z = THREE.MathUtils.lerp(0.6, 0, t);

        // fade in as it approaches
        (sliceMesh.material as THREE.MeshStandardMaterial).opacity =
          THREE.MathUtils.lerp(0, 1, Math.min(t * 2, 1));

        // shadow fades in when slice lands
        (sliceShadow.material as THREE.MeshBasicMaterial).opacity =
          THREE.MathUtils.lerp(0, 0.2, t);
      }

      // ── Auto-rotate ───────────────────────────────────────────────────────
      pivot.rotation.y += 0.002;

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
    <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "100vh" }} />
  );
}
