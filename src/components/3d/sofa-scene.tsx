/* eslint-disable react-hooks/immutability -- three.js objects are mutated imperatively inside the R3F render loop */
"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { createSceneUniforms } from "./fabric";
import { Sofa } from "./sofa";
import { Wand } from "./wand";
import { Stage } from "./stage";
import { Bubbles, Steam, Sparkles, type Emitter } from "./particles";

const { clamp, lerp, damp, degToRad, smoothstep } = THREE.MathUtils;

export function SofaScene({ progress }: { progress: MotionValue<number> }) {
  const uniforms = useMemo(() => createSceneUniforms(), []);
  const root = useRef<THREE.Group>(null);
  const wand = useRef<THREE.Group>(null);
  const emitter = useRef<Emitter>({ x: 0, active: false, rate: 0 });
  const sim = useRef({ front: -2.8, last: -2.8, az: -0.2, h: 2, dist: 7, gx: 0, gy: 0, gs: 0.8, spin: -0.5, wash: 0, ready: false });

  useFrame((state, delta) => {
    const group = root.current;
    const w = wand.current;
    if (!group || !w) return;

    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const s = sim.current;
    const cam = state.camera as THREE.PerspectiveCamera;
    const p = clamp(progress.get(), 0, 1);

    // 1) cleaning front: scroll progress -> world X across the sofa
    const target = lerp(-2.7, 2.7, clamp((p - 0.02) / 0.88, 0, 1));
    s.front = s.ready ? damp(s.front, target, 6, dt) : target;
    const vel = (s.front - s.last) / Math.max(dt, 1e-4);
    s.last = s.front;
    uniforms.uFront.value = s.front;
    uniforms.uTime.value = t;

    // 2) wand rides the foam edge, sweeping front-to-back; lifts off when outside the sofa
    const outside = smoothstep(Math.abs(s.front), 1.78, 2.5);
    const hx = lerp(clamp(s.front - 0.12, -1.95, 1.95), Math.sign(s.front) * 1.3, outside * 0.85);
    const zig = Math.sin(s.front * 5 + 0.4);
    w.position.set(hx, 0.79 + Math.sin(t * 9) * 0.008 + outside * 1.1, 0.12 + zig * 0.36);
    w.rotation.z = damp(w.rotation.z, clamp(-vel * 0.03, -0.35, 0.35), 8, dt);
    w.rotation.y = Math.cos(s.front * 5 + 0.4) * 0.18;

    const speed = Math.abs(vel);
    const e = emitter.current;
    e.active = speed > 0.04 && outside < 0.35;
    e.rate = 14 + Math.min(46, speed * 26);
    e.x = hx;

    // turntable: the platform keeps rotating (slower while the wand is working so the foam
    // front stays readable), and a glossy highlight sweeps the fabric once it is fully clean
    s.wash = damp(s.wash, e.active ? 1 : 0, 3, dt);
    s.spin += dt * lerp(0.34, 0.07, s.wash);
    const done = smoothstep(p, 0.86, 0.97);
    uniforms.uShine.value = done > 0.01 ? lerp(-2.6, 2.6, (t * 0.45) % 1) : -5;

    // 3) camera rig: dolly with the story, subtle pointer parallax
    const bell = 4 * p * (1 - p);
    const az = lerp(-0.22, 0.08, p) + state.pointer.x * 0.1;
    const h = lerp(2, 2.85, bell) + state.pointer.y * 0.12;
    const dist = lerp(7, 6, bell);
    if (s.ready) {
      s.az = damp(s.az, az, 3, dt);
      s.h = damp(s.h, h, 3, dt);
      s.dist = damp(s.dist, dist, 3, dt);
    } else {
      s.az = az;
      s.h = h;
      s.dist = dist;
    }
    cam.position.set(Math.sin(s.az) * s.dist, s.h, Math.cos(s.az) * s.dist);
    cam.lookAt(0, 0.8, 0);

    // 4) responsive placement: right half on wide screens, lower-centre on portrait
    const aspect = state.size.width / state.size.height;
    const visH = 2 * s.dist * Math.tan(degToRad(cam.fov / 2));
    const visW = visH * aspect;
    const wide = aspect > 1.15;
    const gs = clamp((wide ? visW * 0.5 : visW * 0.98) / 3.9, 0.3, 1.3);
    const gx = wide ? visW * 0.235 : 0;
    const gy = wide ? -visH * 0.04 : -visH * 0.04;
    if (s.ready) {
      s.gs = damp(s.gs, gs, 4, dt);
      s.gx = damp(s.gx, gx, 4, dt);
      s.gy = damp(s.gy, gy, 4, dt);
    } else {
      s.gs = gs;
      s.gx = gx;
      s.gy = gy;
      s.ready = true;
    }
    group.scale.setScalar(s.gs);
    group.position.set(s.gx, s.gy + Math.sin(t * 0.9) * 0.025, 0);
    group.rotation.y = s.spin;
    group.updateMatrixWorld();
    uniforms.uInv.value.copy(group.matrixWorld).invert();
  });

  return (
    <>
      <ambientLight intensity={0.24} />
      <directionalLight position={[3.5, 6, 5]} intensity={1.45} color="#fff3e2" />
      <directionalLight position={[0, 5, -6]} intensity={1.1} color="#ffe9d2" />
      <directionalLight position={[-5, 3.5, -4]} intensity={1.7} color="#22d3ee" />
      <directionalLight position={[5, 2, -3]} intensity={0.8} color="#7c6bff" />

      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.1} position={[0, 5, 3]} scale={[9, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#22d3ee" position={[-6, 2, 1]} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={0.6} color="#ffffff" position={[5, 3, 4]} scale={3} />
      </Environment>

      <group ref={root}>
        <Stage />
        <Sofa uniforms={uniforms} />
        <Wand ref={wand} />
        <Bubbles emitter={emitter} uniforms={uniforms} />
        <Steam headRef={wand} emitter={emitter} uniforms={uniforms} />
        <Sparkles uniforms={uniforms} />
      </group>
    </>
  );
}
