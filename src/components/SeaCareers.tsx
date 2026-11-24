import { useState, useRef, useEffect, useId } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  Send,
  X,
  CheckCircle2,
  Building2,
  Layers,
  Compass,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import SeaProjectShell from "@/components/SeaProjectShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CAREER_ROLES,
  CAREER_DEPARTMENTS,
  EXPERIENCE_LEVELS,
  type CareerRole,
  type CareerDepartment,
  careerApplicationSchema,
  createCareerEmailDraft
} from "@/lib/careers";

export default function SeaCareers() {
  const [selectedDept, setSelectedDept] = useState<CareerDepartment>("All");
  const [activeModalRole, setActiveModalRole] = useState<CareerRole | null>(null);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState<string>(CAREER_ROLES[0]?.id ?? "");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [draftUrl, setDraftUrl] = useState<string | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const modalTitleId = useId();
  const modalDescId = useId();

  // Escape key closes modal
  useEffect(() => {
    if (!activeModalRole) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalRole(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalRole]);

  // Focus management when modal opens
  useEffect(() => {
    if (activeModalRole) {
      modalCloseBtnRef.current?.focus();
    }
  }, [activeModalRole]);

  const filteredRoles = selectedDept === "All"
    ? CAREER_ROLES
    : CAREER_ROLES.filter((r) => r.department === selectedDept);

  const activeFormRole = CAREER_ROLES.find((r) => r.id === selectedRoleForForm) ?? CAREER_ROLES[0]!;

  const handleApplyFromModal = (role: CareerRole) => {
    setSelectedRoleForForm(role.id);
    setActiveModalRole(null);
    setCurrentStep(2);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      const roleSelect = document.getElementById("careers-role-select");
      roleSelect?.focus();
    }, 150);
  };

  const handleGoToStep2 = () => {
    const fullNameInput = document.getElementById("career-field-fullName") as HTMLInputElement | null;
    const emailInput = document.getElementById("career-field-email") as HTMLInputElement | null;
    const phoneInput = document.getElementById("career-field-phone") as HTMLInputElement | null;
    const locationInput = document.getElementById("career-field-currentLocation") as HTMLInputElement | null;

    const errors: Record<string, string> = {};
    if (!fullNameInput?.value.trim() || fullNameInput.value.trim().length < 2) {
      errors.fullName = "Enter your full name.";
    }
    if (!emailInput?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!phoneInput?.value.trim() || phoneInput.value.trim().length < 8) {
      errors.phone = "Enter a valid contact number.";
    }
    if (!locationInput?.value.trim() || locationInput.value.trim().length < 2) {
      errors.currentLocation = "Enter your current location.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors((prev) => ({ ...prev, ...errors }));
      const firstField = Object.keys(errors)[0];
      if (firstField) document.getElementById(`career-field-${firstField}`)?.focus();
      return;
    }

    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.fullName;
      delete next.email;
      delete next.phone;
      delete next.currentLocation;
      return next;
    });
    setCurrentStep(2);
  };

  const handleGoToStep3 = () => {
    const portfolioInput = document.getElementById("career-field-portfolioUrl") as HTMLInputElement | null;
    const resumeInput = document.getElementById("career-field-resumeUrl") as HTMLInputElement | null;

    const errors: Record<string, string> = {};
    if (!portfolioInput?.value.trim() || !/^https?:\/\//i.test(portfolioInput.value.trim())) {
      errors.portfolioUrl = "Provide a valid URL (http:// or https://) for your portfolio.";
    }
    if (!resumeInput?.value.trim() || !/^https?:\/\//i.test(resumeInput.value.trim())) {
      errors.resumeUrl = "Provide a valid URL (http:// or https://) for your resume/LinkedIn.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors((prev) => ({ ...prev, ...errors }));
      const firstField = Object.keys(errors)[0];
      if (firstField) document.getElementById(`career-field-${firstField}`)?.focus();
      return;
    }

    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.portfolioUrl;
      delete next.resumeUrl;
      delete next.roleId;
      delete next.experience;
      return next;
    });
    setCurrentStep(3);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      currentLocation: String(formData.get("currentLocation") ?? "").trim(),
      roleId: String(formData.get("roleId") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
      portfolioUrl: String(formData.get("portfolioUrl") ?? "").trim(),
      resumeUrl: String(formData.get("resumeUrl") ?? "").trim(),
      roleThought: String(formData.get("roleThought") ?? "").trim(),
      philosophyNote: String(formData.get("philosophyNote") ?? "").trim(),
    };

    const parsed = careerApplicationSchema.safeParse(data);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field && typeof field === "string") {
          errors[field] = issue.message;
        }
      }
      setFormErrors(errors);

      // Navigate to the step containing the first error
      if (errors["fullName"] || errors["email"] || errors["phone"] || errors["currentLocation"]) {
        setCurrentStep(1);
      } else if (errors["roleId"] || errors["experience"] || errors["portfolioUrl"] || errors["resumeUrl"]) {
        setCurrentStep(2);
      } else if (errors["roleThought"] || errors["philosophyNote"]) {
        setCurrentStep(3);
      }

      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        setTimeout(() => {
          document.getElementById(`career-field-${firstErrorField}`)?.focus();
        }, 50);
      }
      return;
    }

    setFormErrors({});
    const mailUrl = createCareerEmailDraft(parsed.data);
    setDraftUrl(mailUrl);
    window.location.href = mailUrl;
  };

  return (
    <SeaProjectShell>
      <main className="sea-careers">
        {/* =========================================================================
            SECTION 1: HERO STARTING BANNER
            ========================================================================= */}
        <section className="careers-hero" aria-labelledby="careers-hero-heading">
          <div className="careers-hero-media">
            <img
              src="/images/studio-courtyard.jpg"
              alt="Architects collaborating in the sunlit concrete courtyard of Studio for Eclectic Architecture"
              className="careers-hero-img"
            />
          </div>

          <div className="careers-hero-content">
            <h1 id="careers-hero-heading" className="careers-hero-title">
              Design your Next chapter
            </h1>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: OPENING ROLES SECTION
            ========================================================================= */}
        <section id="openings" className="careers-roles-section" aria-labelledby="roles-heading">
          <div className="careers-section-container">
            <header className="careers-section-header">
              <div className="careers-section-kicker">
                <Briefcase size={16} aria-hidden="true" />
                <span>OPPORTUNITIES AT SEA</span>
              </div>
              <h2 id="roles-heading" className="careers-section-title">
                Current Studio Openings
              </h2>
              <p className="careers-section-subtitle">
                Explore available opportunities across our architecture, computational BIM,
                interiors, and structural engineering disciplines. Click <strong>View More</strong> on any position to review in-depth responsibilities, criteria, and studio offerings.
              </p>
            </header>

            {/* Department Filter Pills */}
            <div className="careers-filter-bar" role="toolbar" aria-label="Filter positions by discipline">
              <span className="careers-filter-label">
                <Filter size={14} aria-hidden="true" /> Filter by:
              </span>
              <div className="careers-filter-list">
                {CAREER_DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    className={`careers-filter-btn ${selectedDept === dept ? "is-active" : ""}`}
                    onClick={() => setSelectedDept(dept)}
                    aria-pressed={selectedDept === dept}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Roles Grid */}
            <div className="careers-roles-grid">
              {filteredRoles.map((role) => (
                <article key={role.id} className="careers-role-card">
                  <div className="careers-card-top">
                    <span className="careers-card-badge">{role.departmentLabel}</span>
                    <span className="careers-card-type">{role.type}</span>
                  </div>

                  <h3 className="careers-card-title">{role.title}</h3>

                  <div className="careers-card-meta">
                    <span className="careers-meta-item">
                      <MapPin size={15} aria-hidden="true" />
                      {role.locations.join(" / ")}
                    </span>
                    <span className="careers-meta-item">
                      <Clock size={15} aria-hidden="true" />
                      {role.experience}
                    </span>
                  </div>

                  <p className="careers-card-desc">{role.shortDescription}</p>

                  <div className="careers-card-footer">
                    <button
                      type="button"
                      className="careers-view-more-btn"
                      onClick={() => setActiveModalRole(role)}
                      aria-label={`View detailed info about ${role.title}`}
                    >
                      <span>View Details</span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROLE DETAILS MODAL (POPUP)
            ========================================================================= */}
        {activeModalRole && (
          <div
            className="careers-modal-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModalRole(null);
            }}
            role="presentation"
          >
            <div
              className="careers-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              aria-describedby={modalDescId}
            >
              <div className="careers-modal-header">
                <div className="careers-modal-header-text">
                  <span className="careers-modal-badge">{activeModalRole.departmentLabel}</span>
                  <h3 id={modalTitleId} className="careers-modal-title">
                    {activeModalRole.title}
                  </h3>
                  <div className="careers-modal-tags">
                    <span><MapPin size={14} aria-hidden="true" /> {activeModalRole.locations.join(", ")}</span>
                    <span><Clock size={14} aria-hidden="true" /> {activeModalRole.experience}</span>
                    <span><Building2 size={14} aria-hidden="true" /> {activeModalRole.type}</span>
                  </div>
                </div>

                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  className="careers-modal-close"
                  onClick={() => setActiveModalRole(null)}
                  aria-label="Close detailed position popup"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="careers-modal-body">
                {/* Overview */}
                <div className="careers-modal-section">
                  <h4 className="careers-modal-h4">Role Overview</h4>
                  <p id={modalDescId} className="careers-modal-p">
                    {activeModalRole.overview}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="careers-modal-section">
                  <h4 className="careers-modal-h4">Key Responsibilities</h4>
                  <ul className="careers-modal-list">
                    {activeModalRole.responsibilities.map((resp, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="careers-list-icon" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="careers-modal-section">
                  <h4 className="careers-modal-h4">Required Qualifications &amp; Skills</h4>
                  <ul className="careers-modal-list">
                    {activeModalRole.requirements.map((req, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="careers-list-icon" aria-hidden="true" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Offer */}
                <div className="careers-modal-section">
                  <h4 className="careers-modal-h4">What SEA Offers</h4>
                  <ul className="careers-modal-list">
                    {activeModalRole.benefits.map((ben, i) => (
                      <li key={i}>
                        <Sparkles size={16} className="careers-list-icon" aria-hidden="true" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Callout */}
                <div className="careers-modal-callout">
                  <Lightbulb size={20} className="careers-callout-icon" aria-hidden="true" />
                  <div>
                    <strong>How We Evaluate Candidates:</strong>
                    <p>
                      We review design portfolios for spatial clarity, construction understanding, and original thought. When applying below, make sure to answer the role-specific inquiry in the form.
                    </p>
                  </div>
                </div>
              </div>

              <div className="careers-modal-footer">
                <Button
                  type="button"
                  className="careers-modal-apply-btn"
                  onClick={() => handleApplyFromModal(activeModalRole)}
                >
                  Apply for this Position <ArrowUpRight size={18} />
                </Button>
                <button
                  type="button"
                  className="careers-modal-cancel-btn"
                  onClick={() => setActiveModalRole(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: "SHOW US HOW YOU THINK" FORM SECTION
            ========================================================================= */}
        <section
          id="how-you-think"
          ref={formSectionRef}
          className="careers-thinking-section"
          aria-labelledby="thinking-heading"
        >
          <div className="careers-section-container">
            <header className="careers-section-header">
              <div className="careers-section-kicker">
                <Lightbulb size={16} aria-hidden="true" />
                <span>APPLICATION &amp; DESIGN INQUIRY</span>
              </div>
              <h2 id="thinking-heading" className="careers-section-title">
                Show us How You think
              </h2>
            </header>

            <div className="careers-form-layout">
              {/* Form Card */}
              <div className="careers-form-card">
                <form className="careers-form" onSubmit={handleFormSubmit} noValidate>
                  {/* 3-Step Stepper Progress Bar */}
                  <div className="careers-stepper" role="tablist" aria-label="Application form steps">
                    <button
                      type="button"
                      role="tab"
                      id="careers-step-tab-1"
                      aria-selected={currentStep === 1}
                      aria-controls="careers-step-1"
                      className={`careers-stepper-item ${currentStep === 1 ? "is-active" : ""} ${currentStep > 1 ? "is-complete" : ""}`}
                      onClick={() => setCurrentStep(1)}
                    >
                      <div className="careers-stepper-badge">
                        {currentStep > 1 ? <Check size={14} aria-hidden="true" /> : "01"}
                      </div>
                      <div className="careers-stepper-info">
                        <span className="careers-stepper-step">Step 1</span>
                        <span className="careers-stepper-title">Personal Details</span>
                      </div>
                    </button>

                    <div className={`careers-stepper-divider ${currentStep > 1 ? "is-complete" : ""}`} aria-hidden="true" />

                    <button
                      type="button"
                      role="tab"
                      id="careers-step-tab-2"
                      aria-selected={currentStep === 2}
                      aria-controls="careers-step-2"
                      className={`careers-stepper-item ${currentStep === 2 ? "is-active" : ""} ${currentStep > 2 ? "is-complete" : ""}`}
                      onClick={() => setCurrentStep(2)}
                    >
                      <div className="careers-stepper-badge">
                        {currentStep > 2 ? <Check size={14} aria-hidden="true" /> : "02"}
                      </div>
                      <div className="careers-stepper-info">
                        <span className="careers-stepper-step">Step 2</span>
                        <span className="careers-stepper-title">Position &amp; Experience</span>
                      </div>
                    </button>

                    <div className={`careers-stepper-divider ${currentStep > 2 ? "is-complete" : ""}`} aria-hidden="true" />

                    <button
                      type="button"
                      role="tab"
                      id="careers-step-tab-3"
                      aria-selected={currentStep === 3}
                      aria-controls="careers-step-3"
                      className={`careers-stepper-item ${currentStep === 3 ? "is-active" : ""}`}
                      onClick={() => setCurrentStep(3)}
                    >
                      <div className="careers-stepper-badge">03</div>
                      <div className="careers-stepper-info">
                        <span className="careers-stepper-step">Step 3</span>
                        <span className="careers-stepper-title">Design Inquiry</span>
                      </div>
                    </button>
                  </div>

                  {/* ================= STEP 1: Personal Details ================= */}
                  <div
                    id="careers-step-1"
                    role="tabpanel"
                    aria-labelledby="careers-step-tab-1"
                    className={`careers-form-step ${currentStep === 1 ? "is-active" : ""}`}
                  >
                    <fieldset className="careers-fieldset">
                      <legend className="careers-legend">1. Personal &amp; Contact Details</legend>
                      <div className="careers-field-grid">
                        {/* Full Name */}
                        <div className="careers-field">
                          <label htmlFor="career-field-fullName">
                            Full Name <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-fullName"
                            name="fullName"
                            type="text"
                            placeholder="e.g. Ar. Ananya Sharma"
                            autoComplete="name"
                            required
                            aria-invalid={Boolean(formErrors["fullName"])}
                            aria-describedby={formErrors["fullName"] ? "error-fullName" : undefined}
                          />
                          {formErrors["fullName"] && (
                            <p id="error-fullName" className="careers-field-error">
                              {formErrors["fullName"]}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="careers-field">
                          <label htmlFor="career-field-email">
                            Email Address <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-email"
                            name="email"
                            type="email"
                            placeholder="ananya@example.com"
                            autoComplete="email"
                            required
                            aria-invalid={Boolean(formErrors["email"])}
                            aria-describedby={formErrors["email"] ? "error-email" : undefined}
                          />
                          {formErrors["email"] && (
                            <p id="error-email" className="careers-field-error">
                              {formErrors["email"]}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="careers-field">
                          <label htmlFor="career-field-phone">
                            Phone Number <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            autoComplete="tel"
                            required
                            aria-invalid={Boolean(formErrors["phone"])}
                            aria-describedby={formErrors["phone"] ? "error-phone" : undefined}
                          />
                          {formErrors["phone"] && (
                            <p id="error-phone" className="careers-field-error">
                              {formErrors["phone"]}
                            </p>
                          )}
                        </div>

                        {/* Current Location */}
                        <div className="careers-field">
                          <label htmlFor="career-field-currentLocation">
                            Current Location / City <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-currentLocation"
                            name="currentLocation"
                            type="text"
                            placeholder="e.g. Hyderabad / Bangalore / Vijayawada"
                            required
                            aria-invalid={Boolean(formErrors["currentLocation"])}
                            aria-describedby={formErrors["currentLocation"] ? "error-currentLocation" : undefined}
                          />
                          {formErrors["currentLocation"] && (
                            <p id="error-currentLocation" className="careers-field-error">
                              {formErrors["currentLocation"]}
                            </p>
                          )}
                        </div>
                      </div>
                    </fieldset>

                    <div className="careers-step-actions careers-step-actions--end">
                      <Button
                        type="button"
                        className="careers-step-next-btn"
                        onClick={handleGoToStep2}
                      >
                        <span>Next: Position &amp; Experience</span>
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>

                  {/* ================= STEP 2: Position & Experience ================= */}
                  <div
                    id="careers-step-2"
                    role="tabpanel"
                    aria-labelledby="careers-step-tab-2"
                    className={`careers-form-step ${currentStep === 2 ? "is-active" : ""}`}
                  >
                    <fieldset className="careers-fieldset">
                      <legend className="careers-legend">2. Position &amp; Experience Level</legend>
                      <div className="careers-field-grid">
                        {/* Role Selector */}
                        <div className="careers-field">
                          <label htmlFor="careers-role-select">
                            Applying for Role <span className="careers-required">*</span>
                          </label>
                          <select
                            id="careers-role-select"
                            name="roleId"
                            value={selectedRoleForForm}
                            onChange={(e) => setSelectedRoleForForm(e.target.value)}
                            className="careers-select"
                            required
                            aria-invalid={Boolean(formErrors["roleId"])}
                            aria-describedby={formErrors["roleId"] ? "error-roleId" : undefined}
                          >
                            {CAREER_ROLES.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.title} ({role.departmentLabel})
                              </option>
                            ))}
                          </select>
                          {formErrors["roleId"] && (
                            <p id="error-roleId" className="careers-field-error">
                              {formErrors["roleId"]}
                            </p>
                          )}
                        </div>

                        {/* Experience Level */}
                        <div className="careers-field">
                          <label htmlFor="career-field-experience">
                            Experience Level <span className="careers-required">*</span>
                          </label>
                          <select
                            id="career-field-experience"
                            name="experience"
                            defaultValue={EXPERIENCE_LEVELS[2]}
                            className="careers-select"
                            required
                            aria-invalid={Boolean(formErrors["experience"])}
                            aria-describedby={formErrors["experience"] ? "error-experience" : undefined}
                          >
                            {EXPERIENCE_LEVELS.map((exp) => (
                              <option key={exp} value={exp}>
                                {exp}
                              </option>
                            ))}
                          </select>
                          {formErrors["experience"] && (
                            <p id="error-experience" className="careers-field-error">
                              {formErrors["experience"]}
                            </p>
                          )}
                        </div>

                        {/* Portfolio URL */}
                        <div className="careers-field">
                          <label htmlFor="career-field-portfolioUrl">
                            Portfolio URL (Drive, Behance, Website) <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-portfolioUrl"
                            name="portfolioUrl"
                            type="url"
                            placeholder="https://drive.google.com/... or https://behance.net/..."
                            required
                            aria-invalid={Boolean(formErrors["portfolioUrl"])}
                            aria-describedby={formErrors["portfolioUrl"] ? "error-portfolioUrl" : undefined}
                          />
                          {formErrors["portfolioUrl"] && (
                            <p id="error-portfolioUrl" className="careers-field-error">
                              {formErrors["portfolioUrl"]}
                            </p>
                          )}
                        </div>

                        {/* Resume URL */}
                        <div className="careers-field">
                          <label htmlFor="career-field-resumeUrl">
                            Resume / LinkedIn Profile URL <span className="careers-required">*</span>
                          </label>
                          <Input
                            id="career-field-resumeUrl"
                            name="resumeUrl"
                            type="url"
                            placeholder="https://linkedin.com/in/... or drive link"
                            required
                            aria-invalid={Boolean(formErrors["resumeUrl"])}
                            aria-describedby={formErrors["resumeUrl"] ? "error-resumeUrl" : undefined}
                          />
                          {formErrors["resumeUrl"] && (
                            <p id="error-resumeUrl" className="careers-field-error">
                              {formErrors["resumeUrl"]}
                            </p>
                          )}
                        </div>
                      </div>
                    </fieldset>

                    <div className="careers-step-actions">
                      <Button
                        type="button"
                        variant="outline"
                        className="careers-step-prev-btn"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft size={18} />
                        <span>Back: Personal Details</span>
                      </Button>
                      <Button
                        type="button"
                        className="careers-step-next-btn"
                        onClick={handleGoToStep3}
                      >
                        <span>Next: Design Inquiry</span>
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>

                  {/* ================= STEP 3: Design Inquiry & Philosophy ================= */}
                  <div
                    id="careers-step-3"
                    role="tabpanel"
                    aria-labelledby="careers-step-tab-3"
                    className={`careers-form-step ${currentStep === 3 ? "is-active" : ""}`}
                  >
                    {/* DYNAMIC ROLE-BASED QUESTION */}
                    <fieldset className="careers-fieldset careers-fieldset--highlight">
                      <div className="careers-highlight-head">
                        <Sparkles size={18} className="careers-sparkle-icon" aria-hidden="true" />
                        <div>
                          <span className="careers-highlight-badge">Specialized Inquiry</span>
                          <h3 className="careers-highlight-title">
                            {activeFormRole.thinkingPrompt.title}
                          </h3>
                          <p className="careers-highlight-desc">
                            {activeFormRole.thinkingPrompt.description}
                          </p>
                        </div>
                      </div>

                      <div className="careers-field">
                        <label htmlFor="career-field-roleThought">
                          Your Thought Process &amp; Approach <span className="careers-required">*</span>
                        </label>
                        <Textarea
                          id="career-field-roleThought"
                          name="roleThought"
                          rows={5}
                          placeholder={activeFormRole.thinkingPrompt.placeholder}
                          required
                          aria-invalid={Boolean(formErrors["roleThought"])}
                          aria-describedby={formErrors["roleThought"] ? "error-roleThought" : undefined}
                        />
                        {formErrors["roleThought"] && (
                          <p id="error-roleThought" className="careers-field-error">
                            {formErrors["roleThought"]}
                          </p>
                        )}
                      </div>
                    </fieldset>

                    {/* General Philosophy / Cover Statement */}
                    <fieldset className="careers-fieldset">
                      <legend className="careers-legend">3. Studio Philosophy &amp; Motivation</legend>
                      <div className="careers-field">
                        <label htmlFor="career-field-philosophyNote">
                          What philosophy or spatial ambition drives your work? Why Studio for Eclectic Architecture? <span className="careers-required">*</span>
                        </label>
                        <Textarea
                          id="career-field-philosophyNote"
                          name="philosophyNote"
                          rows={4}
                          placeholder="Tell us what draws you to our work, what kind of architecture you aspire to create, and what you hope to contribute to the studio..."
                          required
                          aria-invalid={Boolean(formErrors["philosophyNote"])}
                          aria-describedby={formErrors["philosophyNote"] ? "error-philosophyNote" : undefined}
                        />
                        {formErrors["philosophyNote"] && (
                          <p id="error-philosophyNote" className="careers-field-error">
                            {formErrors["philosophyNote"]}
                          </p>
                        )}
                      </div>
                    </fieldset>

                    {/* Step 3 Submit Actions */}
                    <div className="careers-step-actions">
                      <Button
                        type="button"
                        variant="outline"
                        className="careers-step-prev-btn"
                        onClick={() => setCurrentStep(2)}
                      >
                        <ArrowLeft size={18} />
                        <span>Back: Position</span>
                      </Button>
                      <Button type="submit" className="careers-submit-btn">
                        <Send size={18} />
                        <span>Prepare Application Draft</span>
                        <ArrowUpRight size={18} />
                      </Button>
                    </div>
                    <p className="careers-submit-note">
                      Opens your mail client with your complete structured application ready to send directly to <strong>naresh@s4eaindia.com</strong>.
                    </p>

                    {draftUrl && (
                      <div className="careers-feedback" role="status">
                        <CheckCircle2 size={18} className="careers-feedback-icon" />
                        <div>
                          <strong>Your application draft is ready!</strong>
                          <p>
                            If your email client didn't open automatically, please click below:
                          </p>
                          <a href={draftUrl} className="careers-feedback-link">
                            Open Email Application Draft <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Sidebar Guide */}
              <aside className="careers-aside" aria-label="Application Guidelines">
                <div className="careers-aside-card">
                  <h3 className="careers-aside-title">What We Value in Candidates</h3>
                  <ul className="careers-aside-list">
                    <li>
                      <Compass size={18} className="careers-aside-icon" aria-hidden="true" />
                      <div>
                        <strong>Spatial &amp; Tectonic Clarity</strong>
                        <p>We look for drawings that clearly articulate how materials meet, load is transferred, and light is drawn in.</p>
                      </div>
                    </li>
                    <li>
                      <Layers size={18} className="careers-aside-icon" aria-hidden="true" />
                      <div>
                        <strong>Disciplined Documentation</strong>
                        <p>Our drawings build real buildings. We admire clean line weights, coordinated layers, and meticulous detailing.</p>
                      </div>
                    </li>
                    <li>
                      <Building2 size={18} className="careers-aside-icon" aria-hidden="true" />
                      <div>
                        <strong>Site Curiosity</strong>
                        <p>Architecture doesn't live on screens. We celebrate candidates who love being on active construction sites.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="careers-aside-card careers-aside-card--contact">
                  <h4>Direct Studio Enquiries</h4>
                  <p>
                    For academic internships, research collaborations, or speculative portfolios:
                  </p>
                  <a href="mailto:naresh@s4eaindia.com" className="careers-aside-email">
                    naresh@s4eaindia.com
                  </a>
                  <span className="careers-aside-loc">Corporate Office: Hyderabad, Telangana</span>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </SeaProjectShell>
  );
}
