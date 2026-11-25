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
import kishoreJain1 from "@/assets/sea-project-kishore-jain-kms-infra-01.png";
import kishoreJain2 from "@/assets/sea-project-kishore-jain-kms-infra-02.png";
import kishoreJain3 from "@/assets/sea-project-kishore-jain-kms-infra-03.png";
import kishoreJain4 from "@/assets/sea-project-kishore-jain-kms-infra-04.png";
import regaPrimeOne from "@/assets/Rega-prime-one.png";
import regaPrimeTwo from "@/assets/Rega-prime-two.png";
import regaPrimeThree from "@/assets/Rega-prime-three.png";
import naksthravnam1 from "@/assets/naksthravanam-one.png";
import naksthravnam2 from "@/assets/Naksthravnam-two.png";
import naksthravnam3 from "@/assets/Naksthravnam-three.png";
import naksthravnam4 from "@/assets/Naksthravnam-four.png";
import naksthravnam5 from "@/assets/Naksthravnam-five.png";
import naksthravnam6 from "@/assets/Naksthravnam-six.png";
import naksthravnam7 from "@/assets/Naksthravnam-seven.webp";
import chandramouli1 from "@/assets/sea-project-chandramouli-01.jpg";
import chandramouli2 from "@/assets/sea-project-chandramouli-02.jpg";
import chandramouli3 from "@/assets/sea-project-chandramouli-03.jpg";
import chandramouli4 from "@/assets/sea-project-chandramouli-04.jpg";
import chandramouli5 from "@/assets/sea-project-chandramouli-05.jpg";
import chandramouli6 from "@/assets/sea-project-chandramouli-06.jpg";
import laitonCrafts1 from "@/assets/sea-project-laiton-crafts-01.png";
import laitonCrafts2 from "@/assets/sea-project-laiton-crafts-02.jpg";
import laitonCrafts3 from "@/assets/sea-project-laiton-crafts-03.jpg";
import laitonCrafts4 from "@/assets/sea-project-laiton-crafts-04.jpg";
import laitonCrafts5 from "@/assets/sea-project-laiton-crafts-05.jpg";

export const SEA_PROJECT_CATEGORIES = ["architecture", "interior", "landscape", "bim"] as const;
export type SeaProjectCategory = (typeof SEA_PROJECT_CATEGORIES)[number];

export const SEA_PROJECT_CATEGORY_LABELS: Record<SeaProjectCategory, string> = {
  architecture: "Architecture",
  interior: "Interior",
  landscape: "Landscape",
  bim: "BIM",
};

export const SEA_PROJECT_CATEGORY_HEADINGS: Record<SeaProjectCategory, string> = {
  architecture: "The Art of Architecture",
  interior: "Crafted from the Inside Out",
  landscape: "Outdoor Spaces, Shaped by Design",
  bim: "The Models Behind the Build",
};

export const SEA_PROJECT_CATEGORY_HEADING_LINES: Record<SeaProjectCategory, [string, string]> = {
  architecture: ["The Art of", "Architecture"],
  interior: ["Crafted from", "the Inside Out"],
  landscape: ["Outdoor Spaces,", "Shaped by Design"],
  bim: ["The Models", "Behind the Build"],
};

export interface SeaProject {
  slug: string;
  title: string;
  category: SeaProjectCategory;
  categories?: SeaProjectCategory[];
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
    categories: [],
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
      "Stepped residential terraces with continuous planted balconies, biophilic facade curves, and wind-harnessed skybridges.",
    image: kishoreJain1,
    alt: "Kishore Jain KMS Infra full front facade elevation with planted terraces",
    gallery: [
      { image: kishoreJain1, alt: "Kishore Jain KMS Infra full front facade elevation with landscaped residence entrance — view 01" },
      { image: kishoreJain2, alt: "Kishore Jain KMS Infra stepped balconies with cascading flora and bougainvillea — view 02" },
      { image: kishoreJain3, alt: "Kishore Jain KMS Infra twin residential towers with connecting skybridges and wind turbines — view 03" },
      { image: kishoreJain4, alt: "Kishore Jain KMS Infra corner upward perspective of biophilic undulating balconies — view 04" },
    ],
  },
  {
    slug: "naksthravnam",
    title: "Naksthravnam",
    category: "landscape",
    description:
      "An expansive ecological landscape sanctuary harmonizing sacred planetary groves, sculpted water bodies, walking paths, and immersive native flora.",
    image: naksthravnam1,
    alt: "Naksthravnam landscape sanctuary with expansive green lawns and pathways",
    gallery: [
      { image: naksthravnam1, alt: "Naksthravnam landscape master plan and central vista — view 01" },
      { image: naksthravnam2, alt: "Naksthravnam lush garden promenade and water feature — view 02" },
      { image: naksthravnam3, alt: "Naksthravnam shaded canopy walkways and stone plazas — view 03" },
      { image: naksthravnam4, alt: "Naksthravnam central pavilion and reflection pool — view 04" },
      { image: naksthravnam5, alt: "Naksthravnam aerial perspective of ceremonial gardens — view 05" },
      { image: naksthravnam6, alt: "Naksthravnam contoured earth mounds and native planting — view 06" },
      { image: naksthravnam7, alt: "Naksthravnam panoramic twilight view across the estate — view 07" },
    ],
  },
  {
    slug: "laiton-crafts",
    title: "Laiton Crafts",
    category: "landscape",
    description:
      "An artisan industrial landscape combining a signature arrival canopy, curated outdoor sculpture promenades, raised bamboo courtyards, and secluded timber pergola retreats.",
    image: laitonCrafts1,
    alt: "Laiton Crafts grand entrance gate and signature marquee canopy",
    gallery: [
      { image: laitonCrafts1, alt: "Laiton Crafts grand entrance gate with marquee canopy and floral guard pavilion — view 01" },
      { image: laitonCrafts2, alt: "Laiton Crafts facility facade with raised bamboo planter beds and paved promenade — view 02" },
      { image: laitonCrafts3, alt: "Laiton Crafts industrial frontage with golden sculptural art installations — view 03" },
      { image: laitonCrafts4, alt: "Laiton Crafts driveway promenade with circular seating pods and blooming trees — view 04" },
      { image: laitonCrafts5, alt: "Laiton Crafts courtyard garden with timber pergola and manicured hedges — view 05" },
    ],
  },
  {
    slug: "chandramouli",
    title: "Chandramouli",
    category: "interior",
    categories: ["interior", "architecture"],
    description:
      "A bespoke luxury residence featuring bookmatched Italian marble, custom timber slatted media joinery, layered architectural lighting, and an integrated dining lounge.",
    image: chandramouli1,
    alt: "Chandramouli master bedroom with bookmatched marble accent wall and custom lighting",
    gallery: [
      { image: chandramouli1, alt: "Chandramouli master bedroom with bookmatched marble wall — view 01" },
      { image: chandramouli2, alt: "Chandramouli family living lounge with slatted wood media wall — view 02" },
      { image: chandramouli3, alt: "Chandramouli dining lounge with sculptural chandelier and bar console — view 03" },
      { image: chandramouli4, alt: "Chandramouli kitchen with fluted splashback and built-in appliances — view 04" },
      { image: chandramouli5, alt: "Chandramouli private home cinema with stepped luxury recliner seating and acoustic lighting — view 05" },
      { image: chandramouli6, alt: "Chandramouli kitchen island with bookmatched marble breakfast bar and integrated ovens — view 06" },
    ],
  },
];

export function getProject(slug: string) {
  return SEA_PROJECTS.find(
    (project) =>
      project.slug === slug ||
      (slug === "nakshatravanam" && project.slug === "naksthravnam") ||
      (slug === "laitoncrafts" && project.slug === "laiton-crafts") ||
      (slug === "lation-crafts" && project.slug === "laiton-crafts"),
  );
}

export function getProjectsByCategory(category?: SeaProjectCategory) {
  if (!category) return SEA_PROJECTS;
  return SEA_PROJECTS.filter((project) =>
    project.categories ? project.categories.includes(category) : project.category === category
  );
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
