import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/data/content";
import { ArrowUpRight, FlaskConical, CheckCircle2, Layers3 } from "lucide-react";

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
const statuses = ["All", "completed", "ongoing", "concept"];

const projectVisuals: Record<string, string> = {
  smartguard: `${import.meta.env.BASE_URL}visuals/hero-security.jpg`,
  "smart-power": `${import.meta.env.BASE_URL}visuals/hero-light-systems.jpg`,
  "gassafe-iot": `${import.meta.env.BASE_URL}visuals/hero-light-security.jpg`,
  "escort-bot": `${import.meta.env.BASE_URL}visuals/hero-robotics.jpg`,
  "drone-systems": `${import.meta.env.BASE_URL}visuals/hero-logistics.jpg`,
  "iot-relay-control": `${import.meta.env.BASE_URL}visuals/hero-light-robotics.jpg`,
  "embedded-systems-lab": `${import.meta.env.BASE_URL}visuals/hero-light-systems.jpg`,
};

const portfolioStats = [
  ["7+", "systems in the portfolio"],
  ["3", "commercial pillars"],
  ["3", "completed prototypes"],
  ["100%", "case studies with next validation questions"],
];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = projects.filter((project) => {
    const tagMatch = activeTag === "All" || project.tags.includes(activeTag);
    const statusMatch = activeStatus === "All" || project.status === activeStatus;
    return tagMatch && statusMatch;
  });

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Portfolio / evidence library</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6 max-w-5xl">
              Real builds. <span className="text-gradient">Clear stages.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Explore the systems Turk Innovation has built, tested, operated,
              or is actively developing. Each case study separates observed
              results from future ambition.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={70}>
            <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-border mb-12">
              {portfolioStats.map(([value, label], index) => (
                <div key={label} className={`py-5 ${index < portfolioStats.length - 1 ? "lg:border-r border-border" : ""}`}>
                  <strong className="block text-2xl font-display text-primary">{value}</strong>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={90}>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${activeTag === tag ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-12">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all border ${activeStatus === status ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground border-border hover:border-primary/30"}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const isWorking = project.status === "completed";
              const visual = projectVisuals[project.id] || projectVisuals.smartguard;
              return (
                <AnimatedSection key={project.id} delay={i * 60}>
                  <Link
                    to={`/projects/${project.id}`}
                    data-track="project_case_study_open"
                    data-track-label={project.title}
                    className="group block rounded-2xl border border-border bg-card overflow-hidden hover:glow-border transition-all duration-300 h-full"
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={visual}
                        alt={`${project.title} project visual`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                      <div className="absolute inset-5 rounded-xl border border-white/25" />
                      <div className="absolute top-4 left-4 mono text-[10px] rounded-full border border-white/25 bg-background/55 px-2 py-1 backdrop-blur">
                        {project.tags[0]}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 mono text-[10px] px-2 py-1 rounded-md bg-background/70 border border-border backdrop-blur">
                          {isWorking ? <CheckCircle2 size={12} /> : project.status === "ongoing" ? <Layers3 size={12} /> : <FlaskConical size={12} />}
                          {isWorking ? "Working prototype" : project.status === "ongoing" ? "In development" : "Exploration"}
                        </span>
                        <ArrowUpRight size={16} className="text-foreground/70 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => <span key={tag} className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded border border-border">{tag}</span>)}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          {filtered.length === 0 && <div className="text-center py-20 text-muted-foreground">No projects match your filters.</div>}
        </div>
      </section>
    </main>
  );
}
