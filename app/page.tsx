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
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (price !== "any") params.set("price", price);

    const query = params.toString();
    router.push(query ? `/dashboard?${query}` : "/dashboard");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-200 text-slate-950">
      <nav className="relative z-10 flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black text-black"
        >
          <Home size={24} strokeWidth={2.2} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
          <Link
            href="/saved"
            className="hidden items-center gap-1 text-sm font-black text-black sm:inline-flex"
          >
            <Heart size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="hidden items-center gap-1 text-sm font-black text-black sm:inline-flex"
          >
            <User size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Link
            href="/notifications"
            className="grid h-8 w-8 place-items-center rounded-full text-black transition hover:bg-white/50"
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#4d82de] px-4 text-sm font-black text-black shadow-sm transition hover:bg-[#3f74d0] sm:px-6"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <section className="-mt-16 flex min-h-screen items-start justify-center bg-[linear-gradient(rgba(255,255,255,0.22),rgba(255,255,255,0.05)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center px-4 pb-11 pt-[108px] sm:px-5">
        <div className="w-full max-w-[650px] text-center">
          <h1 className="text-[34px] font-normal leading-[1.08] tracking-normal text-[#435027] drop-shadow-[0_1px_16px_rgba(255,255,255,0.45)] sm:text-[36px]">
            Find Your Perfect
            <br />
            Room Easily
          </h1>
          <p className="mx-auto mt-2 max-w-[430px] text-[13px] font-medium leading-[1.2] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            Discover affordable rooms and hostels near your campus. Compare
            <br />
            prices, check facilities and
            <br />
            more in hassle-free.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-[54px] grid w-full max-w-[424px] grid-cols-1 items-center gap-2 rounded-md border border-white/80 bg-white p-2 shadow-2xl shadow-slate-900/20 sm:grid-cols-[minmax(0,1fr)_102px_98px]"
          >
            <label className="flex h-9 min-w-0 items-center gap-1.5 rounded-md bg-[#dedede] px-3 text-neutral-500">
              <MapPin size={16} strokeWidth={2} aria-hidden="true" />
              <input
                type="text"
                placeholder="Enter location or area...."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-normal text-neutral-700 outline-none placeholder:text-neutral-500"
              />
            </label>

            <select
              aria-label="Price range"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-9 cursor-pointer rounded-md border-0 bg-[#dedede] px-2 text-base font-normal text-neutral-600 outline-none"
            >
              <option value="any">Any Price</option>
              <option value="low">Under Rs. 8,000</option>
              <option value="mid">Rs. 8,000 - 15,000</option>
              <option value="high">Rs. 15,000+</option>
            </select>

            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#dedede] px-3 text-lg font-normal text-neutral-600 transition hover:bg-[#d3d3d3]"
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
