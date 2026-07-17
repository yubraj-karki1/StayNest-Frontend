"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearOwnerToken } from "../../_lib/owner-api";

export default function OwnerLogoutButton({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full border border-rose-500 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-900/20"
        }
        onClick={() => setIsOpen(true)}
      >
        <LogOut size={14} aria-hidden="true" />
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
            className="w-[min(100%,390px)] rounded-3xl bg-white p-7 text-center shadow-2xl shadow-slate-950/30 dark:bg-slate-900"
          >
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950">
              <LogOut size={23} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Log out of Owner Portal?
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              You will need to sign in again to manage your rooms.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="h-11 rounded-xl bg-rose-500 text-sm font-bold text-white transition hover:bg-rose-600"
                onClick={() => {
                  clearOwnerToken();
                  router.push("/owner/login");
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
