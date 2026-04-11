"use client";

import { useState } from "react";
import Button from "./button";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [operatorId, setOperatorId] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [staySync, setStaySync] = useState(false);
  const [status, setStatus] = useState("WAITING FOR INPUT...");
  const [statusColor, setStatusColor] = useState("#a855f7");
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = () => {
    if (connecting) return;
    setConnecting(true);
    setStatus("AUTHENTICATING...");
    setStatusColor("#f59e0b");
    setTimeout(() => {
      setStatus("CONNECTION ESTABLISHED");
      setStatusColor("#22c55e");
      setConnecting(false);
      onSuccess?.();
    }, 2500);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        background: "rgba(8,5,18,0.88)",
        border: "1px solid rgba(168,85,247,0.5)",
        borderRadius: 6,
        padding: "36px 32px 28px",
        boxShadow: "0 0 60px rgba(168,85,247,0.1)",
        backdropFilter: "blur(16px)",
        position: "relative",
      }}
    >
      {/* Corner decorators */}
      {[
        { top: -1, left: -1, borderWidth: "2px 0 0 2px" },
        { top: -1, right: -1, borderWidth: "2px 2px 0 0" },
        { bottom: -1, left: -1, borderWidth: "0 0 2px 2px" },
        { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 14, height: 14,
            borderColor: "#a855f7",
            borderStyle: "solid",
            ...c,
          }}
        />
      ))}

      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 17, fontWeight: 700,
          textAlign: "center", color: "#fff",
          letterSpacing: "0.18em", marginBottom: 8,
        }}
      >
        SECURE ACCESS PORTAL
      </h1>
      <p
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13, color: "#9ca3af",
          textAlign: "center", marginBottom: 30,
          fontWeight: 300, letterSpacing: "0.02em",
        }}
      >
        Classified intelligence access. Verify credentials.
      </p>

      {/* Operator ID */}
      <div style={{ marginBottom: 18 }}>
        <label
          style={{
            display: "block", fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8, color: "#a855f7", letterSpacing: "0.28em",
            textTransform: "uppercase", marginBottom: 8,
          }}
        >
          OPERATOR ID
        </label>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10, height: 44,
            padding: "0 14px", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(168,85,247,0.2)", borderRadius: 4,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="text"
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
            placeholder="Alpha-9-Delta"
            style={{
              background: "none", border: "none", outline: "none",
              color: "#d1d5db", fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12, width: "100%", letterSpacing: "0.06em",
            }}
          />
        </div>
      </div>

      {/* Auth Key */}
      <div style={{ marginBottom: 18 }}>
        <label
          style={{
            display: "block", fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8, color: "#a855f7", letterSpacing: "0.28em",
            textTransform: "uppercase", marginBottom: 8,
          }}
        >
          AUTHORIZATION KEY
        </label>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10, height: 44,
            padding: "0 14px", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(168,85,247,0.2)", borderRadius: 4,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
          <input
            type="password"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            placeholder="············"
            style={{
              background: "none", border: "none", outline: "none",
              color: "#d1d5db", fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12, width: "100%",
            }}
          />
        </div>
      </div>

      {/* Stay Sync + Key Recovery */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => setStaySync(!staySync)}
        >
          <div
            style={{
              width: 14, height: 14,
              border: "1px solid rgba(168,85,247,0.4)", borderRadius: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: staySync ? "rgba(168,85,247,0.25)" : "transparent",
              transition: "background 0.2s",
            }}
          >
            {staySync && (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#6b7280", letterSpacing: "0.14em" }}>
            STAY SYNCHRONIZED
          </span>
        </div>
        <a href="#" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#7c3aed", letterSpacing: "0.14em", textDecoration: "none" }}>
          KEY RECOVERY
        </a>
      </div>

      {/* Button */}
      <Button variant="primary" size="lg" disabled={connecting} onClick={handleSubmit}>
        INITIATE CONNECTION
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Button>

      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 22 }}>
        <div
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: statusColor, boxShadow: `0 0 7px ${statusColor}`,
            animation: "pdot 1.2s ease-in-out infinite",
          }}
        />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: statusColor, letterSpacing: "0.2em" }}>
          {status}
        </span>
      </div>
    </div>
  );
}
