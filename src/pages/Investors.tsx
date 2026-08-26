import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Handshake, LineChart, MapPin, Rocket, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";

const pillars = [
  {
    title: "Intelligent safety & automation",
    copy: "SmartGuard, GasSafe IoT, and relay-control systems address security, safety, and automation needs where local response matters.",
    accent: "01",
  },
  {
    title: "Energy & connected infrastructure",
    copy: "Power monitoring and control products make electrical behaviour visible for homes, labs, workshops, and small facilities.",
    accent: "02",
  },
  {
    title: "Robotics & autonomous operations",
    copy: "Escort-Bot, UGV concepts, and drone operations work connect robotics to logistics, recovery, field support, and training.",
    accent: "03",
  },
];

const investorMetrics = [
  ["7+", "systems in portfolio"],
  ["3", "commercial pillars"],
  ["2-5 s", "observed relay response"],
  ["1 m", "observed AI detection range"],
];

const marketLogic = [
  "Africa needs more practical technology built around local power, safety, connectivity, and maintenance realities.",
  "Many homes, schools, workshops, and small businesses need affordable systems that can work locally before depending on the cloud.",
  "The strongest opportunity is not one prototype. It is a repeatable build engine for intelligent physical-world products.",
];

const capitalUse = [
  {
    icon: ShieldCheck,
    title: "Prototype hardening",
    copy: "Better enclosures, safer wiring, calibration, documentation, and repeatable testing for the strongest systems.",
  },
  {
    icon: Target,
    title: "Pilot programs",
    copy: "Controlled tests with homes, labs, small facilities, training cohorts, and operational partners.",
  },
  {
    icon: FileText,
    title: "Evidence pack",
    copy: "Demo videos, measured performance, bill of materials, risk notes, and pitch materials for each serious product line.",
  },
  {
    icon: Rocket,
    title: "Launch readiness",
    copy: "Brand, support process, installation guides, partner pipeline, and early commercial experiments.",
  },
];

const roadmap = [
  ["Now", "Document and validate the strongest working prototypes with repeatable tests."],
  ["Pilot", "Run focused pilots with partners who can provide real users, environments, and feedback."],
  ["Product", "Turn the highest-signal systems into maintainable products, training offers, and deployment partnerships."],
  ["Scale", "Build a trusted African technology company around safety, infrastructure, robotics, and technical talent."],
];

export default function Investors() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <AnimatedSection>
            <p className="eyebrow"><Sparkles size={14} /> Investors / strategic partners</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-4 mb-6">
              Back the builders of <span className="text-gradient">useful intelligence.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Turk Innovation is building from Ghana at the intersection of
              embedded systems, connected infrastructure, robotics, and
              autonomous operations. The opportunity starts with real problems,
              working prototypes, and the partners willing to help test them in
              the field.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link to="/contact" data-track="investor_request_deck">
                <Button variant="hero" size="xl">Request investor deck <ArrowRight size={18} /></Button>
              </Link>
              <a href="#roadmap" data-track="investor_roadmap_jump" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
                See the roadmap
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <p className="mono mb-5">Investor readout / 01</p>
              <div className="grid grid-cols-2 gap-4 mb-7">
                {investorMetrics.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-border bg-background p-4">
                    <strong className="block text-2xl font-display text-primary">{value}</strong>
                    <span className="mt-1 block text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 text-sm">
                {[
                  "Ghana-based engineering perspective",
                  "Working prototypes across multiple real-world domains",
                  "Clear path from prototype validation to focused pilots",
                  "Open to strategic partners, collaborators, and patient capital",
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 pt-6 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
                <MapPin size={15} className="text-primary" /> Building from Ghana · Thinking globally
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ the opportunity</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-5">
              A focused platform for physical-world technology.
            </h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed mb-14">
              We are not presenting unverified revenue, customer counts, or
              deployment claims. The current advantage is practical: the ability
              to move from a circuit and a field observation to a connected
              system, document what happened, and improve it.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((pillar, index) => (
              <AnimatedSection key={pillar.title} delay={index * 80}>
                <article className="rounded-2xl border border-border bg-background p-7 h-full hover:border-primary/40 transition-colors">
                  <span className="mono">{pillar.accent}</span>
                  <h3 className="text-2xl font-display font-extrabold mt-12 mb-4">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.copy}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <AnimatedSection>
            <p className="eyebrow">/ market logic</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-5">
              Why this can matter.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The company is still early, so the investor story should be
              honest: prove the strongest wedge, then scale the system-building
              capability around it.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {marketLogic.map((point, index) => (
              <AnimatedSection key={point} delay={index * 80}>
                <div className="rounded-2xl border border-border bg-card p-6 flex gap-4">
                  <LineChart size={20} className="text-primary shrink-0 mt-1" />
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ use of capital</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-14">
              Funding should unlock evidence.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {capitalUse.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 80}>
                  <article className="h-full rounded-2xl border border-border bg-background p-6">
                    <Icon size={22} className="text-primary mb-8" />
                    <h3 className="text-xl font-display font-extrabold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-padding border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ validation roadmap</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-14">
              From prototype to company engine.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-5">
            {roadmap.map(([stage, copy], index) => (
              <AnimatedSection key={stage} delay={index * 80}>
                <div className="p-6 rounded-2xl border border-border bg-card h-full">
                  <TrendingUp className="text-primary mb-8" size={22} />
                  <p className="mono">{stage}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{copy}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={220}>
            <div className="mt-12 rounded-3xl border border-primary/25 bg-primary/5 p-7 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-7">
                <div>
                  <p className="mono mb-3">What we are looking for</p>
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold">Partners who bring access, feedback, or capability.</h3>
                  <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
                    This could be a pilot environment, manufacturing support,
                    technical mentorship, distribution, research collaboration,
                    or patient investment aligned with long-term product work.
                  </p>
                </div>
                <Handshake className="text-primary shrink-0" size={48} strokeWidth={1.2} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="eyebrow justify-center">/ next conversation</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-5">
              Want the deeper build story?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Contact Turk Innovation for a project walkthrough, technical
              evidence pack, pilot discussion, or investor conversation.
            </p>
            <Link to="/contact" data-track="investor_final_contact">
              <Button variant="hero" size="xl">Request a conversation <ArrowRight size={18} /></Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
