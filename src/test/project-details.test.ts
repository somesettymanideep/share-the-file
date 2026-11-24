import { describe, expect, it } from "vitest";

import regaPrimeOne from "@/assets/Rega-prime-one.png";
import regaPrimeTwo from "@/assets/Rega-prime-two.png";
import regaPrimeThree from "@/assets/Rega-prime-three.png";
import gangadharSunset from "@/assets/sea-project-gangadhar-estate-sunset.png";
import gangadharFrontView from "@/assets/sea-project-gangadhar-estate-front-view.png";

import {
  getAdjacentProjects,
  getProject,
  getProjectGallery,
  getProjectsByCategory,
  SEA_PROJECTS,
} from "@/lib/projects";

describe("Project details", () => {
  it("uses the supplied Gangadhar Estate project details", () => {
    expect(getProject("gangadhar-estate")).toMatchObject({
      location: "Vijayawada, Andhra Pradesh",
      plotSize: "2,110 Sq. Yds.",
      status: "Completed",
      architectureStyle: "Parametric",
    });
  });

  it("gives every project a unique slug and cover image", () => {
    expect(new Set(SEA_PROJECTS.map((project) => project.slug)).size).toBe(
      SEA_PROJECTS.length,
    );
    expect(new Set(SEA_PROJECTS.map((project) => project.image)).size).toBe(
      SEA_PROJECTS.length,
    );

    for (const project of SEA_PROJECTS) {
      expect(getProject(project.slug)).toBe(project);
    }
  });

  it("uses the cover and two empty slots for projects without a custom gallery", () => {
    for (const project of SEA_PROJECTS) {
      if (project.gallery) continue;

      const gallery = getProjectGallery(project);

      expect(gallery.map((slot) => slot.image)).toEqual([
        project.image,
        null,
        null,
      ]);
      expect(new Set(gallery.map((slot) => slot.id)).size).toBe(3);
    }
  });

  it("replaces Manjunatha Constructions with Rega Prime and shows its three images in order", () => {
    expect(getProject("manjunatha-constructions")).toBeUndefined();

    const project = getProject("rega-prime");
    expect(project).toMatchObject({
      title: "Rega Prime",
      category: "architecture",
      image: regaPrimeOne,
    });

    const gallery = getProjectGallery(project!);

    expect(gallery.map((slot) => slot.image)).toEqual([
      regaPrimeOne,
      regaPrimeTwo,
      regaPrimeThree,
    ]);
    expect(gallery.map((slot) => slot.id)).toEqual([
      "rega-prime-01",
      "rega-prime-02",
      "rega-prime-03",
    ]);
  });

  it("shows the Gangadhar Estate sunset view in slots one and three and the front view in slot two", () => {
    const project = getProject("gangadhar-estate");
    expect(project).toBeDefined();

    const gallery = getProjectGallery(project!);

    expect(gallery.map((slot) => slot.image)).toEqual([
      gangadharSunset,
      gangadharFrontView,
      gangadharSunset,
    ]);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(3);
  });

  it("shows four distinct Krishna Sindhura Hospital gallery images with the cover first", () => {
    const project = getProject("krishna-sindhura-hospital");
    expect(project).toBeDefined();

    const gallery = getProjectGallery(project!);

    expect(gallery).toHaveLength(4);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(4);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(4);
  });

  it("shows three distinct Mantralayam gallery images and removes Ramko Heights", () => {
    expect(getProject("ramko-heights")).toBeUndefined();

    const project = getProject("mantralayam");
    expect(project).toMatchObject({
      title: "Mantralayam",
      category: "architecture",
    });

    const gallery = getProjectGallery(project!);

    expect(gallery).toHaveLength(3);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(3);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(3);
  });

  it("returns adjacent projects and wraps between Rega Prime and Kishore Jain KMS Infra", () => {
    expect(getAdjacentProjects("gangadhar-estate").next?.slug).toBe(
      "kishore-jain-kms-infra",
    );
    expect(getAdjacentProjects("rega-prime").previous?.slug).toBe(
      "kishore-jain-kms-infra",
    );
    expect(getAdjacentProjects("rega-prime").next?.slug).toBe("sarika-estate");
    expect(getAdjacentProjects("kishore-jain-kms-infra").next?.slug).toBe(
      "rega-prime",
    );
  });

  it("returns undefined for an unknown project", () => {
    expect(getProject("unknown")).toBeUndefined();
  });

  it("lists all six projects under architecture", () => {
    expect(getProjectsByCategory("architecture")).toHaveLength(6);
    expect(getProjectsByCategory()).toHaveLength(6);
  });

  it("returns empty lists for interior, landscape, and BIM", () => {
    expect(getProjectsByCategory("interior")).toEqual([]);
    expect(getProjectsByCategory("landscape")).toEqual([]);
    expect(getProjectsByCategory("bim")).toEqual([]);
  });
});