"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("staynest_theme");
    const nextTheme: Theme = savedTheme === "dark" ? "dark" : "light";

    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("staynest_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
      <button
        type="button"
        onClick={() => applyTheme("light")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          theme === "light"
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
        aria-pressed={theme === "light"}
      >
        <span className="inline-flex items-center gap-1">
          <Sun size={14} aria-hidden="true" />
          Light
        </span>
      </button>
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          theme === "dark"
            ? "bg-emerald-900/60 text-emerald-200"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
        aria-pressed={theme === "dark"}
      >
        <span className="inline-flex items-center gap-1">
          <Moon size={14} aria-hidden="true" />
          Dark
        </span>
      </button>
    </div>
  );
}
