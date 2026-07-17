"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] px-5 text-center text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <div className="w-full max-w-md">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-300">
          <TriangleAlert size={28} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-black tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          An unexpected error occurred. You can try again, or head back to
          the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-600"
          >
            <RotateCcw size={17} aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Home size={17} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
