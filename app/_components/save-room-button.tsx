"use client";

import type { CSSProperties } from "react";
import { Heart } from "lucide-react";
import { useSavedRooms } from "./use-saved-rooms";

type SaveRoomButtonProps = {
  roomId: number;
  style?: CSSProperties;
};

export default function SaveRoomButton({
  roomId,
  style,
}: SaveRoomButtonProps) {
  const { savedRoomIds, toggleSavedRoom } = useSavedRooms();
  const isSaved = savedRoomIds.includes(roomId);

  return (
    <button
      type="button"
      style={{
        ...style,
        borderColor: isSaved ? "#e2505e" : style?.borderColor,
        background: isSaved ? "#fff2f4" : style?.background,
        color: isSaved ? "#b83f50" : style?.color,
      }}
      onClick={() => toggleSavedRoom(roomId)}
      aria-pressed={isSaved}
    >
      <Heart
        size={15}
        color={isSaved ? "#e2505e" : "currentColor"}
        fill={isSaved ? "#e2505e" : "none"}
        aria-hidden="true"
      />
      {isSaved ? "Saved Room" : "Save Room"}
    </button>
  );
}
