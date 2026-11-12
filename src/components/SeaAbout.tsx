import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lightbulb, Leaf, ScanLine } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import AboutHero from "@/components/AboutHero";
import ArchitecturalScene from "@/components/ArchitecturalScene";
import logoColor from "@/assets/sea-logo-color.png";

const values = [
  { number: "01", title: "Innovation", Icon: Lightbulb, description: "We embrace new ideas and technologies to create intelligent, forward-thinking architectural solutions." },
  { number: "02", title: "Sustainability", Icon: Leaf, description: "We design responsible spaces that balance environmental awareness, functionality, and long-term value." },
  { number: "03", title: "Excellence", Icon: ScanLine, description: "We maintain exceptional standards through precision, collaboration, and attention to every detail." },
];

export default function SeaAbout() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const history = document.querySelector(".sea-history");
      setScrolled(history ? history.getBoundingClientRect().bottom < 80 : window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions;
      if (!conditions || !root.current || conditions['reduce']) return;
      const scope = gsap.context(() => {
        gsap.from(".founder-visual", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: ".sea-founder", start: "top 75%" } });
        gsap.from(".founder-copy > *", { opacity: 0, y: 35, stagger: 0.1, duration: 0.8, scrollTrigger: { trigger: ".sea-founder", start: "top 65%" } });
        gsap.utils.toArray<HTMLElement>(".sea-value").forEach((item) => {
          gsap.from(item.querySelectorAll("h3, p, .value-number"), { y: 22, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: item, start: "top 85%" } });
          const lines = item.querySelectorAll("svg path, svg line, svg rect, svg circle");
          gsap.fromTo(lines, { strokeDasharray: 100, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.8, stagger: 0.06, scrollTrigger: { trigger: item, start: "top 85%" } });
        });
        gsap.utils.toArray<HTMLElement>(".sea-award").forEach((item) => {
          gsap.from(item.querySelector("h3"), { yPercent: 100, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%" } });
          gsap.from(item.querySelector(".award-year"), { scale: 0.8, opacity: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 90%" } });
        });
      }, root);
      return () => scope.revert();
    });
    return () => media.revert();
  }, []);

  return <div className="sea-about" ref={root}>
    <header className={"sea-header" + (scrolled ? " is-scrolled" : "")}>
      <Link to="/" aria-label="SEA home" className="sea-brand"><img src={logoColor} alt="SEA – Studio for Eclectic Architecture" /></Link>
      <button type="button" className="sea-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
        <span className="sea-menu-line sea-menu-line-a" />
        <span className="sea-menu-line sea-menu-line-b" />
      </button>
    </header>
    {menuOpen && (
      <div className="sea-menu-overlay" role="dialog" aria-label="Menu">
        <button type="button" className="sea-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        <nav aria-label="Main navigation">
          <Link to="/about" aria-current="page" onClick={() => setMenuOpen(false)}>Who We Are</Link>
          <a href="/studio.html#projects">Projects</a>
          <a href="/studio.html#services">What We Do</a>
          <a href="/studio.html#contact">Contact</a>
        </nav>
      </div>
    )}

    <main>
      <AboutHero />

      <section className="sea-founder" id="founder">
        <div className="founder-visual">
          <div className="founder-monogram" aria-label="Founder photograph space reserved"><span>PV</span><span>NK<span className="monogram-dot">.</span></span><div className="founder-portrait-lines" aria-hidden="true" /></div>
          <div className="founder-signature"><span>P.V. Naresh Kumar</span><span>FOUNDER & CEO</span></div>
        </div>
        <div className="founder-copy">
          <span className="sea-eyebrow">02 / LEADERSHIP & VISION</span>
          <h2><span className="founder-heading-line">THE VISION BEHIND</span><span className="founder-heading-line">OUR <span className="sea-teal">ARCHITECTURE.</span></span></h2>
          <div className="founder-name"><h3>P.V. Naresh Kumar</h3><span>FOUNDER & CEO</span></div>
          <p>With a passion for design and a commitment to excellence, P.V. Naresh Kumar leads SEA with a vision to create innovative, sustainable, and people-centric spaces.</p>
          <p>Through an integrated approach to architectural design, structural engineering, and BIM services, SEA aims to transform ideas into meaningful spaces that inspire and endure.</p>
          <Button asChild variant="link" className="sea-journey"><a href="#values">DISCOVER OUR JOURNEY <ArrowUpRight /></a></Button>
        </div>
      </section>

      <section className="sea-values" id="values">
        <div className="sea-section-heading"><span className="sea-eyebrow">03 / OUR VALUES</span><h2>WHAT DEFINES US<span className="sea-teal">.</span></h2></div>
        <div className="sea-values-grid">{values.map(({ number, title, Icon, description }) => <article className="sea-value" key={number}><div className="value-top"><span className="value-number">{number}</span><Icon size={72} strokeWidth={1} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="sea-awards">
        <div className="awards-geometry"><ArchitecturalScene /></div>
        <div className="sea-section-heading"><span className="sea-eyebrow">04 / AWARDS & RECOGNITION</span><h2>RECOGNITION<br />OF EXCELLENCE<span className="award-gold">.</span></h2></div>
        <div className="sea-awards-list">{[{ name: "BUSINESS AWARDS", year: "2024" }, { name: "THE INDIA DESIGN AWARDS", year: "2024" }, { name: "ARCHITECTURAL EXCELLENCE AWARD", year: "2025" }].map((award, i) => <article className="sea-award" key={award.name}><span className="award-index">0{i + 1}</span><div className="award-title-mask"><h3>{award.name}</h3></div><span className="award-year">{award.year}</span><ArrowUpRight aria-hidden="true" /></article>)}</div>
      </section>
    </main>
    <footer className="sea-footer" id="contact">
      <div className="sea-footer-top"><h2>Let’s build<br />something lasting.</h2><address><a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span></address></div>
      <div className="sea-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer"><Link to="/about">Who We Are</Link><a href="/studio.html#projects">Projects</a><a href="/studio.html#services">What We Do</a><a href="#contact">Contact</a></nav></div>
    </footer>
  </div>;
}