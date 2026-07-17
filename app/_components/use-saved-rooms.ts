"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../_lib/api";

const SAVED_ROOMS_EVENT = "staynest-saved-rooms-changed";

export function useSavedRooms() {
  const [savedRoomIds, setSavedRoomIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadSavedRooms = useCallback(async () => {
    try {
      const result = await apiRequest<{ roomIds: string[] }>("/saved-rooms");
      setSavedRoomIds(result.roomIds);
    } catch {
      setSavedRoomIds([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadSavedRooms();
    const sync = () => void loadSavedRooms();
    window.addEventListener(SAVED_ROOMS_EVENT, sync);
    return () => window.removeEventListener(SAVED_ROOMS_EVENT, sync);
  }, [loadSavedRooms]);

  const toggleSavedRoom = useCallback(async (roomId: string) => {
    setSavedRoomIds((current) =>
      current.includes(roomId)
        ? current.filter((savedId) => savedId !== roomId)
        : [...current, roomId],
    );
    try {
      await apiRequest(`/saved-rooms/${roomId}`, { method: "PUT" });
      window.dispatchEvent(new Event(SAVED_ROOMS_EVENT));
    } catch {
      await loadSavedRooms();
    }
  }, [loadSavedRooms]);

  const removeSavedRoom = useCallback(async (roomId: string) => {
    setSavedRoomIds((current) => current.filter((savedId) => savedId !== roomId));
    try {
      await apiRequest(`/saved-rooms/${roomId}`, { method: "DELETE" });
      window.dispatchEvent(new Event(SAVED_ROOMS_EVENT));
    } catch {
      await loadSavedRooms();
    }
  }, [loadSavedRooms]);

  return { savedRoomIds, isLoaded, toggleSavedRoom, removeSavedRoom };
}
