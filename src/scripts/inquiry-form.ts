/**
 * Inquiry form behaviour. Native constraint checks give fast, localized feedback;
 * the server's strict zod schema (src/lib/inquiry.ts) remains the authority.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasControl = (v: string) =>
  [...v].some((c) => c.charCodeAt(0) < 32 && ![9, 10, 13].includes(c.charCodeAt(0)));

export default function init(host: HTMLElement) {
  const form = host.querySelector("form");
  const success = host.querySelector<HTMLElement>(".inquiry-success");
  const alert = host.querySelector<HTMLElement>("[data-form-alert]");
  const label = host.querySelector<HTMLElement>("[data-submit-label]");
  const fieldset = form?.querySelector("fieldset");
  const button = form?.querySelector<HTMLButtonElement>("button[type=submit]");
  if (!form || !success || !alert || !label || !fieldset || !button) return;
  const msg = (key: string) => host.dataset[`msg${key[0].toUpperCase()}${key.slice(1)}`] || "";
  const sendLabel = label.textContent || "";
  const email = form.querySelector("a[href^='mailto:']")?.getAttribute("href") || "";
  let busy = false;

  const clear = (el: HTMLElement) => {
    el.removeAttribute("aria-invalid");
    document.getElementById(`error-${el.id}`)?.remove();
    const hint = el.id === "inquiry-brief" ? "brief-hint" : "";
    if (hint) el.setAttribute("aria-describedby", hint);
    else el.removeAttribute("aria-describedby");
  };
  const flag = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    clear(el);
    el.setAttribute("aria-invalid", "true");
    const error = document.createElement("span");
    error.id = `error-${el.id}`;
    error.className = "field-error";
    error.textContent = el.dataset.msg || msg("invalid");
    const container = el.type === "checkbox" ? el.closest("label")! : el;
    container.insertAdjacentElement("afterend", error);
    el.setAttribute(
      "aria-describedby",
      [el.id === "inquiry-brief" ? "brief-hint" : "", error.id].filter(Boolean).join(" "),
    );
  };
  const showAlert = (kind: "validation" | "error" | "rate") => {
    alert.hidden = false;
    alert.textContent = msg(kind);
    if (kind !== "validation") {
      const link = document.createElement("a");
      link.href = email || "mailto:sales@prohealthdigitalllc.com";
      link.dir = "ltr";
      link.textContent = link.href.replace("mailto:", "");
      alert.append(" ", link);
    }
  };

  form.addEventListener("input", (e) => {
    const el = e.target as HTMLElement;
    if (el.getAttribute("aria-invalid") === "true") clear(el);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy) return;
    alert.hidden = true;
    const controls = Array.from(
      form.querySelectorAll<HTMLInputElement>("input, select, textarea"),
    ).filter((el) => el.name && el.name !== "website");
    const invalid = controls.filter((el) => {
      clear(el);
      const value = el.type === "checkbox" ? "" : el.value.trim();
      if (!el.checkValidity()) return true;
      if (el.type === "email" && !EMAIL_RE.test(value)) return true;
      if (["text", "textarea", "email"].includes(el.type) && hasControl(el.value)) return true;
      if (el.minLength > 0 && value.length < el.minLength) return true;
      return false;
    });
    if (invalid.length) {
      invalid.forEach(flag);
      showAlert("validation");
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    const value = (k: string) => String(data.get(k) ?? "").trim();
    const body = {
      name: value("name"),
      email: value("email"),
      organization: value("organization"),
      organizationType: value("organizationType"),
      engagement: value("engagement"),
      stage: value("stage"),
      country: value("country"),
      timezone: value("timezone"),
      brief: value("brief"),
      language: value("language"),
      locale: host.dataset.locale,
      budget: value("budget") || "not-sure",
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
      source: host.dataset.source || "/contact",
    };
    busy = true;
    fieldset.disabled = true;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    label.textContent = msg("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000),
      });
      if (response.ok) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        return;
      }
      showAlert(response.status === 429 ? "rate" : "error");
    } catch {
      showAlert("error");
    } finally {
      busy = false;
      fieldset.disabled = false;
      button.disabled = false;
      button.removeAttribute("aria-busy");
      label.textContent = sendLabel;
    }
  });
}
