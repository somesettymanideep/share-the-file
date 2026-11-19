import paths from "@/lib/india-region-paths.json";
import { STUDIO_CONTACT } from "@/lib/contact";

export interface IndiaRegion {
  name: string;
  kind: "State" | "Union territory";
  capitals: string[];
  path: string;
}

// Administrative capitals, with additional seasonal/legislative capitals identified explicitly.
// Sources checked 19 November 2026: National Portal directory, state/UT portals,
// https://en.wikipedia.org/wiki/List_of_state_and_union_territory_capitals_in_India
// https://andaman.gov.in/about (Sri Vijaya Puram supersedes Port Blair).
export const CAPITAL_SOURCES = [
  { label: "Capital reference", url: "https://en.wikipedia.org/wiki/List_of_state_and_union_territory_capitals_in_India" },
  { label: "Andaman & Nicobar Administration", url: "https://andaman.gov.in/about" },
];
const states: Record<string, string[]> = {
  "Andhra Pradesh": ["Amaravati"], "Arunachal Pradesh": ["Itanagar"], Assam: ["Dispur"], Bihar: ["Patna"],
  Chhattisgarh: ["Raipur"], Goa: ["Panaji"], Gujarat: ["Gandhinagar"], Haryana: ["Chandigarh"],
  "Himachal Pradesh": ["Shimla (summer)", "Dharamshala (winter)"], Jharkhand: ["Ranchi"], Karnataka: ["Bengaluru"],
  Kerala: ["Thiruvananthapuram"], "Madhya Pradesh": ["Bhopal"], Maharashtra: ["Mumbai", "Nagpur (winter legislative capital)"],
  Manipur: ["Imphal"], Meghalaya: ["Shillong"], Mizoram: ["Aizawl"], Nagaland: ["Kohima"], Odisha: ["Bhubaneswar"],
  Punjab: ["Chandigarh"], Rajasthan: ["Jaipur"], Sikkim: ["Gangtok"], "Tamil Nadu": ["Chennai"], Telangana: ["Hyderabad"],
  Tripura: ["Agartala"], "Uttar Pradesh": ["Lucknow"], Uttarakhand: ["Dehradun (winter)", "Gairsain / Bhararisain (summer)"], "West Bengal": ["Kolkata"],
};
const territories: Record<string, string[]> = {
  "Andaman and Nicobar Islands": ["Sri Vijaya Puram"], Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman"], Delhi: ["New Delhi"],
  "Jammu and Kashmir": ["Srinagar (summer)", "Jammu (winter)"], Ladakh: ["Leh", "Kargil (joint administrative capital)"],
  Lakshadweep: ["Kavaratti"], Puducherry: ["Puducherry"],
};
export const INDIA_REGIONS: IndiaRegion[] = Object.entries({ ...states, ...territories }).map(([name, capitals]): IndiaRegion => ({
  name, capitals, kind: name in territories ? "Union territory" : "State",
  path: paths[name as keyof typeof paths],
})).sort((a, b) => a.name.localeCompare(b.name));

export function getRegionOffice(name: string) {
  if (name !== "Telangana") return undefined;
  return {
    name: "SEA · Corporate Office", address: STUDIO_CONTACT.address,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_CONTACT.address)}`,
  };
}