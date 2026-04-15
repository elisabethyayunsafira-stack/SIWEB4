"use client";

import { useEffect, useState } from "react";

import PrimeTopbar from "../ui/PrimeTopbar";

const vessels = [
  {
    id: "PL-992-BUMI",
    destination: "Port of Rotterdam\n(NLD)",
    status: "EN ROUTE",
    statusColor: "#18d7ff",
    eta: "24 OCT 14:00",
    etaColor: "#f1eef4",
    icon: "chart",
  },
  {
    id: "PL-441-BULAN",
    destination: "Singapore Harbor\n(SGP)",
    status: "IN PORT",
    statusColor: "#b9b6bf",
    eta: "DOCKED",
    etaColor: "#f1eef4",
    icon: "anchor",
  },
  {
    id: "PL-770-ORION",
    destination: "Suez Canal (EGY)",
    status: "DELAYED",
    statusColor: "#ff6d86",
    eta: "RECALCULATING",
    etaColor: "#ff6d86",
    icon: "warning",
  },
  {
    id: "PL-102-MARS",
    destination: "Dry Dock 4 (HKG)",
    status: "MAINTENANCE",
    statusColor: "#ff8f95",
    eta: "30 OCT 08:00",
    etaColor: "#f1eef4",
    icon: "tool",
  },
];

const alerts = [
  {
    title: "WEATHER WARNING",
    time: "18:45 UTC",
    body: "Tropical Cyclone Alert: Region IV-B. Reroute mandatory for vessels in sector 7.",
    color: "#ff7288",
    background: "rgba(255,96,128,0.08)",
  },
  {
    title: "ENGINE ISSUE",
    time: "09:12 UTC",
    body: "Vessel PL-992-ALPHA: P04 - Engine Temp High. Cooling system bypass initiated.",
    color: "#ff8d9d",
    background: "rgba(255,255,255,0.02)",
  },
];

const fuelBars = [
  { label: "MERCURIUS", height: 24, color: "#ff8a93" },
  { label: "ORION", height: 42, color: "#c27ef7" },
  { label: "SATURNUS", height: 34, color: "#ff8a93" },
  { label: "MARS", height: 56, color: "#19c9ef" },
  { label: "JUPITER", height: 64, color: "#19c9ef" },
  { label: "BUMI", height: 46, color: "#c27ef7" },
  { label: "BULAN", height: 28, color: "#ff8a93" },
];

function MonitoringIcon({ type }: { type: string }) {
  if (type === "chart") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          stroke="#c2bec8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "anchor") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2.6" stroke="#c2bec8" strokeWidth="1.7" />
        <path
          d="M12 7.6V21"
          stroke="#c2bec8"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M5 12H2A10 10 0 0 0 22 12H19"
          stroke="#c2bec8"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4L21 20H3L12 4Z"
          stroke="#d6d2db"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M12 9V13"
          stroke="#d6d2db"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="#d6d2db" />
      </svg>
    );
  }

  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 6.2A1 1 0 0 0 14.5 7.6L16.4 9.5A1 1 0 0 0 17.8 9.5L21 6.3A5.5 5.5 0 0 1 13.8 13.5L7 20.3A2 2 0 1 1 4.2 17.5L11 10.7A5.5 5.5 0 0 1 18.2 3.5L14.5 7.2"
        stroke="#d6d2db"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const [utc, setUtc] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtc(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
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
          color:#ede8f2;
          font-family:'Rajdhani',sans-serif;
        }
        .page{
          min-height:calc(100vh - 44px);
          padding:14px 14px 18px;
          background:
            radial-gradient(circle at top center, rgba(108,23,140,0.08), transparent 30%),
            linear-gradient(180deg, #0a0a0b 0%, #090909 100%);
        }
        .layout{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 266px;
          gap:16px;
        }
        .left{
          display:flex;
          flex-direction:column;
          gap:16px;
          min-width:0;
        }
        .bottom-grid{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 144px;
          gap:16px;
        }
        .panel{
          background:#151516;
          border:1px solid rgba(255,255,255,0.08);
          border-radius:4px;
          overflow:hidden;
          box-shadow:0 0 0 1px rgba(255,255,255,0.01) inset;
        }
        .table-panel{
          min-height:308px;
        }
        .panel-head{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 14px 11px;
          border-bottom:1px solid rgba(255,255,255,0.04);
        }
        .panel-title{
          display:flex;
          align-items:center;
          gap:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:10px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#f4eff8;
        }
        .panel-title::before{
          content:"";
          width:3px;
          height:12px;
          background:#cf84ff;
        }
        .head-meta{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:#726d75;
        }
        table{
          width:100%;
          border-collapse:collapse;
          table-layout:fixed;
        }
        th{
          padding:12px 16px;
          background:#232021;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          font-weight:400;
          letter-spacing:0.20em;
          text-transform:uppercase;
          color:#76717a;
          text-align:left;
        }
        td{
          padding:14px 16px;
          border-bottom:1px solid rgba(255,255,255,0.04);
          vertical-align:middle;
        }
        tbody tr:last-child td{
          border-bottom:none;
        }
        .ship-id{
          font-family:'Share Tech Mono',monospace;
          font-size:11px;
          letter-spacing:0.02em;
          color:#14d7ff;
        }
        .destination{
          font-size:13px;
          line-height:1.15;
          color:#aca8b0;
          white-space:pre-line;
        }
        .status{
          display:inline-flex;
          align-items:center;
          gap:7px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          white-space:nowrap;
        }
        .status-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          box-shadow:0 0 10px currentColor;
        }
        .eta{
          font-family:'Share Tech Mono',monospace;
          font-size:11px;
          letter-spacing:0.05em;
        }
        .map-shell{
          position:relative;
          min-height:290px;
          background:
            radial-gradient(circle at 36% 64%, rgba(255,255,255,0.08), transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)),
            #181818;
          overflow:hidden;
        }
        .map-shell::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size:62px 62px;
          opacity:0.28;
        }
        .land{
          position:absolute;
          background:rgba(255,255,255,0.10);
          filter:grayscale(1);
          opacity:0.36;
        }
        .land.one{
          left:-2%;
          top:12%;
          width:62%;
          height:86%;
          clip-path:polygon(0 8%, 18% 2%, 34% 12%, 41% 28%, 54% 29%, 60% 42%, 71% 41%, 88% 52%, 100% 80%, 86% 100%, 20% 100%, 0 92%);
        }
        .land.two{
          left:30%;
          top:8%;
          width:38%;
          height:54%;
          clip-path:polygon(0 18%, 18% 0, 48% 0, 74% 18%, 100% 45%, 78% 80%, 38% 100%, 8% 76%);
        }
        .map-label{
          position:absolute;
          font-family:'Rajdhani',sans-serif;
          font-size:12px;
          color:rgba(0,0,0,0.52);
          font-weight:600;
        }
        .map-label.small{
          font-size:10px;
          color:rgba(0,0,0,0.42);
        }
        .map-card{
          position:absolute;
          top:18px;
          left:16px;
          z-index:2;
          min-width:192px;
          padding:14px 16px 15px;
          border:1px solid rgba(201,124,255,0.40);
          background:rgba(29,28,31,0.86);
          box-shadow:0 0 0 1px rgba(201,124,255,0.05) inset;
        }
        .map-card-label{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#be84ff;
          margin-bottom:10px;
        }
        .map-card-title{
          font-size:20px;
          font-weight:700;
          color:#f4f1f6;
          margin-bottom:6px;
        }
        .map-card-copy{
          font-size:12px;
          color:#13d5ff;
        }
        .map-controls{
          position:absolute;
          top:20px;
          right:14px;
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .control{
          width:38px;
          height:38px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(10,10,10,0.92);
          border:1px solid rgba(255,255,255,0.04);
          border-radius:3px;
          color:#bcb7c1;
          font-family:'Share Tech Mono',monospace;
          font-size:18px;
        }
        .pin{
          position:absolute;
          width:18px;
          height:18px;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#f1edf5;
          transform:translate(-50%, -50%);
        }
        .telemetry-card{
          padding:12px 14px;
          background:#171617;
          border:1px solid rgba(255,255,255,0.06);
          min-height:64px;
        }
        .telemetry-title{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#19d5ff;
          margin-bottom:10px;
        }
        .telemetry-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.08em;
          color:#7c7681;
        }
        .telemetry-row:last-child{
          margin-bottom:0;
        }
        .telemetry-value{
          color:#f0eef3;
        }
        .telemetry-value.warning{
          color:#ff6e86;
        }
        .side{
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .alert-panel .panel-head{
          border-bottom:none;
          padding-bottom:8px;
        }
        .alert-title{
          display:flex;
          align-items:center;
          gap:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:#f0edf4;
        }
        .alert-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          background:#ff6e86;
        }
        .alert-card{
          margin:0 10px 10px;
          padding:12px 12px 12px 14px;
          border-left:1px solid currentColor;
        }
        .alert-card-head{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        }
        .alert-card-title{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
        }
        .alert-time{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.10em;
          color:#7a747d;
        }
        .alert-body{
          font-size:12px;
          line-height:1.35;
          color:#b1adb4;
        }
        .fuel-panel{
          display:flex;
          flex-direction:column;
          min-height:426px;
        }
        .fuel-title{
          padding:14px 14px 10px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.18em;
          color:#14d7ff;
          text-transform:uppercase;
        }
        .fuel-bars{
          flex:1;
          display:flex;
          align-items:flex-end;
          gap:7px;
          padding:0 12px 18px;
          min-height:292px;
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
          margin-top:10px;
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          color:#69636d;
          text-transform:uppercase;
          text-align:center;
        }
        .fuel-footer{
          border-top:1px solid rgba(255,255,255,0.05);
          padding:12px 14px 14px;
        }
        .fuel-meta{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-family:'Rajdhani',sans-serif;
          font-size:12px;
          color:#7d7781;
        }
        .fuel-meta:last-child{
          margin-bottom:0;
        }
        .fuel-value{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          color:#f0edf4;
        }
        .fuel-value.accent{
          color:#17d7ff;
        }
        @media (max-width: 1024px){
          .layout,
          .bottom-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <PrimeTopbar />

      <main className="page">
        <div className="layout">
          <div className="left">
            <section className="panel table-panel">
              <div className="panel-head">
                <div className="panel-title">FLEET OVERVIEW</div>
                <div className="head-meta">LAST UPDATED: {utc}</div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style={{ width: "23%" }}>ID KAPAL</th>
                    <th style={{ width: "30%" }}>TUJUAN</th>
                    <th style={{ width: "17%" }}>STATUS</th>
                    <th style={{ width: "17%" }}>ETA</th>
                    <th style={{ width: "13%" }}>MONITORING</th>
                  </tr>
                </thead>
                <tbody>
                  {vessels.map((vessel) => (
                    <tr key={vessel.id}>
                      <td>
                        <div className="ship-id">{vessel.id}</div>
                      </td>
                      <td>
                        <div className="destination">{vessel.destination}</div>
                      </td>
                      <td>
                        <div
                          className="status"
                          style={{ color: vessel.statusColor }}
                        >
                          <span
                            className="status-dot"
                            style={{
                              background: vessel.statusColor,
                              color: vessel.statusColor,
                            }}
                          />
                          {vessel.status}
                        </div>
                      </td>
                      <td>
                        <div
                          className="eta"
                          style={{ color: vessel.etaColor }}
                        >
                          {vessel.eta}
                        </div>
                      </td>
                      <td>
                        <MonitoringIcon type={vessel.icon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="bottom-grid">
              <section className="panel map-shell">
                <div className="land one" />
                <div className="land two" />
                <div className="map-label" style={{ left: "38%", top: "40%" }}>
                  North Sea
                </div>
                <div
                  className="map-label"
                  style={{ left: "47%", top: "58%", fontSize: 30, opacity: 0.36 }}
                >
                  Children&apos;s
                </div>
                <div className="map-label small" style={{ left: "58%", top: "66%" }}>
                  Water Mill
                </div>
                <div className="map-label small" style={{ left: "43%", top: "80%" }}>
                  Parrish Art Museum
                </div>
                <div className="map-label small" style={{ left: "36%", top: "88%" }}>
                  Tuckahoe
                </div>

                <div className="map-card">
                  <div className="map-card-label">LIVE PROJECTION</div>
                  <div className="map-card-title">Kapal Aktif: 42</div>
                  <div className="map-card-copy">Total Jarak Tempuh: 1.2M NM</div>
                </div>

                <div className="map-controls">
                  <div className="control">+</div>
                  <div className="control">-</div>
                  <div className="control">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    </svg>
                  </div>
                </div>

                <div className="pin" style={{ left: "24%", top: "62%" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 17L5 12H19L21 17"
                      stroke="#ffffff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 12V8H19V12"
                      stroke="#ffffff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="pin" style={{ left: "49%", top: "47%" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#ffffff",
                      opacity: 0.72,
                    }}
                  />
                </div>
              </section>

              <section className="telemetry-card">
                <div className="telemetry-title">LIVE TELEMETRY</div>
                <div className="telemetry-row">
                  <span>F-V2 SIGNAL</span>
                  <span className="telemetry-value">98.4%</span>
                </div>
                <div className="telemetry-row">
                  <span>WEATHER</span>
                  <span className="telemetry-value warning">WARNING</span>
                </div>
              </section>
            </div>
          </div>

          <aside className="side">
            <section className="panel alert-panel">
              <div className="panel-head">
                <div className="alert-title">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4L21 20H3L12 4Z"
                      stroke="#ff6e86"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9V13"
                      stroke="#ff6e86"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="16.5" r="1" fill="#ff6e86" />
                  </svg>
                  CRITICAL ALERTS
                </div>
                <div className="alert-dot" />
              </div>

              {alerts.map((alert) => (
                <div
                  key={alert.title}
                  className="alert-card"
                  style={{
                    color: alert.color,
                    background: alert.background,
                  }}
                >
                  <div className="alert-card-head">
                    <div className="alert-card-title">{alert.title}</div>
                    <div className="alert-time">{alert.time}</div>
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
                        boxShadow: `0 0 18px ${bar.color}33`,
                      }}
                    />
                    <div className="fuel-label">{bar.label}</div>
                  </div>
                ))}
              </div>
              <div className="fuel-footer">
                <div className="fuel-meta">
                  <span>Aggregate Fuel Level</span>
                  <span className="fuel-value">12.4K Liters</span>
                </div>
                <div className="fuel-meta">
                  <span>Consumption Variance</span>
                  <span className="fuel-value accent">+2.4%</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
