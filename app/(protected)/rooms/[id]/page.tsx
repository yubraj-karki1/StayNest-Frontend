"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  Car,
  Clock,
  CookingPot,
  MapPin,
  Phone,
  Shirt,
  Star,
  Sun,
  User,
  Wifi,
} from "lucide-react";
import AppNav from "../../../_components/app-nav";
import RequestBookingButton from "../../../_components/request-booking-button";
import SafeRoomImage from "../../../_components/safe-room-image";
import SaveRoomButton from "../../../_components/save-room-button";
import WithdrawBookingModal from "../../../_components/withdraw-booking-modal";
import { apiRequest, type Booking, type Room } from "../../../_lib/api";

const facilityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Kitchen: CookingPot,
  Parking: Car,
  Laundry: Shirt,
  "Attached Bathroom": Bath,
  Balcony: Sun,
};

export default function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [room, setRoom] = useState<Room | null | undefined>(undefined);
  const [pendingBooking, setPendingBooking] = useState<Booking | null>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  useEffect(() => {
    apiRequest<{ room: Room }>(`/rooms/${id}`)
      .then(({ room: item }) => setRoom(item))
      .catch(() => setRoom(null));
  }, [id]);

  const loadPendingBooking = () => {
    apiRequest<{ bookings: Booking[] }>("/bookings")
      .then(({ bookings }) =>
        setPendingBooking(
          bookings.find(
            (booking) => booking.roomId === id && booking.status === "pending",
          ) ?? null,
        ),
      )
      .catch(() => setPendingBooking(null));
  };

  useEffect(() => {
    loadPendingBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const withdrawBooking = async () => {
    if (!pendingBooking) return;
    setIsWithdrawing(true);
    setWithdrawError("");

    try {
      await apiRequest(`/bookings/${pendingBooking._id}/withdraw`, {
        method: "PATCH",
      });
      setPendingBooking(null);
      setIsWithdrawModalOpen(false);
    } catch (error) {
      setWithdrawError(
        error instanceof Error ? error.message : "Unable to withdraw request",
      );
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (room === undefined) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">
          Loading room...
        </p>
      </main>
    );
  }

  if (room === null) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-center dark:bg-slate-950">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Room not found
          </h1>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(rgba(214,221,211,0.72),rgba(214,221,211,0.72)),url('/images/room-detail-hero.jpg')] bg-cover bg-center text-slate-900 dark:bg-[linear-gradient(rgba(2,6,23,0.84),rgba(2,6,23,0.84)),url('/images/room-detail-hero.jpg')] dark:text-slate-100 sm:bg-fixed">
      <AppNav />

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
              <div className="relative col-span-3 h-[clamp(260px,42vw,430px)] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/15">
                <SafeRoomImage
                  src={room.images[0]}
                  alt={room.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
              </div>
              {room.images.slice(1).map((image, index) => (
                <div
                  key={image}
                  className="relative h-[clamp(70px,13vw,125px)] w-full overflow-hidden rounded-xl shadow-lg shadow-slate-900/10"
                >
                  <SafeRoomImage
                    src={image}
                    alt={`Room view ${index + 2}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
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

          <div className="grid gap-4 lg:sticky lg:top-5">
            <aside className="rounded-3xl border border-white/90 bg-white/95 p-6 shadow-2xl shadow-slate-900/15 sm:p-8">
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
                  const FacilityIcon = facilityIcons[facility] ?? Star;

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

              <RequestBookingButton
                key={pendingBooking ? "pending" : "none"}
                roomId={room.id}
                ownerName={room.owner}
                initiallySent={!!pendingBooking}
                onSuccess={loadPendingBooking}
              />
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

            {pendingBooking && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-300">
                      <Clock size={15} aria-hidden="true" />
                      Pending Request
                    </p>
                    <p className="mt-1 text-xs font-bold text-amber-600/80 dark:text-amber-400/80">
                      Requested on{" "}
                      {new Date(pendingBooking.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      ·{" "}
                      {new Date(pendingBooking.createdAt).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="flex h-10 items-center justify-center rounded-xl border border-rose-300 bg-white px-4 text-xs font-black text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:bg-slate-900 dark:text-rose-300 dark:hover:bg-rose-950/60"
                  >
                    Withdraw Request
                  </button>
                </div>
                {withdrawError && (
                  <p className="mt-3 text-xs font-bold text-rose-600" role="alert">
                    {withdrawError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {isWithdrawModalOpen && pendingBooking && (
        <WithdrawBookingModal
          roomTitle={room.title}
          isWithdrawing={isWithdrawing}
          onConfirm={withdrawBooking}
          onCancel={() => setIsWithdrawModalOpen(false)}
        />
      )}

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
