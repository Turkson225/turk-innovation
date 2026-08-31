import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { companyProfile, teamMembers } from "@/data/content";
import { ArrowRight, Camera, Download, ExternalLink, Mail, MapPin } from "lucide-react";

const logo = `${import.meta.env.BASE_URL}brand/turk-innovation-logo.png`;
const founderImage = `${import.meta.env.BASE_URL}brand/ennis-turkson-founder.jpg`;

const mediaAssets = [
  {
    title: "SmartGuard dashboard",
    label: "AI security / interface",
    image: `${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`,
    alt: "SmartGuard dashboard showing security status, camera area, and intrusion event feed",
  },
  {
    title: "GasSafe prototype",
    label: "Safety / device build",
    image: `${import.meta.env.BASE_URL}evidence/gassafe-device-front.jpg`,
    alt: "Smart Gas Detector prototype enclosure with status indicators and sensor opening",
  },
  {
    title: "Smart Power dashboard",
    label: "Energy / telemetry",
    image: `${import.meta.env.BASE_URL}evidence/smart-power-dashboard.jpg`,
    alt: "Smart Power dashboard showing electrical telemetry and relay controls",
  },
  {
    title: "UGV field chassis",
    label: "Robotics / mobility",
    image: `${import.meta.env.BASE_URL}evidence/robotics-ugv-field.jpg`,
    alt: "Outdoor unmanned ground vehicle chassis prepared for mobility testing",
  },
  {
    title: "Fixed-wing prototype",
    label: "Aerial / operations",
    image: `${import.meta.env.BASE_URL}evidence/fixed-wing-drone-prototype.jpg`,
    alt: "Fixed-wing drone prototype on an outdoor concrete surface",
  },
  {
    title: "Embedded systems kit",
    label: "Hardware / prototyping",
    image: `${import.meta.env.BASE_URL}evidence/electronics-kit-layout.jpg`,
    alt: "Embedded systems components laid out for prototyping",
  },
];

export default function Press() {
  const founder = teamMembers[0];

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <AnimatedSection>
            <p className="eyebrow"><Camera size={14} /> Press / media</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-display font-extrabold md:text-6xl lg:text-7xl">
              The story behind the <span className="text-gradient">build.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A compact media kit for people writing about Turk Innovation,
              featuring the company, the founder, and the systems taking shape
              from Ghana.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${companyProfile.email}`} data-track="press_media_contact">
                <Button variant="hero" size="xl">Media enquiries <Mail size={17} /></Button>
              </a>
              <Link to="/investors/deck" data-track="press_investor_deck" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                Request investor deck <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <img src={logo} alt="Turk Innovation logo" className="h-20 w-20 object-contain" />
              <p className="mono mt-8">Company / boilerplate</p>
              <p className="mt-4 text-xl font-display font-extrabold leading-tight">
                {companyProfile.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">/ media kit</p>
                <h2>Core assets, ready to use.</h2>
              </div>
              <p className="section-side-note">
                A clear signal for the world.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-5 md:grid-cols-2">
            <AnimatedSection delay={80}>
              <a href={logo} download="turk-innovation-logo.png" data-track="press_download_logo" className="group block rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/45">
                <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card p-8">
                  <img src={logo} alt="Turk Innovation logo preview" className="h-32 w-32 object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="mono">Brand asset</span>
                    <strong className="mt-2 block text-xl font-display font-extrabold">Turk Innovation logo</strong>
                  </div>
                  <Download size={19} className="shrink-0 text-primary" />
                </div>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={140}>
              <a href={founderImage} download="ennis-turkson-founder.jpg" data-track="press_download_founder" className="group block rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/45">
                <div className="relative min-h-48 overflow-hidden rounded-xl border border-border bg-card">
                  <img src={founderImage} alt="Ennis Turkson, founder of Turk Innovation" className="absolute inset-0 h-full w-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white">Ennis Turkson / Founder</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="mono">Portrait asset</span>
                    <strong className="mt-2 block text-xl font-display font-extrabold">Founder image</strong>
                  </div>
                  <Download size={19} className="shrink-0 text-primary" />
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-start">
          <AnimatedSection>
            <p className="eyebrow">/ company description</p>
            <h2 className="mt-3 max-w-3xl">A Ghana-born company building where the problem is close.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {companyProfile.boilerplate}
            </p>
            <div className="mt-8 border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
              Editorial note: please credit images and link to Turk Innovation
              when publishing company or project material.
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-2xl border border-border bg-card p-7">
              <p className="mono mb-6">Quick facts</p>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-primary" /><div><span className="block text-muted-foreground">Headquarters</span><strong>{companyProfile.headquarters}</strong></div></div>
                <div className="flex items-start gap-3"><ExternalLink size={17} className="mt-0.5 shrink-0 text-primary" /><div><span className="block text-muted-foreground">Founder</span><strong>{founder.name}</strong></div></div>
                <div className="flex items-start gap-3"><Camera size={17} className="mt-0.5 shrink-0 text-primary" /><div><span className="block text-muted-foreground">Focus</span><strong>Safety, infrastructure, robotics, autonomy</strong></div></div>
                <div className="flex items-start gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-primary" /><div><span className="block text-muted-foreground">Media contact</span><a href={`mailto:${companyProfile.email}`} className="font-semibold text-primary hover:text-foreground transition-colors">{companyProfile.email}</a></div></div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">/ project media</p>
                <h2>Hardware, interfaces, and field work.</h2>
              </div>
              <Link to="/projects" className="text-link" data-track="press_project_library">Browse the full project library <ArrowRight size={16} /></Link>
            </div>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mediaAssets.map((asset, index) => (
              <AnimatedSection key={asset.title} delay={index * 60}>
                <figure className="overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={asset.image} alt={asset.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <figcaption className="p-5">
                    <span className="mono">{asset.label}</span>
                    <strong className="mt-2 block text-lg font-display font-extrabold">{asset.title}</strong>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <AnimatedSection>
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 rounded-3xl border border-primary/25 bg-primary/5 p-7 md:flex-row md:items-center md:p-10">
            <div>
              <p className="mono mb-3">Media / interviews / background</p>
              <h2 className="text-3xl font-display font-extrabold">Talk to the team behind the build.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">For interviews, image requests, company background, or a technical walkthrough, contact {companyProfile.email}.</p>
            </div>
            <a href={`mailto:${companyProfile.email}`} data-track="press_final_contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground">Contact media <ArrowRight size={16} /></a>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
