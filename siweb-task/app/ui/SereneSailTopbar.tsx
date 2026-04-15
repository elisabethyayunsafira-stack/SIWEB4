"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SereneSailTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePanel, setActivePanel] = useState<null | "alerts" | "tools">(
    null,
  );
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const navs = [
    { label: "USER MANAGEMENT", href: "/admin/user-management" },
    { label: "FLEET & LOGISTICS", href: "/admin/fleet-logistics" },
    { label: "SECURITY & ACCOUNTS", href: "/admin/security-accounts" },
  ];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        padding: "0 18px",
        background:
          "linear-gradient(180deg, rgba(16,16,20,0.98), rgba(11,11,15,0.98))",
        borderBottom: "1px solid rgba(201,124,255,0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <button
          type="button"
          onClick={() => router.push("/admin/user-management")}
          style={{
            border: "none",
            background: "none",
            padding: 0,
            fontFamily: "'Rajdhani',sans-serif",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#d48cff",
            cursor: "pointer",
          }}
        >
          Serene Sail
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {navs.map((nav) => (
            <button
              key={nav.href}
              type="button"
              onClick={() => router.push(nav.href)}
              style={{
                height: 50,
                padding: "0 8px",
                border: "none",
                background: "none",
                borderBottom:
                  pathname === nav.href
                    ? "2px solid #c97cff"
                    : "2px solid transparent",
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: pathname === nav.href ? "#f2edf6" : "#8b8691",
                cursor: "pointer",
              }}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </div>

      <div
        ref={panelRef}
        style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}
      >
        <button
          type="button"
          title="Admin alerts"
          onClick={() =>
            setActivePanel((panel) => (panel === "alerts" ? null : "alerts"))
          }
          style={{
            width: 26,
            height: 26,
            border: "none",
            background: activePanel === "alerts" ? "rgba(201,124,255,0.12)" : "transparent",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a6a1ac",
            cursor: "pointer",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <button
          type="button"
          title="Admin quick actions"
          onClick={() =>
            setActivePanel((panel) => (panel === "tools" ? null : "tools"))
          }
          style={{
            width: 26,
            height: 26,
            border: "none",
            background: activePanel === "tools" ? "rgba(201,124,255,0.12)" : "transparent",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a6a1ac",
            cursor: "pointer",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {activePanel === "alerts" ? (
          <div
            style={{
              position: "absolute",
              top: 38,
              right: 36,
              width: 230,
              padding: 12,
              borderRadius: 12,
              background: "rgba(18,18,24,0.96)",
              border: "1px solid rgba(201,124,255,0.16)",
              boxShadow: "0 16px 38px rgba(0,0,0,0.42)",
            }}
          >
            {[
              {
                label: "Identity token pending verification",
                href: "/admin/security-accounts",
              },
              {
                label: "Crew registration queue updated",
                href: "/admin/user-management",
              },
              {
                label: "Fleet package sync changed",
                href: "/admin/fleet-logistics",
              },
            ].map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => router.push(item.href)}
                style={{
                  width: "100%",
                  marginBottom: 8,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#d5d1db",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 12,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        {activePanel === "tools" ? (
          <div
            style={{
              position: "absolute",
              top: 38,
              right: 4,
              width: 216,
              padding: 12,
              borderRadius: 12,
              background: "rgba(18,18,24,0.96)",
              border: "1px solid rgba(201,124,255,0.16)",
              boxShadow: "0 16px 38px rgba(0,0,0,0.42)",
            }}
          >
            {[
              { label: "Corporate Profile", href: "/profile" },
              { label: "Reference Gallery", href: "/reference" },
              { label: "Return to Login", href: "/login" },
            ].map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => router.push(item.href)}
                style={{
                  width: "100%",
                  marginBottom: 8,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#d5d1db",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 12,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => router.push("/login")}
          title="Back to Login"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid rgba(111,190,255,0.16)",
            background:
              "radial-gradient(circle at 50% 30%, #ffe0c0 0 18%, #6c4734 19% 38%, #263746 39% 100%)",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
