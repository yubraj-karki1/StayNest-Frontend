"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "staynest-saved-room-ids";
const SAVED_ROOMS_EVENT = "staynest-saved-rooms-changed";

function readSavedRoomIds() {
  try {
    const savedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!savedValue) return [];

    const parsedValue: unknown = JSON.parse(savedValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(
      (roomId): roomId is number =>
        typeof roomId === "number" && Number.isInteger(roomId),
    );
  } catch {
    return [];
  }
}

export function useSavedRooms() {
  const [savedRoomIds, setSavedRoomIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const syncSavedRooms = () => {
      setSavedRoomIds(readSavedRoomIds());
      setIsLoaded(true);
    };

    syncSavedRooms();
    window.addEventListener("storage", syncSavedRooms);
    window.addEventListener(SAVED_ROOMS_EVENT, syncSavedRooms);

    return () => {
      window.removeEventListener("storage", syncSavedRooms);
      window.removeEventListener(SAVED_ROOMS_EVENT, syncSavedRooms);
    };
  }, []);

  const updateSavedRooms = useCallback((nextRoomIds: number[]) => {
    const uniqueRoomIds = [...new Set(nextRoomIds)];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueRoomIds));
    } catch {
      return;
    }
    setSavedRoomIds(uniqueRoomIds);
    window.dispatchEvent(new Event(SAVED_ROOMS_EVENT));
  }, []);

  const toggleSavedRoom = useCallback(
    (roomId: number) => {
      const currentRoomIds = readSavedRoomIds();
      updateSavedRooms(
        currentRoomIds.includes(roomId)
          ? currentRoomIds.filter((savedId) => savedId !== roomId)
          : [...currentRoomIds, roomId],
      );
    },
    [updateSavedRooms],
  );

  const removeSavedRoom = useCallback(
    (roomId: number) => {
      updateSavedRooms(
        readSavedRoomIds().filter((savedId) => savedId !== roomId),
      );
    },
    [updateSavedRooms],
  );

  return {
    savedRoomIds,
    isLoaded,
    toggleSavedRoom,
    removeSavedRoom,
  };
}
