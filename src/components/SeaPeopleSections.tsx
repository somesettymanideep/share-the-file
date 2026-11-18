import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Instagram, Linkedin, Quote, Star, Mail, Link2 } from "lucide-react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button";
import clientPortrait from "@/assets/sea-sample-client.jpg";
import clientPortraitTwo from "@/assets/sea-sample-client-2.jpg";
import portraitOne from "@/assets/sea-sample-team-1.jpg";
import portraitTwo from "@/assets/sea-sample-team-2.jpg";
import portraitThree from "@/assets/sea-sample-team-3.jpg";
import portraitFour from "@/assets/sea-sample-team-4.jpg";

const testimonials = [
  { quote: "From our first conversation to the final detail, every space felt thoughtfully considered. The result is a home that feels unmistakably ours.", name: "Ananya Rao", role: "Residential client", company: "Private residence" },
  { quote: "They brought clarity to a complex brief, balancing a strong design vision with the everyday needs of our team. The space feels both purposeful and inspiring.", name: "Vikram Mehta", role: "Managing Director", company: "Sample workspace client" },
  { quote: "What stood out was the care behind every decision. Light, materials and movement come together in a space that is as practical as it is beautiful.", name: "Priya Nair", role: "Business owner", company: "Sample hospitality client" },
  { quote: "The design brought together everything we hoped for: welcoming spaces, natural light and details that make everyday living feel special.", name: "Karthik Rao", role: "Residential client", company: "Sample private residence" },
  { quote: "Our ideas were met with thoughtful questions and fresh perspectives. The finished space strikes a beautiful balance between character and comfort.", name: "Neha Desai", role: "Workspace client", company: "Sample workspace" },
  { quote: "From the layout to the smallest finishing touches, the approach was considered and collaborative. We feel a genuine connection to our new space.", name: "Rahul Menon", role: "Business owner", company: "Sample commercial client" },
];

const team = [
  { name: "Aditi Sharma", role: "Senior Architect", image: portraitOne, bio: "Leads residential and workspace projects from the first sketch to the final handover.", tags: ["Architecture", "Since 2018"] },
  { name: "Arjun Reddy", role: "Design Architect", image: portraitTwo, bio: "Turns complex briefs into clear plans, balancing light, movement and structure.", tags: ["Design", "Since 2020"] },
  { name: "Meera Iyer", role: "Interior Designer", image: portraitThree, bio: "Shapes interiors with material warmth, colour and care for every detail.", tags: ["Interiors", "Since 2021"] },
  { name: "Rohan Patel", role: "BIM Specialist", image: portraitFour, bio: "Builds the digital models that keep every drawing, site and schedule in sync.", tags: ["BIM", "Since 2022"] },
];

const testimonialPortraits = [clientPortrait, portraitTwo, clientPortraitTwo, portraitFour, portraitThree, portraitOne];

function TeamLanyardRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Autoplay: gently swing one badge at a time, pausing on interaction or reduced motion.
  useEffect(() => {
    if (paused || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % team.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  // Pull a badge down: the strap stretches, then springs back on release.
  useEffect(() => {
    gsap.registerPlugin(Draggable);
    const track = trackRef.current;
    if (!track) return;
    const draggables: Draggable[] = [];
    track.querySelectorAll<HTMLElement>(".people-lanyard-item").forEach((item) => {
      const badge = item.querySelector<HTMLElement>(".people-lanyard-badge");
      const strap = item.querySelector<HTMLElement>(".people-lanyard-strap");
      if (!badge || !strap) return;
      const base = strap.getBoundingClientRect().height || 80;
      try {
        draggables.push(...Draggable.create(badge, {
          type: "y",
          bounds: { minY: 0, maxY: 130 },
          onDrag(this: Draggable) {
            gsap.set(strap, { scaleY: 1 + this.y / base });
          },
          onRelease() {
            gsap.to(badge, { y: 0, duration: 1.2, ease: "elastic.out(1, 0.32)" });
            gsap.to(strap, { scaleY: 1, duration: 1.2, ease: "elastic.out(1, 0.32)" });
          },
        }));
      } catch {
        // Environments without real CSS transforms (e.g. jsdom) skip dragging;
        // the badges still flip on click.
      }
    });
    return () => draggables.forEach((draggable) => draggable.kill());
  }, []);

  // Brush along the rail: the nearest badge lifts and its photo zooms.
  const brush = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>(".people-lanyard-item"));
    let nearest: HTMLElement | null = null;
    let best = Infinity;
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(clientX - (rect.left + rect.width / 2));
      if (distance < best) { best = distance; nearest = item; }
    }
    for (const item of items) item.classList.toggle("is-brushed", item === nearest);
  };

  return (
    <div
      className="people-lanyard"
      onPointerMove={(event) => brush(event.clientX)}
      onPointerLeave={() => brush(-9999)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    >
      <p className="people-lanyard-hint">Brush along the rail to meet someone, pull a badge down, click to flip it.</p>
      <div className="people-lanyard-track" ref={trackRef}>
        <div className="people-lanyard-rail" aria-hidden="true" />
        {team.map((member, index) => (
          <div
            key={member.name}
            className={"people-lanyard-item" + (active === index ? " is-active" : "")}
            style={{ "--item-left": `${8 + index * 24}%`, "--strap": `${index % 2 === 0 ? 64 : 116}px` } as React.CSSProperties}
          >
            <div className="people-lanyard-hang">
              <span className="people-lanyard-pin" aria-hidden="true" />
              <span className="people-lanyard-strap" aria-hidden="true" />
              <button
                type="button"
                className={"people-lanyard-badge" + (flipped === index ? " is-flipped" : "")}
                aria-pressed={flipped === index}
                aria-label={`Flip badge for ${member.name}`}
                onClick={() => setFlipped(flipped === index ? null : index)}
              >
                <span className="people-lanyard-flip">
                  <span className="people-lanyard-face people-lanyard-front">
                    <span className="people-lanyard-photo"><img src={member.image} alt={`Illustrative portrait for sample team member ${member.name}`} loading="lazy" width={768} height={768} /></span>
                    <span className="people-lanyard-name">{member.name}</span>
                    <span className="people-lanyard-role">{member.role}</span>
                  </span>
                  <span className="people-lanyard-face people-lanyard-back">
                    <span className="people-lanyard-bio">{member.bio}</span>
                    <span className="people-lanyard-tags">{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
                    <span className="people-lanyard-links">
                      <span title="Sample email link — not connected"><Mail size={14} aria-hidden="true" /> Email</span>
                      <span title="Sample portfolio link — not connected"><Link2 size={14} aria-hidden="true" /> Portfolio</span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SeaPeopleSections({ showTeamMeta = true, parts = "all", testimonialStyle = "cards", teamStyle = "grid" }: { showTeamMeta?: boolean; parts?: "all" | "team" | "testimonials"; testimonialStyle?: "cards" | "editorial"; teamStyle?: "grid" | "lanyard" }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  const autoplay = !hovered && !focused && !reducedMotion && visible;
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % testimonials.length), 8000);
    return () => window.clearTimeout(timer);
  }, [active, autoplay]);
  const visibleTestimonials = [testimonials[active], testimonials[(active + 1) % testimonials.length]];

  return <div className="sea-people">
    {parts !== "team" && <section className={`people-testimonials${testimonialStyle === "editorial" ? " people-testimonials-editorial" : ""}`} aria-labelledby="people-testimonials-title" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="people-inner">
        {testimonialStyle === "editorial" ? <>
          <div className="people-heading people-testimonials-heading"><h2 id="people-testimonials-title">What Our Clients Say<span>.</span></h2></div>
          <div className="people-editorial-panel">
          <div className="people-editorial-copy">
            <div className="people-editorial-story" aria-roledescription="carousel" aria-label="Sample client testimonials" aria-live={autoplay ? "off" : "polite"} aria-atomic="true">
              <div key={active} className="people-editorial-slide">
                <blockquote>“{testimonials[active]?.quote}”</blockquote>
                <div className="people-client"><h3>{testimonials[active]?.name}</h3><p>{testimonials[active]?.role}</p></div>
              </div>
            </div>
            <div className="people-editorial-controls">
              <Button variant="ghost" size="icon" aria-label="Previous testimonial" title="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ChevronLeft /></Button>
              <span className="people-editorial-count">0{active + 1} / 0{testimonials.length}</span>
              <Button variant="ghost" size="icon" aria-label="Next testimonial" title="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ChevronRight /></Button>
            </div>
          </div>
          <div className="people-portrait-cluster" aria-label="Choose testimonial">
            {testimonials.map((item, index) => <Button key={item.name} variant="ghost" size="icon" className="people-portrait-choice" data-slot={(index - active + testimonials.length) % testimonials.length} aria-label={`Show testimonial ${index + 1}`} aria-pressed={active === index} title={item.name} onClick={() => setActive(index)}><img src={testimonialPortraits[index]} alt={`Illustrative sample portrait for ${item.name}`} width={816} height={816} loading="lazy" /></Button>)}
          </div>
        </div></> : <>
        <div className="people-heading people-testimonials-heading">
          <h2 id="people-testimonials-title">What Our Clients Say<span>.</span></h2>
        </div>
        <div className="people-testimonial-layout" aria-roledescription="carousel" aria-label="Sample client testimonials" aria-live={autoplay ? "off" : "polite"} aria-atomic="true">
          {visibleTestimonials.map((testimonial) => testimonial && <article className="people-testimonial-card" key={testimonial.name}>
            <div className="people-testimonial-portrait"><img src={testimonial.name === "Vikram Mehta" || testimonial.name === "Karthik Rao" ? portraitTwo : testimonial.name === "Rahul Menon" ? portraitFour : testimonial.name === "Neha Desai" ? portraitThree : clientPortrait} alt={`Illustrative sample portrait for ${testimonial.name}`} loading="lazy" width={816} height={816} /></div>
            <div className="people-quote-content">
              <Quote className="people-quote-mark" size={46} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="people-client"><h3>{testimonial.name}</h3><p>{testimonial.role}</p>
                <div className="people-stars" aria-label="Illustrative five-star rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={19} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</div>
              </div>
            </div>
          </article>)}
        </div>
        <div className="people-carousel-controls">
          <Button variant="outline" size="icon" className="people-arrow" aria-label="Previous testimonial" title="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ChevronLeft /></Button>
          <div className="people-pagination" aria-label="Choose testimonial">{testimonials.map((item, index) => <Button key={item.name} variant="ghost" size="icon" className="people-page-dot" aria-label={`Show testimonial ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></Button>)}</div>
          <Button variant="outline" size="icon" className="people-arrow" aria-label="Next testimonial" title="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ChevronRight /></Button>
        </div>
        </>}
      </div>
    </section>}
    {parts !== "testimonials" && <section className="people-team" aria-labelledby="people-team-title">
      <div className="people-inner">
        <div className="people-heading people-team-heading">
          <h2 id="people-team-title">The Minds That Make SEA<span>.</span></h2>
          {showTeamMeta && <Button asChild variant="link" className="people-contact"><a href="mailto:naresh@s4eaindia.com">Get in Touch <ArrowUpRight /></a></Button>}
        </div>
        {showTeamMeta && <p className="people-sample people-team-disclosure">Sample team · Fictional names and illustrative portraits</p>}
        {teamStyle === "lanyard" ? <TeamLanyardRail /> : <div className="people-team-grid">{team.map((member, index) => <article className="people-team-card" key={member.name}>
          <div className="people-team-photo"><img src={member.image} alt={`Illustrative portrait for sample team member ${member.name}`} loading="lazy" width={768} height={768} />{showTeamMeta && <span className="people-member-number">0{index + 1}</span>}</div>
          <div className="people-member-info"><h3>{member.name}</h3><p>{member.role}</p><div className="people-socials"><span title="Sample LinkedIn profile — not connected" aria-label="Sample LinkedIn profile — not connected"><Linkedin size={16} aria-hidden="true" /></span><span title="Sample Instagram profile — not connected" aria-label="Sample Instagram profile — not connected"><Instagram size={16} aria-hidden="true" /></span></div></div>
        </article>)}</div>}
      </div>
    </section>}
  </div>;
}