import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founderPhoto from "@/assets/founder-portrait-photo.png";

export default function FounderSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.["reduce"] || !section.current) return;
      const scope = gsap.context(() => {
        gsap.fromTo(
          ".founder2-photo",
          { scale: 1.12 },
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
        gsap.from(".founder2-name-line > span", {
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
      }, section);
      return () => scope.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="sea2-founder" id="founder" ref={section} aria-label="Founder's vision">
      <div className="founder2-stage">
        <div className="founder2-art">
          <img
            className="founder2-photo"
            src={founderPhoto}
            alt="P.V. Naresh Kumar, Founder and CEO"
            loading="lazy"
          />
        </div>

        <div className="founder2-copy">
          <h2 className="founder2-name">
            <span className="founder2-name-line"><span>P.V.</span></span>
            <span className="founder2-name-line"><span>NARESH</span></span>
            <span className="founder2-name-line"><span>KUMAR</span></span>
          </h2>
          <p className="founder2-role founder2-rise">FOUNDER &amp; CEO</p>
          <p className="founder2-tagline founder2-rise">Innovative, sustainable<br />and people-centric spaces.</p>
          <p className="founder2-studio founder2-rise">STUDIO FOR ECLECTIC ARCHITECTURE</p>
        </div>
      </div>
    </section>
  );
}
