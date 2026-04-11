export default function AcmeLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Wave icon */}
      <div
        style={{
          width: 36,
          height: 36,
          background: "rgba(88,28,200,0.25)",
          border: "1px solid rgba(168,85,247,0.4)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 3 Q3.5 1 6 3 Q8.5 5 11 3 Q13.5 1 16 3 Q18.5 5 20 3"
            stroke="#a855f7"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1 8 Q3.5 6 6 8 Q8.5 10 11 8 Q13.5 6 16 8 Q18.5 10 20 8"
            stroke="#a855f7"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1 13 Q3.5 11 6 13 Q8.5 15 11 13 Q13.5 11 16 13 Q18.5 15 20 13"
            stroke="#a855f7"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#a855f7",
            letterSpacing: "0.1em",
            lineHeight: 1,
          }}
        >
          PrimeLog Fleet
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7,
            color: "#9ca3af",
            letterSpacing: "0.22em",
            marginTop: 3,
          }}
        >
          MARITIME INTELLIGENCE NETWORK
        </span>
      </div>
    </div>
  );
}
