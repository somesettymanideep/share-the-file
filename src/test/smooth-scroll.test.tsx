import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  pathname: "/contact",
  instances: [] as Array<{ raf: ReturnType<typeof vi.fn>; scrollTo: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn>; start: ReturnType<typeof vi.fn> }>,
  add: vi.fn(), remove: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({ useLocation: () => mocks.pathname }));
vi.mock("gsap", () => ({ gsap: { registerPlugin: vi.fn(), ticker: { add: mocks.add, remove: mocks.remove } } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { update: vi.fn(), refresh: vi.fn() } }));
vi.mock("lenis", () => ({ default: class {
  raf = vi.fn(); scrollTo = vi.fn(); destroy = vi.fn(); stop = vi.fn(); start = vi.fn();
  on = vi.fn(); off = vi.fn(); resize = vi.fn();
  constructor() { mocks.instances.push(this); }
} }));

import SeaSmoothScroll, { scrollSeaToTop } from "@/components/SeaSmoothScroll";

describe("site-wide smooth scrolling", () => {
  beforeEach(() => { mocks.instances.length = 0; mocks.pathname = "/contact"; vi.clearAllMocks(); });
  afterEach(() => { cleanup(); document.documentElement.classList.remove("sea-pre-lock"); });

  it("uses one controller, converts GSAP seconds to milliseconds, and disposes on navigation", () => {
    const view = render(<SeaSmoothScroll />);
    const first = mocks.instances[0];
    expect(mocks.instances).toHaveLength(1);
    mocks.add.mock.calls[0]?.[0](1.5);
    expect(first?.raf).toHaveBeenCalledWith(1500);
    mocks.pathname = "/projects/architecture";
    view.rerender(<SeaSmoothScroll />);
    expect(first?.destroy).toHaveBeenCalledOnce();
    expect(mocks.remove).toHaveBeenCalledOnce();
    expect(mocks.instances).toHaveLength(2);
    scrollSeaToTop();
    expect(mocks.instances[1]?.scrollTo).toHaveBeenCalledWith(0);
  });

  it("keeps scrolling stopped until the loading lock is removed", async () => {
    document.documentElement.classList.add("sea-pre-lock");
    render(<SeaSmoothScroll />);
    expect(mocks.instances[0]?.stop).toHaveBeenCalledOnce();
    document.documentElement.classList.remove("sea-pre-lock");
    await Promise.resolve();
    expect(mocks.instances[0]?.start).toHaveBeenCalledOnce();
  });

  it("does not animate scrolling for reduced-motion visitors", () => {
    const original = window.matchMedia;
    window.matchMedia = (query) => ({ ...original(query), matches: true });
    try {
      render(<SeaSmoothScroll />);
      expect(mocks.instances).toHaveLength(0);
      const scroll = vi.spyOn(window, "scrollTo");
      scrollSeaToTop();
      expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
      scroll.mockRestore();
    } finally { window.matchMedia = original; }
  });
});