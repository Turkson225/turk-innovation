import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircuitBoard,
  Compass,
  Layers3,
  Plane,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";

type Concept = {
  title: string;
  label: string;
  src: string;
  alt: string;
};

type ConceptGroup = {
  eyebrow: string;
  title: string;
  icon: typeof Bot;
  concepts: Concept[];
};

const conceptGroups: ConceptGroup[] = [
  {
    eyebrow: "01 / robotics & manipulation",
    title: "Machines with reach.",
    icon: Bot,
    concepts: [
      {
        title: "Mobile manipulator",
        label: "Robotics / mobility",
        src: `${import.meta.env.BASE_URL}concepts/mobile-manipulator.jpg`,
        alt: "Concept mobile robot with a mounted robotic arm shown from four angles",
      },
      {
        title: "Factory motion",
        label: "Robotics / automation",
        src: `${import.meta.env.BASE_URL}concepts/scara-robotics.jpg`,
        alt: "Concept image of robotic arms working on an industrial production line",
      },
      {
        title: "Industrial arm",
        label: "Robotics / manipulation",
        src: `${import.meta.env.BASE_URL}concepts/industrial-robot-arm.jpg`,
        alt: "Concept industrial robot arm with a precision gripper",
      },
      {
        title: "Field service rover",
        label: "Robotics / field systems",
        src: `${import.meta.env.BASE_URL}concepts/field-service-rover.jpg`,
        alt: "Concept autonomous field rover with a robotic arm and spray system",
      },
      {
        title: "Humanoid systems",
        label: "Robotics / human environments",
        src: `${import.meta.env.BASE_URL}concepts/humanoid-industrial.jpg`,
        alt: "Concept industrial humanoid robot in yellow protective styling",
      },
      {
        title: "Human-machine form",
        label: "Robotics / interface",
        src: `${import.meta.env.BASE_URL}concepts/humanoid-white.jpg`,
        alt: "Minimal white humanoid robot head concept",
      },
      {
        title: "Autonomous companion",
        label: "Robotics / interaction",
        src: `${import.meta.env.BASE_URL}concepts/humanoid-dark.jpg`,
        alt: "Dark humanoid robot concept shown in close-up",
      },
      {
        title: "Quadruped team",
        label: "Robotics / terrain",
        src: `${import.meta.env.BASE_URL}concepts/quadruped-robots.jpg`,
        alt: "Two quadruped robot concepts standing on a light surface",
      },
      {
        title: "Terrain mobility",
        label: "Robotics / locomotion",
        src: `${import.meta.env.BASE_URL}concepts/quadruped-detail.jpg`,
        alt: "Close-up concept of a blue quadruped robot leg and body",
      },
    ],
  },
  {
    eyebrow: "02 / aerial autonomy",
    title: "Aircraft beyond the familiar.",
    icon: Plane,
    concepts: [
      {
        title: "High-speed lift body",
        label: "Aerial / propulsion",
        src: `${import.meta.env.BASE_URL}concepts/torpedo-aircraft.jpg`,
        alt: "Concept torpedo-shaped aircraft shown in two configurations",
      },
      {
        title: "Blended flight",
        label: "Aerial / airframe",
        src: `${import.meta.env.BASE_URL}concepts/aircraft-concept.jpg`,
        alt: "Concept blended-wing aircraft with a red vertical stabilizer",
      },
      {
        title: "Autonomous wing",
        label: "Aerial / autonomy",
        src: `${import.meta.env.BASE_URL}concepts/flying-wing.jpg`,
        alt: "Concept white autonomous flying wing shown from above with a flight path",
      },
      {
        title: "Distributed propulsion",
        label: "Aerial / systems",
        src: `${import.meta.env.BASE_URL}concepts/flying-wing-profile.jpg`,
        alt: "Concept aircraft with a long flying-wing profile on a dark background",
      },
    ],
  },
  {
    eyebrow: "03 / exploration",
    title: "Intelligence where the map ends.",
    icon: Waves,
    concepts: [
      {
        title: "Underwater vehicle",
        label: "Marine / exploration",
        src: `${import.meta.env.BASE_URL}concepts/underwater-vehicle.jpg`,
        alt: "Concept autonomous underwater vehicle operating over a seabed",
      },
    ],
  },
  {
    eyebrow: "04 / resilient infrastructure",
    title: "The systems behind the system.",
    icon: CircuitBoard,
    concepts: [
      {
        title: "Protection intelligence",
        label: "Energy / protection",
        src: `${import.meta.env.BASE_URL}concepts/protection-relays.jpg`,
        alt: "Concept electrical protection relay panel with labelled protection devices",
      },
      {
        title: "Distribution architecture",
        label: "Energy / distribution",
        src: `${import.meta.env.BASE_URL}concepts/electrical-distribution.jpg`,
        alt: "Concept electrical distribution cabinet with breakers and labelled wiring",
      },
      {
        title: "Compact control",
        label: "Energy / control",
        src: `${import.meta.env.BASE_URL}concepts/electrical-control-box.jpg`,
        alt: "Concept compact electrical control box with breakers and digital voltage display",
      },
    ],
  },
  {
    eyebrow: "05 / connected environments",
    title: "Every space can become aware.",
    icon: Zap,
    concepts: [
      {
        title: "Living systems interface",
        label: "Interfaces / connected home",
        src: `${import.meta.env.BASE_URL}concepts/smart-home-interface.jpg`,
        alt: "Concept dark-mode smart home interface showing climate, lighting, security, and voice controls",
      },
    ],
  },
];

const conceptCount = conceptGroups.reduce((total, group) => total + group.concepts.length, 0);

export default function Concepts() {
  return (
    <main className="pt-20">
      <section className="section-padding overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedSection>
            <p className="eyebrow">
              <Sparkles size={14} />
              Concept Lab / future systems
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-display font-extrabold leading-[0.94] md:text-7xl">
              Ideas waiting for a <span className="text-gradient">body.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A visual archive of future directions across robotics, autonomy,
              aerospace, infrastructure, and intelligent environments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" data-track="concepts_work_cta">
                <Button variant="hero" size="xl">
                  See working systems <ArrowRight size={17} />
                </Button>
              </Link>
              <Link
                to="/contact?inquiry=Concept%20Lab"
                data-track="concepts_contact_cta"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Shape the next build <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-[#08111f] p-3 shadow-[0_30px_110px_hsl(var(--primary)/0.18)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <img
                  src={`${import.meta.env.BASE_URL}concepts/mobile-manipulator.jpg`}
                  alt="Concept mobile manipulator with a robotic arm"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-transparent to-[#08111f]/10" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
                  <span>Future system / 001</span>
                  <span className="inline-flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" /> Exploratory</span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#38BDF8]">Robotics / mobility / manipulation</p>
                  <p className="mt-2 max-w-lg text-3xl font-display font-extrabold leading-tight text-white md:text-5xl">
                    Physical intelligence, designed for difficult places.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 px-3 pb-2 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50">
                <span>Sense</span>
                <span className="text-center">Move</span>
                <span className="text-right">Adapt</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow"><Compass size={14} /> / concept archive</p>
                <h2>Directions worth exploring.</h2>
              </div>
              <div className="inline-flex items-center gap-3 self-start rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-primary lg:self-end">
                <Layers3 size={14} />
                {conceptCount} concept directions
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-20">
            {conceptGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              return (
                <AnimatedSection key={group.eyebrow} delay={groupIndex * 60}>
                  <section>
                    <div className="mb-7 flex items-end justify-between gap-5 border-b border-border pb-5">
                      <div className="flex items-start gap-4">
                        <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                          <Icon size={18} />
                        </span>
                        <div>
                          <p className="eyebrow">{group.eyebrow}</p>
                          <h3 className="mt-2 text-3xl font-display font-extrabold md:text-4xl">{group.title}</h3>
                        </div>
                      </div>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:block">
                        {String(groupIndex + 1).padStart(2, "0")} / {String(conceptGroups.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {group.concepts.map((concept, conceptIndex) => (
                        <a
                          key={concept.title}
                          href={concept.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-track="concept_reference_open"
                          data-track-label={concept.title}
                          className="group block"
                        >
                          <figure className="overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.1)]">
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#08111f]">
                              <img
                                src={concept.src}
                                alt={concept.alt}
                                loading={groupIndex === 0 && conceptIndex < 3 ? "eager" : "lazy"}
                                className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/80 via-transparent to-transparent opacity-60" />
                              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm">
                                Concept
                              </span>
                              <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#08111f] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                Open reference <ArrowUpRight size={12} />
                              </span>
                            </div>
                            <figcaption className="p-5">
                              <span className="mono">{concept.label}</span>
                              <strong className="mt-2 block text-xl font-display font-extrabold">{concept.title}</strong>
                            </figcaption>
                          </figure>
                        </a>
                      ))}
                    </div>
                  </section>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <AnimatedSection>
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 rounded-3xl border border-primary/25 bg-primary/5 p-7 md:flex-row md:items-center md:p-10">
            <div>
              <p className="mono mb-3">From reference to reality</p>
              <h2 className="text-3xl font-display font-extrabold md:text-4xl">A direction becomes real when the first prototype moves.</h2>
            </div>
            <Link to="/contact?inquiry=Future%20system" data-track="concepts_final_cta" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground">
              Start a conversation <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
