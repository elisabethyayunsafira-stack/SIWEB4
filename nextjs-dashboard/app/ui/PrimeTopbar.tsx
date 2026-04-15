"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PrimeTopbar() {
  const router = useRouter();
  const path = usePathname();
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navs = [
    { label: "DASHBOARD", href: "/dashboard" },
    { label: "FLEET", href: "/fleet" },
    { label: "MAP", href: "/map" },
    { label: "ANALYTICS", href: "/analytics" },
  ];

  const isActive = (href: string) => path === href;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 46, padding: "0 20px", background: "#0d0d14",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      position: "sticky", top: 0, zIndex: 200,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          onClick={() => router.push("/dashboard")}
          style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, color: "#a855f7", letterSpacing: "0.15em", marginRight: 20, whiteSpace: "nowrap", cursor: "pointer" }}
        >
          PRIME LOG FLEET
        </span>
        <nav style={{ display: "flex" }}>
          {navs.map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{
              fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.12em", color: isActive(n.href) ? "#fff" : "#6b7280",
              padding: "0 14px", cursor: "pointer", position: "relative",
              textTransform: "uppercase", border: "none", background: "none",
              height: 46, display: "flex", alignItems: "center",
              borderBottom: isActive(n.href) ? "2px solid #a855f7" : "2px solid transparent",
              transition: "color 0.2s",
            }}>
              {n.label}
            </button>
          ))}

          {/* MORE dropdown */}
          <div ref={moreRef} style={{ position: "relative" }}>
            <button onClick={() => setShowMore(v => !v)} style={{
              fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.12em", color: showMore ? "#fff" : "#6b7280",
              padding: "0 14px", cursor: "pointer", border: "none",
              background: "none", height: 46, display: "flex", alignItems: "center",
              gap: 4, textTransform: "uppercase",
            }}>
              MORE
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points={showMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
            </button>
            {showMore && (
              <div style={{
                position: "absolute", top: "calc(100% + 0px)", left: 0,
                background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4, overflow: "hidden", minWidth: 210,
                boxShadow: "0 8px 24px rgba(0,0,0,0.6)", zIndex: 300,
                animation: "fadeIn 0.12s ease",
              }}>
                <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
                {[
                  { label: "LIVE TRACKING MODE", href: "/map" },
                  { label: "LOGISTICS OPTIMIZATION", href: "/fleet" },
                  { label: "VESSEL DEPLOYMENT", href: "/vessel-deployment" },
                ].map(item => (
                  <button key={item.label} onClick={() => { setShowMore(false); router.push(item.href); }} style={{
                    display: "block", width: "100%", padding: "12px 16px", textAlign: "left",
                    fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
                    color: "#9ca3af", letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "none", border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                  }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(168,85,247,0.08)"; (e.target as HTMLElement).style.color = "#e5e7eb"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.background = "none"; (e.target as HTMLElement).style.color = "#9ca3af"; }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {[
          { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg> },
          { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h9" /></svg> },
          { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
        ].map((item, i) => (
          <div key={i} style={{
            width: 30, height: 30, border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4, background: "rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#6b7280",
          }}>
            {item.icon}
          </div>
        ))}
        <div
          onClick={() => router.push("/admin/user-management")}
          title="Admin Panel"
          style={{
            padding: "0 10px", height: 30, border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: 4, display: "flex", alignItems: "center",
            fontFamily: "'Share Tech Mono',monospace", fontSize: 9,
            color: "#a855f7", cursor: "pointer", letterSpacing: "0.12em",
            transition: "background 0.2s",
          }}
        >
          ADMIN
        </div>
        <div
          onClick={() => router.push("/login")}
          title="Logout — Back to Login"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
            color: "#fff", cursor: "pointer",
            border: "1px solid rgba(168,85,247,0.3)",
          }}
        >
          PL
        </div>
      </div>
    </div>
  );
}
