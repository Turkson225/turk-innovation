import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
const statuses = ["All", "completed", "ongoing", "concept"];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = projects.filter((p) => {
    const tagMatch = activeTag === "All" || p.tags.includes(activeTag);
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    return tagMatch && statusMatch;
  });

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Portfolio</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6">
              Our <span className="glow-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-12">
              Explore our portfolio of transformative technology solutions.
            </p>
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-12">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeStatus === s
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 80}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block rounded-xl border border-border bg-card overflow-hidden hover:glow-border transition-all duration-300 h-full"
                >
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
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
                      View Details <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No projects match your filters.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
