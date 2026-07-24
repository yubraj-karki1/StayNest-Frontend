export type Theme = "light" | "dark" | "system";

const THEME_KEY = "staynest_theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const value = window.localStorage.getItem(THEME_KEY);
  return value === "dark" || value === "light" || value === "system"
    ? value
    : "system";
}

export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme) {
  window.localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle(
    "dark",
    resolveTheme(theme) === "dark",
  );
}
