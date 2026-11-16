import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SeaPeopleSections from "@/components/SeaPeopleSections";

describe("testimonial playback", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => { cleanup(); vi.useRealTimers(); });
  const advance = () => act(() => { vi.advanceTimersByTime(8000); });

  it("advances slowly and loops through all six testimonials", () => {
    render(<SeaPeopleSections />);
    act(() => { vi.advanceTimersByTime(7999); });
    expect(screen.getByRole("button", { name: "Show testimonial 1" })).toHaveAttribute("aria-pressed", "true");
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByRole("button", { name: "Show testimonial 2" })).toHaveAttribute("aria-pressed", "true");
    for (let index = 0; index < 5; index++) advance();
    expect(screen.getByRole("button", { name: "Show testimonial 1" })).toHaveAttribute("aria-pressed", "true");
  });
  it("keeps the editorial variant autoplaying every eight seconds and supports portrait selection", () => {
    render(<SeaPeopleSections parts="testimonials" testimonialStyle="editorial" />);
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 2" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Show testimonial 6" }));
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 1" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Previous testimonial" }));
    expect(screen.getByRole("button", { name: "Show testimonial 6" })).toHaveAttribute("aria-pressed", "true");
  });
  it("pauses on interaction and resumes after leaving", () => {
    render(<SeaPeopleSections />);
    const section = screen.getByRole("region", { name: /What Our Clients Say/ });
    fireEvent.mouseEnter(section);
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 1" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.mouseLeave(section);
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 2" })).toHaveAttribute("aria-pressed", "true");
  });
  it("pauses while a navigation control is focused and resumes on blur", () => {
    render(<SeaPeopleSections />);
    const next = screen.getByRole("button", { name: "Next testimonial" });
    fireEvent.focus(next);
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 1" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.blur(next, { relatedTarget: document.body });
    advance();
    expect(screen.getByRole("button", { name: "Show testimonial 2" })).toHaveAttribute("aria-pressed", "true");
  });
});