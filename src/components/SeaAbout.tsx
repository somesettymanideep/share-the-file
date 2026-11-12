import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Lightbulb, Leaf, ScanLine } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ArchitecturalScene from "@/components/ArchitecturalScene";
import { HISTORY_STAGES } from "@/lib/history-sequence";
import logo from "@/assets/sea-logo.svg";
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions;
      if (!conditions || !root.current) return;
      const scope = gsap.context(() => {
        const logoElement = root.current?.querySelector<HTMLElement>(".history-logo");
        const history = root.current?.querySelector<HTMLElement>(".sea-history");
        if (!logoElement || !history) return;
        if (conditions['reduce']) {
          gsap.set(".history-content", { autoAlpha: 1 });
          return;
        }
        const mobile = conditions['mobile'];
        gsap.set(".history-content", { autoAlpha: 0 });
        gsap.set(".history-line span", { yPercent: 110 });
        gsap.set(".history-detail", { y: 24, opacity: 0 });
        const finalWidth = mobile ? Math.min(window.innerWidth * 0.57, 265) : window.innerWidth * 0.35;
        const initialWidth = mobile ? 108 : 150;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: history, start: "top top", end: () => `+=${window.innerHeight * (mobile ? 1.65 : 2.1)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
        timeline.fromTo(logoElement, { width: initialWidth, xPercent: -50, yPercent: -50, left: "50%", top: "47%" },
          { width: () => window.innerWidth * (mobile ? 0.84 : 0.667), duration: HISTORY_STAGES.enlarge.duration }, HISTORY_STAGES.enlarge.start);
        timeline.to(logoElement, { width: finalWidth, left: mobile ? "7%" : "6%", top: mobile ? "17%" : "43%", xPercent: 0, yPercent: mobile ? 0 : -50, duration: HISTORY_STAGES.move.duration }, HISTORY_STAGES.move.start);
        timeline.set(".history-content", { autoAlpha: 1 }, HISTORY_STAGES.reveal.start);
        timeline.to(".history-line span", { yPercent: 0, duration: 0.12, stagger: 0.025 }, HISTORY_STAGES.reveal.start);
        timeline.to(".history-detail", { opacity: 1, y: 0, duration: 0.15, stagger: 0.035 }, HISTORY_STAGES.reveal.start + 0.06);
        timeline.to({}, { duration: HISTORY_STAGES.hold.duration }, HISTORY_STAGES.hold.start);
        timeline.to(".history-bottom", { opacity: 0, duration: 0.1 }, HISTORY_STAGES.move.start);
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
      <section className="sea-history" aria-label="Our history">
        <div className="history-grid" aria-hidden="true" />
        <div className="history-geometry"><ArchitecturalScene /></div>
        <img className="history-logo" src={logo} alt="SEA — Studio for Eclectic Architecture" />
        <div className="history-content">
          <span className="sea-eyebrow history-detail">01 / OUR HISTORY</span>
          <h1><span className="history-line"><span>BUILT ON VISION.</span></span><span className="history-line"><span>DRIVEN BY DESIGN.</span></span></h1>
          <p className="history-detail">SEA represents a commitment to architectural innovation, engineering precision, and thoughtful design. Our journey is driven by the ambition to create meaningful spaces through integrated architectural solutions, structural expertise, and advanced building technologies.</p>
        </div>
        <div className="history-bottom"><span>ARCHITECTURE. ENGINEERING. POSSIBILITY.</span><ArrowDown size={20} /><span>VIJAYAWADA, INDIA</span></div>
      </section>

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