"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Heart, Home, MapPin, Search, User } from "lucide-react";
import ThemeToggle from "./_components/theme-toggle";

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("any");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (price !== "any") params.set("price", price);

    const query = params.toString();
    router.push(query ? `/dashboard?${query}` : "/dashboard");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-200 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <nav className="relative z-10 flex min-h-20 items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-3xl font-black text-slate-950"
        >
          <Home size={25} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link
            href="/saved"
            className="hidden items-center gap-2 text-sm font-black text-slate-950 sm:inline-flex"
          >
            <Heart size={17} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="hidden items-center gap-2 text-sm font-black text-slate-950 sm:inline-flex"
          >
            <User size={17} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Link
            href="/notifications"
            className="grid h-8 w-8 place-items-center rounded-full text-slate-950 transition hover:bg-white/50"
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <section className="absolute inset-0 grid min-h-screen place-items-center bg-[linear-gradient(rgba(255,255,255,0.18),rgba(255,255,255,0.08)),linear-gradient(to_bottom,rgba(18,23,14,0.16),rgba(18,23,14,0.54)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center px-5 pb-11 pt-28">
        <div className="mt-14 w-[min(100%,820px)] text-center">
          <h1 className="text-6xl font-black leading-none tracking-normal text-green-950 drop-shadow-[0_2px_20px_rgba(255,255,255,0.45)] sm:text-7xl lg:text-8xl">
            Find Your Perfect
            <br />
            Room Easily
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-8 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.34)] sm:text-xl">
            Discover affordable rooms and hostels near your campus. Compare
            prices, check facilities, and book with less hassle.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 grid w-[min(100%,650px)] grid-cols-1 items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-2xl shadow-slate-900/20 sm:grid-cols-[minmax(210px,1.3fr)_minmax(130px,0.7fr)_144px]"
          >
            <label className="flex h-12 min-w-0 items-center gap-2 rounded-xl bg-slate-100 px-4 text-slate-500">
              <MapPin size={18} aria-hidden="true" />
              <input
                type="text"
                placeholder="Enter location or area..."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-700 outline-none"
              />
            </label>

            <select
              aria-label="Price range"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-12 cursor-pointer rounded-xl border-0 bg-slate-100 px-4 text-base font-semibold text-slate-700 outline-none"
            >
              <option value="any">Any Price</option>
              <option value="low">Under Rs. 8,000</option>
              <option value="mid">Rs. 8,000 - 15,000</option>
              <option value="high">Rs. 15,000+</option>
            </select>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-lg font-black text-white transition hover:bg-emerald-600"
            >
              <Search size={19} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
