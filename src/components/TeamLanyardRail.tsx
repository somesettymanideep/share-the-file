import { useCallback, useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/team-members";

const members = TEAM_MEMBERS;

type BadgePhys = { angle: number; avel: number; pull: number; pvel: number };

const isWide = () => window.matchMedia("(min-width: 900px)").matches;
const isReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="36" r="18" />
      <path d="M14 92c4-22 18-32 36-32s32 10 36 32Z" />
    </svg>
  );
}

export default function TeamLanyardRail() {
  const [flipped, setFlipped] = useState<boolean[]>(() => members.map(() => false));
  const [live, setLive] = useState("");
  const [activeDot, setActiveDot] = useState(0);
  const hangerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const phys = useRef<BadgePhys[]>(members.map(() => ({ angle: 0, avel: 0, pull: 0, pvel: 0 })));
  const interacted = useRef(false);
  const suppressClick = useRef(false);
  const dragging = useRef<{ index: number; startX: number; startY: number; moved: boolean } | null>(null);
  const rafRef = useRef(0);

  // Single rAF loop that sleeps once every badge is at rest.
  const wake = useCallback(() => {
    if (rafRef.current) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const f = dt / 16.7;
      let resting = true;
      phys.current.forEach((p, i) => {
        const el = hangerRefs.current[i];
        if (!el) return;
        if (!dragging.current || dragging.current.index !== i) {
          p.avel += (-p.angle * 0.012 - p.avel * 0.035) * f;
          p.angle += p.avel * f;
          p.pvel += (-p.pull * 0.09 - p.pvel * 0.16) * f;
          p.pull += p.pvel * f;
        }
        if (Math.abs(p.angle) > 0.01 || Math.abs(p.avel) > 0.01 || Math.abs(p.pull) > 0.1 || Math.abs(p.pvel) > 0.1) resting = false;
        el.style.transform = `rotate(${p.angle.toFixed(3)}deg) translateY(${p.pull.toFixed(1)}px)`;
      });
      if (resting && !dragging.current) {
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const impulse = useCallback(
    (index: number, strength: number) => {
      if (!isWide() || isReduced()) return;
      phys.current.forEach((p, i) => {
        const d = Math.abs(i - index);
        if (d > 2) return;
        const dir = i === index ? 1 : i < index ? -1 : 1;
        p.avel += strength * dir * (d === 0 ? 1 : d === 1 ? 0.55 : 0.25);
      });
      wake();
    },
    [wake],
  );

  const toggleFlip = useCallback((i: number) => {
    interacted.current = true;
    setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));
  }, []);

  // Entrance sway, then gentle autoplay flips until the visitor interacts.
  useEffect(() => {
    if (isReduced()) return;
    const timers: number[] = [];
    if (isWide()) {
      phys.current.forEach((p, i) => {
        timers.push(
          window.setTimeout(() => {
            p.avel += 3.2;
            wake();
          }, 350 + i * 140),
        );
      });
    }
    let idx = 0;
    const auto = window.setInterval(() => {
      if (interacted.current) return;
      const i = idx % members.length;
      setFlipped((f) => f.map((v, j) => (j === i ? true : v)));
      window.setTimeout(() => {
        if (!interacted.current) setFlipped((f) => f.map((v, j) => (j === i ? false : v)));
      }, 1700);
      idx++;
    }, 2600);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(auto);
    };
  }, [wake]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const announce = (m: TeamMember) => setLive(`${m.name} — ${m.role}`);

  const onPointerDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, .lany-flipback")) return;
    interacted.current = true;
    dragging.current = { index: i, startX: e.clientX, startY: e.clientY, moved: false };
  };

  const onPointerMove = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragging.current;
    if (!d || d.index !== i) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) > 6) {
      d.moved = true;
      // Capture only once a real drag starts so a plain click still reaches the button.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (!isWide() || isReduced()) return;
    const p = phys.current[i]!;
    p.angle = Math.max(-22, Math.min(22, dx * 0.12));
    p.pull = Math.max(0, Math.min(110, dy * 0.7));
    // Push neighbours aside without overlap.
    phys.current.forEach((q, j) => {
      if (j === i) return;
      const dist = Math.abs(j - i);
      if (dist <= 2) q.angle = p.angle * (dist === 1 ? -0.45 : -0.2);
    });
    wake();
  };

  const endDrag = () => {
    const d = dragging.current;
    dragging.current = null;
    if (d?.moved) suppressClick.current = true;
    wake();
  };

  const onFrontClick = (i: number) => () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    toggleFlip(i);
  };

  const onKey = (i: number) => (e: React.KeyboardEvent) => {
    interacted.current = true;
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(".lany-front");
    if (!buttons || buttons.length === 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      buttons[(i + 1) % members.length]!.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      buttons[(i - 1 + members.length) % members.length]!.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      buttons[0]!.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      buttons[members.length - 1]!.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      phys.current[i]!.pvel += 14;
      wake();
    } else if (e.key === "Escape") {
      setFlipped((f) => f.map(() => false));
    }
  };

  const scrollToBadge = (i: number) => {
    const list = listRef.current;
    const el = list?.children[i] as HTMLElement | undefined;
    if (!list || !el) return;
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  };

  const onListScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const center = list.scrollLeft + list.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(list.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveDot(best);
  };

  return (
    <section className="sea-lanyard" aria-labelledby="lany-heading">
      <div className="lany-head">
        <h2 id="lany-heading">
          The Minds That Make SEAIPL
        </h2>
      </div>
      <div className="lany-rail-wrap">
        <div className="lany-rail" aria-hidden="true" />
        <div className="lany-badges" ref={listRef} onScroll={onListScroll}>
          {members.map((m, i) => (
            <div
              className="lany-hanger"
              key={m.id}
              ref={(el) => {
                hangerRefs.current[i] = el;
              }}
              onPointerDown={onPointerDown(i)}
              onPointerMove={onPointerMove(i)}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerEnter={() => {
                announce(m);
                impulse(i, 4);
              }}
              onPointerLeave={() => setLive("")}
            >
              <div className="lany-strap" aria-hidden="true">
                <span className="lany-ring" />
                <span className="lany-cord" />
                <span className="lany-clip" />
              </div>
              <div className={"lany-card" + (flipped[i] ? " is-flipped" : "")}>
                <div className="lany-card-inner">
                  <button
                    type="button"
                    className="lany-face lany-front"
                    aria-pressed={flipped[i]}
                    aria-label={`${m.name}, ${m.role} — activate to flip the badge`}
                    onClick={onFrontClick(i)}
                    onKeyDown={onKey(i)}
                    onFocus={() => announce(m)}
                    onBlur={() => setLive("")}
                  >
                    <span className="lany-ribbon" aria-hidden="true" />
                    <span className="lany-slot" aria-hidden="true" />
                    <span className="lany-portrait">
                      {m.portrait ? <img src={m.portrait} alt="" loading="lazy" /> : <Silhouette />}
                    </span>
                    <span className="lany-name">{m.name}</span>
                    <span className="lany-role">{m.role}</span>
                    <span className="lany-teamline">{m.teamLine}</span>
                  </button>
                  <div
                    className="lany-face lany-back"
                    aria-hidden={!flipped[i]}
                    role="button"
                    tabIndex={flipped[i] ? 0 : -1}
                    aria-label={`${m.name} — activate to flip the badge back`}
                    onClick={() => toggleFlip(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFlip(i);
                      }
                    }}
                  >
                    <span className="lany-ribbon" aria-hidden="true" />
                    <p className="lany-bio">{m.bio}</p>
                    <ul className="lany-tags">
                      {m.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {m.email && (
                      <a
                        className="lany-mail"
                        href={`mailto:${m.email}`}
                        tabIndex={flipped[i] ? 0 : -1}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail size={14} aria-hidden="true" /> {m.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lany-dots" role="tablist" aria-label="Choose a team member">
          {members.map((m, i) => (
            <button
              key={m.id}
              type="button"
              className={"lany-dot" + (activeDot === i ? " is-active" : "")}
              aria-label={`Show ${m.name}`}
              aria-selected={activeDot === i}
              onClick={() => scrollToBadge(i)}
            />
          ))}
        </div>
      </div>
      <p className="lany-live" aria-live="polite">
        {live}
      </p>
    </section>
  );
}
