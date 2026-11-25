import { useEffect, useRef, useState, useCallback } from "react";
import { X, Award, GraduationCap, Compass } from "lucide-react";

import dummyOne from "@/assets/sea-sample-team-1.jpg";
import dummyTwo from "@/assets/sea-sample-team-2.jpg";
import dummyThree from "@/assets/sea-sample-team-3.jpg";
import dummyFour from "@/assets/sea-sample-team-4.jpg";

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
    image: dummyOne,
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
    image: dummyTwo,
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
    image: dummyThree,
    bio: "Leading reinforced concrete analysis, foundation engineering, and structural integrity oversight from groundbreaking to structural topping out.",
    specialization: "Structural Engineering & Concrete Detailing",
    education: "B.E. Civil & Structural Engineering",
    projects: "Mantralayam, KMS Corporate Core",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "mia-mason",
    name: "MIA MASON",
    role: "Lead Architect",
    category: "site-leads",
    image: dummyFour,
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
    image: dummyOne,
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
    image: dummyTwo,
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
    image: dummyThree,
    bio: "Directing large-scale institutional developments and commercial high-rises, bridging structural ingenuity with advanced integrated delivery systems.",
    specialization: "Commercial Towers & Structural Integration",
    education: "B.Arch, Indian Institute of Technology (IIT) Roorkee",
    projects: "Mantralayam, KMS Corporate Park, Amaravati Commercial Core",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "pragya-jain",
    name: "PRAGYA JAIN",
    role: "PRINCIPAL ARCHITECT",
    category: "principals",
    image: dummyFour,
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
    image: dummyOne,
    bio: "Championing Building Information Modeling (BIM Level 2/3), computational design, and parametric facade engineering for zero-defect construction execution.",
    specialization: "Parametric Facades, BIM & Digital Construction",
    education: "M.Sc Computational Architecture",
    projects: "BIM Digital Twins, Modular Care Pavilions, Kinetic Shading Facades",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
];

export const ALL_TEAM_MEMBERS: TeamPrincipal[] = [...SITE_LEADS, ...PRINCIPALS];

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
        </div>
      </div>
    </article>
  );
}

export default function SeaTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamPrincipal | null>(null);
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

  return (
    <section
      ref={sectionRef}
      className={`sea-team-section ${isRevealed ? "is-revealed" : ""}`}
      aria-labelledby="sea-team-title"
    >
      <div className="sea-team-inner">
        <div className="sea-team-header-row">
          <div className="sea-team-header">
            <h2 id="sea-team-title">THE MINDS THAT MAKE SEAIPL</h2>
            <div className="sea-team-bar" aria-hidden="true" />
          </div>
        </div>

        {/* 4 Profile Cards in a Single Row */}
        <div className="sea-team-grid" role="list">
          {SITE_LEADS.map((member, index) => (
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
