import AnimatedSection from "@/components/AnimatedSection";

export default function Legal() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="mono">Trust & transparency</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mt-3 mb-6">
              Privacy & terms
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              This page explains how Turk Innovation currently handles
              information submitted through this website. It is a practical
              starting point and should be reviewed by a qualified legal
              professional before the company begins collecting information at
              scale.
            </p>
          </AnimatedSection>

          <div className="mt-14 space-y-10">
            <AnimatedSection>
              <article className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-2xl font-display font-extrabold mb-4">Information we receive</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you contact us or apply for a position, we may receive your
                  name, email address, phone number, portfolio or CV link, and
                  the message you choose to send. The careers form may forward
                  application details to the Turk Innovation careers inbox and
                  an optional private Google Sheet.
                </p>
              </article>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <article className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-2xl font-display font-extrabold mb-4">How we use it</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use submitted information to respond to enquiries, review
                  collaboration or employment applications, and maintain
                  reasonable records of conversations. We do not sell applicant
                  information. Do not submit passwords, identity documents, or
                  confidential customer information through this website.
                </p>
              </article>
            </AnimatedSection>

            <AnimatedSection delay={160}>
              <article className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-2xl font-display font-extrabold mb-4">Third-party services</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The website is hosted through GitHub Pages. Careers
                  notifications may use Google Apps Script and Gmail. Those
                  services process information according to their own terms and
                  privacy policies. The website does not currently provide user
                  accounts or collect payment information.
                </p>
              </article>
            </AnimatedSection>

            <AnimatedSection delay={240}>
              <article className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-2xl font-display font-extrabold mb-4">Website terms</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Project descriptions are provided for portfolio and
                  collaboration discussion. Prototype results are not guarantees
                  of commercial performance. Any safety, electrical, gas,
                  robotics, or drone deployment requires appropriate engineering
                  review, testing, supervision, and regulatory compliance.
                </p>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
