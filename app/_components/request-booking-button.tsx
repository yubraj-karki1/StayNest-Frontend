"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { apiRequest } from "../_lib/api";

export default function RequestBookingButton({
  roomId,
  className = "",
}: {
  roomId: number;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  const submit = async () => {
    setStatus("loading");
    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId,
          message: "Please contact me about this room.",
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <button
      type="button"
      className={
        className ||
        "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-black text-white shadow-lg shadow-emerald-400/25 transition hover:from-emerald-600 hover:to-teal-600 disabled:opacity-70"
      }
      onClick={submit}
      disabled={status === "loading" || status === "sent"}
    >
      <CalendarCheck size={16} aria-hidden="true" />
      {status === "loading"
        ? "Sending..."
        : status === "sent"
          ? "Request Sent"
          : status === "error"
            ? "Try Again"
            : "Request Booking"}
    </button>
  );
}
