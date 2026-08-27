import AnimatedSection from "@/components/AnimatedSection";

const sections = [
  {
    title: "Information we receive",
    copy:
      "If you contact us or apply for a position, we may receive your name, email address, phone number, company, portfolio link, message, selected role, and uploaded CV or resume. Application files are intended for private review only and are not displayed publicly on the website.",
  },
  {
    title: "How applications are handled",
    copy:
      "The careers form is designed to send application details and the uploaded CV to a private Google Apps Script endpoint. The endpoint can save the CV in Google Drive, attach it to a Gmail notification, and log the application in a private Google Sheet controlled by Turk Innovation.",
  },
  {
    title: "How we use submitted information",
    copy:
      "We use submitted information to respond to enquiries, review collaboration or employment applications, evaluate fit, and maintain reasonable records of conversations. We do not sell applicant information. Do not submit passwords, identity documents, bank details, or confidential customer information through this website.",
  },
  {
    title: "Analytics and cookies",
    copy:
      "This website uses Google Analytics 4 to understand visits, page views, scroll depth, engagement time, outbound clicks, social media clicks, investor actions, and application events. Analytics helps us improve the site and understand which pages visitors care about.",
  },
  {
    title: "Third-party services",
    copy:
      "The website is hosted through GitHub Pages. Careers notifications may use Google Apps Script, Google Drive, Google Sheets, and Gmail. Analytics uses Google Analytics. WhatsApp, LinkedIn, Instagram, and X links may open third-party services that process information under their own terms and policies.",
  },
  {
    title: "Website terms",
    copy:
      "Project descriptions are provided for portfolio, investor, and collaboration discussion. Prototype results are not guarantees of commercial performance. Any safety, electrical, gas, robotics, or drone deployment requires appropriate engineering review, testing, supervision, and regulatory compliance.",
  },
  {
    title: "Retention and deletion",
    copy:
      "Application and enquiry records may be retained while Turk Innovation reviews opportunities, builds a collaborator pipeline, or follows up on partnerships. Applicants can request deletion of their application details by contacting Turk Innovation at turkinnovation@gmail.com.",
  },
];

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
            {sections.map((section, index) => (
              <AnimatedSection key={section.title} delay={index * 60}>
                <article className="rounded-2xl border border-border bg-card p-7">
                  <h2 className="text-2xl font-display font-extrabold mb-4">{section.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.copy}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
