const GA_MEASUREMENT_ID = "G-8B7RBZXTZ9";

type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      target: string,
      params?: AnalyticsParams,
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  params: AnalyticsParams = {},
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackPageView(pathname: string): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
  });
}

export { GA_MEASUREMENT_ID };
