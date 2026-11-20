/**
 * Live search and letter filter for the glossary. Markup contract (inside [data-glossary-search]):
 *   [data-glossary-controls]   wrapper rendered `hidden`; shown once this script runs
 *   input[data-glossary-input] search box (labelled)
 *   button[data-letter]        one per letter; "all" resets; letters without terms are disabled in markup
 *   [data-term]                each term, with data-search holding lower-cased term + definition text
 *   [data-letter-group]        a letter section; hidden when none of its terms match
 *   [data-glossary-empty]      empty state, rendered `hidden`
 *   [data-glossary-clear]      button inside the empty state that clears the search
 *   [data-glossary-status]     polite live region with data-all / data-some templates ({n}, {total})
 */
export default function glossarySearch(host: HTMLElement) {
  const controls = host.querySelector<HTMLElement>("[data-glossary-controls]");
  const input = host.querySelector<HTMLInputElement>("input[data-glossary-input]");
  const letters = Array.from(host.querySelectorAll<HTMLButtonElement>("button[data-letter]"));
  const terms = Array.from(host.querySelectorAll<HTMLElement>("[data-term]"));
  const groups = Array.from(host.querySelectorAll<HTMLElement>("[data-letter-group]"));
  const empty = host.querySelector<HTMLElement>("[data-glossary-empty]");
  const status = host.querySelector<HTMLElement>("[data-glossary-status]");
  if (!input || !terms.length) return;
  controls?.removeAttribute("hidden");

  let letter = "all";
  const apply = () => {
    const q = input.value.trim().toLocaleLowerCase();
    let shown = 0;
    for (const term of terms) {
      const inLetter =
        letter === "all" ||
        term.closest<HTMLElement>("[data-letter-group]")?.dataset.letterGroup === letter;
      const match = inLetter && (!q || (term.dataset.search || "").includes(q));
      term.hidden = !match;
      if (match) shown++;
    }
    for (const g of groups) g.hidden = !g.querySelector("[data-term]:not([hidden])");
    if (empty) empty.hidden = shown > 0;
    for (const b of letters) b.setAttribute("aria-pressed", String(b.dataset.letter === letter));
    if (status) {
      const template = shown === terms.length ? status.dataset.all : status.dataset.some;
      status.textContent = (template || "")
        .replace("{n}", String(shown))
        .replace("{total}", String(terms.length));
    }
  };
  input.addEventListener("input", apply);
  for (const b of letters)
    b.addEventListener("click", () => {
      if (b.disabled) return;
      letter = b.dataset.letter || "all";
      apply();
    });
  host.querySelector("[data-glossary-clear]")?.addEventListener("click", () => {
    input.value = "";
    letter = "all";
    apply();
    input.focus();
  });
}
