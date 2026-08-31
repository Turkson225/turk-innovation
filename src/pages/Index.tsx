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
  LineChart,
  Plane,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
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

const featuredProjects = [
  {
    href: "/projects/smartguard",
    number: "01",
    category: "AI SECURITY / IOT",
    title: "SmartGuard",
    description:
      "A dual-node intelligent security and home automation ecosystem combining vision, GSM alerts, Firebase intelligence, and remote appliance control.",
    tags: ["ESP32-CAM", "HuskyLens", "Firebase"],
    image: `${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/smart-power-dashboard.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/gassafe-device-front.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/robotics-ugv-field.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/fixed-wing-drone-prototype.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/energy-panel-dashboard.jpg`,
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
    image: `${import.meta.env.BASE_URL}evidence/electronics-kit-layout.jpg`,
    tone: "cyan",
    icon: GraduationCap,
  },
];

const companyCode = [
  {
    icon: Eye,
    label: "Vision",
    title: "Build Africa's trusted physical-world technology company.",
    copy:
      "A company known for intelligent machines, safer environments, resilient infrastructure, and African engineering that can compete anywhere.",
  },
  {
    icon: Target,
    label: "Mission",
    title: "Turn real problems into intelligent systems.",
    copy:
      "We build practical hardware, firmware, dashboards, and autonomous platforms for safety, energy, mobility, operations, and technical learning.",
  },
  {
    icon: ShieldCheck,
    label: "Values",
    title: "Proof. Discipline. Usefulness. Courage.",
    copy:
      "We build before we boast, measure before we claim, design for difficult conditions, and keep every system close to a real human need.",
  },
];

const flagshipLayers = [
  { icon: Eye, label: "Sense", copy: "Vision and presence detection at the edge." },
  { icon: Cpu, label: "Decide", copy: "Local rules that keep the first response close." },
  { icon: Radio, label: "Connect", copy: "GSM alerts, cloud evidence, and operator visibility." },
  { icon: Bot, label: "Act", copy: "Alarms, relays, and appliance control." },
];

const smartGuardPilot = {
  target: "Homes, small offices, student hostels, and shops",
  environment:
    "Indoor spaces with local power, Wi-Fi, and GSM coverage. The pilot tests local response first and cloud visibility second.",
  pathway: [
    "Review the site, risk, and existing safety workflow",
    "Install and baseline the two-node prototype",
    "Run controlled detection, alert, relay, and fallback tests",
    "Capture feedback and define the next hardening cycle",
  ],
  limitations:
    "Prototype only. Enclosure hardening, power protection, calibration, false-alert testing, privacy review, and independent safety validation remain before production use.",
};

const proofCards = [
  {
    icon: Terminal,
    value: "7+",
    label: "working systems and product directions",
    note: "AI security, energy monitoring, gas safety, relay control, robotics, drones, and training moving through one product pipeline.",
  },
  {
    icon: LineChart,
    value: "2-5 s",
    label: "observed relay response window",
    note: "SmartGuard automation tests define the current control-response benchmark.",
  },
  {
    icon: Eye,
    value: "1 m",
    label: "observed AI face-detection range",
    note: "HuskyLens testing establishes the present perception range for SmartGuard validation.",
  },
  {
    icon: Rocket,
    value: "3",
    label: "commercial directions",
    note: "Safety automation, connected infrastructure, and robotics/autonomous operations guide the company roadmap.",
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

function CompanyCodeSection() {
  const stats = [
    { value: "7+ tracks", label: "Real builds documented" },
    { value: "2-5 s", label: "Observed relay response" },
    { value: "3 pillars", label: "Focused company direction" },
    { value: "Ghana to Global", label: "Point of view" },
  ];

  return (
    <section id="signal" className="signal-section section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-intro">
            <p className="eyebrow">/ company code</p>
            <h2>
              Vision, mission, and values for
              <span className="text-gradient"> machines built in the real world.</span>
            </h2>
            <p>
              Turk Innovation exists to build technology that leaves the screen
              and works where people live, recover, monitor, operate, learn, and
              protect what matters.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {companyCode.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={index * 90}>
                <article className="h-full rounded-2xl border border-border bg-background/75 p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.06)]">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="mono text-primary">{item.label}</span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </article>
              </AnimatedSection>
            );
          })}
        </div>

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

function FlagshipSection() {
  return (
    <section id="flagship" className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">/ flagship system</p>
              <h2>
                One clear spearhead:
                <span className="text-gradient"> SmartGuard.</span>
              </h2>
            </div>
            <p className="section-side-note">
              A system built for the moment that matters.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="overflow-hidden rounded-[2rem] border border-primary/25 bg-[#0F172A] text-white shadow-[0_30px_100px_hsl(var(--primary)/0.14)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[28rem] overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`}
                  alt="SmartGuard dashboard showing security monitoring and intrusion events"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
                <div className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  <span>Flagship / 01</span>
                  <span className="inline-flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" /> Validation phase</span>
                </div>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#38BDF8]">AI security / IoT</p>
                  <p className="mt-3 max-w-md text-3xl font-display font-extrabold leading-tight md:text-5xl">
                    Make the first decision close to the sensor.
                  </p>
                </div>
              </div>

              <div className="p-7 md:p-10 lg:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#38BDF8]">SmartGuard / product thesis</p>
                <h3 className="mt-5 text-3xl font-display font-extrabold leading-tight md:text-4xl">
                  Security that can see, decide, connect, and act.
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
                  SmartGuard brings AI vision, GSM alerts, cloud evidence, and
                  appliance control into one modular system. It is the current
                  spearhead for proving how Turk Innovation turns a real safety
                  problem into a complete physical-world product.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {flagshipLayers.map((layer) => {
                    const Icon = layer.icon;
                    return (
                      <div key={layer.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <Icon size={17} className="text-[#38BDF8]" />
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">{layer.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{layer.copy}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 grid grid-cols-3 border-y border-white/10 py-5">
                  <div>
                    <strong className="block text-xl font-display text-[#38BDF8]">≈ 1 m</strong>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-white/50">observed detection</span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <strong className="block text-xl font-display text-[#38BDF8]">2–5 s</strong>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-white/50">relay response</span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <strong className="block text-xl font-display text-[#38BDF8]">GSM</strong>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-white/50">local fallback</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">Target users</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{smartGuardPilot.target}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">Operating environment</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{smartGuardPilot.environment}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-[#38BDF8]/25 bg-[#38BDF8]/[0.06] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#38BDF8]">First pilot / controlled environment</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">04 steps</span>
                  </div>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                    {smartGuardPilot.pathway.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-relaxed text-white/75">
                        <span className="font-mono text-xs text-[#38BDF8]">{String(index + 1).padStart(2, "0")}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-white/50">
                  <span className="font-semibold text-white/70">Current limitations:</span> {smartGuardPilot.limitations}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact?inquiry=SmartGuard%20pilot" data-track="flagship_pilot_request">
                    <Button variant="hero" size="default">Request a SmartGuard pilot <ArrowRight size={16} /></Button>
                  </Link>
                  <Link to="/projects/smartguard" data-track="flagship_case_study">
                    <Button variant="hero-outline" size="default">Open case study <ArrowRight size={16} /></Button>
                  </Link>
                  <Link to="/investors/deck" data-track="flagship_investor_deck" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-[#38BDF8] hover:text-white">
                    Request the deck <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
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
              See what is real.
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

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="mono mb-4">Verified now</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Working prototypes, live dashboards, assembled hardware, and
                observed bench measurements anchor the current story.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={90}>
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6">
              <p className="mono mb-4">Next proof gate</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                No external customer or deployment claim is published yet. The
                next proof is a controlled SmartGuard pilot with repeatable
                reliability, safety, and user feedback data.
              </p>
            </div>
          </AnimatedSection>
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
              <p className="eyebrow">/ product lines</p>
              <h2>One platform. Several ways to deploy it.</h2>
            </div>
            <p className="section-side-note">
              One core. Many deployments.
            </p>
            <Link to="/projects" className="text-link" data-track="view_all_projects">
              View all projects <ArrowUpRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="project-grid">
          {[featuredProjects[0], featuredProjects[1], featuredProjects[3]].map((project, index) => {
            const Icon = project.icon;
            return (
              <AnimatedSection key={project.title} delay={index * 100}>
                <Link to={project.href} className={`group project-card ${project.tone}`} data-track="homepage_project_card" data-track-label={project.title}>
                  <div className="project-card-visual">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} project evidence`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <>
                        <div className="project-card-glow" />
                        <div className="project-card-orbit orbit-one" />
                        <div className="project-card-orbit orbit-two" />
                        <Icon size={72} strokeWidth={1} />
                      </>
                    )}
                    {project.image && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/10 to-transparent" />}
                    <span className="project-number z-10">{project.number}</span>
                    <span className="project-open z-10">
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
              Choose where you enter.
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
      <CompanyCodeSection />
      <FlagshipSection />
      <ProofSection />
      <ProjectsSection />
      <PathwaySection />
      <CTASection />
    </main>
  );
}
