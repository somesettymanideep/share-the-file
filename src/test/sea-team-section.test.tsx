import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SeaTeamSection, { SITE_LEADS } from "@/components/SeaTeamSection";

afterEach(cleanup);

describe("SeaTeamSection", () => {
  it("renders the heading 'THE MINDS THAT MAKE SEAIPL' and 4 profile cards in a single row", () => {
    const { container } = render(<SeaTeamSection />);

    expect(screen.getByRole("heading", { level: 2, name: "THE MINDS THAT MAKE SEAIPL" })).toBeInTheDocument();

    const grid = container.querySelector(".sea-team-grid");
    expect(grid).toBeInTheDocument();

    // Verify all 4 site execution leads from reference image are rendered with dummy images
    expect(SITE_LEADS).toHaveLength(4);
    for (const lead of SITE_LEADS) {
      expect(screen.getByRole("button", { name: new RegExp(lead.name, "i") })).toBeInTheDocument();
      expect(screen.getByAltText(`Portrait of ${lead.name}`)).toBeInTheDocument();
      expect(screen.getByText(lead.role)).toBeInTheDocument();
    }
  });

  it("removes sub-heading text 'OUR ARCHITECTURAL COLLECTIVE' and right-side filters", () => {
    render(<SeaTeamSection />);

    // Sub-heading removed
    expect(screen.queryByText(/OUR ARCHITECTURAL COLLECTIVE/i)).toBeNull();

    // Right-side category filters removed
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab", { name: /Site & Project Leads/i })).toBeNull();
    expect(screen.queryByRole("tab", { name: /Principal Architects/i })).toBeNull();
    expect(screen.queryByRole("tab", { name: /All Team/i })).toBeNull();
  });

  it("does not render social icon action buttons (in and X) on profile cards", () => {
    render(<SeaTeamSection />);

    expect(screen.queryAllByLabelText(/LinkedIn Profile/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/X Profile/i)).toHaveLength(0);
  });

  it("opens modal with detailed credentials when a team member is clicked", () => {
    render(<SeaTeamSection />);

    const johnCard = screen.getByRole("button", { name: /JOHN HARPER/i });
    fireEvent.click(johnCard);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { level: 3, name: "JOHN HARPER" })).toBeInTheDocument();
    expect(within(dialog).getByText(/Site Operations/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/JNTU Hyderabad/i)).toBeInTheDocument();

    const closeBtn = within(dialog).getByRole("button", { name: /Close profile details/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes modal on Escape key press", () => {
    render(<SeaTeamSection />);

    const jacobCard = screen.getByRole("button", { name: /JACOB JONES/i });
    fireEvent.click(jacobCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("activates card on Enter key press", () => {
    render(<SeaTeamSection />);

    const jennyCard = screen.getByRole("button", { name: /JENNY WILSON/i });
    fireEvent.keyDown(jennyCard, { key: "Enter" });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { level: 3, name: "JENNY WILSON" })).toBeInTheDocument();
    expect(within(dialog).getByText(/Certified Safety Professional/i)).toBeInTheDocument();
  });

  it("renders all dummy images with valid sources and ensures single-row container structure", () => {
    const { container } = render(<SeaTeamSection />);

    const section = container.querySelector(".sea-team-section");
    expect(section).toBeInTheDocument();

    const grid = container.querySelector(".sea-team-grid");
    expect(grid).toBeInTheDocument();

    const images = container.querySelectorAll<HTMLImageElement>("img.sea-team-img");
    expect(images.length).toBe(SITE_LEADS.length);

    images.forEach((img) => {
      expect(img.getAttribute("src")).toBeTruthy();
    });
  });
});
