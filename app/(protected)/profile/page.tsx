"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Heart,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Settings,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import LogoutButton from "../../_components/logout-button";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { apiRequest, type UserProfile } from "../../_lib/api";

const styles = {
  page: {
    minHeight: "100vh",
    color: "#172033",
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f8f9fc",
  },
  hero: {
    background:
      "linear-gradient(115deg, #6e756b 0%, #a7aaa8 48%, #cbc9d9 100%)",
    color: "#ffffff",
    padding: "48px clamp(20px, 6vw, 64px) 32px",
  },
  heroInner: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 28,
    width: "min(1160px, 100%)",
    margin: "0 auto",
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    minWidth: 0,
  },
  avatarWrap: {
    position: "relative",
    flex: "0 0 auto",
    width: 116,
    height: 116,
    border: "4px solid #ffffff",
    borderRadius: 14,
    background: "#d8ddd5",
    boxShadow: "0 10px 28px rgba(20, 24, 21, 0.28)",
    transform: "rotate(2deg)",
  },
  avatar: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  verifiedBadge: {
    position: "absolute",
    right: -10,
    bottom: -10,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    border: "2px solid #ffffff",
    borderRadius: 999,
    background: "#dff6e6",
    color: "#278650",
    fontSize: 9,
    fontWeight: 900,
    padding: "5px 8px",
    transform: "rotate(-2deg)",
  },
  name: {
    margin: "0 0 9px",
    fontSize: "clamp(30px, 5vw, 44px)",
    lineHeight: 1,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    margin: 0,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: 600,
  },
  metaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  heroButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    minHeight: 42,
    border: "1px solid rgba(255, 255, 255, 0.55)",
    borderRadius: 8,
    background: "rgba(255, 255, 255, 0.26)",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 13px Arial, Helvetica, sans-serif",
    padding: "0 16px",
  },
  shareButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    minHeight: 42,
    border: 0,
    borderRadius: 8,
    background: "#ffffff",
    color: "#2e5598",
    cursor: "pointer",
    font: "800 13px Arial, Helvetica, sans-serif",
    padding: "0 16px",
    boxShadow: "0 8px 20px rgba(42, 47, 65, 0.18)",
  },
  shell: {
    width: "min(1160px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "40px 0 70px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    border: "1px solid #e7eaf0",
    borderRadius: 13,
    background: "#ffffff",
    boxShadow: "0 8px 25px rgba(37, 48, 67, 0.06)",
    padding: "21px 14px",
    textAlign: "center",
  },
  statValue: {
    display: "block",
    color: "#1d4f94",
    fontSize: 22,
    fontWeight: 900,
  },
  statLabel: {
    display: "block",
    marginTop: 7,
    color: "#767d88",
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  columns: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 330px), 1fr))",
    alignItems: "start",
    gap: 28,
  },
  card: {
    overflow: "hidden",
    border: "1px solid #e1e5ec",
    borderRadius: 15,
    background: "#ffffff",
    boxShadow: "0 13px 35px rgba(37, 48, 67, 0.07)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    background: "#f4f5f8",
    padding: "19px 24px",
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    fontSize: 18,
  },
  titleIcon: {
    display: "grid",
    placeItems: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#e5edff",
    color: "#3d6db7",
  },
  privateBadge: {
    borderRadius: 999,
    background: "#e5e7ec",
    color: "#656b75",
    fontSize: 8,
    fontWeight: 900,
    padding: "5px 8px",
  },
  infoBody: {
    padding: "28px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "28px 34px",
  },
  infoLabel: {
    display: "block",
    marginBottom: 9,
    color: "#747b87",
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  infoValue: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: 0,
    color: "#28303d",
    fontSize: 14,
    lineHeight: 1.45,
  },
  confirmed: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    background: "#dff6e6",
    color: "#278650",
    fontSize: 11,
    fontWeight: 900,
    padding: "6px 9px",
  },
  about: {
    gridColumn: "1 / -1",
  },
  aboutBox: {
    margin: 0,
    borderRadius: 12,
    background: "#f3f4f7",
    color: "#606875",
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 1.65,
    padding: "19px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 18,
  },
  field: {
    display: "grid",
    gap: 7,
    color: "#59616d",
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    height: 45,
    border: "1px solid #d9dee7",
    borderRadius: 8,
    background: "#ffffff",
    color: "#252d39",
    font: "600 14px Arial, Helvetica, sans-serif",
    padding: "0 13px",
  },
  formActions: {
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  saveButton: {
    minHeight: 42,
    border: 0,
    borderRadius: 8,
    background: "#315f9f",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 13px Arial, Helvetica, sans-serif",
    padding: "0 18px",
  },
  cancelButton: {
    minHeight: 42,
    border: "1px solid #d9dee7",
    borderRadius: 8,
    background: "#ffffff",
    color: "#4e5662",
    cursor: "pointer",
    font: "800 13px Arial, Helvetica, sans-serif",
    padding: "0 18px",
  },
  success: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    margin: 0,
    color: "#278650",
    fontSize: 13,
    fontWeight: 800,
  },
  sideTitle: {
    margin: "0 0 14px 7px",
    color: "#555d69",
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sideList: {
    display: "grid",
    gap: 12,
  },
  managementLink: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    minHeight: 66,
    border: "1px solid #e2e6ed",
    borderRadius: 12,
    background: "#ffffff",
    color: "#232b36",
    boxShadow: "0 8px 23px rgba(37, 48, 67, 0.06)",
    padding: "0 15px",
    textDecoration: "none",
  },
  managementIcon: {
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto",
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#f0f2f5",
    color: "#505865",
  },
  managementText: {
    minWidth: 0,
    flex: 1,
  },
  managementTitle: {
    display: "block",
    fontSize: 14,
    fontWeight: 900,
  },
  managementCopy: {
    display: "block",
    marginTop: 3,
    color: "#848a93",
    fontSize: 9,
  },
  logoutCard: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    width: "100%",
    minHeight: 66,
    border: "1px solid #f0d9dc",
    borderRadius: 12,
    background: "#fff7f7",
    color: "#c43b4c",
    fontSize: 14,
    fontWeight: 900,
    padding: "0 15px",
  },
  promo: {
    marginTop: 18,
    borderRadius: 14,
    background: "linear-gradient(145deg, #3772b9, #24518d)",
    color: "#ffffff",
    boxShadow: "0 17px 35px rgba(35, 78, 132, 0.28)",
    padding: "22px",
  },
  promoBadge: {
    display: "inline-block",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.24)",
    fontSize: 9,
    fontWeight: 900,
    padding: "5px 8px",
  },
  promoTitle: {
    margin: "13px 0 7px",
    fontSize: 19,
  },
  promoCopy: {
    margin: "0 0 18px",
    color: "#e8f0fb",
    fontSize: 12,
    lineHeight: 1.55,
  },
  promoLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 8,
    background: "#ffffff",
    color: "#24518d",
    fontSize: 12,
    fontWeight: 900,
    textDecoration: "none",
  },
  footer: {
    borderTop: "1px solid #e1e4e9",
    background: "#f1f2f5",
    padding: "28px clamp(20px, 6vw, 64px)",
  },
  footerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 22,
    width: "min(1160px, 100%)",
    margin: "0 auto",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#172033",
    fontSize: 22,
    fontWeight: 900,
    textDecoration: "none",
  },
  footerLinks: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 25,
  },
  footerLink: {
    color: "#68707b",
    fontSize: 11,
    textDecoration: "none",
  },
  copyright: {
    width: "100%",
    margin: "20px 0 0",
    borderTop: "1px solid #d9dde3",
    color: "#8a9099",
    fontSize: 10,
    paddingTop: 17,
    textAlign: "center",
  },
} satisfies Record<string, CSSProperties>;

export default function ProfilePage() {
  const { savedRoomIds } = useSavedRooms();
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alexjohnson@gmail.com");
  const [phone, setPhone] = useState("+977 98-1234-5678");
  const [location, setLocation] = useState("Kathmandu, Nepal");
  const [about, setAbout] = useState(
    "Passionate traveler and tech enthusiast. Always looking for unique architectural stays and local cultural experiences in the heart of the city.",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    apiRequest<{ user: UserProfile }>("/profile")
      .then(({ user }) => {
        setName(user.fullName);
        setEmail(user.email);
        setPhone(user.contactNo);
        setLocation(user.location);
        setAbout(user.about);
      })
      .catch((error) =>
        setProfileError(error instanceof Error ? error.message : "Unable to load profile"),
      );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError("");
    try {
      await apiRequest("/profile", {
        method: "PUT",
        body: JSON.stringify({
          fullName: name,
          email,
          contactNo: phone,
          location,
          about,
        }),
      });
      setIsSaved(true);
      setIsEditing(false);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Unable to save profile");
    }
  };

  const shareProfile = async () => {
    const shareData = {
      title: `${name}'s StayNest profile`,
      text: `View ${name}'s StayNest profile.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Profile shared");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Profile link copied");
      }
    } catch {
      setShareStatus("");
    }
  };

  const stats = [
    { value: "12", label: "Stays" },
    { value: String(savedRoomIds.length), label: "Saved" },
    { value: "4.9", label: "Rating" },
    { value: "24", label: "Reviews" },
  ];

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.identity}>
            <div style={styles.avatarWrap}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85"
                alt={name}
                style={styles.avatar}
              />
              <span style={styles.verifiedBadge}>
                <CheckCircle2 size={11} aria-hidden="true" />
                Verified
              </span>
            </div>
            <div>
              <h1 style={styles.name}>{name}</h1>
              <p style={styles.meta}>
                <span style={styles.metaItem}>
                  <CalendarClock size={13} aria-hidden="true" />
                  Joined March 2026
                </span>
                <span style={styles.metaItem}>
                  <MapPin size={13} aria-hidden="true" />
                  {location}
                </span>
              </p>
            </div>
          </div>

          <div style={styles.heroActions}>
            <button
              type="button"
              style={styles.heroButton}
              onClick={() => {
                setIsEditing(true);
                setIsSaved(false);
              }}
            >
              <Edit3 size={14} aria-hidden="true" />
              Edit Profile
            </button>
            <button type="button" style={styles.shareButton} onClick={shareProfile}>
              <Share2 size={14} aria-hidden="true" />
              {shareStatus || "Share Profile"}
            </button>
          </div>
        </div>
      </section>

      <section style={styles.shell}>
        <div style={styles.stats}>
          {stats.map((stat) => (
            <div style={styles.statCard} key={stat.label}>
              <strong style={styles.statValue}>{stat.value}</strong>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div style={styles.columns}>
          <article style={styles.card}>
            <header style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <span style={styles.titleIcon}>
                  <LockKeyhole size={16} aria-hidden="true" />
                </span>
                Account Information
              </h2>
              <span style={styles.privateBadge}>PRIVATE</span>
            </header>

            <div style={styles.infoBody}>
              {isEditing ? (
                <form style={styles.form} onSubmit={handleSubmit}>
                  <label style={styles.field}>
                    Full name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      style={styles.input}
                    />
                  </label>
                  <label style={styles.field}>
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      style={styles.input}
                    />
                  </label>
                  <label style={styles.field}>
                    Phone number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      style={styles.input}
                    />
                  </label>
                  <label style={styles.field}>
                    Primary location
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      required
                      style={styles.input}
                    />
                  </label>
                  <label style={{ ...styles.field, gridColumn: "1 / -1" }}>
                    About me
                    <input
                      value={about}
                      onChange={(event) => setAbout(event.target.value)}
                      style={styles.input}
                    />
                  </label>
                  <div style={styles.formActions}>
                    <button type="submit" style={styles.saveButton}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      style={styles.cancelButton}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={styles.infoGrid}>
                  <div>
                    <span style={styles.infoLabel}>Email Address</span>
                    <p style={styles.infoValue}>
                      <Mail size={15} aria-hidden="true" />
                      {email}
                    </p>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Phone Number</span>
                    <p style={styles.infoValue}>
                      <Phone size={15} aria-hidden="true" />
                      {phone}
                    </p>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Primary Location</span>
                    <p style={styles.infoValue}>
                      <MapPin size={15} aria-hidden="true" />
                      {location}
                    </p>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Identity Verification</span>
                    <span style={styles.confirmed}>
                      <ShieldCheck size={14} aria-hidden="true" />
                      Identity Confirmed
                    </span>
                  </div>
                  <div style={styles.about}>
                    <span style={styles.infoLabel}>About Me</span>
                    <p style={styles.aboutBox}>&quot;{about}&quot;</p>
                  </div>
                </div>
              )}

              {isSaved && (
                <p style={{ ...styles.success, marginTop: 18 }} role="status">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Profile saved successfully.
                </p>
              )}
              {profileError && (
                <p style={{ marginTop: 18, color: "#b83f50" }} role="alert">
                  {profileError}
                </p>
              )}
            </div>
          </article>

          <aside>
            <h2 style={styles.sideTitle}>Account Management</h2>
            <div style={styles.sideList}>
              <button
                type="button"
                style={{ ...styles.managementLink, width: "100%", textAlign: "left" }}
                onClick={() => setIsEditing(true)}
              >
                <span style={styles.managementIcon}>
                  <Settings size={16} aria-hidden="true" />
                </span>
                <span style={styles.managementText}>
                  <span style={styles.managementTitle}>Account Settings</span>
                  <span style={styles.managementCopy}>Security & privacy preferences</span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>

              <Link href="/saved" style={styles.managementLink}>
                <span style={styles.managementIcon}>
                  <Heart size={16} aria-hidden="true" />
                </span>
                <span style={styles.managementText}>
                  <span style={styles.managementTitle}>Saved Rooms</span>
                  <span style={styles.managementCopy}>Manage your favorites list</span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <Link href="/dashboard" style={styles.managementLink}>
                <span style={styles.managementIcon}>
                  <RotateCcw size={16} aria-hidden="true" />
                </span>
                <span style={styles.managementText}>
                  <span style={styles.managementTitle}>Booking History</span>
                  <span style={styles.managementCopy}>Past and upcoming trips</span>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>

              <LogoutButton iconSize={16} style={styles.logoutCard} />
            </div>

            <div style={styles.promo}>
              <span style={styles.promoBadge}>LIMITED OFFER</span>
              <h2 style={styles.promoTitle}>Host with StayNest</h2>
              <p style={styles.promoCopy}>
                Earn by sharing your space with the StayNest community.
              </p>
              <a
                href="mailto:partners@staynest.com?subject=Host with StayNest"
                style={styles.promoLink}
              >
                Learn More
              </a>
            </div>
          </aside>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <Link href="/dashboard" style={styles.logo}>
            <Home size={25} aria-hidden="true" />
            StayNest
          </Link>
          <div style={styles.footerLinks}>
            <Link href="/legal#privacy" style={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link href="/legal#terms" style={styles.footerLink}>
              Terms
            </Link>
            <a href="mailto:support@staynest.com" style={styles.footerLink}>
              Help Center
            </a>
          </div>
          <span style={{ ...styles.metaItem, color: "#7b828c" }}>
            <Star size={14} aria-hidden="true" />
            4.9 member rating
          </span>
          <p style={styles.copyright}>
            © 2026 StayNest Inc. Crafted with care for room seekers.
          </p>
        </div>
      </footer>
    </main>
  );
}
