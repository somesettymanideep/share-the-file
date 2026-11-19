import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let activeScroll: Lenis | undefined;

export function scrollSeaToTop() {
  if (activeScroll) activeScroll.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "auto" });
}

/** One scrolling owner for all React pages; the imported homepage owns its own. */
export default function SeaSmoothScroll() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    const configure = () => {
      dispose?.();
      dispose = undefined;
      if (motion.matches) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
      });
      activeScroll = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const syncLock = () => {
        const locked = document.documentElement.classList.contains("sea-pre-lock") ||
          Boolean(document.querySelector(".sea-menu-overlay, .sea2-menu-overlay"));
        if (locked) lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(syncLock);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      observer.observe(document.body, { childList: true, subtree: true });
      syncLock();
      const onAnchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        const href = anchor?.getAttribute("href");
        if (!href || anchor?.hasAttribute("download") || anchor?.target === "_blank") return;
        const target = href === "#" ? 0 : document.getElementById(decodeURIComponent(href.slice(1)));
        if (target === null) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: target === 0 ? 0 : -80 });
        if (href !== "#") window.history.replaceState(null, "", href);
      };
      document.addEventListener("click", onAnchor);
      const refresh = requestAnimationFrame(() => { lenis.resize(); ScrollTrigger.refresh(); });
      dispose = () => {
        cancelAnimationFrame(refresh);
        observer.disconnect();
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        if (activeScroll === lenis) activeScroll = undefined;
        lenis.destroy();
      };
    };
    configure();
    motion.addEventListener("change", configure);
    return () => { motion.removeEventListener("change", configure); dispose?.(); };
  }, [pathname]);

  return null;
}