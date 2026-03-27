"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Torus,
  Cylinder,
  Sphere,
  RoundedBox,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

interface FoodSceneProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

// ── Wooden Plate ─────────────────────────────────────────────────────────────
function WoodenPlate() {
  return (
    <group>
      {/* plate body */}
      <Cylinder args={[2.6, 2.8, 0.18, 80]} receiveShadow castShadow>
        <meshStandardMaterial
          color="#c8a96e"
          roughness={0.55}
          metalness={0.0}
          envMapIntensity={0.6}
        />
      </Cylinder>
      {/* rim groove */}
      <Torus args={[2.65, 0.06, 16, 80]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <meshStandardMaterial color="#a07840" roughness={0.7} />
      </Torus>
      {/* inner well */}
      <Cylinder args={[2.0, 2.0, 0.06, 80]} position={[0, 0.1, 0]} receiveShadow>
        <meshStandardMaterial color="#d4b07a" roughness={0.4} metalness={0.02} />
      </Cylinder>
      {/* wood grain lines */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 4.8]} />
          <meshStandardMaterial color="#b08040" roughness={1} transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  );
}

// ── Cheeseburger ─────────────────────────────────────────────────────────────
function Burger({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={ref} position={position} castShadow>
        {/* bottom bun */}
        <Cylinder args={[0.52, 0.56, 0.22, 40]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color="#c8860a" roughness={0.75} />
        </Cylinder>
        {/* sesame seeds on bottom */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <Sphere key={i} args={[0.035, 8, 8]}
            position={[Math.cos((deg * Math.PI) / 180) * 0.3, 0.12, Math.sin((deg * Math.PI) / 180) * 0.3]}>
            <meshStandardMaterial color="#f0e0b0" roughness={0.5} />
          </Sphere>
        ))}
        {/* patty */}
        <Cylinder args={[0.5, 0.5, 0.16, 40]} position={[0, 0.19, 0]} castShadow>
          <meshStandardMaterial color="#4a2008" roughness={0.95} />
        </Cylinder>
        {/* cheese drape */}
        <RoundedBox args={[1.05, 0.05, 1.05]} radius={0.02} position={[0, 0.28, 0]}>
          <meshStandardMaterial color="#f5c518" roughness={0.5} metalness={0.05} />
        </RoundedBox>
        {/* lettuce */}
        <Cylinder args={[0.58, 0.58, 0.07, 40]} position={[0, 0.33, 0]}>
          <meshStandardMaterial color="#3d7a35" roughness={0.95} />
        </Cylinder>
        {/* tomato */}
        <Cylinder args={[0.5, 0.5, 0.06, 40]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#c0392b" roughness={0.6} />
        </Cylinder>
        {/* top bun */}
        <Sphere args={[0.52, 40, 20]} position={[0, 0.62, 0]} scale={[1, 0.72, 1]} castShadow>
          <meshStandardMaterial color="#d4920e" roughness={0.7} />
        </Sphere>
        {/* sesame seeds on top */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <Sphere key={i} args={[0.03, 8, 8]}
            position={[Math.cos((deg * Math.PI) / 180) * 0.26, 0.9, Math.sin((deg * Math.PI) / 180) * 0.26]}>
            <meshStandardMaterial color="#f0e0b0" roughness={0.5} />
          </Sphere>
        ))}
      </group>
    </Float>
  );
}

// ── French Fries ─────────────────────────────────────────────────────────────
function Fries({ position }: { position: [number, number, number] }) {
  const fryData: [number, number, number, number][] = [
    [-0.2, 0, -0.06, 0.12], [-0.07, 0.06, 0.05, -0.09],
    [0.07, 0, -0.04, 0.14], [0.2, 0.04, 0.07, -0.06],
    [-0.13, 0.03, 0.09, 0.07], [0.13, 0, -0.09, -0.11],
    [0, 0.05, 0, 0.05],
  ];
  return (
    <Float speed={0.9} rotationIntensity={0.06} floatIntensity={0.1}>
      <group position={position} castShadow>
        {/* red box */}
        <RoundedBox args={[0.65, 0.55, 0.55]} radius={0.05} castShadow>
          <meshStandardMaterial color="#d42b1e" roughness={0.65} />
        </RoundedBox>
        {/* white stripe */}
        <RoundedBox args={[0.66, 0.12, 0.56]} radius={0.02} position={[0, 0.12, 0]}>
          <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
        </RoundedBox>
        {/* golden arch logo hint */}
        <mesh position={[0, 0.12, 0.28]}>
          <torusGeometry args={[0.08, 0.02, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#f5c518" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* fries */}
        {fryData.map(([x, yOff, z, rot], i) => (
          <RoundedBox key={i} args={[0.085, 0.65, 0.085]} radius={0.02}
            position={[x, 0.55 + yOff, z]} rotation={[rot, 0, rot * 0.4]}>
            <meshStandardMaterial color="#f5c842" roughness={0.55} />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

// ── Pizza Slice ───────────────────────────────────────────────────────────────
function PizzaSlice({ position }: { position: [number, number, number] }) {
  const baseShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.absarc(0, 0, 0.82, -Math.PI / 5.5, Math.PI / 5.5, false); s.lineTo(0, 0);
    return s;
  }, []);
  const sauceShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.06, 0.06); s.absarc(0, 0, 0.7, -Math.PI / 5.5 + 0.1, Math.PI / 5.5 - 0.1, false); s.lineTo(0.06, 0.06);
    return s;
  }, []);
  const cheeseShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.1, 0.1); s.absarc(0, 0, 0.6, -Math.PI / 5.5 + 0.18, Math.PI / 5.5 - 0.18, false); s.lineTo(0.1, 0.1);
    return s;
  }, []);

  return (
    <Float speed={1.0} rotationIntensity={0.07} floatIntensity={0.11}>
      <group position={position} rotation={[-Math.PI / 2, 0, Math.PI]} castShadow>
        {/* crust */}
        <mesh castShadow>
          <extrudeGeometry args={[baseShape, { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 4 }]} />
          <meshStandardMaterial color="#d4a055" roughness={0.82} />
        </mesh>
        {/* sauce */}
        <mesh position={[0, 0, 0.14]}>
          <extrudeGeometry args={[sauceShape, { depth: 0.025, bevelEnabled: false }]} />
          <meshStandardMaterial color="#c0392b" roughness={0.7} />
        </mesh>
        {/* cheese */}
        <mesh position={[0, 0, 0.165]}>
          <extrudeGeometry args={[cheeseShape, { depth: 0.025, bevelEnabled: false }]} />
          <meshStandardMaterial color="#f5e030" roughness={0.45} metalness={0.05} />
        </mesh>
        {/* pepperoni */}
        {([[0.18, 0.35], [0.35, 0.18], [0.0, 0.5], [0.28, 0.42]] as [number, number][]).map(([px, pz], i) => (
          <Cylinder key={i} args={[0.085, 0.085, 0.04, 20]} position={[px, pz, 0.2]}>
            <meshStandardMaterial color="#8b1a1a" roughness={0.6} />
          </Cylinder>
        ))}
        {/* crust edge bump */}
        <Torus args={[0.82, 0.06, 12, 30, Math.PI / 2.8]} position={[0, 0, 0.07]} rotation={[0, 0, -Math.PI / 5.5]}>
          <meshStandardMaterial color="#c8903a" roughness={0.85} />
        </Torus>
      </group>
    </Float>
  );
}

// ── Chocolate Donut ───────────────────────────────────────────────────────────
function Donut({ position }: { position: [number, number, number] }) {
  const sprinkleColors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#e91e63", "#1abc9c"];
  const sprinkles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (i % 4) * 0.3;
      const r = 0.3 + (i % 3) * 0.1;
      return { x: Math.cos(angle) * r, z: Math.sin(angle) * r, rot: angle, color: sprinkleColors[i % sprinkleColors.length] };
    }), []);

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.15}>
      <group position={position} castShadow>
        {/* dough */}
        <Torus args={[0.44, 0.22, 28, 80]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial color="#9b6b3a" roughness={0.72} />
        </Torus>
        {/* chocolate glaze */}
        <Torus args={[0.44, 0.2, 28, 80]} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#2c1200" roughness={0.35} metalness={0.08} envMapIntensity={0.8} />
        </Torus>
        {/* glaze drips */}
        {[0, 90, 180, 270].map((deg, i) => (
          <Sphere key={i} args={[0.06, 12, 12]}
            position={[Math.cos((deg * Math.PI) / 180) * 0.44, -0.04, Math.sin((deg * Math.PI) / 180) * 0.44]}>
            <meshStandardMaterial color="#2c1200" roughness={0.3} metalness={0.1} />
          </Sphere>
        ))}
        {/* sprinkles */}
        {sprinkles.map((s, i) => (
          <RoundedBox key={i} args={[0.07, 0.028, 0.018]} radius={0.007}
            position={[s.x, 0.12, s.z]} rotation={[0, s.rot, 0]}>
            <meshStandardMaterial color={s.color} roughness={0.35} />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

// ── Floating Particles ────────────────────────────────────────────────────────
function Particles() {
  const count = 40;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.04; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c9a962" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// ── Main Scene ────────────────────────────────────────────────────────────────
export function FoodScene({ scrollProgress, mouse }: FoodSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // scroll-driven camera: top-down → side view
    const camY = THREE.MathUtils.lerp(8.5, 3.5, scrollProgress);
    const camZ = THREE.MathUtils.lerp(0.5, 7, scrollProgress);
    const camFOV = THREE.MathUtils.lerp(42, 55, scrollProgress);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.2, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY + mouse.y * 0.6, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.06);
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, camFOV, 0.05);
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

    // slow auto-rotate when not scrolling
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0025;
    }
  });

  return (
    <group ref={groupRef}>
      <WoodenPlate />
      <Burger position={[-1.7, 0.42, -1.7]} />
      <Fries position={[1.8, 0.38, -1.6]} />
      <PizzaSlice position={[1.7, 0.14, 1.7]} />
      <Donut position={[-1.6, 0.26, 1.7]} />
      <Particles />

      {/* ground shadow */}
      <ContactShadows
        position={[0, -0.1, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
        color="#8B6914"
      />

      {/* environment lighting */}
      <Environment preset="studio" />

      {/* key light */}
      <directionalLight position={[4, 8, 4]} intensity={2.2} castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-far={20} shadow-camera-near={0.1} />
      {/* fill light */}
      <directionalLight position={[-4, 6, -3]} intensity={0.9} color="#fff5e0" />
      {/* rim light */}
      <pointLight position={[0, 6, -4]} intensity={1.2} color="#c9a962" />
      {/* ambient */}
      <ambientLight intensity={0.6} />
    </group>
  );
}
