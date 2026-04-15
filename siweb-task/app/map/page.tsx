"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import PrimeTopbar from "../ui/PrimeTopbar";

type LeafletMap = {
  zoomIn: () => void;
  zoomOut: () => void;
  invalidateSize: () => void;
  setView: (center: [number, number], zoom: number) => void;
};

type LeafletModule = {
  map: (
    element: HTMLDivElement,
    options: {
      center: [number, number];
      zoom: number;
      zoomControl: boolean;
      attributionControl: boolean;
    },
  ) => LeafletMap;
  tileLayer: (
    url: string,
    options: { maxZoom: number },
  ) => {
    addTo: (map: LeafletMap) => void;
  };
  divIcon: (options: {
    className: string;
    html: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
  }) => unknown;
  marker: (
    coordinates: [number, number],
    options: { icon: unknown },
  ) => {
    addTo: (map: LeafletMap) => void;
  };
};

declare global {
  interface Window {
    L?: LeafletModule;
  }
}

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<LeafletMap | null>(null);
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || leafletRef.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

    script.onload = () => {
      if (!mapRef.current || leafletRef.current || !window.L) return;

      const L = window.L;
      const map = L.map(mapRef.current, {
        center: [8.6, 92.4],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      const makeIcon = (color: string) =>
        L.divIcon({
          className: "",
          html: `<div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center">
            <div style="position:absolute;inset:5px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color};opacity:0.9"></div>
            <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid ${color};opacity:0.4;animation:ripple 2s ease-out infinite"></div>
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

      [
        [6.23, 88.1, "#19d5ff"],
        [0.2, 78.5, "#c97cff"],
        [-6.1, 106.8, "#c97cff"],
      ].forEach(([lat, lng, color]) => {
        L.marker([lat as number, lng as number], {
          icon: makeIcon(color as string),
        }).addTo(map);
      });

      const style = document.createElement("style");
      style.textContent = `
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        .leaflet-control-attribution { display: none !important; }
      `;
      document.head.appendChild(style);

      leafletRef.current = map;
      window.setTimeout(() => map.invalidateSize(), 80);
    };

    document.head.appendChild(script);
  }, []);

  const handleGenerateReport = () => {
    if (reportReady) {
      router.push("/analytics");
      return;
    }

    setReportReady(true);
  };

  const handleResetView = () => {
    leafletRef.current?.setView([8.6, 92.4], 4);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          height:100%;
          background:#090909;
          color:#efebf4;
          font-family:'Rajdhani',sans-serif;
          overflow:hidden;
        }
        .page{
          height:100vh;
          display:flex;
          flex-direction:column;
          background:#090909;
        }
        .map-stage{
          position:relative;
          flex:1;
          overflow:hidden;
        }
        #map-el{
          width:100%;
          height:100%;
          filter:grayscale(0.1) brightness(0.78) saturate(0.82);
        }
        .left-stack{
          position:absolute;
          top:48px;
          left:338px;
          display:flex;
          flex-direction:column;
          gap:12px;
          z-index:500;
        }
        .status-card{
          width:196px;
          padding:14px 14px 12px;
          background:rgba(19,18,21,0.92);
          border:1px solid rgba(255,255,255,0.06);
          box-shadow:0 0 0 1px rgba(255,255,255,0.01) inset;
        }
        .status-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:14px;
        }
        .status-kicker{
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#8d8792;
          margin-bottom:6px;
        }
        .status-title{
          font-family:'Orbitron',sans-serif;
          font-size:18px;
          font-weight:700;
          letter-spacing:-0.04em;
          color:#f3eff7;
        }
        .status-region{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:#7c7680;
        }
        .status-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 0;
          border-top:1px solid rgba(255,255,255,0.05);
        }
        .status-row:first-of-type{
          border-top:none;
          padding-top:0;
        }
        .status-key{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.08em;
          text-transform:uppercase;
          color:#827c86;
        }
        .status-value{
          font-family:'Orbitron',sans-serif;
          font-size:18px;
          font-weight:700;
        }
        .status-value.white{color:#f2eef6}
        .status-value.cyan{color:#18d7ff}
        .status-value.red{color:#ff6d86}
        .report-button{
          width:100%;
          height:34px;
          margin-top:10px;
          border:none;
          background:linear-gradient(90deg,#c77eff 0%,#9a2dff 100%);
          color:#1d0f24;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          cursor:pointer;
        }
        .status-meta{
          margin-top:12px;
          padding-top:8px;
          border-top:1px solid rgba(255,255,255,0.05);
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.08em;
          text-transform:uppercase;
          color:#6c6671;
        }
        .report-hint{
          margin-top:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#22d3ee;
        }
        .telemetry-box{
          width:138px;
          padding:10px 12px 12px;
          background:rgba(19,18,21,0.92);
          border-left:2px solid #1ad6ff;
        }
        .telemetry-title{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#18d7ff;
          margin-bottom:8px;
        }
        .telemetry-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:7px;
          letter-spacing:0.08em;
          text-transform:uppercase;
          color:#877f89;
        }
        .telemetry-row:last-child{
          margin-bottom:0;
        }
        .telemetry-row strong{
          font-size:8px;
        }
        .telemetry-row strong.cyan{color:#18d7ff}
        .telemetry-row strong.green{color:#5bf0b6}
        .zoom-stack{
          position:absolute;
          right:14px;
          bottom:22px;
          display:flex;
          flex-direction:column;
          gap:5px;
          z-index:500;
        }
        .zoom-button{
          width:28px;
          height:28px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:none;
          background:rgba(19,18,21,0.94);
          color:#e9e5ee;
          font-family:'Share Tech Mono',monospace;
          font-size:18px;
          cursor:pointer;
        }
        .bottom-bar{
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          height:22px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 10px;
          background:rgba(18,18,18,0.94);
          border-top:1px solid rgba(255,255,255,0.05);
          z-index:500;
        }
        .bottom-group{
          display:flex;
          align-items:center;
          gap:18px;
          min-width:0;
        }
        .bottom-item{
          font-family:'Share Tech Mono',monospace;
          font-size:6px;
          letter-spacing:0.08em;
          color:#7c7680;
          text-transform:uppercase;
          white-space:nowrap;
        }
        .bottom-item strong{
          color:#13d5ff;
        }
        .bottom-item.green strong{
          color:#66f2b0;
        }
        @media (max-width: 900px){
          .left-stack{
            left:16px;
            top:16px;
          }
        }
      `}</style>

      <div className="page">
        <PrimeTopbar
          brand="PrimeLog Fleet"
          showMore={false}
          statusLabel="REALTIME GPS"
          statusValue="Terakhir Diperbarui 10:45 AM"
        />

        <div className="map-stage">
          <div id="map-el" ref={mapRef} />

          <div className="left-stack">
            <div className="status-card">
              <div className="status-top">
                <div>
                  <div className="status-kicker">LIVE TELEMETRY</div>
                  <div className="status-title">STATUS ARMADA</div>
                </div>
                <div className="status-region">REGION: SE-AS2</div>
              </div>

              <div className="status-row">
                <span className="status-key">ACTIVE VESSELS</span>
                <span className="status-value white">124</span>
              </div>
              <div className="status-row">
                <span className="status-key">EST. ARRIVALS</span>
                <span className="status-value cyan">18</span>
              </div>
              <div className="status-row">
                <span className="status-key">ALERTS PENDING</span>
                <span className="status-value red">03</span>
              </div>

              <button
                className="report-button"
                type="button"
                onClick={handleGenerateReport}
              >
                {reportReady ? "OPEN ANALYTICS REPORT" : "GENERATE REPORT"}
              </button>

              {reportReady ? (
                <div className="report-hint">
                  REPORT READY. CLICK AGAIN TO OPEN ANALYTICS.
                </div>
              ) : null}

              <div className="status-meta">
                LAT: 6.2088 S &nbsp; LON: 106.8456 E &nbsp; ALT: 12680 FT
              </div>
            </div>

            <div className="telemetry-box">
              <div className="telemetry-title">LIVE TELEMETRY</div>
              <div className="telemetry-row">
                <span>F-V2 SIGNAL</span>
                <strong className="cyan">98.4%</strong>
              </div>
              <div className="telemetry-row">
                <span>WEATHER</span>
                <strong className="green">OPTIMAL</strong>
              </div>
            </div>
          </div>

          <div className="zoom-stack">
            <button
              type="button"
              className="zoom-button"
              onClick={() => leafletRef.current?.zoomIn()}
            >
              +
            </button>
            <button
              type="button"
              className="zoom-button"
              onClick={() => leafletRef.current?.zoomOut()}
            >
              -
            </button>
            <button
              type="button"
              className="zoom-button"
              onClick={handleResetView}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
            </button>
          </div>

          <div className="bottom-bar">
            <div className="bottom-group">
              <div className="bottom-item green">
                SYSTEM: <strong>OPERATIONAL</strong>
              </div>
              <div className="bottom-item">
                AUTH TOKEN: <strong>X-771-KPR</strong>
              </div>
            </div>
            <div className="bottom-group">
              <div className="bottom-item">
                GRID: <strong>MERCATOR_WGS84</strong>
              </div>
              <div className="bottom-item">
                LATENCY: <strong>14MS</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
