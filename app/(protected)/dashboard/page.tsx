import type { CSSProperties } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Home,
  LogOut,
  MapPin,
  Search,
  User,
} from "lucide-react";

const properties = [
  {
    status: "single",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 7500/month",
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=600&q=85",
  },
  {
    status: "shared",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 12000/month",
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=600&q=85",
  },
  {
    status: "single",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 15000/month",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=85",
  },
  {
    status: "shared",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 12000/month",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=85",
  },
  {
    status: "single",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 9500/month",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=85",
  },
  {
    status: "shared",
    title: "Cozy Studio in Thamel",
    area: "Thamel, Kathmandu",
    price: "Rs 12000/month",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    color: "#0b0f0b",
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#eef2ea",
  },
  heroWrap: {
    minHeight: "calc(100vh - 220px)",
    background:
      "linear-gradient(rgba(226, 232, 220, 0.58), rgba(226, 232, 220, 0.58)), linear-gradient(90deg, rgba(9, 24, 18, 0.52), rgba(255, 255, 255, 0.18) 44%, rgba(10, 35, 28, 0.42)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    height: 72,
    padding: "0 clamp(22px, 4vw, 48px)",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#050806",
    fontSize: 22,
    fontWeight: 800,
    textDecoration: "none",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(18px, 3vw, 36px)",
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    color: "#111511",
    fontSize: 14,
    fontWeight: 800,
    textDecoration: "none",
  },
  notification: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 28,
    height: 28,
    border: 0,
    background: "transparent",
    color: "#101510",
    cursor: "pointer",
    padding: 0,
  },
  dot: {
    position: "absolute",
    top: 3,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "#e74335",
  },
  hero: {
    display: "grid",
    justifyItems: "center",
    padding: "108px 18px 76px",
    textAlign: "center",
  },
  heroTitle: {
    margin: 0,
    color: "#050806",
    fontSize: "clamp(44px, 5vw, 68px)",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.04,
  },
  heroCopy: {
    margin: "12px auto 58px",
    maxWidth: 620,
    color: "#111511",
    fontSize: "clamp(16px, 1.7vw, 20px)",
    fontWeight: 600,
    lineHeight: 1.35,
  },
  searchBox: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 1fr) 170px",
    gap: 16,
    width: "min(100%, 680px)",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.84)",
    boxShadow: "0 22px 70px rgba(18, 27, 20, 0.2)",
    padding: 16,
  },
  searchField: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    height: 50,
    borderRadius: 9,
    background: "#ffffff",
    color: "#8b918c",
    padding: "0 14px",
  },
  searchInput: {
    minWidth: 0,
    width: "100%",
    border: 0,
    background: "transparent",
    color: "#4b514d",
    font: "600 16px Arial, Helvetica, sans-serif",
    outline: "none",
  },
  searchButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    border: 0,
    borderRadius: 9,
    background: "#ffffff",
    color: "#454b46",
    cursor: "pointer",
    font: "700 17px Arial, Helvetica, sans-serif",
  },
  exploreButton: {
    width: "min(100%, 340px)",
    height: 50,
    marginTop: 72,
    border: 0,
    borderRadius: 9,
    background: "#ffffff",
    color: "#111511",
    cursor: "pointer",
    font: "800 17px Arial, Helvetica, sans-serif",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "260px minmax(0, 1fr)",
    gap: 42,
    width: "min(1180px, calc(100% - 56px))",
    margin: "0 auto",
    padding: "0 0 112px",
  },
  filterTitle: {
    margin: "0 0 18px",
    fontSize: 18,
    fontWeight: 800,
  },
  filterCard: {
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 18px 50px rgba(21, 31, 23, 0.12)",
    padding: 26,
  },
  filterLabel: {
    display: "block",
    marginBottom: 16,
    color: "#7c827c",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  sliderTrack: {
    height: 4,
    borderRadius: 999,
    background: "#e4e6e2",
  },
  sliderThumb: {
    width: 20,
    height: 20,
    marginTop: -12,
    borderRadius: 999,
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  rangeRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "14px 0 24px",
    fontSize: 11,
    fontWeight: 800,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    fontSize: 13,
    fontWeight: 700,
  },
  listingHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    margin: "0 0 24px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
  },
  sortButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    height: 38,
    border: 0,
    borderRadius: 9,
    background: "#ffffff",
    color: "#2d312d",
    font: "800 12px Arial, Helvetica, sans-serif",
    padding: "0 16px",
  },
  sortAccent: {
    color: "#d76342",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 24,
  },
  card: {
    overflow: "hidden",
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 20px 52px rgba(19, 30, 22, 0.13)",
  },
  cardMedia: {
    position: "relative",
    height: 190,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 999,
    background: "#ffffff",
    color: "#273127",
    fontSize: 10,
    fontWeight: 800,
    padding: "6px 12px",
    textTransform: "uppercase",
  },
  cardOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    padding: "54px 16px 16px",
    color: "#ffffff",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.68), transparent)",
    textAlign: "left",
  },
  area: {
    margin: 0,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  cardTitle: {
    margin: "2px 0 0",
    fontSize: 18,
    fontWeight: 800,
    lineHeight: 1.1,
  },
  cardBody: {
    padding: "14px 16px 16px",
  },
  chips: {
    display: "flex",
    gap: 7,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  chip: {
    borderRadius: 6,
    background: "#edf2fb",
    color: "#66717d",
    fontSize: 9,
    fontWeight: 800,
    padding: "6px 8px",
    textTransform: "uppercase",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    color: "#6c736d",
    fontSize: 13,
    fontWeight: 700,
  },
  bookButton: {
    border: 0,
    borderRadius: 6,
    background: "#4d82de",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 11px Arial, Helvetica, sans-serif",
    padding: "8px 12px",
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "1.3fr repeat(3, 1fr)",
    gap: 42,
    background: "#ffffff",
    padding: "18px clamp(28px, 8vw, 92px) 24px",
  },
  footerBrand: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 22,
    fontWeight: 500,
  },
  footerCopy: {
    maxWidth: 250,
    margin: "12px 0 14px",
    color: "#4f554f",
    fontSize: 11,
    lineHeight: 1.25,
  },
  footerHeading: {
    margin: "7px 0 12px",
    fontSize: 12,
    fontWeight: 800,
  },
  footerLink: {
    display: "block",
    marginTop: 7,
    color: "#151915",
    fontSize: 12,
    textDecoration: "none",
  },
  socials: {
    display: "flex",
    gap: 10,
  },
  socialCircle: {
    display: "grid",
    placeItems: "center",
    width: 17,
    height: 17,
    border: "1px solid #111511",
    borderRadius: 999,
    color: "#111511",
    fontSize: 10,
    fontWeight: 800,
  },
} satisfies Record<string, CSSProperties>;

function PropertyCard({ property }: { property: (typeof properties)[number] }) {
  return (
    <article style={styles.card}>
      <div style={styles.cardMedia}>
        <img src={property.image} alt={property.title} style={styles.cardImage} />
        <span style={styles.badge}>{property.status}</span>
        <div style={styles.cardOverlay}>
          <p style={styles.area}>{property.area}</p>
          <h3 style={styles.cardTitle}>{property.title}</h3>
        </div>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.chips}>
          <span style={styles.chip}>WiFi</span>
          <span style={styles.chip}>Kitchen</span>
          <span style={styles.chip}>Laundry</span>
        </div>
        <div style={styles.priceRow}>
          <span>{property.price}</span>
          <button type="button" style={styles.bookButton}>
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  return (
    <main style={styles.page}>
      <section style={styles.heroWrap}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.logo}>
            <Home size={24} strokeWidth={2.4} aria-hidden="true" />
            <span>StayNest</span>
          </Link>

          <div style={styles.navActions}>
            <a href="#" style={styles.navLink}>
              <User size={12} aria-hidden="true" />
              <span>Profile</span>
            </a>
            <Link href="/notifications" style={styles.notification} aria-label="Notifications">
              <Bell size={12} aria-hidden="true" />
              <span style={styles.dot} />
            </Link>
            <Link href="/login" style={styles.navLink}>
              <LogOut size={11} aria-hidden="true" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>

        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Find Your Perfect Room</h1>
          <p style={styles.heroCopy}>
            Discover verified accommodations from trusted hosts.
            <br />
            Book securely with confidence.
          </p>

          <form style={styles.searchBox}>
            <label style={styles.searchField}>
              <MapPin size={16} strokeWidth={2.1} aria-hidden="true" />
              <input type="text" placeholder="City or area..." style={styles.searchInput} />
            </label>
            <button type="button" style={styles.searchButton}>
              <Search size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>

          <button type="button" style={styles.exploreButton}>
            Explore all Properties
          </button>
        </section>

        <section style={styles.content}>
          <aside>
            <h2 style={styles.filterTitle}>Filters</h2>
            <div style={styles.filterCard}>
              <span style={styles.filterLabel}>Price Range</span>
              <div style={styles.sliderTrack} />
              <div style={styles.sliderThumb} />
              <div style={styles.rangeRow}>
                <span>Rs. 0</span>
                <span>Rs. 50,000+</span>
              </div>

              <span style={styles.filterLabel}>Room Type</span>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>Single Room</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>Shared Room</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>Hostel</span>
              </label>
            </div>
          </aside>

          <section>
            <div style={styles.listingHeader}>
              <h2 style={styles.sectionTitle}>Features Properties</h2>
              <button type="button" style={styles.sortButton}>
                <span>Sort by:</span>
                <span style={styles.sortAccent}>Newest first</span>
                <ChevronDown size={10} aria-hidden="true" />
              </button>
            </div>

            <div style={styles.cardGrid}>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={`${property.price}-${index}`} />
              ))}
            </div>
          </section>
        </section>
      </section>

      <footer style={styles.footer}>
        <section>
          <h2 style={styles.footerBrand}>StayNest</h2>
          <p style={styles.footerCopy}>
            Defining the horizon of student living through premium verification
            and global community building.
          </p>
          <div style={styles.socials}>
            <span style={styles.socialCircle}>f</span>
            <span style={styles.socialCircle}>◎</span>
            <span style={styles.socialCircle}>t</span>
            <span style={styles.socialCircle}>v</span>
          </div>
        </section>

        <section>
          <h3 style={styles.footerHeading}>Support</h3>
          <a href="#" style={styles.footerLink}>
            Help Center
          </a>
          <a href="#" style={styles.footerLink}>
            Contact Support
          </a>
          <a href="#" style={styles.footerLink}>
            Safety Guide
          </a>
        </section>

        <section>
          <h3 style={styles.footerHeading}>Company Us</h3>
          <a href="#" style={styles.footerLink}>
            About Us
          </a>
          <a href="#" style={styles.footerLink}>
            Contacts Us
          </a>
          <a href="#" style={styles.footerLink}>
            Partner with Us
          </a>
        </section>

        <section>
          <h3 style={styles.footerHeading}>Legal</h3>
          <a href="#" style={styles.footerLink}>
            Terms of Services
          </a>
          <a href="#" style={styles.footerLink}>
            Cookies
          </a>
          <a href="#" style={styles.footerLink}>
            Privacy policy
          </a>
        </section>
      </footer>
    </main>
  );
}
