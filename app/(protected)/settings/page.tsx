"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  House,
  Monitor,
  Moon,
  Star,
  Sun,
  TrendingDown,
} from "lucide-react";
import AppNav from "../../_components/app-nav";
import {
  useNotificationPrefs,
  type NotificationType,
} from "../../_components/use-notification-prefs";
import { applyTheme, getStoredTheme, type Theme } from "../../_lib/theme";

const THEME_OPTIONS: { value: Theme; label: string; description: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", description: "Always use the light theme", icon: Sun },
  { value: "dark", label: "Dark", description: "Always use the dark theme", icon: Moon },
  { value: "system", label: "Auto", description: "Match your device setting", icon: Monitor },
];

const NOTIFICATION_OPTIONS: { value: NotificationType; label: string; description: string; icon: typeof House }[] = [
  { value: "room", label: "New rooms", description: "New listings that match your interests", icon: House },
  { value: "price", label: "Price drops", description: "Saved rooms getting cheaper", icon: TrendingDown },
  { value: "review", label: "Reviews", description: "New reviews on rooms you've booked", icon: Star },
  { value: "booking", label: "Booking updates", description: "Status changes on your booking requests", icon: Home },
];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 flex-none rounded-full transition ${
        checked ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("system");
  const { prefs, setPref } = useNotificationPrefs();

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const chooseTheme = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppNav />

      <section className="mx-auto w-full max-w-[720px] px-4 py-10 sm:px-5">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to profile
        </Link>

        <h1 className="text-3xl font-black">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Control how StayNest looks and what it notifies you about.
        </p>

        <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/50">
          <header className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
            <h2 className="text-xl font-black">Appearance</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose how StayNest appears on this device.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3 sm:p-6">
            {THEME_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseTheme(value)}
                aria-pressed={theme === value}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                  theme === value
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/60"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-emerald-700 shadow dark:bg-slate-950 dark:text-emerald-300">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="text-sm font-black">{label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/50">
          <header className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
            <h2 className="text-xl font-black">Notifications</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Pick which updates you want to hear about.
            </p>
          </header>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {NOTIFICATION_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <div
                key={value}
                className="flex items-center gap-4 px-5 py-4 sm:px-6"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black">{label}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {description}
                  </span>
                </span>
                <Switch
                  checked={prefs[value]}
                  onChange={(next) => setPref(value, next)}
                  label={label}
                />
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
