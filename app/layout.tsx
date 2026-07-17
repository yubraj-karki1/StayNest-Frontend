import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayNest",
  description: "StayNest hostel booking experience",
};

const THEME_INIT_SCRIPT = `
  try {
    var theme = localStorage.getItem("staynest_theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
