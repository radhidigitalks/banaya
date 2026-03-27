"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Torus, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Plate() {
  return (
    <group>
      <Cylinder args={[2.2, 2.4, 0.12, 64]}>
        <meshStandardMaterial color="#f8f8f8" roughness={0.15} metalness={0.05} />
      </Cylinder>
      <Torus args={[2.3, 0.08, 16, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#efefef" roughness={0.2} />
      </Torus>
      <Cylinder args={[1.7, 1.7, 0.04, 64]} position={[0, 0.07, 0]}>
        <meshStandardMaterial color="#fafafa" roughness={0.1} />
      </Cylinder>
    </group>
  );
}

function Burger({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder args={[0.42, 0.45, 0.18, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#c8860a" roughness={0.8} />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.12, 32]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#5a2d0c" roughness={0.9} />
      </Cylinder>
      <RoundedBox args={[0.85, 0.04, 0.85]} radius={0.02} position={[0, 0.22, 0]}>
        <meshStandardMaterial color="#f5c518" roughness={0.6} />
      </RoundedBox>
      <Cylinder args={[0.46, 0.46, 0.06, 32]} position={[0, 0.26, 0]}>
        <meshStandardMaterial color="#4a7c3f" roughness={0.9} />
      </Cylinder>
      <Sphere args={[0.43, 32, 16]} position={[0, 0.46, 0]} scale={[1, 0.65, 1]}>
        <meshStandardMaterial color="#d4920e" roughness={0.75} />
      </Sphere>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <Sphere
          key={i}
          args={[0.03, 8, 8]}
          position={[
            Math.cos((deg * Math.PI) / 180) * 0.22,
            0.72,
            Math.sin((deg * Math.PI) / 180) * 0.22,
          ]}
        >
          <meshStandardMaterial color="#f0e0b0" roughness={0.5} />
        </Sphere>
      ))}
    </group>
  );
}

function Fries({ position }: { position: [number, number, number] }) {
  const fryData: [number, number, number, number][] = [
    [-0.18, 0, -0.05, 0.1],
    [-0.06, 0.05, 0.04, -0.08],
    [0.06, 0, -0.03, 0.12],
    [0.18, 0.03, 0.06, -0.05],
    [-0.12, 0.02, 0.08, 0.06],
    [0.12, 0, -0.08, -0.1],
  ];
  return (
    <group position={position}>
      <RoundedBox args={[0.55, 0.45, 0.45]} radius={0.04}>
        <meshStandardMaterial color="#e8392a" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.56, 0.1, 0.46]} radius={0.02} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
      </RoundedBox>
      {fryData.map(([x, yOff, z, rot], i) => (
        <RoundedBox
          key={i}
          args={[0.07, 0.55, 0.07]}
          radius={0.02}
          position={[x, 0.45 + yOff, z]}
          rotation={[rot, 0, rot * 0.5]}
        >
          <meshStandardMaterial color="#f5c842" roughness={0.6} />
        </RoundedBox>
      ))}
    </group>
  );
}

function PizzaSlice({ position }: { position: [number, number, number] }) {
  const baseShape = new THREE.Shape();
  baseShape.moveTo(0, 0);
  baseShape.absarc(0, 0, 0.7, -Math.PI / 6, Math.PI / 6, false);
  baseShape.lineTo(0, 0);

  const sauceShape = new THREE.Shape();
  sauceShape.moveTo(0.05, 0.05);
  sauceShape.absarc(0, 0, 0.6, -Math.PI / 6 + 0.1, Math.PI / 6 - 0.1, false);
  sauceShape.lineTo(0.05, 0.05);

  const cheeseShape = new THREE.Shape();
  cheeseShape.moveTo(0.08, 0.08);
  cheeseShape.absarc(0, 0, 0.52, -Math.PI / 6 + 0.15, Math.PI / 6 - 0.15, false);
  cheeseShape.lineTo(0.08, 0.08);

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, Math.PI]}>
      <mesh>
        <extrudeGeometry args={[baseShape, { depth: 0.1, bevelEnabled: false }]} />
        <meshStandardMaterial color="#d4a055" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <extrudeGeometry args={[sauceShape, { depth: 0.02, bevelEnabled: false }]} />
        <meshStandardMaterial color="#c0392b" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <extrudeGeometry args={[cheeseShape, { depth: 0.02, bevelEnabled: false }]} />
        <meshStandardMaterial color="#f5e642" roughness={0.5} />
      </mesh>
      {([[0.15, 0.3], [0.3, 0.15], [0.0, 0.42]] as [number, number][]).map(([px, pz], i) => (
        <Cylinder key={i} args={[0.07, 0.07, 0.03, 16]} position={[px, pz, 0.16]}>
          <meshStandardMaterial color="#8b1a1a" roughness={0.6} />
        </Cylinder>
      ))}
    </group>
  );
}

function Donut({ position }: { position: [number, number, number] }) {
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#e91e63"];
  const sprinkles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.4;
    const r = 0.32 + (i % 3) * 0.08;
    return { x: Math.cos(angle) * r, z: Math.sin(angle) * r, rot: angle, color: colors[i % colors.length] };
  });
  return (
    <group position={position}>
      <Torus args={[0.38, 0.18, 24, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </Torus>
      <Torus args={[0.38, 0.16, 24, 64]} position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3d1a00" roughness={0.4} metalness={0.1} />
      </Torus>
      {sprinkles.map((s, i) => (
        <RoundedBox key={i} args={[0.06, 0.025, 0.015]} radius={0.006} position={[s.x, 0.1, s.z]} rotation={[0, s.rot, 0]}>
          <meshStandardMaterial color={s.color} roughness={0.4} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={groupRef}>
      <Plate />
      <Burger position={[-1.5, 0.35, -1.5]} />
      <Fries position={[1.6, 0.3, -1.4]} />
      <PizzaSlice position={[1.5, 0.1, 1.5]} />
      <Donut position={[-1.4, 0.2, 1.5]} />
    </group>
  );
}

export default function FoodCanvas() {
  return (
    <Canvas camera={{ position: [0, 7, 0.1], fov: 45 }} style={{ width: "100%", height: "100%" }} shadows>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 8, -3]} intensity={0.8} color="#fff5e0" />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  );
}
