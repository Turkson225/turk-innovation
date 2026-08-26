import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircuitBoard,
  Cpu,
  Flame,
  GraduationCap,
  Eye,
  Gauge,
  Layers3,
  Plane,
  Radio,
  ShieldCheck,
  Sparkles,
  Terminal,
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
    eyebrow: "01 / EMBEDDED INTELLIGENCE",
    title: "Hardware that thinks.",
    copy: "From ESP32 and Arduino prototypes to connected devices that sense, decide, and respond in the real world.",
  },
  {
    icon: Layers3,
    eyebrow: "02 / SYSTEM ARCHITECTURE",
    title: "Systems that connect.",
    copy: "Cloud dashboards, Firebase data flows, alerts, automation, and hardware designed as one dependable experience.",
  },
  {
    icon: Radio,
    eyebrow: "03 / AUTONOMOUS OPERATIONS",
    title: "Machines that move.",
    copy: "Robotics, drones, vision systems, and operational tooling built around safety, clarity, and field learning.",
  },
];

function StatusPill() {
  return (
    <div className="status-pill">
      <span className="status-dot" />
      <span>Building from Ghana · Working globally</span>
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
              Turk Innovation / Applied technology studio
            </p>
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <h1>
              We build the
              <span className="hero-gradient"> systems </span>
              that move tomorrow.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={240}>
            <p className="hero-description">
              Real-world engineering across AI security, IoT, energy,
              robotics, drones, and automation — turning ambitious ideas into
              working systems people can trust.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={320}>
            <div className="hero-actions">
              <Link to="/projects">
                <Button variant="hero" size="xl">
                  Explore the work
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="xl">
                  Start a conversation
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="hero-footnote">
              <span>01</span>
              <span className="hero-footnote-line" />
              <span>From first circuit to field-ready platform</span>
            </div>
          </AnimatedSection>
        </div>

      </div>

      <a className="scroll-cue" href="#signal">
        <span>Scroll to explore</span>
        <ArrowDownRight size={16} />
      </a>
    </section>
  );
}

function SignalSection() {
  const stats = [
    { value: "7+ systems", label: "Real builds documented" },
    { value: "2–5 s", label: "Observed relay response" },
    { value: "3 pillars", label: "Focused company direction" },
    { value: "Ghana → Global", label: "Point of view" },
  ];

  return (
    <section id="signal" className="signal-section section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-intro">
            <p className="eyebrow">/ the signal</p>
            <h2>
              Engineering with
              <span className="text-gradient"> a point of view.</span>
            </h2>
            <p>
              Turk Innovation is a growing portfolio of practical experiments,
              deployed systems, and product directions built around one belief:
              technology matters most when it works beyond the screen. Every
              project is being documented with its stage, observed performance,
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

function CapabilitySection() {
  return (
    <section className="section-padding capability-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ how we build</p>
              <h2>Small teams. Serious systems.</h2>
            </div>
            <p className="section-side-note">
              Explore the intersection of electronics, software, autonomy, and
              human-centered design.
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
            <Link to="/projects" className="text-link">
              View all projects <ArrowUpRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="project-grid">
          {featuredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <AnimatedSection key={project.title} delay={index * 100}>
                <Link to="/projects" className={`project-card ${project.tone}`}>
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

function PerspectiveShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % perspectiveSlides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  const active = perspectiveSlides[activeSlide];

  return (
    <div className="perspective-showcase" aria-label="Turk Innovation project showcase">
      <div className="showcase-slides" aria-hidden="true">
        {perspectiveSlides.map((slide, index) => (
          <img
            key={slide.image}
            className={`showcase-slide ${index === activeSlide ? "is-active" : ""}`}
            src={slide.image}
            alt=""
          />
        ))}
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
            <Link to="/investors">
              <Button variant="hero" size="lg">
                For investors & partners <ArrowRight size={17} />
              </Button>
            </Link>
            <Link to="/careers">
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

function CTASection() {
  return (
    <section className="section-padding cta-section">
      <AnimatedSection>
        <div className="cta-inner">
          <div>
            <p className="eyebrow">/ make something matter</p>
            <h2>Have a challenge worth building for?</h2>
          </div>
          <Link to="/contact" className="cta-link">
            Let&apos;s talk <ArrowRight size={18} />
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
      <CapabilitySection />
      <ProjectsSection />
      <PerspectiveSection />
      <CTASection />
    </main>
  );
}
