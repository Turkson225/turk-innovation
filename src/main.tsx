import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackEvent } from "./lib/analytics";

// GitHub Pages fallback: restore the original route after 404.html redirects here.
const redirectPath = new URLSearchParams(window.location.search).get("p");
if (redirectPath) {
  window.history.replaceState(null, "", decodeURIComponent(redirectPath));
}

const socialPlatforms: Record<string, string> = {
  "linkedin.com": "linkedin",
  "github.com": "github",
  "wa.me": "whatsapp",
  "whatsapp.com": "whatsapp",
};

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element
    ? event.target.closest("a")
    : null;

  if (!(target instanceof HTMLAnchorElement) || !target.href) return;

  const destination = new URL(target.href, window.location.href);
  if (destination.origin === window.location.origin) return;

  const host = destination.hostname.replace(/^www\\./, "");
  const platform = Object.entries(socialPlatforms).find(([domain]) =>
    host === domain || host.endsWith(`.${domain}`),
  )?.[1];
  const linkText = target.textContent?.trim().slice(0, 80) || "Unlabelled link";

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
