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
  SEA_PROJECT_CATEGORY_HEADINGS,
  SEA_PROJECT_CATEGORY_HEADING_LINES,
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

  it("uses the supplied Kishore Jain KMS Infra project details", () => {
    expect(getProject("kishore-jain-kms-infra")).toMatchObject({
      location: "Vijayawada, AP.",
      plotSize: "13682 sft",
      status: "Completed",
      architectureStyle: "Modern",
    });
    expect(getProject("kms-infra")).toMatchObject({
      title: "Kishore Jain KMS Infra",
      location: "Vijayawada, AP.",
      plotSize: "13682 sft",
      status: "Completed",
      architectureStyle: "Modern",
    });
  });

  it("uses the supplied Krishna Sindhura Hospital project details", () => {
    expect(getProject("krishna-sindhura-hospital")).toMatchObject({
      location: "Hyderabad, TG.",
      plotSize: "12500 Sq.ft.",
      status: "Completed",
      architectureStyle: "Modern",
    });
    expect(getProject("sindhura-hospital")).toMatchObject({
      title: "Krishna Sindhura Hospital",
      location: "Hyderabad, TG.",
      plotSize: "12500 Sq.ft.",
      status: "Completed",
      architectureStyle: "Modern",
    });
  });

  it("uses the supplied Chandramouli project details", () => {
    expect(getProject("chandramouli")).toMatchObject({
      location: "Chimakurthy,AP.",
      plotSize: "12500 Sq.ft.",
      status: "Completed",
      architectureStyle: "Modern",
    });
  });

  it("uses the supplied Nakshatravanam project details", () => {
    expect(getProject("naksthravnam")).toMatchObject({
      location: "Amaravathi,AP",
      plotSize: "2 Acres.",
      status: "Completed",
      architectureStyle: "Modern",
    });
    expect(getProject("nakshatravanam")).toMatchObject({
      location: "Amaravathi,AP",
      plotSize: "2 Acres.",
      status: "Completed",
      architectureStyle: "Modern",
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

  it("returns adjacent projects and wraps between Rega Prime and Kishore Jain Duplex", () => {
    expect(getAdjacentProjects("gangadhar-estate").next?.slug).toBe(
      "kishore-jain-kms-infra",
    );
    expect(getAdjacentProjects("kishore-jain-kms-infra").next?.slug).toBe(
      "sravya-residence",
    );
    expect(getAdjacentProjects("sravya-residence").next?.slug).toBe(
      "naksthravnam",
    );
    expect(getAdjacentProjects("naksthravnam").next?.slug).toBe("laiton-crafts");
    expect(getAdjacentProjects("laiton-crafts").next?.slug).toBe("chandramouli");
    expect(getAdjacentProjects("chandramouli").next?.slug).toBe("kishore-jain-duplex");
    expect(getAdjacentProjects("kishore-jain-duplex").next?.slug).toBe("rega-prime");
    expect(getAdjacentProjects("rega-prime").previous?.slug).toBe(
      "kishore-jain-duplex",
    );
    expect(getAdjacentProjects("sravya-residence").previous?.slug).toBe(
      "kishore-jain-kms-infra",
    );
    expect(getAdjacentProjects("naksthravnam").previous?.slug).toBe(
      "sravya-residence",
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

  it("shows nine distinct Kishore Jain Duplex gallery images under interior category", () => {
    const project = getProject("kishore-jain-duplex");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Kishore Jain Duplex",
      category: "interior",
      location: "Vijayawada, AP.",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(9);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(9);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(9);
  });

  it("shows six distinct Chandramouli gallery images under interior category", () => {    const project = getProject("chandramouli");
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

  it("shows two distinct Sravya Residence gallery images under architecture category", () => {
    const project = getProject("sravya-residence");
    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Sravya Residence",
      category: "architecture",
    });

    const gallery = getProjectGallery(project!);
    expect(gallery).toHaveLength(2);
    expect(gallery[0]?.image).toBe(project?.image);
    expect(gallery.every((slot) => slot.image !== null)).toBe(true);
    expect(new Set(gallery.map((slot) => slot.image)).size).toBe(2);
    expect(new Set(gallery.map((slot) => slot.id)).size).toBe(2);
  });

  it("returns undefined for an unknown project", () => {
    expect(getProject("unknown")).toBeUndefined();
  });

  it("lists all seven architecture projects including Chandramouli and Sravya Residence and excluding Sarika Estate", () => {
    const archProjects = getProjectsByCategory("architecture");
    expect(archProjects).toHaveLength(7);
    expect(archProjects.map((p) => p.slug)).toContain("chandramouli");
    expect(archProjects.map((p) => p.slug)).toContain("sravya-residence");
    expect(archProjects.map((p) => p.slug)).not.toContain("sarika-estate");
    expect(getProjectsByCategory()).toHaveLength(11);
  });

  it("lists Naksthravnam and Laiton Crafts under landscape, Chandramouli under interior, and returns empty list for BIM", () => {
    const landscapeProjects = getProjectsByCategory("landscape");
    expect(landscapeProjects).toHaveLength(2);
    expect(landscapeProjects.map((p) => p.slug)).toEqual([
      "naksthravnam",
      "laiton-crafts",
    ]);
    expect(getProjectsByCategory("interior")).toHaveLength(2);
    expect(getProjectsByCategory("interior")[0]?.slug).toBe("chandramouli");
    expect(getProjectsByCategory("interior")[1]?.slug).toBe("kishore-jain-duplex");
    expect(getProjectsByCategory("bim")).toEqual([]);
  });

  it("defines the custom headings for all project category pages", () => {
    expect(SEA_PROJECT_CATEGORY_HEADINGS.architecture).toBe("The Art of Architecture");
    expect(SEA_PROJECT_CATEGORY_HEADINGS.interior).toBe("Crafted from the Inside Out");
    expect(SEA_PROJECT_CATEGORY_HEADINGS.landscape).toBe("Outdoor Spaces, Shaped by Design");
    expect(SEA_PROJECT_CATEGORY_HEADINGS.bim).toBe("The Models Behind the Build");
  });

  it("splits project category page headings into exactly two lines", () => {
    for (const category of ["architecture", "interior", "landscape", "bim"] as const) {
      const lines = SEA_PROJECT_CATEGORY_HEADING_LINES[category];
      expect(lines).toHaveLength(2);
      expect(lines[0].trim().length).toBeGreaterThan(0);
      expect(lines[1].trim().length).toBeGreaterThan(0);
    }
    expect(SEA_PROJECT_CATEGORY_HEADING_LINES.interior).toEqual(["Crafted from", "the Inside Out"]);
    expect(SEA_PROJECT_CATEGORY_HEADING_LINES.landscape).toEqual(["Outdoor Spaces,", "Shaped by Design"]);
    expect(SEA_PROJECT_CATEGORY_HEADING_LINES.bim).toEqual(["The Models", "Behind the Build"]);
    expect(SEA_PROJECT_CATEGORY_HEADING_LINES.architecture).toEqual(["The Art of", "Architecture"]);
  });
});