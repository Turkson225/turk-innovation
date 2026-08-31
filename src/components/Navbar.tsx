import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
const logo = `${import.meta.env.BASE_URL}brand/turk-innovation-logo.png`;

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Capabilities", href: "/services" },
  { label: "Investors", href: "/investors" },
  { label: "Media", href: "/press" },
  { label: "Reviews", href: "/reviews" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Turk Innovation" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <span className="hidden sm:block font-display font-extrabold text-sm tracking-[-0.03em]">
            TURK <span className="text-primary">INNOVATION</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[11px] font-mono uppercase tracking-[0.12em] transition-colors duration-200 hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link to="/contact" data-track="nav_partner_cta">
            <Button variant="hero" size="default">
              Partner with us
            </Button>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-in">
          <div className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-mono uppercase tracking-[0.12em] py-2 transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2" data-track="mobile_nav_contact">
              <Button variant="hero" size="lg" className="w-full">
                Start a conversation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
