import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoColor from "@/assets/sea-logo-color.png";

export default function SeaProjectShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const read = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 600); };
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const navigation = <>
    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
    <Link to="/about" onClick={() => setMenuOpen(false)}>Who We Are</Link>
    <Link to="/about-copy" onClick={() => setMenuOpen(false)}>Who We Are Two</Link>
    <Link to="/projects" aria-current="page" onClick={() => setMenuOpen(false)}>Projects</Link>
  </>;
  return <div className="sea-projects">
    <header className={"sea-header" + (scrolled ? " is-scrolled" : "")}>
      <Link to="/" aria-label="SEA home" className="sea-brand"><img src={logoColor} alt="SEA – Studio for Eclectic Architecture" /></Link>
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
        <Link to="/about">Who We Are</Link><Link to="/projects">Projects</Link><a href="/studio.html#services">What We Do</a><a href="#contact">Contact</a>
      </nav></div>
    </footer>
    <Button variant="ghost" size="icon" className={"sea-scroll-top" + (showTop ? " is-visible" : "")} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><ArrowUp aria-hidden="true" /></Button>
  </div>;
}