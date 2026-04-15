"use client";

import type { CSSProperties } from "react";

import PrimeTopbar from "../ui/PrimeTopbar";

const statCards = [
  {
    label: "EN ROUTE",
    value: "42",
    suffix: "VESSELS",
    accent: "#18d7ff",
    icon: "ship",
  },
  {
    label: "IN PORT",
    value: "18",
    suffix: "VESSELS",
    accent: "#f0eef4",
    icon: "anchor",
  },
  {
    label: "DELAYED",
    value: "03",
    suffix: "CRITICAL",
    accent: "#ff6c86",
    icon: "warning",
  },
  {
    label: "MAINTENANCE",
    value: "07",
    suffix: "UNITS",
    accent: "#c57cff",
    icon: "tool",
  },
];

const deployments = [
  {
    id: "PL-902-BUMI",
    type: "PULSE-CLASS FREIGHTER",
    destination: "Titan Gateway Alpha",
    eta: "14:20:00",
    status: "ACTIVE",
    color: "#12d4ff",
  },
  {
    id: "VX-441-MOON",
    type: "VOID-CLASS TANKER",
    destination: "Europan Ice Depot",
    eta: "16:45:12",
    status: "DELAYED",
    color: "#ff6c86",
  },
  {
    id: "DS-112-MARS",
    type: "DATA-STREAM INTERCEPTOR",
    destination: "Neo-Tokyo Orbital 3",
    eta: "21:05:40",
    status: "EN ROUTE",
    color: "#7f7a88",
  },
];

const fuelDays = [
  { label: "MON", height: 66 },
  { label: "TUE", height: 46 },
  { label: "WED", height: 82 },
  { label: "THU", height: 36 },
  { label: "FRI", height: 92 },
  { label: "SAT", height: 60 },
];

function StatIcon({ type }: { type: string }) {
  if (type === "ship") {
    return (
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 17L6 12H18L20 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 12V8H18V12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.5 8V5H15.5V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 5V2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "anchor") {
    return (
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7.6V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 12H2A10 10 0 0 0 22 12H19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4L21 20H3L12 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 9V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 6.2A1 1 0 0 0 14.5 7.6L16.4 9.5A1 1 0 0 0 17.8 9.5L21 6.3A5.5 5.5 0 0 1 13.8 13.5L7 20.3A2 2 0 1 1 4.2 17.5L11 10.7A5.5 5.5 0 0 1 18.2 3.5L14.5 7.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VesselDeploymentPage() {
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
          padding:16px 18px 18px;
          background:
            radial-gradient(circle at top center, rgba(103,20,142,0.08), transparent 28%),
            linear-gradient(180deg, #0a0a0b 0%, #090909 100%);
        }
        .page-head{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:18px;
        }
        .eyebrow{
          font-family:'Orbitron',sans-serif;
          font-size:12px;
          font-weight:700;
          color:#c97cff;
          letter-spacing:0.02em;
          margin-bottom:10px;
        }
        .title{
          font-size:28px;
          font-weight:700;
          color:#f4f1f6;
        }
        .live-chip{
          display:flex;
          align-items:center;
          gap:7px;
          margin-top:6px;
          padding:7px 10px;
          background:rgba(9,21,28,0.66);
          border:1px solid rgba(24,215,255,0.16);
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:#18d7ff;
        }
        .live-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          background:#18d7ff;
          box-shadow:0 0 10px #18d7ff;
        }
        .stats{
          display:grid;
          grid-template-columns:repeat(4, minmax(0, 1fr));
          gap:12px;
          margin-bottom:18px;
        }
        .stat{
          position:relative;
          min-height:112px;
          padding:16px 18px;
          background:#171617;
          border:1px solid rgba(255,255,255,0.05);
          overflow:hidden;
          box-shadow:0 0 0 1px rgba(255,255,255,0.01) inset;
        }
        .stat::before{
          content:"";
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          width:3px;
          background:var(--accent);
          box-shadow:0 0 14px var(--accent);
        }
        .stat-icon{
          position:absolute;
          right:10px;
          top:6px;
          color:rgba(255,255,255,0.06);
        }
        .stat-label{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#827c86;
          margin-bottom:10px;
        }
        .stat-value{
          display:flex;
          align-items:flex-end;
          gap:10px;
        }
        .stat-number{
          font-family:'Orbitron',sans-serif;
          font-size:42px;
          line-height:0.92;
          color:var(--accent);
        }
        .stat-suffix{
          padding-bottom:5px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.12em;
          color:#8a838d;
        }
        .content{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 396px;
          gap:18px;
        }
        .panel{
          background:#171617;
          border:1px solid rgba(255,255,255,0.05);
          border-radius:4px;
          overflow:hidden;
        }
        .panel-head{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:14px 16px;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .panel-title{
          font-size:16px;
          font-weight:600;
          color:#f5f1f7;
        }
        table{
          width:100%;
          border-collapse:collapse;
          table-layout:fixed;
        }
        th{
          padding:10px 16px;
          background:#221f21;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          font-weight:400;
          letter-spacing:0.16em;
          color:#706b74;
          text-transform:uppercase;
          text-align:left;
        }
        td{
          padding:16px;
          border-bottom:1px solid rgba(255,255,255,0.04);
          vertical-align:middle;
        }
        tbody tr:last-child td{
          border-bottom:none;
        }
        .deployment{
          display:flex;
          align-items:center;
          gap:12px;
        }
        .deployment-icon{
          width:30px;
          height:30px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#262325;
          border-radius:2px;
          color:#b54dff;
        }
        .deployment-id{
          font-size:13px;
          font-weight:700;
          color:#f1edf4;
          margin-bottom:4px;
        }
        .deployment-type{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.08em;
          color:#5b5660;
          text-transform:uppercase;
        }
        .destination,
        .eta{
          font-size:13px;
          color:#a7a3ab;
        }
        .eta{
          font-family:'Share Tech Mono',monospace;
        }
        .status-pill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-width:58px;
          height:18px;
          padding:0 8px;
          border-radius:999px;
          border:1px solid currentColor;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          background:rgba(255,255,255,0.02);
        }
        .fuel-body{
          padding:18px 16px 14px;
        }
        .fuel-title{
          font-size:15px;
          font-weight:600;
          color:#f4f1f6;
          margin-bottom:18px;
        }
        .fuel-bars{
          display:flex;
          align-items:flex-end;
          gap:10px;
          height:168px;
          margin-bottom:18px;
        }
        .fuel-col{
          flex:1;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-end;
          height:100%;
        }
        .fuel-bar{
          width:100%;
          border-radius:2px 2px 0 0;
          background:linear-gradient(180deg, #1ec8f0 0%, #0d6987 100%);
          box-shadow:0 0 18px rgba(30,200,240,0.16);
        }
        .fuel-label{
          margin-top:10px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          color:#66606c;
          text-transform:uppercase;
        }
        .efficiency{
          padding:13px 14px;
          background:rgba(108,72,139,0.10);
          border:1px solid rgba(197,124,255,0.24);
          border-radius:2px;
        }
        .efficiency-head{
          display:flex;
          align-items:center;
          gap:8px;
          margin-bottom:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#c488ff;
        }
        .efficiency-copy{
          font-size:12px;
          line-height:1.48;
          color:#9d98a3;
        }
        @media (max-width: 1024px){
          .stats,
          .content{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <PrimeTopbar brand="AETHER FLUX" />

      <main className="page">
        <div className="page-head">
          <div>
            <div className="eyebrow">AETHER FLUX</div>
            <h1 className="title">Vessel Deployment</h1>
          </div>
          <div className="live-chip">
            <span className="live-dot" />
            LIVE DATA STREAMING
          </div>
        </div>

        <section className="stats">
          {statCards.map((card) => (
            <article
              key={card.label}
              className="stat"
              style={{ "--accent": card.accent } as CSSProperties}
            >
              <div className="stat-icon">
                <StatIcon type={card.icon} />
              </div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-value">
                <div className="stat-number">{card.value}</div>
                <div className="stat-suffix">{card.suffix}</div>
              </div>
            </article>
          ))}
        </section>

        <div className="content">
          <section className="panel">
            <div className="panel-head">
              <div className="panel-title">Recent Deployments</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7H20M8 12H20M12 17H20"
                  stroke="#8a848d"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <table>
              <thead>
                <tr>
                  <th style={{ width: "42%" }}>VESSEL IDENTIFIER</th>
                  <th style={{ width: "33%" }}>DESTINATION NODE</th>
                  <th style={{ width: "15%" }}>ETA (UTC)</th>
                  <th style={{ width: "10%" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((deployment) => (
                  <tr key={deployment.id}>
                    <td>
                      <div className="deployment">
                        <div className="deployment-icon">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 17L6 12H18L20 17"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6 12V8H18V12"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.5 8V5H15.5V8"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="deployment-id">{deployment.id}</div>
                          <div className="deployment-type">{deployment.type}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="destination">{deployment.destination}</div>
                    </td>
                    <td>
                      <div className="eta">{deployment.eta}</div>
                    </td>
                    <td>
                      <span
                        className="status-pill"
                        style={{
                          color: deployment.color,
                          background:
                            deployment.status === "EN ROUTE"
                              ? "rgba(255,255,255,0.03)"
                              : `${deployment.color}11`,
                        }}
                      >
                        {deployment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel">
            <div className="fuel-body">
              <div className="fuel-title">Daily Fuel Monitoring (Company Fleet)</div>

              <div className="fuel-bars">
                {fuelDays.map((day) => (
                  <div key={day.label} className="fuel-col">
                    <div
                      className="fuel-bar"
                      style={{ height: `${day.height}%` }}
                    />
                    <div className="fuel-label">{day.label}</div>
                  </div>
                ))}
              </div>

              <div className="efficiency">
                <div className="efficiency-head">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 8V12L14.5 14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  FLEET EFFICIENCY STATUS
                </div>
                <div className="efficiency-copy">
                  Total fleet efficiency is currently 12% above benchmark for
                  all 10 active vessels. Operational performance is optimal.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
