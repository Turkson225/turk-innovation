const GA_MEASUREMENT_ID = "G-8B7RBZXTZ9";

type AnalyticsValue = string | number | boolean | null;
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

function cleanParams(params: AnalyticsParams): AnalyticsParams {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as AnalyticsParams;
}

export function trackEvent(
  eventName: string,
  params: AnalyticsParams = {},
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, cleanParams(params));
}

export function trackPageView(pathname: string): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
  });
}

export { GA_MEASUREMENT_ID };
