"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const styles = {
  page: {
    minHeight: "100vh",
    overflow: "hidden",
    background: "#e3e7e5",
    color: "#111111",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  navbar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    minHeight: 82,
    padding: "18px clamp(22px, 4vw, 46px)",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "inherit",
    textDecoration: "none",
  },
  logoText: {
    fontSize: 27,
    fontWeight: 800,
    lineHeight: 1,
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 2vw, 22px)",
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#000000",
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1,
    textDecoration: "none",
  },
  iconButton: {
    display: "grid",
    placeItems: "center",
    width: 26,
    height: 26,
    border: 0,
    background: "transparent",
    color: "#000000",
    cursor: "pointer",
    padding: 0,
  },
  signInButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 96,
    height: 40,
    borderRadius: 8,
    background: "#4d82de",
    color: "#071017",
    fontSize: 14,
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    minHeight: "100vh",
    padding: "104px 20px 44px",
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08)), linear-gradient(to bottom, rgba(18, 23, 14, 0.16), rgba(18, 23, 14, 0.54)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  heroContent: {
    width: "min(100%, 820px)",
    marginTop: 54,
    textAlign: "center",
  },
  heroTitle: {
    margin: 0,
    color: "#203018",
    fontSize: "clamp(56px, 7vw, 104px)",
    fontWeight: 800,
    letterSpacing: 0,
    lineHeight: 0.95,
    textShadow: "0 2px 20px rgba(255, 255, 255, 0.45)",
  },
  heroCopy: {
    margin: "22px auto 42px",
    maxWidth: 620,
    color: "#ffffff",
    fontSize: "clamp(17px, 2vw, 22px)",
    fontWeight: 700,
    lineHeight: 1.32,
    textShadow: "0 2px 12px rgba(0, 0, 0, 0.34)",
  },
  searchPanel: {
    display: "grid",
    gridTemplateColumns: "minmax(210px, 1.3fr) minmax(130px, 0.7fr) 144px",
    gap: 10,
    alignItems: "center",
    width: "min(100%, 650px)",
    margin: "0 auto",
    border: "1px solid rgba(255, 255, 255, 0.68)",
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 22px 60px rgba(23, 34, 18, 0.22)",
    padding: 10,
  },
  locationField: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    height: 48,
    border: 0,
    borderRadius: 10,
    background: "#eef0ec",
    color: "#5f675d",
    fontSize: 16,
    padding: "0 14px",
  },
  locationInput: {
    minWidth: 0,
    width: "100%",
    border: 0,
    background: "transparent",
    color: "#3f453c",
    font: "600 16px Arial, Helvetica, sans-serif",
    outline: "none",
    padding: 0,
  },
  select: {
    height: 48,
    border: 0,
    borderRadius: 10,
    background: "#eef0ec",
    color: "#3f453c",
    cursor: "pointer",
    font: "600 16px Arial, Helvetica, sans-serif",
    outline: "none",
    padding: "0 14px",
  },
  searchButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 48,
    border: 0,
    borderRadius: 10,
    background: "#4d82de",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 18px Arial, Helvetica, sans-serif",
    padding: "0 18px",
  },
  responsiveSearchPanel: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
    gap: 10,
    alignItems: "center",
    width: "min(100%, 650px)",
    margin: "0 auto",
    border: "1px solid rgba(255, 255, 255, 0.68)",
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 22px 60px rgba(23, 34, 18, 0.22)",
    padding: 10,
  },
} satisfies Record<string, CSSProperties>;

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("any");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (price !== "any") params.set("price", price);
    const query = params.toString();
    router.push(query ? `/dashboard?${query}` : "/dashboard");
  };

  return (
    <main style={styles.page}>
      <nav style={styles.navbar}>
        <Link href="/" style={styles.logo}>
          <HomeIcon />
          <span style={styles.logoText}>StayNest</span>
        </Link>

        <div style={styles.navActions}>
          <Link href="/saved" style={styles.navLink}>
            <HeartIcon />
            <span>Saved</span>
          </Link>
          <Link href="/profile" style={styles.navLink}>
            <UserIcon />
            <span>Profile</span>
          </Link>
          <Link href="/notifications" style={styles.iconButton} aria-label="Notifications">
            <BellIcon />
          </Link>
          <Link href="/login" style={styles.signInButton}>
            Sign In
          </Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Find Your Perfect
            <br />
            Room Easily
          </h1>
          <p style={styles.heroCopy}>
            Discover affordable rooms and hostels near your campus. Compare
            prices, check facilities, and book with less hassle.
          </p>

          <form style={styles.responsiveSearchPanel} onSubmit={handleSearch}>
            <label style={styles.locationField}>
              <LocationIcon />
              <input
                type="text"
                placeholder="Enter location or area...."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                style={styles.locationInput}
              />
            </label>

            <select
              aria-label="Price range"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              style={styles.select}
            >
              <option value="any">Any Price</option>
              <option value="low">Under Rs. 8,000</option>
              <option value="mid">Rs. 8,000 - 15,000</option>
              <option value="high">Rs. 15,000+</option>
            </select>

            <button type="submit" style={styles.searchButton}>
              <SearchIcon />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
