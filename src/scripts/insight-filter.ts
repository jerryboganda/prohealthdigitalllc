/**
 * Audience filter for article listings. Markup contract (all inside [data-insight-filter]):
 *   [data-filter-controls]            wrapper rendered `hidden`; shown once this script runs
 *   button[data-filter-value]         "all" | "providers" | "digital-health-companies" (aria-pressed)
 *   [data-audience]                   each filterable item ("both" items match every audience)
 *   [data-filter-status]              polite live region with data-all / data-some templates ({n}, {total})
 */
export default function insightFilter(host: HTMLElement) {
  const controls = host.querySelector<HTMLElement>("[data-filter-controls]");
  const buttons = Array.from(host.querySelectorAll<HTMLButtonElement>("button[data-filter-value]"));
  const items = Array.from(host.querySelectorAll<HTMLElement>("[data-audience]"));
  const status = host.querySelector<HTMLElement>("[data-filter-status]");
  if (!buttons.length || !items.length) return;
  controls?.removeAttribute("hidden");

  const apply = (value: string) => {
    let shown = 0;
    for (const item of items) {
      const audience = item.dataset.audience;
      const match = value === "all" || audience === value || audience === "both";
      item.hidden = !match;
      if (match) shown++;
    }
    for (const b of buttons)
      b.setAttribute("aria-pressed", String(b.dataset.filterValue === value));
    if (status) {
      const template = shown === items.length ? status.dataset.all : status.dataset.some;
      status.textContent = (template || "")
        .replace("{n}", String(shown))
        .replace("{total}", String(items.length));
    }
  };
  for (const b of buttons) b.addEventListener("click", () => apply(b.dataset.filterValue || "all"));
}
