import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Download, Handshake, MapPin, Sparkles, TrendingUp } from "lucide-react";

const pillars = [
  {
    title: "Intelligent safety & automation",
    copy: "Local-first systems for security, gas detection, alerts, and appliance control.",
    accent: "01",
  },
  {
    title: "Energy & connected infrastructure",
    copy: "Measurement and control layers that make electrical systems more visible and manageable.",
    accent: "02",
  },
  {
    title: "Robotics & autonomous operations",
    copy: "Ground vehicles, drone support, recovery logistics, and field-oriented autonomy.",
    accent: "03",
  },
];

const roadmap = [
  ["Now", "Document and validate the strongest working prototypes with repeatable tests."],
  ["Next", "Run focused pilots with partners who can provide real users, environments, and feedback."],
  ["Scale", "Turn the highest-signal systems into maintainable products, training, and deployment partnerships."],
];

export default function Investors() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <AnimatedSection>
            <p className="eyebrow"><Sparkles size={14} /> Investors / strategic partners</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-4 mb-6">
              Back the builders of{" "}
              <span className="text-gradient">useful intelligence.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Turk Innovation is building from Ghana at the intersection of
              embedded systems, connected infrastructure, robotics, and
              autonomous operations. The opportunity starts with real problems,
              working prototypes, and the partners willing to help test them in
              the field.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link to="/contact">
                <Button variant="hero" size="xl">Start a strategic conversation <ArrowRight size={18} /></Button>
              </Link>
              <a href="#roadmap" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
                See the roadmap
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <p className="mono mb-5">Investor readout / 01</p>
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
              deployment claims. Our current advantage is practical: the
              ability to move from a circuit and a field observation to a
              connected system, document what happened, and improve it.
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

      <section id="roadmap" className="section-padding border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="eyebrow">/ validation roadmap</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-14">
              Capital should unlock evidence.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5">
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

          <AnimatedSection delay={200}>
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
            <Link to="/contact">
              <Button variant="hero" size="xl">Request a conversation <ArrowRight size={18} /></Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
