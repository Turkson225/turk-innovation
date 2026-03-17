import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="mono">Insights</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3 mb-6">
              Blog & <span className="glow-text">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-12">
              Thoughts on technology, innovation, and the future — from our team.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 80}>
                <article className="group p-6 rounded-xl border border-border bg-card hover:glow-border transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="mono text-[10px]">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted" />
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground">· {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <AnimatedSection>
            <span className="mono mb-4 block">Stay Informed</span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Get the latest insights on AI, technology, and innovation delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-all"
              >
                Subscribe
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
