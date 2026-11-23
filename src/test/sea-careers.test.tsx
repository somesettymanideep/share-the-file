import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SeaCareers from "@/components/SeaCareers";
import {
  CAREER_ROLES,
  careerApplicationSchema,
  createCareerEmailDraft,
  getRoleById,
} from "@/lib/careers";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to?: string }) => (
    <a href={to ?? "#"} {...props}>{children}</a>
  ),
  useLocation: (opts?: { select?: (loc: { pathname: string }) => unknown }) => {
    const loc = { pathname: "/careers" };
    return opts?.select ? opts.select(loc) : loc.pathname;
  },
}));

afterEach(cleanup);

describe("SeaCareers Page", () => {
  it("renders the hero starting banner with large text 'Design your Next chapter' without overlay or clutter", () => {
    const { container } = render(<SeaCareers />);

    const heroTitle = screen.getByRole("heading", { level: 1, name: /Design your Next chapter/i });
    expect(heroTitle).toBeInTheDocument();
    expect(screen.getByAltText(/Architects collaborating in the sunlit concrete courtyard/i)).toBeInTheDocument();

    // Verify overlay scrim, lead paragraph, counter stats, and hero action buttons are removed
    expect(container.querySelector(".careers-hero-scrim")).toBeNull();
    expect(container.querySelector(".careers-hero-lead")).toBeNull();
    expect(container.querySelector(".careers-hero-stats")).toBeNull();
    expect(container.querySelector(".careers-hero-actions")).toBeNull();
  });

  it("renders all 5 open positions with View Details buttons", () => {
    render(<SeaCareers />);

    expect(screen.getByRole("heading", { level: 2, name: /Current Studio Openings/i })).toBeInTheDocument();

    for (const role of CAREER_ROLES) {
      expect(screen.getByRole("heading", { level: 3, name: role.title })).toBeInTheDocument();
    }

    const viewDetailsButtons = screen.getAllByRole("button", { name: /View detailed info about/i });
    expect(viewDetailsButtons).toHaveLength(5);
  });

  it("filters roles when department buttons are clicked", () => {
    render(<SeaCareers />);

    // Click on 'BIM' filter button
    const bimFilter = screen.getByRole("button", { name: "BIM" });
    fireEvent.click(bimFilter);

    // Only BIM role should be visible in the list
    expect(screen.getByRole("heading", { level: 3, name: "BIM Manager / Computational Lead" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Senior Architect / Project Lead" })).toBeNull();

    // Click 'All' to restore
    const allFilter = screen.getByRole("button", { name: "All" });
    fireEvent.click(allFilter);
    expect(screen.getByRole("heading", { level: 3, name: "Senior Architect / Project Lead" })).toBeInTheDocument();
  });

  it("opens modal with detailed position info when 'View Details' is clicked, and closes on Escape", () => {
    render(<SeaCareers />);

    const seniorArchitectBtn = screen.getByRole("button", {
      name: /View detailed info about Senior Architect \/ Project Lead/i,
    });
    fireEvent.click(seniorArchitectBtn);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { level: 3, name: /Senior Architect \/ Project Lead/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/Role Overview/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Key Responsibilities/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Required Qualifications & Skills/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/What SEA Offers/i)).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("selects the role in the form when 'Apply for this Position' is clicked in the modal", () => {
    render(<SeaCareers />);

    // Open Interior Architect modal
    const interiorBtn = screen.getByRole("button", {
      name: /View detailed info about Interior Architect & FF&E Specialist/i,
    });
    fireEvent.click(interiorBtn);

    const dialog = screen.getByRole("dialog");
    const applyBtn = within(dialog).getByRole("button", { name: /Apply for this Position/i });
    fireEvent.click(applyBtn);

    // Modal closes
    expect(screen.queryByRole("dialog")).toBeNull();

    // Role select input in the form is updated
    const select = screen.getByLabelText(/Applying for Role/i) as HTMLSelectElement;
    expect(select.value).toBe("interior-architect-ffe");

    // Dynamic prompt updates for Interior Architect
    expect(screen.getByText("Materiality, Light & Sensory Experience")).toBeInTheDocument();
  });

  it("renders 'Show us How You think' section with dynamic role-based questions", () => {
    render(<SeaCareers />);

    const formHeading = screen.getByRole("heading", { level: 2, name: /Show us How You think/i });
    expect(formHeading).toBeInTheDocument();

    const roleSelect = screen.getByLabelText(/Applying for Role/i) as HTMLSelectElement;

    // Switch to BIM
    fireEvent.change(roleSelect, { target: { value: "bim-manager-computation" } });
    expect(screen.getByText("Information Architecture & Clash Strategy")).toBeInTheDocument();

    // Switch to Structural
    fireEvent.change(roleSelect, { target: { value: "structural-design-engineer" } });
    expect(screen.getByText("Structural Elegance & Architectural Harmony")).toBeInTheDocument();

    // Switch to Visualizer
    fireEvent.change(roleSelect, { target: { value: "junior-architect-visualizer" } });
    expect(screen.getByText("Atmosphere, Light & Visual Storytelling")).toBeInTheDocument();
  });

  it("validates form fields and generates email draft upon valid submission", () => {
    render(<SeaCareers />);

    // Click submit empty to trigger errors
    const submitBtn = screen.getByRole("button", { name: /Prepare Application Draft/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();

    // Test helper functions for valid application
    const validData = {
      fullName: "Ar. Priya Nair",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      currentLocation: "Hyderabad",
      roleId: "senior-architect-lead",
      experience: "Senior (5–8 Years)",
      portfolioUrl: "https://drive.google.com/priya-portfolio",
      resumeUrl: "https://linkedin.com/in/priya-nair",
      roleThought: "We resolved the structural span by introducing a post-tensioned beam grid that preserved the double-height ceiling.",
      philosophyNote: "Architecture should be an uncompromised dialogue between structural logic and experiential light.",
    };

    const parseResult = careerApplicationSchema.safeParse(validData);
    expect(parseResult.success).toBe(true);

    if (parseResult.success) {
      const draft = createCareerEmailDraft(parseResult.data);
      expect(draft).toContain("mailto:naresh@s4eaindia.com");
      expect(draft).toContain(encodeURIComponent("Ar. Priya Nair"));
      expect(draft).toContain(encodeURIComponent("Senior Architect / Project Lead"));
    }
  });

  it("correctly looks up roles by id", () => {
    const role = getRoleById("senior-architect-lead");
    expect(role).toBeDefined();
    expect(role?.title).toBe("Senior Architect / Project Lead");

    const nonExistent = getRoleById("astronomer");
    expect(nonExistent).toBeUndefined();
  });
});
