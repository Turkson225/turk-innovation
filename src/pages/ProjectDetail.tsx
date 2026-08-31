import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/content";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, FlaskConical, Layers3, ShieldAlert, Target, Wrench } from "lucide-react";

const projectVisuals: Record<string, string> = {
  smartguard: `${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`,
  "smart-power": `${import.meta.env.BASE_URL}evidence/operations-command-center.jpg`,
  "gassafe-iot": `${import.meta.env.BASE_URL}evidence/gassafe-internal-layout.jpg`,
  "escort-bot": `${import.meta.env.BASE_URL}evidence/robotics-ugv-field.jpg`,
  "drone-systems": `${import.meta.env.BASE_URL}evidence/fixed-wing-drone-prototype.jpg`,
  "iot-relay-control": `${import.meta.env.BASE_URL}evidence/energy-panel-dashboard.jpg`,
  "embedded-systems-lab": `${import.meta.env.BASE_URL}evidence/electronics-kit-layout.jpg`,
};

const caseStudyDepth: Record<string, {
  users: string[];
  useCases: string[];
  validation: string[];
  nextSteps: string[];
  investorSignal: string;
}> = {
  smartguard: {
    users: ["Homes", "small offices", "student hostels", "shops"],
    useCases: ["Unknown-face alerting", "remote appliance control", "GSM fallback", "cloud evidence logging"],
    validation: ["Repeat face detection under different lighting", "measure alert delay across weak and strong networks", "test manual fallback after Wi-Fi loss"],
    nextSteps: ["Package the two nodes into safer enclosures", "add a private evidence dashboard", "run a controlled pilot with real users"],
    investorSignal: "SmartGuard can become a local-first safety product line if the next pilots prove reliability, setup simplicity, and low false alerts.",
  },
  "smart-power": {
    users: ["workshops", "labs", "small facilities", "technical schools"],
    useCases: ["load visibility", "relay control", "energy awareness", "fault investigation"],
    validation: ["calibrate each sensing channel", "test relay isolation and enclosure safety", "compare readings with trusted meters"],
    nextSteps: ["add event logs", "add configurable protection thresholds", "design a safer production enclosure"],
    investorSignal: "The system has training, facility-monitoring, and maintenance value once electrical safety and calibration are tightened.",
  },
  "gassafe-iot": {
    users: ["households", "food vendors", "hostels", "small kitchens"],
    useCases: ["gas leak alert", "automatic shutoff", "offline local response", "multi-recipient notification"],
    validation: ["calibrate gas threshold behaviour", "test shutoff response time", "validate enclosure and sensor placement"],
    nextSteps: ["move from prototype sensor to certified sensing path", "add installation guide", "run controlled safety tests"],
    investorSignal: "GasSafe is strongest as a safety appliance concept, but it needs certified sensing, compliance review, and controlled pilots before product claims.",
  },
  "escort-bot": {
    users: ["drone recovery teams", "warehouses", "campus operations", "field technicians"],
    useCases: ["equipment transport", "manual remote operation", "obstacle alerting", "load-triggered routing"],
    validation: ["measure payload capacity", "test gravel and uneven routes", "validate emergency stop distance"],
    nextSteps: ["stabilize the base platform", "test line-following and IMU correction", "prepare a recovery-route pilot"],
    investorSignal: "Escort-Bot connects robotics to a real logistics workflow, which makes it valuable for pilots even before full autonomy.",
  },
  "drone-systems": {
    users: ["drone operators", "recovery teams", "logistics teams", "inspection teams"],
    useCases: ["autonomous operations support", "recovery workflow improvement", "telemetry awareness", "field troubleshooting"],
    validation: ["connect recovery data to design decisions", "test controller reliability", "define safety procedures for ground support"],
    nextSteps: ["document recovery workflow metrics", "prototype support tools", "connect UGV work to drone recovery operations"],
    investorSignal: "The drone systems work gives Turk Innovation field credibility and a path into support tools around autonomous logistics.",
  },
  "iot-relay-control": {
    users: ["homes", "labs", "training programs", "small automation setups"],
    useCases: ["remote switching", "dashboard control", "state feedback", "appliance automation demos"],
    validation: ["test command latency", "harden authentication", "add local fallback"],
    nextSteps: ["add scheduling", "add role-based access", "package as a training and prototyping kit"],
    investorSignal: "This is a reusable building block for education, smart-home experiments, and future connected-control products.",
  },
  "embedded-systems-lab": {
    users: ["students", "early engineers", "robotics clubs", "technical programs"],
    useCases: ["weekend training", "project build camps", "portfolio development", "hardware troubleshooting"],
    validation: ["measure signups and completion", "collect student outcomes", "turn lessons into repeatable modules"],
    nextSteps: ["publish curriculum tracks", "collect applicant interest", "run a first cohort with documented projects"],
    investorSignal: "The lab can create both revenue and talent pipeline while strengthening the builder community around Turk Innovation.",
  },
};

const smartGuardPilot = {
  target: "Homes, small offices, student hostels, and shops",
  environment:
    "An indoor site with local power, Wi-Fi, and GSM coverage where the safety workflow can be observed without exposing production-critical operations.",
  pathway: [
    "Review the site, risk, and existing response workflow",
    "Install and baseline the security and automation nodes",
    "Run controlled detection, alert, relay, and fallback scenarios",
    "Review the evidence with the operator and agree the next hardening cycle",
  ],
  limitations:
    "SmartGuard remains a prototype. Enclosure hardening, power protection, calibration, false-alert testing, privacy review, and independent safety validation are still required before production use.",
};

const smartGuardMedia = [
  {
    kind: "image",
    label: "System view",
    title: "SmartGuard dashboard",
    src: `${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`,
    alt: "SmartGuard dashboard showing security status and intrusion events",
  },
  {
    kind: "video",
    label: "Bench integration",
    title: "Security-node test",
    src: `${import.meta.env.BASE_URL}evidence/videos/smartguard-bench-test.mp4`,
    poster: `${import.meta.env.BASE_URL}evidence/videos/smartguard-bench-test-poster.jpg`,
    alt: "SmartGuard security node bench integration test",
  },
  {
    kind: "image",
    label: "Perception + alerts",
    title: "GSM security node",
    src: `${import.meta.env.BASE_URL}evidence/gsm-security-node.jpg`,
    alt: "SmartGuard security node with camera, GSM module, display, and control electronics",
  },
  {
    kind: "image",
    label: "Control layer",
    title: "Automation enclosure",
    src: `${import.meta.env.BASE_URL}evidence/smart-control-face.jpg`,
    alt: "SmartGuard automation control enclosure with display, keypad, and status indicators",
  },
] as const;

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <main className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-display font-bold">Project not found</h1>
        <Link to="/projects" className="text-primary mt-4 inline-block">Back to Projects</Link>
      </main>
    );
  }

  const statusLabel = project.id === "smartguard"
    ? "Under validation"
    : project.status === "completed"
      ? "Working prototype"
      : project.status === "ongoing"
        ? "In active development"
        : "Exploration";
  const depth = caseStudyDepth[project.id];
  const visual = projectVisuals[project.id] || projectVisuals.smartguard;

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={14} /> All projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="mono text-[11px] px-2 py-1 rounded-md bg-primary/10 border border-primary/20">{statusLabel}</span>
              {project.id === "smartguard" && <span className="mono text-[11px] px-2 py-1 rounded-md bg-secondary/10 border border-secondary/25 text-secondary">Flagship system</span>}
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded border border-border">{tag}</span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 max-w-5xl">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{project.longDescription}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <AnimatedSection>
            <div className="relative min-h-[24rem] rounded-3xl overflow-hidden border border-primary/20 bg-muted p-8 flex items-end">
              <img src={visual} alt={`${project.title} project visual`} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/28 to-transparent" />
              <div className="absolute inset-8 rounded-2xl border border-white/25" />
              <div className="relative z-10">
                <p className="mono mb-3">Case study / {project.id}</p>
                <p className="text-3xl md:text-5xl font-display font-extrabold max-w-xl">{project.title}</p>
                <p className="text-sm text-muted-foreground mt-5 max-w-lg">
                  This case study shows the problem, current system design,
                  observed evidence, validation gaps, and next build milestones.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-border bg-card p-7 h-full">
              <p className="mono mb-6">Build status</p>
              <div className="flex items-center gap-3 mb-6">
                {project.status === "completed" ? (
                  <CheckCircle2 className="text-primary" size={22} />
                ) : project.status === "ongoing" ? (
                  <Layers3 className="text-primary" size={22} />
                ) : (
                  <FlaskConical className="text-primary" size={22} />
                )}
                <span className="font-display font-bold">{statusLabel}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This page separates observed results from future product goals.
                It is a working portfolio record, not a guarantee of commercial
                performance.
              </p>
              <div className="mt-7 pt-6 border-t border-border flex items-start gap-3 text-xs text-muted-foreground">
                <ShieldAlert size={15} className="text-primary mt-0.5 shrink-0" />
                Safety-critical deployments require independent engineering
                review, testing, and compliance.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "The problem", content: project.problem },
            { title: "The system", content: project.solution },
            { title: "Observed impact", content: project.impact },
          ].map((block, i) => (
            <AnimatedSection key={block.title} delay={i * 100}>
              <span className="mono mb-3 block">{block.title}</span>
              <p className="text-muted-foreground leading-relaxed">{block.content}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><span className="mono mb-8 block">Evidence snapshot</span></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {project.metrics.map((metric, i) => (
              <AnimatedSection key={metric.label} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-border bg-card min-h-[8rem]">
                  <div className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-2">{metric.value}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{metric.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {project.id === "smartguard" && (
        <>
          <section className="section-padding bg-card border-t border-border">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection>
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">/ first pilot</p>
                    <h2>From prototype validation to a controlled deployment.</h2>
                  </div>
                  <p className="section-side-note">
                    A product becomes real in the field.
                  </p>
                </div>
              </AnimatedSection>

              <div className="mt-12 grid gap-5 lg:grid-cols-2">
                <AnimatedSection>
                  <article className="h-full rounded-2xl border border-border bg-background p-7">
                    <p className="mono mb-5">Target users</p>
                    <p className="text-lg leading-relaxed text-foreground">{smartGuardPilot.target}</p>
                    <div className="mt-8 border-t border-border pt-6">
                      <p className="mono mb-3">Operating environment</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{smartGuardPilot.environment}</p>
                    </div>
                  </article>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  <article className="h-full rounded-2xl border border-primary/25 bg-primary/5 p-7">
                    <p className="mono mb-5">Pilot pathway</p>
                    <ol className="space-y-4">
                      {smartGuardPilot.pathway.map((step, index) => (
                        <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                          <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={150}>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6 text-sm leading-relaxed text-muted-foreground">
                  <ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber-500" />
                  <p><span className="font-semibold text-foreground">Current limitations:</span> {smartGuardPilot.limitations}</p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section className="section-padding border-t border-border">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection>
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">/ build record</p>
                    <h2>Evidence from the current SmartGuard build.</h2>
                  </div>
                  <p className="section-side-note">
                    What exists now.
                  </p>
                </div>
              </AnimatedSection>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {smartGuardMedia.map((media, index) => (
                  <AnimatedSection key={media.title} delay={index * 70}>
                    <article className="overflow-hidden rounded-2xl border border-border bg-card">
                      <div className="aspect-video overflow-hidden bg-muted">
                        {media.kind === "video" ? (
                          <video
                            src={media.src}
                            poster={media.poster}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            aria-label={media.alt}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img src={media.src} alt={media.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                        )}
                      </div>
                      <div className="p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">{media.label}</p>
                        <h3 className="mt-2 font-display text-lg font-bold">{media.title}</h3>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {[
            { title: "Who it serves", icon: Target, items: depth.users },
            { title: "Use cases", icon: Wrench, items: depth.useCases },
            { title: "Next validation", icon: CheckCircle2, items: depth.validation },
          ].map((block, index) => {
            const Icon = block.icon;
            return (
              <AnimatedSection key={block.title} delay={index * 90}>
                <article className="rounded-2xl border border-border bg-background p-7 h-full">
                  <Icon size={20} className="text-primary mb-7" />
                  <p className="mono mb-5">{block.title}</p>
                  <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-6">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card p-7 h-full">
              <p className="mono mb-4">Investor signal</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {depth.investorSignal}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-7 h-full">
              <p className="mono mb-4">Next build milestones</p>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-7">
                {depth.nextSteps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {project.id === "smartguard" ? (
                  <Link to="/contact?inquiry=SmartGuard%20pilot" data-track="smartguard_pilot_request">
                    <Button variant="hero" size="default">Request a SmartGuard pilot <ArrowRight size={16} /></Button>
                  </Link>
                ) : (
                  <Link to="/contact" data-track="case_study_contact" data-track-label={project.title}>
                    <Button variant="hero" size="default">Start a project conversation <ArrowRight size={16} /></Button>
                  </Link>
                )}
                {project.id === "smartguard" && (
                  <Link to="/investors/deck" data-track="smartguard_deck_request">
                    <Button variant="hero-outline" size="default">Request investor deck <ArrowRight size={16} /></Button>
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
