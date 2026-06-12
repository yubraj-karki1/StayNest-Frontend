import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  Bell,
  Car,
  Heart,
  Home,
  MapPin,
  Phone,
  CookingPot,
  Shirt,
  Sun,
  User,
  Wifi,
} from "lucide-react";
import LogoutButton from "../../../_components/logout-button";
import SaveRoomButton from "../../../_components/save-room-button";
import { getRoomById, rooms } from "../room-data";

const styles = {
  page: {
    minHeight: "100vh",
    color: "#111611",
    fontFamily: "Arial, Helvetica, sans-serif",
    background:
      "linear-gradient(rgba(214, 221, 211, 0.72), rgba(214, 221, 211, 0.72)), url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85') center / cover fixed",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    minHeight: 70,
    padding: "0 clamp(18px, 4vw, 48px)",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: "#101510",
    fontSize: "clamp(18px, 3vw, 22px)",
    fontWeight: 800,
    textDecoration: "none",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 3vw, 30px)",
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    color: "#111611",
    fontSize: "clamp(11px, 2vw, 14px)",
    fontWeight: 700,
    textDecoration: "none",
  },
  notification: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 28,
    height: 28,
    color: "#111611",
    textDecoration: "none",
  },
  dot: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#e74335",
  },
  content: {
    width: "min(calc(100% - 28px), 1120px)",
    margin: "0 auto",
    padding: "20px 0 70px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 18,
    color: "#202620",
    fontSize: 13,
    fontWeight: 700,
    textDecoration: "none",
  },
  roomLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 390px), 1fr))",
    alignItems: "start",
    gap: 28,
  },
  leftColumn: {
    display: "grid",
    gap: 22,
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 8,
  },
  mainImage: {
    gridColumn: "1 / -1",
    width: "100%",
    height: "clamp(260px, 42vw, 430px)",
    borderRadius: 13,
    objectFit: "cover",
  },
  thumbnail: {
    width: "100%",
    height: "clamp(70px, 13vw, 125px)",
    borderRadius: 8,
    objectFit: "cover",
  },
  aboutCard: {
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 18px 48px rgba(30, 37, 31, 0.16)",
    padding: "clamp(20px, 4vw, 30px)",
  },
  aboutTitle: {
    margin: "0 0 15px",
    fontSize: 18,
  },
  aboutCopy: {
    margin: 0,
    color: "#565d58",
    fontSize: 14,
    lineHeight: 1.65,
  },
  detailsCard: {
    position: "sticky",
    top: 20,
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 18px 50px rgba(27, 35, 29, 0.2)",
    padding: "clamp(20px, 4vw, 30px)",
  },
  title: {
    margin: 0,
    fontSize: "clamp(22px, 4vw, 30px)",
    lineHeight: 1.08,
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    margin: "10px 0 6px",
    color: "#727872",
    fontSize: 13,
  },
  rating: {
    margin: 0,
    color: "#555b56",
    fontSize: 13,
    fontWeight: 700,
  },
  priceBox: {
    margin: "20px 0",
    borderRadius: 10,
    background: "#fff3e9",
    padding: "16px",
  },
  price: {
    color: "#ef6f43",
    fontSize: 24,
    fontWeight: 800,
  },
  perMonth: {
    color: "#626862",
    fontSize: 13,
  },
  label: {
    display: "block",
    marginBottom: 10,
    color: "#929892",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  facilities: {
    display: "flex",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 22,
  },
  facility: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 7,
    background: "#f1f4f8",
    color: "#596159",
    fontSize: 11,
    fontWeight: 700,
    padding: "8px 10px",
  },
  host: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    margin: "10px 0 22px",
  },
  avatar: {
    display: "grid",
    placeItems: "center",
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#f1a43c",
    color: "#ffffff",
  },
  hostLabel: {
    display: "block",
    color: "#8a908b",
    fontSize: 10,
  },
  hostName: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    fontWeight: 800,
  },
  callButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    height: 48,
    border: 0,
    borderRadius: 8,
    background: "#477bd5",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 14px Arial, Helvetica, sans-serif",
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    height: 46,
    marginTop: 10,
    border: "1px solid #e0e3e0",
    borderRadius: 8,
    background: "#ffffff",
    color: "#252a25",
    cursor: "pointer",
    font: "800 13px Arial, Helvetica, sans-serif",
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 30,
    background: "#ffffff",
    padding: "24px clamp(24px, 8vw, 90px) 30px",
  },
  footerBrand: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 22,
  },
  footerCopy: {
    maxWidth: 250,
    margin: "10px 0 0",
    color: "#5b615c",
    fontSize: 11,
    lineHeight: 1.4,
  },
  footerHeading: {
    margin: "3px 0 10px",
    fontSize: 13,
  },
  footerLink: {
    display: "block",
    marginTop: 7,
    color: "#202420",
    fontSize: 11,
    textDecoration: "none",
  },
} satisfies Record<string, CSSProperties>;

const facilityIcons = {
  WiFi: Wifi,
  Kitchen: CookingPot,
  Parking: Car,
  Laundry: Shirt,
  "Attached Bathroom": Bath,
  Balcony: Sun,
};

export function generateStaticParams() {
  return rooms.map((room) => ({ id: String(room.id) }));
}

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/dashboard" style={styles.logo}>
          <Home size={23} strokeWidth={2.3} aria-hidden="true" />
          <span>StayNest</span>
        </Link>

        <div style={styles.navActions}>
          <Link href="/saved" style={styles.navLink}>
            <Heart size={13} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link href="/profile" style={styles.navLink}>
            <User size={13} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Link href="/notifications" style={styles.notification} aria-label="Notifications">
            <Bell size={15} aria-hidden="true" />
            <span style={styles.dot} />
          </Link>
          <LogoutButton iconSize={13} style={styles.navLink} />
        </div>
      </nav>

      <section style={styles.content}>
        <Link href="/dashboard" style={styles.backLink}>
          <ArrowLeft size={14} aria-hidden="true" />
          Back to listings
        </Link>

        <div style={styles.roomLayout}>
          <div style={styles.leftColumn}>
            <div style={styles.gallery}>
              <img src={room.images[0]} alt={room.title} style={styles.mainImage} />
              {room.images.slice(1).map((image, index) => (
                <img
                  src={image}
                  alt={`Room view ${index + 2}`}
                  style={styles.thumbnail}
                  key={image}
                />
              ))}
            </div>

            <article style={styles.aboutCard}>
              <h2 style={styles.aboutTitle}>About this room</h2>
              <p style={styles.aboutCopy}>{room.description}</p>
            </article>
          </div>

          <aside style={styles.detailsCard}>
            <h1 style={styles.title}>{room.title}</h1>
            <p style={styles.location}>
              <MapPin size={14} aria-hidden="true" />
              {room.area}, Nepal
            </p>
            <p style={styles.rating}>⭐ {room.rating} · {room.reviews} reviews</p>

            <div style={styles.priceBox}>
              <span style={styles.price}>{room.price}</span>
              <span style={styles.perMonth}> /month</span>
            </div>

            <span style={styles.label}>Facilities</span>
            <div style={styles.facilities}>
              {room.facilities.map((facility) => {
                const FacilityIcon = facilityIcons[facility];

                return (
                  <span style={styles.facility} key={facility}>
                    <FacilityIcon size={13} aria-hidden="true" />
                    {facility}
                  </span>
                );
              })}
            </div>

            <span style={styles.label}>Owner</span>
            <div style={styles.host}>
              <span style={styles.avatar}>
                <User size={20} aria-hidden="true" />
              </span>
              <span>
                <span style={styles.hostLabel}>Owner</span>
                <span style={styles.hostName}>{room.owner}</span>
              </span>
            </div>

            <a
              href={`tel:${room.ownerPhone}`}
              style={{ ...styles.callButton, textDecoration: "none" }}
            >
              <Phone size={16} aria-hidden="true" />
              Call Owner
            </a>
            <SaveRoomButton roomId={room.id} style={styles.saveButton} />
          </aside>
        </div>
      </section>

      <footer style={styles.footer}>
        <section>
          <h2 style={styles.footerBrand}>StayNest</h2>
          <p style={styles.footerCopy}>
            Defining the horizon of student living through premium verification and
            global community building.
          </p>
        </section>
        <section>
          <h3 style={styles.footerHeading}>Support</h3>
          <a href="mailto:support@staynest.com?subject=Help Center" style={styles.footerLink}>Help Center</a>
          <a href="mailto:support@staynest.com" style={styles.footerLink}>Contact Support</a>
          <a href="mailto:safety@staynest.com" style={styles.footerLink}>Safety Guide</a>
        </section>
        <section>
          <h3 style={styles.footerHeading}>Company Us</h3>
          <Link href="/" style={styles.footerLink}>About Us</Link>
          <a href="mailto:hello@staynest.com" style={styles.footerLink}>Contact Us</a>
          <a href="mailto:partners@staynest.com" style={styles.footerLink}>Partner with Us</a>
        </section>
        <section>
          <h3 style={styles.footerHeading}>Legal</h3>
          <Link href="/legal#terms" style={styles.footerLink}>Terms of Services</Link>
          <Link href="/legal#cookies" style={styles.footerLink}>Cookies</Link>
          <Link href="/legal#privacy" style={styles.footerLink}>Privacy policy</Link>
        </section>
      </footer>
    </main>
  );
}
