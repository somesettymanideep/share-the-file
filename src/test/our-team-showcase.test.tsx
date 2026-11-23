import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import OurTeamShowcase, { OUR_TEAM_MEMBERS } from "@/components/OurTeamShowcase";

afterEach(cleanup);

describe("OurTeamShowcase", () => {
  it("renders the heading 'OUR TEAM' with separate OUR and TEAM tokens", () => {
    const { container } = render(<OurTeamShowcase />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/OUR\s+TEAM/i);

    const ourSpan = container.querySelector(".sea-ourteam-title-our");
    const teamSpan = container.querySelector(".sea-ourteam-title-team");
    expect(ourSpan).toBeInTheDocument();
    expect(teamSpan).toBeInTheDocument();
    expect(ourSpan).toHaveTextContent("OUR");
    expect(teamSpan).toHaveTextContent("TEAM");
  });

  it("renders 4 cards in the grid matching the layout", () => {
    const { container } = render(<OurTeamShowcase />);

    const grid = container.querySelector(".sea-ourteam-grid");
    expect(grid).toBeInTheDocument();

    const cards = container.querySelectorAll(".sea-ourteam-card");
    expect(cards.length).toBe(4);

    expect(OUR_TEAM_MEMBERS).toHaveLength(4);
    expect(screen.getByText("PRINCIPAL ARCHITECT")).toBeInTheDocument();
    expect(screen.getByText("DESIGN LEAD")).toBeInTheDocument();
    expect(screen.getByText("PROJECT ARCHITECT")).toBeInTheDocument();
    expect(screen.getByText("STUDIO MANAGER")).toBeInTheDocument();
  });

  it("renders the vertical SEA watermark inside each card", () => {
    const { container } = render(<OurTeamShowcase />);

    const watermarks = container.querySelectorAll(".sea-ourteam-watermark");
    expect(watermarks.length).toBe(4);
    watermarks.forEach((wm) => {
      expect(wm).toHaveTextContent("SEA");
    });
  });

  it("renders portrait images with descriptive alt text", () => {
    render(<OurTeamShowcase />);

    for (const member of OUR_TEAM_MEMBERS) {
      expect(screen.getByAltText(member.alt)).toBeInTheDocument();
    }
  });

  it("opens profile dialog on click and closes on close button or Escape key", () => {
    render(<OurTeamShowcase />);

    const firstCard = screen.getAllByRole("button", { name: /View profile of/i })[0];
    fireEvent.click(firstCard);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("PRINCIPAL ARCHITECT")).toBeInTheDocument();
    expect(within(dialog).getByText(/STUDIO ARCHITECTURE LEADERSHIP/i)).toBeInTheDocument();

    const closeBtn = within(dialog).getByRole("button", { name: /Close profile details/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens modal on Enter key for keyboard accessibility", () => {
    render(<OurTeamShowcase />);

    const secondCard = screen.getAllByRole("button", { name: /View profile of/i })[1];
    fireEvent.keyDown(secondCard, { key: "Enter" });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("DESIGN LEAD")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
