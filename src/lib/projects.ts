import manjunatha from "@/assets/sea-project-manjunatha-constructions.jpg";
import sarika from "@/assets/sea-project-sarika-estate.jpg";
import mantralayam1 from "@/assets/sea-project-mantralayam-01.webp";
import mantralayam2 from "@/assets/sea-project-mantralayam-02.webp";
import mantralayam3 from "@/assets/sea-project-mantralayam-03.webp";
import krishnaSindhura from "@/assets/sea-project-krishna-sindhura-hospital.jpg";
import krishnaSindhura1 from "@/assets/sea-project-krishna-sindhura-hospital-01.jpg";
import krishnaSindhura2 from "@/assets/sea-project-krishna-sindhura-hospital-02.jpg";
import krishnaSindhura3 from "@/assets/sea-project-krishna-sindhura-hospital-03.jpg";
import krishnaSindhura4 from "@/assets/sea-project-krishna-sindhura-hospital-04.webp";
import gangadhar from "@/assets/sea-project-gangadhar-estate.jpg";
import gangadharSunset from "@/assets/sea-project-gangadhar-estate-sunset.png";
import gangadharFrontView from "@/assets/sea-project-gangadhar-estate-front-view.png";
import kishoreJain from "@/assets/sea-project-kishore-jain-kms-infra.jpg";
import sindhuraFront from "@/assets/sea-project-sindhura-hospital-front.webp";
import sindhuraAtrium from "@/assets/sea-project-sindhura-hospital-atrium.webp";
import sindhuraDome from "@/assets/sea-project-sindhura-hospital-dome.webp";
import sindhuraDomeAerial from "@/assets/sea-project-sindhura-hospital-dome-aerial.webp";

export const SEA_PROJECT_CATEGORIES = ["architecture", "interior", "landscape", "bim"] as const;
export type SeaProjectCategory = (typeof SEA_PROJECT_CATEGORIES)[number];

export const SEA_PROJECT_CATEGORY_LABELS: Record<SeaProjectCategory, string> = {
  architecture: "Architecture",
  interior: "Interior",
  landscape: "Landscape",
  bim: "BIM",
};

export interface SeaProject {
  slug: string;
  title: string;
  category: SeaProjectCategory;
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
    category: "architecture",
    description:
      "A four-level residence wrapped in colour-blocked perforated screens and climbing vines that filter light and cool the interiors.",
    image: manjunatha,
    alt: "Manjunatha Constructions residence with colour-blocked perforated screens",
  },
  {
    slug: "sarika-estate",
    title: "Sarika Estate",
    category: "architecture",
    description:
      "A gated villa community beside the highway, anchored by a tiled-roof convention centre, a parking court and a landscaped entry.",
    image: sarika,
    alt: "Sarika Estate gated villa community with tiled-roof convention centre",
  },
  {
    slug: "mantralayam",
    title: "Mantralayam",
    category: "architecture",
    description:
      "A multi-level conventions and service apartments development with a vibrant commercial streetscape and refined stone-clad facade.",
    image: mantralayam1,
    alt: "Mantralayam conventions and service apartments building front elevation",
    gallery: [
      { image: mantralayam1, alt: "Mantralayam building front elevation — day view 01" },
      { image: mantralayam2, alt: "Mantralayam building front elevation — night view 02" },
      { image: mantralayam3, alt: "Mantralayam corner perspective with streetscape — night view 03" },
    ],
  },
  {
    slug: "krishna-sindhura-hospital",
    title: "Krishna Sindhura Hospital",
    category: "architecture",
    description:
      "A multi-block healthcare campus joined by a glazed atrium and a sky-garden podium, planned around a clear, calm arrival.",
    image: krishnaSindhura1,
    alt: "Krishna Sindhura Hospital campus front elevation with glazed atrium",
    gallery: [
      { image: krishnaSindhura1, alt: "Krishna Sindhura Hospital front elevation — view 01" },
      { image: krishnaSindhura2, alt: "Krishna Sindhura Hospital stained-glass pavilion dome exterior — view 02" },
      { image: krishnaSindhura3, alt: "Krishna Sindhura Hospital stained-glass dome aerial view — view 03" },
      { image: krishnaSindhura4, alt: "Krishna Sindhura Hospital glazed atrium interior — view 04" },
    ],
  },
  {
    slug: "gangadhar-estate",
    title: "Gangadhar Estate",
    category: "architecture",
    location: "Vijayawada, Andhra Pradesh",
    plotSize: "2,110 Sq. Yds.",
    status: "Completed",
    architectureStyle: "Parametric",
    description:
      "A slender tower whose sculpted slab edges sweep across the façade, glowing warm against the evening sky.",
    image: gangadhar,
    alt: "Gangadhar Estate tower with sculpted slab edges at dusk",
    gallery: [
      { image: gangadharSunset, alt: "Gangadhar Estate sunset facade with cars and landscaping — view 01" },
      { image: gangadharFrontView, alt: "Gangadhar Estate building front view — view 02" },
      { image: gangadharSunset, alt: "Gangadhar Estate sunset facade with cars and landscaping — view 03" },
    ],
  },
  {
    slug: "kishore-jain-kms-infra",
    title: "Kishore Jain KMS Infra",
    category: "architecture",
    description:
      "Stepped residential terraces with continuous planted balconies that give every home a green edge.",
    image: kishoreJain,
    alt: "Kishore Jain KMS Infra stepped terraces with planted balconies",
  },
];

export function getProject(slug: string) {
  return SEA_PROJECTS.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category?: SeaProjectCategory) {
  if (!category) return SEA_PROJECTS;
  return SEA_PROJECTS.filter((project) => project.category === category);
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
