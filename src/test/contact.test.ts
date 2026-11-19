import { describe, expect, it } from "vitest";
import { enquiryEmail, enquirySchema, STUDIO_LOCATIONS } from "@/lib/contact";

const enquiry = { name: "Test Client", email: "test@example.com", phone: "+91 9000299600", location: "Vijayawada", type: "Residence", budget: "To be discussed", message: "A new residence with a courtyard." };
describe("Contact enquiries", () => {
  it("rejects invalid email addresses", () => { expect(enquirySchema.safeParse({ ...enquiry, email: "not-an-email" }).success).toBe(false); });
  it("rejects empty project details", () => { expect(enquirySchema.safeParse({ ...enquiry, message: "" }).success).toBe(false); });
  it("encodes the validated enquiry in an email draft, without allowing extra URL parameters", () => {
    const url = enquiryEmail({ ...enquiry, message: "A courtyard &bcc=other@example.com" });
    expect(url.startsWith("mailto:naresh@s4eaindia.com?")).toBe(true);
    expect(url).toContain("%26bcc%3Dother%40example.com");
    expect(url).not.toContain("&bcc=");
  });
  it("never forwards invalid input to the email app", () => { expect(() => enquiryEmail({ ...enquiry, phone: "javascript:bad" })).toThrow(); });
  it("maps only projects with a confirmed city", () => { expect(STUDIO_LOCATIONS.filter(location => location.kind === "project").map(location => location.id)).toEqual(["gangadhar-estate"]); });
});