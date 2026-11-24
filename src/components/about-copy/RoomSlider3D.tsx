import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getProject } from "@/lib/projects";
import manjunatha from "@/assets/sea-project-manjunatha-constructions.jpg";

interface RoomProject {
  slug: string;
  title: string;
  description: string;
  image: string;
  ar: number;
}

const ROOM_PROJECT_DEFS = [
  {
    slug: "manjunatha-constructions",
    ar: 1.137,
    title: "Manjunatha Constructions",
    description: "A four-level residence wrapped in colour-blocked perforated screens and climbing vines that filter light and cool the balconies.",
  },
  {
    slug: "sarika-estate",
    ar: 1.80,
    title: "Sarika Estate",
    description: "A gated villa community beside the highway, anchored by a tiled-roof convention centre, a parking court and a landscaped entry.",
  },
  {
    slug: "mantralayam",
    ar: 1.62,
    title: "Mantralayam",
    description: "A multi-level conventions and service apartments development with a vibrant commercial streetscape and refined stone-clad facade.",
  },
  {
    slug: "krishna-sindhura-hospital",
    ar: 1.93,
    title: "Krishna Sindhura Hospital",
    description: "A multi-block healthcare campus joined by a glazed atrium and a sky-garden podium, planned around a clear, calm arrival.",
  },
  {
    slug: "gangadhar-estate",
    ar: 1.82,
    title: "Gangadhar Estate",
    description: "A slender tower whose sculpted slab edges sweep across the façade, glowing warm against the evening sky.",
  },
  {
    slug: "kishore-jain-kms-infra",
    ar: 1.76,
    title: "Kishore Jain KMS Infra",
    description: "Stepped residential terraces with continuous planted balconies that give every home a green edge.",
  },
];

const W = 1000;
const N = ROOM_PROJECT_DEFS.length;
const STEP = 360 / N;
const A = W / 2 / Math.tan(Math.PI / N);
const RC = W / 2 / Math.sin(Math.PI / N);
const BACK = 200;
const FH = 380;
const mod = (a: number, n: number) => ((a % n) + n) % n;

export default function RoomSlider3D() {
  const [pos, setPos] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const [activeProject, setActiveProject] = useState<RoomProject | null>(null);
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<{ startX: number; moved: boolean }>({ startX: 0, moved: false });

  // Resolve project images and data
  const projects: RoomProject[] = ROOM_PROJECT_DEFS.map((def) => {
    const proj = getProject(def.slug);
    return {
      slug: def.slug,
      title: def.title,
      description: def.description,
      image: proj?.image ?? manjunatha,
      ar: def.ar,
    };
  });

  const activeIndex = mod(pos, N);

  const rel = useCallback((i: number, currentPos: number) => {
    const r = mod(i - mod(currentPos, N), N);
    return r > N / 2 ? r - N : r;
  }, []);

  const go = useCallback((step: number) => {
    if (!step) return;
    setIsOut(true);
    setPos((prev) => prev + step);
  }, []);

  // Update active project info after short transition
  useEffect(() => {
    const current = projects[activeIndex];
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActiveProject(current ?? null);
      setIsOut(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setActiveProject(current ?? null);
      setIsOut(false);
    }, 380);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  // Initial active project
  useEffect(() => {
    if (!activeProject) {
      setActiveProject(projects[0] ?? null);
    }
  }, [activeProject, projects]);

  // Responsive scale and resize handler
  useEffect(() => {
    const sec = secRef.current;
    const stage = stageRef.current;
    if (!sec || !stage) return;

    const fit = () => {
      const w = sec.clientWidth;
      const h = sec.clientHeight;
      const s = w < 900 ? Math.min(w / 640, h / 840) : Math.min(w / 1400, h / 820);
      sec.style.setProperty("--s", s.toString());
      stage.style.transform = `scale(${s})`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Gentle parallax on pointermove
  useEffect(() => {
    const sec = secRef.current;
    const stage = stageRef.current;
    if (!sec || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const xPct = 50 + (e.clientX / sec.clientWidth - 0.5) * 6;
      const yPct = 50 + (e.clientY / sec.clientHeight - 0.5) * 6;
      stage.style.perspectiveOrigin = `${xPct}% ${yPct}%`;
    };

    sec.addEventListener("pointermove", onPointerMove);
    return () => sec.removeEventListener("pointermove", onPointerMove);
  }, []);

  // Keyboard navigation when visible
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  // Pointer swipe gestures
  const onPointerDown = (e: React.PointerEvent) => {
    swipeRef.current = { startX: e.clientX, moved: false };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const { startX } = swipeRef.current;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) {
      swipeRef.current.moved = true;
      go(dx < 0 ? 1 : -1);
      setTimeout(() => {
        swipeRef.current.moved = false;
      }, 50);
    }
  };

  // Ceiling and floor polygon points
  const pts = Array.from({ length: N }, (_, k) => {
    const f = ((k + 0.5) * STEP * Math.PI) / 180;
    return `${50 + Math.sin(f) * 50}% ${50 - Math.cos(f) * 50}%`;
  }).join(", ");

  return (
    <section
      ref={secRef}
      id="projects"
      className="sea2-room-section"
      aria-label="3D Architecture Gallery"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        ref={stageRef}
        className="sea2-room-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="3D Project Room"
      >
        <div
          ref={ringRef}
          className="sea2-room-ring"
          style={{
            transform: `translateZ(${-BACK}px) rotateY(${pos * STEP}deg)`,
          }}
        >
          {/* Ceiling plane */}
          <div
            className="sea2-room-plane sea2-room-ceil"
            style={{
              width: `${RC * 2}px`,
              height: `${RC * 2}px`,
              left: `${-RC}px`,
              top: `${-RC}px`,
              background: "linear-gradient(#eef4f4, #dce8e9)",
              clipPath: `polygon(${pts})`,
              transform: "translateY(-310px) rotateX(90deg)",
            }}
          />

          {/* Floor plane */}
          <div
            className="sea2-room-plane sea2-room-floor"
            style={{
              width: `${RC * 2}px`,
              height: `${RC * 2}px`,
              left: `${-RC}px`,
              top: `${-RC}px`,
              background: "radial-gradient(circle at 50% 50%, #bacdd1, #98b0b5 70%)",
              clipPath: `polygon(${pts})`,
              transform: "translateY(310px) rotateX(90deg)",
            }}
          />

          {/* 6 Walls in 3D */}
          {projects.map((p, i) => {
            const r = rel(i, pos);
            const fw = Math.round(Math.min(700, Math.max(380, FH * p.ar)));
            const isClickable = Math.abs(r) !== 0;

            return (
              <div
                key={p.slug}
                className="sea2-room-wall"
                data-rel={r}
                style={{
                  transform: `rotateY(${-i * STEP}deg) translateZ(${-A}px)`,
                }}
              >
                <button
                  type="button"
                  className="sea2-room-frame"
                  style={{
                    width: `${fw + 20}px`,
                    height: `${FH + 20}px`,
                    left: `${(W - fw - 20) / 2}px`,
                  }}
                  tabIndex={Math.abs(r) === 1 ? 0 : -1}
                  aria-hidden={r === 0}
                  aria-label={`Show ${p.title}`}
                  onClick={() => {
                    if (!swipeRef.current.moved && isClickable) {
                      go(r);
                    }
                  }}
                >
                  <img src={p.image} alt={p.title} draggable={false} />
                </button>
                <div className="sea2-room-plaque">{p.title}</div>
                <div className="sea2-room-shade" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Project Information Overlay */}
      {activeProject && (
        <div className={`sea2-room-info ${isOut ? "out" : ""}`} aria-live="polite">
          <h2>{activeProject.title}</h2>
          <p>{activeProject.description}</p>
          <Link
            to="/projects/$slug"
            params={{ slug: activeProject.slug }}
            className="sea2-room-btn"
            aria-label={`View project: ${activeProject.title}`}
          >
            View Project →
          </Link>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        type="button"
        className="sea2-room-arrow prev"
        aria-label="Previous project"
        onClick={() => go(-1)}
      >
        <svg width="30" height="14" viewBox="0 0 30 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M29 7H1M7 1 1 7l6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="sea2-room-arrow next"
        aria-label="Next project"
        onClick={() => go(1)}
      >
        <svg width="30" height="14" viewBox="0 0 30 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 7h28M23 1l6 6-6 6" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="sea2-room-dots" role="tablist" aria-label="Select 3D project">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="sea2-room-dot"
            aria-label={`Show ${p.title}`}
            aria-current={i === activeIndex}
            onClick={() => go(rel(i, pos))}
          />
        ))}
      </div>
    </section>
  );
}
