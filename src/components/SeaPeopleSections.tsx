import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Instagram, Linkedin, Quote, Star, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import clientPortrait from "@/assets/sea-sample-client.jpg";
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
  { name: "Aditi Sharma", role: "Senior Architect", image: portraitOne },
  { name: "Arjun Reddy", role: "Design Architect", image: portraitTwo },
  { name: "Meera Iyer", role: "Interior Designer", image: portraitThree },
  { name: "Rohan Patel", role: "BIM Specialist", image: portraitFour },
];

export default function SeaPeopleSections({ showTeamMeta = true }: { showTeamMeta?: boolean }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
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
  const autoplay = playing && !hovered && !focused && !reducedMotion && visible;
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % testimonials.length), 8000);
    return () => window.clearTimeout(timer);
  }, [active, autoplay]);
  const visibleTestimonials = [testimonials[active], testimonials[(active + 1) % testimonials.length]];

  return <div className="sea-people">
    <section className="people-testimonials" aria-labelledby="people-testimonials-title" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="people-inner">
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
          <Button variant="outline" size="icon" className="people-arrow" aria-label={playing ? "Pause testimonials" : "Play testimonials"} title={playing ? "Pause testimonials" : "Play testimonials"} aria-pressed={!playing} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause /> : <Play />}</Button>
        </div>
      </div>
    </section>
    <section className="people-team" aria-labelledby="people-team-title">
      <div className="people-inner">
        <div className="people-heading people-team-heading">
          <h2 id="people-team-title">The Minds That Make SEA<span>.</span></h2>
          {showTeamMeta && <Button asChild variant="link" className="people-contact"><a href="mailto:naresh@s4eaindia.com">Get in Touch <ArrowUpRight /></a></Button>}
        </div>
        {showTeamMeta && <p className="people-sample people-team-disclosure">Sample team · Fictional names and illustrative portraits</p>}
        <div className="people-team-grid">{team.map((member, index) => <article className="people-team-card" key={member.name}>
          <div className="people-team-photo"><img src={member.image} alt={`Illustrative portrait for sample team member ${member.name}`} loading="lazy" width={768} height={768} /><span className="people-member-number">0{index + 1}</span></div>
          <div className="people-member-info"><h3>{member.name}</h3><p>{member.role}</p><div className="people-socials"><span title="Sample LinkedIn profile — not connected" aria-label="Sample LinkedIn profile — not connected"><Linkedin size={16} aria-hidden="true" /></span><span title="Sample Instagram profile — not connected" aria-label="Sample Instagram profile — not connected"><Instagram size={16} aria-hidden="true" /></span></div></div>
        </article>)}</div>
      </div>
    </section>
  </div>;
}