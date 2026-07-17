"use client";

import { useCallback, useState } from "react";
import { Heart } from "lucide-react";
import SavedRoomToast from "./saved-room-toast";
import { useSavedRooms } from "./use-saved-rooms";

type SaveRoomButtonProps = {
  roomId: string;
  className?: string;
};

export default function SaveRoomButton({
  roomId,
  className = "",
}: SaveRoomButtonProps) {
  const { savedRoomIds, toggleSavedRoom } = useSavedRooms();
  const [toastMessage, setToastMessage] = useState("");
  const isSaved = savedRoomIds.includes(roomId);

  const handleSaveClick = useCallback(() => {
    setToastMessage(isSaved ? "Removed from saved rooms" : "Room saved");
    void toggleSavedRoom(roomId);
  }, [isSaved, roomId, toggleSavedRoom]);

  return (
    <>
      <button
        type="button"
        className={
          className ||
          `flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-black transition ${
            isSaved
              ? "border-rose-200 bg-rose-50 text-rose-600"
              : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
          }`
        }
        onClick={handleSaveClick}
        aria-pressed={isSaved}
      >
        <Heart
          size={15}
          className={isSaved ? "fill-current text-rose-500" : "text-current"}
          aria-hidden="true"
        />
        {isSaved ? "Saved Room" : "Save Room"}
      </button>
      <SavedRoomToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </>
  );
}
