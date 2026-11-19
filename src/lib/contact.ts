import { z } from "zod";
import { SEA_PROJECTS } from "@/lib/projects";

export const STUDIO_CONTACT = {
  email: "naresh@s4eaindia.com",
  phone: "+91 9000299600",
  city: "Hyderabad, Telangana",
  address: "229B, 2nd Floor, alt.f Coworking Green Tower, Begumpet Main Road, Hyderabad, Telangana, India - 500016",
  hours: "10 AM to 6 PM",
};
export const PROJECT_TYPES = ["Residence", "Apartments", "Commercial", "Healthcare", "Institutional", "Other"] as const;
export const BUDGETS = ["To be discussed", "Below ₹50 lakh", "₹50 lakh–₹1 crore", "₹1–5 crore", "Above ₹5 crore"] as const;
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/, "Enter a valid phone number."),
  location: z.string().trim().min(2, "Enter your project location.").max(150),
  type: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGETS),
  message: z.string().trim().min(10, "Tell us a little more about your project (at least 10 characters).").max(2000),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryEmail(input: unknown) {
  const data = enquirySchema.parse(input);
  const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject location: ${data.location}\nProject type: ${data.type}\nEstimated budget: ${data.budget}\n\n${data.message}`;
  return `mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(`Project enquiry · ${data.type}`)}&body=${encodeURIComponent(body)}`;
}
export interface StudioLocation {
  id: string;
  kind: "office" | "project";
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  slug?: string;
  image?: string;
  status?: string;
}
// Confirmed locations only: corporate office in Hyderabad, projects in Vijayawada.
export const STUDIO_LOCATIONS: StudioLocation[] = [
  { id: "head-office", kind: "office", name: "SEA · Corporate Office", city: STUDIO_CONTACT.city, latitude: 17.4399, longitude: 78.4667 },
  ...SEA_PROJECTS.filter(project => project.location).map(project => ({
    id: project.slug, kind: "project" as const, name: project.title, city: project.location ?? STUDIO_CONTACT.city,
    latitude: 16.5062, longitude: 80.648, slug: project.slug, image: project.image, status: project.status,
  })),
];
// No confirmed branch offices yet — add verified locations here only.
export const STUDIO_BRANCHES: StudioLocation[] = [];