import { createFileRoute } from "@tanstack/react-router";
import SeaContact from "@/components/SeaContact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SEA — Let’s Create Something Extraordinary" },
      { name: "description", content: "Discuss your architecture project with SEA in Vijayawada. Contact Studio for Eclectic Architecture and explore our office and project locations." },
      { property: "og:title", content: "Contact SEA — Let’s Create Something Extraordinary" },
      { property: "og:description", content: "Begin a conversation with SEA about your next architectural project. Find our Vijayawada office and explore our work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" }],
  }),
  component: SeaContact,
});