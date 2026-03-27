"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FoodScene } from "./food-scene";

interface FoodCanvasProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#c9a962" wireframe />
    </mesh>
  );
}

export default function FoodCanvas({ scrollProgress, mouse }: FoodCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 8.5, 0.5], fov: 42, near: 0.1, far: 100 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={<Loader />}>
        <FoodScene scrollProgress={scrollProgress} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
