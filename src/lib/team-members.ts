import founderPortrait from "@/assets/sea-founder-portrait.png.asset.json";

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

// Real members first; placeholders are clearly marked and easy to replace.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "naresh",
    name: "P.V. Naresh Kumar",
    role: "Founder & CEO",
    teamLine: "Leadership",
    bio: "Leads SEA with a vision to create innovative, sustainable and people-centric spaces that inspire.",
    tags: ["Innovative design", "Sustainable", "Partnerships"],
    email: "naresh@s4eaindia.com",
    portrait: founderPortrait.url,
  },
  {
    id: "member-2",
    name: "Name to be added",
    role: "Designation",
    teamLine: "SEA Studio",
    bio: "Team profile to be added.",
    tags: ["Specialization"],
    placeholder: true,
  },
  {
    id: "member-3",
    name: "Name to be added",
    role: "Designation",
    teamLine: "SEA Studio",
    bio: "Team profile to be added.",
    tags: ["Specialization"],
    placeholder: true,
  },
  {
    id: "member-4",
    name: "Name to be added",
    role: "Designation",
    teamLine: "SEA Studio",
    bio: "Team profile to be added.",
    tags: ["Specialization"],
    placeholder: true,
  },
  {
    id: "member-5",
    name: "Name to be added",
    role: "Designation",
    teamLine: "SEA Studio",
    bio: "Team profile to be added.",
    tags: ["Specialization"],
    placeholder: true,
  },
  {
    id: "member-6",
    name: "Name to be added",
    role: "Designation",
    teamLine: "SEA Studio",
    bio: "Team profile to be added.",
    tags: ["Specialization"],
    placeholder: true,
  },
];
