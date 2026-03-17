import AnimatedSection from "@/components/AnimatedSection";
import { services } from "@/data/content";
import { getIcon } from "@/lib/icons";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const processSteps = [
  { step: "01", title: "Discovery", description: "We analyze your challenges, goals, and opportunities to define the problem space." },
  { step: "02", title: "Strategy", description: "We design a technology roadmap aligned with your business objectives and timeline." },
  { step: "03", title: "Build", description: "Our engineering team develops, tests, and iterates on the solution with continuous feedback." },
  { step: "04", title: "Deploy & Scale", description: "We launch, monitor, and optimize for long-term performance and impact." },
];

export default function Services() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Services</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6">
              What We <span className="glow-text">Do</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16">
              End-to-end technology solutions — from concept to deployment and beyond.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <AnimatedSection key={service.title} delay={i * 80}>
                  <div className="group p-8 rounded-xl border border-border bg-card hover:glow-border transition-all duration-300 h-full">
                    <Icon className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display font-bold text-xl mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <span className="mono">How We Work</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-16">
              Our Process
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 100}>
                <div className="flex gap-5">
                  <span className="text-4xl font-display font-extrabold text-primary/20">{step.step}</span>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4">
              Let's Build Something <span className="glow-text">Extraordinary</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Tell us about your challenge, and we'll show you what's possible.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Start a Conversation <ArrowRight size={18} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
