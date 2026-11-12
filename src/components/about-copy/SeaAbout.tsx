import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lightbulb, Leaf, ScanLine } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "./AboutHero";
import FounderSection from "./FounderSection";
import AwardCarousel from "./AwardCarousel";
import Lenis from "lenis";
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
    let frame = 0;
    const read = () => {
      frame = 0;
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
        gsap.utils.toArray<HTMLElement>(".sea2-values, .sea2-awards").forEach((section) => {
          gsap.from(section, { y: 80, opacity: 0.4, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 55%", scrub: true } });
          const heading = section.querySelector(".sea2-section-heading, .sea2-footer-top h2");
          if (heading) gsap.from(heading, { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
        });
        gsap.utils.toArray<HTMLElement>(".sea2-value").forEach((item) => {
          gsap.from(item.querySelectorAll("h3, p, .value2-number"), { y: 22, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: item, start: "top 85%" } });
          const lines = item.querySelectorAll("svg path, svg line, svg rect, svg circle");
          gsap.fromTo(lines, { strokeDasharray: 100, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.8, stagger: 0.06, scrollTrigger: { trigger: item, start: "top 85%" } });
        });
      }, root);
      return () => scope.revert();
    });
    return () => media.revert();
  }, []);

  return <div className="sea2-about" ref={root}>
    <header className={"sea2-header" + (scrolled ? " is-scrolled" : "")}>
      <Link to="/" aria-label="SEA home" className="sea2-brand"><img src={logoColor} alt="SEA – Studio for Eclectic Architecture" /></Link>
      <button type="button" className="sea2-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
        <span className="sea2-menu-line sea2-menu-line-a" />
        <span className="sea2-menu-line sea2-menu-line-b" />
      </button>
    </header>
    {menuOpen && (
      <div className="sea2-menu-overlay" role="dialog" aria-label="Menu">
        <button type="button" className="sea2-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        <nav aria-label="Main navigation">
          <Link to="/about-copy" aria-current="page" onClick={() => setMenuOpen(false)}>Who We Are</Link>
          <a href="/studio.html#projects">Projects</a>
          <a href="/studio.html#services">What We Do</a>
          <a href="/studio.html#contact">Contact</a>
        </nav>
      </div>
    )}

    <main>
      <AboutHero />

      <FounderSection />

      <section className="sea2-values" id="values">
        <div className="sea2-section-heading"><span className="sea2-eyebrow">03 / OUR VALUES</span><h2>WHAT DEFINES US<span className="sea2-teal">.</span></h2></div>
        <div className="sea2-values-grid">{values.map(({ number, title, Icon, description }) => <article className="sea2-value" key={number}><div className="value2-top"><span className="value2-number">{number}</span><Icon size={72} strokeWidth={1} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <AwardCarousel />
    </main>
    <footer className="sea2-footer" id="contact">
      <div className="sea2-footer-top"><h2>Let’s build<br />something lasting.</h2><address><a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span></address></div>
      <div className="sea2-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer"><Link to="/about-copy">Who We Are</Link><a href="/studio.html#projects">Projects</a><a href="/studio.html#services">What We Do</a><a href="#contact">Contact</a></nav></div>
    </footer>
  </div>;
}