import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  Bell,
  Car,
  CookingPot,
  Heart,
  Home,
  MapPin,
  Phone,
  Shirt,
  Star,
  Sun,
  User,
  Wifi,
} from "lucide-react";
import LogoutButton from "../../../_components/logout-button";
import RequestBookingButton from "../../../_components/request-booking-button";
import SaveRoomButton from "../../../_components/save-room-button";
import ThemeToggle from "../../../_components/theme-toggle";
import { getRoomById, rooms } from "../room-data";

const facilityIcons = {
  WiFi: Wifi,
  Kitchen: CookingPot,
  Parking: Car,
  Laundry: Shirt,
  "Attached Bathroom": Bath,
  Balcony: Sun,
};

export function generateStaticParams() {
  return rooms.map((room) => ({ id: String(room.id) }));
}

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(rgba(214,221,211,0.72),rgba(214,221,211,0.72)),url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center text-slate-900 dark:bg-[linear-gradient(rgba(2,6,23,0.84),rgba(2,6,23,0.84)),url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')] dark:text-slate-100 sm:bg-fixed">
      <nav className="flex min-h-[70px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xl font-black text-slate-900"
        >
          <Home size={23} strokeWidth={2.3} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-7">
          <Link
            href="/saved"
            className="hidden items-center gap-2 text-sm font-bold text-slate-900 sm:inline-flex"
          >
            <Heart size={13} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="hidden items-center gap-2 text-sm font-bold text-slate-900 sm:inline-flex"
          >
            <User size={13} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Link
            href="/notifications"
            className="relative grid h-8 w-8 place-items-center text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={15} aria-hidden="true" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </Link>
          <ThemeToggle />
          <LogoutButton
            iconSize={13}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100"
          />
        </div>
      </nav>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-6 pb-20 sm:px-5">
        <Link
          href="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-emerald-700"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="grid gap-6">
            <div className="grid grid-cols-3 gap-2">
              <img
                src={room.images[0]}
                alt={room.title}
                className="col-span-3 h-[clamp(260px,42vw,430px)] w-full rounded-2xl object-cover shadow-xl shadow-slate-900/15"
              />
              {room.images.slice(1).map((image, index) => (
                <img
                  src={image}
                  alt={`Room view ${index + 2}`}
                  className="h-[clamp(70px,13vw,125px)] w-full rounded-xl object-cover shadow-lg shadow-slate-900/10"
                  key={image}
                />
              ))}
            </div>

            <article className="rounded-3xl border border-white/90 bg-white/90 p-6 shadow-xl shadow-slate-900/10 sm:p-8">
              <h2 className="text-xl font-black text-slate-950">
                About this room
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {room.description}
              </p>
            </article>
          </div>

          <aside className="rounded-3xl border border-white/90 bg-white/95 p-6 shadow-2xl shadow-slate-900/15 sm:p-8 lg:sticky lg:top-5">
            <h1 className="break-words text-3xl font-black leading-tight tracking-normal text-slate-950">
              {room.title}
            </h1>
            <p className="mt-3 flex min-w-0 items-center gap-1 break-words text-sm font-bold text-slate-500">
              <MapPin size={14} aria-hidden="true" />
              {room.area}, Nepal
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-slate-600">
              <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              {room.rating} · {room.reviews} reviews
            </p>

            <div className="my-6 rounded-2xl bg-orange-50 p-4">
              <span className="text-3xl font-black text-orange-500">
                {room.price}
              </span>
              <span className="text-sm font-bold text-slate-500"> /month</span>
            </div>

            <span className="block text-xs font-black uppercase tracking-wide text-slate-400">
              Facilities
            </span>
            <div className="mb-6 mt-3 flex flex-wrap gap-2">
              {room.facilities.map((facility) => {
                const FacilityIcon = facilityIcons[facility];

                return (
                  <span
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                    key={facility}
                  >
                    <FacilityIcon size={13} aria-hidden="true" />
                    {facility}
                  </span>
                );
              })}
            </div>

            <span className="block text-xs font-black uppercase tracking-wide text-slate-400">
              Owner
            </span>
            <div className="mb-6 mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-amber-400 text-white">
                <User size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-slate-400">
                  Owner
                </span>
                <span className="mt-1 block text-sm font-black text-slate-900">
                  {room.owner}
                </span>
              </span>
            </div>

            <RequestBookingButton roomId={room.id} />
            <a
              href={`tel:${room.ownerPhone}`}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-white text-sm font-black text-emerald-600 transition hover:bg-emerald-50"
            >
              <Phone size={16} aria-hidden="true" />
              Call Owner
            </a>
            <div className="mt-3">
              <SaveRoomButton roomId={room.id} />
            </div>
          </aside>
        </div>
      </section>

      <footer className="grid grid-cols-1 gap-7 bg-white px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-20">
        <section>
          <h2 className="text-2xl font-black text-slate-950">StayNest</h2>
          <p className="mt-3 max-w-xs text-xs leading-6 text-slate-500">
            Defining the horizon of student living through premium verification
            and global community building.
          </p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-900">Support</h3>
          <a
            href="mailto:support@staynest.com?subject=Help Center"
            className="mt-2 block text-xs text-slate-600"
          >
            Help Center
          </a>
          <a
            href="mailto:support@staynest.com"
            className="mt-2 block text-xs text-slate-600"
          >
            Contact Support
          </a>
          <a
            href="mailto:safety@staynest.com"
            className="mt-2 block text-xs text-slate-600"
          >
            Safety Guide
          </a>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-900">Company Us</h3>
          <Link href="/" className="mt-2 block text-xs text-slate-600">
            About Us
          </Link>
          <a
            href="mailto:hello@staynest.com"
            className="mt-2 block text-xs text-slate-600"
          >
            Contact Us
          </a>
          <a
            href="mailto:partners@staynest.com"
            className="mt-2 block text-xs text-slate-600"
          >
            Partner with Us
          </a>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-900">Legal</h3>
          <Link href="/legal#terms" className="mt-2 block text-xs text-slate-600">
            Terms of Services
          </Link>
          <Link
            href="/legal#cookies"
            className="mt-2 block text-xs text-slate-600"
          >
            Cookies
          </Link>
          <Link
            href="/legal#privacy"
            className="mt-2 block text-xs text-slate-600"
          >
            Privacy policy
          </Link>
        </section>
      </footer>
    </main>
  );
}
