import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Lightbulb, Leaf, ScanLine } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "./AboutHero";
import FounderSection from "./FounderSection";
import SeaPeopleSections from "@/components/SeaPeopleSections";
import { scrollSeaToTop } from "@/components/SeaSmoothScroll";
import logoColor from "@/assets/sea-logo-color.png";
import awardIndiaDesign from "@/assets/sea-award-india-design.png.asset.json";
import awardBharatBusiness from "@/assets/sea-award-bharat-business.png.asset.json";
import awardArchitectureHerald from "@/assets/sea-award-architecture-herald.png.asset.json";

const awards = [
  { name: "The India Design Awards", year: "2024", image: awardIndiaDesign, alt: "P.V. Naresh Kumar receiving the India Design Awards 2024 plaque on stage" },
  { name: "Bharat Business Awards", year: "2024", image: awardBharatBusiness, alt: "P.V. Naresh Kumar receiving the Bharat Business Awards 2024 trophy and certificate" },
  { name: "Architectural Excellence Award", year: "2025", image: awardArchitectureHerald, alt: "P.V. Naresh Kumar holding the Architectural Excellence Award 2025 trophy and certificate at the Architecture Herald event" },
];

const values = [
  { number: "01", title: "Innovation", Icon: Lightbulb, description: "We embrace new ideas and technologies to create intelligent, forward-thinking architectural solutions." },
  { number: "02", title: "Sustainability", Icon: Leaf, description: "We design responsible spaces that balance environmental awareness, functionality, and long-term value." },
  { number: "03", title: "Excellence", Icon: ScanLine, description: "We maintain exceptional standards through precision, collaboration, and attention to every detail." },
];

export default function SeaAbout() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setShowTop(window.scrollY > 600);
      const history = document.querySelector<HTMLElement>(".sea2-history");
      if (!history) {
        setScrolled(window.scrollY > 60);
        return;
      }
      const rect = history.getBoundingClientRect();
      // While the history section is pinned it sits at the viewport top, so its
      // bottom equals its own height. It only drops below that once the pinned
      // sequence ends and the section starts scrolling away.
      setScrolled(rect.bottom < rect.height - 40);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions;
      if (!conditions || !root.current || conditions['reduce']) return;
      const scope = gsap.context(() => {
        // Section transitions: headings rise in, sections ease up as they enter.
        gsap.utils.toArray<HTMLElement>(".sea2-values, .sea2-awards").forEach((section) => {
          gsap.from(section, { y: 80, opacity: 0.4, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 55%", scrub: true } });
          const heading = section.querySelector(".sea2-section-heading, .sea2-footer-top h2");
          if (heading) gsap.from(heading, { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
        });
        gsap.utils.toArray<HTMLElement>(".award2-photo img").forEach((img) => {
          gsap.fromTo(img, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>(".sea2-value").forEach((item) => {
          gsap.from(item.querySelectorAll("h3, p, .value2-number"), { y: 22, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: item, start: "top 85%" } });
          const lines = item.querySelectorAll("svg path, svg line, svg rect, svg circle");
          gsap.fromTo(lines, { strokeDasharray: 100, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.8, stagger: 0.06, scrollTrigger: { trigger: item, start: "top 85%" } });
        });
        gsap.utils.toArray<HTMLElement>(".sea2-award").forEach((item) => {
          gsap.from(item.querySelector("h3"), { yPercent: 100, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%" } });
          gsap.from(item.querySelector(".award2-year"), { scale: 0.8, opacity: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 90%" } });
        });
      }, root);
      return () => scope.revert();
    });
    return () => media.revert();
  }, []);

  return <div className="sea2-about" ref={root}>
    <header className={"sea2-header" + (scrolled ? " is-scrolled" : "")}>
      <Link to="/" aria-label="SEA home" className="sea2-brand"><img src={logoColor} alt="SEA – Studio for Eclectic Architecture" /></Link>
      <nav className="sea2-header-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/about">Who We Are</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <button type="button" className="sea2-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
        <span className="sea2-menu-line sea2-menu-line-a" />
        <span className="sea2-menu-line sea2-menu-line-b" />
      </button>
    </header>
    {menuOpen && (
      <div className="sea2-menu-overlay" role="dialog" aria-label="Menu">
        <button type="button" className="sea2-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        <nav aria-label="Main navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>Who We Are</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    )}

    <main>
      <AboutHero />

      <FounderSection />

      <section className="sea2-values" id="values">
        <div className="sea2-section-heading"><h2>WHAT DEFINES US<span className="sea2-teal">.</span></h2></div>
        <div className="sea2-values-grid">{values.map(({ number, title, Icon, description }) => <article className="sea2-value" key={number}><div className="value2-top"><Icon size={62} strokeWidth={1.5} aria-hidden="true" /><span className="value2-number">{number}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="sea2-awards">
        <div className="sea2-section-heading"><h2>RECOGNISED FOR EXCELLENCE<span className="award2-gold">.</span></h2></div>
        <div className="sea2-awards-list">{awards.map((award, i) => <article className="sea2-award" key={award.name}><div className="award2-photo"><img src={award.image.url} alt={award.alt} loading="lazy" /></div><div className="award2-body"><span className="award2-index">0{i + 1}</span><div className="award2-title-mask"><h3>{award.name}</h3></div><div className="award2-card-bottom"><span className="award2-year">{award.year}</span><span className="award2-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></div></div></article>)}</div>
      </section>
      <SeaPeopleSections testimonialStyle="editorial" />
    </main>
    <footer className="sea2-footer" id="contact">
      <div className="sea2-footer-top"><h2>Let’s build<br />something lasting.</h2><address><a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span></address></div>
      <div className="sea2-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer"><Link to="/about-copy">Who We Are</Link><Link to="/projects">Projects</Link><a href="/studio.html#services">What We Do</a><Link to="/contact">Contact</Link></nav></div>
    </footer>
    <button type="button" className={"sea2-scroll-top" + (showTop ? " is-visible" : "")} aria-label="Scroll to top" onClick={scrollSeaToTop}><ArrowUp size={20} aria-hidden="true" /></button>
  </div>;
}