import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  FileImage,
  MapPin,
  MessageSquareQuote,
  Send,
  ShieldCheck,
  Star,
  Upload,
} from "lucide-react";

type PublishedReview = {
  id: string;
  name: string;
  location: string;
  project: string;
  rating: number;
  quote: string;
  image?: string;
  imageAlt?: string;
};

type ReviewPhoto = {
  file: File;
  dataUrl: string;
  base64: string;
};

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

// Reviews are added here only after the contributor has consented and Turk Innovation
// has approved the submission. Keeping this empty is intentional until real reviews exist.
const publishedReviews: PublishedReview[] = [];

const prototypeGallery = [
  {
    title: "SmartGuard security interface",
    label: "AI security / working build",
    image: `${import.meta.env.BASE_URL}evidence/smartguard-dashboard.jpg`,
    alt: "SmartGuard security dashboard showing camera status and event activity",
  },
  {
    title: "GasSafe IoT device",
    label: "Safety / physical prototype",
    image: `${import.meta.env.BASE_URL}evidence/gassafe-device-front.jpg`,
    alt: "GasSafe IoT gas detection and shutoff prototype enclosure",
  },
  {
    title: "UGV field chassis",
    label: "Robotics / mobility test",
    image: `${import.meta.env.BASE_URL}evidence/robotics-ugv-field.jpg`,
    alt: "Unmanned ground vehicle chassis prepared for outdoor mobility testing",
  },
  {
    title: "Power monitoring dashboard",
    label: "Energy / live telemetry",
    image: `${import.meta.env.BASE_URL}evidence/smart-power-dashboard.jpg`,
    alt: "Smart Power Monitoring dashboard showing electrical measurements and relay controls",
  },
  {
    title: "Fixed-wing flight system",
    label: "Aerial / prototype operations",
    image: `${import.meta.env.BASE_URL}evidence/fixed-wing-drone-prototype.jpg`,
    alt: "Fixed-wing drone prototype prepared for field operations",
  },
  {
    title: "Embedded systems build kit",
    label: "Hardware / engineering bench",
    image: `${import.meta.env.BASE_URL}evidence/electronics-kit-layout.jpg`,
    alt: "Embedded systems components arranged for hands-on prototyping",
  },
];

const MAX_PHOTOS = 3;
const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const MAX_TOTAL_PHOTO_SIZE = 5 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const projectOptions = projects.map((project) => project.title);

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not preview the image file."));
    reader.readAsDataURL(file);
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-secondary" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} fill={star <= rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState<ReviewPhoto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  const handlePhotoChange = async (fileList: FileList | null) => {
    const selectedFiles = Array.from(fileList || []);

    if (!selectedFiles.length) {
      setPhotos([]);
      return;
    }

    if (selectedFiles.length > MAX_PHOTOS) {
      setSubmitState({
        type: "error",
        message: `Please choose no more than ${MAX_PHOTOS} prototype photos.`,
      });
      return;
    }

    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const invalidType = selectedFiles.find(
      (file) => !ACCEPTED_PHOTO_TYPES.includes(file.type),
    );
    const oversizedFile = selectedFiles.find((file) => file.size > MAX_PHOTO_SIZE);

    if (invalidType) {
      trackEvent("review_photo_rejected", { reason: "type" });
      setSubmitState({
        type: "error",
        message: "Please use JPG, PNG, or WebP images only.",
      });
      return;
    }

    if (oversizedFile || totalSize > MAX_TOTAL_PHOTO_SIZE) {
      trackEvent("review_photo_rejected", { reason: "size" });
      setSubmitState({
        type: "error",
        message: "Keep each image under 2 MB and the total upload under 5 MB.",
      });
      return;
    }

    try {
      const nextPhotos = await Promise.all(
        selectedFiles.map(async (file) => ({
          file,
          dataUrl: await fileToDataUrl(file),
          base64: await fileToBase64(file),
        })),
      );

      trackEvent("review_photo_selected", { photo_count: nextPhotos.length });
      setPhotos(nextPhotos);
      setSubmitState({ type: "idle", message: "" });
    } catch {
      setSubmitState({
        type: "error",
        message: "One of the images could not be read. Please try again.",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_CAREERS_APPS_SCRIPT_URL;
    const form = event.currentTarget;

    if (!endpoint) {
      trackEvent("review_submit_error", { reason: "missing_endpoint" });
      setSubmitState({
        type: "error",
        message:
          "The review form is ready, but the Google notification endpoint still needs to be connected.",
      });
      return;
    }

    if (!rating) {
      trackEvent("review_submit_error", { reason: "missing_rating" });
      setSubmitState({
        type: "error",
        message: "Please choose a star rating before sending your review.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const formData = new FormData(form);
    const payload = new URLSearchParams();
    payload.set("formType", "review");
    payload.set("fullName", String(formData.get("fullName") || ""));
    payload.set("email", String(formData.get("email") || ""));
    payload.set("location", String(formData.get("location") || ""));
    payload.set("project", String(formData.get("project") || ""));
    payload.set("rating", String(rating));
    payload.set("experience", String(formData.get("experience") || ""));
    payload.set("publicConsent", formData.get("publicConsent") ? "yes" : "");
    payload.set("submittedAt", new Date().toISOString());
    payload.set("sourcePage", window.location.href);

    photos.forEach((photo, index) => {
      const photoNumber = index + 1;
      payload.set(`photo${photoNumber}Base64`, photo.base64);
      payload.set(`photo${photoNumber}FileName`, photo.file.name);
      payload.set(`photo${photoNumber}MimeType`, photo.file.type);
      payload.set(`photo${photoNumber}SizeBytes`, String(photo.file.size));
    });

    try {
      trackEvent("review_submit", {
        project: String(formData.get("project") || ""),
        rating,
        photo_count: photos.length,
      });

      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      trackEvent("review_submit_success", {
        rating,
        photo_count: photos.length,
      });
      setSubmitState({
        type: "success",
        message:
          "Thank you — your review has been received and is now pending moderation.",
      });
      form.reset();
      setRating(0);
      setPhotos([]);
    } catch {
      trackEvent("review_submit_error", { reason: "fetch_failed" });
      setSubmitState({
        type: "error",
        message: "We could not send the review. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-end">
          <AnimatedSection>
            <p className="eyebrow">
              <MessageSquareQuote size={14} />
              Client voice / field notes
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-display font-extrabold md:text-6xl lg:text-7xl">
              The work matters when it works for <span className="text-gradient">people.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              If Turk Innovation has built, tested, or improved something for you,
              share what the experience was like. Your words and field images help
              future partners see the work in its real environment.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#share-review" data-track="review_share_cta">
                <Button variant="hero" size="xl">
                  Share your experience <ArrowRight size={17} />
                </Button>
              </a>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                Explore the builds <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_25px_80px_hsl(var(--primary)/0.08)]">
              <p className="mono">A considered record</p>
              <div className="mt-8 space-y-6">
                {[
                  ["01", "Real experience", "Feedback from people who have seen the system work."],
                  ["02", "Clear attribution", "Name, location, and project context make every voice useful."],
                  ["03", "Responsible proof", "Every submission is reviewed before it becomes public."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="flex gap-4">
                    <span className="font-mono text-xs text-primary">{number}</span>
                    <div>
                      <strong className="block font-display text-lg font-extrabold">{title}</strong>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="published-reviews" className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">/ approved reviews</p>
                <h2>What the field says.</h2>
              </div>
              <p className="section-side-note">
                Reviews appear here only after the contributor gives permission
                and Turk Innovation confirms the submission.
              </p>
            </div>
          </AnimatedSection>

          {publishedReviews.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publishedReviews.map((review, index) => (
                <AnimatedSection key={review.id} delay={index * 70}>
                  <article className="h-full rounded-2xl border border-border bg-background p-6">
                    {review.image && (
                      <img
                        src={review.image}
                        alt={review.imageAlt || `${review.project} prototype`}
                        className="mb-6 aspect-[4/3] w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    )}
                    <StarRating rating={review.rating} />
                    <blockquote className="mt-5 text-lg font-display font-bold leading-relaxed">
                      “{review.quote}”
                    </blockquote>
                    <div className="mt-7 flex items-start gap-3 border-t border-border pt-5">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                      <div>
                        <strong className="block text-sm">{review.name}</strong>
                        <span className="text-sm text-muted-foreground">
                          {review.location} · {review.project}
                        </span>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection delay={100}>
              <div className="rounded-3xl border border-dashed border-primary/35 bg-background p-8 md:p-12">
                <div className="max-w-2xl">
                  <MessageSquareQuote size={28} className="text-primary" />
                  <p className="mono mt-8">The first voices are being collected</p>
                  <h3 className="mt-3 text-3xl font-display font-extrabold md:text-4xl">
                    No public reviews yet. That is intentional.
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We will not fill this space with invented praise. Approved
                    experiences from real project partners will appear here with
                    their name, location, rating, and working-prototype images.
                  </p>
                  <a href="#share-review" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground" data-track="review_empty_state_cta">
                    Be part of the first published stories <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section id="share-review" className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-14 items-start">
          <AnimatedSection>
            <p className="eyebrow">/ share your experience</p>
            <h2 className="mt-3 max-w-xl">Tell the story from your side.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Leave a rating, describe what was built, and add photographs of the
              working prototype. Your email is used for private follow-up; the
              public details are published only with your consent.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck size={17} className="mt-0.5 shrink-0 text-primary" />
                <span>Private intake, human moderation, and explicit publishing consent.</span>
              </div>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <Camera size={17} className="mt-0.5 shrink-0 text-primary" />
                <span>Upload up to three JPG, PNG, or WebP images of the prototype in use.</span>
              </div>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <MapPin size={17} className="mt-0.5 shrink-0 text-primary" />
                <span>Your name and location give future partners meaningful context.</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-6 shadow-[0_20px_70px_hsl(var(--primary)/0.08)] md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="form-field">
                  <span>Full name *</span>
                  <input name="fullName" required placeholder="Your name" />
                </label>
                <label className="form-field">
                  <span>Email address *</span>
                  <input name="email" type="email" required placeholder="you@example.com" />
                </label>
                <label className="form-field">
                  <span>Location *</span>
                  <input name="location" required placeholder="Accra, Ghana" />
                </label>
                <label className="form-field">
                  <span>Project *</span>
                  <select name="project" required defaultValue="">
                    <option value="">Select a project</option>
                    {projectOptions.map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="mt-6">
                <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Star rating *
                </legend>
                <div className="mt-3 flex items-center gap-1" role="radiogroup" aria-label="Choose a star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-label={`${star} star${star === 1 ? "" : "s"}`}
                      aria-checked={rating === star}
                      onClick={() => {
                        setRating(star);
                        setSubmitState({ type: "idle", message: "" });
                      }}
                      className={`rounded-md p-1 transition-colors hover:text-secondary ${star <= rating ? "text-secondary" : "text-muted-foreground/35"}`}
                    >
                      <Star size={27} fill={star <= rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-muted-foreground">
                    {rating ? `${rating} / 5` : "Select a rating"}
                  </span>
                </div>
              </fieldset>

              <label className="form-field mt-6">
                <span>Your experience *</span>
                <textarea
                  name="experience"
                  required
                  rows={6}
                  placeholder="What did Turk Innovation build or improve, and how was the experience?"
                />
              </label>

              <label className="form-field mt-6">
                <span>Working prototype photos</span>
                <input
                  name="reviewPhotos"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => void handlePhotoChange(event.target.files)}
                />
                <small className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                  Optional · up to 3 images · JPG, PNG, or WebP · 2 MB per image, 5 MB total
                </small>
              </label>

              {photos.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-3" aria-label="Selected prototype photos">
                  {photos.map((photo) => (
                    <div key={`${photo.file.name}-${photo.file.lastModified}`} className="overflow-hidden rounded-xl border border-border bg-background">
                      <img src={photo.dataUrl} alt={`Selected preview: ${photo.file.name}`} className="aspect-square w-full object-cover" />
                      <p className="truncate px-2 py-2 text-[10px] text-muted-foreground">{photo.file.name}</p>
                    </div>
                  ))}
                </div>
              )}

              <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                <input name="publicConsent" type="checkbox" required className="mt-0.5 accent-[hsl(var(--primary))]" />
                <span>
                  I give Turk Innovation permission to publish my name, location,
                  star rating, experience, and any approved prototype photos on
                  its website. I understand my email will remain private.
                </span>
              </label>

              {submitState.type !== "idle" && (
                <div className={`form-notice ${submitState.type}`} role="status">
                  {submitState.type === "success" ? <CheckCircle2 size={17} /> : <Upload size={17} />}
                  <span>{submitState.message}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                data-track="review_submit_button"
                className="mt-6 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending review..." : "Send review"}
                <Send size={16} />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">/ build evidence</p>
                <h2>Working systems, not stock imagery.</h2>
              </div>
              <p className="section-side-note">
                These images show Turk Innovation prototypes and engineering work.
                They are evidence of the build—not customer endorsements.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {prototypeGallery.map((asset, index) => (
              <AnimatedSection key={asset.title} delay={index * 60}>
                <figure className="overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={asset.image}
                      alt={asset.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-5">
                    <span className="mono">{asset.label}</span>
                    <strong className="mt-2 block text-lg font-display font-extrabold">{asset.title}</strong>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={120}>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:flex-row md:items-center">
              <div className="flex items-start gap-3">
                <FileImage size={19} className="mt-0.5 shrink-0 text-primary" />
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Looking for a deeper technical record? Explore the full case-study
                  library, including system architecture, observed results, and next validation steps.
                </p>
              </div>
              <Link to="/projects" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-foreground">
                View project evidence <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
