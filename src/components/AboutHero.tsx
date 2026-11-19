import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SeaLogoMark from "@/components/SeaLogoMark";
import HistoryText from "@/components/HistoryText";
import { ABOUT_HISTORY_STAGES as HISTORY_STAGES } from "@/lib/history-sequence";

const CAPTION_WORDS = ["STUDIO", "FOR", "ECLECTIC", "ARCHITECTURE"];
const CAPTION_WORD_STAGGER = 0.03;

export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const section = root.current;
      if (!section) return;
      section.classList.add("is-animated");
      const scope = gsap.context(() => {
        gsap.set(".history-logo-art", { scale: 0.18 });
        gsap.set(".history-logo-fill", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".history-glow", { opacity: 1, x: "-30vw" });
        gsap.set(".history-heading-line > span", { yPercent: 110 });
        gsap.set(".history-paragraph", { y: 40, opacity: 0 });
        gsap.set(".history-logo-word", { yPercent: 60, opacity: 0, filter: "blur(10px)" });
        gsap.set(".history-logo-definition", { y: 40, autoAlpha: 0 });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        timeline.to(".history-scroll-cue", { opacity: 0, duration: 0.04 }, 0);
        timeline.to(".history-logo-art", { scale: 1, duration: HISTORY_STAGES.grow.duration }, HISTORY_STAGES.grow.start);
        timeline.to(".history-logo-fill", { clipPath: "inset(0 0% 0 0)", duration: HISTORY_STAGES.grow.duration }, HISTORY_STAGES.grow.start);
        timeline.to(".history-glow", { x: "92vw", duration: HISTORY_STAGES.grow.duration }, HISTORY_STAGES.grow.start);
        timeline.to(".history-logo-word", {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: HISTORY_STAGES.caption.duration - CAPTION_WORD_STAGGER * (CAPTION_WORDS.length - 1),
          stagger: CAPTION_WORD_STAGGER,
          ease: "power2.out",
        }, HISTORY_STAGES.caption.start);
        timeline.to(".history-logo-definition", { y: 0, autoAlpha: 1, duration: HISTORY_STAGES.definition.duration, ease: "power1.out" }, HISTORY_STAGES.definition.start);
        timeline.to({}, { duration: HISTORY_STAGES.hold.duration }, HISTORY_STAGES.hold.start);
        timeline.to(".history-logo-art", { scale: 1.12, duration: HISTORY_STAGES.logoOut.duration }, HISTORY_STAGES.logoOut.start);
        timeline.to(".history-logo-wrap", { opacity: 0, duration: HISTORY_STAGES.logoOut.duration }, HISTORY_STAGES.logoOut.start);
        timeline.to(".history-heading-line > span", { yPercent: 0, duration: HISTORY_STAGES.heading.duration, ease: "power2.out" }, HISTORY_STAGES.heading.start);
        timeline.to(".history-paragraph", { y: 0, opacity: 1, duration: 0.08, stagger: 0.04, ease: "power1.out" }, HISTORY_STAGES.paragraphs.start);
      }, root);
      return () => {
        scope.revert();
        section.classList.remove("is-animated");
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section className="sea-history" id="history" aria-label="Our history" ref={root}>
      <div className="history-logo-wrap">
        <div className="history-logo-art">
          <SeaLogoMark className="history-logo-outline" filled={false} />
          <div className="history-glow" />
          <SeaLogoMark className="history-logo-fill" />
        </div>
        <div className="history-logo-text">
          <span className="history-logo-caption">
            {CAPTION_WORDS.map((word) => (
              <span className={`history-logo-word${word === "ECLECTIC" ? " history-logo-word--accent" : ""}`} key={word}>
                {word}
              </span>
            ))}
          </span>
          <p className="history-logo-definition">
            definition of <strong>Ecl ecti cism</strong> is a conceptual approach or practice of combining ideas, styles, theories, or elements from a diverse range of sources rather than sticking rigidly to a single system, tradition, or paradigm.
          </p>
        </div>
      </div>
      <span className="history-scroll-cue" aria-hidden="true">Scroll</span>
      <HistoryText />
    </section>
  );
}
