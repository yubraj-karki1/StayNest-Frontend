"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { apiRequest } from "../_lib/api";
import SavedRoomToast from "./saved-room-toast";

export default function RequestBookingButton({
  roomId,
  ownerName,
  className = "",
}: {
  roomId: number;
  ownerName?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const submit = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId,
          message: "Please contact me about this room.",
        }),
      });
      setStatus("sent");
      setToastMessage(
        ownerName ? `Booking request sent to ${ownerName}` : "Booking request sent",
      );
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send request",
      );
    }
  };

  return (
    <>
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
      {status === "error" && errorMessage && (
        <p className="mt-2 text-xs font-bold text-rose-600" role="alert">
          {errorMessage}
        </p>
      )}
      <SavedRoomToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </>
  );
}
