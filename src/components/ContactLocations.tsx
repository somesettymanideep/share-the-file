import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight, Building2, GitBranch, Box, Mail, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { INDIA_OUTLINE, indiaPoint } from "@/lib/india-map";
import { STUDIO_LOCATIONS, STUDIO_CONTACT } from "@/lib/contact";

export default function ContactLocations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("head-office");
  const [category, setCategory] = useState<"office" | "branches" | "project">("office");
  const selected = STUDIO_LOCATIONS.find(location => location.id === active) ?? STUDIO_LOCATIONS[0];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const outline = root.current?.querySelector<SVGPathElement>(".contact-map-outline");
      if (outline) {
        const length = outline.getTotalLength();
        gsap.fromTo(outline, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
      }
      gsap.from(".contact-map-heading", { y: 24, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="contact-locations" aria-labelledby="contact-map-title">
    <header className="contact-map-heading"><span className="contact-kicker">OUR PRESENCE</span><h2 id="contact-map-title">Across<br />India<span>.</span></h2><p>Building meaningful spaces across the country.</p><ul className="contact-map-legend"><li><MapPin size={17} />Head Office</li><li><GitBranch size={17} />Branches</li><li><Box size={17} />Projects</li></ul></header>
    <div className="contact-map-layout">
      <div className="contact-map-wrap">
        <svg className="contact-india-map" viewBox="0 0 650 670" role="img" aria-label="Map of India showing SEA in Vijayawada">
           <circle cx="325" cy="335" r="225" className="contact-map-orbit" /><circle cx="325" cy="335" r="280" className="contact-map-orbit" />
           <path d={INDIA_OUTLINE} className="contact-map-land" />
          <path d={INDIA_OUTLINE} className="contact-map-outline" />
          <text x="160" y="330" className="contact-map-label">INDIA</text>
          {STUDIO_LOCATIONS.map(location => {
            const point = indiaPoint(location.longitude, location.latitude);
            // One shared city marker; concentric targets preserve actual coordinates.
            const radius = location.kind === "office" ? 16 : 7;
            return <g key={location.id} className={`contact-map-pin ${active === location.id ? "is-active" : ""}`} tabIndex={0} role="button" aria-label={location.name} aria-pressed={active === location.id} onMouseEnter={() => setActive(location.id)} onFocus={() => setActive(location.id)} onClick={() => setActive(location.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(location.id); } }}>
              <circle cx={point.x} cy={point.y} r={radius + 8} className="contact-pin-pulse" />
              <circle cx={point.x} cy={point.y} r={radius} className="contact-pin-dot" />
              <title>{`${location.name} · ${location.city}`}</title>
            </g>;
          })}
          <text x="306" y="473" className="contact-map-city">VIJAYAWADA</text>
        </svg>
        {selected && <div className="contact-map-preview" aria-live="polite">
          {selected.image && <img src={selected.image} alt={selected.name} />}
          <div><strong>{selected.name}</strong><span>{selected.city}</span></div>
        </div>}
        <p className="contact-map-credit">Geographic outline: Natural Earth</p>
      </div>
      <div className="contact-directory">
        <div className="contact-directory-tabs" role="tablist" aria-label="Location categories">{([{ id: "office", label: "Head Office", icon: Building2 }, { id: "branches", label: "Branches", icon: GitBranch }, { id: "project", label: "Projects", icon: Box }] as const).map(tab => <Button key={tab.id} id={`contact-tab-${tab.id}`} variant="ghost" role="tab" aria-selected={category === tab.id} aria-controls="contact-location-panel" onClick={() => { setCategory(tab.id); const first = STUDIO_LOCATIONS.find(location => location.kind === tab.id); if (first) setActive(first.id); }}><tab.icon size={18} />{tab.label}</Button>)}</div>
        <section id="contact-location-panel" role="tabpanel" aria-labelledby={`contact-tab-${category}`}>
          {category === "branches" ? <><h3>Our Branches</h3><p>For branch information, contact our Vijayawada team.</p><a className="contact-directory-email" href={`mailto:${STUDIO_CONTACT.email}`}><Mail size={16} />{STUDIO_CONTACT.email}</a></> : STUDIO_LOCATIONS.filter(location => location.kind === category).map(location => <div key={location.id} className="contact-directory-entry">
            {location.image && <img className="contact-directory-photo" src={location.image} alt={location.name} />}
            <Button variant="ghost" className={`contact-location-row ${active === location.id ? "is-active" : ""}`} onMouseEnter={() => setActive(location.id)} onFocus={() => setActive(location.id)} onClick={() => setActive(location.id)} aria-pressed={active === location.id}><MapPin size={20} /><span><strong>{location.name}</strong><small>{location.city}</small></span></Button>
            {location.kind === "office" && <div className="contact-directory-details"><a href="tel:+919000299600"><Phone size={15} />{STUDIO_CONTACT.phone}</a><a href={`mailto:${STUDIO_CONTACT.email}`}><Mail size={15} />{STUDIO_CONTACT.email}</a></div>}
            {location.slug && <Link className="contact-project-link" to="/projects/$slug" params={{ slug: location.slug }}>View project<ArrowUpRight size={16} /></Link>}
          </div>)}
          <Link className="contact-directory-all" to="/projects">View all projects<ArrowUpRight size={16} /></Link>
        </section>
      </div>
    </div>
  </section>;
}