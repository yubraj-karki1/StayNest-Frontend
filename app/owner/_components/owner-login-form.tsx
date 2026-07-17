"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Home, LockKeyhole } from "lucide-react";
import ThemeToggle from "../../_components/theme-toggle";
import { ownerApiRequest, setOwnerToken } from "../../_lib/owner-api";

export default function OwnerLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError("");
    setIsSubmitting(true);

    try {
      const result = await ownerApiRequest<{ token: string }>(
        "/auth/owner/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        },
      );

      setOwnerToken(result.token);
      router.push("/owner");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Login failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0%,_#eef2ff_35%,_#f8fafc_70%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <header className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/owner/login"
          className="inline-flex items-center gap-2 text-3xl font-black text-slate-900 dark:text-white"
        >
          <Home size={34} strokeWidth={2.4} aria-hidden="true" />
          <span>StayNest Owner</span>
        </Link>
        <ThemeToggle />
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-72px)] w-[min(500px,calc(100%-48px))] items-center pb-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-7">
            <p className="mb-2 text-sm font-black text-indigo-600">
              Owner Portal
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl">
              Log in to manage your rooms
            </h1>
          </div>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800 dark:text-slate-200">
            <span>Owner email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your owner email"
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-800 dark:text-slate-200">
            <span>Password</span>
            <span className="flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white pr-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-full min-w-0 flex-1 bg-transparent px-4 text-base font-semibold text-slate-900 outline-none dark:text-slate-100"
              />
              <LockKeyhole
                size={20}
                strokeWidth={2.2}
                className="text-slate-400"
                aria-hidden="true"
              />
            </span>
          </label>

          {error && (
            <p className="mt-4 text-sm font-bold text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-base font-black text-white shadow-lg shadow-indigo-400/25 transition hover:from-indigo-600 hover:to-violet-600 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <p className="mt-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
            New owner?{" "}
            <Link href="/owner/register" className="font-black text-indigo-600 dark:text-indigo-400">
              Create an owner account
            </Link>
          </p>
          <p className="mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Looking to book a room instead?{" "}
            <Link href="/login" className="font-black text-emerald-600">
              User login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
