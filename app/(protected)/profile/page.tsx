"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Camera,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Heart,
  Home,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import AppNav from "../../_components/app-nav";
import LogoutButton from "../../_components/logout-button";
import SafeRoomImage from "../../_components/safe-room-image";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { apiRequest, type UserProfile } from "../../_lib/api";

export default function ProfilePage() {
  const { savedRoomIds } = useSavedRooms();
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alexjohnson@gmail.com");
  const [phone, setPhone] = useState("+977 98-1234-5678");
  const [location, setLocation] = useState("Kathmandu, Nepal");
  const [about, setAbout] = useState(
    "Passionate traveler and tech enthusiast. Always looking for unique architectural stays and local cultural experiences in the heart of the city.",
  );
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [profileError, setProfileError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiRequest<{ user: UserProfile }>("/profile")
      .then(({ user }) => {
        setName(user.fullName);
        setEmail(user.email);
        setPhone(user.contactNo);
        setLocation(user.location);
        setAbout(user.about);
        setAvatarUrl(user.avatarUrl ?? "");
      })
      .catch((error) =>
        setProfileError(
          error instanceof Error ? error.message : "Unable to load profile",
        ),
      );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError("");

    try {
      await apiRequest("/profile", {
        method: "PUT",
        body: JSON.stringify({
          fullName: name,
          email,
          contactNo: phone,
          location,
          about,
        }),
      });
      setIsSaved(true);
      setIsEditing(false);
    } catch (error) {
      setProfileError(
        error instanceof Error ? error.message : "Unable to save profile",
      );
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file) return;
    setAvatarError("");

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be 5MB or smaller.");
      return;
    }
    if (!window.confirm("Set this as your new profile picture?")) {
      return;
    }

    setIsUploadingAvatar(true);
    const previewUrl = URL.createObjectURL(file);
    const previousAvatarUrl = avatarUrl;
    setAvatarUrl(previewUrl);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const uploaded = await apiRequest<{ url: string }>("/uploads/avatar", {
        method: "POST",
        body: formData,
      });

      await apiRequest("/profile", {
        method: "PUT",
        body: JSON.stringify({
          fullName: name,
          email,
          contactNo: phone,
          location,
          about,
          avatarUrl: uploaded.url,
        }),
      });

      setAvatarUrl(uploaded.url);
    } catch (error) {
      setAvatarUrl(previousAvatarUrl);
      setAvatarError(
        error instanceof Error ? error.message : "Unable to upload photo",
      );
    } finally {
      URL.revokeObjectURL(previewUrl);
      setIsUploadingAvatar(false);
    }
  };

  const shareProfile = async () => {
    const shareData = {
      title: `${name}'s StayNest profile`,
      text: `View ${name}'s StayNest profile.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Profile shared");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Profile link copied");
      }
    } catch {
      setShareStatus("");
    }
  };

  const stats = [
    { value: "12", label: "Stays" },
    { value: String(savedRoomIds.length), label: "Saved" },
    { value: "4.9", label: "Rating" },
    { value: "24", label: "Reviews" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppNav />

      <section className="bg-gradient-to-r from-slate-600 via-slate-400 to-indigo-200 px-5 py-10 text-white dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 sm:px-8 lg:px-16">
        <div className="mx-auto flex w-[min(1160px,100%)] flex-wrap items-end justify-between gap-7">
          <div className="flex min-w-0 flex-wrap items-center gap-6">
            <div className="relative h-28 w-28 flex-none rotate-2 rounded-2xl border-4 border-white bg-slate-200 shadow-xl shadow-slate-900/25 dark:border-slate-700 dark:bg-slate-800">
              {avatarUrl ? (
                <SafeRoomImage
                  src={avatarUrl}
                  alt={name}
                  fill
                  sizes="112px"
                  className="rounded-xl object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  <UserRound size={40} aria-hidden="true" />
                </div>
              )}

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                id="avatar-upload"
                onChange={(event) => {
                  void handleAvatarChange(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-3 -left-3 grid h-9 w-9 -rotate-2 cursor-pointer place-items-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg transition hover:bg-slate-700 dark:border-slate-800"
                aria-label="Upload profile photo"
              >
                {isUploadingAvatar ? (
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Camera size={14} aria-hidden="true" />
                )}
              </label>

              <span className="absolute -bottom-3 -right-3 inline-flex -rotate-2 items-center gap-1 rounded-full border-2 border-white bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700 dark:border-slate-800 dark:bg-emerald-950 dark:text-emerald-200">
                <CheckCircle2 size={11} aria-hidden="true" />
                Verified
              </span>
            </div>

            <div>
              <h1 className="break-words text-4xl font-black leading-none tracking-normal sm:text-5xl">
                {name}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/90">
                <span className="inline-flex items-center gap-1">
                  <CalendarClock size={13} aria-hidden="true" />
                  Joined March 2026
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} aria-hidden="true" />
                  {location}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/25 px-4 text-sm font-black text-white transition hover:bg-white/30 dark:border-slate-600 dark:bg-slate-900/50 dark:hover:bg-slate-800"
              onClick={() => {
                setIsEditing(true);
                setIsSaved(false);
              }}
            >
              <Edit3 size={14} aria-hidden="true" />
              Edit Profile
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-emerald-700 shadow-lg shadow-slate-900/15 transition hover:bg-emerald-50 dark:bg-slate-100 dark:text-emerald-800 dark:hover:bg-white"
              onClick={shareProfile}
            >
              <Share2 size={14} aria-hidden="true" />
              {shareStatus || "Share Profile"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1160px] px-4 py-10 sm:px-5">
        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40"
              key={stat.label}
            >
              <strong className="block text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {stat.value}
              </strong>
              <span className="mt-2 block text-[10px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/50">
            <header className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 px-5 py-5 dark:bg-slate-800 sm:px-6">
              <h2 className="flex items-center gap-3 text-xl font-black text-slate-950 dark:text-white">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <LockKeyhole size={16} aria-hidden="true" />
                </span>
                Account Information
              </h2>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black text-white dark:bg-slate-100 dark:text-slate-950">
                PRIVATE
              </span>
            </header>

            <div className="p-5 sm:p-6">
              {isEditing ? (
                <form
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  onSubmit={handleSubmit}
                >
                  <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                    Full name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                    Phone number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                    Primary location
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200 md:col-span-2">
                    About me
                    <input
                      value={about}
                      onChange={(event) => setAbout(event.target.value)}
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
                    />
                  </label>
                  <div className="flex flex-wrap gap-3 md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-black text-white"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Email Address
                    </span>
                    <p className="mt-2 flex min-w-0 items-center gap-2 break-words text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Mail size={15} aria-hidden="true" />
                      {email}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Phone Number
                    </span>
                    <p className="mt-2 flex min-w-0 items-center gap-2 break-words text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Phone size={15} aria-hidden="true" />
                      {phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Primary Location
                    </span>
                    <p className="mt-2 flex min-w-0 items-center gap-2 break-words text-sm font-bold text-slate-700 dark:text-slate-200">
                      <MapPin size={15} aria-hidden="true" />
                      {location}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Identity Verification
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <ShieldCheck size={14} aria-hidden="true" />
                      Identity Confirmed
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      About Me
                    </span>
                    <p className="mt-2 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                      &quot;{about}&quot;
                    </p>
                  </div>
                </div>
              )}

              {isSaved && (
                <p
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  role="status"
                >
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Profile saved successfully.
                </p>
              )}
              {profileError && (
                <p className="mt-5 text-sm font-bold text-rose-600" role="alert">
                  {profileError}
                </p>
              )}
              {avatarError && (
                <p className="mt-5 text-sm font-bold text-rose-600" role="alert">
                  {avatarError}
                </p>
              )}
            </div>
          </article>

          <aside>
            <h2 className="mb-4 text-xl font-black text-slate-950 dark:text-white">
              Account Management
            </h2>
            <div className="grid gap-3">
              <Link
                href="/settings"
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 dark:hover:bg-slate-800"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Settings size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900 dark:text-white">
                    Account Settings
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Appearance & notification preferences
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <Link
                href="/saved"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 dark:hover:bg-slate-800"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                  <Heart size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900 dark:text-white">
                    Saved Rooms
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Manage your favorites list
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <div
                className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 opacity-70 dark:border-slate-700 dark:bg-slate-900/60"
                aria-disabled="true"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  <RotateCcw size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900 dark:text-white">
                    Booking History
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Past and upcoming trips
                  </span>
                </span>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Soon
                </span>
              </div>

              <LogoutButton
                iconSize={16}
                className="flex w-full items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-left text-sm font-black text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-300 dark:hover:bg-rose-950"
              />
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white shadow-xl shadow-emerald-400/25 dark:from-emerald-800 dark:to-teal-900 dark:shadow-slate-950/50">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black">
                LIMITED OFFER
              </span>
              <h2 className="mt-4 text-2xl font-black">Host with StayNest</h2>
              <p className="mt-2 text-sm leading-6 text-white/90">
                Earn by sharing your space with the StayNest community.
              </p>
              <a
                href="mailto:partners@staynest.com?subject=Host with StayNest"
                className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-emerald-700 dark:bg-slate-100 dark:text-emerald-800"
              >
                Learn More
              </a>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex w-[min(1160px,100%)] flex-wrap items-center justify-between gap-5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white"
          >
            <Home size={25} aria-hidden="true" />
            StayNest
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/legal#privacy" className="text-xs text-slate-500 dark:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/legal#terms" className="text-xs text-slate-500 dark:text-slate-400">
              Terms
            </Link>
            <a href="mailto:support@staynest.com" className="text-xs text-slate-500 dark:text-slate-400">
              Help Center
            </a>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Star size={14} aria-hidden="true" />
            4.9 member rating
          </span>
          <p className="w-full border-t border-slate-200 pt-4 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
            (c) 2026 StayNest Inc. Crafted with care for room seekers.
          </p>
        </div>
      </footer>
    </main>
  );
}
