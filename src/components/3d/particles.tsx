/* eslint-disable react-hooks/immutability -- three.js objects are mutated imperatively inside the R3F render loop */
"use client";

import { useEffect, useMemo, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { SceneUniforms } from "./fabric";

export type Emitter = { x: number; active: boolean; rate: number };

const BUBBLES = 170;
const STEAM = 40;
const SPARKLES = 60;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// pixels-per-world-unit factor so gl_PointSize shrinks with distance like real geometry
function usePointScale(target: { value: number }) {
  useFrame(({ gl, size, camera }) => {
    const fov = (camera as THREE.PerspectiveCamera).fov;
    target.value = (size.height * gl.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2));
  });
}

/* ------------------------------------------------------------------ */
/* Foam bubbles: GPU-animated instanced spheres, ring-buffer spawning  */
/* ------------------------------------------------------------------ */

const BUBBLE_VERT = /* glsl */ `
attribute vec4 aSpawn;
attribute vec4 aParams;
uniform float uTime;
varying vec3 vN;
varying vec3 vV;
varying float vA;
varying float vHue;
void main() {
  float age = uTime - aSpawn.w;
  float life = 2.8;
  float k = clamp(age / life, 0.0, 1.0);
  float alive = step(0.0, age) * (1.0 - step(1.0, k));
  vec3 c = aSpawn.xyz;
  c.y += age * aParams.y * 0.32;
  c.x += sin(age * 1.8 + aParams.z) * 0.07 * aParams.w;
  c.z += cos(age * 1.4 + aParams.z) * 0.07 * aParams.w;
  float grow = smoothstep(0.0, 0.1, k) * (1.0 - smoothstep(0.78, 1.0, k));
  float s = aParams.x * grow * alive;
  vec4 wp = modelMatrix * vec4(c + position * s, 1.0);
  vec4 mv = viewMatrix * wp;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal);
  vV = normalize(-mv.xyz);
  vA = alive * grow;
  vHue = aParams.z * 0.15;
  gl_Position = projectionMatrix * mv;
}`;

const BUBBLE_FRAG = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
varying float vA;
varying float vHue;
void main() {
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
  vec3 irid = 0.55 + 0.45 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + f * 1.1 + vHue));
  vec3 col = mix(vec3(0.82, 0.97, 1.0), irid, 0.65);
  gl_FragColor = vec4(col, (0.07 + f * 0.8) * vA);
}`;

export function Bubbles({ emitter, uniforms }: { emitter: RefObject<Emitter>; uniforms: SceneUniforms }) {
  const sys = useMemo(() => {
    const base = new THREE.SphereGeometry(1, 14, 10);
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.index = base.index;
    geometry.setAttribute("position", base.getAttribute("position"));
    geometry.setAttribute("normal", base.getAttribute("normal"));

    const spawn = new Float32Array(BUBBLES * 4);
    for (let i = 0; i < BUBBLES; i++) spawn[i * 4 + 3] = -1e4;
    const aSpawn = new THREE.InstancedBufferAttribute(spawn, 4);
    const aParams = new THREE.InstancedBufferAttribute(new Float32Array(BUBBLES * 4), 4);
    aSpawn.setUsage(THREE.DynamicDrawUsage);
    aParams.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("aSpawn", aSpawn);
    geometry.setAttribute("aParams", aParams);
    geometry.instanceCount = BUBBLES;

    const material = new THREE.ShaderMaterial({
      vertexShader: BUBBLE_VERT,
      fragmentShader: BUBBLE_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: uniforms.uTime },
    });

    return { geometry, material, aSpawn, aParams, cursor: { i: 0, acc: 0 } };
  }, [uniforms]);

  useEffect(() => {
    return () => {
      sys.geometry.dispose();
      sys.material.dispose();
    };
  }, [sys]);

  useFrame((_, delta) => {
    const e = emitter.current;
    if (!e.active) return;
    sys.cursor.acc += Math.min(delta, 0.05) * e.rate;
    let spawned = 0;
    while (sys.cursor.acc >= 1 && spawned < 6) {
      sys.cursor.acc -= 1;
      const x = e.x + (Math.random() - 0.75) * 0.9;
      if (Math.abs(x) > 1.9) continue;
      const onBack = Math.random() < 0.35;
      const i = sys.cursor.i++ % BUBBLES;
      sys.aSpawn.setXYZW(
        i,
        x,
        onBack ? 0.85 + Math.random() * 0.5 : 0.74 + Math.random() * 0.03,
        onBack ? -0.3 : -0.35 + Math.random() * 0.95,
        uniforms.uTime.value
      );
      sys.aParams.setXYZW(i, 0.035 + Math.random() * 0.085, 0.5 + Math.random() * 0.9, Math.random() * 6.283, 0.5 + Math.random());
      spawned++;
    }
    if (spawned) {
      sys.aSpawn.needsUpdate = true;
      sys.aParams.needsUpdate = true;
    }
  });

  return <mesh geometry={sys.geometry} material={sys.material} frustumCulled={false} renderOrder={2} />;
}

/* ------------------------------------------------------------------ */
/* Steam: soft rising sprites                                          */
/* ------------------------------------------------------------------ */

const STEAM_VERT = /* glsl */ `
attribute vec4 aSpawn;
attribute vec4 aParams;
uniform float uTime;
uniform float uScale;
varying float vA;
void main() {
  float age = uTime - aSpawn.w;
  float life = 2.2;
  float k = clamp(age / life, 0.0, 1.0);
  float alive = step(0.0, age) * (1.0 - step(1.0, k));
  vec3 p = aSpawn.xyz;
  p.y += age * aParams.y * 0.5;
  p.x += sin(age * 1.1 + aParams.z) * 0.12;
  p.z += cos(age * 0.9 + aParams.z) * 0.10;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float size = aParams.x * (0.5 + k * 1.8);
  gl_PointSize = size * uScale / -mv.z * alive;
  vA = alive * smoothstep(0.0, 0.12, k) * (1.0 - k) * 0.5;
  gl_Position = projectionMatrix * mv;
}`;

const STEAM_FRAG = /* glsl */ `
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vec3(0.86, 0.97, 1.0), a * a * vA);
}`;

export function Steam({ headRef, emitter, uniforms }: { headRef: RefObject<THREE.Group | null>; emitter: RefObject<Emitter>; uniforms: SceneUniforms }) {
  const sys = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const spawn = new Float32Array(STEAM * 4);
    for (let i = 0; i < STEAM; i++) spawn[i * 4 + 3] = -1e4;
    const aSpawn = new THREE.BufferAttribute(spawn, 4);
    const aParams = new THREE.BufferAttribute(new Float32Array(STEAM * 4), 4);
    aSpawn.setUsage(THREE.DynamicDrawUsage);
    aParams.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(STEAM * 3), 3));
    geometry.setAttribute("aSpawn", aSpawn);
    geometry.setAttribute("aParams", aParams);

    const uScale = { value: 800 };
    const material = new THREE.ShaderMaterial({
      vertexShader: STEAM_VERT,
      fragmentShader: STEAM_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: uniforms.uTime, uScale },
    });

    return { geometry, material, aSpawn, aParams, uScale, cursor: { i: 0, acc: 0 } };
  }, [uniforms]);

  useEffect(() => {
    return () => {
      sys.geometry.dispose();
      sys.material.dispose();
    };
  }, [sys]);

  usePointScale(sys.uScale);

  useFrame((_, delta) => {
    const e = emitter.current;
    const head = headRef.current;
    if (!e.active || !head) return;
    sys.cursor.acc += Math.min(delta, 0.05) * 9;
    let spawned = 0;
    while (sys.cursor.acc >= 1 && spawned < 3) {
      sys.cursor.acc -= 1;
      const i = sys.cursor.i++ % STEAM;
      sys.aSpawn.setXYZW(
        i,
        head.position.x + (Math.random() - 0.5) * 0.4,
        head.position.y + 0.06,
        head.position.z + (Math.random() - 0.5) * 0.2,
        uniforms.uTime.value
      );
      sys.aParams.setXYZW(i, 0.55 + Math.random() * 0.5, 0.5 + Math.random() * 0.7, Math.random() * 6.283, 0);
      spawned++;
    }
    if (spawned) {
      sys.aSpawn.needsUpdate = true;
      sys.aParams.needsUpdate = true;
    }
  });

  return <points geometry={sys.geometry} material={sys.material} frustumCulled={false} renderOrder={3} />;
}

/* ------------------------------------------------------------------ */
/* Sparkles: twinkle on already-cleaned fabric                         */
/* ------------------------------------------------------------------ */

const SPARKLE_VERT = /* glsl */ `
attribute float aPhase;
uniform float uTime;
uniform float uFront;
uniform float uScale;
varying float vA;
void main() {
  float clean = smoothstep(0.0, 0.5, uFront - 0.15 - position.x);
  float tw = pow(max(0.0, sin(uTime * 1.7 + aPhase * 6.2831)), 8.0);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (0.10 + tw * 0.16) * uScale / -mv.z * clean;
  vA = tw * clean;
  gl_Position = projectionMatrix * mv;
}`;

const SPARKLE_FRAG = /* glsl */ `
varying float vA;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float glow = smoothstep(0.5, 0.0, length(c));
  float cross = smoothstep(0.07, 0.0, abs(c.x)) * smoothstep(0.5, 0.0, abs(c.y))
              + smoothstep(0.07, 0.0, abs(c.y)) * smoothstep(0.5, 0.0, abs(c.x));
  gl_FragColor = vec4(vec3(0.8, 0.98, 1.0), (glow * glow * 0.6 + cross) * vA);
}`;

export function Sparkles({ uniforms }: { uniforms: SceneUniforms }) {
  const sys = useMemo(() => {
    const rnd = mulberry32(7);
    const positions = new Float32Array(SPARKLES * 3);
    const phases = new Float32Array(SPARKLES);
    for (let i = 0; i < SPARKLES; i++) {
      const zone = rnd();
      const x = (rnd() - 0.5) * 3.5;
      if (zone < 0.45) {
        positions.set([x, 0.78 + rnd() * 0.1, -0.2 + rnd() * 0.8], i * 3);
      } else if (zone < 0.85) {
        positions.set([x, 0.85 + rnd() * 0.6, -0.22 + rnd() * 0.08], i * 3);
      } else {
        positions.set([rnd() < 0.5 ? -1.66 : 1.66, 0.98 + rnd() * 0.08, (rnd() - 0.5) * 1.1], i * 3);
      }
      phases[i] = rnd();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const uScale = { value: 800 };
    const material = new THREE.ShaderMaterial({
      vertexShader: SPARKLE_VERT,
      fragmentShader: SPARKLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: uniforms.uTime, uFront: uniforms.uFront, uScale },
    });
    return { geometry, material, uScale };
  }, [uniforms]);

  useEffect(() => {
    return () => {
      sys.geometry.dispose();
      sys.material.dispose();
    };
  }, [sys]);

  usePointScale(sys.uScale);

  return <points geometry={sys.geometry} material={sys.material} frustumCulled={false} renderOrder={4} />;
}
