import { createFileRoute } from "@tanstack/react-router";
import SeaContact from "@/components/SeaContact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SEA — Let’s Create Something Extraordinary" },
      { name: "description", content: "Contact Studio for Eclectic Architecture in Hyderabad. Explore India's states, union territories and capitals, and find directions to SEA's corporate office." },
      { property: "og:title", content: "Contact SEA — Let’s Create Something Extraordinary" },
      { property: "og:description", content: "Begin a conversation with SEA about your next architectural project. Explore India and find our Hyderabad corporate office." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" }],
  }),
  component: SeaContact,
});