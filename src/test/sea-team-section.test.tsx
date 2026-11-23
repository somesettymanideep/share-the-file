import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SeaTeamSection, { PRINCIPALS, SITE_LEADS, ALL_TEAM_MEMBERS } from "@/components/SeaTeamSection";

afterEach(cleanup);

describe("SeaTeamSection", () => {
  it("renders the heading 'THE MINDS THAT MAKE SEAIPL' and 4 profile cards in a single row by default", () => {
    const { container } = render(<SeaTeamSection />);

    expect(screen.getByRole("heading", { level: 2, name: "THE MINDS THAT MAKE SEAIPL" })).toBeInTheDocument();

    const grid = container.querySelector(".sea-team-grid");
    expect(grid).toBeInTheDocument();

    // Verify all 4 site execution leads from reference image are rendered by default
    expect(SITE_LEADS).toHaveLength(4);
    for (const lead of SITE_LEADS) {
      expect(screen.getByRole("button", { name: new RegExp(lead.name, "i") })).toBeInTheDocument();
      expect(screen.getByAltText(`Portrait of ${lead.name}`)).toBeInTheDocument();
      expect(screen.getByText(lead.role)).toBeInTheDocument();
    }
  });

  it("renders social icon action buttons (in and X) for team cards", () => {
    render(<SeaTeamSection />);

    const linkedinButtons = screen.getAllByLabelText(/LinkedIn Profile/i);
    expect(linkedinButtons.length).toBe(SITE_LEADS.length);

    const xButtons = screen.getAllByLabelText(/X Profile/i);
    expect(xButtons.length).toBe(SITE_LEADS.length);
  });

  it("filters cards when category tabs are clicked", () => {
    render(<SeaTeamSection />);

    // Click 'Principal Architects' tab
    const principalTab = screen.getByRole("tab", { name: /Principal Architects/i });
    fireEvent.click(principalTab);

    expect(screen.getByRole("button", { name: /ANKITA JAIN/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /RITU ARORA/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /JOHN HARPER/i })).toBeNull();

    // Click 'Site & Project Leads' tab
    const siteTab = screen.getByRole("tab", { name: /Site & Project Leads/i });
    fireEvent.click(siteTab);

    expect(screen.getByRole("button", { name: /JOHN HARPER/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /JENNY WILSON/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ANKITA JAIN/i })).toBeNull();

    // Click 'All Team' tab
    const allTab = screen.getByRole("tab", { name: /All Team/i });
    fireEvent.click(allTab);

    expect(screen.getByRole("button", { name: /ANKITA JAIN/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /JOHN HARPER/i })).toBeInTheDocument();
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

  it("renders all images with valid sources and ensures single-row container structure", () => {
    const { container } = render(<SeaTeamSection defaultCategory="all" />);

    const section = container.querySelector(".sea-team-section");
    expect(section).toBeInTheDocument();

    const grid = container.querySelector(".sea-team-grid");
    expect(grid).toBeInTheDocument();

    const images = container.querySelectorAll<HTMLImageElement>("img.sea-team-img");
    expect(images.length).toBe(ALL_TEAM_MEMBERS.length);

    images.forEach((img) => {
      expect(img.getAttribute("src")).toBeTruthy();
      expect(img.getAttribute("src")?.length).toBeGreaterThan(0);
      expect(img.getAttribute("alt")).toMatch(/^Portrait of /);
    });
  });
});
