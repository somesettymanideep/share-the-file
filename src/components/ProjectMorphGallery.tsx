import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectGallery, type SeaProject } from "@/lib/projects";

/**
 * Up to four photographs use the existing scroll-driven fade sequence;
 * larger galleries use a single-viewport carousel with buttons and swipe.
 */
export default function ProjectMorphGallery({ project }: { project: SeaProject }) {
  const slides = getProjectGallery(project).filter((slide) => slide.image !== null);
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const isCarousel = count > 4;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count < 2 || isCarousel) return;
    const read = () => {
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / Math.max(total, 1), 0), 1);
      setIndex(Math.round(progress * (count - 1)));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [count, isCarousel]);

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
    if (isCarousel) {
      setIndex((target + count) % count);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + (total * target) / Math.max(count - 1, 1);
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [count, isCarousel]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollToSlide(isCarousel ? index - 1 : Math.max(0, index - 1));
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      scrollToSlide(isCarousel ? index + 1 : Math.min(count - 1, index + 1));
    }
  }, [count, index, isCarousel, scrollToSlide]);

  return <section
    ref={sectionRef}
    className={`project-morph${isCarousel ? " project-carousel" : ""}`}
    style={{ height: !isCarousel && count > 1 ? `${count * 100}svh` : "100svh" }}
    aria-label={`${project.title} image gallery`}
    aria-roledescription="carousel"
    tabIndex={0}
    onKeyDown={onKeyDown}
    onTouchStart={(event) => {
      const touch = event.touches[0];
      if (isCarousel && touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
    }}
    onTouchEnd={(event) => {
      const touch = event.changedTouches[0];
      const start = touchStart.current;
      touchStart.current = null;
      if (!isCarousel || !touch || !start) return;
      const dx = touch.clientX - start.x;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) scrollToSlide(index + (dx < 0 ? 1 : -1));
    }}
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
        {isCarousel ? <div className="project-carousel-navigation">
          <Button variant="ghost" size="icon" aria-label="Previous image" title="Previous image" onClick={() => scrollToSlide(index - 1)}><ArrowLeft /></Button>
          <span aria-live="polite" aria-atomic="true">{index + 1} / {count}</span>
          <Button variant="ghost" size="icon" aria-label="Next image" title="Next image" onClick={() => scrollToSlide(index + 1)}><ArrowRight /></Button>
        </div> : <p className="project-morph-hint">Scroll to explore</p>}
        <div className="project-gallery-dots">{slides.map((slide, slot) => <Button key={slide.id} variant="ghost" size="icon" className={"project-gallery-dot" + (index === slot ? " is-active" : "")} aria-label={`Show image ${slot + 1}`} aria-pressed={index === slot} onClick={() => scrollToSlide(slot)}><span /></Button>)}</div>
      </div>}
    </div>
  </section>;
}
