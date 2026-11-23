import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SeaLogoMark from "@/components/SeaLogoMark";

/** Plays once per full page load, whichever shell page is entered first. */
let seaPreloaderPlayed = false;

export default function SeaPreloader() {
  const [active, setActive] = useState(!seaPreloaderPlayed);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    seaPreloaderPlayed = true;
    const root = rootRef.current;
    if (!root) return;
    const de = document.documentElement;
    de.classList.add("sea-pre-lock");
    const word = root.querySelector<HTMLElement>(".sea-pre-word");
    const fill = root.querySelector<HTMLElement>(".sea-pre-fill");
    const glow = root.querySelector<HTMLElement>(".sea-pre-glow");
    const tag = root.querySelector<HTMLElement>(".sea-pre-tag");
    const cnt = root.querySelector<HTMLElement>(".sea-pre-count");
    if (!word || !fill || !glow || !tag || !cnt) {
      de.classList.remove("sea-pre-lock");
      setActive(false);
      return;
    }

    const loadReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
      setTimeout(resolve, 7000);
    });
    const finish = () => {
      de.classList.remove("sea-pre-lock");
      setActive(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([word, tag], { opacity: 1 });
      gsap.set(fill, { clipPath: "inset(0 0% 0 0)" });
      let tween: gsap.core.Tween | undefined;
      loadReady.then(() => {
        tween = gsap.to(root, { opacity: 0, duration: 0.4, onComplete: finish });
      });
      return () => {
        tween?.kill();
        de.classList.remove("sea-pre-lock");
      };
    }

    let tl: gsap.core.Timeline | undefined;
    let cancelled = false;
    const fonts = document.fonts?.load
      ? Promise.race([document.fonts.load("500 20px Oxanium"), new Promise((r) => setTimeout(r, 1500))])
      : Promise.resolve();
    fonts.then(() => {
      if (cancelled) return;
      const W = word.offsetWidth;
      const st = { p: 0 };
      const isMobile = window.matchMedia("(max-width: 480px)").matches;
      const endLetterSpacing = isMobile ? ".22em" : ".32em";
      const startLetterSpacing = isMobile ? ".32em" : ".45em";
      tl = gsap.timeline();
      tl.fromTo(word, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(cnt, { opacity: 0.85, duration: 0.5 }, 0.4)
        .to(glow, { opacity: 1, duration: 0.3 }, 0.6)
        .to(st, {
          p: 1,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            fill.style.clipPath = `inset(0 ${(1 - st.p) * 100}% 0 0)`;
            glow.style.left = `${st.p * W}px`;
            cnt.textContent = String(Math.round(st.p * 100));
          },
        }, 0.6)
        .to(glow, { opacity: 0, duration: 0.4 }, 2.1)
        .fromTo(tag, { opacity: 0, y: 12, letterSpacing: startLetterSpacing }, { opacity: 1, y: 0, letterSpacing: endLetterSpacing, duration: 1.1, ease: "power3.out" }, 1.4)
        .add(() => {
          tl?.pause();
          loadReady.then(() => {
            if (!cancelled) tl?.play();
          });
        }, 2.8)
        .to(word, { scale: 1.1, opacity: 0, duration: 0.8, ease: "power2.in" }, ">.35")
        .to([tag, cnt], { opacity: 0, duration: 0.4 }, "<")
        .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.95, ease: "power3.inOut", onComplete: finish }, "<.25");
    });
    return () => {
      cancelled = true;
      tl?.kill();
      de.classList.remove("sea-pre-lock");
    };
  }, [active]);

  if (!active) return null;
  return (
    <div ref={rootRef} className="sea-pre" role="status" aria-label="Loading">
      <div className="sea-pre-in">
        <div className="sea-pre-word" aria-hidden="true">
          <SeaLogoMark className="sea-pre-outline" filled={false} />
          <SeaLogoMark className="sea-pre-fill" filled />
          <i className="sea-pre-glow" />
        </div>
        <p className="sea-pre-tag">STUDIO FOR ECLECTIC ARCHITECTURE</p>
      </div>
      <div className="sea-pre-count" aria-hidden="true">0</div>
    </div>
  );
}
