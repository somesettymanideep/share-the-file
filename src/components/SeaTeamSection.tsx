import { useEffect, useRef, useState, useCallback } from "react";
import { X, Award, GraduationCap, Compass } from "lucide-react";

import johnImg from "@/assets/team/john-harper.jpg";
import jennyImg from "@/assets/team/jenny-wilson.jpg";
import jacobImg from "@/assets/team/jacob-jones.jpg";
import miaImg from "@/assets/team/mia-mason.jpg";
import ankitaImg from "@/assets/team/ankita-jain.jpg";
import rituImg from "@/assets/team/ritu-arora.jpg";
import vikasImg from "@/assets/team/vikas-yadav.jpg";
import pragyaImg from "@/assets/team/pragya-jain.jpg";
import kapilImg from "@/assets/team/kapil-kathuria.jpg";

export interface TeamPrincipal {
  id: string;
  name: string;
  role: string;
  category: "site-leads" | "principals";
  image: string;
  bio: string;
  specialization: string;
  education: string;
  projects: string;
  linkedin?: string;
  twitter?: string;
}

export const SITE_LEADS: TeamPrincipal[] = [
  {
    id: "john-harper",
    name: "JOHN HARPER",
    role: "Site Manager",
    category: "site-leads",
    image: johnImg || "/images/team/john-harper.jpg",
    bio: "Supervising on-site construction milestones, quality control, contractor alignment, and structural safety across active commercial and residential sites.",
    specialization: "Site Operations & Execution Management",
    education: "B.Tech Civil Engineering, JNTU Hyderabad",
    projects: "Krishna Sindhura Hospital, Gangadhar Estate",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "jenny-wilson",
    name: "JENNY WILSON",
    role: "Safety Officer",
    category: "site-leads",
    image: jennyImg || "/images/team/jenny-wilson.jpg",
    bio: "Directing health, safety, and environmental (HSE) protocols on all SEA construction projects, establishing zero-incident standards and site risk governance.",
    specialization: "HSE Compliance & Safety Architecture",
    education: "Certified Safety Professional (CSP)",
    projects: "All Andhra & Telangana Project Sites",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "jacob-jones",
    name: "JACOB JONES",
    role: "Civil Engineer",
    category: "site-leads",
    image: jacobImg || "/images/team/jacob-jones.jpg",
    bio: "Leading reinforced concrete analysis, foundation engineering, and structural integrity oversight from groundbreaking to structural topping out.",
    specialization: "Structural Engineering & Concrete Detailing",
    education: "B.E. Civil & Structural Engineering",
    projects: "Ramko Heights, KMS Corporate Core",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "mia-mason",
    name: "MIA MASON",
    role: "Lead Architect",
    category: "site-leads",
    image: miaImg || "/images/team/mia-mason.jpg",
    bio: "Translating architectural design vision into coordinated technical drawing packages, ensuring site construction remains faithful to spatial and tectonic intent.",
    specialization: "Architectural Detailing & Site Realization",
    education: "M.Arch Architectural Design",
    projects: "Sarika Estate, Benz Horizon Suites",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
];

export const PRINCIPALS: TeamPrincipal[] = [
  {
    id: "ankita-jain",
    name: "ANKITA JAIN",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: ankitaImg || "/images/team/ankita-jain.jpg",
    bio: "Spearheading master planning and sustainable residential projects with an emphasis on climatic responsiveness, tactile material palettes, and timeless structural proportions.",
    specialization: "Sustainable Master Planning & Luxury Residences",
    education: "B.Arch, School of Planning and Architecture, New Delhi",
    projects: "Gangadhar Estate, Krishna Sindhura Campus, Urban Eco-Villas",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "ritu-arora",
    name: "RITU ARORA",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: rituImg || "/images/team/ritu-arora.jpg",
    bio: "Leading bespoke interior architecture and holistic spatial environments, seamlessly blending artisanal craftsmanship with contemporary lifestyle philosophies.",
    specialization: "Interior Architecture, Materiality & Curation",
    education: "M.Arch, CEPT University, Ahmedabad",
    projects: "Sarika Estate Interiors, Benz Horizon Suites, Studio Headquarters",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "vikas-yadav",
    name: "VIKAS YADAV",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: vikasImg || "/images/team/vikas-yadav.jpg",
    bio: "Directing large-scale institutional developments and commercial high-rises, bridging structural ingenuity with advanced integrated delivery systems.",
    specialization: "Commercial Towers & Structural Integration",
    education: "B.Arch, Indian Institute of Technology (IIT) Roorkee",
    projects: "Ramko Heights, KMS Corporate Park, Amaravati Commercial Core",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "pragya-jain",
    name: "PRAGYA JAIN",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: pragyaImg || "/images/team/pragya-jain.jpg",
    bio: "Guiding institutional campus design, public realm revitalization, and environmental envelope performance across Andhra Pradesh and Telangana.",
    specialization: "Institutional Campuses & Public Architecture",
    education: "B.Arch, Sir J.J. College of Architecture, Mumbai",
    projects: "Manjunatha Health Care Campus, Heritage Cultural Pavilion",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "kapil-kathuria",
    name: "KAPIL KATHURIA",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: kapilImg || "/images/team/kapil-kathuria.jpg",
    bio: "Championing Building Information Modeling (BIM Level 2/3), computational design, and parametric facade engineering for zero-defect construction execution.",
    specialization: "Parametric Facades, BIM & Digital Construction",
    education: "M.Sc Computational Architecture",
    projects: "BIM Digital Twins, Modular Care Pavilions, Kinetic Shading Facades",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
];

export const ALL_TEAM_MEMBERS: TeamPrincipal[] = [...SITE_LEADS, ...PRINCIPALS];

export type TeamCategory = "site-leads" | "principals" | "all";

function TeamCardItem({
  member,
  index,
  isRevealed,
  onSelect,
}: {
  member: TeamPrincipal;
  index: number;
  isRevealed: boolean;
  onSelect: () => void;
}) {
  const staggerDelay = (index % 4) * 120;

  return (
    <article
      className={`sea-team-card ${isRevealed ? "is-revealed" : ""}`}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`View architectural profile of ${member.name}, ${member.role}`}
    >
      <div className="sea-team-card-media">
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          className="sea-team-img"
          loading="lazy"
          width={464}
          height={626}
        />
        <div className="sea-team-card-scrim" aria-hidden="true" />

        {/* Bottom bar matching reference image layout */}
        <div className="sea-team-card-bar">
          <div className="sea-team-card-info">
            <h3 className="sea-team-name">{member.name}</h3>
            <p className="sea-team-role">{member.role}</p>
          </div>

          <div
            className="sea-team-card-actions"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={member.linkedin ?? "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              className="sea-team-social-btn sea-team-social-in"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <span>in</span>
            </a>
            <a
              href={member.twitter ?? "https://x.com"}
              target="_blank"
              rel="noreferrer"
              className="sea-team-social-btn sea-team-social-x"
              aria-label={`${member.name} X Profile`}
            >
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SeaTeamSection({
  defaultCategory = "site-leads",
  showFilters = true,
}: {
  defaultCategory?: TeamCategory;
  showFilters?: boolean;
}) {
  const [selectedMember, setSelectedMember] = useState<TeamPrincipal | null>(null);
  const [activeTab, setActiveTab] = useState<TeamCategory>(defaultCategory);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll reveal animation one-by-one
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsRevealed(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedMember) {
      window.addEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [selectedMember, closeModal]);

  const displayedMembers =
    activeTab === "all"
      ? ALL_TEAM_MEMBERS
      : activeTab === "principals"
      ? PRINCIPALS
      : SITE_LEADS;

  return (
    <section
      ref={sectionRef}
      className={`sea-team-section ${isRevealed ? "is-revealed" : ""}`}
      aria-labelledby="sea-team-title"
    >
      <div className="sea-team-inner">
        <div className="sea-team-header-row">
          <div className="sea-team-header">
            <span className="sea-team-kicker">OUR ARCHITECTURAL COLLECTIVE</span>
            <h2 id="sea-team-title">THE MINDS THAT MAKE SEAIPL</h2>
            <div className="sea-team-bar" aria-hidden="true" />
          </div>

          {/* Discipline Filters */}
          {showFilters && (
            <div className="sea-team-filters" role="tablist" aria-label="Team categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "site-leads"}
                className={`sea-team-filter-btn ${activeTab === "site-leads" ? "is-active" : ""}`}
                onClick={() => setActiveTab("site-leads")}
              >
                Site &amp; Project Leads ({SITE_LEADS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "principals"}
                className={`sea-team-filter-btn ${activeTab === "principals" ? "is-active" : ""}`}
                onClick={() => setActiveTab("principals")}
              >
                Principal Architects ({PRINCIPALS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "all"}
                className={`sea-team-filter-btn ${activeTab === "all" ? "is-active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Team ({ALL_TEAM_MEMBERS.length})
              </button>
            </div>
          )}
        </div>

        {/* 4 Profile Cards Single-Row Layout */}
        <div className="sea-team-grid" role="list">
          {displayedMembers.map((member, index) => (
            <TeamCardItem
              key={member.id}
              member={member}
              index={index}
              isRevealed={isRevealed}
              onSelect={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal on Selection */}
      {selectedMember && (
        <div
          className="sea-team-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="sea-team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-member-name"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sea-team-modal-close"
              onClick={closeModal}
              aria-label="Close profile details"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="sea-team-modal-content">
              <div className="sea-team-modal-photo">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={464}
                  height={626}
                />
              </div>
              <div className="sea-team-modal-body">
                <span className="sea-team-modal-badge">
                  {selectedMember.category === "principals"
                    ? "PRINCIPAL LEADERSHIP"
                    : "SITE & PROJECT EXECUTION"}
                </span>
                <h3 id="modal-member-name">{selectedMember.name}</h3>
                <p className="sea-team-modal-role">{selectedMember.role}</p>

                <p className="sea-team-modal-bio">{selectedMember.bio}</p>

                <div className="sea-team-modal-details">
                  <div className="sea-team-modal-detail-row">
                    <Compass size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Specialization</strong>
                      <span>{selectedMember.specialization}</span>
                    </div>
                  </div>
                  <div className="sea-team-modal-detail-row">
                    <GraduationCap size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Education</strong>
                      <span>{selectedMember.education}</span>
                    </div>
                  </div>
                  <div className="sea-team-modal-detail-row">
                    <Award size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Key Projects</strong>
                      <span>{selectedMember.projects}</span>
                    </div>
                  </div>
                </div>

                <div className="sea-team-modal-actions">
                  <a
                    href={selectedMember.linkedin ?? "https://linkedin.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="sea-team-modal-social"
                  >
                    <span>in</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={selectedMember.twitter ?? "https://x.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="sea-team-modal-social"
                  >
                    <span>X</span>
                    <span>Twitter / X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
