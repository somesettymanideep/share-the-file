import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectMorphGallery from "@/components/ProjectMorphGallery";
import { getProject } from "@/lib/projects";

vi.mock("gsap", () => ({
  gsap: {
    context: (cb: () => void) => {
      cb();
      return { revert: vi.fn() };
    },
    fromTo: vi.fn(),
  },
}));

afterEach(cleanup);

describe("Project details gallery fade transition", () => {
  it("renders gallery slides with fade classes and shows the first image active initially", () => {
    const project = getProject("gangadhar-estate");
    if (!project) throw new Error("gangadhar-estate project missing");

    const { container } = render(<ProjectMorphGallery project={project} />);
    const slides = container.querySelectorAll(".project-gallery-fade-slide");
    expect(slides.length).toBeGreaterThanOrEqual(2);

    expect(slides[0]!.classList.contains("is-active")).toBe(true);
    expect(slides[1]!.classList.contains("is-active")).toBe(false);

    // First slide is visible, hero caption is displayed
    expect(screen.getByText("Gangadhar Estate")).toBeInTheDocument();
  });

  it("updates active slide when a gallery dot is clicked", () => {
    const project = getProject("gangadhar-estate");
    if (!project) throw new Error("gangadhar-estate project missing");

    const { container } = render(<ProjectMorphGallery project={project} />);
    const dots = screen.getAllByRole("button", { name: /Show image \d/ });
    expect(dots.length).toBeGreaterThanOrEqual(2);

    // Clicking image 2 dot triggers scrollToSlide
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    fireEvent.click(dots[1]!);
    expect(scrollSpy).toHaveBeenCalled();
    scrollSpy.mockRestore();
  });

  it("handles keyboard navigation between gallery slides", () => {
    const project = getProject("gangadhar-estate");
    if (!project) throw new Error("gangadhar-estate project missing");

    const { container } = render(<ProjectMorphGallery project={project} />);
    const gallerySection = container.querySelector(".project-morph");
    if (!gallerySection) throw new Error("gallery section missing");

    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    fireEvent.keyDown(gallerySection, { key: "ArrowRight" });
    expect(scrollSpy).toHaveBeenCalled();
    scrollSpy.mockRestore();
  });
});
