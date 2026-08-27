import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./showcase-animations.css";
import { trackEvent } from "./lib/analytics";

// GitHub Pages fallback: restore the original route after 404.html redirects here.
const redirectPath = new URLSearchParams(window.location.search).get("p");
if (redirectPath) {
  window.history.replaceState(null, "", decodeURIComponent(redirectPath));
}

const socialPlatforms: Record<string, string> = {
  "linkedin.com": "linkedin",
  "instagram.com": "instagram",
  "x.com": "x",
  "twitter.com": "x",
  "wa.me": "whatsapp",
  "whatsapp.com": "whatsapp",
};

const trackedPaths: Record<string, string> = {
  "/investors": "investor_path_click",
  "/careers": "career_path_click",
  "/contact": "contact_path_click",
  "/projects": "project_path_click",
};

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element
    ? event.target.closest("a, button")
    : null;

  if (!(target instanceof HTMLElement)) return;

  const explicitTrack = target.dataset.track || target.closest<HTMLElement>("[data-track]")?.dataset.track;
  const explicitLabel = target.dataset.trackLabel || target.textContent?.trim().slice(0, 80) || "Unlabelled action";

  if (explicitTrack) {
    trackEvent("cta_click", {
      cta_name: explicitTrack,
      cta_label: explicitLabel,
      page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    });
  }

  if (!(target instanceof HTMLAnchorElement) || !target.href) return;

  const destination = new URL(target.href, window.location.href);
  const linkText = target.textContent?.trim().slice(0, 80) || "Unlabelled link";

  if (destination.origin === window.location.origin) {
    const matchingPath = Object.entries(trackedPaths).find(([path]) =>
      destination.pathname.endsWith(path) || destination.pathname.includes(`${path}/`),
    );

    if (matchingPath) {
      trackEvent(matchingPath[1], {
        link_url: destination.href,
        link_text: linkText,
      });
    }
    return;
  }

  const host = destination.hostname.replace(/^www\./, "");
  const platform = Object.entries(socialPlatforms).find(([domain]) =>
    host === domain || host.endsWith(`.${domain}`),
  )?.[1];

  trackEvent("outbound_click", {
    link_url: destination.href,
    link_text: linkText,
  });

  if (platform) {
    trackEvent("social_click", {
      platform,
      link_url: destination.href,
      link_text: linkText,
    });
  }
}, true);

createRoot(document.getElementById("root")!).render(<App />);
