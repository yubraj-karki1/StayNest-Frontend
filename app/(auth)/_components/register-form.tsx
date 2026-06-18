"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleHelp, Home, LockKeyhole } from "lucide-react";
import ThemeToggle from "../../_components/theme-toggle";
import { apiRequest } from "../../_lib/api";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError("");
    setIsSubmitting(true);

    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: formData.get("name"),
          contactNo: formData.get("phone"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      router.push("/login");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <header className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-3xl font-black text-slate-900"
        >
          <Home size={34} strokeWidth={2.4} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="mailto:support@staynest.com"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
          >
            <CircleHelp size={17} strokeWidth={2.4} aria-hidden="true" />
            <span>Need help?</span>
          </a>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-72px)] w-[min(1120px,calc(100%-48px))] grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2 lg:gap-20">
        <aside className="relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-200 shadow-xl shadow-slate-200/70 lg:min-h-[calc(100vh-144px)]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
            alt="Modern StayNest residence"
            className="h-full min-h-[inherit] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,12,9,0.76),_rgba(8,12,9,0.16)_58%,_transparent),linear-gradient(to_right,_rgba(8,12,9,0.22),_transparent_48%)]" />

          <div className="absolute bottom-8 left-8 right-8 max-w-sm text-white">
            <h1 className="text-4xl font-black leading-none tracking-normal sm:text-5xl">
              Elevate your
              <br />
              living
              <br />
              experience
            </h1>
            <p className="mt-4 max-w-xs text-sm font-bold leading-6 text-emerald-50">
              Join a trusted residence network built around comfort, clarity,
              and better stays.
            </p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md justify-self-center"
        >
          <div className="mb-7">
            <p className="mb-2 text-sm font-black text-emerald-600">
              Start your stay
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Create an account
            </h1>
          </div>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800">
            <span>Contact number</span>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your contact number"
              autoComplete="tel"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800">
            <span>Password</span>
            <span className="flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white pr-4 transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100">
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                className="h-full min-w-0 flex-1 bg-transparent px-4 text-base font-semibold text-slate-900 outline-none"
              />
              <LockKeyhole
                size={20}
                strokeWidth={2.2}
                className="text-slate-400"
                aria-hidden="true"
              />
            </span>
          </label>

          <label className="mt-5 flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
            <input
              type="checkbox"
              name="terms"
              required
              className="mt-1 h-4 w-4 accent-emerald-500"
            />
            <span>I agree to the terms and conditions.</span>
          </label>

          {error && (
            <p className="mt-4 text-sm font-bold text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-base font-black text-white shadow-lg shadow-emerald-400/25 transition hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <p className="mt-6 text-center text-base font-bold text-slate-700">
            Already have an account?{" "}
            <Link href="/login" className="font-black text-emerald-600">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
