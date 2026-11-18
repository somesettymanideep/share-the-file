import manjunatha from "@/assets/sea-project-manjunatha-constructions.jpg.asset.json";
import sarika from "@/assets/sea-project-sarika-estate.jpg.asset.json";
import ramko from "@/assets/sea-project-ramko-heights.jpg.asset.json";
import krishnaSindhura from "@/assets/sea-project-krishna-sindhura-hospital.jpg.asset.json";
import gangadhar from "@/assets/sea-project-gangadhar-estate.jpg.asset.json";
import gangadharSunset from "@/assets/sea-project-gangadhar-estate-sunset.png.asset.json";
import kishoreJain from "@/assets/sea-project-kishore-jain-kms-infra.jpg.asset.json";

export interface SeaProject {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  location?: string;
  plotSize?: string;
  status?: string;
  architectureStyle?: string;
  gallery?: { image: string; alt: string }[];
}

export const SEA_PROJECTS: SeaProject[] = [
  {
    slug: "manjunatha-constructions",
    title: "Manjunatha Constructions",
    description:
      "A four-level residence wrapped in colour-blocked perforated screens and climbing vines that filter light and cool the interiors.",
    image: manjunatha.url,
    alt: "Manjunatha Constructions residence with colour-blocked perforated screens",
  },
  {
    slug: "sarika-estate",
    title: "Sarika Estate",
    description:
      "A gated villa community beside the highway, anchored by a tiled-roof convention centre, a parking court and a landscaped entry.",
    image: sarika.url,
    alt: "Sarika Estate gated villa community with tiled-roof convention centre",
  },
  {
    slug: "ramko-heights",
    title: "Ramko Heights",
    description:
      "A stilt-parking apartment tower with dark framed bays, glazed balconies, warm timber soffits and an illuminated vertical signature.",
    image: ramko.url,
    alt: "Ramko Heights apartment tower with glazed balconies",
  },
  {
    slug: "krishna-sindhura-hospital",
    title: "Krishna Sindhura Hospital",
    description:
      "A multi-block healthcare campus joined by a glazed atrium and a sky-garden podium, planned around a clear, calm arrival.",
    image: krishnaSindhura.url,
    alt: "Krishna Sindhura Hospital campus with glazed atrium",
  },
  {
    slug: "gangadhar-estate",
    title: "Gangadhar Estate",
    location: "Vijayawada, Andhra Pradesh",
    plotSize: "2,110 Sq. Yds.",
    status: "Completed",
    architectureStyle: "Parametric",
    description:
      "A slender tower whose sculpted slab edges sweep across the façade, glowing warm against the evening sky.",
    image: gangadhar.url,
    alt: "Gangadhar Estate tower with sculpted slab edges at dusk",
    gallery: [1, 2, 3].map((view) => ({
      image: gangadharSunset.url,
      alt: `Gangadhar Estate sunset facade with cars and landscaping — view ${String(view).padStart(2, "0")}`,
    })),
  },
  {
    slug: "kishore-jain-kms-infra",
    title: "Kishore Jain KMS Infra",
    description:
      "Stepped residential terraces with continuous planted balconies that give every home a green edge.",
    image: kishoreJain.url,
    alt: "Kishore Jain KMS Infra stepped terraces with planted balconies",
  },
];

export function getProject(slug: string) {
  return SEA_PROJECTS.find((project) => project.slug === slug);
}

export function getProjectGallery(project: SeaProject) {
  if (project.gallery) {
    return project.gallery.map((slot, index) => ({
      id: `${project.slug}-${String(index + 1).padStart(2, "0")}`,
      image: slot.image,
      alt: slot.alt,
    }));
  }
  return [
    { id: `${project.slug}-01`, image: project.image, alt: project.alt },
    { id: `${project.slug}-02`, image: null, alt: `${project.title} — view 02 awaiting photograph` },
    { id: `${project.slug}-03`, image: null, alt: `${project.title} — view 03 awaiting photograph` },
  ];
}

export function getAdjacentProjects(slug: string) {
  const index = SEA_PROJECTS.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: SEA_PROJECTS[(index - 1 + SEA_PROJECTS.length) % SEA_PROJECTS.length],
    next: SEA_PROJECTS[(index + 1) % SEA_PROJECTS.length],
  };
}
