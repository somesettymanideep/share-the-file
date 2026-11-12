import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Leaf, Handshake } from "lucide-react";
import founderPortrait from "@/assets/founder-portrait.png.asset.json";
import founderBackground from "@/assets/founder-background.png.asset.json";

const features = [
  { Icon: Building2, line1: "Innovative", line2: "Design Solutions" },
  { Icon: Leaf, line1: "Sustainable", line2: "Architecture" },
  { Icon: Handshake, line1: "Long-Term", line2: "Partnerships" },
];

export default function FounderSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.["reduce"] || !section.current) return;
      const scope = gsap.context(() => {
        gsap.fromTo(
          ".founder-plate",
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
        gsap.from(".founder-portrait", {
          xPercent: -10,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: { trigger: section.current, start: "top 65%" },
        });
        gsap.from(".founder-heading-line > span", {
          yPercent: 110,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 65%" },
        });
        gsap.from(".founder-copy .founder-rise", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 60%" },
        });
        gsap.from(".founder-aboutus, .founder-signature, .founder-watermark", {
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
    <section className="sea-founder" id="founder" ref={section} aria-label="Founder's vision">
      <div className="founder-stage">
        <div className="founder-art">
          <img className="founder-plate" src={founderBackground.url} alt="" aria-hidden="true" loading="lazy" />
          <p className="founder-aboutus">ABOUT US</p>
          <img
            className="founder-portrait"
            src={founderPortrait.url}
            alt="P.V. Naresh Kumar, Founder and CEO"
            loading="lazy"
          />
          <div className="founder-signature" aria-hidden="true">
            <span className="founder-script">P.V. Naresh Kumar</span>
            <span className="founder-sig-line" />
            <span className="founder-sig-role">FOUNDER &amp; CEO</span>
          </div>
          <span className="founder-watermark" aria-hidden="true">SEA</span>
        </div>

        <div className="founder-copy">
          <h2 className="founder-heading">
            <span className="founder-heading-line"><span>THE VISION</span></span>
            <span className="founder-heading-line"><span>BEHIND OUR</span></span>
            <span className="founder-heading-line"><span>ARCHITECTURE.</span></span>
          </h2>
          <p className="founder-name founder-rise">P.V. Naresh Kumar</p>
          <p className="founder-role founder-rise">
            <span>FOUNDER &amp; CEO</span>
            <i aria-hidden="true" />
          </p>
          <p className="founder-para founder-rise">
            With a passion for design and a commitment to excellence, P.V. Naresh Kumar leads SEA with a vision to
            create innovative, sustainable and people-centric spaces that inspire.
          </p>
          <div className="founder-features founder-rise">
            {features.map(({ Icon, line1, line2 }) => (
              <div className="founder-feature" key={line1}>
                <Icon strokeWidth={1.5} aria-hidden="true" />
                <p>
                  <strong>{line1}</strong>
                  <span>{line2}</span>
                </p>
              </div>
            ))}
          </div>
          <a className="founder-journey founder-rise" href="#history">
            Our Journey <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
