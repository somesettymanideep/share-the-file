import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Instagram, Linkedin, Quote, Star } from "lucide-react";
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
];

const team = [
  { name: "Aditi Sharma", role: "Senior Architect", image: portraitOne },
  { name: "Arjun Reddy", role: "Design Architect", image: portraitTwo },
  { name: "Meera Iyer", role: "Interior Designer", image: portraitThree },
  { name: "Rohan Patel", role: "BIM Specialist", image: portraitFour },
];

export default function SeaPeopleSections() {
  const [active, setActive] = useState(0);
  const visibleTestimonials = [testimonials[active], testimonials[(active + 1) % testimonials.length]];

  return <div className="sea-people">
    <section className="people-testimonials" aria-labelledby="people-testimonials-title">
      <div className="people-inner">
        <div className="people-heading people-testimonials-heading">
          <h2 id="people-testimonials-title">AWARDS &amp; RECOGNITION<span>.</span></h2>
          <p>CLIENT TESTIMONIALS</p>
        </div>
        <div className="people-testimonial-layout" aria-roledescription="carousel" aria-label="Sample client testimonials" aria-live="polite" aria-atomic="true">
          {visibleTestimonials.map((testimonial) => testimonial && <article className="people-testimonial-card" key={testimonial.name}>
            <div className="people-testimonial-portrait"><img src={testimonial.name === "Vikram Mehta" ? portraitTwo : clientPortrait} alt={`Illustrative sample portrait for ${testimonial.name}`} loading="lazy" width={816} height={816} /></div>
            <div className="people-quote-content">
              <Quote className="people-quote-mark" size={46} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="people-client"><h3>{testimonial.name}</h3><p>{testimonial.role}</p>
                <div className="people-stars" aria-label="Illustrative five-star rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={19} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</div>
                <span>Sample · Fictional client &amp; quotation</span>
              </div>
            </div>
          </article>)}
        </div>
        <div className="people-carousel-controls">
          <Button variant="outline" size="icon" className="people-arrow" aria-label="Previous testimonial" title="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ChevronLeft /></Button>
          <div className="people-pagination" aria-label="Choose testimonial">{testimonials.map((item, index) => <Button key={item.name} variant="ghost" size="icon" className="people-page-dot" aria-label={`Show testimonial ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></Button>)}</div>
          <Button variant="outline" size="icon" className="people-arrow" aria-label="Next testimonial" title="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ChevronRight /></Button>
        </div>
      </div>
    </section>
    <section className="people-team" aria-labelledby="people-team-title">
      <div className="people-inner">
        <div className="people-heading people-team-heading">
          <div><h2 id="people-team-title">Meet Our <em>Team</em><span>.</span></h2><p>A team of passionate architects, designers and innovators, dedicated to bringing your vision to life.</p></div>
          <Button asChild variant="link" className="people-contact"><a href="mailto:naresh@s4eaindia.com">Get in Touch <ArrowUpRight /></a></Button>
        </div>
        <p className="people-sample people-team-disclosure">Sample team · Fictional names and illustrative portraits</p>
        <div className="people-team-grid">{team.map((member, index) => <article className="people-team-card" key={member.name}>
          <div className="people-team-photo"><img src={member.image} alt={`Illustrative portrait for sample team member ${member.name}`} loading="lazy" width={768} height={768} /><span className="people-member-number">0{index + 1}</span></div>
          <div className="people-member-info"><h3>{member.name}</h3><p>{member.role}</p><div className="people-socials"><span title="Sample LinkedIn profile — not connected" aria-label="Sample LinkedIn profile — not connected"><Linkedin size={16} aria-hidden="true" /></span><span title="Sample Instagram profile — not connected" aria-label="Sample Instagram profile — not connected"><Instagram size={16} aria-hidden="true" /></span></div></div>
        </article>)}</div>
      </div>
    </section>
  </div>;
}