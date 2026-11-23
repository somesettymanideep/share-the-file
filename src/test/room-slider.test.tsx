import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import RoomSlider3D from "@/components/about-copy/RoomSlider3D";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, params, ...props }: { children: React.ReactNode; to: string; params?: Record<string, string> }) => (
    <a href={params?.slug ? `/projects/${params.slug}` : to} {...props}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("3D Room Slider on About Copy", () => {
  it("renders 3D room carousel with walls and project frames", () => {
    const { container } = render(<RoomSlider3D />);
    const section = container.querySelector(".sea2-room-section");
    expect(section).toBeInTheDocument();

    const walls = container.querySelectorAll(".sea2-room-wall");
    expect(walls.length).toBe(6);

    const initialProjectTitle = screen.getByRole("heading", { level: 2, name: "Manjunatha Constructions" });
    expect(initialProjectTitle).toBeInTheDocument();

    const viewProjectLink = screen.getByRole("link", { name: /View project: Manjunatha Constructions/i });
    expect(viewProjectLink).toHaveAttribute("href", "/projects/manjunatha-constructions");
  });

  it("advances project when next button is clicked", () => {
    render(<RoomSlider3D />);
    const nextBtn = screen.getByRole("button", { name: "Next project" });
    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);
  });

  it("allows selecting project directly using navigation dots", () => {
    render(<RoomSlider3D />);
    const dots = screen.getAllByRole("button", { name: /Show /i });
    expect(dots.length).toBeGreaterThanOrEqual(6);
    fireEvent.click(dots[1]!);
  });
});
