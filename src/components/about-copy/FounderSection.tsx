import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founderPortrait from "@/assets/founder-portrait.png.asset.json";
import founderBackground from "@/assets/founder-background.png.asset.json";

export default function FounderSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.["reduce"] || !section.current) return;
      const scope = gsap.context(() => {
        gsap.fromTo(
          ".founder2-plate",
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.from(".founder2-portrait", {
          xPercent: -10,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: { trigger: section.current, start: "top 65%" },
        });
        gsap.from(".founder2-heading-line > span", {
          yPercent: 110,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 65%" },
        });
        gsap.from(".founder2-copy .founder2-rise", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 60%" },
        });
        gsap.from(".founder2-watermark", {
          x: -24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 65%" },
        });
      }, section);
      return () => scope.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="sea2-founder" id="founder" ref={section} aria-label="Founder's vision">
      <div className="founder2-stage">
        <div className="founder2-art">
          <img className="founder2-plate" src={founderBackground.url} alt="" aria-hidden="true" loading="lazy" />
          <img
            className="founder2-portrait"
            src={founderPortrait.url}
            alt="P.V. Naresh Kumar, Founder and CEO"
            loading="lazy"
          />
          <span className="founder2-watermark" aria-hidden="true">SEA</span>
        </div>

        <div className="founder2-copy">
          <h2 className="founder2-heading">
            <span className="founder2-heading-line"><span>THE VISION BEHIND OUR</span></span>
            <span className="founder2-heading-line"><span className="founder2-heading-accent">ARCHITECTURE.</span></span>
          </h2>
          <p className="founder2-name founder2-rise">P.V. Naresh Kumar</p>
          <p className="founder2-role founder2-rise">
            <span>FOUNDER &amp; CEO</span>
            <i aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
