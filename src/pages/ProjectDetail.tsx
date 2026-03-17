import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/content";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-display font-bold">Project not found</h1>
        <Link to="/projects" className="text-primary mt-4 inline-block">
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="mono text-[11px] px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                {project.status}
              </span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {project.longDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Media */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="aspect-video rounded-2xl bg-muted border border-border" />
          </AnimatedSection>
        </div>
      </section>

      {/* Problem / Solution / Impact */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Problem", content: project.problem },
            { title: "Solution", content: project.solution },
            { title: "Impact", content: project.impact },
          ].map((block, i) => (
            <AnimatedSection key={block.title} delay={i * 100}>
              <span className="mono mb-3 block">{block.title}</span>
              <p className="text-muted-foreground leading-relaxed">
                {block.content}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="section-padding border-t border-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <span className="mono mb-8 block">Key Metrics</span>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.metrics.map((metric, i) => (
              <AnimatedSection key={metric.label} delay={i * 80}>
                <div className="p-6 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-1">
                    {metric.value}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-4xl font-display font-extrabold mb-4">
              Partner on Similar Projects
            </h2>
            <p className="text-muted-foreground mb-8">
              Interested in building something like this? Let's discuss how we
              can bring your vision to life.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get In Touch
                <ArrowRight size={18} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
