import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TeamLanyardRail from "@/components/TeamLanyardRail";

afterEach(cleanup);

describe("team lanyard rail", () => {
  it("shows the real founder profile and clearly marked placeholders", () => {
    render(<TeamLanyardRail />);
    expect(screen.getByRole("button", { name: /P\.V\. Naresh Kumar, Founder & CEO/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Name to be added, Designation/ })).toHaveLength(5);
    expect(screen.getByText("naresh@s4eaindia.com")).toBeInTheDocument();
  });
  it("flips a badge back when its back face is clicked", () => {
    render(<TeamLanyardRail />);
    const badge = screen.getByRole("button", { name: /P\.V\. Naresh Kumar, Founder & CEO/ });
    fireEvent.click(badge);
    expect(badge).toHaveAttribute("aria-pressed", "true");
    const back = screen.getByRole("button", { name: /flip the badge back/ });
    fireEvent.click(back);
    expect(badge).toHaveAttribute("aria-pressed", "false");
  });
  it("flips a badge on click and turns it back with Escape", () => {
    render(<TeamLanyardRail />);
    const badge = screen.getByRole("button", { name: /P\.V\. Naresh Kumar, Founder & CEO/ });
    expect(badge).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(badge);
    expect(badge).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(badge, { key: "Escape" });
    expect(badge).toHaveAttribute("aria-pressed", "false");
  });
  it("moves focus with arrow keys, Home and End", () => {
    render(<TeamLanyardRail />);
    const badges = screen.getAllByRole("button", { name: /activate to flip the badge/ });
    const first = badges[0]!;
    const last = badges[badges.length - 1]!;
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(document.activeElement).toBe(badges[1]);
    fireEvent.keyDown(badges[1]!, { key: "End" });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: "Home" });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(last);
  });
});
