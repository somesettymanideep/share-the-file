import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronsUpDown, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CAPITAL_SOURCES, INDIA_REGIONS, getRegionOffice } from "@/lib/india-regions";
import { STUDIO_CONTACT } from "@/lib/contact";

export default function ContactLocations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("Telangana");
  const [open, setOpen] = useState(false);
  const selected = INDIA_REGIONS.find(region => region.name === active);
  const office = getRegionOffice(active);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".contact-map-heading", { y: 24, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    }, root);
    return () => context.revert();
  }, []);
  function moveRegion(index: number, key: string) {
    const offset = key === "ArrowRight" || key === "ArrowDown" ? 1 : key === "ArrowLeft" || key === "ArrowUp" ? -1 : 0;
    if (!offset) return;
    const next = INDIA_REGIONS[(index + offset + INDIA_REGIONS.length) % INDIA_REGIONS.length];
    if (!next) return;
    setActive(next.name);
    root.current?.querySelector<SVGPathElement>(`[data-region-index="${(index + offset + INDIA_REGIONS.length) % INDIA_REGIONS.length}"]`)?.focus();
  }
  return <section ref={root} className="contact-locations" aria-labelledby="contact-map-title">
    <header className="contact-map-heading"><h2 id="contact-map-title">Across India<span>.</span></h2></header>
    <div className="contact-map-layout">
      <div className="contact-region-picker">
        <label id="contact-region-label">State / Union territory</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild><Button variant="outline" role="combobox" aria-expanded={open} aria-labelledby="contact-region-label" className="contact-region-trigger"><span>{active}</span><ChevronsUpDown size={18} /></Button></PopoverTrigger>
          <PopoverContent align="start" className="contact-region-options p-0">
            <Command><CommandInput placeholder="Search regions…" aria-label="Search regions" /><CommandList><CommandEmpty>No regions found.</CommandEmpty><CommandGroup>
              {INDIA_REGIONS.map(region => <CommandItem key={region.name} value={region.name} onSelect={() => { setActive(region.name); setOpen(false); }}><span>{region.name}</span>{active === region.name && <Check size={16} />}</CommandItem>)}
            </CommandGroup></CommandList></Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="contact-map-wrap">
        <svg className="contact-india-map" viewBox="0 0 550 600" aria-label="States and union territories of India">
          <title>India — states and union territories</title>
          {INDIA_REGIONS.map((region, index) => <path key={region.name} d={region.path} fillRule="evenodd" data-region-index={index} className={`contact-region ${active === region.name ? "is-active" : ""}`} role="button" tabIndex={active === region.name ? 0 : -1} aria-label={region.name} aria-pressed={active === region.name} onClick={() => setActive(region.name)} onKeyDown={event => {
            if (["Enter", " ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
              event.preventDefault();
              if (event.key === "Enter" || event.key === " ") setActive(region.name);
              else moveRegion(index, event.key);
            }
          }}><title>{region.name}</title></path>)}
        </svg>
        <p className="contact-map-credit">Boundaries: <a href="https://github.com/udit-001/india-maps-data" target="_blank" rel="noopener noreferrer">India Maps Data</a></p>
      </div>
      <div className="contact-region-details" aria-live="polite" aria-atomic="true">
        {selected && <><span className="contact-region-kind">{selected.kind}</span><h3>{selected.name}</h3><dl className="contact-region-capitals"><dt>{selected.capitals.length > 1 ? "Capitals" : "Capital"}</dt><dd>{selected.capitals.map(capital => <span key={capital}>{capital}</span>)}</dd></dl></>}
        {office && <div className="contact-region-office"><h4><MapPin size={23} />{office.name}</h4><p>{office.address}</p><a href={office.directions} target="_blank" rel="noopener noreferrer">Get Directions<ArrowUpRight size={18} /></a><a href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`}><Phone size={17} />{STUDIO_CONTACT.phone}</a><a href={`mailto:${STUDIO_CONTACT.email}`}><Mail size={17} />{STUDIO_CONTACT.email}</a></div>}
        <div className="contact-capital-sources">{CAPITAL_SOURCES.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={12} /></a>)}</div>
      </div>
    </div>
  </section>;
}
