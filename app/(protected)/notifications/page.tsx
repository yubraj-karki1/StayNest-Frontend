"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Heart,
  Home,
  House,
  Star,
  TrendingDown,
  User,
} from "lucide-react";
import LogoutButton from "../../_components/logout-button";
import ThemeToggle from "../../_components/theme-toggle";
import { apiRequest } from "../../_lib/api";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "room" | "price" | "review" | "booking";
  read: boolean;
  createdAt: string;
};

const notificationIcons = {
  room: House,
  price: TrendingDown,
  review: Star,
  booking: Home,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadIds = notifications
    .filter((notification) => !notification.read)
    .map((notification) => notification.id);

  useEffect(() => {
    apiRequest<{ notifications: Notification[] }>("/notifications")
      .then(({ notifications: items }) => setNotifications(items))
      .catch(() => setNotifications([]));
  }, []);

  const markAsRead = async (id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
    await apiRequest(`/notifications/${id}/read`, { method: "PATCH" }).catch(
      () => undefined,
    );
  };

  const markAllAsRead = async () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    );
    await apiRequest("/notifications/read-all", { method: "POST" }).catch(
      () => undefined,
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(rgba(232,237,228,0.78),rgba(232,237,228,0.78)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center text-slate-700 dark:bg-[linear-gradient(rgba(2,6,23,0.88),rgba(2,6,23,0.88)),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85')] dark:text-slate-200 sm:bg-fixed">
      <nav className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 border-b border-slate-900/10 bg-white/75 px-4 py-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80 sm:px-8 lg:px-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xl font-black text-slate-900"
        >
          <Home size={24} strokeWidth={2.4} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-7">
          <Link
            href="/saved"
            className="hidden items-center gap-2 text-sm font-black text-slate-900 sm:inline-flex"
          >
            <Heart size={14} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="hidden items-center gap-2 text-sm font-black text-slate-900 sm:inline-flex"
          >
            <User size={14} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <span
            className="relative grid h-8 w-8 place-items-center text-emerald-600"
            aria-label="Notifications"
          >
            <Bell size={17} aria-hidden="true" />
            {unreadIds.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
            )}
          </span>
          <ThemeToggle />
          <LogoutButton
            iconSize={14}
            className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100"
          />
        </div>
      </nav>

      <section className="mx-auto w-full max-w-[620px] px-3 py-8 sm:px-5 sm:py-14">
        <Link
          href="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to dashboard
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-5">
            <div>
              <h1 className="text-2xl font-black text-slate-800">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Stay updated with new listings
              </p>
            </div>
            <button
              type="button"
              className={`flex-none text-sm font-black ${
                unreadIds.length > 0
                  ? "cursor-pointer text-emerald-600"
                  : "cursor-default text-slate-400"
              }`}
              onClick={markAllAsRead}
              disabled={unreadIds.length === 0}
            >
              {unreadIds.length > 0 ? "Mark all as read" : "All caught up"}
            </button>
          </header>

          <div className="bg-white">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                const isUnread = unreadIds.includes(notification.id);

                return (
                  <button
                    type="button"
                    className="relative grid min-h-32 w-full grid-cols-[40px_minmax(0,1fr)_9px] gap-3 border-b border-slate-200 bg-white px-3 py-5 text-left text-slate-700 transition hover:bg-slate-50 sm:grid-cols-[46px_minmax(0,1fr)_9px] sm:gap-4 sm:px-4"
                    onClick={() => markAsRead(notification.id)}
                    key={notification.id}
                    aria-label={`${notification.title}${
                      isUnread ? ", unread" : ""
                    }`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-400">
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col items-start">
                      <strong className="mt-1 text-base font-black text-slate-800">
                        {notification.title}
                      </strong>
                      <span className="mt-2 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </span>
                      <span className="mt-2 text-sm font-black text-slate-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </span>
                    {isUnread && (
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-5 py-14 text-center">
                <Bell
                  size={38}
                  className="mx-auto text-slate-300"
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-bold text-slate-500">
                  No notifications yet.
                </p>
              </div>
            )}
          </div>

          <footer className="flex flex-col items-center gap-2 bg-emerald-50 px-5 py-7 text-center">
            <strong className="text-base font-black text-slate-800">
              Welcome to StayNest
            </strong>
            <span className="text-sm text-slate-600">
              Find and save your dream rooms effortlessly.
            </span>
          </footer>
        </article>
      </section>
    </main>
  );
}
