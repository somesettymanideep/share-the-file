import { Link } from "@tanstack/react-router";
import { ContainerAnimated, ContainerScroll, ContainerStagger, ContainerSticky, GalleryCol, GalleryContainer } from "@/components/ui/animated-gallery";
import { SEA_PROJECTS } from "@/lib/projects";
import SeaProjectShell from "@/components/SeaProjectShell";

const COLS = [0, 1, 2].map((column) => SEA_PROJECTS.filter((_, index) => index % 3 === column));
const COL_Y_RANGES: [string, string][] = [["-10%", "2%"], ["15%", "5%"], ["-10%", "2%"]];

export default function SeaProjects() {
  return <SeaProjectShell>
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
          </ContainerScroll>
        </section>

      </main>
  </SeaProjectShell>;
}
