import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Zap } from "lucide-react";

const openRoles = [
  { title: "Senior ML Engineer", location: "Remote / San Francisco", type: "Full-time", department: "AI" },
  { title: "Drone Systems Architect", location: "Austin, TX", type: "Full-time", department: "Engineering" },
  { title: "Product Designer", location: "Remote", type: "Full-time", department: "Design" },
  { title: "DevOps Engineer", location: "Remote / London", type: "Full-time", department: "Infrastructure" },
  { title: "Business Development Lead", location: "New York, NY", type: "Full-time", department: "Growth" },
];

const perks = [
  "Competitive salary + equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health, dental & vision",
  "Learning & development budget",
  "Latest hardware & tools",
];

export default function Careers() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Careers</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6">
              Join the <span className="glow-text">Mission</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              We're looking for exceptional people who want to build technology that
              matters. If you thrive on hard problems and big impact, you'll feel at home here.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl mb-16">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap size={12} className="text-primary shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="mono">Open Positions</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-3 mb-12">
              Current Openings
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {openRoles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 60}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-border bg-background hover:glow-border transition-all duration-300 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
                  <Button variant="outline" size="sm">
                    Apply <ArrowRight size={14} />
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
