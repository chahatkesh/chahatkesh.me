export type ColorScheme = "light" | "dark";
const key = "portfolio-theme";
const query = "(prefers-color-scheme: light)";

// Runs before paint, including on routes without the public navbar.
export const themeBootstrap = `(() => {
  const root = document.documentElement, media = matchMedia('${query}');
  let choice;
  try { choice = localStorage.getItem('${key}'); } catch {}
  function apply() {
    const theme = choice === 'light' || choice === 'dark' ? choice : media.matches ? 'light' : 'dark';
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
  }
  window.addEventListener('portfolio-theme', event => { choice = event.detail; apply(); });
  window.addEventListener('storage', event => {
    if (event.key === '${key}' || event.key === null) { choice = event.newValue; apply(); }
  });
  media.addEventListener('change', apply);
  apply();
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
