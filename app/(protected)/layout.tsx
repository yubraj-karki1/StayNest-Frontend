"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, clearToken } from "../_lib/api";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    apiRequest("/profile")
      .then(() => setIsAuthorized(true))
      .catch(() => {
        clearToken();
        router.replace("/login");
      });
  }, [router]);

  if (!isAuthorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_#ecfeff_35%,_#f8fafc_70%)] text-slate-700">
        <p className="rounded-2xl bg-white/80 px-5 py-4 text-sm font-bold shadow-lg shadow-slate-200/60">
          Checking your session...
        </p>
      </main>
    );
  }

  return children;
}
