"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Home, House, Settings, Star, TrendingDown } from "lucide-react";
import AppNav from "../../_components/app-nav";
import { useNotificationPrefs } from "../../_components/use-notification-prefs";
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
  const { prefs } = useNotificationPrefs();
  const visibleNotifications = notifications.filter(
    (notification) => prefs[notification.type],
  );
  const unreadIds = visibleNotifications
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
      current.map((item) => (prefs[item.type] ? { ...item, read: true } : item)),
    );
    await apiRequest("/notifications/read-all", { method: "POST" }).catch(
      () => undefined,
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(rgba(232,237,228,0.78),rgba(232,237,228,0.78)),url('/images/hero-hostel.jpg')] bg-cover bg-center text-slate-700 dark:bg-[linear-gradient(rgba(2,6,23,0.88),rgba(2,6,23,0.88)),url('/images/hero-hostel.jpg')] dark:text-slate-200 sm:bg-fixed">
      <AppNav unreadCount={unreadIds.length} />

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
            <div className="flex flex-none items-center gap-4">
              <button
                type="button"
                className={`text-sm font-black ${
                  unreadIds.length > 0
                    ? "cursor-pointer text-emerald-600"
                    : "cursor-default text-slate-400"
                }`}
                onClick={markAllAsRead}
                disabled={unreadIds.length === 0}
              >
                {unreadIds.length > 0 ? "Mark all as read" : "All caught up"}
              </button>
              <Link
                href="/settings"
                className="inline-flex items-center gap-1.5 text-sm font-black text-slate-500 hover:text-emerald-700"
                aria-label="Notification settings"
              >
                <Settings size={16} aria-hidden="true" />
              </Link>
            </div>
          </header>

          <div className="bg-white">
            {visibleNotifications.length > 0 ? (
              visibleNotifications.map((notification) => {
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
