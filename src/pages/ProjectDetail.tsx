import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/content";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, FlaskConical, ShieldAlert } from "lucide-react";

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

  const statusLabel = project.status === "completed"
    ? "Working prototype"
    : project.status === "ongoing"
      ? "In active development"
      : "Exploration";

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
            <div className="relative min-h-[22rem] rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/20 via-card to-secondary/20 p-8 flex items-end">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.75),transparent_34%),linear-gradient(135deg,transparent, hsl(var(--secondary)/0.35))]" />
              <div className="absolute inset-8 rounded-2xl border border-primary/20" />
              <div className="relative z-10">
                <p className="mono mb-3">Case study / {project.id}</p>
                <p className="text-3xl md:text-5xl font-display font-extrabold max-w-xl">{project.title}</p>
                <p className="text-sm text-muted-foreground mt-5 max-w-lg">
                  Technical evidence, photos, diagrams, and demo footage can be
                  added here as each build is prepared for public release.
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

      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-7 h-full">
              <p className="mono mb-4">Next validation questions</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What must be tested next before this system can be trusted by a
                wider group of users? We are using this space to document
                repeatability, safety, cost, reliability, and field feedback.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-7 h-full">
              <p className="mono mb-4">Bring a real use case</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Partners can help by providing a test environment, domain
                feedback, manufacturing support, or a problem worth solving.
              </p>
              <Link to="/contact"><Button variant="hero" size="default">Start a project conversation <ArrowRight size={16} /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
