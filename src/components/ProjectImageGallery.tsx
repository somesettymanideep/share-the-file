import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectGallery, type SeaProject } from "@/lib/projects";

export default function ProjectImageGallery({ project }: { project: SeaProject }) {
  const [viewportRef, api] = useEmblaCarousel({ align: "center", duration: 35, watchDrag: true });
  const [index, setIndex] = useState(0);
  const captionRef = useRef<HTMLDivElement>(null);
  const slides = getProjectGallery(project);
  useEffect(() => {
    const caption = captionRef.current;
    if (!caption || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(caption.querySelector("h1"), { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" });
      gsap.fromTo(caption.querySelector("p"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    }, caption);
    return () => context.revert();
  }, [index, project.slug]);
  useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update); api.on("reInit", update); update();
    const viewport = api.rootNode();
    let wheelTotal = 0;
    let lastWheel = 0;
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const canMove = event.deltaX > 0 ? api.canScrollNext() : api.canScrollPrev();
      if (!canMove) return;
      event.preventDefault();
      if (Date.now() - lastWheel > 180) wheelTotal = 0;
      wheelTotal += event.deltaX;
      if (Date.now() - lastWheel > 500 && Math.abs(wheelTotal) > 35) {
        if (wheelTotal > 0) api.scrollNext(); else api.scrollPrev();
        lastWheel = Date.now(); wheelTotal = 0;
      }
    };
    viewport.addEventListener("wheel", wheel, { passive: false });
    return () => { api.off("select", update); api.off("reInit", update); viewport.removeEventListener("wheel", wheel); };
  }, [api]);
  const go = (target: number) => api?.scrollTo(target, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return <section className="project-image-gallery" aria-label={`${project.title} image gallery`} aria-roledescription="carousel">
    <div className="project-gallery-viewport" ref={viewportRef} tabIndex={0} aria-label="Project images" onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); go(Math.min(index + 1, 2)); }
      if (event.key === "ArrowLeft") { event.preventDefault(); go(Math.max(index - 1, 0)); }
    }}>
      <div className="project-gallery-track">{slides.map((slide, slot) => <figure className="project-gallery-slide" key={slide.id} role="group" aria-roledescription="slide" aria-label={`${slot + 1} of 3`} aria-hidden={index !== slot}>
        {slide.image ? <img src={slide.image} alt={slide.alt} draggable={false} /> : <div className="project-photo-placeholder" role="img" aria-label={slide.alt}><ImageIcon size={40} strokeWidth={1} /><span>{project.title}</span><small>View {String(slot + 1).padStart(2, "0")} · Photograph forthcoming</small></div>}
      </figure>)}</div>
    </div>
    <div className="project-gallery-hero">
      <div className="project-gallery-caption" ref={captionRef}>
      <h1>{project.title}<span className="sea-projects-dot">.</span></h1>
      {project.location && <p>{project.location}</p>}
      </div>
    </div>
    <div className="project-gallery-controls">
      <span aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, "0")} / 03</span>
      <div className="project-gallery-dots">{slides.map((slide, slot) => <Button key={slide.id} variant="ghost" size="icon" className={"project-gallery-dot" + (index === slot ? " is-active" : "")} aria-label={`Show image ${slot + 1}`} aria-pressed={index === slot} onClick={() => go(slot)}><span /></Button>)}</div>
      <div className="project-gallery-arrows"><Button variant="outline" size="icon" aria-label="Previous image" disabled={index === 0} onClick={() => go(index - 1)}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label="Next image" disabled={index === 2} onClick={() => go(index + 1)}><ArrowRight /></Button></div>
    </div>
  </section>;
}