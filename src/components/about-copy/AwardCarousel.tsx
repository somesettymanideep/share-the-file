import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import awardIndiaDesign from "@/assets/sea-award-india-design.png.asset.json";
import awardBharatBusiness from "@/assets/sea-award-bharat-business.png.asset.json";
import awardArchitectureHerald from "@/assets/sea-award-architecture-herald.png.asset.json";

export type Award = {
  title: string;
  category: string;
  organization: string;
  year: string;
  description: string;
  image: { url: string };
  alt: string;
};

// Single structured data source — edit award details here.
const AWARDS: Award[] = [
  {
    title: "The India Design Awards",
    category: "Design",
    organization: "India Design Awards",
    year: "2024",
    description:
      "Recognised for design excellence that blends creativity with practicality, bringing visionary architectural concepts to life.",
    image: awardIndiaDesign,
    alt: "P.V. Naresh Kumar receiving the India Design Awards 2024 plaque on stage",
  },
  {
    title: "Bharat Business Awards",
    category: "Excellence",
    organization: "Bharat Business Awards",
    year: "2024",
    description:
      "Honoured for outstanding contribution to architecture and business excellence, reflecting a passion for timeless design.",
    image: awardBharatBusiness,
    alt: "P.V. Naresh Kumar receiving the Bharat Business Awards 2024 trophy and certificate",
  },
  {
    title: "Architectural Excellence Award",
    category: "Architecture",
    organization: "Architecture Herald",
    year: "2025",
    description:
      "Celebrated for architectural excellence and innovative spaces that inspire and endure across residential and commercial work.",
    image: awardArchitectureHerald,
    alt: "P.V. Naresh Kumar holding the Architectural Excellence Award 2025 trophy and certificate at the Architecture Herald event",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function AwardCarousel() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const animating = useRef(false);
  const count = AWARDS.length;

  const goTo = (index: number) => {
    const next = (index + count) % count;
    if (next === active || animating.current) return;
    setActive(next);
  };

  // Cinematic transition whenever the active award changes.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animating.current = true;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => { animating.current = false; } });
      tl.fromTo(".awc-image img", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0)
        .fromTo(".awc-title", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.05)
        .fromTo(".awc-meta, .awc-description", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }, 0.15);
    }, el);
    return () => { ctx.revert(); animating.current = false; };
  }, [active]);

  const award = AWARDS[active] ?? AWARDS[0]!;

  return (
    <section
      className="sea2-awards awc"
      ref={root}
      aria-label="Awards and recognition"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
      }}
    >
      <div className="awc-grid">
        <div className="awc-info">
          <div className="awc-top">
            <span className="awc-label">Awards & Recognition</span>
            <span className="awc-counter">{pad(active + 1)} / {pad(count)}</span>
          </div>
          <span className="awc-badge">{award.category}</span>
          <h2 className="awc-title">{award.title}</h2>
          <p className="awc-meta">{award.organization} · {award.year}</p>
          <p className="awc-description">{award.description}</p>

          <ul className="awc-list">
            {AWARDS.map((a, i) => (
              <li key={a.title}>
                <button
                  type="button"
                  className={"awc-item" + (i === active ? " is-active" : "")}
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className="awc-item-index">{pad(i + 1)}</span>
                  <span className="awc-item-title">{a.title}</span>
                  <span className="awc-item-line" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="awc-nav">
            <button type="button" className="awc-arrow" aria-label="Previous award" onClick={() => goTo(active - 1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="awc-arrow" aria-label="Next award" onClick={() => goTo(active + 1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="awc-visual">
          <div className="awc-image">
            <img key={award.title} src={award.image.url} alt={award.alt} loading={active === 0 ? "eager" : "lazy"} />
          </div>
        </div>
      </div>
    </section>
  );
}
