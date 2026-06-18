import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import ThemeToggle from "../_components/theme-toggle";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <nav className="flex min-h-[72px] items-center justify-between bg-white/80 px-5 backdrop-blur-xl dark:bg-slate-900/80 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100"
        >
          <Home size={23} aria-hidden="true" />
          StayNest
        </Link>
        <ThemeToggle />
      </nav>

      <section className="mx-auto w-[min(760px,calc(100%-32px))] py-11">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to dashboard
        </Link>

        <h1 className="mt-7 text-4xl font-black tracking-normal text-slate-950 dark:text-slate-100 sm:text-5xl">
          Legal Information
        </h1>
        <p className="mt-2 text-base leading-7 text-slate-600">
          A plain-language overview of how StayNest handles bookings, cookies,
          and personal information.
        </p>

        <article
          id="terms"
          className="mt-8 scroll-mt-6 rounded-3xl border border-white/90 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/40"
        >
          <h2 className="text-xl font-black text-slate-950 dark:text-slate-100">
            Terms of Service
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Provide accurate information, communicate respectfully, and verify
            booking details with property owners before making a commitment.
          </p>
        </article>

        <article
          id="cookies"
          className="mt-5 scroll-mt-6 rounded-3xl border border-white/90 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/40"
        >
          <h2 className="text-xl font-black text-slate-950 dark:text-slate-100">Cookies</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            StayNest stores an authentication token in browser storage so your
            session remains available after a refresh.
          </p>
        </article>

        <article
          id="privacy"
          className="mt-5 scroll-mt-6 rounded-3xl border border-white/90 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/40"
        >
          <h2 className="text-xl font-black text-slate-950 dark:text-slate-100">Privacy Policy</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Profile, saved-room, notification, and booking data are stored by
            the StayNest API. Contact support@staynest.com for privacy
            questions.
          </p>
        </article>
      </section>
    </main>
  );
}
