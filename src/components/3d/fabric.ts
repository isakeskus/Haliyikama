import * as THREE from "three";

export type SceneUniforms = {
  uFront: { value: number };
  uTime: { value: number };
  // x position of the "shine" highlight sweeping over freshly cleaned fabric (-5 = off)
  uShine: { value: number };
  // inverse world matrix of the scene group, so dirt noise stays glued to the sofa
  // while the group is scaled / dollied by the camera rig
  uInv: { value: THREE.Matrix4 };
};

export function createSceneUniforms(): SceneUniforms {
  return { uFront: { value: -3 }, uTime: { value: 0 }, uShine: { value: -5 }, uInv: { value: new THREE.Matrix4() } };
}

const NOISE = /* glsl */ `
float fab_h13(vec3 p){
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}
float fab_vn(vec3 p){
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(fab_h13(i), fab_h13(i + vec3(1.0,0.0,0.0)), f.x),
        mix(fab_h13(i + vec3(0.0,1.0,0.0)), fab_h13(i + vec3(1.0,1.0,0.0)), f.x), f.y),
    mix(mix(fab_h13(i + vec3(0.0,0.0,1.0)), fab_h13(i + vec3(1.0,0.0,1.0)), f.x),
        mix(fab_h13(i + vec3(0.0,1.0,1.0)), fab_h13(i + vec3(1.0,1.0,1.0)), f.x), f.y),
    f.z);
}
float fab_fbm3(vec3 p){
  float a = 0.5; float s = 0.0;
  for (int i = 0; i < 3; i++) { s += a * fab_vn(p); p = p * 2.02 + vec3(5.2, 1.3, 3.7); a *= 0.5; }
  return s;
}
float fab_fbm2(vec3 p){
  float a = 0.5; float s = 0.0;
  for (int i = 0; i < 2; i++) { s += a * fab_vn(p); p = p * 2.02 + vec3(5.2, 1.3, 3.7); a *= 0.5; }
  return s;
}
`;

// Dirt -> clean sweep driven by a single world-space "front" (uFront) along X.
// Left of the front the fabric is clean; right of it dirty. A foam band rides the edge.
const DIRT = /* glsl */ `
vec3 fabP = (uInv * vec4(vWorldPos, 1.0)).xyz;
float fabEdge = (fabP.x - uFront) + (fab_fbm2(fabP * 3.2 + 4.0) - 0.5) * 0.45;
float fabClean = 1.0 - smoothstep(-0.04, 0.10, fabEdge);
vec3 fabCol = diffuseColor.rgb * 1.12;
if (fabClean < 0.999) {
  float fabBlot = smoothstep(0.44, 0.68, fab_fbm3(fabP * 2.1 + uSeed));
  float fabGrime = smoothstep(0.30, 0.85, fab_fbm2(fabP * 7.0 + uSeed * 1.7));
  float fabDirt = clamp(fabBlot * 0.95 + fabGrime * 0.45 + 0.30, 0.0, 1.0);
  vec3 fabDirty = diffuseColor.rgb * mix(vec3(1.0), vec3(0.30, 0.22, 0.15), fabDirt);
  fabCol = mix(fabDirty, fabCol, fabClean);
}
float fabBand = 1.0 - smoothstep(0.0, 0.34, abs(fabEdge + 0.10));
float fabFoamN = smoothstep(0.42, 0.62, fab_fbm2(fabP * 11.0 + vec3(0.0, uTime * 0.35, 0.0)));
float fabFoam = fabBand * fabFoamN;
fabCol = mix(fabCol, vec3(0.93, 1.0, 1.0), fabFoam * 0.9);
diffuseColor.rgb = fabCol;
vec3 fabGlow = vec3(0.0, 0.32, 0.40) * fabFoam * 0.8 + vec3(0.0, 0.5, 0.6) * fabBand * 0.12;
float fabSweep = smoothstep(0.38, 0.0, abs(fabP.x + fabP.y * 0.35 - uShine)) * fabClean;
fabGlow += vec3(0.55, 0.95, 1.0) * fabSweep * 0.5;
`;

export function createFabricMaterial(color: string, seed: number, shared: SceneUniforms) {
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.92,
    metalness: 0,
    sheen: 0.4,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#ffffff"),
  });

  material.customProgramCacheKey = () => "bursa-fabric-v1";
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFront = shared.uFront;
    shader.uniforms.uTime = shared.uTime;
    shader.uniforms.uInv = shared.uInv;
    shader.uniforms.uShine = shared.uShine;
    shader.uniforms.uSeed = { value: seed };

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWorldPos;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>\nuniform float uFront;\nuniform float uTime;\nuniform float uSeed;\nuniform float uShine;\nuniform mat4 uInv;\nvarying vec3 vWorldPos;\n${NOISE}`
      )
      .replace("#include <color_fragment>", `#include <color_fragment>\n${DIRT}`)
      .replace(
        "#include <roughnessmap_fragment>",
        "#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, roughnessFactor * 0.55, fabClean);"
      )
      .replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\ntotalEmissiveRadiance += fabGlow;"
      );
  };

  return material;
}
