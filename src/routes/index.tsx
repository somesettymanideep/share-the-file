import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio – Architecture" },
      { name: "description", content: "Studio for Eclectic Architecture homepage." },
      { property: "og:title", content: "Studio – Architecture" },
      { property: "og:description", content: "Studio for Eclectic Architecture homepage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/studio.html", reloadDocument: true });
  },
  component: () => null,
});
