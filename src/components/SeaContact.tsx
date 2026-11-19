import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SeaProjectShell from "@/components/SeaProjectShell";
import ContactLocations from "@/components/ContactLocations";
import { BUDGETS, PROJECT_TYPES, STUDIO_CONTACT, enquirySchema, enquiryEmail } from "@/lib/contact";

export default function SeaContact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftUrl, setDraftUrl] = useState<string>();
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
  return <SeaProjectShell><main className="sea-contact">
    <section className="contact-opening" aria-labelledby="contact-heading">
      <div className="contact-copy">
        <span className="contact-kicker">CONTACT SEA</span>
        <h1 id="contact-heading">Let’s Create<br />Something<br />Extraordinary<span>.</span></h1>
        <p className="contact-intro">Every meaningful space begins with a conversation. Tell us what you imagine — we’d love to explore it with you.</p>
        <dl className="contact-details">
          <div><MapPin aria-hidden="true" /><div><dt>Office Address</dt><dd>{STUDIO_CONTACT.city}</dd></div></div>
          <div><Mail aria-hidden="true" /><div><dt>Email Address</dt><dd><a href={`mailto:${STUDIO_CONTACT.email}`}>{STUDIO_CONTACT.email}</a></dd></div></div>
          <div><Phone aria-hidden="true" /><div><dt>Phone Number</dt><dd><a href="tel:+919000299600">{STUDIO_CONTACT.phone}</a></dd></div></div>
          <div><Clock aria-hidden="true" /><div><dt>Working Hours</dt><dd>Contact us to arrange a visit.</dd></div></div>
        </dl>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <h2>Tell us about your project<span>.</span></h2>
        <div className="contact-fields">
          {[
            { name: "name", label: "Full Name", type: "text", autocomplete: "name", max: 100 },
            { name: "email", label: "Email Address", type: "email", autocomplete: "email", max: 255 },
            { name: "phone", label: "Phone Number", type: "tel", autocomplete: "tel", max: 20 },
            { name: "location", label: "Project Location", type: "text", autocomplete: "off", max: 150 },
          ].map(field => <div className="contact-field" key={field.name}><label htmlFor={`contact-${field.name}`}>{field.label}</label><Input id={`contact-${field.name}`} name={field.name} type={field.type} autoComplete={field.autocomplete} maxLength={field.max} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} />{errors[field.name] && <p id={`error-${field.name}`} className="contact-error">{errors[field.name]}</p>}</div>)}
          <div className="contact-field"><label htmlFor="contact-type">Project Type</label><select id="contact-type" name="type" defaultValue="" required aria-invalid={Boolean(errors['type'])}><option value="" disabled>Select project type</option>{PROJECT_TYPES.map(type => <option key={type}>{type}</option>)}</select>{errors['type'] && <p className="contact-error">Select a project type.</p>}</div>
          <div className="contact-field"><label htmlFor="contact-budget">Estimated Budget</label><select id="contact-budget" name="budget" defaultValue="To be discussed">{BUDGETS.map(budget => <option key={budget}>{budget}</option>)}</select></div>
          <div className="contact-field contact-field-wide"><label htmlFor="contact-message">Message / Project Details</label><Textarea id="contact-message" name="message" rows={4} maxLength={2000} required aria-invalid={Boolean(errors['message'])} aria-describedby={errors['message'] ? "error-message" : undefined} />{errors['message'] && <p id="error-message" className="contact-error">{errors['message']}</p>}</div>
        </div>
        <Button type="submit" className="contact-submit">Submit Enquiry<ArrowUpRight size={20} /></Button>
        <p className="contact-form-note">Opens your email app with your enquiry ready to send.</p>
        {draftUrl && <div className="contact-feedback" role="status">Your enquiry draft is ready. Send it from your email app to reach SEA. <a href={draftUrl}>Open email draft<ArrowUpRight size={16} /></a></div>}
      </form>
    </section>
    <ContactLocations />
  </main></SeaProjectShell>;
}