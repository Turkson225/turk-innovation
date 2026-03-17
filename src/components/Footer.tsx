import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Solutions: [
    { label: "AI Solutions", href: "/services" },
    { label: "Drone Technology", href: "/services" },
    { label: "Logistics", href: "/services" },
    { label: "Healthcare", href: "/services" },
  ],
  Resources: [
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/projects" },
    { label: "Insights", href: "/blog" },
    { label: "Partnerships", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-extrabold text-primary-foreground text-sm">
                T
              </div>
              <span className="font-display font-extrabold text-lg">
                Turk Innovation
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              Building impactful solutions across industries. AI, drones,
              logistics, healthcare, and emerging technologies.
            </p>
            <div className="flex gap-4">
              {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {social}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
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
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
