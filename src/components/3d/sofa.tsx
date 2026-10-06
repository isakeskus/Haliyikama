"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { createFabricMaterial, type SceneUniforms } from "./fabric";

const SEAT_X = [-0.99, 0, 0.99];
const LEGS: [number, number][] = [
  [-1.45, -0.5],
  [1.45, -0.5],
  [-1.45, 0.48],
  [1.45, 0.48],
];

// No two faces share a plane (frame is inset from the arms, cushions float 2cm above the frame),
// otherwise the GPU z-fights and parts of the base flicker in and out.
export function Sofa({ uniforms }: { uniforms: SceneUniforms }) {
  const mats = useMemo(
    () => ({
      cream: createFabricMaterial("#d9d3c9", 1.3, uniforms),
      teal: createFabricMaterial("#0e9fbc", 7.1, uniforms),
      navy: createFabricMaterial("#1b4a8c", 3.7, uniforms),
      frame: new THREE.MeshStandardMaterial({ color: "#10172a", roughness: 0.55, metalness: 0.3 }),
      leg: new THREE.MeshStandardMaterial({ color: "#b98a52", roughness: 0.28, metalness: 0.95 }),
    }),
    [uniforms]
  );

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [mats]);

  return (
    <group>
      {LEGS.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.09, z]} material={mats.leg}>
          <cylinderGeometry args={[0.055, 0.035, 0.18, 14]} />
        </mesh>
      ))}

      <RoundedBox args={[3.3, 0.26, 1.2]} radius={0.06} smoothness={4} position={[0, 0.31, 0.02]} material={mats.frame} />
      <RoundedBox args={[3.5, 1.0, 0.24]} radius={0.1} smoothness={5} position={[0, 0.93, -0.55]} material={mats.cream} />

      {[-1.66, 1.66].map((x) => (
        <RoundedBox key={x} args={[0.34, 0.8, 1.4]} radius={0.12} smoothness={6} position={[x, 0.58, 0]} material={mats.cream} />
      ))}

      {SEAT_X.map((x) => (
        <RoundedBox key={`s${x}`} args={[0.97, 0.27, 1.0]} radius={0.11} smoothness={6} position={[x, 0.615, 0.12]} material={mats.cream} />
      ))}

      {SEAT_X.map((x) => (
        <RoundedBox
          key={`b${x}`}
          args={[0.96, 0.74, 0.3]}
          radius={0.13}
          smoothness={6}
          position={[x, 1.06, -0.36]}
          rotation={[-0.14, 0, 0]}
          material={mats.cream}
        />
      ))}

      <RoundedBox args={[0.52, 0.5, 0.15]} radius={0.07} smoothness={5} position={[-1.05, 1.02, -0.12]} rotation={[-0.12, 0.35, 0.14]} material={mats.teal} />
      <RoundedBox args={[0.46, 0.46, 0.14]} radius={0.07} smoothness={5} position={[1.1, 0.99, -0.1]} rotation={[-0.1, -0.4, -0.12]} material={mats.navy} />
    </group>
  );
}
