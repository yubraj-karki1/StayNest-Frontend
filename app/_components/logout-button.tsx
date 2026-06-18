"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearToken } from "../_lib/api";

type LogoutButtonProps = {
  iconSize?: number;
  className?: string;
};

export default function LogoutButton({
  iconSize = 14,
  className = "",
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
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full border border-rose-500 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        }
        onClick={() => setIsOpen(true)}
      >
        <LogOut size={iconSize} aria-hidden="true" />
        <span>Logout</span>
      </button>

      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[1000] grid place-items-center bg-slate-950/60 p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            className="w-[min(100%,390px)] rounded-3xl bg-white p-7 text-center shadow-2xl shadow-slate-950/30"
          >
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose-50 text-rose-500">
              <LogOut size={23} aria-hidden="true" />
            </span>
            <h2
              id="logout-dialog-title"
              className="text-xl font-black text-slate-950"
            >
              Do you want to logout?
            </h2>
            <p
              id="logout-dialog-description"
              className="mt-2 text-sm text-slate-500"
            >
              You will need to sign in again to access your account.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                ref={cancelButtonRef}
                type="button"
                className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="h-11 rounded-xl bg-rose-500 text-sm font-bold text-white transition hover:bg-rose-600"
                onClick={() => {
                  clearToken();
                  router.push("/login");
                }}
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
