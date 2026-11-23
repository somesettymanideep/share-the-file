import { useEffect, useRef, useState, useCallback } from "react";
import { X, Sparkles, Compass } from "lucide-react";

import principalImg from "@/assets/team/our-team-1-principal-architect-portrait.png";
import designLeadImg from "@/assets/team/our-team-2-design-lead-portrait.png";
import projectArchImg from "@/assets/team/our-team-3-project-architect-portrait.png";
import studioMgrImg from "@/assets/team/our-team-4-studio-manager-portrait.png";

export interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  specialization: string;
}

export const OUR_TEAM_MEMBERS: TeamMemberCard[] = [
  {
    id: "principal-architect",
    name: "Team Member Name",
    role: "PRINCIPAL ARCHITECT",
    image: principalImg,
    alt: "Principal Architect, Team Member",
    bio: "Guiding the architectural vision, conceptual framework, and sustainable design methodologies across master planning and residential commissions.",
    specialization: "Architectural Vision & Master Planning",
  },
  {
    id: "design-lead",
    name: "Team Member Name",
    role: "DESIGN LEAD",
    image: designLeadImg,
    alt: "Design Lead, Team Member",
    bio: "Directing spatial innovation, material tactility, and integrated design development from concept articulation to realization.",
    specialization: "Spatial Design & Materiality",
  },
  {
    id: "project-architect",
    name: "Team Member Name",
    role: "PROJECT ARCHITECT",
    image: projectArchImg,
    alt: "Project Architect, Team Member",
    bio: "Translating sophisticated architectural designs into precise technical coordination packages and site-responsive solutions.",
    specialization: "Technical Coordination & Project Execution",
  },
  {
    id: "studio-manager",
    name: "Team Member Name",
    role: "STUDIO MANAGER",
    image: studioMgrImg,
    alt: "Studio Manager, Team Member",
    bio: "Orchestrating multi-disciplinary studio operations, client synergy, and collaborative workflow excellence across all active practices.",
    specialization: "Studio Operations & Client Relations",
  },
];

interface OurTeamShowcaseProps {
  titleOur?: string;
  titleTeam?: string;
  members?: TeamMemberCard[];
  className?: string;
}

export default function OurTeamShowcase({
  titleOur = "OUR",
  titleTeam = "TEAM",
  members = OUR_TEAM_MEMBERS,
  className = "",
}: OurTeamShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberCard | null>(null);

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
      className={`sea-ourteam-section ${isRevealed ? "is-revealed" : ""} ${className}`}
      aria-labelledby="sea-ourteam-title"
    >
      <div className="sea-ourteam-inner">
        {/* Header matching provided layout */}
        <div className="sea-ourteam-header">
          <h2 id="sea-ourteam-title" className="sea-ourteam-title">
            <span className="sea-ourteam-title-our">{titleOur} </span>
            <span className="sea-ourteam-title-team">{titleTeam}</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="sea-ourteam-grid" role="list">
          {members.map((member, index) => {
            const staggerDelay = index * 120;
            return (
              <article
                key={member.id}
                className={`sea-ourteam-card ${isRevealed ? "is-revealed" : ""}`}
                style={{ transitionDelay: `${staggerDelay}ms` }}
                onClick={() => setSelectedMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`View profile of ${member.name}, ${member.role}`}
              >
                <div className="sea-ourteam-card-media">
                  {/* Subtle vertical SEA watermark on left side */}
                  <div className="sea-ourteam-watermark" aria-hidden="true">
                    <span>S</span>
                    <span>E</span>
                    <span>A</span>
                  </div>

                  {/* Team member portrait */}
                  <img
                    src={member.image}
                    alt={member.alt}
                    className="sea-ourteam-img"
                    loading="lazy"
                    width={454}
                    height={690}
                  />

                  {/* Deep dark gradient scrim at bottom */}
                  <div className="sea-ourteam-card-scrim" aria-hidden="true" />

                  {/* Bottom info text */}
                  <div className="sea-ourteam-card-info">
                    <h3 className="sea-ourteam-name">{member.name}</h3>
                    <p className="sea-ourteam-role">{member.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedMember && (
        <div
          className="sea-ourteam-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="sea-ourteam-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ourteam-modal-name"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sea-ourteam-modal-close"
              onClick={closeModal}
              aria-label="Close profile details"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="sea-ourteam-modal-content">
              <div className="sea-ourteam-modal-photo">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={454}
                  height={690}
                />
              </div>
              <div className="sea-ourteam-modal-body">
                <span className="sea-ourteam-modal-badge">
                  STUDIO ARCHITECTURE LEADERSHIP
                </span>
                <h3 id="ourteam-modal-name">{selectedMember.name}</h3>
                <p className="sea-ourteam-modal-role">{selectedMember.role}</p>
                <p className="sea-ourteam-modal-bio">{selectedMember.bio}</p>

                <div className="sea-ourteam-modal-details">
                  <div className="sea-ourteam-modal-detail-row">
                    <Compass size={18} className="sea-ourteam-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Specialization</strong>
                      <span>{selectedMember.specialization}</span>
                    </div>
                  </div>
                  <div className="sea-ourteam-modal-detail-row">
                    <Sparkles size={18} className="sea-ourteam-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Studio Domain</strong>
                      <span>Studio for Eclectic Architecture (SEA)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
