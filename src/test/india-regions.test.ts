import { describe, expect, it } from "vitest";
import { INDIA_REGIONS, getRegionOffice, indiaRegionPoint } from "@/lib/india-regions";

function pathBounds(path: string) {
  const numbers = (path.match(/-?\d+\.?\d*/g) ?? []).map(Number);
  const xs = numbers.filter((_, index) => index % 2 === 0);
  const ys = numbers.filter((_, index) => index % 2 === 1);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}
function expectInsideRegion(longitude: number, latitude: number, regionName: string) {
  const region = INDIA_REGIONS.find(entry => entry.name === regionName);
  expect(region).toBeDefined();
  const bounds = pathBounds(region?.path ?? "");
  const point = indiaRegionPoint(longitude, latitude);
  expect(point.x).toBeGreaterThan(bounds.minX);
  expect(point.x).toBeLessThan(bounds.maxX);
  expect(point.y).toBeGreaterThan(bounds.minY);
  expect(point.y).toBeLessThan(bounds.maxY);
}

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
  it("places the Hyderabad head-office pin inside Telangana", () => {
    expectInsideRegion(78.4667, 17.4399, "Telangana");
  });
  it("places the Vijayawada project pin inside Andhra Pradesh", () => {
    expectInsideRegion(80.648, 16.5062, "Andhra Pradesh");
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