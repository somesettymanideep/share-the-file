import { z } from "zod";
import { STUDIO_CONTACT } from "@/lib/contact";

export interface CareerRole {
  id: string;
  title: string;
  department: "Architecture" | "BIM" | "Interiors" | "Structural";
  departmentLabel: string;
  locations: string[];
  type: string;
  experience: string;
  shortDescription: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  thinkingPrompt: {
    title: string;
    description: string;
    placeholder: string;
  };
}

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "senior-architect-lead",
    title: "Senior Architect / Project Lead",
    department: "Architecture",
    departmentLabel: "Architecture & Masterplanning",
    locations: ["Hyderabad (Corporate Office)", "Vijayawada"],
    type: "Full-Time",
    experience: "5–8 Years",
    shortDescription: "Lead residential, healthcare, and commercial projects from early spatial sketches to site execution and handoff.",
    overview: "As a Senior Architect and Project Lead at SEA, you will steward projects across architectural conception, schematic design, technical development, and construction supervision. You will collaborate directly with Principal Architects, client stakeholders, and site engineers, translating client narratives into tectonic reality.",
    responsibilities: [
      "Drive conceptual and schematic design for luxury residences, commercial hubs, and healthcare facilities.",
      "Lead cross-functional teams of architectural assistants, draftspersons, and 3D visualizers.",
      "Coordinate with structural, MEP, and landscape consultants to ensure cohesive execution.",
      "Conduct regular site visits to inspect construction milestones, finishes, and architectural detailing.",
      "Oversee municipal sanction drawings, tender packages, and client review presentations."
    ],
    requirements: [
      "B.Arch or M.Arch from an accredited institution with Council of Architecture (CoA) registration.",
      "5–8 years of professional experience leading Indian architectural projects through construction.",
      "Proficiency in AutoCAD, Revit, SketchUp, and presentation tools (Photoshop, InDesign).",
      "Deep understanding of Indian building codes (NBC, local bylaws), material specifications, and joinery details.",
      "Demonstrated ability to manage client communications, design schedules, and site problem-solving."
    ],
    benefits: [
      "Direct stewardship of high-profile architectural projects across Southern India.",
      "Collaborative studio culture with active mentorship from Principal Architects.",
      "Competitive remuneration with bi-annual performance bonuses and professional development support.",
      "Site travel allowances and annual studio study tours."
    ],
    thinkingPrompt: {
      title: "Design Synthesis & Site Problem Solving",
      description: "Describe a project where an unexpected site constraint, structural clash, or client pivot tested your design intent. How did you resolve it without compromising architectural integrity?",
      placeholder: "e.g., On a steep hillside residence with restrictive setback rules, we flipped the circulation spine..."
    }
  },
  {
    id: "junior-architect-visualizer",
    title: "Architectural Associate & 3D Visualizer",
    department: "Architecture",
    departmentLabel: "Architecture & Visual Computation",
    locations: ["Vijayawada", "Hyderabad"],
    type: "Full-Time",
    experience: "1–3 Years",
    shortDescription: "Craft compelling 3D visualizations, spatial vignettes, and working drawings that convey the atmosphere of unbuilt spaces.",
    overview: "Join our studio at the foundational stage of your career. In this role, you will assist design leads in translating spatial diagrams into high-fidelity architectural renderings, physical study models, and working drawing sets for active construction sites.",
    responsibilities: [
      "Develop atmospheric architectural visualizations, day/dusk lighting studies, and material mockups.",
      "Produce detailed 2D architectural working drawings, elevations, sections, and detail blow-ups.",
      "Assist in physical model making and digital 3D massing studies.",
      "Support site measurement surveys and client presentation preparation."
    ],
    requirements: [
      "B.Arch from a recognized architectural school.",
      "1–3 years experience (including internship) in an architectural design studio.",
      "Strong portfolio demonstrating atmospheric rendering (Enscape, Rhino, SketchUp, V-Ray, Lumion, or Blender).",
      "Working knowledge of AutoCAD drafting conventions and construction drawings.",
      "Eagerness to learn, ask sharp questions, and absorb architectural knowledge."
    ],
    benefits: [
      "Accelerated learning curve with exposure across all stages of practice.",
      "Mentorship directly under seasoned Senior Architects and Principal Architects.",
      "Dedicated time for digital design workshops, tool experiments, and software mastery.",
      "Competitive starting package with annual performance review."
    ],
    thinkingPrompt: {
      title: "Atmosphere, Light & Visual Storytelling",
      description: "When rendering an architectural space, what is your approach to composition and light? What distinguishes an architectural image that tells a story from a sterile computer render?",
      placeholder: "e.g., I always look for how sunlight washes over natural texture, capturing the dust motes and micro-shadows that make a space feel lived-in..."
    }
  },
  {
    id: "bim-manager-computation",
    title: "BIM Manager / Computational Lead",
    department: "BIM",
    departmentLabel: "Building Information Modeling & Computation",
    locations: ["Hyderabad (Corporate Office)"],
    type: "Full-Time",
    experience: "4–7 Years",
    shortDescription: "Champion BIM standards (LOD 300–400), multidisciplinary clash detection, and parametric modeling workflows.",
    overview: "SEA bridges imaginative design with digital rigor. As our BIM Manager & Computational Lead, you will define and oversee our studio-wide BIM Execution Plans (BEP), parametric scripts, and clash-detection pipelines across large-scale commercial, institutional, and high-rise developments.",
    responsibilities: [
      "Formulate, implement, and maintain studio BIM execution standards, templates, and shared parameter libraries.",
      "Manage federation of architectural, structural, and MEP models in Autodesk Revit and Navisworks.",
      "Run automated clash reports, coordinate spatial resolution meetings, and sign off on coordination models.",
      "Develop custom Dynamo or Grasshopper computational routines for complex geometries and façade panelization.",
      "Train and mentor junior architectural and engineering staff on advanced Revit practices."
    ],
    requirements: [
      "Degree in Architecture, Civil Engineering, or Computational Design.",
      "4–7 years in dedicated BIM coordination or management roles on complex building projects.",
      "Mastery of Autodesk Revit Architecture, Navisworks Manage, and Dynamo or Rhino/Grasshopper.",
      "Solid knowledge of ISO 19650 standards, COBie data delivery, and IFC export interoperability.",
      "Excellent communication skills to lead interdisciplinary coordination forums."
    ],
    benefits: [
      "Leadership of a cutting-edge digital delivery practice in a progressive studio.",
      "Workstations equipped with high-performance hardware and specialized software tooling.",
      "Hybrid work flexibility for documentation and computational research phases.",
      "Opportunity to publish case studies on computational architecture and BIM implementation."
    ],
    thinkingPrompt: {
      title: "Information Architecture & Clash Strategy",
      description: "How do you balance model fidelity (LOD) with team modeling speed? Share an example where your BIM strategy prevented a critical on-site conflict.",
      placeholder: "e.g., In a multi-story healthcare project, MEP routing collided with post-tensioned beam drop panels..."
    }
  },
  {
    id: "interior-architect-ffe",
    title: "Interior Architect & FF&E Specialist",
    department: "Interiors",
    departmentLabel: "Interior Architecture & Spatial Design",
    locations: ["Hyderabad", "Vijayawada"],
    type: "Full-Time",
    experience: "3–6 Years",
    shortDescription: "Curate bespoke interior environments, sensory materiality palettes, custom lighting, and bespoke furniture.",
    overview: "Interior architecture at SEA is never merely skin-deep; it is an organic continuation of structural form and light. In this role, you will craft bespoke residential interiors, boutique hospitality spaces, and executive offices from concept boards to bespoke joinery details.",
    responsibilities: [
      "Develop comprehensive interior design packages including floor plans, reflected ceiling plans, elevations, and millwork details.",
      "Source and curate tactile finishes: stone, handcrafted timber, terracotta tiles, woven textiles, and architectural lighting fixtures.",
      "Design custom furniture, cabinetry, and hardware details for artisan fabrication.",
      "Prepare finish schedules, material sample boards, and cost estimates.",
      "Collaborate with vendors, carpenters, and craftsmen during prototyping and installation."
    ],
    requirements: [
      "Degree or Diploma in Interior Architecture, Interior Design, or Architecture.",
      "3–6 years of demonstrated experience in high-end residential or boutique hospitality interiors.",
      "Strong aesthetic sensibility backed by technical drawing precision in AutoCAD and SketchUp / Revit.",
      "Experience rendering atmospheric spatial mockups with Enscape, V-Ray, or Blender.",
      "Extensive knowledge of local vendor ecosystems, stone yards, timber suppliers, and hardware manufacturers."
    ],
    benefits: [
      "Direct creative ownership of signature interior commissions across luxury residences.",
      "Hands-on engagement with master craftsmen, stone artisans, and bespoke manufacturers.",
      "Inspiring studio material library with continuously refreshed architectural samples.",
      "Competitive compensation package commensurate with portfolio caliber."
    ],
    thinkingPrompt: {
      title: "Materiality, Light & Sensory Experience",
      description: "How do you select materials that age gracefully over time rather than looking worn? Describe your approach to pairing raw and refined textures in a recent space.",
      placeholder: "e.g., We paired sandblasted limestone walls with unlacquered aged bronze hardware so that hand contact points..."
    }
  },
  {
    id: "structural-design-engineer",
    title: "Structural Design Engineer",
    department: "Structural",
    departmentLabel: "Structural Engineering & Detailing",
    locations: ["Hyderabad (Corporate Office)"],
    type: "Full-Time",
    experience: "3–6 Years",
    shortDescription: "Engineer bold cantilevers, slender columns, and resilient RCC / steel structures in tight sync with architectural intent.",
    overview: "SEA is known for architecture where structural clarity is visible and celebrated. You will work side-by-side with our architects to calculate, analyze, and detail innovative structural systems that make daring cantilevers, open spans, and earthquake-resilient structures both possible and economical.",
    responsibilities: [
      "Perform static, dynamic, and seismic structural analysis for RCC, composite, and structural steel framing.",
      "Model structures in ETABS, STAAD.Pro, and SAFE for foundations, slabs, and shear walls.",
      "Prepare detailed structural reinforcement drawings and bar-bending schedules (BBS).",
      "Collaborate with the architectural team to integrate structural grids harmoniously into spatial layouts.",
      "Inspect reinforcement placement, shuttering, and concrete pours during key structural site stages."
    ],
    requirements: [
      "B.Tech/B.E. or M.Tech in Civil / Structural Engineering.",
      "3–6 years of structural design experience in multi-story residential, commercial, or institutional buildings in India.",
      "Proficient in ETABS, STAAD.Pro, SAFE, and AutoCAD structural drafting.",
      "Sound knowledge of Indian Standard Codes (IS 456, IS 1893, IS 13920, IS 875, IS 800).",
      "Collaborative mindset — eager to explore structural solutions that enhance architectural beauty."
    ],
    benefits: [
      "Rare opportunity to work where architects and structural engineers brainstorm under the same roof.",
      "Exposure to non-standard structural forms, long spans, and expressive concrete finishes.",
      "Continuous mentoring by senior structural consultants with decades of landmark project experience.",
      "Industry-standard compensation, site visit allowances, and health coverage."
    ],
    thinkingPrompt: {
      title: "Structural Elegance & Architectural Harmony",
      description: "Tell us about a design where conventional column grids clashed with architectural openings. How did you engineer an innovative solution without adding excessive tonnage?",
      placeholder: "e.g., Rather than introducing deep transfer girders that compromised head height, we developed a vierendeel truss integrated into the partition wall..."
    }
  }
];

export const CAREER_DEPARTMENTS = ["All", "Architecture", "BIM", "Interiors", "Structural"] as const;
export type CareerDepartment = typeof CAREER_DEPARTMENTS[number];

export const EXPERIENCE_LEVELS = [
  "Fresh Graduate (0–1 Year)",
  "Junior (1–3 Years)",
  "Mid-Level (3–5 Years)",
  "Senior (5–8 Years)",
  "Lead / Specialist (8+ Years)"
] as const;

export const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/, "Enter a valid phone number."),
  currentLocation: z.string().trim().min(2, "Enter your current city or location.").max(100),
  roleId: z.string().min(1, "Select the role you wish to apply for."),
  experience: z.string().min(1, "Select your experience level."),
  portfolioUrl: z.string().trim().min(4, "Provide a link to your portfolio (Drive, Behance, Issuu, website, etc.).").max(500),
  resumeUrl: z.string().trim().min(4, "Provide a link to your resume or LinkedIn profile.").max(500),
  roleThought: z.string().trim().min(15, "Please share your thoughts on this question (at least 15 characters).").max(2000),
  philosophyNote: z.string().trim().min(15, "Tell us what philosophy guides your approach to architecture and design (at least 15 characters).").max(2000),
});

export type CareerApplication = z.infer<typeof careerApplicationSchema>;

export function getRoleById(roleId: string): CareerRole | undefined {
  return CAREER_ROLES.find(r => r.id === roleId);
}

export function createCareerEmailDraft(input: CareerApplication): string {
  const role = getRoleById(input.roleId);
  const roleTitle = role ? role.title : input.roleId;

  const subject = `[Career Application] ${roleTitle} — ${input.fullName}`;

  const bodyLines = [
    `APPLICANT DETAILS`,
    `-----------------`,
    `Full Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Current Location: ${input.currentLocation}`,
    `Role Applied For: ${roleTitle}`,
    `Experience Level: ${input.experience}`,
    `Portfolio Link: ${input.portfolioUrl}`,
    `Resume / LinkedIn: ${input.resumeUrl}`,
    ``,
    `HOW YOU THINK (ROLE-SPECIFIC INQUIRY)`,
    `--------------------------------------`,
    `Question: ${role ? role.thinkingPrompt.title : "Specialized Inquiry"}`,
    `${input.roleThought}`,
    ``,
    `DESIGN PHILOSOPHY & STATEMENT`,
    `-----------------------------`,
    `${input.philosophyNote}`,
    ``,
    `Submitted via SEA Careers Portal (s4eaindia.com)`
  ];

  const body = bodyLines.join("\n");
  return `mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
