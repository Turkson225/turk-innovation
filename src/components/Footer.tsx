import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const logo = `${import.meta.env.BASE_URL}brand/turk-innovation-logo.png`;

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Investors", href: "/investors" },
  ],
  Solutions: [
    { label: "Embedded & IoT", href: "/services" },
    { label: "Safety & Monitoring", href: "/services" },
    { label: "Robotics & Autonomy", href: "/services" },
    { label: "Training & Collaboration", href: "/services" },
  ],
  Resources: [
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/projects" },
    { label: "Insights", href: "/blog" },
    { label: "Privacy & Terms", href: "/legal" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 inline-flex items-center gap-3">
              <img src={logo} alt="Turk Innovation" className="h-12 w-12 object-contain" />
              <span className="font-display font-extrabold tracking-[-0.04em]">
                TURK <span className="text-primary">INNOVATION</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              Building practical intelligent systems across AI security, IoT,
              energy visibility, robotics, drones, automation, and technical
              training from Ghana.
            </p>
            <div className="flex gap-4">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/turk-innovation-2961a9403/" },
                { label: "Instagram", href: "https://www.instagram.com/turkinnovation225/" },
                { label: "X", href: "https://x.com/TURKINNOVAgiiz" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {social.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Turk Innovation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
