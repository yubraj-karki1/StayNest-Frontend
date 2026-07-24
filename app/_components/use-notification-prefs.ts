"use client";

import { useCallback, useEffect, useState } from "react";

export type NotificationType = "room" | "price" | "review" | "booking";
export type NotificationPrefs = Record<NotificationType, boolean>;

const PREFS_KEY = "staynest_notification_prefs";
const PREFS_EVENT = "staynest-notification-prefs-changed";

const DEFAULT_PREFS: NotificationPrefs = {
  room: true,
  price: true,
  review: true,
  booking: true,
};

function readPrefs(): NotificationPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<NotificationPrefs>) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function useNotificationPrefs() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    setPrefs(readPrefs());
    const sync = () => setPrefs(readPrefs());
    window.addEventListener(PREFS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PREFS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setPref = useCallback((type: NotificationType, enabled: boolean) => {
    const next = { ...readPrefs(), [type]: enabled };
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    setPrefs(next);
    window.dispatchEvent(new Event(PREFS_EVENT));
  }, []);

  return { prefs, setPref };
}
