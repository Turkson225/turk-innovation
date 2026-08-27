import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Flame,
  GraduationCap,
  Eye,
  Gauge,
  Handshake,
  Layers3,
  LineChart,
  Plane,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
const darkWallpaperImages = [
  `${import.meta.env.BASE_URL}visuals/hero-robotics.jpg`,
  `${import.meta.env.BASE_URL}visuals/hero-security.jpg`,
  `${import.meta.env.BASE_URL}visuals/hero-logistics.jpg`,
];

const lightWallpaperImages = [
  `${import.meta.env.BASE_URL}visuals/hero-light-robotics.jpg`,
  `${import.meta.env.BASE_URL}visuals/hero-light-security.jpg`,
  `${import.meta.env.BASE_URL}visuals/hero-light-systems.jpg`,
];

const perspectiveSlides = [
  {
    eyebrow: "AI SECURITY / IOT",
    title: "SmartGuard",
    image: `${import.meta.env.BASE_URL}visuals/hero-security.jpg`,
    alt: "SmartGuard AI security and monitoring visual",
  },
  {
    eyebrow: "AUTONOMY / ROBOTICS",
    title: "Escort-Bot & UGV",
    image: `${import.meta.env.BASE_URL}visuals/hero-robotics.jpg`,
    alt: "Autonomous robotics and UGV visual",
  },
  {
    eyebrow: "AERIAL / OPERATIONS",
    title: "Drone Logistics",
    image: `${import.meta.env.BASE_URL}visuals/hero-logistics.jpg`,
    alt: "Drone logistics and autonomous operations visual",
  },
];

const featuredProjects = [
  {
    href: "/projects/smartguard",
    number: "01",
    category: "AI SECURITY / IOT",
    title: "SmartGuard",
    description:
      "A dual-node intelligent security and home automation ecosystem combining vision, GSM alerts, Firebase intelligence, and remote appliance control.",
    tags: ["ESP32-CAM", "HuskyLens", "Firebase"],
    tone: "cyan",
    icon: ShieldCheck,
  },
  {
    href: "/projects/smart-power",
    number: "02",
    category: "ENERGY / CONTROL",
    title: "Smart Power Systems",
    description:
      "Real-time voltage, current, power, energy, and relay monitoring designed for safer, more transparent electrical control.",
    tags: ["PZEM", "ACS712", "ESP32"],
    tone: "violet",
    icon: Gauge,
  },
  {
    href: "/projects/gassafe-iot",
    number: "03",
    category: "SAFETY / AUTOMATION",
    title: "GasSafe IoT",
    description:
      "Gas-leakage detection with automatic shutoff, audible alarms, remote monitoring, and an offline manual fallback.",
    tags: ["MQ2", "Firebase", "ESP32-C3"],
    tone: "amber",
    icon: Flame,
  },
  {
    href: "/projects/escort-bot",
    number: "04",
    category: "AUTONOMY / ROBOTICS",
    title: "Escort-Bot & UGV",
    description:
      "A practical robotics platform exploring recovery logistics, mecanum mobility, obstacle awareness, manual control, and autonomous navigation.",
    tags: ["UGV", "NRF24L01", "IMU"],
    tone: "cyan",
    icon: Bot,
  },
  {
    href: "/projects/drone-systems",
    number: "05",
    category: "AERIAL / OPERATIONS",
    title: "Drone Systems",
    description:
      "Hands-on work across autonomous drone operations, fixed-wing control, recovery workflows, monitoring, and operational safety.",
    tags: ["UAV", "Telemetry", "Operations"],
    tone: "violet",
    icon: Plane,
  },
  {
    href: "/projects/iot-relay-control",
    number: "06",
    category: "CONNECTED DEVICES",
    title: "IoT Relay Control",
    description:
      "A cloud-connected appliance control platform with ESP32 hardware, Firebase data, web dashboards, and real-time switching.",
    tags: ["4-Relay", "Firebase", "Dashboard"],
    tone: "amber",
    icon: CircuitBoard,
  },
  {
    href: "/projects/embedded-systems-lab",
    number: "07",
    category: "COMMUNITY / LEARNING",
    title: "Embedded Systems Lab",
    description:
      "Practical training and project-building for students passionate about electronics, robotics, IT, and innovation.",
    tags: ["Arduino", "ESP32", "Training"],
    tone: "cyan",
    icon: GraduationCap,
  },
];

const capabilityCards = [
  {
    icon: Cpu,
    eyebrow: "01 / EDGE INTELLIGENCE",
    title: "Devices that decide locally.",
    copy: "Firmware, sensors, controls, and fallback logic designed so critical actions can happen close to the hardware.",
  },
  {
    icon: Layers3,
    eyebrow: "02 / CONNECTED OPERATIONS",
    title: "Dashboards that create command.",
    copy: "Firebase data flows, Apps Script alerts, analytics, and operator interfaces built around visibility and action.",
  },
  {
    icon: Radio,
    eyebrow: "03 / AUTONOMY STACK",
    title: "Machines that move with purpose.",
    copy: "Robotics, drone-support systems, vision, IMU, GPS, and field workflows organized for safer physical-world work.",
  },
];

const platformLayers = [
  {
    icon: Eye,
    code: "01",
    title: "Sense",
    signal: "Perception / field data",
    copy: "Cameras, gas sensors, voltage/current sensors, IMUs, GPS, limit switches, and workflow observations.",
  },
  {
    icon: Cpu,
    code: "02",
    title: "Decide",
    signal: "Firmware / edge logic",
    copy: "ESP32, Arduino, timing rules, alert decisions, safety states, and local fallback behaviour.",
  },
  {
    icon: Radio,
    code: "03",
    title: "Connect",
    signal: "Cloud / communications",
    copy: "Firebase dashboards, Google Apps Script, GSM alerts, analytics events, and operator visibility.",
  },
  {
    icon: Bot,
    code: "04",
    title: "Act",
    signal: "Control / autonomy",
    copy: "Relays, shutoff systems, alarms, UGV motion, recovery support, and drone-operation tooling.",
  },
];

const proofCards = [
  {
    icon: Terminal,
    value: "7+",
    label: "working systems and product directions",
    note: "AI security, energy monitoring, gas safety, relay control, robotics, drones, and embedded training.",
  },
  {
    icon: LineChart,
    value: "2-5 s",
    label: "observed relay response window",
    note: "Measured in SmartGuard automation tests, published as evidence instead of inflated claims.",
  },
  {
    icon: Eye,
    value: "1 m",
    label: "observed AI face-detection range",
    note: "SmartGuard HuskyLens testing documented as a current validation point.",
  },
  {
    icon: Rocket,
    value: "3",
    label: "commercial directions",
    note: "Safety automation, connected infrastructure, and robotics/autonomous operations.",
  },
];

const audiencePaths = [
  {
    icon: LineChart,
    title: "Invest",
    copy: "Review the thesis, roadmap, use of funds, and validation plan behind the company direction.",
    href: "/investors",
    action: "Open investor hub",
    track: "homepage_investor_path",
  },
  {
    icon: Handshake,
    title: "Partner",
    copy: "Bring a pilot environment, technical capability, manufacturing support, or a problem worth solving.",
    href: "/contact",
    action: "Start partnership talk",
    track: "homepage_partner_path",
  },
  {
    icon: BriefcaseBusiness,
    title: "Join",
    copy: "Apply with your CV, show what you can build, and join a practical engineering community.",
    href: "/careers",
    action: "Apply to build",
    track: "homepage_career_path",
  },
];

const missionLanes = [
  {
    code: "Mission 01",
    title: "Make safety systems local-first.",
    copy:
      "SmartGuard and GasSafe are being shaped around one rule: when safety matters, the first response should not wait for the cloud.",
    image: `${import.meta.env.BASE_URL}visuals/hero-security.jpg`,
    href: "/projects/smartguard",
    tags: ["AI security", "Gas safety", "GSM fallback"],
  },
  {
    code: "Mission 02",
    title: "Make infrastructure visible.",
    copy:
      "Power monitoring and relay-control systems turn hidden electrical behaviour into readings, alerts, logs, and decisions.",
    image: `${import.meta.env.BASE_URL}visuals/hero-light-systems.jpg`,
    href: "/projects/smart-power",
    tags: ["Energy data", "Relay control", "Dashboards"],
  },
  {
    code: "Mission 03",
    title: "Make field work more autonomous.",
    copy:
      "UGV and drone-support projects connect robotics to recovery, logistics, monitoring, and safer operating workflows.",
    image: `${import.meta.env.BASE_URL}visuals/hero-logistics.jpg`,
    href: "/projects/escort-bot",
    tags: ["UGV", "Drones", "Operations"],
  },
];

function StatusPill() {
  return (
    <div className="status-pill">
      <span className="status-dot" />
      <span>Building from Ghana · Toward global systems</span>
    </div>
  );
}

function HeroSection() {
  const [activeWallpaper, setActiveWallpaper] = useState(0);
  const { theme } = useTheme();
  const wallpaperImages =
    theme === "light" ? lightWallpaperImages : darkWallpaperImages;

  useEffect(() => {
    setActiveWallpaper(0);
    const timer = window.setInterval(() => {
      setActiveWallpaper((current) => (current + 1) % wallpaperImages.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [theme, wallpaperImages.length]);

  return (
    <section className="hero-section">
      <div className="hero-wallpaper-stack" aria-hidden="true">
        {wallpaperImages.map((image, index) => (
          <div
            key={image}
            className={`hero-wallpaper ${index === activeWallpaper ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grid" />
      <div className="glow-orb glow-orb-one" />
      <div className="glow-orb glow-orb-two" />

      <div className="hero-inner">
        <div className="hero-copy">
          <AnimatedSection>
            <StatusPill />
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="eyebrow hero-eyebrow">
              <Sparkles size={14} />
              Turk Innovation / Robotics · IoT · Autonomous systems
            </p>
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <h1>
              Engineering
              <span className="hero-gradient"> intelligent systems </span>
              for the real world.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={240}>
            <p className="hero-description">
              Turk Innovation is building the practical stack behind safer
              homes, visible infrastructure, autonomous support machines, and
              the next generation of African engineering talent.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={320}>
            <div className="hero-actions">
              <Link to="/projects" data-track="hero_explore_work">
                <Button variant="hero" size="xl">
                  Explore the work
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/investors" data-track="hero_investor_hub">
                <Button variant="hero-outline" size="xl">
                  Investor hub
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="hero-footnote">
              <span>01</span>
              <span className="hero-footnote-line" />
              <span>From working prototype to field-ready platform</span>
            </div>
          </AnimatedSection>
        </div>

      </div>

      <a className="scroll-cue" href="#signal" data-track="hero_scroll_cue">
        <span>Scroll to explore</span>
        <ArrowDownRight size={16} />
      </a>
    </section>
  );
}

function SignalSection() {
  const stats = [
    { value: "7+ tracks", label: "Real builds documented" },
    { value: "2-5 s", label: "Observed relay response" },
    { value: "3 missions", label: "Focused company direction" },
    { value: "Ghana to Global", label: "Point of view" },
  ];

  return (
    <section id="signal" className="signal-section section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-intro">
            <p className="eyebrow">/ the signal</p>
            <h2>
              Built like a
              <span className="text-gradient"> mission-control company.</span>
            </h2>
            <p>
              The website now needs to feel less like a collection of projects
              and more like a company with a repeatable system for turning field
              problems into hardware, software, telemetry, and useful products.
              Every build is presented with its stage, observed performance,
              constraints, and next validation question.
            </p>
          </div>
        </AnimatedSection>

        <div className="stat-strip">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 80}>
              <div className="stat-cell">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="platform-section section-padding">
      <div className="platform-shell">
        <AnimatedSection>
          <div className="platform-copy">
            <p className="eyebrow">/ turk innovation stack</p>
            <h2>
              A company built around
              <span className="text-gradient"> sensing, deciding, connecting, and acting.</span>
            </h2>
            <p>
              The big-tech feeling comes from showing the system behind the
              ambition. Turk Innovation is being framed as a physical-world
              technology stack: sensors collect reality, edge logic makes local
              decisions, cloud tools create visibility, and machines take useful
              action.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={140}>
          <div className="platform-console" aria-label="Turk Innovation platform stack">
            <div className="platform-console-header">
              <span><i /> TI Mission Stack</span>
              <strong>Online / Ghana</strong>
            </div>
            <div className="platform-core-map" aria-hidden="true">
              <div className="platform-core">
                <span>TI</span>
              </div>
              <div className="platform-ring platform-ring-one" />
              <div className="platform-ring platform-ring-two" />
              <span className="platform-node node-a" />
              <span className="platform-node node-b" />
              <span className="platform-node node-c" />
              <span className="platform-node node-d" />
            </div>
            <div className="platform-layer-list">
              {platformLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <article key={layer.title} className="platform-layer">
                    <span className="platform-layer-code">{layer.code}</span>
                    <span className="platform-layer-icon"><Icon size={17} /></span>
                    <div>
                      <h3>{layer.title}</h3>
                      <p>{layer.copy}</p>
                    </div>
                    <strong>{layer.signal}</strong>
                  </article>
                );
              })}
            </div>
            <div className="platform-data-rail" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="section-padding bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ traction evidence</p>
              <h2>Proof before promises.</h2>
            </div>
            <p className="section-side-note">
              Big companies sound credible because they separate measured
              reality from ambition. This site now keeps that discipline.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {proofCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={card.label} delay={index * 80}>
                <article className="h-full rounded-2xl border border-border bg-background p-6 hover:border-primary/40 transition-colors">
                  <Icon size={22} className="text-primary mb-8" />
                  <strong className="block text-3xl md:text-4xl font-display text-foreground mb-2">
                    {card.value}
                  </strong>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary mb-4">
                    {card.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.note}</p>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section className="section-padding capability-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ how we build</p>
              <h2>The Turk Innovation operating stack.</h2>
            </div>
            <p className="section-side-note">
              Hardware, software, autonomy, and field operations are treated as
              one product system.
            </p>
          </div>
        </AnimatedSection>

        <div className="capability-grid">
          {capabilityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={card.eyebrow} delay={index * 100}>
                <article className="capability-card">
                  <div className="capability-card-top">
                    <span className="capability-icon">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight size={18} className="capability-arrow" />
                  </div>
                  <p className="card-eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <div className="card-line" />
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="section-padding projects-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ selected work</p>
              <h2>Built to be seen in the real world.</h2>
            </div>
            <Link to="/projects" className="text-link" data-track="view_all_projects">
              View all projects <ArrowUpRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="project-grid">
          {featuredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <AnimatedSection key={project.title} delay={index * 100}>
                <Link to={project.href} className={`project-card ${project.tone}`} data-track="homepage_project_card" data-track-label={project.title}>
                  <div className="project-card-visual">
                    <div className="project-card-glow" />
                    <div className="project-card-orbit orbit-one" />
                    <div className="project-card-orbit orbit-two" />
                    <Icon size={72} strokeWidth={1} />
                    <span className="project-number">{project.number}</span>
                    <span className="project-open">
                      Open case study <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <div className="project-card-body">
                    <p className="card-eyebrow">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="mission-section section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ mission lanes</p>
              <h2>Three fronts. One company direction.</h2>
            </div>
            <p className="section-side-note">
              The clearest tech companies make their work feel like a mission
              system, not a menu of unrelated services.
            </p>
          </div>
        </AnimatedSection>

        <div className="mission-grid">
          {missionLanes.map((mission, index) => (
            <AnimatedSection key={mission.title} delay={index * 100}>
              <Link
                to={mission.href}
                className="mission-card"
                data-track="mission_lane_open"
                data-track-label={mission.title}
              >
                <img src={mission.image} alt="" aria-hidden="true" />
                <div className="mission-card-overlay" />
                <div className="mission-card-content">
                  <span className="mission-code">{mission.code}</span>
                  <h3>{mission.title}</h3>
                  <p>{mission.copy}</p>
                  <div className="mission-tags">
                    {mission.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="mission-open">
                  Open mission <ArrowUpRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerspectiveShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % perspectiveSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const active = perspectiveSlides[activeSlide];

  return (
    <div className="perspective-showcase" aria-label="Turk Innovation project showcase">
      <div className="showcase-orb" aria-hidden="true" />
      <div className="showcase-slides" aria-hidden="true">
        {perspectiveSlides.map((slide, index) => {
          const distance = (index - activeSlide + perspectiveSlides.length) % perspectiveSlides.length;
          const slideState =
            distance === 0
              ? "is-active"
              : distance === 1
                ? "is-next"
                : "is-previous";

          return (
            <img
              key={slide.image}
              className={`showcase-slide ${slideState}`}
              src={slide.image}
              alt=""
            />
          );
        })}
      </div>
      <div className="showcase-window-chrome" aria-hidden="true">
        <span className="showcase-brand">
          <i />
          TURK / INNOVATION
        </span>
        <span className="showcase-window-title">MOTION / BUILD {String(activeSlide + 1).padStart(2, "0")}</span>
        <span className="showcase-window-actions"><i /><i /><i /></span>
      </div>
      <div className="showcase-overlay" aria-hidden="true" />
      <div className="showcase-meta">
        <span>Build / 0{activeSlide + 1}</span>
        <span className="showcase-live"><i /> Live showcase</span>
      </div>
      <div className="showcase-caption" aria-live="polite">
        <span>{active.eyebrow}</span>
        <strong>{active.title}</strong>
      </div>
      <div className="showcase-controls" aria-label="Choose project image">
        {perspectiveSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-pressed={index === activeSlide}
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

function PerspectiveSection() {
  return (
    <section className="perspective-section section-padding">
      <div className="perspective-panel">
        <div className="perspective-grid" />
        <div className="perspective-copy">
          <p className="eyebrow">/ for investors · collaborators · builders</p>
          <h2>
            The next breakthrough starts as a working prototype.
          </h2>
          <p>
            Follow the build, support the direction, or bring a hard problem.
            Turk Innovation is creating a platform for practical innovation
            across Africa and beyond.
          </p>
          <div className="hero-actions">
            <Link to="/investors" data-track="prototype_panel_investors">
              <Button variant="hero" size="lg">
                For investors & partners <ArrowRight size={17} />
              </Button>
            </Link>
            <Link to="/careers" data-track="prototype_panel_careers">
              <Button variant="hero-outline" size="lg">
                Join the journey
              </Button>
            </Link>
          </div>
        </div>
        <PerspectiveShowcase />
      </div>
    </section>
  );
}

function PathwaySection() {
  return (
    <section className="section-padding border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ choose your path</p>
              <h2>Invest. Partner. Build.</h2>
            </div>
            <p className="section-side-note">
              Every visitor should know the next action: support the company,
              bring a real use case, or join the build team.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-5">
          {audiencePaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <AnimatedSection key={path.title} delay={index * 90}>
                <Link
                  to={path.href}
                  data-track={path.track}
                  className="group block h-full rounded-2xl border border-border bg-background p-7 hover:border-primary/45 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-12">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-extrabold mb-4">{path.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-7">{path.copy}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {path.action} <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding cta-section">
      <AnimatedSection>
        <div className="cta-inner">
          <div>
            <p className="eyebrow">/ make something matter</p>
            <h2>Have a challenge worth building for?</h2>
          </div>
          <Link to="/contact" className="cta-link" data-track="footer_cta_contact">
            Let's talk <ArrowRight size={18} />
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}

export default function Index() {
  return (
    <main>
      <HeroSection />
      <SignalSection />
      <PlatformSection />
      <ProofSection />
      <CapabilitySection />
      <MissionSection />
      <ProjectsSection />
      <PerspectiveSection />
      <PathwaySection />
      <CTASection />
    </main>
  );
}
