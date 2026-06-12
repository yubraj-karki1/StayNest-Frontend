"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Home, MapPin, Trash2 } from "lucide-react";
import LogoutButton from "../../_components/logout-button";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { rooms } from "../rooms/room-data";

const styles = {
  page: {
    minHeight: "100vh",
    color: "#172019",
    fontFamily: "Arial, Helvetica, sans-serif",
    background:
      "linear-gradient(rgba(232, 237, 228, 0.9), rgba(232, 237, 228, 0.9)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85') center / cover fixed",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    minHeight: 72,
    padding: "0 clamp(18px, 4vw, 48px)",
    background: "rgba(255, 255, 255, 0.62)",
    backdropFilter: "blur(14px)",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#111611",
    fontSize: 22,
    fontWeight: 800,
    textDecoration: "none",
  },
  logout: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#111611",
    fontSize: 14,
    fontWeight: 800,
  },
  content: {
    width: "min(1100px, calc(100% - 28px))",
    margin: "0 auto",
    padding: "42px 0 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: "#343a35",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  heading: {
    margin: "24px 0 8px",
    fontSize: "clamp(30px, 5vw, 44px)",
  },
  subtitle: {
    margin: "0 0 30px",
    color: "#687069",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: 24,
  },
  card: {
    overflow: "hidden",
    borderRadius: 16,
    background: "#ffffff",
    boxShadow: "0 18px 50px rgba(24, 34, 26, 0.14)",
  },
  image: {
    width: "100%",
    height: 210,
    objectFit: "cover",
  },
  cardBody: {
    padding: 18,
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: 19,
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    margin: "0 0 18px",
    color: "#737a74",
    fontSize: 13,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  price: {
    color: "#e06a45",
    fontWeight: 800,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  viewButton: {
    borderRadius: 7,
    background: "#4d82de",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 800,
    padding: "9px 12px",
    textDecoration: "none",
  },
  removeButton: {
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    border: "1px solid #efcbd0",
    borderRadius: 7,
    background: "#fff6f7",
    color: "#c34b5b",
    cursor: "pointer",
  },
  empty: {
    borderRadius: 18,
    background: "rgba(255, 255, 255, 0.88)",
    boxShadow: "0 18px 55px rgba(24, 34, 26, 0.12)",
    padding: "70px 24px",
    textAlign: "center",
  },
  emptyIcon: {
    color: "#e2505e",
  },
  emptyTitle: {
    margin: "16px 0 8px",
    fontSize: 23,
  },
  emptyCopy: {
    margin: "0 0 22px",
    color: "#6d746e",
  },
} satisfies Record<string, CSSProperties>;

export default function SavedRoomsPage() {
  const { savedRoomIds, isLoaded, removeSavedRoom } = useSavedRooms();
  const savedRooms = rooms.filter((room) => savedRoomIds.includes(room.id));

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/dashboard" style={styles.logo}>
          <Home size={23} aria-hidden="true" />
          StayNest
        </Link>
        <LogoutButton iconSize={13} style={styles.logout} />
      </nav>

      <section style={styles.content}>
        <Link href="/dashboard" style={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to dashboard
        </Link>
        <h1 style={styles.heading}>Saved Rooms</h1>
        <p style={styles.subtitle}>
          {savedRooms.length} {savedRooms.length === 1 ? "room" : "rooms"} saved
        </p>

        {!isLoaded ? (
          <div style={styles.empty}>
            <p style={styles.emptyCopy}>Loading saved rooms...</p>
          </div>
        ) : savedRooms.length > 0 ? (
          <div style={styles.grid}>
            {savedRooms.map((room) => (
              <article style={styles.card} key={room.id}>
                <img src={room.images[0]} alt={room.title} style={styles.image} />
                <div style={styles.cardBody}>
                  <h2 style={styles.cardTitle}>{room.title}</h2>
                  <p style={styles.location}>
                    <MapPin size={14} aria-hidden="true" />
                    {room.area}
                  </p>
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>{room.price} / month</span>
                    <div style={styles.actions}>
                      <Link href={`/rooms/${room.id}`} style={styles.viewButton}>
                        View Room
                      </Link>
                      <button
                        type="button"
                        style={styles.removeButton}
                        onClick={() => removeSavedRoom(room.id)}
                        aria-label={`Remove ${room.title} from saved rooms`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <Heart size={42} style={styles.emptyIcon} aria-hidden="true" />
            <h2 style={styles.emptyTitle}>No saved rooms yet</h2>
            <p style={styles.emptyCopy}>
              Save rooms you like and they will appear here.
            </p>
            <Link href="/dashboard" style={styles.viewButton}>
              Browse Properties
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
