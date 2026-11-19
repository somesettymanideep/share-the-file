import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactLocations from "@/components/ContactLocations";

vi.mock("gsap", () => ({ gsap: { registerPlugin: vi.fn(), context: () => ({ revert: vi.fn() }) } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));
vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
afterEach(cleanup);

const selectedStates = () => screen.getAllByRole("button").filter(element => element.hasAttribute("data-region-index") && element.getAttribute("aria-pressed") === "true").map(element => element.getAttribute("aria-label")).sort();

describe("Contact presence map", () => {
  it("defaults to Telangana without opening the head office tooltip", () => {
    render(<ContactLocations />);
    expect(selectedStates()).toEqual(["Telangana"]);
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("highlights both branch states and clears any existing tooltip when switching tabs", () => {
    render(<ContactLocations />);
    fireEvent.mouseEnter(screen.getByRole("button", { name: "SEA · Corporate Office, Hyderabad, Telangana" }));
    expect(screen.getByRole("status").textContent).toContain("Hyderabad");
    fireEvent.click(screen.getByRole("tab", { name: "Branches" }));
    expect(selectedStates()).toEqual(["Andhra Pradesh", "Karnataka"]);
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("highlights Andhra Pradesh for projects and restores Telangana for Head Office", () => {
    render(<ContactLocations />);
    fireEvent.click(screen.getByRole("tab", { name: "Projects" }));
    expect(selectedStates()).toEqual(["Andhra Pradesh"]);
    expect(screen.queryByRole("status")).toBeNull();
    fireEvent.click(screen.getByRole("tab", { name: "Head Office" }));
    expect(selectedStates()).toEqual(["Telangana"]);
    expect(screen.queryByRole("status")).toBeNull();
  });
  it.each(["Head Office", "Branches", "Projects"])("shows %s pin details only during hover or keyboard focus", tab => {
    render(<ContactLocations />);
    fireEvent.click(screen.getByRole("tab", { name: tab }));
    const pin = document.querySelector(".contact-pin");
    if (!pin) throw new Error("Expected a confirmed location pin");
    expect(screen.queryByRole("status")).toBeNull();
    fireEvent.mouseEnter(pin);
    expect(screen.getByRole("status").textContent).toContain(tab === "Head Office" ? "Hyderabad" : "Vijayawada");
    fireEvent.mouseLeave(pin);
    expect(screen.queryByRole("status")).toBeNull();
    fireEvent.click(pin);
    expect(screen.queryByRole("status")).toBeNull();
    fireEvent.focus(pin);
    expect(screen.getByRole("status")).toBeTruthy();
    fireEvent.blur(pin);
    expect(screen.queryByRole("status")).toBeNull();
  });
});