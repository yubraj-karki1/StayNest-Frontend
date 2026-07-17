import Link from "next/link";
import { Bell, Heart, Home, User } from "lucide-react";
import LogoutButton from "./logout-button";
import ThemeToggle from "./theme-toggle";

type AppNavProps = {
  variant?: "light" | "hero";
  unreadCount?: number;
};

export default function AppNav({ variant = "light", unreadCount }: AppNavProps) {
  const isHero = variant === "hero";
  const showUnreadDot = unreadCount === undefined || unreadCount > 0;

  return (
    <nav
      className={
        isHero
          ? "flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/10 px-5 py-4 text-white backdrop-blur-xl sm:px-7 lg:px-8"
          : "flex min-h-[72px] flex-wrap items-center justify-between gap-4 bg-white/70 px-4 py-3 backdrop-blur-xl dark:bg-slate-900/80 sm:px-8 lg:px-12"
      }
    >
      <Link
        href="/dashboard"
        className={`inline-flex items-center gap-2 text-xl font-black sm:text-2xl ${
          isHero ? "text-white" : "text-slate-900 dark:text-slate-100"
        }`}
      >
        <Home size={24} strokeWidth={2.3} aria-hidden="true" />
        StayNest
      </Link>

      <div
        className={`flex flex-wrap items-center justify-end gap-4 text-sm font-black sm:gap-7 ${
          isHero ? "text-white" : "text-slate-900 dark:text-slate-100"
        }`}
      >
        <Link
          href="/dashboard"
          className="hidden items-center gap-1.5 sm:inline-flex"
        >
          <Home size={14} aria-hidden="true" />
          <span>Home</span>
        </Link>
        <Link
          href="/saved"
          className="hidden items-center gap-1.5 sm:inline-flex"
        >
          <Heart size={14} aria-hidden="true" />
          <span>Saved</span>
        </Link>
        <Link
          href="/profile"
          className="hidden items-center gap-1.5 sm:inline-flex"
        >
          <User size={14} aria-hidden="true" />
          <span>Profile</span>
        </Link>
        <Link
          href="/notifications"
          className="relative inline-flex items-center"
          aria-label="Notifications"
        >
          <Bell size={16} aria-hidden="true" />
          {showUnreadDot && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-slate-900" />
          )}
        </Link>
        <ThemeToggle />
        {!isHero && (
          <LogoutButton
            iconSize={13}
            className="inline-flex items-center gap-2 rounded-full border border-rose-500 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-900/20"
          />
        )}
      </div>
    </nav>
  );
}
