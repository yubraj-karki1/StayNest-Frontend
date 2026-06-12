"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type LogoutButtonProps = {
  iconSize?: number;
  style?: CSSProperties;
};

export default function LogoutButton({
  iconSize = 14,
  style,
}: LogoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        style={{
          border: 0,
          background: "transparent",
          cursor: "pointer",
          padding: 0,
          font: "inherit",
          ...style,
        }}
        onClick={() => setIsOpen(true)}
      >
        <LogOut size={iconSize} aria-hidden="true" />
        <span>Logout</span>
      </button>

      {isOpen && (
        <div
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
            background: "rgba(10, 16, 12, 0.55)",
            padding: 20,
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            style={{
              width: "min(100%, 390px)",
              borderRadius: 16,
              background: "#ffffff",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.3)",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 52,
                height: 52,
                margin: "0 auto 16px",
                borderRadius: "50%",
                background: "#fff0eb",
                color: "#dc6545",
              }}
            >
              <LogOut size={23} aria-hidden="true" />
            </span>
            <h2
              id="logout-dialog-title"
              style={{ margin: "0 0 8px", color: "#202520", fontSize: 21 }}
            >
              Do you want to logout?
            </h2>
            <p
              id="logout-dialog-description"
              style={{ margin: "0 0 24px", color: "#707670", fontSize: 14 }}
            >
              You will need to sign in again to access your account.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button
                ref={cancelButtonRef}
                type="button"
                style={{
                  height: 44,
                  border: "1px solid #d9ddd9",
                  borderRadius: 8,
                  background: "#ffffff",
                  color: "#343934",
                  cursor: "pointer",
                  font: "700 14px Arial, Helvetica, sans-serif",
                }}
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                style={{
                  height: 44,
                  border: 0,
                  borderRadius: 8,
                  background: "#dc6545",
                  color: "#ffffff",
                  cursor: "pointer",
                  font: "700 14px Arial, Helvetica, sans-serif",
                }}
                onClick={() => router.push("/login")}
              >
                Yes, logout
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
