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
import kishoreDuplex1 from "@/assets/sea-project-kishore-jain-duplex-01.webp";
import kishoreDuplex2 from "@/assets/sea-project-kishore-jain-duplex-02.webp";
import kishoreDuplex3 from "@/assets/sea-project-kishore-jain-duplex-03.webp";
import kishoreDuplex4 from "@/assets/sea-project-kishore-jain-duplex-04.webp";
import kishoreDuplex5 from "@/assets/sea-project-kishore-jain-duplex-05.webp";
import kishoreDuplex6 from "@/assets/sea-project-kishore-jain-duplex-06.webp";
import kishoreDuplex7 from "@/assets/sea-project-kishore-jain-duplex-07.webp";
import kishoreDuplex8 from "@/assets/sea-project-kishore-jain-duplex-08.webp";
import kishoreDuplex9 from "@/assets/sea-project-kishore-jain-duplex-09.webp";
import sravyaResidence1 from "@/assets/sravya-one.png";
import sravyaResidence2 from "@/assets/sravya-three.png";
import mallikarjunReddy1 from "@/assets/malikarjun-reddy-one.png";
import mallikarjunReddy2 from "@/assets/malikarjun-reddy-two.png";
import mallikarjunInterior1 from "@/assets/malikarjun-reddy-interior.png";
import mallikarjunInterior2 from "@/assets/malikarjun-reddy-interior-two.png";
import mallikarjunInterior3 from "@/assets/malikarjun-reddy-interior-three.png";
import mallikarjunInterior4 from "@/assets/malikarjun-reddy-interior-four.png";
import mallikarjunInterior5 from "@/assets/malikarjun-reddy-interior-five.png";
import mallikarjunLandscape1 from "@/assets/malikarjun-reddy-landscape-one.png";
import mallikarjunLandscape2 from "@/assets/malikarjun-reddy-landscape-two.png";
import mallikarjunLandscape3 from "@/assets/malikarjun-reddy-landscape-three.png";

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
    location: "Hyderabad, TG.",
    architectureStyle: "Modern",
    plotSize: "12500 Sq.ft.",
    status: "Completed",
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
    location: "Vijayawada, AP.",
    architectureStyle: "Modern",
    plotSize: "13682 sft",
    status: "Completed",
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
    slug: "sravya-residence",
    title: "Sravya Residence",
    category: "architecture",
    status: "Completed",
    architectureStyle: "Contemporary Modern",
    description:
      "A multi-tiered contemporary villa featuring an iconic circular oculus window, warm terracotta brickwork, perforated brick jali screens, and lush cascading terrace planters.",
    image: sravyaResidence1,
    alt: "Sravya Residence front elevation with terracotta brick facade, circular oculus window, and landscaped balconies",
    gallery: [
      {
        image: sravyaResidence1,
        alt: "Sravya Residence front elevation with terracotta brick facade, circular oculus window, and landscaped balconies — view 01",
      },
      {
        image: sravyaResidence2,
        alt: "Sravya Residence corner perspective with perforated brick jali screen and rooftop spiral staircase — view 02",
      },
    ],
  },
  {
    slug: "mallikarjun-reddy-residence",
    title: "Mallikarjun Reddy Residence",
    category: "architecture",
    status: "Completed",
    architectureStyle: "Classical Neoclassical",
    description:
      "A stately neoclassical multi-story residence defined by fluted classical pilasters, arched French balconies with bespoke wrought-iron railings, intricate entablature cornices, and layered facade illumination.",
    image: mallikarjunReddy1,
    alt: "Mallikarjun Reddy Residence daytime corner perspective showcasing neoclassical facade and wrought iron balconies",
    gallery: [
      {
        image: mallikarjunReddy1,
        alt: "Mallikarjun Reddy Residence daytime corner perspective showcasing neoclassical facade and wrought iron balconies — view 01",
      },
      {
        image: mallikarjunReddy2,
        alt: "Mallikarjun Reddy Residence dual daytime and night illumination architectural elevation — view 02",
      },
    ],
  },
  {
    slug: "naksthravnam",
    title: "Naksthravnam",
    category: "landscape",
    location: "Amaravathi,AP",
    architectureStyle: "Modern",
    plotSize: "2 Acres.",
    status: "Completed",
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
    slug: "mallikarjun-reddy-landscape",
    title: "Mallikarjun Reddy Residence",
    category: "landscape",
    status: "Completed",
    architectureStyle: "Classical Neoclassical",
    description:
      "An open-air neoclassical courtyard landscape featuring warm illuminated wall alcoves with a central marble sculpture, vibrant flowerbeds, circular stone mosaic paving, an alfresco garden bar, and a sunlit cinema pavilion.",
    image: mallikarjunLandscape1,
    alt: "Mallikarjun Reddy Residence courtyard landscape with illuminated neoclassical arches, marble sculpture, and mosaic stone terrace",
    gallery: [
      {
        image: mallikarjunLandscape1,
        alt: "Mallikarjun Reddy Residence courtyard landscape with illuminated neoclassical arches, marble sculpture, and mosaic stone terrace — view 01",
      },
      {
        image: mallikarjunLandscape2,
        alt: "Mallikarjun Reddy Residence outdoor courtyard bar with green marble counter, arched wood vitrines, and mosaic flooring — view 02",
      },
      {
        image: mallikarjunLandscape3,
        alt: "Mallikarjun Reddy Residence cinema pavilion with grid-iron glass facade overlooking the landscaped courtyard — view 03",
      },
    ],
  },
  {
    slug: "chandramouli",
    title: "Chandramouli",
    category: "interior",
    categories: ["interior", "architecture"],
    location: "Chimakurthy,AP.",
    architectureStyle: "Modern",
    plotSize: "12500 Sq.ft.",
    status: "Completed",
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
  {
    slug: "kishore-jain-duplex",
    title: "Kishore Jain Duplex",
    category: "interior",
    location: "Vijayawada, AP.",
    description:
      "A duplex residence organised around a planted courtyard, with fluted timber walls, curved cove lighting, marble floors and custom joinery carried through the living rooms, bedrooms, study and kitchen.",
    image: kishoreDuplex1,
    alt: "Kishore Jain Duplex planted courtyard with stone paving, built-in bench seating and a low water basin",
    gallery: [
      { image: kishoreDuplex1, alt: "Kishore Jain Duplex planted courtyard with stone paving, built-in bench seating and a low water basin — view 01" },
      { image: kishoreDuplex2, alt: "Kishore Jain Duplex master bedroom with textured acoustic wall panels, platform bed and arched bedside lamps — view 02" },
      { image: kishoreDuplex3, alt: "Kishore Jain Duplex living room media wall in fluted timber with curved LED backlighting and floating console — view 03" },
      { image: kishoreDuplex4, alt: "Kishore Jain Duplex bedroom in dusty pink with scalloped headboard, arched wardrobes and corner study desk — view 04" },
      { image: kishoreDuplex5, alt: "Kishore Jain Duplex bedroom with diamond-tufted headboard, fluted timber panels and sheer curtained daylight — view 05" },
      { image: kishoreDuplex6, alt: "Kishore Jain Duplex living room with ceiling skylight, curved timber media unit and low modular sectional — view 06" },
      { image: kishoreDuplex7, alt: "Kishore Jain Duplex lounge with marble floor, timber panelling, platform sectional and round layered coffee table — view 07" },
      { image: kishoreDuplex8, alt: "Kishore Jain Duplex entrance foyer with timber-slat ceiling, marble floor and built-in bench planter — view 08" },
      { image: kishoreDuplex9, alt: "Kishore Jain Duplex entryway, glass-partitioned bathroom and kitchen cabinetry shown together — view 09" },
    ],
  },
  {
    slug: "mallikarjun-reddy-interior",
    title: "Mallikarjun Reddy Residence",
    category: "interior",
    status: "Completed",
    architectureStyle: "Contemporary Luxury",
    description:
      "A bespoke luxury residence featuring a nature-inspired living lounge with botanical palm murals, calacatta marble media wall, sage green shaker kitchen cabinetry, a whimsical safari-themed children's bedroom, and an elegant fluted dressing suite.",
    image: mallikarjunInterior1,
    alt: "Mallikarjun Reddy Residence living lounge with botanical palm mural, olive velvet sofa, and timber screen divider",
    gallery: [
      {
        image: mallikarjunInterior1,
        alt: "Mallikarjun Reddy Residence living lounge with botanical palm mural, olive velvet sofa, and timber screen divider — view 01",
      },
      {
        image: mallikarjunInterior2,
        alt: "Mallikarjun Reddy Residence media wall with calacatta marble backdrop, ambient cove lighting, and sage display joinery — view 02",
      },
      {
        image: mallikarjunInterior3,
        alt: "Mallikarjun Reddy Residence kitchen and dining with sage green cabinetry, stainless steel appliances, and arched glassware display — view 03",
      },
      {
        image: mallikarjunInterior4,
        alt: "Mallikarjun Reddy Residence children's bedroom with hot air balloon mural, study desk, and playful safari theme — view 04",
      },
      {
        image: mallikarjunInterior5,
        alt: "Mallikarjun Reddy Residence walk-in dressing suite with fluted slate-blue drawers, gold hardware, and illuminated arched vanity mirror — view 05",
      },
    ],
  },
];

export function getProject(slug: string) {
  return SEA_PROJECTS.find(
    (project) =>
      project.slug === slug ||
      (slug === "nakshatravanam" && project.slug === "naksthravnam") ||
      (slug === "laitoncrafts" && project.slug === "laiton-crafts") ||
      (slug === "lation-crafts" && project.slug === "laiton-crafts") ||
      (slug === "kms-infra" && project.slug === "kishore-jain-kms-infra") ||
      (slug === "kishore-jain" && project.slug === "kishore-jain-kms-infra") ||
      (slug === "sravya" && project.slug === "sravya-residence") ||
      (slug === "mallikarjun-reddy" && project.slug === "mallikarjun-reddy-residence") ||
      (slug === "mallikarjun" && project.slug === "mallikarjun-reddy-residence") ||
      (slug === "mallikarjun-reddy-interior" && project.slug === "mallikarjun-reddy-interior") ||
      (slug === "mallikarjun-interior" && project.slug === "mallikarjun-reddy-interior") ||
      (slug === "mallikarjun-reddy-residence-interior" && project.slug === "mallikarjun-reddy-interior") ||
      (slug === "mallikarjun-reddy-landscape" && project.slug === "mallikarjun-reddy-landscape") ||
      (slug === "mallikarjun-landscape" && project.slug === "mallikarjun-reddy-landscape") ||
      (slug === "mallikarjun-reddy-residence-landscape" && project.slug === "mallikarjun-reddy-landscape") ||
      (slug === "sindhura-hospital" && project.slug === "krishna-sindhura-hospital"),
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
