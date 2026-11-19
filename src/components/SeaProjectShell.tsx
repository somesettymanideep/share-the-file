import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoColor from "@/assets/sea-logo-color.png";
import SeaLogoMark from "@/components/SeaLogoMark";

export default function SeaProjectShell({ children, heroHeader = false }: { children: ReactNode; heroHeader?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => {
    const read = () => {
      const gallery = shellRef.current?.querySelector(".project-morph");
      setScrolled(heroHeader && gallery ? gallery.getBoundingClientRect().bottom <= 0 : window.scrollY > 60);
      setShowTop(window.scrollY > 600);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [heroHeader, pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const projectLinks = <>
    <Link to="/projects/$slug" params={{ slug: "architecture" }} onClick={() => setMenuOpen(false)}>Architecture</Link>
    <Link to="/projects/$slug" params={{ slug: "interior" }} onClick={() => setMenuOpen(false)}>Interior</Link>
    <Link to="/projects/$slug" params={{ slug: "landscape" }} onClick={() => setMenuOpen(false)}>Landscape</Link>
  </>;
  const navigation = <>
    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
    <Link to="/about" onClick={() => setMenuOpen(false)}>Who We Are</Link>
    <div className="sea-nav-item">
      <Link to="/projects" aria-current={pathname.startsWith("/projects") ? "page" : undefined} onClick={() => setMenuOpen(false)}>Projects</Link>
      <div className="sea-nav-sub" role="menu" aria-label="Project categories">{projectLinks}</div>
    </div>
    <Link to="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Contact</Link>
  </>;
  return <div ref={shellRef} className={"sea-projects" + (heroHeader ? " sea-projects-detail" : "")}>
    <header className={"sea-header" + (scrolled ? " is-scrolled" : "")}>
      <Link to="/" aria-label="SEA home" className="sea-brand">{heroHeader && !scrolled ? <SeaLogoMark className="sea-brand-white" /> : <img src={logoColor} alt="SEA – Studio for Eclectic Architecture" />}</Link>
      <nav className="sea-header-nav" aria-label="Main navigation">{navigation}</nav>
      <Button variant="ghost" size="icon" className="sea-menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu /></Button>
    </header>
    {menuOpen && <div className="sea-menu-overlay" role="dialog" aria-modal="true" aria-label="Menu">
      <Button autoFocus variant="ghost" size="icon" className="sea-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button>
      <nav aria-label="Mobile navigation">{navigation}</nav>
    </div>}
    {children}
    <footer className="sea-footer" id="contact">
      <div className="sea-footer-top"><h2>Let’s Create<br />Something Meaningful</h2><address>
        <a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a><a href="tel:+919000299600">+91 9000299600</a><span>Vijayawada, Andhra Pradesh</span>
      </address></div>
      <div className="sea-footer-bottom"><span>© 2026 SEA – Studio for Eclectic Architecture</span><nav aria-label="Footer">
        <Link to="/about">Who We Are</Link><Link to="/projects">Projects</Link><a href="/studio.html#services">What We Do</a><Link to="/contact">Contact</Link>
      </nav></div>
    </footer>
    <Button variant="ghost" size="icon" className={"sea-scroll-top" + (showTop ? " is-visible" : "")} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><ArrowUp aria-hidden="true" /></Button>
  </div>;
}