import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery";
import { SEA_PROJECTS } from "@/lib/projects";
import logoColor from "@/assets/sea-logo-color.png";

type SeaProject = (typeof SEA_PROJECTS)[number];
const COLS: SeaProject[][] = [
  [SEA_PROJECTS[0]!, SEA_PROJECTS[3]!],
  [SEA_PROJECTS[1]!, SEA_PROJECTS[4]!],
  [SEA_PROJECTS[2]!, SEA_PROJECTS[5]!],
];

const COL_Y_RANGES: [string, string][] = [
  ["-10%", "2%"],
  ["15%", "5%"],
  ["-10%", "2%"],
];

export default function SeaProjects() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 600);
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

  return (
    <div className="sea-projects">
      <header className={"sea-header" + (scrolled ? " is-scrolled" : "")}>
        <Link to="/" aria-label="SEA home" className="sea-brand">
          <img src={logoColor} alt="SEA – Studio for Eclectic Architecture" />
        </Link>
        <nav className="sea-header-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">Who We Are</Link>
          <Link to="/about-copy">Who We Are Two</Link>
          <Link to="/projects" aria-current="page">
            Projects
          </Link>
        </nav>
        <button
          type="button"
          className="sea-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="sea-menu-line sea-menu-line-a" />
          <span className="sea-menu-line sea-menu-line-b" />
        </button>
      </header>
      {menuOpen && (
        <div className="sea-menu-overlay" role="dialog" aria-label="Menu">
          <button
            type="button"
            className="sea-menu-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <nav aria-label="Main navigation">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              Who We Are
            </Link>
            <Link to="/about-copy" onClick={() => setMenuOpen(false)}>
              Who We Are Two
            </Link>
            <Link to="/projects" aria-current="page" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </nav>
        </div>
      )}

      <main>
        <section className="sea-projects-hero" aria-labelledby="projects-heading">
          <ContainerStagger className="sea-projects-intro">
            <ContainerAnimated>
              <h1 id="projects-heading" className="sea-projects-heading">
                The Art of Architecture<span className="sea-projects-dot">.</span>
              </h1>
            </ContainerAnimated>
            <ContainerAnimated>
              <p className="sea-projects-lede">
                Where structure meets imagination — residences, estates, towers and
                care campuses, each one an eclectic composition of light, material
                and form, crafted for the people who live with them.
              </p>
            </ContainerAnimated>
          </ContainerStagger>

          <ContainerScroll className="sea-projects-scroll">
            <ContainerSticky className="sea-projects-sticky">
              <GalleryContainer className="sea-projects-gallery">
                {COLS.map((col, colIndex) => (
                  <GalleryCol
                    key={colIndex}
                    yRange={COL_Y_RANGES[colIndex]!}
                    className={colIndex === 1 ? "sea-projects-col-mid" : undefined}
                  >
                    {col.map((project) => (
                      <figure className="sea-projects-tile" key={project.title}>
                        <img src={project.image} alt={project.alt} loading="lazy" />
                        <figcaption>
                          <span>{project.title}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </GalleryCol>
                ))}
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
        </section>

        <section className="sea-projects-list" aria-label="Project details">
          {SEA_PROJECTS.map((project, i) => (
            <article className="sea-projects-item" key={project.title}>
              <span className="sea-projects-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="sea-projects-item-photo">
                <img src={project.image} alt={project.alt} loading="lazy" />
              </div>
              <div className="sea-projects-item-copy">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="sea-projects-item-arrow" />
            </article>
          ))}
        </section>
      </main>

      <footer className="sea-footer" id="contact">
        <div className="sea-footer-top">
          <h2>
            Let’s Create
            <br />
            Something Meaningful
          </h2>
          <address>
            <a href="mailto:naresh@s4eaindia.com">naresh@s4eaindia.com</a>
            <a href="tel:+919000299600">+91 9000299600</a>
            <span>Vijayawada, Andhra Pradesh</span>
          </address>
        </div>
        <div className="sea-footer-bottom">
          <span>© 2026 SEA – Studio for Eclectic Architecture</span>
          <nav aria-label="Footer">
            <Link to="/about">Who We Are</Link>
            <Link to="/projects">Projects</Link>
            <a href="/studio.html#services">What We Do</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
      <button
        type="button"
        className={"sea-scroll-top" + (showTop ? " is-visible" : "")}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
