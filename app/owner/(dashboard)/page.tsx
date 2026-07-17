"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Home,
  ImagePlus,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import OwnerNav from "../_components/owner-nav";
import SafeRoomImage from "../../_components/safe-room-image";
import { ownerApiRequest } from "../../_lib/owner-api";
import { type Booking, type Room, type RoomType } from "../../_lib/api";

const roomTypes: { value: RoomType; label: string }[] = [
  { value: "single", label: "Single Room" },
  { value: "shared", label: "Shared Room" },
  { value: "hostel", label: "Hostel" },
];

const MAX_IMAGES = 8;

const emptyForm = {
  title: "",
  area: "",
  price: "",
  status: "single" as RoomType,
  ownerPhone: "",
  facilities: "",
  description: "",
};

const statusStyles: Record<Booking["status"], string> = {
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  cancelled: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300",
};

export default function OwnerDashboardPage() {
  const [myRooms, setMyRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [bookingActionId, setBookingActionId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [imageFiles]);

  const loadData = async () => {
    try {
      const [roomsResult, bookingsResult] = await Promise.all([
        ownerApiRequest<{ rooms: Room[] }>("/owner/rooms"),
        ownerApiRequest<{ bookings: Booking[] }>("/owner/bookings"),
      ]);
      setMyRooms(roomsResult.rooms);
      setBookings(bookingsResult.bookings);
    } catch {
      setMyRooms([]);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addImageFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const snapshot = Array.from(files);
    setFormError("");
    setImageFiles((current) => [...current, ...snapshot].slice(0, MAX_IMAGES));
  };

  const removeImageFile = (index: number) => {
    setImageFiles((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (imageFiles.length === 0) {
      setFormError("Add at least one photo of the room.");
      return;
    }

    setIsSubmitting(true);

    try {
      const facilities = form.facilities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const uploadData = new FormData();
      imageFiles.forEach((file) => uploadData.append("images", file));
      const uploaded = await ownerApiRequest<{ urls: string[] }>(
        "/owner/uploads",
        { method: "POST", body: uploadData },
      );

      await ownerApiRequest("/rooms", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          area: form.area,
          price: form.price,
          status: form.status,
          ownerPhone: form.ownerPhone,
          facilities,
          description: form.description,
          images: uploaded.urls,
        }),
      });

      setForm(emptyForm);
      setImageFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFormSuccess("Room listed successfully.");
      await loadData();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to add room",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRoom = async (roomId: string) => {
    setMyRooms((current) => current.filter((room) => room.id !== roomId));
    try {
      await ownerApiRequest(`/owner/rooms/${roomId}`, { method: "DELETE" });
    } catch {
      await loadData();
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: "confirmed" | "cancelled",
  ) => {
    setBookingActionId(bookingId);
    try {
      await ownerApiRequest(`/owner/bookings/${bookingId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking,
        ),
      );
    } catch {
      await loadData();
    } finally {
      setBookingActionId("");
    }
  };

  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const resolvedBookings = bookings.filter((booking) => booking.status !== "pending");

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <OwnerNav />

      <section className="mx-auto w-full max-w-[1160px] px-4 py-10 sm:px-5">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Owner Dashboard
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          List available rooms and manage booking requests from renters.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
            <h2 className="flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
              <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
              Add a Room
            </h2>

            <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                Title
                <input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Cozy Studio in Thamel"
                  required
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                />
              </label>

              <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                Area
                <input
                  value={form.area}
                  onChange={(event) => updateField("area", event.target.value)}
                  placeholder="Thamel, Kathmandu"
                  required
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  Price / month
                  <input
                    value={form.price}
                    onChange={(event) => updateField("price", event.target.value)}
                    placeholder="Rs 7,500"
                    required
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                  />
                </label>

                <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  Room type
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value)
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                  >
                    {roomTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                Contact phone
                <input
                  type="tel"
                  value={form.ownerPhone}
                  onChange={(event) => updateField("ownerPhone", event.target.value)}
                  placeholder="+9779800000000"
                  required
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                />
              </label>

              <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                Facilities
                <input
                  value={form.facilities}
                  onChange={(event) => updateField("facilities", event.target.value)}
                  placeholder="WiFi, Kitchen, Parking"
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                />
                <span className="text-xs font-medium text-slate-400">
                  Comma separated
                </span>
              </label>

              <div className="grid gap-2">
                <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                  Photos
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={(event) => {
                    addImageFiles(event.target.files);
                    event.target.value = "";
                  }}
                  className="sr-only"
                  id="room-images"
                />

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {imagePreviews.map((src, index) => (
                      <div
                        key={src}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <img
                          src={src}
                          alt={`Selected photo ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 text-center text-[9px] font-black uppercase text-white">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImageFile(index)}
                          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          <X size={12} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {imagePreviews.length < MAX_IMAGES && (
                  <label
                    htmlFor="room-images"
                    className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-500 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                  >
                    <ImagePlus size={20} aria-hidden="true" />
                    <span className="text-xs font-bold">
                      {imagePreviews.length > 0 ? "Add more photos" : "Upload photos"}
                    </span>
                  </label>
                )}
                <span className="text-xs font-medium text-slate-400">
                  Up to {MAX_IMAGES} images, JPG/PNG/WEBP/GIF, 5MB each. First photo is the cover.
                </span>
              </div>

              <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                Description
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe the room, amenities, and nearby landmarks..."
                  required
                  minLength={10}
                  rows={4}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                />
              </label>

              {formError && (
                <p className="text-sm font-bold text-rose-600" role="alert">
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {formSuccess}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-black text-white shadow-lg shadow-emerald-400/25 transition hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Plus size={16} aria-hidden="true" />
                )}
                {isSubmitting ? "Listing room..." : "List Room"}
              </button>
            </form>
          </article>

          <div className="grid gap-7">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
                <CalendarCheck size={18} strokeWidth={2.5} aria-hidden="true" />
                Booking Requests
                {pendingBookings.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {pendingBookings.length} pending
                  </span>
                )}
              </h2>

              {isLoading ? (
                <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
                  Loading requests...
                </p>
              ) : bookings.length === 0 ? (
                <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
                  No booking requests yet.
                </p>
              ) : (
                <div className="mt-5 grid gap-3">
                  {[...pendingBookings, ...resolvedBookings].map((booking) => (
                    <div
                      key={booking._id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm font-black text-slate-900 dark:text-white">
                          {booking.roomTitle}
                        </strong>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${statusStyles[booking.status]}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      {booking.message && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          &quot;{booking.message}&quot;
                        </p>
                      )}
                      <p className="mt-2 text-xs font-bold text-slate-400">
                        Requested {new Date(booking.createdAt).toLocaleString()}
                      </p>

                      {booking.status === "pending" && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={bookingActionId === booking._id}
                            onClick={() =>
                              void updateBookingStatus(booking._id, "confirmed")
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-black text-white transition hover:bg-emerald-600 disabled:opacity-60"
                          >
                            <CheckCircle2 size={14} aria-hidden="true" />
                            Confirm
                          </button>
                          <button
                            type="button"
                            disabled={bookingActionId === booking._id}
                            onClick={() =>
                              void updateBookingStatus(booking._id, "cancelled")
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:border-rose-900 dark:bg-slate-900 dark:hover:bg-rose-950/40"
                          >
                            <XCircle size={14} aria-hidden="true" />
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
                <Home size={18} strokeWidth={2.5} aria-hidden="true" />
                My Rooms
              </h2>

              {isLoading ? (
                <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
                  Loading rooms...
                </p>
              ) : myRooms.length === 0 ? (
                <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
                  You haven&apos;t listed any rooms yet.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {myRooms.map((room) => (
                    <div
                      key={room.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
                    >
                      <div className="relative h-32 w-full">
                        <SafeRoomImage
                          src={room.images[0]}
                          alt={room.title}
                          fill
                          sizes="(min-width: 640px) 190px, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <strong className="line-clamp-1 text-sm font-black text-slate-900 dark:text-white">
                          {room.title}
                        </strong>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin size={12} aria-hidden="true" />
                          {room.area}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-black text-emerald-600 dark:text-emerald-300">
                            {room.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => void deleteRoom(room.id)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                            aria-label={`Remove ${room.title}`}
                          >
                            <Trash2 size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
