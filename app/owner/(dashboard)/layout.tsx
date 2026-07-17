"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { clearOwnerToken, ownerApiRequest, type OwnerProfile } from "../../_lib/owner-api";

export default function OwnerProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    ownerApiRequest<{ user: OwnerProfile }>("/profile")
      .then(({ user }) => {
        if (user.role !== "owner") {
          throw new Error("Not an owner account");
        }
        setIsAuthorized(true);
      })
      .catch(() => {
        clearOwnerToken();
        router.replace("/owner/login");
      });
  }, [router]);

  if (!isAuthorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,_#dbeafe_0%,_#eef2ff_35%,_#f8fafc_70%)] text-slate-700">
        <p className="rounded-2xl bg-white/80 px-5 py-4 text-sm font-bold shadow-lg shadow-slate-200/60">
          Checking your owner session...
        </p>
      </main>
    );
  }

  return children;
}
