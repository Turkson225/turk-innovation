import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch soon.");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <AnimatedSection>
                <span className="mono">Contact</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-3 mb-6">
                  Let's Build <span className="glow-text">Together</span>
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Whether you're interested in partnering, investing, or exploring
                  how our technology can transform your business — we'd love to
                  hear from you.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">hello@turkinnovation.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Headquarters</p>
                      <p className="font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={150}>
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl border border-border bg-card space-y-5"
              >
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Company</label>
                  <input
                    type="text"
                    maxLength={100}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project or partnership idea..."
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit">
                  Send Message <ArrowRight size={16} />
                </Button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
