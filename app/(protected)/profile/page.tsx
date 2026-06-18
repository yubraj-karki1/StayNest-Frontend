"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Heart,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Settings,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import LogoutButton from "../../_components/logout-button";
import ThemeToggle from "../../_components/theme-toggle";
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
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    apiRequest<{ user: UserProfile }>("/profile")
      .then(({ user }) => {
        setName(user.fullName);
        setEmail(user.email);
        setPhone(user.contactNo);
        setLocation(user.location);
        setAbout(user.about);
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
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="bg-gradient-to-r from-slate-600 via-slate-400 to-indigo-200 px-5 py-10 text-white sm:px-8 lg:px-16">
        <div className="mx-auto mb-6 flex w-[min(1160px,100%)] justify-end">
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-[min(1160px,100%)] flex-wrap items-end justify-between gap-7">
          <div className="flex min-w-0 items-center gap-6">
            <div className="relative h-28 w-28 flex-none rotate-2 rounded-2xl border-4 border-white bg-slate-200 shadow-xl shadow-slate-900/25">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85"
                alt={name}
                className="h-full w-full rounded-xl object-cover"
              />
              <span className="absolute -bottom-3 -right-3 inline-flex -rotate-2 items-center gap-1 rounded-full border-2 border-white bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">
                <CheckCircle2 size={11} aria-hidden="true" />
                Verified
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-black leading-none tracking-normal sm:text-5xl">
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/25 px-4 text-sm font-black text-white transition hover:bg-white/30"
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-emerald-700 shadow-lg shadow-slate-900/15 transition hover:bg-emerald-50"
              onClick={shareProfile}
            >
              <Share2 size={14} aria-hidden="true" />
              {shareStatus || "Share Profile"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1160px,calc(100%-32px))] py-10">
        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-lg shadow-slate-200/60"
              key={stat.label}
            >
              <strong className="block text-2xl font-black text-emerald-700">
                {stat.value}
              </strong>
              <span className="mt-2 block text-[10px] font-black uppercase tracking-wide text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <header className="flex items-center justify-between gap-3 bg-slate-100 px-6 py-5">
              <h2 className="flex items-center gap-3 text-xl font-black text-slate-950">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <LockKeyhole size={16} aria-hidden="true" />
                </span>
                Account Information
              </h2>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black text-white">
                PRIVATE
              </span>
            </header>

            <div className="p-6">
              {isEditing ? (
                <form
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  onSubmit={handleSubmit}
                >
                  <label className="grid gap-2 text-sm font-black text-slate-700">
                    Full name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 px-4 text-base font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700">
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 px-4 text-base font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700">
                    Phone number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 px-4 text-base font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700">
                    Primary location
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      required
                      className="h-12 rounded-xl border border-slate-200 px-4 text-base font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
                    About me
                    <input
                      value={about}
                      onChange={(event) => setAbout(event.target.value)}
                      className="h-12 rounded-xl border border-slate-200 px-4 text-base font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
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
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                      Email Address
                    </span>
                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Mail size={15} aria-hidden="true" />
                      {email}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                      Phone Number
                    </span>
                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Phone size={15} aria-hidden="true" />
                      {phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                      Primary Location
                    </span>
                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <MapPin size={15} aria-hidden="true" />
                      {location}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                      Identity Verification
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                      <ShieldCheck size={14} aria-hidden="true" />
                      Identity Confirmed
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                      About Me
                    </span>
                    <p className="mt-2 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                      &quot;{about}&quot;
                    </p>
                  </div>
                </div>
              )}

              {isSaved && (
                <p
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700"
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
            </div>
          </article>

          <aside>
            <h2 className="mb-4 text-xl font-black text-slate-950">
              Account Management
            </h2>
            <div className="grid gap-3">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl"
                onClick={() => setIsEditing(true)}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Settings size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900">
                    Account Settings
                  </span>
                  <span className="block text-xs text-slate-500">
                    Security & privacy preferences
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>

              <Link
                href="/saved"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
                  <Heart size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900">
                    Saved Rooms
                  </span>
                  <span className="block text-xs text-slate-500">
                    Manage your favorites list
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <RotateCcw size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-slate-900">
                    Booking History
                  </span>
                  <span className="block text-xs text-slate-500">
                    Past and upcoming trips
                  </span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <LogoutButton
                iconSize={16}
                className="flex w-full items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-left text-sm font-black text-rose-600 transition hover:bg-rose-100"
              />
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white shadow-xl shadow-emerald-400/25">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black">
                LIMITED OFFER
              </span>
              <h2 className="mt-4 text-2xl font-black">Host with StayNest</h2>
              <p className="mt-2 text-sm leading-6 text-white/90">
                Earn by sharing your space with the StayNest community.
              </p>
              <a
                href="mailto:partners@staynest.com?subject=Host with StayNest"
                className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-emerald-700"
              >
                Learn More
              </a>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex w-[min(1160px,100%)] flex-wrap items-center justify-between gap-5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xl font-black text-slate-900"
          >
            <Home size={25} aria-hidden="true" />
            StayNest
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/legal#privacy" className="text-xs text-slate-500">
              Privacy Policy
            </Link>
            <Link href="/legal#terms" className="text-xs text-slate-500">
              Terms
            </Link>
            <a href="mailto:support@staynest.com" className="text-xs text-slate-500">
              Help Center
            </a>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Star size={14} aria-hidden="true" />
            4.9 member rating
          </span>
          <p className="w-full border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
            (c) 2026 StayNest Inc. Crafted with care for room seekers.
          </p>
        </div>
      </footer>
    </main>
  );
}
