import Link from "next/link";
import { Building2, LayoutDashboard, User } from "lucide-react";
import ThemeToggle from "../../_components/theme-toggle";
import OwnerLogoutButton from "./owner-logout-button";

export default function OwnerNav() {
  return (
    <nav className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 bg-white/70 px-4 py-3 backdrop-blur-xl dark:bg-slate-900/80 sm:px-8 lg:px-12">
      <Link
        href="/owner"
        className="inline-flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl"
      >
        <Building2 size={24} strokeWidth={2.3} aria-hidden="true" />
        StayNest Owner
      </Link>

      <div className="flex flex-wrap items-center justify-end gap-6 text-sm font-black text-slate-900 dark:text-slate-100">
        <Link href="/owner" className="hidden items-center gap-1.5 sm:inline-flex">
          <LayoutDashboard size={14} aria-hidden="true" />
          <span>Dashboard</span>
        </Link>
        <Link href="/owner/profile" className="hidden items-center gap-1.5 sm:inline-flex">
          <User size={14} aria-hidden="true" />
          <span>Profile</span>
        </Link>
        <ThemeToggle />
        <OwnerLogoutButton />
      </div>
    </nav>
  );
}
