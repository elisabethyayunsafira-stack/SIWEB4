"use client";

import type { CSSProperties } from "react";

import PrimeTopbar from "../ui/PrimeTopbar";

const fuelBars = [
  { label: "MERCURIUS", height: 22, color: "#ff8a93" },
  { label: "ORION", height: 34, color: "#c27ef7" },
  { label: "SATURNUS", height: 28, color: "#ff8a93" },
  { label: "MARS", height: 42, color: "#1bc8ef" },
  { label: "JUPITER", height: 48, color: "#1bc8ef" },
  { label: "BUMI", height: 37, color: "#c27ef7" },
  { label: "MOOON", height: 24, color: "#ff8a93" },
];

const capacities = [
  { id: "PL-4822", name: "Bumi", value: 94, color: "#c257ff" },
  { id: "PL-9011", name: "Moon", value: 78, color: "#18d7ff" },
  { id: "PL-3310", name: "Mars", value: 42, color: "#ff7a87" },
];

const locations = [
  {
    id: "PL-4822 Bumi",
    coordinates: "1.2982° N, 103.8519° E",
    region: "Selat Singapura",
    color: "#c257ff",
  },
  {
    id: "PL-9011 Moon",
    coordinates: "22.3193° N, 114.1694° E",
    region: "Hong Kong Port",
    color: "#18d7ff",
  },
  {
    id: "PL-3310 Mars",
    coordinates: "34.6937° N, 135.5023° E",
    region: "Teluk Osaka",
    color: "#ff7a87",
  },
];

export default function AnalyticsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          min-height:100%;
          background:#0a0a0b;
          color:#f0edf4;
          font-family:'Rajdhani',sans-serif;
        }
        .page{
          min-height:calc(100vh - 44px);
          padding:0 10px 18px;
          background:
            radial-gradient(circle at top center, rgba(108,23,142,0.08), transparent 28%),
            linear-gradient(180deg, #0a0a0b 0%, #090909 100%);
        }
        .header{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          padding:14px 0 10px 0;
        }
        .header h1{
          font-size:25px;
          font-weight:700;
          color:#f4f1f6;
          margin-bottom:4px;
        }
        .header p{
          font-size:13px;
          color:#8d8794;
        }
        .updated-card{
          width:126px;
          padding:10px 12px;
          background:#151516;
          border:1px solid rgba(255,255,255,0.04);
          text-align:right;
        }
        .updated-label{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:#67626c;
          margin-bottom:4px;
        }
        .updated-time{
          font-family:'Orbitron',sans-serif;
          font-size:14px;
          color:#18d7ff;
        }
        .layout{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 382px;
          gap:16px;
        }
        .left{
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .kpi-grid{
          display:grid;
          grid-template-columns:repeat(2, minmax(0, 260px));
          gap:12px;
        }
        .panel{
          background:#171617;
          border:1px solid rgba(255,255,255,0.05);
          border-radius:3px;
          overflow:hidden;
        }
        .kpi{
          position:relative;
          min-height:96px;
          padding:12px 14px 14px;
        }
        .kpi::before{
          content:"";
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          width:3px;
          background:var(--accent);
          box-shadow:0 0 12px var(--accent);
        }
        .kpi-label{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:#76707a;
          margin-bottom:12px;
        }
        .kpi-value{
          font-family:'Orbitron',sans-serif;
          font-size:42px;
          line-height:0.92;
          color:#f3eff6;
          margin-bottom:10px;
        }
        .kpi-value span{
          font-family:'Share Tech Mono',monospace;
          font-size:16px;
          color:#8f8994;
        }
        .kpi-meta{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:var(--meta);
        }
        .kpi-icon{
          position:absolute;
          top:14px;
          right:14px;
          color:var(--accent);
          opacity:0.9;
        }
        .fuel-panel{
          padding:16px 12px 18px;
          min-height:182px;
        }
        .section-title{
          font-size:14px;
          font-weight:600;
          color:#f4f1f6;
          margin-bottom:18px;
        }
        .fuel-bars{
          display:flex;
          align-items:flex-end;
          gap:4px;
          height:122px;
        }
        .fuel-col{
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          align-items:center;
          height:100%;
        }
        .fuel-bar{
          width:100%;
          border-radius:1px 1px 0 0;
          min-height:20px;
        }
        .fuel-label{
          margin-top:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          color:#706a75;
          text-transform:uppercase;
        }
        .location-panel{
          padding:14px 16px 0;
        }
        .location-head{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:16px;
        }
        .location-title{
          font-size:15px;
          font-weight:600;
          color:#f4f1f6;
          margin-bottom:4px;
        }
        .location-copy{
          font-size:12px;
          color:#7f7885;
        }
        .live-feed{
          display:flex;
          align-items:center;
          gap:6px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#c27ef7;
        }
        .location-grid{
          display:grid;
          grid-template-columns:repeat(3, minmax(0, 1fr));
          gap:0;
          border-top:1px solid rgba(255,255,255,0.04);
        }
        .location-card{
          padding:12px 10px;
          border-right:1px solid rgba(255,255,255,0.04);
        }
        .location-card:last-child{
          border-right:none;
        }
        .location-id{
          font-size:12px;
          font-weight:600;
          margin-bottom:10px;
        }
        .location-key{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#615b67;
          margin-bottom:4px;
        }
        .location-value{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          color:#b0abb3;
          margin-bottom:6px;
        }
        .location-stream{
          padding:8px 0 10px;
          border-top:1px solid rgba(255,255,255,0.04);
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.10em;
          color:#6a6470;
          text-transform:uppercase;
        }
        .side{
          display:flex;
          flex-direction:column;
          gap:20px;
        }
        .capacity-panel{
          padding:14px 16px 16px;
        }
        .capacity-head{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:14px;
        }
        .capacity-title{
          font-size:17px;
          font-weight:600;
          color:#f3eff6;
          margin-bottom:4px;
        }
        .capacity-copy{
          font-size:11px;
          color:#7e7885;
        }
        .audit-chip{
          display:inline-flex;
          align-items:center;
          gap:4px;
          height:20px;
          padding:0 8px;
          background:#242224;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.10em;
          color:#8a8590;
          text-transform:uppercase;
        }
        .capacity-item{
          margin-bottom:18px;
        }
        .capacity-item:last-child{
          margin-bottom:0;
        }
        .capacity-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        }
        .capacity-ship{
          display:flex;
          align-items:center;
          gap:8px;
        }
        .capacity-id{
          padding:2px 6px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.08em;
          text-transform:uppercase;
          border-radius:2px;
        }
        .capacity-name{
          font-size:13px;
          font-weight:600;
          color:#f2eef6;
        }
        .capacity-value{
          font-family:'Share Tech Mono',monospace;
          font-size:10px;
          font-weight:700;
        }
        .track{
          width:100%;
          height:8px;
          background:#2a282a;
          border-radius:999px;
          overflow:hidden;
        }
        .fill{
          height:100%;
          border-radius:999px;
        }
        .status-panel{
          min-height:244px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          padding:20px 16px;
        }
        .status-heading{
          text-align:center;
          font-size:18px;
          font-weight:600;
          color:#f2eef6;
          margin-bottom:8px;
        }
        .status-stats{
          display:flex;
          justify-content:center;
          gap:56px;
          margin-bottom:10px;
        }
        .status-stat{
          text-align:center;
        }
        .status-stat strong{
          display:block;
          font-family:'Orbitron',sans-serif;
          font-size:24px;
        }
        .status-stat span{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#7b7580;
        }
        .donut-wrap{
          display:flex;
          justify-content:center;
          margin-top:8px;
        }
        .donut{
          position:relative;
          width:116px;
          height:116px;
        }
        .donut-label{
          position:absolute;
          inset:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
        }
        .donut-label strong{
          font-family:'Orbitron',sans-serif;
          font-size:36px;
          color:#f2eef6;
        }
        .donut-label span{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:#c27ef7;
          text-align:center;
        }
        @media (max-width: 1100px){
          .layout{
            grid-template-columns:1fr;
          }
          .kpi-grid,
          .location-grid{
            grid-template-columns:1fr;
          }
          .location-card{
            border-right:none;
            border-top:1px solid rgba(255,255,255,0.04);
          }
        }
      `}</style>

      <PrimeTopbar brand="PrimeLog Fleet" showMore={false} />

      <main className="page">
        <header className="header">
          <div>
            <h1>Analytics</h1>
            <p>Surveilans data real-time untuk armada PrimeLog.</p>
          </div>
          <div className="updated-card">
            <div className="updated-label">TERAKHIR DIPERBARUI</div>
            <div className="updated-time">10:45 AM</div>
          </div>
        </header>

        <div className="layout">
          <div className="left">
            <div className="kpi-grid">
              <article
                className="panel kpi"
                style={
                  {
                    "--accent": "#c57cff",
                    "--meta": "#18d7ff",
                  } as CSSProperties
                }
              >
                <div className="kpi-label">CARGO ARRIVAL RATE</div>
                <div className="kpi-value">
                  88.2 <span>%</span>
                </div>
                <div className="kpi-meta">SUCCESS DELIVERY</div>
                <div className="kpi-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="5"
                      y="6"
                      width="14"
                      height="12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M8 10H16M8 14H14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </article>

              <article
                className="panel kpi"
                style={
                  {
                    "--accent": "#18d7ff",
                    "--meta": "#ff808a",
                  } as CSSProperties
                }
              >
                <div className="kpi-label">AVERAGE ETA ACCURACY</div>
                <div className="kpi-value">
                  92 <span>%</span>
                </div>
                <div className="kpi-meta">~ +2.4% MOM</div>
                <div className="kpi-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 8V12L15 14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </article>
            </div>

            <section className="panel fuel-panel">
              <div className="section-title">Bahan Bakar</div>
              <div className="fuel-bars">
                {fuelBars.map((bar) => (
                  <div key={bar.label} className="fuel-col">
                    <div
                      className="fuel-bar"
                      style={{
                        height: `${bar.height}%`,
                        background: bar.color,
                      }}
                    />
                    <div className="fuel-label">{bar.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel location-panel">
              <div className="location-head">
                <div>
                  <div className="location-title">LOKASI TERAKHIR</div>
                  <div className="location-copy">
                    Tracking koordinat real-time unit utama PrimeLog.
                  </div>
                </div>
                <div className="live-feed">
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#c27ef7",
                      display: "inline-block",
                    }}
                  />
                  LIVE FEED
                </div>
              </div>

              <div className="location-grid">
                {locations.map((location) => (
                  <div key={location.id} className="location-card">
                    <div
                      className="location-id"
                      style={{ color: location.color }}
                    >
                      {location.id}
                    </div>
                    <div className="location-key">COORDINATES</div>
                    <div className="location-value">{location.coordinates}</div>
                    <div className="location-key">REGION</div>
                    <div className="location-value">{location.region}</div>
                  </div>
                ))}
              </div>

              <div className="location-stream">
                SYSTEM SECURE: AES-256 ENCRYPTED STREAM
              </div>
            </section>
          </div>

          <aside className="side">
            <section className="panel capacity-panel">
              <div className="capacity-head">
                <div>
                  <div className="capacity-title">KAPASITAS KARGO PER KAPAL</div>
                  <div className="capacity-copy">
                    Persentase muatan aktif terhadap kapasitas maksimal unit.
                  </div>
                </div>
                <div className="audit-chip">
                  AUDIT LOG
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {capacities.map((capacity) => (
                <div key={capacity.id} className="capacity-item">
                  <div className="capacity-row">
                    <div className="capacity-ship">
                      <span
                        className="capacity-id"
                        style={{
                          background: `${capacity.color}22`,
                          color: capacity.color,
                        }}
                      >
                        {capacity.id}
                      </span>
                      <span className="capacity-name">{capacity.name}</span>
                    </div>
                    <div
                      className="capacity-value"
                      style={{ color: capacity.color }}
                    >
                      {capacity.value}% Capacity
                    </div>
                  </div>
                  <div className="track">
                    <div
                      className="fill"
                      style={{
                        width: `${capacity.value}%`,
                        background: capacity.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </section>

            <section className="panel status-panel">
              <div className="status-heading">Operational Status</div>
              <div className="status-stats">
                <div className="status-stat">
                  <strong style={{ color: "#f2eef6" }}>3</strong>
                  <span>DI PERJALANAN</span>
                </div>
                <div className="status-stat">
                  <strong style={{ color: "#ff7a87" }}>7</strong>
                  <span>PEMELIHARAAN</span>
                </div>
              </div>

              <div className="donut-wrap">
                <div className="donut">
                  <svg width="116" height="116" viewBox="0 0 116 116">
                    <circle
                      cx="58"
                      cy="58"
                      r="46"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="58"
                      cy="58"
                      r="46"
                      fill="none"
                      stroke="#c27ef7"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.75} ${2 * Math.PI * 46 * 0.25}`}
                      transform="rotate(-90 58 58)"
                    />
                  </svg>
                  <div className="donut-label">
                    <strong>75%</strong>
                    <span>DALAM PERJALANAN</span>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
