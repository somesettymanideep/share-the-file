import { useEffect, useRef } from "react";

/** Three.js is loaded after mount, never evaluated during SSR. */
export default function ArchitecturalScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch { return; }
      const color = getComputedStyle(element).getPropertyValue("--sea-wire").trim();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(12, 9, 17);
      camera.lookAt(0, 1, 0);
      const group = new THREE.Group();
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
      const geometries: InstanceType<typeof THREE.EdgesGeometry>[] = [];
      for (let i = 0; i < 9; i++) {
        const box = new THREE.BoxGeometry(5 - i * 0.22, 0.7, 3.6);
        const edges = new THREE.EdgesGeometry(box);
        box.dispose(); geometries.push(edges);
        const floor = new THREE.LineSegments(edges, material);
        floor.position.y = i * 0.83 - 2.8;
        floor.rotation.y = i * 0.045;
        group.add(floor);
      }
      scene.add(group);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      element.appendChild(renderer.domElement);
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
      };
      resize();
      const observer = new ResizeObserver(resize); observer.observe(element);
      let visible = true;
      const intersection = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
      intersection.observe(element);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let pointer = 0;
      const move = (event: PointerEvent) => { pointer = (event.clientX / window.innerWidth - 0.5) * 0.15; };
      window.addEventListener("pointermove", move, { passive: true });
      let frame = 0;
      const draw = (time: number) => {
        if (visible) {
          group.rotation.y = reduce.matches ? 0.35 : time * 0.000035 + pointer;
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
      cleanup = () => {
        cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
        window.removeEventListener("pointermove", move);
        geometries.forEach((geometry) => geometry.dispose()); material.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => { /* Editorial content remains available without WebGL. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <div ref={host} className="sea-scene" aria-hidden="true" />;
}