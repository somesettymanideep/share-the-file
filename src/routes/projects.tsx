import { createFileRoute } from "@tanstack/react-router";
import SeaProjects from "@/components/SeaProjects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects – The Art of Creation | SEA" },
      {
        name: "description",
        content:
          "Explore SEA's built work — residences, estates, towers and healthcare campuses by Studio for Eclectic Architecture.",
      },
      { property: "og:title", content: "Projects – The Art of Creation | SEA" },
      {
        property: "og:description",
        content:
          "Explore SEA's built work — residences, estates, towers and healthcare campuses by Studio for Eclectic Architecture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeaProjects,
});
