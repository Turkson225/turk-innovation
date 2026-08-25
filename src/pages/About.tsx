import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { teamMembers, milestones } from "@/data/content";
import { ArrowRight, ExternalLink, Target, Eye, Lightbulb, Globe2 } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Build before we boast",
    description: "A working prototype, a test result, and a clear limitation matter more than inflated language.",
  },
  {
    icon: Target,
    title: "Start with a real problem",
    description: "We focus on safety, energy, mobility, operations, and learning problems that can be observed and improved.",
  },
  {
    icon: Globe2,
    title: "Build from Ghana, think globally",
    description: "Local constraints are engineering inputs—not reasons to wait before creating globally useful systems.",
  },
  {
    icon: Eye,
    title: "Document the truth",
    description: "We share what worked, what failed, and what must happen before a prototype becomes a product.",
  },
];

export default function About() {
  const founder = teamMembers[0];

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <AnimatedSection>
            <span className="mono">About Turk Innovation</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6 max-w-5xl">
              Practical systems for{" "}
              <span className="glow-text">the physical world.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Turk Innovation is a Ghana-born applied technology studio exploring
              intelligent safety, connected infrastructure, robotics, drone
              operations, and hands-on technical learning.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <p className="mono mb-5">Our operating thesis</p>
              <p className="text-2xl md:text-3xl font-display font-extrabold leading-tight">
                The best technology is not the loudest. It is the system people
                can understand, trust, and use when conditions are difficult.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Our standards</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              How we earn trust.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={i * 80}>
                  <div className="p-6 rounded-2xl border border-border bg-background h-full">
                    <Icon className="w-8 h-8 text-primary mb-6" />
                    <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
          <AnimatedSection>
            <div className="relative aspect-square max-w-sm rounded-[2rem] border border-primary/25 overflow-hidden bg-gradient-to-br from-primary/20 via-card to-secondary/20">
              <div className="absolute inset-6 rounded-[1.5rem] border border-primary/25" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-32 h-32 rounded-full border border-primary/40 bg-primary/10 grid place-items-center shadow-[0_0_80px_hsl(var(--primary)/0.25)]">
                  <span className="text-6xl font-display font-black text-primary">T</span>
                </div>
              </div>
              <div className="absolute left-6 bottom-6 mono">Ghana / systems / 01</div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <span className="mono">Founder & systems builder</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-6">
              {founder.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {founder.bio}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ennis brings together Electrical and Electronic Engineering,
              hands-on embedded development, IoT dashboards, robotics, drone
              operations, electrical maintenance, and fault diagnosis. Turk
              Innovation is the platform for turning that cross-disciplinary
              experience into useful products and open collaboration.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/turk-innovation-2961a9403/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
              >
                LinkedIn <ExternalLink size={14} />
              </a>
              <Link to="/contact">
                <Button variant="hero" size="default">
                  Talk to the founder <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="mono">Our build cycle</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              From signal to system.
            </h2>
          </AnimatedSection>
          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <AnimatedSection key={milestone.year} delay={i * 60}>
                <div className="flex gap-6 md:gap-10 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5 group-hover:shadow-[0_0_12px_hsl(var(--glow)/0.5)] transition-shadow" />
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-10">
                    <span className="font-mono text-sm text-primary">{milestone.year}</span>
                    <h3 className="font-display font-bold text-lg">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
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
