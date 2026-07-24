"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, type Theme } from "../_lib/theme";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Auto", icon: Monitor },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      if (getStoredTheme() === "system") applyTheme("system");
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => choose(value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            theme === value
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
          aria-pressed={theme === value}
        >
          <span className="inline-flex items-center gap-1">
            <Icon size={14} aria-hidden="true" />
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
