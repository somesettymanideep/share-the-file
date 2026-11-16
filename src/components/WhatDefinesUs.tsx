import { useEffect, useRef } from "react";
import { PenTool, Lightbulb, Leaf, Ruler, Handshake, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const principles = [
  { title: "Design with Identity", Icon: PenTool, description: "Every space deserves its own story, character, and purpose." },
  { title: "Intelligence in Design", Icon: Lightbulb, description: "Integrating creativity, technology, and intelligent problem-solving." },
  { title: "Responsible Architecture", Icon: Leaf, description: "Creating thoughtful spaces with long-term environmental and human value." },
  { title: "Precision in Execution", Icon: Ruler, description: "Where imagination is supported by detailing, discipline, and technical expertise." },
  { title: "Trust by Design", Icon: Handshake, description: "Building transparent relationships through accountability and collaboration." },
  { title: "Glocal Thinking", Icon: Globe, tag: "Global Vision. Local Wisdom.", description: "Rooted in local understanding, inspired by global design perspectives." },
];

export default function WhatDefinesUs() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = root.current;
    if (!section) return;
    section.querySelectorAll(".defines-icon path, .defines-icon circle, .defines-icon line, .defines-icon rect, .defines-icon polyline").forEach((path) => path.setAttribute("pathLength", "1"));
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 900px) and (min-height: 950px)", mobile: "(max-width: 899px), (max-height: 949px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.['reduce']) return;
      const rows = Array.from(section.querySelectorAll<HTMLElement>(".defines-row"));
      gsap.from(section.querySelectorAll(".defines-heading-line > span"), { yPercent: 105, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      gsap.from(section.querySelector(".defines-bar"), { scaleX: 0, transformOrigin: "left", duration: 0.8, scrollTrigger: { trigger: section, start: "top 75%" } });
      const reveal = (timeline: gsap.core.Timeline, row: HTMLElement, index: number, at: number) => {
        timeline.from(row.querySelector(".defines-row-content"), { opacity: 0, y: 36, duration: 0.65 }, at)
          .from(row.querySelector(".defines-icon"), { opacity: 0, duration: 0.2 }, at)
          .fromTo(row.querySelectorAll(".defines-icon > *"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8 }, at);
        const divider = row.querySelector(".defines-divider");
        if (divider) timeline.from(divider, { scaleX: 0, transformOrigin: "left", duration: 0.8 }, at);
      };
      if (context.conditions?.['desktop']) {
        const timeline = gsap.timeline({ scrollTrigger: { id: "sea-principles", trigger: section, start: "top top", end: "+=340%", pin: true, scrub: 1, invalidateOnRefresh: true } });
        rows.forEach((row, index) => reveal(timeline, row, index, index * 1.1));
        timeline.to({}, { duration: 0.6 });
      } else {
        rows.forEach((row, index) => {
          const timeline = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%" } });
          reveal(timeline, row, index, 0);
        });
      }
    }, section);
    return () => media.revert();
  }, []);

  const redrawIcon = (row: HTMLElement) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(row.querySelectorAll(".defines-icon > *"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, overwrite: "auto" });
  };
  return <section className="sea-defines" id="values" ref={root} aria-labelledby="defines-heading">
    <div className="defines-layout">
      <div className="defines-left">
        <div><h2 id="defines-heading">{["What", "Defines", "Us"].map((word) => <span className="defines-heading-line" key={word}><span>{word}</span></span>)}</h2><div className="defines-bar" /></div>
      </div>
      <ol className="defines-list">{principles.map(({ title, Icon, description, tag }, index) => <li className="defines-row" key={title} onMouseEnter={(event) => redrawIcon(event.currentTarget)}>
        {index > 0 && <span className="defines-divider" aria-hidden="true" />}
        <Icon className="defines-icon" aria-hidden="true" strokeWidth={1.5} />
        <div className="defines-row-content"><h3>{title}</h3>{tag && <p className="defines-tag">{tag}</p>}<p>{description}</p></div>
      </li>)}</ol>
    </div>
  </section>;
}