import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SeaLogoMark from "@/components/SeaLogoMark";
import HistoryText, { historySlides } from "@/components/HistoryText";
import { HISTORY_STAGES, slideArrival } from "@/lib/history-sequence";

const useIsoLayoutEffect = typeof window === "undefined" ? () => {} : useLayoutEffect;

export default function AboutHero() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const section = root.current;
      const rail = track.current;
      if (!section || !rail) return;
      section.classList.add("is-animated");
      const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);
      const scope = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>(".history-text-slide");
        gsap.set(".history-logo-fill", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".history-glow", { opacity: 1, x: "-30vw" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.8}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        const { fill, travel } = HISTORY_STAGES;
        tl.to(".history-scroll-cue", { opacity: 0, duration: 0.04 }, 0);
        tl.to(".history-logo-fill", { clipPath: "inset(0 0% 0 0)", duration: fill.duration }, fill.start);
        tl.to(".history-glow", { x: "92vw", duration: fill.duration }, fill.start);
        tl.to(rail, { x: () => -distance(), duration: travel.duration }, travel.start);
        // Logo drifts slower than the track (parallax) and softens as it exits.
        tl.to(".history-logo-wrap", { xPercent: 35, scale: 0.9, opacity: 0.25, duration: travel.duration / slides.length }, travel.start);
        slides.forEach((slide, i) => {
          const arrive = slideArrival(i + 1, slides.length);
          const span = travel.duration / slides.length;
          const enter = arrive - span * 0.75;
          tl.fromTo(slide.querySelector(".history-slide-number"), { xPercent: 40, opacity: 0 }, { xPercent: -20, opacity: 1, duration: span * 1.6 }, arrive - span);
          tl.fromTo(slide.querySelector(".history-slide-count"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: span * 0.4, ease: "power1.out" }, enter);
          tl.fromTo(slide.querySelector(".history-heading-line > span"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: span * 0.5, ease: "power2.out" }, enter + span * 0.08);
          tl.fromTo(slide.querySelector(".history-paragraph"), { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: span * 0.5, ease: "power1.out" }, enter + span * 0.2);
        });
      }, root);
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        scope.revert();
        section.classList.remove("is-animated");
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section className="sea-history" id="history" aria-label="Our history" ref={root}>
      <div className="history-track" ref={track} data-slides={historySlides.length + 1}>
        <div className="history-slide history-logo-slide">
          <div className="history-logo-wrap" aria-hidden="true">
            <SeaLogoMark className="history-logo-outline" filled={false} />
            <div className="history-glow" />
            <SeaLogoMark className="history-logo-fill" />
          </div>
        </div>
        <HistoryText />
      </div>
      <span className="history-scroll-cue" aria-hidden="true">Scroll</span>
    </section>
  );
}
