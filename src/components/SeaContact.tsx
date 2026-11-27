import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, MapPin, Phone, Clock, UserRound, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SeaProjectShell from "@/components/SeaProjectShell";
import ContactLocations from "@/components/ContactLocations";
import { BUDGETS, PROJECT_TYPES, STUDIO_CONTACT, enquirySchema, enquiryEmail } from "@/lib/contact";

export default function SeaContact() {
  const root = useRef<HTMLElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftUrl, setDraftUrl] = useState<string>();
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let started = false;
    const start = () => {
      if (started || document.documentElement.classList.contains("sea-pre-lock")) return;
      started = true;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (targets: string | Element[], trigger: Element | null, stagger = 0.1) => {
          if (!trigger) return;
          gsap.from(targets, {
            y: 30, opacity: 0, duration: 0.85, stagger, ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger, start: "top 88%", once: true },
          });
        };
        const q = (sel: string) => page.querySelector(sel);
        const opening = q(".contact-opening");
        if (opening) {
          gsap.from(".contact-opening > h1", {
            clipPath: "inset(0 100% 0 0)", y: 24, duration: 1.1, ease: "power4.out",
            clearProps: "clipPath,transform",
            scrollTrigger: { trigger: opening, start: "top 88%", once: true },
          });
        }
        const details = q(".contact-details");
        if (details) gsap.from(".contact-details > div", {
          x: -48, opacity: 0, filter: "blur(6px)", duration: 0.9, stagger: 0.12, ease: "power3.out",
          clearProps: "transform,opacity,filter",
          scrollTrigger: { trigger: details, start: "top 85%", once: true },
        });
        const form = q(".contact-form");
        if (form) gsap.from(form, {
          x: 48, opacity: 0, duration: 1, ease: "power3.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: form, start: "top 85%", once: true },
        });
        const locations = q(".contact-locations");
        if (locations) gsap.from(".contact-map-heading", {
          clipPath: "inset(0 100% 0 0)", y: 24, duration: 1.1, ease: "power4.out",
          clearProps: "clipPath,transform",
          scrollTrigger: { trigger: locations, start: "top 85%", once: true },
        });
        const map = q(".contact-map-wrap");
        if (map) {
          gsap.from(map, {
            scale: 0.92, opacity: 0, filter: "blur(10px)", duration: 1.2, ease: "power3.out",
            clearProps: "opacity,filter",
            scrollTrigger: { trigger: map, start: "top 85%", once: true },
          });
          gsap.fromTo(map, { yPercent: 4 }, {
            yPercent: -4, ease: "none",
            scrollTrigger: { trigger: map, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
        const presence = q(".contact-presence");
        if (presence) gsap.from(Array.from(presence.children), {
          y: 36, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: presence, start: "top 88%", once: true },
        });
        const footer = page.parentElement?.querySelector(".sea-footer");
        if (footer) reveal(Array.from(footer.children), footer, 0.14);
      }, page);
      ScrollTrigger.refresh();
    };
    const observer = new MutationObserver(start);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    start();
    return () => { observer.disconnect(); media.revert(); };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = Object.fromEntries(new FormData(event.currentTarget));
    const result = enquirySchema.safeParse(input);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      setDraftUrl(undefined);
      return;
    }
    setErrors({});
    const url = enquiryEmail(result.data);
    setDraftUrl(url);
    window.location.href = url;
  }
  return <SeaProjectShell><main ref={root} className="sea-contact">
    <section className="contact-opening" aria-labelledby="contact-heading">
      <h1 id="contact-heading">Let’s Create Something <span>Extraordinary.</span></h1>
      <div className="contact-copy">
        <dl className="contact-details">
          <div><MapPin aria-hidden="true" /><div><dt>Our Corporate Office</dt><dd>{STUDIO_CONTACT.address}</dd></div></div>
          <div><Mail aria-hidden="true" /><div><dt>Email Us</dt><dd><a href={`mailto:${STUDIO_CONTACT.email}`}>{STUDIO_CONTACT.email}</a></dd></div></div>
          <div><Phone aria-hidden="true" /><div><dt>Call Us</dt><dd><a href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`}>{STUDIO_CONTACT.phone}</a></dd></div></div>
          <div><Clock aria-hidden="true" /><div><dt>Working Hours</dt><dd>{STUDIO_CONTACT.hours}</dd></div></div>
        </dl>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="contact-fields">
          {[
            { name: "name", label: "Full Name", type: "text", autocomplete: "name", max: 100 },
            { name: "email", label: "Email Address", type: "email", autocomplete: "email", max: 255 },
            { name: "phone", label: "Phone Number", type: "tel", autocomplete: "tel", max: 20 },
            { name: "location", label: "Project Location", type: "text", autocomplete: "off", max: 150 },
          ].map(field => { const Icon = field.name === "name" ? UserRound : field.name === "email" ? Mail : field.name === "phone" ? Phone : MapPin; return <div className="contact-field" key={field.name}><label htmlFor={`contact-${field.name}`}>{field.label}<span className="contact-required"> *</span></label><div className="contact-input-wrap"><Icon size={16} aria-hidden="true" /><Input id={`contact-${field.name}`} name={field.name} type={field.type} placeholder={field.name === "name" ? "Enter your name" : field.name === "email" ? "Enter your email" : field.name === "phone" ? "Enter your phone number" : "Enter location"} autoComplete={field.autocomplete} maxLength={field.max} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} /></div>{errors[field.name] && <p id={`error-${field.name}`} className="contact-error">{errors[field.name]}</p>}</div>; })}
          <div className="contact-field"><label htmlFor="contact-type">Project Type</label><select id="contact-type" name="type" defaultValue="" required aria-invalid={Boolean(errors['type'])}><option value="" disabled>Select project type</option>{PROJECT_TYPES.map(type => <option key={type}>{type}</option>)}</select>{errors['type'] && <p className="contact-error">Select a project type.</p>}</div>
          <div className="contact-field"><label htmlFor="contact-budget">Estimated Budget</label><select id="contact-budget" name="budget" defaultValue="To be discussed">{BUDGETS.map(budget => <option key={budget}>{budget}</option>)}</select></div>
          <div className="contact-field contact-field-wide"><label htmlFor="contact-message">Message / Project Details<span className="contact-required"> *</span></label><Textarea id="contact-message" name="message" placeholder="Tell us about your project…" rows={4} maxLength={2000} required aria-invalid={Boolean(errors['message'])} aria-describedby={errors['message'] ? "error-message" : undefined} />{errors['message'] && <p id="error-message" className="contact-error">{errors['message']}</p>}</div>
        </div>
        <Button type="submit" className="contact-submit"><Send size={17} />Prepare Enquiry<ArrowUpRight size={18} /></Button>
        <p className="contact-form-note">Opens your email app with your enquiry ready to send.</p>
        {draftUrl && <div className="contact-feedback" role="status">Your enquiry draft is ready. Send it from your email app to reach SEA. <a href={draftUrl}>Open email draft<ArrowUpRight size={16} /></a></div>}
      </form>
    </section>
    <ContactLocations />
  </main></SeaProjectShell>;
}