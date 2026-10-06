"use client";

import type { Ref } from "react";
import type * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

// Floating steam wand. Local origin = centre of the nozzle head, flat side down.
export function Wand({ ref }: { ref?: Ref<THREE.Group> }) {
  return (
    <group ref={ref}>
      <RoundedBox args={[0.62, 0.07, 0.26]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#0b1224" metalness={0.65} roughness={0.22} />
      </RoundedBox>
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.54, 0.014, 0.19]} />
        <meshBasicMaterial color="#67e8f9" toneMapped={false} />
      </mesh>

      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.05, 20, 14]} />
        <meshStandardMaterial color="#c9d3e0" metalness={1} roughness={0.2} />
      </mesh>

      <group position={[0, 0.06, 0]} rotation={[0.95, 0, -0.22]}>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.44, 18]} />
          <meshStandardMaterial color="#c9d3e0" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.28, 0]}>
          <cylinderGeometry args={[0.052, 0.052, 0.36, 20]} />
          <meshStandardMaterial color="#0c1426" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.056, 0.056, 0.03, 20]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.47, 0]}>
          <sphereGeometry args={[0.055, 16, 12]} />
          <meshStandardMaterial color="#0c1426" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>

      <pointLight color="#22d3ee" intensity={3.2} distance={2.2} decay={2} position={[0, 0.18, 0]} />
    </group>
  );
}
