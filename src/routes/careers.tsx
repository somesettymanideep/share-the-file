import { createFileRoute } from "@tanstack/react-router";
import SeaCareers from "@/components/SeaCareers";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Design Your Next Chapter | SEA" },
      {
        name: "description",
        content: "Explore career opportunities at Studio for Eclectic Architecture. Open positions for Senior Architects, BIM Managers, Interior Architects, and Structural Engineers in Hyderabad and Vijayawada.",
      },
      { property: "og:title", content: "Careers — Design Your Next Chapter | Studio for Eclectic Architecture" },
      {
        property: "og:description",
        content: "Join SEA's multidisciplinary architecture, interior, structural, and BIM practice. Review openings and show us how you think.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: SeaCareers,
});
