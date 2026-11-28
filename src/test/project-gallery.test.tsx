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

    expect(slides[0]?.classList.contains("is-active")).toBe(true);
    expect(slides[1]?.classList.contains("is-active")).toBe(false);

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
    const secondDot = dots[1];
    if (!secondDot) throw new Error("second gallery dot missing");
    fireEvent.click(secondDot);
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

describe("Project gallery photo-count rules", () => {
  it.each([3, 4])("keeps %i photos scroll-driven, including exactly four", (count) => {
    const source = getProject("kishore-jain-duplex");
    if (!source?.gallery) throw new Error("gallery missing");
    const { container } = render(<ProjectMorphGallery project={{ ...source, gallery: source.gallery.slice(0, count) }} />);
    const section = container.querySelector(".project-morph");
    if (!section) throw new Error("gallery section missing");
    Object.defineProperty(section, "offsetHeight", { configurable: true, value: count * 1000 });
    vi.spyOn(section, "getBoundingClientRect").mockReturnValue({ top: -count * 1000 } as DOMRect);
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: "Next image" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: `Show image ${count}` })).toHaveAttribute("aria-pressed", "true");
  });

  it("uses a non-scroll-driven, looping carousel for five photos", () => {
    const source = getProject("kishore-jain-duplex");
    if (!source?.gallery) throw new Error("gallery missing");
    const { container } = render(<ProjectMorphGallery project={{ ...source, gallery: source.gallery.slice(0, 5) }} />);
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByRole("button", { name: "Show image 2" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: "Show image 2" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Show image 5" }));
    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByRole("button", { name: "Show image 1" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByRole("button", { name: "Show image 5" })).toHaveAttribute("aria-pressed", "true");
    const section = container.querySelector(".project-morph");
    if (!section) throw new Error("gallery section missing");
    fireEvent.keyDown(section, { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: "Show image 1" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.touchStart(section, { touches: [{ clientX: 300, clientY: 200 }] });
    fireEvent.touchEnd(section, { changedTouches: [{ clientX: 100, clientY: 210 }] });
    expect(screen.getByRole("button", { name: "Show image 2" })).toHaveAttribute("aria-pressed", "true");
    expect(scrollSpy).not.toHaveBeenCalled();
    scrollSpy.mockRestore();
  });
});
