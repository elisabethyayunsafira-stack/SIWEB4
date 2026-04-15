"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [operatorId, setOperatorId] = useState("");
  const [authorizationKey, setAuthorizationKey] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState("WAITING FOR INPUT...");
  const [statusColor, setStatusColor] = useState("#14d7ff");
  const [error, setError] = useState("");

  const handleConnect = () => {
    if (connecting) return;

    if (!operatorId.trim() || !authorizationKey.trim()) {
      setError("OPERATOR ID & AUTHORIZATION KEY REQUIRED");
      setStatus("INPUT ERROR");
      setStatusColor("#ff7a87");
      return;
    }

    setError("");
    setConnecting(true);
    setStatus("AUTHENTICATING...");
    setStatusColor("#d17bff");

    setTimeout(() => {
      setStatus("CONNECTION ESTABLISHED - REDIRECTING...");
      setStatusColor("#66f2b0");

      setTimeout(() => {
        router.push("/dashboard");
      }, 850);
    }, 2200);
  };

  const handleRecovery = () => {
    setOperatorId("Alpha-9-Delta");
    setAuthorizationKey("SIG-2048-DELTA");
    setSyncEnabled(true);
    setError("");
    setConnecting(false);
    setStatus("RECOVERY KEY LOADED");
    setStatusColor("#14d7ff");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Orbitron:wght@500;700;800&family=Share+Tech+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          width:100%;
          min-height:100%;
          background:#030303;
          overflow:hidden;
        }
        body{
          font-family:'Barlow',sans-serif;
          color:#f1f1f1;
        }
        .page{
          position:relative;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          background:
            radial-gradient(circle at 50% 44%, rgba(114,18,165,0.10), transparent 28%),
            radial-gradient(circle at 14% 24%, rgba(125,57,208,0.08), transparent 20%),
            linear-gradient(180deg, #050505 0%, #040404 56%, #080808 100%);
          overflow:hidden;
        }
        .page::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size:124px 124px;
          opacity:0.24;
          pointer-events:none;
        }
        .topbar{
          position:relative;
          z-index:10;
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          padding:16px 20px 0;
        }
        .brand-wrap{
          display:flex;
          align-items:flex-start;
          gap:10px;
        }
        .brand-icon{
          width:26px;
          height:26px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid rgba(208,127,255,0.35);
          border-radius:4px;
          background:rgba(177,76,255,0.08);
          color:#d48cff;
          box-shadow:0 0 16px rgba(177,76,255,0.10);
          flex-shrink:0;
        }
        .brand-name{
          font-family:'Barlow',sans-serif;
          font-size:12px;
          font-weight:600;
          color:#d78eff;
          line-height:1.1;
        }
        .brand-sub{
          margin-top:2px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.20em;
          color:#8b8593;
          text-transform:uppercase;
        }
        .brand-meta{
          margin-top:5px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          line-height:1.55;
          letter-spacing:0.08em;
          color:#554f5d;
          text-transform:uppercase;
        }
        .status-list{
          display:flex;
          align-items:center;
          gap:18px;
          padding-top:4px;
        }
        .status-chip{
          display:flex;
          align-items:center;
          gap:6px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.14em;
          color:#7d7786;
          text-transform:uppercase;
        }
        .status-dot{
          width:5px;
          height:5px;
          border-radius:50%;
          box-shadow:0 0 8px currentColor;
        }
        .status-dot.cyan{color:#14d7ff;background:#14d7ff}
        .status-dot.purple{color:#d48cff;background:#d48cff}
        .stage{
          position:relative;
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px 24px 86px;
        }
        .world-shell{
          position:absolute;
          inset:46px 0 62px;
          display:flex;
          align-items:center;
          justify-content:center;
          pointer-events:none;
        }
        .world-map{
          position:relative;
          width:min(88vw, 1180px);
          height:min(68vh, 720px);
          opacity:0.54;
        }
        .globe{
          position:absolute;
          left:50%;
          top:51%;
          width:min(58vw, 760px);
          aspect-ratio:1;
          transform:translate(-50%,-50%);
          border-radius:50%;
          background:
            radial-gradient(circle at 50% 50%, rgba(26,41,42,0.12), rgba(0,0,0,0.02) 52%, transparent 72%),
            linear-gradient(rgba(255,184,66,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,184,66,0.035) 1px, transparent 1px);
          background-size:100% 100%, 22px 22px, 22px 22px;
          border:1px solid rgba(226,180,84,0.08);
          box-shadow:
            inset 0 0 120px rgba(0,0,0,0.74),
            0 0 80px rgba(0,0,0,0.42);
        }
        .globe::before{
          content:"";
          position:absolute;
          inset:6% 6%;
          border-radius:50%;
          border:1px solid rgba(226,180,84,0.06);
        }
        .globe::after{
          content:"";
          position:absolute;
          inset:19% 19%;
          border-radius:50%;
          border:1px solid rgba(226,180,84,0.05);
        }
        .continent{
          position:absolute;
          background:
            linear-gradient(rgba(255,185,66,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,185,66,0.045) 1px, transparent 1px);
          background-size:7px 7px;
          border:1px solid rgba(255,185,66,0.04);
          filter:blur(0.2px);
          opacity:0.52;
        }
        .continent.one{
          left:14%;
          top:18%;
          width:26%;
          height:58%;
          clip-path:polygon(32% 2%, 48% 0%, 68% 8%, 82% 22%, 72% 34%, 77% 47%, 72% 64%, 56% 78%, 45% 100%, 24% 85%, 16% 64%, 18% 43%, 10% 21%);
        }
        .continent.two{
          left:44%;
          top:10%;
          width:35%;
          height:34%;
          clip-path:polygon(18% 12%, 34% 3%, 56% 7%, 78% 18%, 96% 35%, 90% 54%, 72% 70%, 48% 82%, 29% 72%, 18% 56%, 8% 34%);
        }
        .continent.three{
          left:48%;
          top:38%;
          width:19%;
          height:36%;
          clip-path:polygon(30% 0%, 68% 12%, 84% 32%, 74% 66%, 54% 100%, 34% 82%, 18% 52%, 20% 24%);
        }
        .frame{
          position:absolute;
          border:1px solid rgba(114,72,150,0.14);
          border-radius:10px;
          box-shadow:inset 0 0 36px rgba(123,58,196,0.03);
        }
        .frame.one{
          width:min(72vw, 980px);
          height:min(62vh, 610px);
        }
        .frame.two{
          width:min(62vw, 790px);
          height:min(50vh, 500px);
          transform:translate(16px, 22px);
        }
        .frame-route{
          position:absolute;
          width:240px;
          height:1px;
          background:linear-gradient(90deg, rgba(176,71,255,0.0), rgba(176,71,255,0.6), rgba(176,71,255,0));
          transform:translate(-126px, 96px) rotate(48deg);
          opacity:0.7;
        }
        .portal{
          position:relative;
          z-index:5;
          width:min(100%, 372px);
          padding:28px 26px 24px;
          background:rgba(26,20,24,0.86);
          border:1px solid rgba(185,89,255,0.42);
          border-radius:10px;
          box-shadow:
            0 0 0 1px rgba(185,89,255,0.08) inset,
            0 0 24px rgba(185,89,255,0.18),
            0 20px 60px rgba(0,0,0,0.56);
          backdrop-filter:blur(10px);
        }
        .portal::before{
          content:"";
          position:absolute;
          inset:-1px;
          border-radius:10px;
          box-shadow:0 0 34px rgba(185,89,255,0.16);
          pointer-events:none;
        }
        .portal-title{
          font-family:'Barlow',sans-serif;
          font-size:16px;
          font-weight:700;
          letter-spacing:0.04em;
          color:#f5f2f7;
          text-align:center;
          margin-bottom:8px;
        }
        .portal-copy{
          font-size:12px;
          line-height:1.45;
          color:#9b949d;
          text-align:center;
          margin-bottom:26px;
        }
        .field{
          margin-bottom:16px;
        }
        .field-label{
          display:block;
          margin-bottom:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.18em;
          color:#b77cff;
          text-transform:uppercase;
        }
        .input-shell{
          display:flex;
          align-items:center;
          gap:8px;
          height:32px;
          padding:0 10px;
          background:rgba(255,255,255,0.045);
          border:1px solid rgba(255,255,255,0.03);
          border-radius:3px;
        }
        .input-shell:focus-within{
          border-color:rgba(183,124,255,0.28);
          box-shadow:0 0 0 1px rgba(183,124,255,0.12);
        }
        .input-shell svg{
          flex-shrink:0;
          color:#6b5c75;
        }
        .input-shell input{
          width:100%;
          border:none;
          outline:none;
          background:transparent;
          color:#dad3de;
          font-family:'Barlow',sans-serif;
          font-size:12px;
        }
        .input-shell input::placeholder{
          color:#6b6670;
        }
        .error-box{
          margin:-2px 0 12px;
          padding:8px 10px;
          border:1px solid rgba(255,122,135,0.28);
          background:rgba(255,122,135,0.06);
          border-radius:4px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.10em;
          color:#ff7a87;
          text-transform:uppercase;
        }
        .row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:18px;
        }
        .check{
          display:flex;
          align-items:center;
          gap:7px;
          cursor:pointer;
          user-select:none;
        }
        .check-box{
          width:11px;
          height:11px;
          border:1px solid rgba(255,255,255,0.18);
          border-radius:2px;
          background:rgba(255,255,255,0.02);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#d48cff;
          flex-shrink:0;
        }
        .check-label,
        .recovery-link{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          color:#7c7683;
          text-transform:uppercase;
        }
        .recovery-link{
          border:none;
          background:none;
          padding:0;
          text-decoration:none;
          cursor:pointer;
        }
        .submit{
          width:100%;
          height:34px;
          border:none;
          border-radius:4px;
          background:linear-gradient(90deg, #d07bff 0%, #ba5fff 58%, #8d28ff 100%);
          box-shadow:0 0 24px rgba(176,71,255,0.22);
          color:#1e1126;
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          cursor:pointer;
          transition:opacity 0.2s ease, transform 0.12s ease;
        }
        .submit:hover:not(:disabled){
          opacity:0.92;
          transform:translateY(-1px);
        }
        .submit:disabled{
          opacity:0.74;
          cursor:default;
        }
        .status-row{
          margin-top:24px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
        }
        .status-led{
          width:6px;
          height:6px;
          border-radius:50%;
          animation:pulse 1.4s ease-in-out infinite;
        }
        .status-text{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.14em;
          text-transform:uppercase;
        }
        .footer-mini{
          position:relative;
          z-index:5;
          display:flex;
          justify-content:center;
          gap:28px;
          margin-top:14px;
        }
        .footer-mini a{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#54505a;
          text-decoration:none;
        }
        .footer-bar{
          position:relative;
          z-index:10;
          min-height:40px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding:0 20px;
          background:rgba(18,18,18,0.96);
          border-top:1px solid rgba(255,255,255,0.04);
        }
        .footer-copy{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.08em;
          color:#52515a;
          text-transform:uppercase;
        }
        .footer-right{
          display:flex;
          align-items:center;
          gap:22px;
          flex-wrap:wrap;
          justify-content:flex-end;
        }
        .footer-links{
          display:flex;
          gap:18px;
          flex-wrap:wrap;
        }
        .footer-links a,
        .footer-meta{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          color:#66626c;
          text-transform:uppercase;
          text-decoration:none;
        }
        .footer-icons{
          display:flex;
          align-items:center;
          gap:8px;
          color:#68626f;
        }
        @keyframes pulse{
          0%,100%{opacity:1}
          50%{opacity:0.34}
        }
        @media (max-width: 900px){
          .topbar{
            flex-direction:column;
            gap:12px;
          }
          .status-list{
            align-self:flex-end;
          }
          .world-map{
            width:100vw;
          }
          .frame.one,.frame.two{
            width:90vw;
          }
          .footer-bar{
            padding:12px 16px;
            align-items:flex-start;
            flex-direction:column;
          }
          .footer-right{
            justify-content:flex-start;
          }
        }
        @media (max-width: 640px){
          .page{
            overflow:auto;
          }
          html,body{
            overflow:auto;
          }
          .stage{
            padding:34px 16px 48px;
          }
          .status-list{
            gap:12px;
          }
          .status-chip{
            font-size:6px;
          }
          .portal{
            padding:24px 18px 20px;
          }
          .footer-mini{
            gap:16px;
            flex-wrap:wrap;
          }
        }
      `}</style>

      <main className="page">
        <header className="topbar">
          <div className="brand-wrap">
            <div className="brand-icon">
              <svg width="14" height="14" viewBox="0 0 20 16" fill="none">
                <path
                  d="M1 3Q3.5 1 6 3Q8.5 5 11 3Q13.5 1 16 3Q18.5 5 20 3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M1 8Q3.5 6 6 8Q8.5 10 11 8Q13.5 6 16 8Q18.5 10 20 8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M1 13Q3.5 11 6 13Q8.5 15 11 13Q13.5 11 16 13Q18.5 15 20 13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="brand-name">Serene Sail</div>
              <div className="brand-sub">MARITIME INTELLIGENCE NETWORK</div>
              <div className="brand-meta">
                LAT: 51.5074 N
                <br />
                LONG: 0.1278 W
                <br />
                BEARING: 264.0
              </div>
            </div>
          </div>

          <div className="status-list">
            <div className="status-chip">
              <span className="status-dot cyan" />
              SIGNAL: STABLE
            </div>
            <div className="status-chip">
              <span className="status-dot purple" />
              ENCRYPTED TUNNEL
            </div>
          </div>
        </header>

        <section className="stage">
          <div className="world-shell" aria-hidden="true">
            <div className="world-map">
              <div className="globe">
                <div className="continent one" />
                <div className="continent two" />
                <div className="continent three" />
              </div>
            </div>
          </div>

          <div className="frame one" aria-hidden="true" />
          <div className="frame two" aria-hidden="true" />
          <div className="frame-route" aria-hidden="true" />

          <div>
            <div className="portal">
              <h1 className="portal-title">SECURE ACCESS PORTAL</h1>
              <p className="portal-copy">
                Classified intelligence access. Verify credentials.
              </p>

              <div className="field">
                <label className="field-label" htmlFor="operator-id">
                  OPERATOR ID
                </label>
                <div className="input-shell">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M8 10V7.5A4 4 0 0 1 12 3.5A4 4 0 0 1 16 7.5V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="operator-id"
                    type="text"
                    value={operatorId}
                    onChange={(event) => {
                      setOperatorId(event.target.value);
                      setError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleConnect();
                    }}
                    placeholder="Alpha-9-Delta"
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="authorization-key">
                  AUTHORIZATION KEY
                </label>
                <div className="input-shell">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="8"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M11 12H20M17 12V15M14 12V14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="authorization-key"
                    type="password"
                    value={authorizationKey}
                    onChange={(event) => {
                      setAuthorizationKey(event.target.value);
                      setError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleConnect();
                    }}
                    placeholder="............"
                  />
                </div>
              </div>

              {error ? <div className="error-box">{error}</div> : null}

              <div className="row">
                <label className="check" htmlFor="sync-enabled">
                  <span
                    className="check-box"
                    style={{
                      background: syncEnabled
                        ? "rgba(212,140,255,0.16)"
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {syncEnabled ? (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <input
                    id="sync-enabled"
                    type="checkbox"
                    checked={syncEnabled}
                    onChange={() => setSyncEnabled((value) => !value)}
                    style={{ display: "none" }}
                  />
                  <span className="check-label">STAY SYNCHRONIZED</span>
                </label>
                <button
                  type="button"
                  className="recovery-link"
                  onClick={handleRecovery}
                >
                  KEY RECOVERY
                </button>
              </div>

              <button
                className="submit"
                onClick={handleConnect}
                disabled={connecting}
                type="button"
              >
                {connecting ? "AUTHENTICATING..." : "INITIATE CONNECTION >>"}
              </button>

              <div className="status-row">
                <span
                  className="status-led"
                  style={{
                    background: statusColor,
                    boxShadow: `0 0 10px ${statusColor}`,
                  }}
                />
                <span className="status-text" style={{ color: statusColor }}>
                  {status}
                </span>
              </div>
            </div>

            <div className="footer-mini">
              <a href="/admin/security-accounts">EMERGENCY PROTOCOL</a>
              <a href="/dashboard">NETWORK STATUS</a>
              <a href="/profile">LEGAL</a>
            </div>
          </div>
        </section>

        <footer className="footer-bar">
          <span className="footer-copy">
            (C) 2024 SERENE SAIL MARITIME INTELLIGENCE NETWORK. ALL RIGHTS
            RESERVED.
          </span>

          <div className="footer-right">
            <div className="footer-links">
              <a href="/reference">SECURE ACCESS POLICY</a>
              <a href="/profile">TERMS OF SERVICE</a>
              <a href="/admin/security-accounts">PRIVACY PROTOCOL</a>
            </div>
            <div className="footer-meta">
              ENCRYPTION: AES-256-GCM | PROTOCOL: MARITIME_SECURE_V4
            </div>
            <div className="footer-icons">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M3 12H21M12 3C14.6 5.8 16 8.8 16 12C16 15.2 14.6 18.2 12 21C9.4 18.2 8 15.2 8 12C8 8.8 9.4 5.8 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L19 6V11.5C19 16 16.1 19.9 12 21C7.9 19.9 5 16 5 11.5V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
