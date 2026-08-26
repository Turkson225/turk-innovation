import { FormEvent, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileUp,
  Link as LinkIcon,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const openRoles = [
  {
    title: "Embedded Systems Collaborator",
    location: "Ghana / Hybrid",
    type: "Project-based",
    department: "Embedded",
  },
  {
    title: "Robotics & Autonomy Builder",
    location: "Ghana / Hybrid",
    type: "Project-based",
    department: "Robotics",
  },
  {
    title: "AI + IoT Developer",
    location: "Remote / Ghana",
    type: "Part-time",
    department: "Intelligence",
  },
  {
    title: "Product & Design Collaborator",
    location: "Remote",
    type: "Project-based",
    department: "Product",
  },
];

const perks = [
  "Build with real hardware",
  "Work across disciplines",
  "Learn by shipping",
  "Contribute from Ghana",
  "See your work in the field",
  "Grow with the mission",
];

const applicationSteps = [
  {
    icon: FileUp,
    title: "Upload CV",
    copy: "Applicants send a PDF, DOC, or DOCX file directly through the form.",
  },
  {
    icon: ClipboardCheck,
    title: "Review fit",
    copy: "We look for practical skill, curiosity, reliability, and evidence of building.",
  },
  {
    icon: ShieldCheck,
    title: "Private handling",
    copy: "The form is designed to send CV data to the private careers endpoint, not display it publicly.",
  },
];

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Could not read the resume file."));
    reader.readAsDataURL(file);
  });
}

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  const chooseRole = (role: string) => {
    trackEvent("career_application_start", { role });
    setSelectedRole(role);
    setSubmitState({ type: "idle", message: "" });
    window.setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleResumeChange = (file: File | undefined) => {
    if (!file) {
      setResumeFile(null);
      return;
    }

    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      trackEvent("resume_rejected", { reason: "type", file_type: file.type || "unknown" });
      setResumeFile(null);
      setSubmitState({
        type: "error",
        message: "Please upload your resume as a PDF, DOC, or DOCX file.",
      });
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      trackEvent("resume_rejected", { reason: "size", file_size_kb: Math.round(file.size / 1024) });
      setResumeFile(null);
      setSubmitState({
        type: "error",
        message: "Your resume must be 5 MB or smaller.",
      });
      return;
    }

    trackEvent("resume_selected", {
      file_type: file.type,
      file_size_kb: Math.round(file.size / 1024),
    });
    setResumeFile(file);
    setSubmitState({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_CAREERS_APPS_SCRIPT_URL;

    if (!endpoint) {
      trackEvent("career_application_error", { reason: "missing_endpoint" });
      setSubmitState({
        type: "error",
        message:
          "The application form is ready, but the Gmail notification endpoint still needs to be connected.",
      });
      return;
    }

    if (!resumeFile) {
      trackEvent("career_application_error", { reason: "missing_resume" });
      setSubmitState({
        type: "error",
        message: "Please upload your resume before sending the application.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();

    formData.forEach((value, key) => {
      if (!(value instanceof File)) {
        payload.set(key, String(value));
      }
    });

    try {
      trackEvent("career_application_submit", {
        role: selectedRole,
        has_resume: true,
      });
      payload.set("submittedAt", new Date().toISOString());
      payload.set("sourcePage", window.location.href);
      payload.set("resumeFileName", resumeFile.name);
      payload.set("resumeMimeType", resumeFile.type);
      payload.set("resumeSizeBytes", String(resumeFile.size));
      payload.set("resumeBase64", await fileToBase64(resumeFile));

      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      trackEvent("resume_upload", {
        role: selectedRole,
        file_type: resumeFile.type,
        file_size_kb: Math.round(resumeFile.size / 1024),
      });
      trackEvent("career_application_success", { role: selectedRole });
      setSubmitState({
        type: "success",
        message:
          "Application received. Thank you — your CV and details have been sent for review.",
      });
      form.reset();
      setSelectedRole("");
      setResumeFile(null);
    } catch {
      trackEvent("career_application_error", { reason: "fetch_failed" });
      setSubmitState({
        type: "error",
        message:
          "We could not send the application. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">
              <Sparkles size={14} />
              Careers / build what matters
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-4 mb-6">
              Bring your curiosity.
              <br />
              <span className="text-gradient">Build the future.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              We are growing a hands-on community around electronics, AI, IoT,
              robotics, drones, and automation. If you like turning difficult
              problems into working systems, there is a place for you here.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mb-16">
              {perks.map((perk) => (
                <div
                  key={perk}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Zap size={12} className="text-primary shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ opportunities</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-12">
              Find your build lane.
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {openRoles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 60}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-2xl border border-border bg-background hover:glow-border transition-all duration-300 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {role.type}
                      </span>
                      <span className="mono text-[10px]">{role.department}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    data-track="career_role_apply"
                    data-track-label={role.title}
                    onClick={() => chooseRole(role.title)}
                  >
                    Apply <ArrowRight size={14} />
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ how applications work</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-12">
              Apply with your CV, not just a link.
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-5">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.title} delay={index * 80}>
                  <article className="rounded-2xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-primary mb-7" />
                    <h3 className="text-xl font-display font-extrabold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.copy}</p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="application-form" className="section-padding bg-card border-t border-border">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
          <AnimatedSection>
            <p className="eyebrow">/ application signal</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-5">
              Tell us what you can build.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Submit your details, upload your CV, and add a short note about
              the problems you enjoy solving. Your application is designed to be
              forwarded to the private Turk Innovation careers inbox and file
              archive.
            </p>
            <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
              <LinkIcon size={16} className="text-primary mt-0.5 shrink-0" />
              <span>
                Add a Google Drive, GitHub, LinkedIn, or portfolio link if you
                have one. The CV upload is still required.
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-background p-6 md:p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.08)]"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <label className="form-field">
                  <span>Full name *</span>
                  <input name="fullName" required placeholder="Your name" />
                </label>
                <label className="form-field">
                  <span>Email address *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
                <label className="form-field">
                  <span>Phone / WhatsApp</span>
                  <input name="phone" placeholder="+233 ..." />
                </label>
                <label className="form-field">
                  <span>Position *</span>
                  <select
                    name="role"
                    required
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    <option value="">Select a position</option>
                    {openRoles.map((role) => (
                      <option key={role.title} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                    <option value="General collaboration">General collaboration</option>
                  </select>
                </label>
              </div>

              <label className="form-field mt-5">
                <span>Portfolio / GitHub / LinkedIn link</span>
                <input
                  name="portfolio"
                  type="url"
                  placeholder="https://..."
                />
              </label>

              <label className="form-field mt-5">
                <span>Upload CV / resume *</span>
                <input
                  name="resumeFile"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => handleResumeChange(event.target.files?.[0])}
                />
                <small className="mt-2 block text-xs text-muted-foreground">
                  PDF, DOC, or DOCX · maximum 5 MB
                  {resumeFile ? ` · Selected: ${resumeFile.name}` : ""}
                </small>
              </label>

              <label className="form-field mt-5">
                <span>Why would you like to join? *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you are excited to build..."
                />
              </label>

              <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-0.5 accent-[hsl(var(--primary))]"
                />
                <span>
                  I agree that Turk Innovation may use these details and my CV
                  to review my application and contact me about this opportunity.
                </span>
              </label>

              {submitState.type !== "idle" && (
                <div
                  className={`form-notice ${submitState.type}`}
                  role="status"
                >
                  {submitState.type === "success" ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <Zap size={17} />
                  )}
                  <span>{submitState.message}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                data-track="career_application_submit_button"
                className="mt-6 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending application..." : "Send application"}
                <Send size={16} />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
