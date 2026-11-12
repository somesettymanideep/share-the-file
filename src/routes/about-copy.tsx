import { createFileRoute } from "@tanstack/react-router";
import SeaAboutCopy from "@/components/about-copy/SeaAbout";

export const Route = createFileRoute("/about-copy")({
  head: () => ({
    meta: [
      { title: "About SEA (Copy) — Studio for Eclectic Architecture" },
      { name: "description", content: "Working copy of the SEA about page: history, founder P.V. Naresh Kumar, values, and recognition." },
      { property: "og:title", content: "About SEA (Copy) — Built on Vision. Driven by Design." },
      { property: "og:description", content: "Working copy of the Studio for Eclectic Architecture about page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" },
    ],
  }),
  component: SeaAboutCopy,
});
