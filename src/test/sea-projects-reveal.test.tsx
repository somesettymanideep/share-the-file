import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
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
  it("configures all project image figures with right-to-left scrollTrigger reveals and waits for preloader", async () => {
    // If locked by preloader, should not create timelines yet
    document.documentElement.classList.add("sea-pre-lock");
    const { unmount } = render(<SeaProjects category="architecture" />);
    expect(createdTimelines.length).toBe(0);

    // When preloader unlocks, reveals are initialized
    await act(async () => {
      document.documentElement.classList.remove("sea-pre-lock");
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(createdTimelines.length).toBeGreaterThan(0);
    createdTimelines.forEach((tl) => {
      expect(tl.scrollTrigger).toMatchObject({
        start: "top 90%",
        once: true,
      });
    });

    unmount();
  });
});
