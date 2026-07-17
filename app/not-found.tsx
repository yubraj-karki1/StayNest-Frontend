import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] px-5 text-center text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <div className="w-full max-w-md">
        <span className="text-7xl font-black text-emerald-600 dark:text-emerald-400">
          404
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-600"
          >
            <Home size={17} aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Search size={17} aria-hidden="true" />
            Browse Rooms
          </Link>
        </div>
      </div>
    </main>
  );
}
