import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { getProjectGallery, type SeaProject } from "@/lib/projects";

/**
 * Scroll-triggered project gallery: the section pins for one viewport per
 * photograph and scrolling dissolves each image into the next through a
 * smooth fade animation. Falls back to a plain full-screen image when a project
 * has a single photograph.
 */
export default function ProjectMorphGallery({ project }: { project: SeaProject }) {
  const slides = getProjectGallery(project).filter((slide) => slide.image !== null);
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count < 2) return;
    const read = () => {
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / Math.max(total, 1), 0), 1);
      setIndex(Math.round(progress * (count - 1)));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [count]);

  useEffect(() => {
    const caption = captionRef.current;
    if (!caption || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(caption.querySelector("h1"), { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" });
      gsap.fromTo(caption.querySelector("p"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    }, caption);
    return () => context.revert();
  }, [project.slug]);

  const scrollToSlide = useCallback((target: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + (total * target) / Math.max(count - 1, 1);
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [count]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollToSlide(Math.max(0, index - 1));
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      scrollToSlide(Math.min(count - 1, index + 1));
    }
  }, [count, index, scrollToSlide]);

  return <section
    ref={sectionRef}
    className="project-morph"
    style={{ height: count > 1 ? `${count * 100}svh` : "100svh" }}
    aria-label={`${project.title} image gallery`}
    aria-roledescription="carousel"
    tabIndex={0}
    onKeyDown={onKeyDown}
  >
    <div className="project-morph-stage">
      <div className="project-gallery-fade-stage" aria-hidden="false">
        {slides.map((slide, slot) => {
          const isActive = index === slot;
          return (
            <div
              key={slide.id || slot}
              className={`project-gallery-fade-slide ${isActive ? "is-active" : ""}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image as string}
                alt={slide.alt ?? `${project.title} photograph ${slot + 1}`}
                className="project-gallery-fade-image"
                loading={slot === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      <div
        className="project-gallery-hero"
        style={{
          opacity: index === 0 ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
        aria-hidden={index !== 0}
      >
        <div
          className="project-gallery-caption"
          ref={captionRef}
          style={{
            transform: index === 0 ? "none" : "translateY(20px)",
            transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h1>{project.title}<span className="sea-projects-dot">.</span></h1>
          {project.location && <p>{project.location}</p>}
        </div>
      </div>
      {count > 1 && <div className="project-gallery-controls">
        <p className="project-morph-hint">Scroll to explore</p>
        <div className="project-gallery-dots">{slides.map((slide, slot) => <Button key={slide.id} variant="ghost" size="icon" className={"project-gallery-dot" + (index === slot ? " is-active" : "")} aria-label={`Show image ${slot + 1}`} aria-pressed={index === slot} onClick={() => scrollToSlide(slot)}><span /></Button>)}</div>
      </div>}
    </div>
  </section>;
}
