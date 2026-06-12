"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Home,
  House,
  LogOut,
  Star,
  TrendingDown,
  User,
} from "lucide-react";

const styles = {
  page: {
    minHeight: "100vh",
    color: "#454751",
    fontFamily: "Arial, Helvetica, sans-serif",
    background:
      "linear-gradient(rgba(232, 237, 228, 0.78), rgba(232, 237, 228, 0.78)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85') center / cover fixed",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    height: 72,
    padding: "0 clamp(18px, 4vw, 48px)",
    background: "rgba(255, 255, 255, 0.72)",
    borderBottom: "1px solid rgba(79, 85, 80, 0.12)",
    backdropFilter: "blur(14px)",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#111511",
    fontSize: "clamp(18px, 3vw, 22px)",
    fontWeight: 800,
    textDecoration: "none",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 3vw, 36px)",
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#111511",
    fontSize: "clamp(12px, 2vw, 14px)",
    fontWeight: 800,
    textDecoration: "none",
  },
  activeNotification: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 30,
    height: 30,
    color: "#517fe0",
  },
  navDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 7,
    height: 7,
    border: "2px solid #f3f5f1",
    borderRadius: "50%",
    background: "#e74335",
  },
  content: {
    width: "min(calc(100% - 20px), 620px)",
    margin: "0 auto",
    padding: "clamp(26px, 6vw, 54px) 0 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    marginBottom: 18,
    color: "#34383a",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  card: {
    overflow: "hidden",
    border: "1px solid #d8dbe1",
    borderRadius: 16,
    background: "#ffffff",
    boxShadow: "0 24px 70px rgba(35, 43, 37, 0.18)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "23px clamp(14px, 4vw, 20px) 18px",
    borderBottom: "1px solid #d8dbe1",
  },
  title: {
    margin: "0 0 3px",
    color: "#41434b",
    fontSize: "clamp(19px, 4vw, 22px)",
    lineHeight: 1.1,
  },
  subtitle: {
    margin: 0,
    color: "#92939b",
    fontSize: "clamp(12px, 3vw, 14px)",
  },
  markAll: {
    flex: "0 0 auto",
    border: 0,
    background: "transparent",
    cursor: "pointer",
    font: "700 clamp(13px, 3vw, 16px) Arial, Helvetica, sans-serif",
    padding: "7px 0",
  },
  list: {
    background: "#ffffff",
  },
  notification: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "46px minmax(0, 1fr) 9px",
    gap: "clamp(12px, 3vw, 18px)",
    width: "100%",
    minHeight: 132,
    border: 0,
    borderBottom: "1px solid #e0e1e5",
    background: "#ffffff",
    color: "inherit",
    cursor: "pointer",
    padding: "18px clamp(14px, 4vw, 18px)",
    textAlign: "left",
  },
  iconCircle: {
    display: "grid",
    placeItems: "center",
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "#ffebe5",
    color: "#ed927d",
  },
  notificationBody: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  notificationTitle: {
    margin: "2px 0 7px",
    color: "#484a52",
    fontSize: 16,
  },
  message: {
    color: "#53555e",
    fontSize: "clamp(14px, 3vw, 16px)",
    lineHeight: 1.45,
  },
  time: {
    marginTop: 6,
    color: "#85878e",
    fontSize: 14,
    fontWeight: 800,
  },
  unreadDot: {
    width: 9,
    height: 9,
    marginTop: 8,
    borderRadius: "50%",
    background: "#6894ed",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "28px 20px 25px",
    background: "#edf3ff",
    textAlign: "center",
  },
  footerTitle: {
    fontSize: 16,
  },
  footerCopy: {
    fontSize: 14,
  },
} satisfies Record<string, CSSProperties>;

const initialNotifications = [
  {
    id: 1,
    title: "New Room in Thamel",
    message: "A studio matching your filters was just listed.",
    time: "2M AGO",
    icon: House,
  },
  {
    id: 2,
    title: "Price dropped",
    message: "Kupondole 1 BHK is now RS. 12,000 / month (was 14,000)",
    time: "2H AGO",
    icon: TrendingDown,
  },
  {
    id: 3,
    title: "New Review",
    message: "Your saved room received a new five-star review.",
    time: "1D AGO",
    icon: Star,
  },
];

export default function NotificationsPage() {
  const [unreadIds, setUnreadIds] = useState(() =>
    initialNotifications.map((notification) => notification.id),
  );

  const markAsRead = (id: number) => {
    setUnreadIds((current) => current.filter((unreadId) => unreadId !== id));
  };

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/dashboard" style={styles.logo}>
          <Home size={24} strokeWidth={2.4} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div style={styles.navActions}>
          <a href="#" style={styles.navLink}>
            <User size={14} aria-hidden="true" />
            <span>Profile</span>
          </a>
          <span style={styles.activeNotification} aria-label="Notifications">
            <Bell size={17} aria-hidden="true" />
            {unreadIds.length > 0 && <span style={styles.navDot} />}
          </span>
          <Link href="/login" style={styles.navLink}>
            <LogOut size={14} aria-hidden="true" />
            <span>Logout</span>
          </Link>
        </div>
      </nav>

      <section style={styles.content}>
        <Link href="/dashboard" style={styles.backLink}>
          <ArrowLeft size={17} aria-hidden="true" />
          Back to dashboard
        </Link>

        <article style={styles.card}>
          <header style={styles.header}>
            <div>
              <h1 style={styles.title}>Notifications</h1>
              <p style={styles.subtitle}>Stay updated with new listings</p>
            </div>
            <button
              type="button"
              style={{
                ...styles.markAll,
                color: unreadIds.length > 0 ? "#6b91eb" : "#a0a3aa",
                cursor: unreadIds.length > 0 ? "pointer" : "default",
              }}
              onClick={() => setUnreadIds([])}
              disabled={unreadIds.length === 0}
            >
              {unreadIds.length > 0 ? "Mark all as read" : "All caught up"}
            </button>
          </header>

          <div style={styles.list}>
            {initialNotifications.map((notification) => {
              const Icon = notification.icon;
              const isUnread = unreadIds.includes(notification.id);

              return (
                <button
                  type="button"
                  style={styles.notification}
                  onClick={() => markAsRead(notification.id)}
                  key={notification.id}
                  aria-label={`${notification.title}${isUnread ? ", unread" : ""}`}
                >
                  <span style={styles.iconCircle}>
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span style={styles.notificationBody}>
                    <strong style={styles.notificationTitle}>{notification.title}</strong>
                    <span style={styles.message}>{notification.message}</span>
                    <span style={styles.time}>{notification.time}</span>
                  </span>
                  {isUnread && <span style={styles.unreadDot} />}
                </button>
              );
            })}
          </div>

          <footer style={styles.cardFooter}>
            <strong style={styles.footerTitle}>Welcome to StayNest</strong>
            <span style={styles.footerCopy}>Find and save your dream rooms effortlessly.</span>
          </footer>
        </article>
      </section>
    </main>
  );
}
