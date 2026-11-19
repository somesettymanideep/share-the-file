import { describe, expect, it } from "vitest";
import { INDIA_REGIONS, getRegionOffice } from "@/lib/india-regions";

describe("Contact region directory", () => {
  it("offers all 28 states and 8 union territories with a selectable shape and capital", () => {
    expect(INDIA_REGIONS).toHaveLength(36);
    expect(INDIA_REGIONS.filter(region => region.kind === "State")).toHaveLength(28);
    expect(new Set(INDIA_REGIONS.map(region => region.name)).size).toBe(36);
    for (const region of INDIA_REGIONS) {
      expect(region.path).toMatch(/^M/);
      expect(region.capitals.length).toBeGreaterThan(0);
    }
  });
  it.each([
    ["Himachal Pradesh", ["Shimla (summer)", "Dharamshala (winter)"]],
    ["Uttarakhand", ["Dehradun (winter)", "Gairsain / Bhararisain (summer)"]],
    ["Maharashtra", ["Mumbai", "Nagpur (winter legislative capital)"]],
    ["Jammu and Kashmir", ["Srinagar (summer)", "Jammu (winter)"]],
    ["Ladakh", ["Leh", "Kargil (joint administrative capital)"]],
    ["Andaman and Nicobar Islands", ["Sri Vijaya Puram"]],
    ["Lakshadweep", ["Kavaratti"]],
    ["Dadra and Nagar Haveli and Daman and Diu", ["Daman"]],
    ["Andhra Pradesh", ["Amaravati"]],
  ])("preserves verified capitals for %s", (name, capitals) => {
    expect(INDIA_REGIONS.find(region => region.name === name)?.capitals).toEqual(capitals);
  });
  it("shows the confirmed Hyderabad office and address-based directions only in Telangana", () => {
    const office = getRegionOffice("Telangana");
    expect(office?.address).toBe("229B, 2nd Floor, alt.f Coworking Green Tower, Begumpet Main Road, Hyderabad, Telangana, India - 500016");
    expect(new URL(office?.directions ?? "https://invalid.example").searchParams.get("destination")).toBe(office?.address);
    for (const region of INDIA_REGIONS.filter(region => region.name !== "Telangana")) {
      expect(getRegionOffice(region.name)).toBeUndefined();
    }
  });
});