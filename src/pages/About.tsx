import AnimatedSection from "@/components/AnimatedSection";
import { teamMembers, milestones } from "@/data/content";
import { Target, Eye, Lightbulb, Globe } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation First", description: "We pursue bold ideas that push boundaries and challenge conventional thinking." },
  { icon: Target, title: "Impact Driven", description: "Every project must create measurable, meaningful change in the world." },
  { icon: Globe, title: "Global Perspective", description: "We build solutions for a connected world, thinking beyond borders." },
  { icon: Eye, title: "Transparency", description: "Honest communication and open collaboration are non-negotiable." },
];

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">About Us</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6 max-w-4xl">
              Building What Matters,{" "}
              <span className="glow-text">At Scale</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Turk Innovation was founded on a simple belief: technology should solve real problems for real people. From AI to drones, we engineer solutions that create lasting impact across industries and continents.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Our Values</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              What Drives Us
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 100}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <v.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="aspect-[4/5] rounded-2xl bg-muted border border-border" />
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <span className="mono">Founder & CEO</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-3 mb-6">
                Emre Turk
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 15 years of experience in emerging technology, Emre founded Turk Innovation with a vision to bridge the gap between cutting-edge research and real-world application.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Previously leading innovation initiatives at major technology companies, Emre recognized that the most impactful solutions emerge at the intersection of disciplines. This insight drives Turk Innovation's cross-industry approach to technology development.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Leadership</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              Our Team
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 80}>
                <div className="group p-6 rounded-xl border border-border bg-background">
                  <div className="w-16 h-16 rounded-full bg-muted mb-4" />
                  <h3 className="font-display font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-mono mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="mono">Our Journey</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              Milestones
            </h2>
          </AnimatedSection>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 60}>
                <div className="flex gap-6 md:gap-10 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5 group-hover:shadow-[0_0_12px_hsl(var(--glow)/0.5)] transition-shadow" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="font-mono text-sm text-primary">{m.year}</span>
                    <h3 className="font-display font-bold text-lg">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
