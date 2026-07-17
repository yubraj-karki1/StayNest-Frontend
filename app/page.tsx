"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Heart, Home, MapPin, Search, User } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("any");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <nav className="absolute inset-x-0 top-0 z-10 flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black text-white"
        >
          <Home size={24} strokeWidth={2.2} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
          <Link
            href="/saved"
            className="hidden items-center gap-1.5 text-sm font-bold text-white/90 transition hover:text-white sm:inline-flex"
          >
            <Heart size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 text-sm font-bold text-white/90 transition hover:text-white sm:inline-flex"
          >
            <User size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Link
            href="/notifications"
            className="grid h-9 w-9 place-items-center rounded-full text-white/90 transition hover:bg-white/15"
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-600"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <section className="flex min-h-screen items-center justify-center bg-[linear-gradient(rgba(2,6,23,0.5),rgba(2,6,23,0.78)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center px-4 py-28 sm:px-6">
        <div className="w-full max-w-[640px] text-center">
          <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl">
            Find Your Perfect
            <br />
            Room Easily
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            Discover affordable rooms and hostels near your campus. Compare
            prices, check facilities and more in hassle-free.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 grid w-full max-w-[560px] grid-cols-1 items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-2xl shadow-black/40 sm:grid-cols-[minmax(0,1fr)_150px_auto]"
          >
            <label className="flex h-12 min-w-0 items-center gap-2 rounded-xl bg-slate-100 px-4 text-slate-400">
              <MapPin size={18} strokeWidth={2} aria-hidden="true" />
              <input
                type="text"
                placeholder="Enter location or area..."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <select
              aria-label="Price range"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-12 cursor-pointer rounded-xl border-0 bg-slate-100 px-3 text-base font-medium text-slate-600 outline-none"
            >
              <option value="any">Any Price</option>
              <option value="low">Under Rs. 8,000</option>
              <option value="mid">Rs. 8,000 - 15,000</option>
              <option value="high">Rs. 15,000+</option>
            </select>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-base font-black text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-600"
            >
              <Search size={18} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
