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
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <p>Checking your session...</p>
      </main>
    );
  }

  return children;
}
