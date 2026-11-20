import samplePortrait from "@/assets/sea-sample-client-2.jpg";
import teamPortraitOne from "@/assets/sea-sample-team-1.jpg";
import teamPortraitTwo from "@/assets/sea-sample-team-2.jpg";
import teamPortraitThree from "@/assets/sea-sample-team-3.jpg";
import teamPortraitFour from "@/assets/sea-sample-team-4.jpg";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  teamLine: string;
  bio: string;
  tags: string[];
  email?: string;
  portrait?: string;
  /** True while the profile awaits real details; renders a neutral silhouette. */
  placeholder?: boolean;
}

// Team-card sample profiles are clearly labeled so they are not mistaken for confirmed staff.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-2",
    name: "Aditi Rao",
    role: "Senior Architect",
    teamLine: "Sample team profile",
    bio: "Sample profile highlighting thoughtful design development and collaborative project delivery.",
    tags: ["Design Development", "Planning"],
    portrait: teamPortraitOne,
    placeholder: true,
  },
  {
    id: "sample-design-director",
    name: "Riya Nair",
    role: "Design Director",
    teamLine: "Sample team profile",
    bio: "Sample profile focused on design direction, creative collaboration, and thoughtful architectural spaces.",
    tags: ["Design Direction", "Creative Collaboration"],
    portrait: samplePortrait,
    placeholder: true,
  },
  {
    id: "member-3",
    name: "Kabir Shah",
    role: "Project Architect",
    teamLine: "Sample team profile",
    bio: "Sample profile representing coordination from early concepts through detailed project stages.",
    tags: ["Project Coordination", "Architecture"],
    portrait: teamPortraitTwo,
    placeholder: true,
  },
  {
    id: "member-4",
    name: "Meera Iyer",
    role: "Interior Designer",
    teamLine: "Sample team profile",
    bio: "Sample profile focused on interiors, material choices, and human-centered spaces.",
    tags: ["Interiors", "Materials"],
    portrait: teamPortraitThree,
    placeholder: true,
  },
  {
    id: "member-5",
    name: "Arjun Menon",
    role: "BIM Coordinator",
    teamLine: "Sample team profile",
    bio: "Sample profile illustrating digital coordination and clear, buildable project documentation.",
    tags: ["BIM", "Documentation"],
    portrait: teamPortraitFour,
    placeholder: true,
  },
];
