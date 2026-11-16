import { useEffect, useRef, type RefObject } from "react";
import { VALUES_DRAWING } from "@/lib/values-drawing";

export function useValuesDrawing(root: RefObject<HTMLElement | null>) {
  const progress = useRef(VALUES_DRAWING.map(() => 1));
  const render = useRef<(() => void) | null>(null);
  const update = (index: number, value: number) => {
    progress.current[index] = value;
    const fallback = root.current?.querySelectorAll<SVGPolylineElement>(".defines-drawing polyline")[index];
    if (fallback) fallback.style.strokeDashoffset = String(1 - value);
    render.current?.();
  };

  useEffect(() => {
    const host = root.current?.querySelector<HTMLElement>(".defines-drawing");
    const canvas = host?.querySelector("canvas");
    if (!host || !canvas) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
      catch { host.dataset['sceneReady'] = "svg"; return; }
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(40, 490, -550, -935, 0.1, 10);
      camera.position.z = 1;
      const material = new THREE.LineBasicMaterial({ color: getComputedStyle(host).getPropertyValue("--defines-accent").trim() });
      const lines = VALUES_DRAWING.map((points) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points.map(([x, y]) => new THREE.Vector3(x, -y, 0)));
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        return line;
      });
      const draw = () => {
        lines.forEach((line, index) => line.geometry.setDrawRange(0, Math.ceil((VALUES_DRAWING[index]?.length ?? 0) * (progress.current[index] ?? 1))));
        renderer.render(scene, camera);
      };
      render.current = draw;
      const resize = () => {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(host.clientWidth, host.clientHeight, false);
        draw();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();
      host.dataset['sceneReady'] = "webgl";
      cleanup = () => {
        observer.disconnect();
        lines.forEach((line) => line.geometry.dispose());
        material.dispose();
        renderer.dispose();
        render.current = null;
      };
    }).catch(() => { host.dataset['sceneReady'] = "svg"; });
    return () => { disposed = true; cleanup?.(); };
  }, [root]);
  return update;
}