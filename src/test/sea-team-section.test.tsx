import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SeaTeamSection, { PRINCIPALS } from "@/components/SeaTeamSection";

afterEach(cleanup);

describe("SeaTeamSection", () => {
  it("renders the heading 'THE MINDS THAT MAKE SEAIPL' and all 5 principal architects", () => {
    render(<SeaTeamSection />);

    expect(screen.getByRole("heading", { level: 2, name: "THE MINDS THAT MAKE SEAIPL" })).toBeInTheDocument();

    expect(PRINCIPALS).toHaveLength(5);
    for (const member of PRINCIPALS) {
      expect(screen.getByRole("button", { name: new RegExp(member.name, "i") })).toBeInTheDocument();
      expect(screen.getByAltText(`Portrait of ${member.name}`)).toBeInTheDocument();
    }

    const roles = screen.getAllByText("PRINCIPAL ARCHITECT");
    expect(roles.length).toBeGreaterThanOrEqual(5);
  });

  it("opens modal with detailed credentials when a team member is clicked", () => {
    render(<SeaTeamSection />);

    const ankitaCard = screen.getByRole("button", { name: /ANKITA JAIN/i });
    fireEvent.click(ankitaCard);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { level: 3, name: "ANKITA JAIN" })).toBeInTheDocument();
    expect(within(dialog).getByText(/Sustainable Master Planning/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/School of Planning and Architecture/i)).toBeInTheDocument();

    const closeBtn = within(dialog).getByRole("button", { name: /Close profile details/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes modal on Escape key press", () => {
    render(<SeaTeamSection />);

    const vikasCard = screen.getByRole("button", { name: /VIKAS YADAV/i });
    fireEvent.click(vikasCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("activates card on Enter key press", () => {
    render(<SeaTeamSection />);

    const rituCard = screen.getByRole("button", { name: /RITU ARORA/i });
    fireEvent.keyDown(rituCard, { key: "Enter" });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { level: 3, name: "RITU ARORA" })).toBeInTheDocument();
    expect(within(dialog).getByText(/CEPT University/i)).toBeInTheDocument();
  });
});
