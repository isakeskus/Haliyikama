"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { SofaScene } from "./sofa-scene";

export default function SofaCanvas({
  progress,
  active,
  onReady,
}: {
  progress: MotionValue<number>;
  active: boolean;
  onReady?: () => void;
}) {
  const compact = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 2, 7], fov: 32, near: 1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.95;
        onReady?.();
      }}
    >
      <SofaScene progress={progress} />
    </Canvas>
  );
}
