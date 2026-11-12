import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lightbulb, Leaf, ScanLine } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "@/components/AboutHero";
import logoColor from "@/assets/sea-logo-color.png";
import founderVision from "@/assets/sea-founder-vision.png.asset.json";
import awardIndiaDesign from "@/assets/sea-award-india-design.png.asset.json";
import awardBharatBusiness from "@/assets/sea-award-bharat-business.png.asset.json";
import awardArchitectureHerald from "@/assets/sea-award-architecture-herald.png.asset.json";

const awards = [
  { name: "THE INDIA DESIGN AWARDS", year: "2024", image: awardIndiaDesign, alt: "P.V. Naresh Kumar receiving the India Design Awards 2024 plaque on stage" },
  { name: "BHARAT BUSINESS AWARDS", year: "2024", image: awardBharatBusiness, alt: "P.V. Naresh Kumar receiving the Bharat Business Awards 2024 trophy and certificate" },
  { name: "ARCHITECTURAL EXCELLENCE AWARD", year: "2025", image: awardArchitectureHerald, alt: "P.V. Naresh Kumar holding the Architectural Excellence Award 2025 trophy and certificate at the Architecture Herald event" },
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

      <section className="sea-founder-image-section" id="founder" aria-label="Founder's vision">
        <img className="sea-founder-image" src={founderVision.url} width={1152} height={768} loading="lazy" alt="The vision behind our architecture. P.V. Naresh Kumar, Founder & CEO. With a passion for design and a commitment to excellence, P.V. Naresh Kumar leads SEA with a vision to create innovative, sustainable, and people-centric spaces that inspire. Innovative Design Solutions. Sustainable Architecture. Long-Term Partnerships." />
        <a className="sea-founder-image-journey" href="#values" aria-label="Our Journey" />
      </section>

      <section className="sea-values" id="values">
        <div className="sea-section-heading"><span className="sea-eyebrow">03 / OUR VALUES</span><h2>WHAT DEFINES US<span className="sea-teal">.</span></h2></div>
        <div className="sea-values-grid">{values.map(({ number, title, Icon, description }) => <article className="sea-value" key={number}><div className="value-top"><span className="value-number">{number}</span><Icon size={72} strokeWidth={1} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="sea-awards">
        <div className="sea-section-heading"><h2>AWARDS & RECOGNITION<span className="award-gold">.</span></h2></div>
        <div className="sea-awards-list">{awards.map((award, i) => <article className="sea-award" key={award.name}><div className="award-card-top"><span className="award-index">0{i + 1}</span><span className="award-year">{award.year}</span></div><div className="award-photo"><img src={award.image.url} alt={award.alt} loading="lazy" /></div><div className="award-card-bottom"><div className="award-title-mask"><h3>{award.name}</h3></div><ArrowUpRight aria-hidden="true" /></div></article>)}</div>
      </section>
    </main>
    <footer className="sea-footer" id="contact">
      <div className="sea-footer-top"><h2>Let’s build<br />something lasting.</h2><address><a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span></address></div>
      <div className="sea-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer"><Link to="/about">Who We Are</Link><a href="/studio.html#projects">Projects</a><a href="/studio.html#services">What We Do</a><a href="#contact">Contact</a></nav></div>
    </footer>
  </div>;
}