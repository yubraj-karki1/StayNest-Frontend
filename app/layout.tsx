import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StayNest",
  description: "StayNest hostel booking experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
