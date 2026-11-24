import sarika from "@/assets/sea-project-sarika-estate.jpg";
import mantralayam1 from "@/assets/sea-project-mantralayam-01.webp";
import mantralayam2 from "@/assets/sea-project-mantralayam-02.webp";
import mantralayam3 from "@/assets/sea-project-mantralayam-03.webp";
import sindhuraHospitalFront from "@/assets/Sindhura-hospital-one.png";
import sindhuraHospitalDome from "@/assets/Sindhura-hospital-two.png";
import sindhuraHospitalAerial from "@/assets/sindhura-hospital-four.png";
import sindhuraHospitalAtrium from "@/assets/sindhura-hospital-three.png";
import gangadhar from "@/assets/sea-project-gangadhar-estate.jpg";
import gangadharSunset from "@/assets/sea-project-gangadhar-estate-sunset.png";
import gangadharFrontView from "@/assets/sea-project-gangadhar-estate-front-view.png";
import kishoreJain from "@/assets/sea-project-kishore-jain-kms-infra.jpg";
import regaPrimeOne from "@/assets/Rega-prime-one.png";
import regaPrimeTwo from "@/assets/Rega-prime-two.png";
import regaPrimeThree from "@/assets/Rega-prime-three.png";

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
  slug: "rega-prime",
  title: "Rega Prime",
  category: "architecture",
  description: "Explore Rega Prime through three architectural views.",
  image: regaPrimeOne,
  alt: "Rega Prime architectural view 1",
  gallery: [
    { image: regaPrimeOne, alt: "Rega Prime architectural view 1" },
    { image: regaPrimeTwo, alt: "Rega Prime architectural view 2" },
    { image: regaPrimeThree, alt: "Rega Prime architectural view 3" },
  ],
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
    "A multi-block hospital campus with a landscaped podium and a stained-glass dome above the central atrium.",
  image: sindhuraHospitalFront,
  alt: "Krishna Sindhura Hospital front elevation with two towers and a landscaped podium",
  gallery: [
    {
      image: sindhuraHospitalFront,
      alt: "Krishna Sindhura Hospital front elevation with two towers and a landscaped podium",
    },
    {
      image: sindhuraHospitalDome,
      alt: "Exterior view of the stained-glass dome beneath a curved white canopy",
    },
    {
      image: sindhuraHospitalAerial,
      alt: "Top-down view of the stained-glass dome and surrounding terrace planters",
    },
    {
      image: sindhuraHospitalAtrium,
      alt: "View looking up at the stained-glass ceiling between glass-railed balconies",
    },
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
