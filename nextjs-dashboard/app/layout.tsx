import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PrimeLog Fleet | Maritime Intelligence",
  description: "Maritime vessel tracking & intelligence system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Orbitron:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#090910" }}>{children}</body>
    </html>
  );
}
