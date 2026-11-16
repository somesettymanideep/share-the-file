import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, Linkedin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import residence from "@/assets/sea-residence.asset.json";
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
  const testimonial = testimonials[active];
  if (!testimonial) return null;

  return <div className="sea-people">
    <section className="people-testimonials" aria-labelledby="people-testimonials-title">
      <div className="people-inner">
        <div className="people-heading">
          <h2 id="people-testimonials-title">What Our Clients <em>Say</em><span>.</span></h2>
          <p>Trusted by clients, inspired by our work. Here's what they have to say about SEA.</p>
        </div>
        <div className="people-testimonial-layout">
          <figure className="people-project">
            <img src={residence.url} alt="Contemporary residential architecture with carefully composed lines and natural light" loading="lazy" width={1000} height={1200} />
            <figcaption><span>SPACE. LIGHT. LIFE.</span><span>SEA / Architecture</span></figcaption>
          </figure>
          <div className="people-testimonial-card" aria-roledescription="carousel" aria-label="Sample client testimonials">
            <div className="people-quote-top"><Quote size={52} strokeWidth={1} aria-hidden="true" /><span className="people-sample">Sample testimonial · {String(active + 1).padStart(2, "0")}</span></div>
            <div className="people-quote-content" aria-live="polite" aria-atomic="true">
              <blockquote key={active}>“{testimonial.quote}”</blockquote>
              <div className="people-client">
                <img src={clientPortrait} alt="Illustrative sample client portrait" loading="lazy" width={816} height={816} />
                <div><h3>{testimonial.name}</h3><p>{testimonial.role} · {testimonial.company}</p><span>Fictional client & quotation</span></div>
              </div>
            </div>
            <div className="people-carousel-controls">
              <div className="people-pagination" aria-label="Choose testimonial">{testimonials.map((item, index) => <Button key={item.name} variant="ghost" size="icon" className="people-page-dot" aria-label={`Show testimonial ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></Button>)}</div>
              <div className="people-arrows"><Button variant="outline" size="icon" className="people-arrow" aria-label="Previous testimonial" title="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ArrowLeft /></Button><Button variant="outline" size="icon" className="people-arrow" aria-label="Next testimonial" title="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ArrowRight /></Button></div>
            </div>
          </div>
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