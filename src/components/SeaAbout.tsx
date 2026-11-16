import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Fingerprint, Lightbulb, Leaf, ScanLine, Handshake, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "@/components/AboutHero";
import FounderSection from "@/components/FounderSection";
import SeaPeopleSections from "@/components/SeaPeopleSections";
import Lenis from "lenis";
import logoColor from "@/assets/sea-logo-color.png";
import awardIndiaDesign from "@/assets/sea-award-india-design.png.asset.json";
import awardBharatBusiness from "@/assets/sea-award-bharat-business.png.asset.json";
import awardArchitectureHerald from "@/assets/sea-award-architecture-herald.png.asset.json";

const awards = [
  { name: "THE INDIA DESIGN AWARDS", year: "2024", image: awardIndiaDesign, alt: "P.V. Naresh Kumar receiving the India Design Awards 2024 plaque on stage" },
  { name: "BHARAT BUSINESS AWARDS", year: "2024", image: awardBharatBusiness, alt: "P.V. Naresh Kumar receiving the Bharat Business Awards 2024 trophy and certificate" },
  { name: "ARCHITECTURAL EXCELLENCE AWARD", year: "2025", image: awardArchitectureHerald, alt: "P.V. Naresh Kumar holding the Architectural Excellence Award 2025 trophy and certificate at the Architecture Herald event" },
];

const values = [
  { number: "01", title: "Design with Identity", Icon: Fingerprint, description: "Every space deserves its own story, character, and purpose." },
  { number: "02", title: "Intelligence in Design", Icon: Lightbulb, description: "Integrating creativity, technology, and intelligent problem-solving." },
  { number: "03", title: "Responsible Architecture", Icon: Leaf, description: "Creating thoughtful spaces with long-term environmental and human value." },
  { number: "04", title: "Precision in Execution", Icon: ScanLine, description: "Where imagination is supported by detailing, discipline, and technical expertise." },
  { number: "05", title: "Trust by Design", Icon: Handshake, description: "Building transparent relationships through accountability and collaboration." },
  { number: "06", title: "Glocal Thinking", qualifier: "[Global Vision. Local Wisdom].", Icon: Globe, description: "Rooted in local understanding, inspired by global design perspectives." },
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
      const history = document.querySelector<HTMLElement>(".sea-history");
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
    // Smooth scroll: Lenis drives the page and is ticked by GSAP so ScrollTrigger stays in sync.
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href")!);
      if (target) { e.preventDefault(); lenis.scrollTo(target as HTMLElement, { offset: -80 }); }
    };
    document.addEventListener("click", onAnchor);
    return () => { document.removeEventListener("click", onAnchor); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions;
      if (!conditions || !root.current || conditions['reduce']) return;
      const scope = gsap.context(() => {
        // Section transitions: headings rise in, sections ease up as they enter.
        gsap.utils.toArray<HTMLElement>(".sea-values, .sea-awards").forEach((section) => {
          gsap.from(section, { y: 80, opacity: 0.4, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 55%", scrub: true } });
          const heading = section.querySelector(".sea-section-heading, .sea-footer-top h2");
          if (heading) gsap.from(heading, { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
        });
        // Team section: heading and rule reveal, cards rise in a stagger, portraits parallax.
        const teamSection = document.querySelector<HTMLElement>(".sea-about .people-team");
        if (teamSection) {
          gsap.from(teamSection, { y: 80, opacity: 0.4, ease: "none", scrollTrigger: { trigger: teamSection, start: "top bottom", end: "top 55%", scrub: true } });
          gsap.from(teamSection.querySelector(".people-heading"), { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: teamSection, start: "top 80%" } });
          gsap.from(teamSection.querySelectorAll(".people-team-card"), { y: 90, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: teamSection.querySelector(".people-team-grid"), start: "top 85%" } });
          teamSection.querySelectorAll<HTMLElement>(".people-team-photo img").forEach((img) => {
            gsap.fromTo(img, { yPercent: -6, scale: 1.1 }, { yPercent: 6, scale: 1.1, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }
        gsap.utils.toArray<HTMLElement>(".award-photo img").forEach((img) => {
          gsap.fromTo(img, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });
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
      <nav className="sea-header-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/about" aria-current="page">Who We Are</Link>
        <Link to="/about-copy">Who We Are Two</Link>
      </nav>
      <button type="button" className="sea-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
        <span className="sea-menu-line sea-menu-line-a" />
        <span className="sea-menu-line sea-menu-line-b" />
      </button>
    </header>
    {menuOpen && (
      <div className="sea-menu-overlay" role="dialog" aria-label="Menu">
        <button type="button" className="sea-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        <nav aria-label="Main navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" aria-current="page" onClick={() => setMenuOpen(false)}>Who We Are</Link>
          <Link to="/about-copy" onClick={() => setMenuOpen(false)}>Who We Are Two</Link>
        </nav>
      </div>
    )}

    <main>
      <AboutHero />

      <FounderSection />
      <SeaPeopleSections showTeamMeta={false} parts="team" />

      <section className="sea-values" id="values">
        <div className="sea-section-heading"><h2>WHAT DEFINES US<span className="sea-teal">.</span></h2></div>
        <div className="sea-values-grid">{values.map(({ number, title, qualifier, Icon, description }) => <article className="sea-value" key={number}><div className="value-top"><span className="value-number">{number} /</span><Icon size={62} strokeWidth={1} aria-hidden="true" /></div><h3>{title}{qualifier && <span className="value-qualifier">{qualifier}</span>}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="sea-awards">
        <div className="sea-section-heading"><h2>AWARDS & RECOGNITION<span className="award-gold">.</span></h2></div>
        <div className="sea-awards-list">{awards.map((award, i) => <article className="sea-award" key={award.name}><div className="award-card-top"><span className="award-index">0{i + 1}</span><span className="award-year">{award.year}</span></div><div className="award-photo"><img src={award.image.url} alt={award.alt} loading="lazy" /></div><div className="award-card-bottom"><div className="award-title-mask"><h3>{award.name}</h3></div><ArrowUpRight aria-hidden="true" /></div></article>)}</div>
      </section>
      <SeaPeopleSections showTeamMeta={false} parts="testimonials" />
    </main>
    <footer className="sea-footer" id="contact">
      <div className="sea-footer-top"><h2>Let’s Create<br />Something Meaningful</h2><address><a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span></address></div>
      <div className="sea-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer"><Link to="/about">Who We Are</Link><a href="/studio.html#projects">Projects</a><a href="/studio.html#services">What We Do</a><a href="#contact">Contact</a></nav></div>
    </footer>
    <button type="button" className={"sea-scroll-top" + (showTop ? " is-visible" : "")} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={20} aria-hidden="true" /></button>
  </div>;
}