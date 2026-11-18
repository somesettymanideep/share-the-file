import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SeaPeopleSections from "@/components/SeaPeopleSections";

describe("team lanyard rail", () => {
  afterEach(cleanup);

  it("hangs one flippable badge per team member", () => {
    render(<SeaPeopleSections parts="team" teamStyle="lanyard" />);
    const badges = screen.getAllByRole("button", { name: /Flip badge for / });
    expect(badges).toHaveLength(4);
    expect(screen.getByText("Aditi Sharma")).toBeInTheDocument();
    expect(screen.getByText("Rohan Patel")).toBeInTheDocument();
    badges.forEach((badge) => expect(badge).toHaveAttribute("aria-pressed", "false"));
  });

  it("flips a badge to its bio side on click and back on a second click", () => {
    render(<SeaPeopleSections parts="team" teamStyle="lanyard" />);
    const badge = screen.getByRole("button", { name: "Flip badge for Meera Iyer" });
    fireEvent.click(badge);
    expect(badge).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(badge);
    expect(badge).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps the grid variant as the default team layout", () => {
    render(<SeaPeopleSections parts="team" />);
    expect(screen.queryByRole("button", { name: /Flip badge for / })).not.toBeInTheDocument();
    expect(screen.getByText("BIM Specialist")).toBeInTheDocument();
  });
});
