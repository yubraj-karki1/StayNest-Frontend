"use client";

import { useState, type CSSProperties } from "react";
import { CalendarCheck } from "lucide-react";
import { apiRequest } from "../_lib/api";

export default function RequestBookingButton({
  roomId,
  style,
}: {
  roomId: number;
  style?: CSSProperties;
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
      style={style}
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
