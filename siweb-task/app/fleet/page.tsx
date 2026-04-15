"use client";

import { useEffect, useState } from "react";

import PrimeTopbar from "../ui/PrimeTopbar";

type StatusKey = "route" | "delay" | "port" | "maintenance";

const fleetRows: Array<{
  id: string;
  name: string;
  destination: string;
  status: string;
  statusKey: StatusKey;
  eta: string;
  icon: string;
}> = [
  {
    id: "PL-4822",
    name: "ATLAS",
    destination: "Singapore\nHub",
    status: "EN ROUTE",
    statusKey: "route",
    eta: "14:20:00",
    icon: "chart",
  },
  {
    id: "PL-9011",
    name: "BOREALIS",
    destination: "Port of\nRotterdam",
    status: "DELAYED",
    statusKey: "delay",
    eta: "UNKNOWN",
    icon: "warning",
  },
  {
    id: "PL-3310",
    name: "CENTAURI",
    destination: "Busan\nTerminal",
    status: "IN PORT",
    statusKey: "port",
    eta: "-",
    icon: "anchor",
  },
  {
    id: "PL-2105",
    name: "DRIFT",
    destination: "Dry Dock C",
    status: "MAINTENANCE",
    statusKey: "maintenance",
    eta: "-",
    icon: "tool",
  },
];

const statusStyle = {
  route: {
    color: "#19d5ff",
    background: "rgba(25,213,255,0.08)",
    border: "rgba(25,213,255,0.36)",
  },
  delay: {
    color: "#ff6d86",
    background: "rgba(255,109,134,0.08)",
    border: "rgba(255,109,134,0.32)",
  },
  port: {
    color: "#b8b4bc",
    background: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.10)",
  },
  maintenance: {
    color: "#ff8b94",
    background: "rgba(255,139,148,0.08)",
    border: "rgba(255,139,148,0.26)",
  },
} as const;

const alerts = [
  {
    title: "WEATHER WARNING",
    time: "12m ago",
    body: "Tropical depression identified in Sector 7-B. Rerouting recommended for PL-4822.",
    color: "#ff6b86",
    background: "rgba(74,15,31,0.74)",
  },
  {
    title: "ENGINE ISSUE",
    time: "45m ago",
    body: "Fuel pressure drop detected in Port Engine #2 on PL-9011. Efficiency down 15%.",
    color: "#ff868f",
    background: "transparent",
  },
];

const fuelBars = [
  { label: "MERCURIUS", height: 20, color: "#ff8894" },
  { label: "ORION", height: 34, color: "#c27ef7" },
  { label: "SATURNUS", height: 28, color: "#ff8894" },
  { label: "MARS", height: 44, color: "#1cc9ef" },
  { label: "JUPITER", height: 52, color: "#1cc9ef" },
  { label: "BUMI", height: 36, color: "#c27ef7" },
  { label: "BULAN", height: 24, color: "#ff8894" },
];

function RowIcon({ type }: { type: string }) {
  if (type === "chart") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          stroke="#cdc9d2"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4L21 20H3L12 4Z"
          stroke="#cdc9d2"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M12 9V13"
          stroke="#cdc9d2"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="#cdc9d2" />
      </svg>
    );
  }

  if (type === "anchor") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2.4" stroke="#cdc9d2" strokeWidth="1.7" />
        <path
          d="M12 7.4V21"
          stroke="#cdc9d2"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M5 12H2A10 10 0 0 0 22 12H19"
          stroke="#cdc9d2"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 6.2A1 1 0 0 0 14.5 7.6L16.4 9.5A1 1 0 0 0 17.8 9.5L21 6.3A5.5 5.5 0 0 1 13.8 13.5L7 20.3A2 2 0 1 1 4.2 17.5L11 10.7A5.5 5.5 0 0 1 18.2 3.5L14.5 7.2"
        stroke="#cdc9d2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FleetPage() {
  const [clock, setClock] = useState("10:45 AM");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setClock(`${hours}:${minutes} ${suffix}`);
    };

    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          min-height:100%;
          background:#0a0a0b;
          color:#f1eef5;
          font-family:'Rajdhani',sans-serif;
        }
        .page{
          min-height:calc(100vh - 44px);
          padding:0 10px 18px;
          background:
            radial-gradient(circle at top center, rgba(109,25,142,0.08), transparent 28%),
            linear-gradient(180deg, #0a0a0b 0%, #090909 100%);
        }
        .head{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          padding:16px 18px 10px;
        }
        .head h1{
          font-family:'Orbitron',sans-serif;
          font-size:22px;
          font-weight:700;
          letter-spacing:-0.03em;
          color:#f4f1f6;
          margin-bottom:6px;
        }
        .head p{
          font-size:13px;
          color:#918a96;
        }
        .head-status{
          text-align:right;
        }
        .head-status-top{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#9c95a1;
          margin-bottom:5px;
        }
        .head-status-top span{
          color:#c880ff;
        }
        .head-status-bottom{
          font-size:13px;
          color:#b3aebb;
        }
        .layout{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 284px;
          gap:14px;
          padding:0 10px;
        }
        .main{
          display:flex;
          flex-direction:column;
          gap:14px;
        }
        .panel{
          background:#171617;
          border:1px solid rgba(255,255,255,0.05);
          border-radius:3px;
          overflow:hidden;
        }
        .table-head{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 14px 11px;
        }
        .table-title{
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#f2eef6;
        }
        .badge-row{
          display:flex;
          align-items:center;
          gap:8px;
        }
        .mini-badge{
          height:16px;
          padding:0 8px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:999px;
          border:1px solid rgba(255,255,255,0.08);
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          text-transform:uppercase;
        }
        table{
          width:100%;
          border-collapse:collapse;
          table-layout:fixed;
        }
        th{
          padding:12px 14px;
          background:#232122;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          font-weight:400;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#76707a;
          text-align:left;
        }
        td{
          padding:14px;
          border-bottom:1px solid rgba(255,255,255,0.04);
          vertical-align:middle;
        }
        tbody tr:last-child td{
          border-bottom:none;
        }
        .id{
          font-family:'Share Tech Mono',monospace;
          font-size:11px;
          line-height:1.25;
          color:#c37aff;
        }
        .subid{
          font-size:7px;
          letter-spacing:0.12em;
          color:#69636d;
          text-transform:uppercase;
        }
        .dest{
          font-size:13px;
          line-height:1.2;
          color:#b0abb3;
          white-space:pre-line;
        }
        .status-pill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          height:18px;
          padding:0 10px;
          border-radius:999px;
          border:1px solid currentColor;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          text-transform:uppercase;
        }
        .eta{
          font-family:'Share Tech Mono',monospace;
          font-size:11px;
          color:#f0edf4;
        }
        .metric-panel{
          padding:14px 16px 18px;
        }
        .metric-title{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#6f6874;
          margin-bottom:16px;
        }
        .metric-row{
          margin-bottom:18px;
        }
        .metric-row:last-child{
          margin-bottom:0;
        }
        .metric-label{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:#c6c1cb;
        }
        .metric-value.route{color:#c77eff}
        .metric-value.cargo{color:#18d7ff}
        .track{
          width:100%;
          height:4px;
          background:rgba(255,255,255,0.08);
          border-radius:999px;
          overflow:hidden;
        }
        .fill{
          height:100%;
          border-radius:999px;
        }
        .distribution{
          padding:14px 10px 16px;
        }
        .distribution-title{
          margin:0 6px 16px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#76707a;
        }
        .distribution-bars{
          display:flex;
          align-items:flex-end;
          gap:6px;
          height:132px;
        }
        .distribution-bar{
          flex:1;
          border-radius:1px 1px 0 0;
        }
        .side{
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .alert-head{
          display:flex;
          align-items:center;
          gap:8px;
          padding:12px 14px;
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:#f2eef6;
        }
        .alert-item{
          margin:0 12px 10px;
          padding:12px 12px 12px 14px;
          border-left:1px solid #ff6c86;
        }
        .alert-item:first-of-type{
          background:rgba(74,15,31,0.74);
        }
        .alert-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        }
        .alert-row strong{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
        }
        .alert-row span{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          color:#76707a;
        }
        .alert-body{
          font-size:12px;
          line-height:1.45;
          color:#b0abb3;
        }
        .fuel-panel{
          display:flex;
          flex-direction:column;
          min-height:390px;
        }
        .fuel-title{
          padding:14px 14px 12px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#18d7ff;
        }
        .fuel-bars{
          flex:1;
          display:flex;
          align-items:flex-end;
          gap:8px;
          padding:0 10px 18px;
          min-height:240px;
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
          min-height:18px;
        }
        .fuel-label{
          margin-top:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          color:#67616c;
          text-transform:uppercase;
        }
        .fuel-footer{
          padding:12px 14px;
          border-top:1px solid rgba(255,255,255,0.05);
        }
        .fuel-meta{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-size:12px;
          color:#827b87;
        }
        .fuel-meta:last-child{
          margin-bottom:0;
        }
        .fuel-meta strong{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          color:#f2eef6;
        }
        .fuel-meta strong.accent{
          color:#18d7ff;
        }
        @media (max-width: 1024px){
          .layout{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <PrimeTopbar
        brand="PRIMELOG FLEET"
        showSearch
        showMore={false}
        searchPlaceholder="COMMAND SEARCH..."
      />

      <main className="page">
        <header className="head">
          <div>
            <h1>FLEET OVERVIEW</h1>
            <p>Logistik global dan pelacakan kapal</p>
          </div>
          <div className="head-status">
            <div className="head-status-top">
              SYSTEM STATUS: <span>NOMINAL</span>
            </div>
            <div className="head-status-bottom">Last Updated: {clock}</div>
          </div>
        </header>

        <div className="layout">
          <div className="main">
            <section className="panel">
              <div className="table-head">
                <div className="table-title">ARMADA AKTIF</div>
                <div className="badge-row">
                  <span
                    className="mini-badge"
                    style={{
                      color: "#d290ff",
                      borderColor: "rgba(210,144,255,0.20)",
                    }}
                  >
                    LIVE_STREAM
                  </span>
                  <span className="mini-badge">42 TOTAL VESSELS</span>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style={{ width: "26%" }}>ID KAPAL</th>
                    <th style={{ width: "20%" }}>TUJUAN</th>
                    <th style={{ width: "18%" }}>STATUS</th>
                    <th style={{ width: "16%" }}>ETA</th>
                    <th style={{ width: "20%" }}>MONITORING</th>
                  </tr>
                </thead>
                <tbody>
                  {fleetRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="id">{row.id}</div>
                        <div className="subid">{row.name}</div>
                      </td>
                      <td>
                        <div className="dest">{row.destination}</div>
                      </td>
                      <td>
                        <span
                          className="status-pill"
                          style={{
                            color: statusStyle[row.statusKey].color,
                            background: statusStyle[row.statusKey].background,
                            borderColor: statusStyle[row.statusKey].border,
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div
                          className="eta"
                          style={{
                            color:
                              row.statusKey === "delay"
                                ? "#ff6d86"
                                : row.eta === "-"
                                  ? "#7e7882"
                                  : "#f2eef6",
                          }}
                        >
                          {row.eta}
                        </div>
                      </td>
                      <td>
                        <RowIcon type={row.icon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="panel metric-panel">
              <div className="metric-title">LOGISTICS EFFICIENCY</div>

              <div className="metric-row">
                <div className="metric-label">
                  <span>CARGO UTILIZATION</span>
                  <span className="metric-value cargo">92.4%</span>
                </div>
                <div className="track">
                  <div
                    className="fill"
                    style={{ width: "92.4%", background: "#18d7ff" }}
                  />
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <span>ROUTE OPTIMIZATION</span>
                  <span className="metric-value route">87.1%</span>
                </div>
                <div className="track">
                  <div
                    className="fill"
                    style={{ width: "87.1%", background: "#c77eff" }}
                  />
                </div>
              </div>
            </section>

            <section className="panel distribution">
              <div className="distribution-title">REGIONAL DISTRIBUTION</div>
              <div className="distribution-bars">
                <div
                  className="distribution-bar"
                  style={{ height: "66px", background: "#1cc9ef", flex: 1.6 }}
                />
                <div
                  className="distribution-bar"
                  style={{ height: "36px", background: "#c27ef7", flex: 1 }}
                />
                <div
                  className="distribution-bar"
                  style={{ height: "50px", background: "#1cc9ef", flex: 1.45 }}
                />
                <div
                  className="distribution-bar"
                  style={{ height: "26px", background: "#c27ef7", flex: 0.95 }}
                />
              </div>
            </section>
          </div>

          <aside className="side">
            <section className="panel">
              <div className="alert-head">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#ff6c86",
                    display: "inline-block",
                  }}
                />
                CRITICAL ALERTS
              </div>

              {alerts.map((alert) => (
                <div key={alert.title} className="alert-item" style={{ background: alert.background }}>
                  <div className="alert-row">
                    <strong style={{ color: alert.color }}>{alert.title}</strong>
                    <span>{alert.time}</span>
                  </div>
                  <div className="alert-body">{alert.body}</div>
                </div>
              ))}
            </section>

            <section className="panel fuel-panel">
              <div className="fuel-title">FUEL CONSUMPTION (BAHAN BAKAR)</div>
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
              <div className="fuel-footer">
                <div className="fuel-meta">
                  <span>Aggregate Fuel Level</span>
                  <strong>12.4K Liters</strong>
                </div>
                <div className="fuel-meta">
                  <span>Consumption Variance</span>
                  <strong className="accent">+2.4%</strong>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
