import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import SeaProjectShell from "@/components/SeaProjectShell";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => <a href={to} {...props}>{children}</a>,
  useLocation: ({ select }: { select: (location: { pathname: string }) => unknown }) => select({ pathname: "/projects/gangadhar-estate" }),
}));
afterEach(cleanup);
describe("Project detail header boundary", () => {
  it("stays transparent while any project images remain and changes only after the gallery ends", () => {
    const { container } = render(<SeaProjectShell heroHeader><section className="project-morph" /></SeaProjectShell>);
    const gallery = container.querySelector(".project-morph");
    const header = container.querySelector("header");
    if (!gallery || !header) throw new Error("Gallery or header missing");
    let bottom = 1800;
    vi.spyOn(gallery, "getBoundingClientRect").mockImplementation(() => ({ bottom } as DOMRect));
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header.classList.contains("is-scrolled")).toBe(false);
    bottom = 1;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header.classList.contains("is-scrolled")).toBe(false);
    bottom = 0;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header.classList.contains("is-scrolled")).toBe(true);
    bottom = 120;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header.classList.contains("is-scrolled")).toBe(false);
  });
});