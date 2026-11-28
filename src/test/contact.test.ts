import { describe, expect, it } from "vitest";
import { enquiryEmail, enquirySchema, STUDIO_BRANCHES, STUDIO_LOCATIONS } from "@/lib/contact";

const enquiry = { name: "Test Client", email: "test@example.com", phone: "+91 9000299600", location: "Vijayawada", type: "Residence", budget: "To be discussed", message: "A new residence with a courtyard." };
describe("Contact enquiries", () => {
  it("rejects invalid email addresses", () => { expect(enquirySchema.safeParse({ ...enquiry, email: "not-an-email" }).success).toBe(false); });
  it("rejects empty project details", () => { expect(enquirySchema.safeParse({ ...enquiry, message: "" }).success).toBe(false); });
  it("encodes the validated enquiry in an email draft, without allowing extra URL parameters", () => {
    const url = enquiryEmail({ ...enquiry, message: "A courtyard &bcc=other@example.com" });
    expect(url.startsWith("mailto:operations@s4eaindia.com?")).toBe(true);
    expect(url).toContain("%26bcc%3Dother%40example.com");
    expect(url).not.toContain("&bcc=");
  });
  it("never forwards invalid input to the email app", () => { expect(() => enquiryEmail({ ...enquiry, phone: "javascript:bad" })).toThrow(); });
  it("maps only projects with a confirmed city", () => { expect(STUDIO_LOCATIONS.filter(location => location.kind === "project").map(location => location.id)).toEqual(["gangadhar-estate", "kishore-jain-kms-infra", "kishore-jain-duplex"]); });
  it("shows the Vijayawada branch at the client-supplied address", () => {
    expect(STUDIO_BRANCHES.find(branch => branch.id === "branch-vijayawada")?.address)
      .toBe("Flat No: 101, Sri Sai Nilayam, Chandramoulipuram, ADJ. HDFC Bank, BENZ Circle, Vijayawada, Andhra Pradesh, India- 520 010");
  });
  it("lists Bangalore as a branch without inventing a street address", () => {
    const bangalore = STUDIO_BRANCHES.find(branch => branch.id === "branch-bangalore");
    expect(bangalore?.city).toBe("Bangalore, Karnataka");
    expect(bangalore?.address).toBeUndefined();
    expect(STUDIO_BRANCHES.filter(branch => branch.address).map(branch => branch.id)).toEqual(["branch-vijayawada"]);
  });
});