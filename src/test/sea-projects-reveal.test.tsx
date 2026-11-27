import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import SeaProjects from "@/components/SeaProjects";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

beforeAll(() => {
  globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

const createdTimelines: Array<{ defaults?: Record<string, unknown>; scrollTrigger?: Record<string, unknown> }> = [];

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: () => ({
      add: (_query: string, cb: () => void) => cb(),
      revert: vi.fn(),
    }),
    timeline: (config?: { defaults?: Record<string, unknown>; scrollTrigger?: Record<string, unknown> }) => {
      createdTimelines.push(config || {});
      return {
        fromTo: vi.fn().mockReturnThis(),
      };
    },
  },
  gsap: {
    registerPlugin: vi.fn(),
    matchMedia: () => ({
      add: (_query: string, cb: () => void) => cb(),
      revert: vi.fn(),
    }),
    timeline: (config?: { defaults?: Record<string, unknown>; scrollTrigger?: Record<string, unknown> }) => {
      createdTimelines.push(config || {});
      return {
        fromTo: vi.fn().mockReturnThis(),
      };
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { refresh: vi.fn() },
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => <a href={to} {...props}>{children}</a>,
  useLocation: ({ select }: { select: (location: { pathname: string }) => unknown }) => select({ pathname: "/projects/architecture" }),
}));

afterEach(() => {
  cleanup();
  createdTimelines.length = 0;
});

describe("SeaProjects image reveal", () => {
  it("configures all project image figures with lower-screen scroll trigger bounds", () => {
    render(<SeaProjects category="architecture" />);

    expect(createdTimelines.length).toBeGreaterThan(0);
    // All timelines should have scrollTrigger configured
    createdTimelines.forEach((tl) => {
      expect(tl.scrollTrigger).toMatchObject({
        start: "top 95%",
        end: "top 70%",
        scrub: 1,
      });
    });
  });
});
