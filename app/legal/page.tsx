import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2f5ef",
    color: "#1d241e",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    minHeight: 72,
    padding: "0 clamp(18px, 4vw, 48px)",
    background: "#ffffff",
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
  content: {
    width: "min(760px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "44px 0 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: "#3e463f",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  title: {
    margin: "28px 0 8px",
    fontSize: "clamp(34px, 6vw, 48px)",
  },
  intro: {
    margin: "0 0 32px",
    color: "#687069",
    lineHeight: 1.6,
  },
  section: {
    marginTop: 18,
    scrollMarginTop: 24,
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 12px 35px rgba(24, 34, 26, 0.08)",
    padding: "24px",
  },
  heading: {
    margin: "0 0 10px",
    fontSize: 21,
  },
  copy: {
    margin: 0,
    color: "#59615a",
    fontSize: 14,
    lineHeight: 1.7,
  },
} satisfies Record<string, CSSProperties>;

export default function LegalPage() {
  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.logo}>
          <Home size={23} aria-hidden="true" />
          StayNest
        </Link>
      </nav>
      <section style={styles.content}>
        <Link href="/dashboard" style={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to dashboard
        </Link>
        <h1 style={styles.title}>Legal Information</h1>
        <p style={styles.intro}>
          A plain-language overview of how StayNest handles bookings, cookies,
          and personal information.
        </p>

        <article id="terms" style={styles.section}>
          <h2 style={styles.heading}>Terms of Service</h2>
          <p style={styles.copy}>
            Provide accurate information, communicate respectfully, and verify
            booking details with property owners before making a commitment.
          </p>
        </article>
        <article id="cookies" style={styles.section}>
          <h2 style={styles.heading}>Cookies</h2>
          <p style={styles.copy}>
            This demo stores preferences such as saved rooms and profile details
            in browser storage so they remain available after a refresh.
          </p>
        </article>
        <article id="privacy" style={styles.section}>
          <h2 style={styles.heading}>Privacy Policy</h2>
          <p style={styles.copy}>
            Profile and saved-room data currently remain on your device. Contact
            support@staynest.com for privacy questions.
          </p>
        </article>
      </section>
    </main>
  );
}
