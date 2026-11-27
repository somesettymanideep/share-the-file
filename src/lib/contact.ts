import { z } from "zod";
import { SEA_PROJECTS } from "@/lib/projects";

export const STUDIO_CONTACT = {
  email: "operations@s4eaindia.com",
  phone: "+91 7075779600",
  city: "Hyderabad, Telangana",
  address: "229B, 2nd Floor, alt.f Coworking Green Tower, Begumpet Main Road, Hyderabad, Telangana, India - 500016",
  hours: "9:30 AM to 6:30 PM",
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
  kind: "office" | "branch" | "project";
  name: string;
  city: string;
  address?: string;
  latitude: number;
  longitude: number;
  slug?: string;
  image?: string;
  status?: string | undefined;
}
// Confirmed locations only: corporate office in Hyderabad, projects in Vijayawada.
export const STUDIO_LOCATIONS: StudioLocation[] = [
  { id: "head-office", kind: "office", name: "Corporate Office", city: STUDIO_CONTACT.city, latitude: 17.4399, longitude: 78.4667 },
  ...SEA_PROJECTS.filter(project => project.location && project.location.includes("Vijayawada")).map(project => ({
    id: project.slug, kind: "project" as const, name: project.title, city: project.location ?? STUDIO_CONTACT.city,
    latitude: 16.5062, longitude: 80.648, slug: project.slug, image: project.image, status: project.status,
  })),
];
// Confirmed branch offices only. Vijayawada has a client-supplied street address;
// Bangalore is confirmed as a city only, so no address, phone, or hours may be shown.
export const STUDIO_BRANCHES: StudioLocation[] = [
  { id: "branch-vijayawada", kind: "branch", name: "Vijayawada Branch", city: "Vijayawada, Andhra Pradesh", address: "Flat No: 101, Sri Sai Nilayam, Chandramoulipuram, ADJ. HDFC Bank, BENZ Circle, Vijayawada, Andhra Pradesh, India- 520 010", latitude: 16.5062, longitude: 80.648 },
  { id: "branch-bangalore", kind: "branch", name: "Bangalore Branch", city: "Bangalore, Karnataka", latitude: 12.9716, longitude: 77.5946 },
];