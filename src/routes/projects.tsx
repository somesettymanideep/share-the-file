import { createFileRoute } from "@tanstack/react-router";
import SeaProjects from "@/components/SeaProjects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects – The Art of Architecture | SEA" },
      {
        name: "description",
        content:
          "Explore SEA's built work — residences, estates, towers and healthcare campuses by Studio for Eclectic Architecture.",
      },
      { property: "og:title", content: "Projects – The Art of Architecture | SEA" },
      {
        property: "og:description",
        content:
          "Explore SEA's built work — residences, estates, towers and healthcare campuses by Studio for Eclectic Architecture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" }],
  }),
  component: SeaProjects,
});
