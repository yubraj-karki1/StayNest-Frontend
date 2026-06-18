"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle,
  Heart,
  Home,
  LogOut,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  User,
} from "lucide-react";
import SavedRoomToast from "../../_components/saved-room-toast";
import ThemeToggle from "../../_components/theme-toggle";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { clearToken } from "../../_lib/api";
import { rooms, type Room } from "../rooms/room-data";

const MAX_PRICE = 50000;

const roomTypes = [
  { value: "all", label: "All Rooms", icon: "HN" },
  { value: "single", label: "Single Room", icon: "SR" },
  { value: "shared", label: "Shared Room", icon: "SH" },
  { value: "hostel", label: "Hostel", icon: "HS" },
] as const;

type RoomType = (typeof roomTypes)[number]["value"];
type SearchTarget = "all" | "area" | "facilities";

function getNumericPrice(price: string) {
  return Number(price.replace(/\D/g, ""));
}

function getUserName() {
  try {
    const rawUser = localStorage.getItem("user");

    if (rawUser) {
      const user = JSON.parse(rawUser);
      if (user?.fullName) return user.fullName;
      if (user?.name) return user.name;
      if (user?.email) return String(user.email).split("@")[0];
    }

    const cookie = document.cookie
      .split("; ")
      .find((item) => item.startsWith("user_data="));

    if (cookie) {
      const user = JSON.parse(
        decodeURIComponent(cookie.split("=").slice(1).join("=")),
      );
      if (user?.fullName) return user.fullName;
      if (user?.email) return String(user.email).split("@")[0];
    }
  } catch {}

  return "Guest";
}

function RoomCard({
  room,
  isSaved,
  onToggleSaved,
}: {
  room: Room;
  isSaved: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/90 bg-white/90 text-left shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60 dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-slate-900/50 dark:hover:shadow-cyan-900/40">
      <div className="relative h-52 w-full">
        <Link href={`/rooms/${room.id}`}>
          <img
            src={room.images[0]}
            alt={room.title}
            className="h-full w-full object-cover"
          />
        </Link>

        <button
          type="button"
          onClick={onToggleSaved}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow transition-transform hover:scale-110 dark:bg-slate-900/90"
          aria-label={`${isSaved ? "Remove" : "Save"} ${room.title}`}
          aria-pressed={isSaved}
        >
          <Heart
            size={18}
            className={
              isSaved
                ? "fill-red-500 text-red-500"
                : "text-gray-700 dark:text-slate-300"
            }
          />
        </button>

        <div className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800 shadow dark:bg-slate-900/90 dark:text-slate-100">
          {room.price}/mo
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {room.title}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={14} />
              {room.area}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
            <Star size={13} className="fill-current" />
            {room.rating}
          </span>
        </div>

        <div className="mt-4 flex min-h-16 flex-wrap gap-2">
          {room.facilities.map((facility) => (
            <span
              key={facility}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
            >
              {facility}
            </span>
          ))}
        </div>

        <Link
          href={`/rooms/${room.id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-400/25 transition hover:from-emerald-600 hover:to-teal-600"
        >
          View Room
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [flash, setFlash] = useState<string | null>(null);
  const [name, setName] = useState("Guest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTarget, setSearchTarget] = useState<SearchTarget>("all");
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>("all");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [toastMessage, setToastMessage] = useState("");
  const { savedRoomIds, toggleSavedRoom } = useSavedRooms();

  useEffect(() => {
    setName(getUserName());
    setFlash("Welcome back to StayNest");

    const timeout = window.setTimeout(() => setFlash(null), 2200);
    return () => window.clearTimeout(timeout);
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomPrice = getNumericPrice(room.price);
      const matchesPrice = roomPrice <= maxPrice;
      const matchesRoomType =
        selectedRoomType === "all" || room.status === selectedRoomType;
      const searchableText =
        searchTarget === "area"
          ? room.area
          : searchTarget === "facilities"
            ? room.facilities.join(" ")
            : [
                room.title,
                room.area,
                room.status,
                room.owner,
                ...room.facilities,
              ].join(" ");
      const matchesSearch =
        !query || searchableText.toLowerCase().includes(query);

      return matchesPrice && matchesRoomType && matchesSearch;
    });
  }, [maxPrice, query, searchTarget, selectedRoomType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSearchTarget("all");
    setSelectedRoomType("all");
    setMaxPrice(MAX_PRICE);
  };

  const onLogout = () => {
    clearToken();
    router.replace("/login");
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_45%,_#020617_100%)] dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-700/20" />
        <div className="absolute right-0 top-52 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl dark:bg-cyan-700/20" />
      </div>

      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-200 to-cyan-100 text-emerald-700 shadow-sm ring-1 ring-white">
              <Home size={21} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              StayNest
            </span>
          </button>

          {/* Nav Items */}
          <nav className="hidden items-center gap-2 text-sm md:flex">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-cyan-100 px-4 py-2 font-semibold text-emerald-800 ring-1 ring-emerald-200/80 dark:from-emerald-900/60 dark:to-cyan-900/60 dark:text-emerald-200 dark:ring-emerald-700/70"
            >
              <Home size={16} /> Home
            </button>

            <button
              type="button"
              onClick={() => router.push("/saved")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Heart size={16} /> Saved
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <User size={16} /> Profile
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/notifications"
              className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Bell size={15} />
              <span className="hidden sm:inline">Notifications</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                2
              </span>
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 rounded-full border border-rose-500 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-900/20"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Flash message */}
      <section className="relative z-10 w-full px-4 pt-6 sm:px-6 lg:px-10">
        {flash && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-300/60 bg-emerald-50/90 px-4 py-3 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-200">
            <CheckCircle size={18} />
            <span className="text-sm font-semibold">{flash}</span>
          </div>
        )}
      </section>

      {/* Hero */}
      <section className="relative z-10 w-full px-4 pt-6 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-200/60 dark:border-emerald-400/20 dark:from-emerald-700 dark:to-cyan-700 dark:shadow-cyan-900/40">
          <div className="grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Hello, {name}
              </h1>
              <p className="mt-3 text-base text-white/90 md:text-lg">
                Find verified rooms, compare facilities, and book securely.
              </p>

              <div className="mt-6 flex max-w-xl items-center gap-4 rounded-2xl bg-white/15 px-5 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-sm font-black">
                  20
                </div>
                <div>
                  <p className="font-semibold">Student friendly stays</p>
                  <p className="text-sm text-white/90">
                    Filter by area, room type, and monthly budget.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
                <div className="flex w-full items-center gap-2 rounded-2xl bg-white px-4 py-3 text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                  <Search
                    size={18}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <input
                    placeholder="Search rooms, area, facilities..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
                  <SlidersHorizontal size={18} />
                  <select
                    value={searchTarget}
                    onChange={(event) =>
                      setSearchTarget(event.target.value as SearchTarget)
                    }
                    className="bg-transparent text-sm outline-none dark:text-slate-200"
                    aria-label="Search options"
                  >
                    <option value="all">All</option>
                    <option value="area">Area</option>
                    <option value="facilities">Facilities</option>
                  </select>
                </div>

                {(searchQuery ||
                  searchTarget !== "all" ||
                  selectedRoomType !== "all" ||
                  maxPrice !== MAX_PRICE) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-2xl border border-white/60 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="hidden justify-end md:flex">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-28 w-36 rounded-3xl bg-white/20 backdrop-blur-sm" />
                <div className="mt-8 h-24 w-40 rounded-3xl bg-white/20 backdrop-blur-sm" />
                <div className="h-24 w-40 rounded-3xl bg-white/20 backdrop-blur-sm" />
                <div className="mt-6 h-28 w-36 rounded-3xl bg-white/20 backdrop-blur-sm" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        </div>
      </section>

      {/* Room Types */}
      <section className="relative z-10 w-full px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Room Types
          </h2>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
            {filteredRooms.length} rooms found
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {roomTypes.map((roomType) => (
            <button
              key={roomType.value}
              type="button"
              onClick={() => setSelectedRoomType(roomType.value)}
              className={`w-full rounded-3xl border p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 ${
                selectedRoomType === roomType.value
                  ? "border-emerald-200 bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-800 shadow-emerald-100/60 dark:from-emerald-900/60 dark:to-cyan-900/60 dark:text-emerald-200 dark:shadow-cyan-900/40"
                  : "border-white/90 bg-white/90 text-slate-800 shadow-slate-200/60 dark:bg-slate-900/75 dark:text-slate-100 dark:shadow-slate-900/50"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-lg font-black text-emerald-700 ring-1 ring-emerald-200 dark:from-slate-800 dark:to-slate-700 dark:text-emerald-200 dark:ring-slate-600">
                {roomType.icon}
              </div>
              <p className="mt-4 text-center text-sm font-semibold">
                {roomType.label}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-white/90 bg-white/90 p-5 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-slate-900/50 md:grid-cols-[150px_1fr_170px] md:items-center">
          <label
            htmlFor="maximum-price"
            className="text-sm font-bold text-slate-800 dark:text-slate-100"
          >
            Max price
          </label>
          <input
            id="maximum-price"
            type="range"
            min="0"
            max={MAX_PRICE}
            step="500"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-emerald-500"
          />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            Up to Rs. {maxPrice.toLocaleString()}
          </span>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="relative z-10 w-full px-4 pb-14 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Featured Rooms
          </h2>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-300"
          >
            View All
          </button>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSaved={savedRoomIds.includes(room.id)}
                onToggleSaved={() => {
                  const isSaved = savedRoomIds.includes(room.id);
                  setToastMessage(
                    isSaved ? "Removed from saved rooms" : "Room saved",
                  );
                  void toggleSavedRoom(room.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-white/90 bg-white/90 px-4 py-16 text-center shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-slate-900/50">
            <Heart
              size={42}
              className="mx-auto text-rose-500"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
              No rooms match your search.
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try a different area, room type, or price range.
            </p>
          </div>
        )}
      </section>

      <SavedRoomToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      {/* Footer */}
      <footer className="border-t border-white/80 bg-white/80 backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/70">
        <div className="w-full px-4 py-12 sm:px-6 lg:px-10">
          <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            (c) 2026 StayNest. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
