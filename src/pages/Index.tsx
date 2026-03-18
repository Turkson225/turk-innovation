import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { focusAreas, projects } from "@/data/content";
import { getIcon } from "@/lib/icons";
import heroBg from "@/assets/hero-bg.jpg";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <AnimatedSection>
          <span className="mono mb-6 inline-block">Pioneering Tomorrow's Solutions</span>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-extrabold tracking-tight leading-[0.9] mb-6">
            Innovating
            <br />
            <span className="glow-text">the Future</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Turk Innovation builds cutting-edge solutions across AI, drones,
            logistics, healthcare, and emerging technologies — creating impact at
            global scale.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects">
              <Button variant="hero" size="xl">
                Explore Projects
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero-outline" size="xl">
                Partner With Us
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { value: 100, suffix: "M+", prefix: "$", label: "Value Delivered" },
    { value: 45, suffix: "+", label: "Countries" },
    { value: 200, suffix: "+", label: "Enterprise Clients" },
    { value: 500, suffix: "+", label: "Team Members" },
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {metrics.map((m, i) => (
          <AnimatedSection key={m.label} delay={i * 100} className="text-center">
            <div className="text-3xl md:text-5xl font-display font-extrabold mb-2">
              <AnimatedCounter target={m.value} suffix={m.suffix} prefix={m.prefix} />
            </div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

function FocusAreasSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="mono">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-4">
            Key Focus Areas
          </h2>
           <p className="text-muted-foreground max-w-xl mb-16">
            We operate across eight critical technology verticals, each driving
            meaningful change at scale.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusAreas.map((area, i) => {
            const Icon = getIcon(area.icon);
            return (
              <AnimatedSection key={area.title} delay={i * 80}>
                <div className="group p-6 rounded-xl border border-border bg-card hover:glow-border transition-all duration-300 cursor-pointer">
                  <Icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-display font-bold text-lg mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-padding bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="mono">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-3 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16">
            Explore our most impactful work across industries.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 100}>
              <Link
                to={`/projects/${project.id}`}
                className="group block rounded-xl border border-border bg-background overflow-hidden hover:glow-border transition-all duration-300"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="mono text-[10px] px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
                    View Project <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link to="/projects">
            <Button variant="outline" size="lg">
              View All Projects
              <ArrowRight size={16} />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    "Google Cloud", "AWS", "Microsoft", "NVIDIA", "Siemens", "Boeing",
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedSection>
          <p className="mono mb-8">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {partners.map((name, i) => (
              <span
                key={name}
                className="text-lg md:text-xl font-display font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {name}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6">
            Ready to Build the{" "}
            <span className="glow-text">Future</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Whether you're looking to partner, invest, or join our team —
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get In Touch
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="hero-outline" size="xl">
                Join Our Team
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <main>
      <HeroSection />
      <MetricsSection />
      <FocusAreasSection />
      <FeaturedProjectsSection />
      <PartnersSection />
      <CTASection />
    </main>
  );
}
