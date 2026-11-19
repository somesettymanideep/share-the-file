import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, LayoutGrid, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INDIA_REGIONS, indiaRegionPoint } from "@/lib/india-regions";
import { STUDIO_BRANCHES, STUDIO_CONTACT, STUDIO_LOCATIONS, type StudioLocation } from "@/lib/contact";

type PresenceTab = "office" | "branches" | "projects";
const PRESENCE_TABS: { id: PresenceTab; label: string; icon: typeof Building2 }[] = [
  { id: "office", label: "Head Office", icon: Building2 },
  { id: "branches", label: "Branches", icon: MapPin },
  { id: "projects", label: "Projects", icon: LayoutGrid },
];

const HEAD_OFFICE = STUDIO_LOCATIONS.find(location => location.kind === "office");
const PROJECT_LOCATIONS = STUDIO_LOCATIONS.filter(location => location.kind === "project");

interface ProjectGroup {
  city: string;
  latitude: number;
  longitude: number;
  items: StudioLocation[];
}
// Several projects can share one city; those collapse into a single count marker.
const PROJECT_GROUPS: ProjectGroup[] = Object.values(
  PROJECT_LOCATIONS.reduce<Record<string, ProjectGroup>>((groups, project) => {
    const group = groups[project.city] ?? { city: project.city, latitude: project.latitude, longitude: project.longitude, items: [] };
    group.items.push(project);
    groups[project.city] = group;
    return groups;
  }, {}),
);

interface MapPinData {
  id: string;
  pinKind: "office" | "branch" | "project";
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  image?: string | undefined;
  count: number;
  items: StudioLocation[];
}

const PIN_PATH = "M0 0 C-1.6 -4.2 -9 -7.6 -9 -14 A9 9 0 1 1 9 -14 C9 -7.6 1.6 -4.2 0 0 Z";

function PinGlyph({ kind }: { kind: MapPinData["pinKind"] }) {
  if (kind === "office") {
    return <g className="contact-pin-glyph"><rect x="-3.4" y="-16.8" width="1.9" height="6.2" /><rect x="-0.95" y="-18.6" width="1.9" height="8" /><rect x="1.5" y="-15.4" width="1.9" height="4.8" /></g>;
  }
  if (kind === "project") {
    return <g className="contact-pin-glyph"><rect x="-3.7" y="-17.7" width="3" height="3" /><rect x="0.7" y="-17.7" width="3" height="3" /><rect x="-3.7" y="-13.3" width="3" height="3" /><rect x="0.7" y="-13.3" width="3" height="3" /></g>;
  }
  return <circle className="contact-pin-glyph" cy="-14" r="2.4" />;
}

export default function ContactLocations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("Telangana");
  const [tab, setTab] = useState<PresenceTab>("office");
  const [activePin, setActivePin] = useState<string | null>(HEAD_OFFICE?.id ?? null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".contact-map-heading", { y: 24, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    }, root);
    return () => context.revert();
  }, []);

  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") setActivePin(null);
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, []);

  function selectTab(next: PresenceTab) {
    setTab(next);
    setActivePin(
      next === "office" ? (HEAD_OFFICE?.id ?? null)
        : next === "branches" ? (STUDIO_BRANCHES[0]?.id ?? null)
          : (PROJECT_GROUPS[0] ? `city-${PROJECT_GROUPS[0].city}` : null),
    );
  }

  const pins: MapPinData[] =
    tab === "office"
      ? HEAD_OFFICE ? [{ ...HEAD_OFFICE, pinKind: "office", count: 1, items: [HEAD_OFFICE] }] : []
      : tab === "branches"
        ? STUDIO_BRANCHES.map(branch => ({ ...branch, pinKind: "branch" as const, count: 1, items: [branch] }))
        : PROJECT_GROUPS.map(group => ({
          id: `city-${group.city}`, pinKind: "project" as const,
          name: group.items.length > 1 ? `${group.items.length} projects` : (group.items[0]?.name ?? group.city),
          city: group.city, latitude: group.latitude, longitude: group.longitude,
          image: group.items[0]?.image, count: group.items.length, items: group.items,
        }));
  const tooltipPin = pins.find(pin => pin.id === activePin);

  function moveRegion(index: number, key: string) {
    const offset = key === "ArrowRight" || key === "ArrowDown" ? 1 : key === "ArrowLeft" || key === "ArrowUp" ? -1 : 0;
    if (!offset) return;
    const next = INDIA_REGIONS[(index + offset + INDIA_REGIONS.length) % INDIA_REGIONS.length];
    if (!next) return;
    setActive(next.name);
    root.current?.querySelector<SVGPathElement>(`[data-region-index="${(index + offset + INDIA_REGIONS.length) % INDIA_REGIONS.length}"]`)?.focus();
  }

  return <section ref={root} className="contact-locations" aria-labelledby="contact-map-title">
    <header className="contact-map-heading">
      <h2 id="contact-map-title">Our Presence<br /><span>Across India.</span></h2>
      <p>Building remarkable spaces across the country.</p>
    </header>
    <div className="contact-map-layout">
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
          <g className="contact-pins" key={tab}>
            {pins.map((pin, index) => {
              const point = indiaRegionPoint(pin.longitude, pin.latitude);
              const isActive = activePin === pin.id;
              return <g key={pin.id} className={`contact-pin contact-pin--${pin.pinKind}${isActive ? " is-active" : ""}`} transform={`translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`} role="button" tabIndex={0} aria-label={`${pin.name}, ${pin.city}`} aria-pressed={isActive} onClick={() => setActivePin(pin.id)} onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActivePin(pin.id); }
              }}>
                <g transform="scale(1.5)">
                  <g className="contact-pin-marker" style={{ animationDelay: `${index * 90}ms` }}>
                    {isActive && <circle className="contact-pin-ripple" r="9" style={{ animationDelay: `${index * 90 + 420}ms` }} />}
                    <path className="contact-pin-body" d={PIN_PATH} />
                    <circle className="contact-pin-face" cy="-14" r="5.6" />
                    <PinGlyph kind={pin.pinKind} />
                    {pin.count > 1 && <text className="contact-pin-count" y="-24" textAnchor="middle">{pin.count}</text>}
                  </g>
                </g>
              </g>;
            })}
          </g>
        </svg>
        {tooltipPin && (() => {
          const point = indiaRegionPoint(tooltipPin.longitude, tooltipPin.latitude);
          return <div className="contact-pin-tooltip" role="status" style={{ left: `clamp(96px, ${(point.x / 550 * 100).toFixed(2)}%, calc(100% - 96px))`, top: `${(point.y / 600 * 100).toFixed(2)}%` }}>
            {tooltipPin.image && <img src={tooltipPin.image} alt="" />}
            <span className="contact-pin-tooltip-text"><strong>{tooltipPin.name}</strong><span>{tooltipPin.city}</span></span>
          </div>;
        })()}
        <ul className="contact-map-legend">
          <li><i className="contact-legend-pin contact-legend-pin--office" aria-hidden="true" />Head Office</li>
          <li><i className="contact-legend-pin contact-legend-pin--branch" aria-hidden="true" />Branch Offices</li>
          <li><i className="contact-legend-pin contact-legend-pin--project" aria-hidden="true" />Projects</li>
        </ul>
      </div>
      <div className="contact-presence">
        <div className="contact-presence-tabs" role="tablist" aria-label="SEA locations">
          {PRESENCE_TABS.map(({ id, label, icon: Icon }) => <button key={id} type="button" role="tab" aria-selected={tab === id} className={`contact-presence-tab${tab === id ? " is-active" : ""}`} onClick={() => selectTab(id)}><Icon size={16} aria-hidden="true" />{label}</button>)}
        </div>
        <div className="contact-presence-panel" role="tabpanel" key={tab}>
          {tab === "office" && HEAD_OFFICE && <article className="contact-office-card">
            <h3><Building2 size={20} aria-hidden="true" />{HEAD_OFFICE.name}</h3>
            <p className="contact-office-city">{HEAD_OFFICE.city}</p>
            <p className="contact-office-address">{STUDIO_CONTACT.address}</p>
            <a href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`}><Phone size={16} aria-hidden="true" />{STUDIO_CONTACT.phone}</a>
            <a href={`mailto:${STUDIO_CONTACT.email}`}><Mail size={16} aria-hidden="true" />{STUDIO_CONTACT.email}</a>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_CONTACT.address)}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />Get Directions<ArrowUpRight size={15} aria-hidden="true" /></a>
          </article>}
          {tab === "branches" && (STUDIO_BRANCHES.length > 0 ? <ul className="contact-branch-list">
            {STUDIO_BRANCHES.map(branch => <li key={branch.id}>
              <button type="button" className={`contact-branch-item${activePin === branch.id ? " is-active" : ""}`} onClick={() => setActivePin(branch.id)}>
                <MapPin size={16} aria-hidden="true" /><span><strong>{branch.name}</strong><span>{branch.city}</span></span>
              </button>
              {branch.address && <div className="contact-branch-details">
                <p className="contact-branch-address">{branch.address}</p>
                <a className="contact-branch-link" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`} target="_blank" rel="noopener noreferrer"><MapPin size={15} aria-hidden="true" />Get Directions<ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>}
            </li>)}
          </ul> : <p className="contact-presence-empty">No branch offices yet — our Hyderabad head office serves clients across India.</p>)}
          {tab === "projects" && <ul className="contact-project-list">
            {PROJECT_LOCATIONS.map(project => <li key={project.id}>
              <button type="button" className={`contact-project-card${activePin === `city-${project.city}` ? " is-active" : ""}`} onClick={() => setActivePin(`city-${project.city}`)}>
                {project.image && <img src={project.image} alt="" />}
                <span className="contact-project-info"><strong>{project.name}</strong><span>{project.city}{project.status ? ` · ${project.status}` : ""}</span></span>
              </button>
              {project.slug && <Link className="contact-project-link" to="/projects/$slug" params={{ slug: project.slug }}>View Project<ArrowUpRight size={14} aria-hidden="true" /></Link>}
            </li>)}
          </ul>}
        </div>
      </div>
    </div>
  </section>;
}
