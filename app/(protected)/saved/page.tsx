"use client";

import Link from "next/link";
import { ArrowLeft, Heart, MapPin, Trash2 } from "lucide-react";
import AppNav from "../../_components/app-nav";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { rooms } from "../rooms/room-data";

export default function SavedRoomsPage() {
  const { savedRoomIds, isLoaded, removeSavedRoom } = useSavedRooms();
  const savedRooms = rooms.filter((room) => savedRoomIds.includes(room.id));

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(rgba(232,237,228,0.9),rgba(232,237,228,0.9)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center text-slate-900 dark:bg-[linear-gradient(rgba(2,6,23,0.88),rgba(2,6,23,0.88)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85')] dark:text-slate-100 sm:bg-fixed">
      <AppNav />

      <section className="mx-auto w-full max-w-[1100px] px-4 py-11 sm:px-5">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
          Saved Rooms
        </h1>
        <p className="mt-2 text-slate-600">
          {savedRooms.length} {savedRooms.length === 1 ? "room" : "rooms"} saved
        </p>

        {!isLoaded ? (
          <div className="mt-8 rounded-3xl border border-white/90 bg-white/90 px-6 py-16 text-center shadow-lg shadow-slate-200/60">
            <p className="text-sm font-bold text-slate-500">
              Loading saved rooms...
            </p>
          </div>
        ) : savedRooms.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedRooms.map((room) => (
              <article
                className="min-w-0 overflow-hidden rounded-3xl border border-white/90 bg-white/90 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60"
                key={room.id}
              >
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-black text-slate-950">
                    {room.title}
                  </h2>
                  <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} aria-hidden="true" />
                    {room.area}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-black text-emerald-600">
                      {room.price} / month
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/rooms/${room.id}`}
                        className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-xs font-black text-white"
                      >
                        View Room
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeSavedRoom(room.id)}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                        aria-label={`Remove ${room.title} from saved rooms`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-white/90 bg-white/90 px-6 py-16 text-center shadow-lg shadow-slate-200/60">
            <Heart
              size={42}
              className="mx-auto text-rose-500"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-2xl font-black text-slate-950">
              No saved rooms yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Save rooms you like and they will appear here.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-black text-white"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
