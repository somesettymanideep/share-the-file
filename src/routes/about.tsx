import { createFileRoute } from "@tanstack/react-router";
import SeaAbout from "@/components/SeaAbout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SEA — Studio for Eclectic Architecture" },
      { name: "description", content: "Meet SEA: architectural vision, structural precision, and thoughtful BIM design. Our history, founder P.V. Naresh Kumar, values, and recognition." },
      { property: "og:title", content: "About SEA — Built on Vision. Driven by Design." },
      { property: "og:description", content: "Discover the people, principles, and recognition behind Studio for Eclectic Architecture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" },
    ],
  }),
  component: SeaAbout,
});