"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type PrimeTopbarProps = {
  brand?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showMore?: boolean;
  statusLabel?: string;
  statusValue?: string;
};

const moreItems = [
  { label: "LIVE TRACKING MODE", href: "/map" },
  { label: "LOGISTICS OPTIMIZATION", href: "/fleet" },
  { label: "VESSEL DEPLOYMENT", href: "/vessel-deployment" },
];

export default function PrimeTopbar({
  brand = "PRIME LOG FLEET",
  showSearch = false,
  searchPlaceholder = "COMMAND SEARCH...",
  showMore = true,
  statusLabel,
  statusValue,
}: PrimeTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePanel, setActivePanel] = useState<null | "alerts" | "tools">(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }

      if (
        utilityRef.current &&
        !utilityRef.current.contains(event.target as Node)
      ) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const navs = [
    { label: "DASHBOARD", href: "/dashboard" },
    { label: "FLEET", href: "/fleet" },
    { label: "MAP", href: "/map" },
    { label: "ANALYTICS", href: "/analytics" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 44,
        padding: "0 14px 0 16px",
        background:
          "linear-gradient(180deg, rgba(16,16,20,0.98), rgba(11,11,15,0.98))",
        borderBottom: "1px solid rgba(172,96,255,0.14)",
        boxShadow: "inset 0 -1px 0 rgba(83,18,112,0.24)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{
            border: "none",
            background: "none",
            padding: 0,
            marginRight: 18,
            fontFamily: "'Orbitron',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#c97cff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {brand}
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navs.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => router.push(item.href)}
              style={{
                height: 44,
                padding: "0 12px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: isActive(item.href) ? "#f4eff9" : "#84808c",
                textTransform: "uppercase",
                borderBottom: isActive(item.href)
                  ? "2px solid #c97cff"
                  : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}

          {showMore ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setShowDropdown((value) => !value)}
                style={{
                  height: 44,
                  padding: "0 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: showDropdown ? "#f4eff9" : "#84808c",
                  textTransform: "uppercase",
                }}
              >
                MORE
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline
                    points={showDropdown ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
                  />
                </svg>
              </button>

              {showDropdown ? (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "calc(100% - 2px)",
                    minWidth: 154,
                    overflow: "hidden",
                    borderRadius: 14,
                    background: "rgba(53,53,59,0.92)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 26px rgba(0,0,0,0.42)",
                  }}
                >
                  {moreItems.map((item, index) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        setShowDropdown(false);
                        router.push(item.href);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        borderBottom:
                          index === moreItems.length - 1
                            ? "none"
                            : "1px solid rgba(255,255,255,0.05)",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.04em",
                        color: "#d4d1da",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </nav>
      </div>

      <div
        ref={utilityRef}
        style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}
      >
        {statusLabel && statusValue ? (
          <div style={{ textAlign: "right", marginRight: 8 }}>
            <div
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 7,
                letterSpacing: "0.12em",
                color: "#0fd5ff",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              {statusLabel}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 10,
                letterSpacing: "0.03em",
                color: "#9e99a7",
              }}
            >
              {statusValue}
            </div>
          </div>
        ) : null}

        {showSearch ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: 178,
              height: 30,
              padding: "0 10px",
              borderRadius: 2,
              background: "rgba(28,28,31,0.95)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6d6975"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.65" y2="16.65" />
            </svg>
            <span
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 7,
                letterSpacing: "0.12em",
                color: "#625d68",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {searchPlaceholder}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          title="Open reference gallery"
          onClick={() => router.push("/reference")}
          style={{
            width: 26,
            height: 26,
            border: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a9a4b0",
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
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </button>

        <button
          type="button"
          title="Open alerts"
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
            color: "#a9a4b0",
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
          title="Open tools"
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
            color: "#a9a4b0",
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
              right: 40,
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
                label: "Storm corridor requires live tracking",
                href: "/map",
              },
              {
                label: "Fuel analytics report is ready",
                href: "/analytics",
              },
              {
                label: "Admin audit channel needs review",
                href: "/admin/security-accounts",
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
              right: 8,
              width: 220,
              padding: 12,
              borderRadius: 12,
              background: "rgba(18,18,24,0.96)",
              border: "1px solid rgba(201,124,255,0.16)",
              boxShadow: "0 16px 38px rgba(0,0,0,0.42)",
            }}
          >
            {[
              { label: "Open Profile", href: "/profile" },
              { label: "Admin Console", href: "/admin/user-management" },
              { label: "Reference Gallery", href: "/reference" },
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
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "1px solid rgba(110,177,255,0.18)",
            background:
              "radial-gradient(circle at 50% 30%, #ffd7b8 0 18%, #6d4934 19% 40%, #102432 41% 100%)",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.28)",
          }}
        />
      </div>
    </div>
  );
}
