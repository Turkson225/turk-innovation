import { FormEvent, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  MapPin,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

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

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  const chooseRole = (role: string) => {
    setSelectedRole(role);
    setSubmitState({ type: "idle", message: "" });
    window.setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_CAREERS_APPS_SCRIPT_URL;

    if (!endpoint) {
      setSubmitState({
        type: "error",
        message:
          "The application form is ready, but the Gmail notification endpoint still needs to be connected.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();

    formData.forEach((value, key) => {
      payload.set(key, String(value));
    });

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      setSubmitState({
        type: "success",
        message:
          "Application received. Thank you — we will review your details and get back to you.",
      });
      form.reset();
      setSelectedRole("");
    } catch {
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

      <section id="application-form" className="section-padding">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
          <AnimatedSection>
            <p className="eyebrow">/ application signal</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-5">
              Tell us what you can build.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Submit your details and a short note about the problems you enjoy
              solving. Your application will be forwarded to the Turk Innovation
              careers inbox once the notification connection is active.
            </p>
            <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
              <LinkIcon size={16} className="text-primary mt-0.5 shrink-0" />
              <span>
                Add a Google Drive, GitHub, LinkedIn, or portfolio link so we can
                see your work.
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.08)]"
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
                <span>CV / resume link</span>
                <input
                  name="resumeUrl"
                  type="url"
                  placeholder="Paste a shareable Google Drive link"
                />
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
