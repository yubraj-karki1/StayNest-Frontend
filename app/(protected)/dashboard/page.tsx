"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Heart, MapPin, Search, SlidersHorizontal } from "lucide-react";
import AppNav from "../../_components/app-nav";
import SavedRoomToast from "../../_components/saved-room-toast";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { rooms, type Room } from "../rooms/room-data";

const MAX_PRICE = 50000;

const roomTypes = [
  { value: "single", label: "Single Room" },
  { value: "shared", label: "Shared Room" },
  { value: "hostel", label: "Hostel" },
] as const;

type RoomType = (typeof roomTypes)[number]["value"];

function getNumericPrice(price: string) {
  return Number(price.replace(/\D/g, ""));
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
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
      <div className="relative h-48 overflow-hidden">
        <Link href={`/rooms/${room.id}`}>
          <img
            src={room.images[0]}
            alt={room.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-slate-700 shadow dark:bg-slate-950/90 dark:text-slate-100">
          {room.status}
        </span>

        <button
          type="button"
          onClick={onToggleSaved}
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full shadow transition ${
            isSaved
              ? "bg-rose-500 text-white"
              : "bg-white/95 text-slate-500 hover:text-rose-500 dark:bg-slate-950/90 dark:text-slate-200"
          }`}
          aria-label={`${isSaved ? "Remove" : "Save"} ${room.title}`}
          aria-pressed={isSaved}
        >
          <Heart
            size={15}
            fill={isSaved ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-12 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-white/80">
            {room.area.split(",")[0]}, Nepal
          </p>
          <h3 className="line-clamp-1 text-lg font-black leading-tight">
            {room.title}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex min-h-7 flex-wrap gap-1.5">
          {room.facilities.slice(0, 3).map((facility) => (
            <span
              key={facility}
              className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
            >
              {facility}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-black text-slate-700 dark:text-slate-200">
            {room.price}
            <span className="font-medium text-slate-400 dark:text-slate-400">
              /month
            </span>
          </span>
          <Link
            href={`/rooms/${room.id}`}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-xs font-black text-white shadow transition hover:from-emerald-600 hover:to-teal-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const listingsRef = useRef<HTMLElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const { savedRoomIds, toggleSavedRoom } = useSavedRooms();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location")?.trim() ?? "";
    const price = params.get("price");

    if (location) {
      setSearchInput(location);
      setSearchQuery(location);
    }
    if (price === "low") setMaxPrice(8000);
    if (price === "mid") setMaxPrice(15000);
    if (price === "high") setMaxPrice(MAX_PRICE);
  }, []);

  const filteredRooms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return rooms.filter((room) => {
      const roomPrice = getNumericPrice(room.price);
      const matchesPrice = roomPrice <= maxPrice;
      const matchesRoomType =
        selectedRoomTypes.length === 0 ||
        selectedRoomTypes.includes(room.status as RoomType);
      const searchableText = [
        room.title,
        room.area,
        room.status,
        room.owner,
        ...room.facilities,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);

      return matchesPrice && matchesRoomType && matchesSearch;
    });
  }, [maxPrice, searchQuery, selectedRoomTypes]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const exploreAllProperties = () => {
    setSearchInput("");
    setSearchQuery("");
    setMaxPrice(MAX_PRICE);
    setSelectedRoomTypes([]);
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleRoomType = (roomType: RoomType) => {
    setSelectedRoomTypes((current) =>
      current.includes(roomType)
        ? current.filter((type) => type !== roomType)
        : [...current, roomType],
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black dark:bg-slate-950 dark:text-slate-100">
      <section className="relative bg-[linear-gradient(rgba(2,6,23,0.45),rgba(2,6,23,0.78)),url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center pb-16 sm:pb-20 lg:bg-fixed">
        <AppNav variant="hero" />

        <section className="mx-auto mt-10 w-full max-w-[640px] px-4 text-center sm:mt-14 lg:mt-16">
          <h1 className="text-[clamp(2.25rem,9vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            Find Your Perfect Room
          </h1>
          <p className="mx-auto mt-3 max-w-[420px] text-base font-medium leading-relaxed text-white/85">
            Discover verified accommodations from trusted hosts.
            <br />
            Book securely with confidence.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 grid w-full max-w-[530px] grid-cols-1 gap-2.5 rounded-2xl bg-white p-2.5 shadow-2xl shadow-black/40 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_150px]"
          >
            <label className="flex h-12 items-center gap-2 rounded-xl bg-slate-100 px-4 text-slate-400 dark:bg-slate-950 dark:text-slate-400">
              <MapPin size={17} aria-hidden="true" />
              <input
                type="search"
                placeholder="City or area..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base font-medium text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 text-base font-black text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-600"
            >
              <Search size={17} aria-hidden="true" />
              Search
            </button>
          </form>

          <button
            type="button"
            onClick={exploreAllProperties}
            className="mt-4 h-11 w-full max-w-[300px] rounded-xl bg-white/95 px-4 text-sm font-black text-slate-800 shadow-lg transition hover:bg-white dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Explore all Properties
          </button>
        </section>
      </section>

      <section
        ref={listingsRef}
        className="mx-auto mt-10 grid w-full max-w-[1210px] grid-cols-1 gap-6 px-4 pb-12 sm:mt-12 sm:px-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start xl:max-w-[1260px]"
      >
        <aside className="lg:sticky lg:top-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-black dark:text-white">
              <SlidersHorizontal size={16} strokeWidth={2.4} aria-hidden="true" />
              Filters
            </h2>
            {(maxPrice < MAX_PRICE || selectedRoomTypes.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setMaxPrice(MAX_PRICE);
                  setSelectedRoomTypes([]);
                }}
                className="text-xs font-black text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                Reset
              </button>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-xl shadow-slate-950/15 dark:bg-slate-900/95 dark:shadow-slate-950/40">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="maximum-price"
                className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
              >
                Price Range
              </label>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Rs. {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              id="maximum-price"
              type="range"
              min="0"
              max={MAX_PRICE}
              step="500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-4 w-full accent-emerald-500"
            />
            <div className="mt-2 flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
              <span>Rs. 0</span>
              <span>Rs. {MAX_PRICE.toLocaleString()}+</span>
            </div>

            <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

            <span className="block text-xs font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              Room Type
            </span>
            <div className="mt-3 grid gap-2">
              {roomTypes.map((roomType) => {
                const isChecked = selectedRoomTypes.includes(roomType.value);

                return (
                  <label
                    key={roomType.value}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
                      isChecked
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{roomType.label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRoomType(roomType.value)}
                      className="sr-only"
                    />
                    {isChecked && (
                      <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-black dark:text-white">Featured Properties</h2>
            <label className="flex h-9 items-center gap-2 rounded-xl bg-white px-4 text-xs shadow dark:bg-slate-900 dark:shadow-slate-950/30">
              <span className="text-slate-400">Sort by:</span>
              <select
                className="bg-transparent text-xs font-black text-emerald-600 outline-none dark:text-emerald-300"
                aria-label="Sort properties"
                defaultValue="newest"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price low</option>
                <option value="price-high">Price high</option>
              </select>
            </label>
          </div>

          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
            <div className="rounded-xl bg-white/90 px-6 py-12 text-center shadow-xl dark:bg-slate-900/90 dark:shadow-slate-950/40">
              <Heart
                size={32}
                className="mx-auto text-rose-500"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-lg font-black dark:text-white">No properties found</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                Try a different area, room type, or price range.
              </p>
            </div>
          )}
        </section>
      </section>

      <SavedRoomToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <footer className="grid grid-cols-1 gap-8 border-t border-slate-100 bg-white px-5 py-10 text-black dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-20">
        <section>
          <h2 className="text-2xl font-black">StayNest</h2>
          <p className="mt-3 max-w-[270px] text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Defining the horizon of student living through premium verification
            and global community building.
          </p>
          <div className="mt-4 flex gap-2.5">
            {["f", "◎", "t", "v"].map((item) => (
              <span
                key={item}
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-xs font-bold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Support
          </h3>
          <a
            href="mailto:support@staynest.com?subject=Help Center"
            className="mt-3 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Help Center
          </a>
          <a
            href="mailto:support@staynest.com"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Contact Support
          </a>
          <a
            href="mailto:safety@staynest.com"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Safety Guide
          </a>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Company
          </h3>
          <Link
            href="/profile"
            className="mt-3 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            About Us
          </Link>
          <a
            href="mailto:hello@staynest.com"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Contact Us
          </a>
          <a
            href="mailto:partners@staynest.com"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Partner with Us
          </a>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Legal
          </h3>
          <Link
            href="/legal#terms"
            className="mt-3 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Terms of Services
          </Link>
          <Link
            href="/legal#cookies"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Cookies
          </Link>
          <Link
            href="/legal#privacy"
            className="mt-2 block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Privacy policy
          </Link>
        </section>
      </footer>
    </main>
  );
}
