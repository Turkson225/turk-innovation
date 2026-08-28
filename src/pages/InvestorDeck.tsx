import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { companyProfile } from "@/data/content";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const pitchPoints = [
  {
    icon: ShieldCheck,
    number: "01",
    label: "Problem",
    title: "The edge is where reliability matters most.",
    copy:
      "Homes, facilities, and field teams need systems that can sense a change, make a clear first decision, and keep working when connectivity is imperfect.",
  },
  {
    icon: Target,
    number: "02",
    label: "Market entry",
    title: "Start with safety and visibility.",
    copy:
      "SmartGuard, GasSafe, and Smart Power Systems create focused entry points across security, gas safety, electrical monitoring, and connected control.",
  },
  {
    icon: Rocket,
    number: "03",
    label: "Platform",
    title: "One build engine, many physical products.",
    copy:
      "The shared capability is the stack: sensors, firmware, communications, dashboards, controls, and field validation that can be reused across product lines.",
  },
  {
    icon: FileText,
    number: "04",
    label: "Traction",
    title: "The evidence is already on the bench.",
    copy:
      "Working prototypes, live dashboards, enclosure builds, field robotics, and observed test results give the next stage something real to harden.",
  },
];

const evidence = [
  ["7+", "working systems and product directions"],
  ["2-5 s", "observed SmartGuard relay response"],
  ["~1 m", "observed HuskyLens detection range"],
  ["3", "focused commercial directions"],
];

const askItems = [
  "Prototype hardening, safer enclosures, calibration, and repeatable testing",
  "Controlled pilot environments with real users and operating feedback",
  "Technical, manufacturing, distribution, and research collaboration",
  "Patient capital aligned with evidence-led product development",
];

const investorSnapshot = [
  ["Company stage", "Prototype validation"],
  ["Flagship wedge", "SmartGuard / local-first security"],
  ["Current traction", "Working prototypes and observed bench results"],
  ["External adoption", "Not claimed on this public site"],
  ["Capital focus", "Hardening, controlled pilots, safety, and compliance"],
  ["Funding target", "Defined with the pilot scope"],
];

const riskItems = [
  "Perception calibration and false-alert behaviour",
  "Enclosure, electrical, and power-protection safety",
  "Network and power variability in real operating environments",
  "Pilot repeatability, installation effort, and support model",
];

type RequestForm = {
  name: string;
  email: string;
  organization: string;
  interest: string;
};

const initialForm: RequestForm = {
  name: "",
  email: "",
  organization: "",
  interest: "Investor deck",
};

export default function InvestorDeck() {
  const [form, setForm] = useState<RequestForm>(initialForm);
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = "Investor deck request - Turk Innovation";
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organization: ${form.organization || "Not provided"}`,
      `Interest: ${form.interest}`,
      "",
      "Please send the current Turk Innovation investor deck and evidence pack.",
    ].join("\n");

    trackEvent("investor_deck_request", {
      method: "email",
      interest: form.interest,
    });
    setRequestSent(true);
    window.location.href = `mailto:${companyProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-end">
          <AnimatedSection>
            <Link to="/investors" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft size={14} /> Investor hub
            </Link>
            <p className="eyebrow"><Sparkles size={14} /> Investor deck / current thesis</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-display font-extrabold md:text-6xl lg:text-7xl">
              Build the platform behind <span className="text-gradient">useful intelligence.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A concise view of the problem, the flagship product, the evidence,
              and the partners needed to move Turk Innovation from working
              prototypes to field-ready products.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#request" data-track="deck_request_jump">
                <Button variant="hero" size="xl">Request the deck <ArrowRight size={18} /></Button>
              </a>
              <Link to="/contact?inquiry=SmartGuard%20pilot" data-track="deck_pilot_conversation" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                Discuss a pilot <ArrowRight size={16} />
              </Link>
              <Link to="/projects/smartguard" data-track="deck_smartguard_case_study" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                Read SmartGuard <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <p className="mono mb-6">Readout / Turk Innovation</p>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-primary" />
                  <div><span className="block text-muted-foreground">Built from</span><strong>{companyProfile.headquarters}</strong></div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-primary" />
                  <div><span className="block text-muted-foreground">Flagship product</span><strong>SmartGuard / local-first security</strong></div>
                </div>
                <div className="flex items-start gap-3">
                  <Rocket size={17} className="mt-0.5 shrink-0 text-primary" />
                  <div><span className="block text-muted-foreground">Current stage</span><strong>Prototype validation and pilot preparation</strong></div>
                </div>
              </div>
              <div className="mt-7 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
                This page describes the current build thesis. It does not present
                unverified revenue, customer counts, or deployment claims.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">/ investor room</p>
                <h2>The current state, clearly labelled.</h2>
              </div>
              <p className="section-side-note">
                This public room is evidence-led. Financials, round terms,
                ownership structure, and partner data are shared directly when
                they are ready to be shared.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {investorSnapshot.map(([label, value]) => (
              <AnimatedSection key={label}>
                <article className="h-full bg-background p-6">
                  <p className="mono text-muted-foreground">{label}</p>
                  <p className="mt-4 text-lg font-display font-bold leading-tight">{value}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ the short pitch</p>
            <h2 className="mt-3 max-w-3xl">A clear wedge into the physical world.</h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {pitchPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <AnimatedSection key={point.number} delay={index * 80}>
                  <article className="h-full rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40">
                    <div className="flex items-center justify-between">
                      <Icon size={22} className="text-primary" />
                      <span className="mono">{point.number}</span>
                    </div>
                    <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{point.label}</p>
                    <h3 className="mt-3 text-2xl font-display font-extrabold leading-tight">{point.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{point.copy}</p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-[2rem] border border-primary/25 bg-[#0F172A] text-white">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[28rem] overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`} alt="SmartGuard dashboard with security monitoring and intrusion event feed" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#38BDF8]">Product / 01</p>
                <p className="mt-3 text-4xl font-display font-extrabold">SmartGuard</p>
              </div>
            </div>
            <div className="p-7 md:p-10 lg:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#38BDF8]">The flagship</p>
              <h2 className="mt-5 text-3xl font-display font-extrabold leading-tight text-white md:text-5xl">
                A safety system designed to keep the first response local.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-white/70">
                SmartGuard is the clearest expression of the company thesis:
                connect perception, edge logic, communications, and control so a
                safety event becomes a response, not just a notification.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["AI vision and presence detection", "GSM SMS and call fallback", "Firebase evidence and dashboards", "Alarm and appliance relay control"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-white/75">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#38BDF8]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-9 grid grid-cols-3 border-y border-white/10 py-5">
                {evidence.slice(1, 4).map(([value, label], index) => (
                  <div key={label} className={index > 0 ? "border-l border-white/10 pl-4" : ""}>
                    <strong className="block text-xl font-display text-[#38BDF8]">{value}</strong>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-white/50">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/projects/smartguard" data-track="deck_flagship_case_study" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#38BDF8]">
                Open the full case study <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <AnimatedSection>
            <p className="eyebrow">/ evidence and ask</p>
            <h2 className="mt-3">Funding should unlock proof.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              The immediate opportunity is disciplined progress: harden the
              strongest systems, test them with the right partners, and publish
              evidence that makes the next decision easier.
            </p>
          </AnimatedSection>
          <div>
            <div className="grid grid-cols-2 border-y border-border">
              {evidence.map(([value, label], index) => (
                <div key={label} className={`py-5 ${index % 2 === 1 ? "border-l border-border pl-5" : ""} ${index > 1 ? "border-t border-border" : ""}`}>
                  <strong className="block text-2xl font-display text-primary">{value}</strong>
                  <span className="mt-1 block max-w-[12rem] font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-background p-7">
              <p className="mono mb-5">What we are looking for</p>
              <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {askItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <AnimatedSection>
            <p className="eyebrow">/ risk register</p>
            <h2 className="mt-3">The hard questions are part of the pitch.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Progress is not only a feature list. These are the constraints
              the next validation cycle must answer.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-2xl border border-border bg-card p-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {riskItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <ShieldCheck size={17} className="mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="request" className="section-padding border-t border-border">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <AnimatedSection>
            <p className="eyebrow"><Mail size={14} /> / request the current deck</p>
            <h2 className="mt-3">Start with the evidence.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Tell us where you fit in the build. Your email app will open with
              a prepared request addressed to {companyProfile.email}.
            </p>
            <a href={`mailto:${companyProfile.email}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
              {companyProfile.email} <ArrowRight size={15} />
            </a>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-7 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field"><span>Name</span><input required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" autoComplete="name" /></label>
                <label className="form-field"><span>Email</span><input required type="email" maxLength={255} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" autoComplete="email" /></label>
              </div>
              <label className="form-field mt-5"><span>Organization</span><input maxLength={120} value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} placeholder="Company or fund (optional)" autoComplete="organization" /></label>
              <label className="form-field mt-5"><span>Conversation</span><select value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}><option>Investor deck</option><option>Strategic partnership</option><option>Pilot environment</option><option>Technical collaboration</option></select></label>
              <Button variant="hero" size="lg" className="mt-7 w-full" type="submit">Prepare request email <ArrowRight size={16} /></Button>
              {requestSent && <p className="form-notice success">Your request is prepared. Complete the email in your mail app to send it.</p>}
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
