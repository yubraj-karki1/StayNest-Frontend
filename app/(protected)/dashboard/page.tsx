"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Heart,
  Home,
  MapPin,
  Search,
  User,
} from "lucide-react";
import LogoutButton from "../../_components/logout-button";
import { useSavedRooms } from "../../_components/use-saved-rooms";
import { rooms, type Room } from "../rooms/room-data";

const MAX_PRICE = 50000;
const roomTypes = [
  { value: "single", label: "Single Room" },
  { value: "shared", label: "Shared Room" },
  { value: "hostel", label: "Hostel" },
] as const;

type RoomType = (typeof roomTypes)[number]["value"];
type SortOption = "newest" | "price-low" | "price-high" | "rating";

function getNumericPrice(price: string) {
  return Number(price.replace(/\D/g, ""));
}

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
  filterTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
  },
  filterHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  clearButton: {
    border: 0,
    background: "transparent",
    color: "#4d82de",
    cursor: "pointer",
    font: "700 12px Arial, Helvetica, sans-serif",
    padding: 0,
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
  sortSelect: {
    border: 0,
    background: "transparent",
    color: "#d76342",
    cursor: "pointer",
    font: "800 12px Arial, Helvetica, sans-serif",
    outline: "none",
  },
  sortAccent: {
    color: "#d76342",
  },
  resultCount: {
    margin: "6px 0 0",
    color: "#6c736d",
    fontSize: 12,
    fontWeight: 700,
  },
  emptyState: {
    gridColumn: "1 / -1",
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.88)",
    color: "#555c56",
    padding: "48px 24px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 8px",
    color: "#202520",
    fontSize: 20,
  },
  emptyCopy: {
    margin: 0,
    fontSize: 14,
  },
  card: {
    display: "flex",
    minWidth: 0,
    height: "100%",
    flexDirection: "column",
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
  cardSaveButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    border: 0,
    borderRadius: "50%",
    background: "#ffffff",
    color: "#4f5650",
    cursor: "pointer",
    boxShadow: "0 5px 18px rgba(0, 0, 0, 0.18)",
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
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "14px 16px 16px",
  },
  chips: {
    display: "flex",
    alignContent: "flex-start",
    gap: 7,
    flexWrap: "wrap",
    minHeight: 54,
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
    marginTop: "auto",
    color: "#6c736d",
    fontSize: 13,
    fontWeight: 700,
  },
  priceRange: {
    width: "100%",
    height: 5,
    margin: "4px 0",
    borderRadius: 999,
    background: "#e4e6e2",
    cursor: "pointer",
    accentColor: "#4d82de",
  },
  bookButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: 6,
    background: "#4d82de",
    color: "#ffffff",
    cursor: "pointer",
    font: "800 11px Arial, Helvetica, sans-serif",
    padding: "8px 12px",
    textDecoration: "none",
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

function PropertyCard({
  property,
  isSaved,
  onToggleSaved,
}: {
  property: Room;
  isSaved: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <article style={styles.card}>
      <div style={styles.cardMedia}>
        <img src={property.images[0]} alt={property.title} style={styles.cardImage} />
        <span style={styles.badge}>{property.status}</span>
        <button
          type="button"
          style={{
            ...styles.cardSaveButton,
            color: isSaved ? "#e2505e" : "#4f5650",
          }}
          onClick={onToggleSaved}
          aria-label={`${isSaved ? "Remove" : "Save"} ${property.title}`}
          aria-pressed={isSaved}
        >
          <Heart
            size={17}
            fill={isSaved ? "#e2505e" : "none"}
            aria-hidden="true"
          />
        </button>
        <div style={styles.cardOverlay}>
          <p style={styles.area}>{property.area}</p>
          <h3 style={styles.cardTitle}>{property.title}</h3>
        </div>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.chips}>
          {property.facilities.map((facility) => (
            <span style={styles.chip} key={facility}>{facility}</span>
          ))}
        </div>
        <div style={styles.priceRow}>
          <span>{property.price}</span>
          <Link href={`/rooms/${property.id}`} style={styles.bookButton}>
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { savedRoomIds, toggleSavedRoom } = useSavedRooms();
  const listingsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    const params = new URLSearchParams(window.location.search);
    const location = params.get("location")?.trim() ?? "";
    const price = params.get("price");

    if (location) {
      setSearchInput(location);
      setSearchQuery(location);
    }

    if (price === "low") setMaxPrice(8000);
    if (price === "mid") {
      setMinPrice(8000);
      setMaxPrice(15000);
    }
    if (price === "high") setMinPrice(15000);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const isMobile = viewportWidth <= 720;
  const isCompactMobile = viewportWidth <= 520;
  const isTablet = viewportWidth <= 1080;
  const contentStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "230px minmax(0, 1fr)"
        : "260px minmax(0, 1fr)",
    alignItems: "start",
    gap: isMobile ? 28 : isTablet ? 28 : 42,
    width: isMobile
      ? "min(calc(100% - 28px), 560px)"
      : isTablet
        ? "min(920px, calc(100% - 40px))"
        : "min(1240px, calc(100% - 56px))",
    margin: "0 auto",
    padding: isMobile ? "0 0 112px" : "12px 0 112px",
  };
  const filtersStyle: CSSProperties = {
    position: isMobile ? "static" : "sticky",
    top: isMobile ? undefined : 24,
  };
  const listingsStyle: CSSProperties = {
    minWidth: 0,
  };
  const listingHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    flexDirection: isMobile ? "column" : "row",
    gap: 18,
    marginBottom: 24,
  };
  const cardGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
    alignItems: "stretch",
    gap: "28px 24px",
  };
  const responsiveSortStyle: CSSProperties = {
    ...styles.sortButton,
    width: isCompactMobile ? "100%" : undefined,
    justifyContent: isCompactMobile ? "space-between" : undefined,
  };

  const filteredRooms = useMemo(
    () => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchingRooms = rooms.filter((room) => {
        const roomPrice = getNumericPrice(room.price);
        const matchesPrice = roomPrice >= minPrice && roomPrice <= maxPrice;
        const matchesRoomType =
          selectedRoomTypes.length === 0 ||
          selectedRoomTypes.includes(room.status as RoomType);
        const searchableText = [
          room.title,
          room.area,
          room.status,
          ...room.facilities,
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch =
          normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

        return matchesPrice && matchesRoomType && matchesSearch;
      });

      return [...matchingRooms].sort((firstRoom, secondRoom) => {
        if (sortOption === "price-low") {
          return getNumericPrice(firstRoom.price) - getNumericPrice(secondRoom.price);
        }
        if (sortOption === "price-high") {
          return getNumericPrice(secondRoom.price) - getNumericPrice(firstRoom.price);
        }
        if (sortOption === "rating") {
          return Number(secondRoom.rating) - Number(firstRoom.rating);
        }
        return secondRoom.id - firstRoom.id;
      });
    },
    [maxPrice, minPrice, searchQuery, selectedRoomTypes, sortOption],
  );

  const toggleRoomType = (roomType: RoomType) => {
    setSelectedRoomTypes((current) =>
      current.includes(roomType)
        ? current.filter((type) => type !== roomType)
        : [...current, roomType],
    );
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setSelectedRoomTypes([]);
    setSearchInput("");
    setSearchQuery("");
    setSortOption("newest");
  };

  const filtersAreActive =
    minPrice !== 0 ||
    maxPrice !== MAX_PRICE ||
    selectedRoomTypes.length > 0 ||
    searchQuery.length > 0 ||
    sortOption !== "newest";

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const exploreAllProperties = () => {
    clearFilters();
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={styles.page}>
      <section style={styles.heroWrap}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.logo}>
            <Home size={24} strokeWidth={2.4} aria-hidden="true" />
            <span>StayNest</span>
          </Link>

          <div style={styles.navActions}>
            <Link href="/saved" style={styles.navLink}>
              <Heart size={12} aria-hidden="true" />
              <span>Saved</span>
            </Link>
            <Link href="/profile" style={styles.navLink}>
              <User size={12} aria-hidden="true" />
              <span>Profile</span>
            </Link>
            <Link href="/notifications" style={styles.notification} aria-label="Notifications">
              <Bell size={12} aria-hidden="true" />
              <span style={styles.dot} />
            </Link>
            <LogoutButton iconSize={11} style={styles.navLink} />
          </div>
        </nav>

        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Find Your Perfect Room</h1>
          <p style={styles.heroCopy}>
            Discover verified accommodations from trusted hosts.
            <br />
            Book securely with confidence.
          </p>

          <form style={styles.searchBox} onSubmit={handleSearch}>
            <label style={styles.searchField}>
              <MapPin size={16} strokeWidth={2.1} aria-hidden="true" />
              <input
                type="search"
                placeholder="City, area, facility..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                style={styles.searchInput}
              />
            </label>
            <button type="submit" style={styles.searchButton}>
              <Search size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>

          <button
            type="button"
            style={styles.exploreButton}
            onClick={exploreAllProperties}
          >
            Explore all Properties
          </button>
        </section>

        <section style={contentStyle}>
          <aside style={filtersStyle}>
            <div style={styles.filterHeading}>
              <h2 style={styles.filterTitle}>Filters</h2>
              {filtersAreActive && (
                <button
                  type="button"
                  style={styles.clearButton}
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              )}
            </div>
            <div style={styles.filterCard}>
              <label htmlFor="maximum-price" style={styles.filterLabel}>
                Maximum Price
              </label>
              <input
                id="maximum-price"
                type="range"
                min="0"
                max={MAX_PRICE}
                step="500"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                aria-valuetext={`Rs. ${maxPrice.toLocaleString()}`}
                style={styles.priceRange}
              />
              <div style={styles.rangeRow}>
                <span>Rs. {minPrice.toLocaleString()}</span>
                <span>Up to Rs. {maxPrice.toLocaleString()}</span>
              </div>

              <span style={styles.filterLabel}>Room Type</span>
              {roomTypes.map((roomType) => (
                <label style={styles.checkboxLabel} key={roomType.value}>
                  <input
                    type="checkbox"
                    checked={selectedRoomTypes.includes(roomType.value)}
                    onChange={() => toggleRoomType(roomType.value)}
                  />
                  <span>{roomType.label}</span>
                </label>
              ))}
            </div>
          </aside>

          <section style={listingsStyle} ref={listingsRef}>
            <div style={listingHeaderStyle}>
              <div>
                <h2 style={styles.sectionTitle}>Featured Properties</h2>
                <p style={styles.resultCount}>
                  {filteredRooms.length}{" "}
                  {filteredRooms.length === 1 ? "property" : "properties"} found
                </p>
              </div>
              <label style={responsiveSortStyle}>
                <span>Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value as SortOption)
                  }
                  style={styles.sortSelect}
                  aria-label="Sort properties"
                >
                  <option value="newest">Newest first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Highest rated</option>
                </select>
                <ChevronDown size={10} aria-hidden="true" />
              </label>
            </div>

            <div style={cardGridStyle}>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((property) => (
                  <PropertyCard
                    property={property}
                    isSaved={savedRoomIds.includes(property.id)}
                    onToggleSaved={() => toggleSavedRoom(property.id)}
                    key={property.id}
                  />
                ))
              ) : (
                <div style={styles.emptyState}>
                  <h3 style={styles.emptyTitle}>No properties found</h3>
                  <p style={styles.emptyCopy}>
                    Try increasing the price or selecting a different room type.
                  </p>
                </div>
              )}
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
          <a href="mailto:support@staynest.com?subject=Help Center" style={styles.footerLink}>
            Help Center
          </a>
          <a href="mailto:support@staynest.com" style={styles.footerLink}>
            Contact Support
          </a>
          <a href="mailto:safety@staynest.com" style={styles.footerLink}>
            Safety Guide
          </a>
        </section>

        <section>
          <h3 style={styles.footerHeading}>Company Us</h3>
          <Link href="/profile" style={styles.footerLink}>
            About Us
          </Link>
          <a href="mailto:hello@staynest.com" style={styles.footerLink}>
            Contacts Us
          </a>
          <a href="mailto:partners@staynest.com" style={styles.footerLink}>
            Partner with Us
          </a>
        </section>

        <section>
          <h3 style={styles.footerHeading}>Legal</h3>
          <Link href="/legal#terms" style={styles.footerLink}>
            Terms of Services
          </Link>
          <Link href="/legal#cookies" style={styles.footerLink}>
            Cookies
          </Link>
          <Link href="/legal#privacy" style={styles.footerLink}>
            Privacy policy
          </Link>
        </section>
      </footer>
    </main>
  );
}
