import type { Metadata } from "next";
import "./ui/global.css";

export const metadata: Metadata = {
  title: "PrimeLog Fleet | Maritime Intelligence",
  description: "PrimeLog Fleet — Maritime vessel tracking & intelligence system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&family=Orbitron:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
