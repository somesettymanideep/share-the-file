import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerAnimated, ContainerScroll, ContainerStagger, ContainerSticky, GalleryCol, GalleryContainer } from "@/components/ui/animated-gallery";
import { getProjectsByCategory, SEA_PROJECT_CATEGORIES, SEA_PROJECT_CATEGORY_HEADINGS, SEA_PROJECT_CATEGORY_HEADING_LINES, SEA_PROJECT_CATEGORY_LABELS, type SeaProjectCategory } from "@/lib/projects";
import SeaProjectShell from "@/components/SeaProjectShell";

const COL_Y_RANGES: [string, string][] = [["-10%", "2%"], ["15%", "5%"], ["-10%", "2%"]];

export default function SeaProjects({ category }: { category?: SeaProjectCategory }) {
  const projects = getProjectsByCategory(category);
  const cols = [0, 1, 2].map((column) => projects.filter((_, index) => index % 3 === column));
  const [line1, line2] = category
    ? SEA_PROJECT_CATEGORY_HEADING_LINES[category]
    : ["The Art of", "Architecture"];
  const galleryRef = useRef<HTMLDivElement>(null);

  // Right-to-left clip-path reveal per image, scrubbed to scroll.
  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>(".sea-projects-tile figure").forEach((figure) => {
        const img = figure.querySelector("img");
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: figure, start: "top 95%", end: "top 45%", scrub: 1 },
        });
        tl.fromTo(figure, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0);
        if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1 }, 0);
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); mm.revert(); };
  }, [category]);

  return <SeaProjectShell>
      <main>
        <section className="sea-projects-hero" aria-labelledby="projects-heading">
          <ContainerStagger className="sea-projects-intro">
            <ContainerAnimated>
              <h1 id="projects-heading" className="sea-projects-heading">
                <span className="sea-projects-heading-line">{line1}</span>
                <span className="sea-projects-heading-line">
                  {line2}<span className="sea-projects-dot">.</span>
                </span>
              </h1>
            </ContainerAnimated>
            {!category && <ContainerAnimated>
              <p className="sea-projects-lede">
                Where structure meets imagination — residences, estates, towers and
                care campuses, each one an eclectic composition of light, material
                and form, crafted for the people who live with them.
              </p>
            </ContainerAnimated>}
            {!category && <ContainerAnimated>
              <nav className="sea-projects-filters" aria-label="Project categories">
                <Link to="/projects" className="sea-projects-filter" aria-current="page">All</Link>
                {SEA_PROJECT_CATEGORIES.map((item) => (
                  <Link key={item} to="/projects/$slug" params={{ slug: item }} className="sea-projects-filter">
                    {SEA_PROJECT_CATEGORY_LABELS[item]}
                  </Link>
                ))}
              </nav>
            </ContainerAnimated>}
          </ContainerStagger>

          {projects.length === 0 ? (
            <div className="sea-projects-empty">
              <p>No {category ? SEA_PROJECT_CATEGORY_LABELS[category].toLowerCase() : ""} projects published yet.</p>
              <Link to="/projects/$slug" params={{ slug: "architecture" }} className="sea-projects-empty-link">View all projects</Link>
            </div>
          ) : (
          <div ref={galleryRef}><ContainerScroll className="sea-projects-scroll">
            <ContainerSticky className="sea-projects-sticky">
              <GalleryContainer className="sea-projects-gallery">
                {cols.map((col, colIndex) => (
                  <GalleryCol
                    key={colIndex}
                    yRange={COL_Y_RANGES[colIndex] ?? ["0%", "0%"]}
                    className={colIndex === 1 ? "sea-projects-col-mid" : undefined}
                  >
                    {col.map((project) => (
                      <Link className="sea-projects-tile" key={project.slug} to="/projects/$slug" params={{ slug: project.slug }} aria-label={`View ${project.title}`}><figure>
                        <img src={project.image} alt={project.alt} loading="lazy" />
                        <figcaption>
                          <span>{project.title}</span>
                        </figcaption>
                      </figure></Link>
                    ))}
                  </GalleryCol>
                ))}
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll></div>
          )}
        </section>

      </main>
  </SeaProjectShell>;
}
