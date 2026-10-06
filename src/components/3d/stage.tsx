"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const RADIAL_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const RADIAL_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uPower;
varying vec2 vUv;
void main() {
  float d = length((vUv - 0.5) * 2.0);
  float a = pow(clamp(1.0 - d, 0.0, 1.0), uPower) * uAlpha;
  gl_FragColor = vec4(uColor, a);
}`;

function useRadialMaterial(color: string, alpha: number, power: number) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: RADIAL_VERT,
        fragmentShader: RADIAL_FRAG,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uAlpha: { value: alpha },
          uPower: { value: power },
        },
      }),
    [color, alpha, power]
  );
}

// Showroom platform: dark glossy disc, glowing rim, a scanner arc that keeps orbiting,
// a soft aqua pool of light and a contact shadow. Decals are lifted well off the disc
// (and polygon-offset) so they never z-fight with it.
export function Stage() {
  const glow = useRadialMaterial("#22d3ee", 0.34, 1.6);
  const shadow = useRadialMaterial("#000000", 0.62, 1.15);
  const scanner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (scanner.current) scanner.current.rotation.z -= Math.min(delta, 0.05) * 0.9;
  });

  return (
    <group>
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[3.5, 3.62, 0.18, 96]} />
        <meshStandardMaterial color="#0a1630" metalness={0.5} roughness={0.55} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} material={glow} renderOrder={1}>
        <circleGeometry args={[3.45, 64]} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 0]}>
        <ringGeometry args={[3.36, 3.44, 128]} />
        <meshBasicMaterial color="#67e8f9" toneMapped={false} polygonOffset polygonOffsetFactor={-3} polygonOffsetUnits={-3} />
      </mesh>

      <mesh ref={scanner} rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.68, 2.74, 96, 1, 0, Math.PI * 1.35]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.75} toneMapped={false} polygonOffset polygonOffsetFactor={-4} polygonOffsetUnits={-4} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.04, 0.05]} material={shadow} renderOrder={2}>
        <planeGeometry args={[4.9, 2.3]} />
      </mesh>
    </group>
  );
}
