import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SeaProjectShell from "@/components/SeaProjectShell";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { Button } from "@/components/ui/button";
import { getAdjacentProjects, getProject } from "@/lib/projects";

export const Route = createFileRoute("/projects_/$slug")({
  beforeLoad: ({ params }) => { if (!getProject(params.slug)) throw notFound(); },
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project ? `${project.title} — Architecture | SEA` : "Project unavailable | SEA";
    const description = project?.description ?? "Explore architecture projects by Studio for Eclectic Architecture.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" }] };
  },
  component: ProjectDetailsPage,
  notFoundComponent: () => <SeaProjectShell><main className="project-details"><h1>Project not found</h1><Link to="/projects" className="project-back"><ArrowLeft />Back to Projects</Link></main></SeaProjectShell>,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return <SeaProjectShell><main className="project-details"><h1>This project couldn’t load</h1><Button onClick={() => { void router.invalidate(); reset(); }}>Try again</Button><Link to="/projects" className="project-back">Back to Projects</Link></main></SeaProjectShell>;
  },
});

function ProjectDetailsPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) return null;
  const { previous, next } = getAdjacentProjects(slug);
  return <SeaProjectShell><main className="project-details" key={slug}>
    <Link to="/projects" className="project-back project-back-overlay"><ArrowLeft size={18} />Back to Projects</Link>
    <ProjectImageGallery key={slug} project={project} />
    <section className="project-information" aria-labelledby="project-information-heading">
      <div><h2 id="project-information-heading">Project Details</h2><p>{project.description}</p></div>
      <dl>{[
        ["Location", project.location], ["Plot Size", project.plotSize], ["Status", project.status], ["Architecture Style", project.architectureStyle],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? "To be confirmed"}</dd></div>)}</dl>
    </section>
    <nav className="project-adjacent" aria-label="Project navigation">
      {previous && <Link to="/projects/$slug" params={{ slug: previous.slug }}><small><ArrowLeft size={16} />Previous Project</small><span>{previous.title}</span></Link>}
      {next && <Link to="/projects/$slug" params={{ slug: next.slug }}><small>Next Project<ArrowRight size={16} /></small><span>{next.title}</span></Link>}
    </nav>
  </main></SeaProjectShell>;
}