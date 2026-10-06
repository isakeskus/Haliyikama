import { useSyncExternalStore } from "react";

let cached: boolean | undefined;

function detect(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    return !saveData;
  } catch {
    return false;
  }
}

function getSnapshot() {
  if (cached === undefined) cached = detect();
  return cached;
}

const subscribe = () => () => {};

/** null while hydrating, then true/false once the browser has been probed for WebGL. */
export function use3DSupport(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
