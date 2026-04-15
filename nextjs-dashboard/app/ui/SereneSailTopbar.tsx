"use client";
import { useRouter, usePathname } from "next/navigation";

export default function SereneSailTopbar() {
  const router = useRouter();
  const path = usePathname();

  const navs = [
    { label: "USER MANAGEMENT", href: "/admin/user-management" },
    { label: "FLEET & LOGISTICS", href: "/admin/fleet-logistics" },
    { label: "SECURITY & ACCOUNTS", href: "/admin/security-accounts" },
  ];

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 46, padding: "0 24px", background: "#0a0a14",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      position: "sticky", top: 0, zIndex: 200,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <span
          onClick={() => router.push("/admin/user-management")}
          style={{
            fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 700,
            color: "#a855f7", letterSpacing: "0.06em", cursor: "pointer", fontStyle: "italic",
          }}
        >
          Serene Sail
        </span>
        <nav style={{ display: "flex" }}>
          {navs.map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{
              fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
              letterSpacing: "0.12em", color: path === n.href ? "#fff" : "#6b7280",
              padding: "0 16px", cursor: "pointer", position: "relative",
              textTransform: "uppercase", border: "none", background: "none",
              height: 46, display: "flex", alignItems: "center",
              borderBottom: path === n.href ? "2px solid #a855f7" : "2px solid transparent",
              transition: "color 0.2s",
            }}>
              {n.label}
            </button>
          ))}
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, cursor: "pointer", color: "#6b7280", borderRadius: 4 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, cursor: "pointer", color: "#6b7280", borderRadius: 4 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </div>
        <div
          onClick={() => router.push("/login")}
          title="Logout"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg,#374151,#6b7280)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", overflow: "hidden",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </div>
      </div>
    </div>
  );
}
