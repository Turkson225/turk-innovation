type LeadFields = Record<string, string | undefined>;

const endpoint = import.meta.env.VITE_CAREERS_APPS_SCRIPT_URL;

export async function submitLead(fields: LeadFields): Promise<boolean> {
  if (!endpoint) return false;

  const payload = new URLSearchParams();
  payload.set("formType", "lead");

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) payload.set(key, value);
  });

  payload.set("submittedAt", new Date().toISOString());
  payload.set("sourcePage", typeof window === "undefined" ? "" : window.location.href);

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    body: payload,
  });

  return true;
}
