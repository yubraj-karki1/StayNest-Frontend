"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

type SavedRoomToastProps = {
  message: string;
  onClose: () => void;
};

export default function SavedRoomToast({
  message,
  onClose,
}: SavedRoomToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 2200);
    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[60] flex max-w-[min(360px,calc(100vw-36px))] items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-2xl shadow-slate-950/25"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={18} className="flex-none text-emerald-300" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
