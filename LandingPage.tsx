const navItems = [
  {
    label: "Saved",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z" />
      </svg>
    ),
  },
  {
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <main className="staynest-page">
      <nav className="staynest-nav" aria-label="Primary navigation">
        <a className="staynest-brand" href="/">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.7 12 3l9 7.7" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9 21v-7h6v7" />
          </svg>
          <span>StayNest</span>
        </a>

        <div className="staynest-actions">
          {navItems.map((item) => (
            <a key={item.label} href={`/${item.label.toLowerCase()}`}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}

          <button className="icon-button" type="button" aria-label="Notifications">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </button>

          <a className="sign-in-button" href="/login">
            Sign In
          </a>
        </div>
      </nav>

      <section className="staynest-hero" aria-label="Find rooms near your campus">
        <div className="hero-copy">
          <h1>Find Your Perfect Room Easily</h1>
          <p>
            Discover affordable rooms and hostels near your campus. Compare
            prices, check facilities and more in hassle-free.
          </p>
        </div>

        <form className="search-panel">
          <label className="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input type="text" placeholder="Enter location or area...." />
          </label>

          <label className="select-field">
            <select defaultValue="any">
              <option value="any">Any Price</option>
              <option value="low">Under Rs. 8,000</option>
              <option value="mid">Rs. 8,000 - 15,000</option>
              <option value="high">Above Rs. 15,000</option>
            </select>
          </label>

          <button className="search-button" type="submit">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search</span>
          </button>
        </form>
      </section>

      <style>{`
        .staynest-page {
          min-height: 100vh;
          color: #111111;
          font-family: Arial, Helvetica, sans-serif;
          background:
            linear-gradient(90deg, rgba(244, 246, 246, 0.25), rgba(244, 246, 246, 0.15)),
            url("https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=85");
          background-position: center;
          background-size: cover;
        }

        .staynest-page svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2;
          flex: 0 0 auto;
        }

        .staynest-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
        }

        .staynest-brand,
        .staynest-actions,
        .staynest-actions a {
          display: flex;
          align-items: center;
        }

        .staynest-brand {
          gap: 6px;
          color: #111111;
          font-size: 20px;
          font-weight: 800;
          text-decoration: none;
        }

        .staynest-brand svg {
          width: 23px;
          height: 23px;
        }

        .staynest-actions {
          gap: 18px;
          font-size: 13px;
          font-weight: 700;
        }

        .staynest-actions a {
          gap: 3px;
          color: #111111;
          text-decoration: none;
        }

        .icon-button {
          display: grid;
          width: 22px;
          height: 22px;
          place-items: center;
          border: 0;
          color: #111111;
          background: transparent;
          cursor: pointer;
          padding: 0;
        }

        .sign-in-button {
          min-height: 27px;
          padding: 0 19px;
          border-radius: 7px;
          color: #07142c !important;
          background: #4d83ee;
        }

        .staynest-hero {
          display: flex;
          min-height: calc(100vh - 66px);
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 24px 24px 100px;
          text-align: center;
        }

        .hero-copy {
          max-width: 520px;
          margin-top: -52px;
        }

        .hero-copy h1 {
          max-width: 430px;
          margin: 0 auto 4px;
          color: #3e4d22;
          font-size: clamp(38px, 4.8vw, 42px);
          font-weight: 400;
          line-height: 1.08;
        }

        .hero-copy p {
          margin: 0 auto;
          color: #ffffff;
          font-size: 14px;
          line-height: 1.08;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .search-panel {
          display: grid;
          grid-template-columns: minmax(190px, 1fr) 104px 101px;
          gap: 7px;
          width: min(426px, 100%);
          margin-top: 42px;
          padding: 7px;
          border-radius: 7px;
          background: #ffffff;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
        }

        .search-field,
        .select-field,
        .search-button {
          display: flex;
          min-height: 34px;
          align-items: center;
          border-radius: 6px;
          background: #d8d8d8;
        }

        .search-field {
          gap: 4px;
          padding: 0 8px;
          color: #828282;
        }

        .search-field svg,
        .search-button svg {
          width: 16px;
          height: 16px;
        }

        .search-field input,
        .select-field select {
          width: 100%;
          border: 0;
          outline: 0;
          color: #6f6f6f;
          background: transparent;
          font: inherit;
        }

        .search-field input::placeholder {
          color: #747474;
          opacity: 1;
        }

        .select-field select {
          height: 100%;
          padding: 0 6px;
          cursor: pointer;
        }

        .search-button {
          justify-content: center;
          gap: 6px;
          border: 0;
          color: #747474;
          font-size: 20px;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .staynest-nav {
            align-items: flex-start;
            gap: 14px;
            padding: 16px;
          }

          .staynest-actions {
            gap: 10px;
            flex-wrap: wrap;
            justify-content: flex-end;
          }

          .staynest-actions a:not(.sign-in-button) span {
            display: none;
          }

          .staynest-hero {
            min-height: calc(100vh - 78px);
            padding: 32px 16px 72px;
          }

          .hero-copy {
            margin-top: 0;
          }

          .hero-copy h1 {
            font-size: 35px;
          }

          .search-panel {
            grid-template-columns: 1fr;
            margin-top: 34px;
          }
        }
      `}</style>
    </main>
  );
}
