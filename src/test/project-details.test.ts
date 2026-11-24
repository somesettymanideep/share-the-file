import { describe, expect, it } from "vitest";
import { getAdjacentProjects, getProject, getProjectGallery, getProjectsByCategory, SEA_PROJECTS } from "@/lib/projects";

describe("Project details", () => {
  it("uses the supplied Gangadhar Estate location", () => { expect(getProject("gangadhar-estate")?.location).toBe("Vijayawada, Andhra Pradesh"); });
  it("uses the supplied plot size", () => { expect(getProject("gangadhar-estate")?.plotSize).toBe("2,110 Sq. Yds."); });
  it("uses the supplied completed status", () => { expect(getProject("gangadhar-estate")?.status).toBe("Completed"); });
  it("uses the supplied parametric style", () => { expect(getProject("gangadhar-estate")?.architectureStyle).toBe("Parametric"); });
  it("gives every project a unique slug and its own photograph", () => {
    expect(new Set(SEA_PROJECTS.map(p => p.slug)).size).toBe(6);
    expect(new Set(SEA_PROJECTS.map(p => p.image)).size).toBe(6);
    for (const project of SEA_PROJECTS) expect(getProject(project.slug)).toBe(project);
  });
  it("has exactly three gallery slots without duplicating or substituting photographs", () => {
    for (const project of SEA_PROJECTS) {
      if (project.gallery) continue;
      const gallery = getProjectGallery(project);
      expect(gallery).toHaveLength(3);
      expect(gallery.map(slot => slot.image)).toEqual([project.image, null, null]);
      expect(new Set(gallery.map(slot => slot.id)).size).toBe(3);
    }
  });
  it("shows the supplied sunset photograph in all three Gangadhar Estate gallery slots", () => {
    const project = getProject("gangadhar-estate");
    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(3);
    expect(gallery[0]!.image).toBe(project!.gallery![0]!.image);
    expect(gallery[1]!.image).toBe(project!.gallery![1]!.image);
    expect(gallery[2]!.image).toBe(project!.gallery![2]!.image);
    expect(gallery.every(slot => slot.image !== null)).toBe(true);
    expect(gallery[0]!.image).toBe(gallery[2]!.image);
    expect(gallery[1]!.image).not.toBe(gallery[0]!.image);
    expect(new Set(gallery.map(slot => slot.id)).size).toBe(3);
  });
  it("shows all four supplied photographs in Krishna Sindhura Hospital gallery slots", () => {
    const project = getProject("krishna-sindhura-hospital");
    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(4);
    expect(gallery.every(slot => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map(slot => slot.image)).size).toBe(4);
    expect(new Set(gallery.map(slot => slot.id)).size).toBe(4);
  });
  it("shows all three supplied photographs in Mantralayam gallery slots and removes ramko-heights", () => {
    expect(getProject("ramko-heights")).toBeUndefined();
    const project = getProject("mantralayam");
    expect(project).toBeDefined();
    expect(project?.title).toBe("Mantralayam");
    expect(project?.category).toBe("architecture");
    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(3);
    expect(gallery.every(slot => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map(slot => slot.image)).size).toBe(3);
    expect(new Set(gallery.map(slot => slot.id)).size).toBe(3);
  });
  it("returns adjacent project links and wraps at either end", () => {
    expect(getAdjacentProjects("gangadhar-estate").next?.slug).toBe("kishore-jain-kms-infra");
    expect(getAdjacentProjects("manjunatha-constructions").previous?.slug).toBe("kishore-jain-kms-infra");
    expect(getAdjacentProjects("kishore-jain-kms-infra").next?.slug).toBe("manjunatha-constructions");
  });
  it("does not resolve unknown projects", () => { expect(getProject("unknown")).toBeUndefined(); });
  it("lists all six projects under architecture", () => {
    expect(getProjectsByCategory("architecture")).toHaveLength(6);
    expect(getProjectsByCategory()).toHaveLength(6);
  });
  it("has no interior, landscape or bim projects until the client supplies them", () => {
    expect(getProjectsByCategory("interior")).toHaveLength(0);
    expect(getProjectsByCategory("landscape")).toHaveLength(0);
    expect(getProjectsByCategory("bim")).toHaveLength(0);
  });
});