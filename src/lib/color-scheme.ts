export type ColorScheme = "light" | "dark";
const key = "portfolio-theme";

// Light from 6:00 through 17:59 local time. Dark overnight, from 18:00 through 5:59.
// A lamp choice stored in localStorage overrides the clock.
// Runs before paint, including on routes without the public navbar.
export const themeBootstrap = `(() => {
  const root = document.documentElement;
  const storageKey = '${key}';
  let choice;
  try { choice = localStorage.getItem(storageKey); } catch {}
  function byClock() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'light' : 'dark';
  }
  function apply() {
    const theme = choice === 'light' || choice === 'dark' ? choice : byClock();
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
  }
  let timer = 0;
  function arm() {
    clearTimeout(timer);
    if (choice === 'light' || choice === 'dark') return;
    const now = new Date();
    const hour = now.getHours();
    const next = new Date(now);
    next.setHours(hour < 6 ? 6 : hour < 18 ? 18 : 6, 0, 0, 0);
    if (hour >= 18) next.setDate(next.getDate() + 1);
    timer = setTimeout(() => { apply(); arm(); }, Math.max(1000, next.getTime() - now.getTime() + 250));
  }
  window.addEventListener('portfolio-theme', event => { choice = event.detail; apply(); arm(); });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) { choice = event.newValue; apply(); arm(); }
  });
  apply();
  arm();
})();`;

export function getColorScheme(): ColorScheme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setColorScheme(scheme: ColorScheme) {
  try {
    localStorage.setItem(key, scheme);
  } catch {
    // A blocked storage backend should not disable the switch.
  }
  window.dispatchEvent(new CustomEvent("portfolio-theme", { detail: scheme }));
}

export function subscribeToColorScheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
