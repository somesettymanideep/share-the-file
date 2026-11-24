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

  it("shows four distinct Kishore Jain KMS Infra gallery images under architecture category", () => {
    const project = getProject("kishore-jain-kms-infra");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Kishore Jain KMS Infra",
      category: "architecture",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(4);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(4);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(4);
  });

  it("returns adjacent projects and wraps between Rega Prime and Chandramouli", () => {
    expect(getAdjacentProjects("gangadhar-estate").next?.slug).toBe(
      "kishore-jain-kms-infra",
    );
    expect(getAdjacentProjects("kishore-jain-kms-infra").next?.slug).toBe(
      "naksthravnam",
    );
    expect(getAdjacentProjects("naksthravnam").next?.slug).toBe("laiton-crafts");
    expect(getAdjacentProjects("laiton-crafts").next?.slug).toBe("chandramouli");
    expect(getAdjacentProjects("chandramouli").next?.slug).toBe("rega-prime");
    expect(getAdjacentProjects("rega-prime").previous?.slug).toBe(
      "chandramouli",
    );
    expect(getAdjacentProjects("chandramouli").previous?.slug).toBe(
      "laiton-crafts",
    );
    expect(getAdjacentProjects("laiton-crafts").previous?.slug).toBe(
      "naksthravnam",
    );
    expect(getAdjacentProjects("rega-prime").next?.slug).toBe("sarika-estate");
  });

  it("shows seven distinct Naksthravnam gallery images under landscape category", () => {
    const project = getProject("naksthravnam");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Naksthravnam",
      category: "landscape",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(7);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(7);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(7);
  });

  it("shows five distinct Laiton Crafts gallery images under landscape category", () => {
    const project = getProject("laiton-crafts");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Laiton Crafts",
      category: "landscape",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(5);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(5);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(5);
  });

  it("shows six distinct Chandramouli gallery images under interior category", () => {
    const project = getProject("chandramouli");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Chandramouli",
      category: "interior",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(6);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(6);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(6);
  });

  it("returns undefined for an unknown project", () => {
    expect(getProject("unknown")).toBeUndefined();
  });

  it("lists all six architecture projects and nine total projects", () => {
    expect(getProjectsByCategory("architecture")).toHaveLength(6);
    expect(getProjectsByCategory()).toHaveLength(9);
  });

  it("lists Naksthravnam and Laiton Crafts under landscape, Chandramouli under interior, and returns empty list for BIM", () => {
    const landscapeProjects = getProjectsByCategory("landscape");
    expect(landscapeProjects).toHaveLength(2);
    expect(landscapeProjects.map((p) => p.slug)).toEqual([
      "naksthravnam",
      "laiton-crafts",
    ]);
    expect(getProjectsByCategory("interior")).toHaveLength(1);
    expect(getProjectsByCategory("interior")[0]?.slug).toBe("chandramouli");
    expect(getProjectsByCategory("bim")).toEqual([]);
  });
});