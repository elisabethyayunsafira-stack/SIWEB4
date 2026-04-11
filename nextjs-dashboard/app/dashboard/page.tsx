"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const vessels = [
  { id: "PL-992-BUMI", destination: "Port of Rotterdam (NLD)", statusLabel: "EN ROUTE", statusColor: "#22d3ee", eta: "24 OCT 14:00", etaColor: "#e5e7eb", monitoring: "chart" },
  { id: "PL-441-BULAN", destination: "Singapore Harbor (SGP)", statusLabel: "IN PORT", statusColor: "#6b7280", eta: "DOCKED", etaColor: "#e5e7eb", monitoring: "anchor" },
  { id: "PL-770-ORION", destination: "Suez Canal (EGY)", statusLabel: "DELAYED", statusColor: "#f87171", eta: "RECALCULATING", etaColor: "#f87171", monitoring: "warning" },
  { id: "PL-102-MARS", destination: "Dry Dock 4 (HKG)", statusLabel: "MAINTENANCE", statusColor: "#a855f7", eta: "30 OCT 08:00", etaColor: "#e5e7eb", monitoring: "wrench" },
];

const alertsData = [
  { type: "WEATHER WARNING", typeColor: "#f87171", time: "10:45 UTC", body: "Tropical Cyclone Alert: Region IV-B. Reroute mandatory for vessels in sector 7." },
  { type: "ENGINE ISSUE", typeColor: "#f59e0b", time: "09:12 UTC", body: "Vessel PL-992-ALPHA: P04- Engine Temp High. Cooling system bypass initiated." },
];

const fuelBars = [
  { color: "#f472b6", h: 52, label: "MERCURIUS" },
  { color: "#a78bfa", h: 70, label: "ORION" },
  { color: "#f472b6", h: 45, label: "SATURNUS" },
  { color: "#22d3ee", h: 88, label: "MARS" },
  { color: "#22d3ee", h: 95, label: "JUPITER" },
  { color: "#a78bfa", h: 65, label: "BUMI" },
  { color: "#f472b6", h: 60, label: "BULAN" },
];

const moreMenuItems = ["LIVE TRACKING MODE", "LOGISTICS OPTIMIZATION", "VESSEL DEPLOYMENT"];

function MonitorIcon({ type }: { type: string }) {
  if (type === "chart") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
  if (type === "anchor") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><circle cx="12" cy="5" r="3" /><line x1="12" y1="8" x2="12" y2="22" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></svg>;
  if (type === "warning") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
  if (type === "wrench") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
  return null;
}

// Ship positions on the fake map (% based)
const SHIP_POSITIONS = [
  { top: "62%", left: "13%", color: "#22d3ee", type: "ship" },
  { top: "35%", left: "45%", color: "#22d3ee", type: "dot" },
  { top: "28%", left: "68%", color: "#f87171", type: "dot" },
  { top: "65%", left: "60%", color: "#8b5cf6", type: "dot" },
];

export default function DashboardPage() {
  const [utcTime, setUtcTime] = useState("");
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("DASHBOARD");
  const [showMore, setShowMore] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [compassHeading, setCompassHeading] = useState(0);
  const [unreadCount, setUnreadCount] = useState(alertsData.length);
  const moreRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // UTC clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setUtcTime(`${String(now.getUTCHours()).padStart(2,"0")}:${String(now.getUTCMinutes()).padStart(2,"0")}:${String(now.getUTCSeconds()).padStart(2,"0")} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifPanel(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Compass auto-rotate animation
  useEffect(() => {
    const id = setInterval(() => {
      setCompassHeading(h => (h + 0.5) % 360);
    }, 50);
    return () => clearInterval(id);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleZoomIn = () => {
    setMapZoom(z => Math.min(z + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setMapZoom(z => {
      const next = Math.max(z - 0.25, 0.5);
      if (next === 1) setMapOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleCompassReset = () => {
    setMapZoom(1);
    setMapOffset({ x: 0, y: 0 });
  };

  const handleNotifOpen = () => {
    setShowNotifPanel(v => !v);
    setUnreadCount(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0a0a10; color: #e5e7eb; font-family: 'Rajdhani', sans-serif; min-height: 100vh; }

        .topbar {
          display: flex; align-items: center; justify-content: space-between;
          height: 46px; padding: 0 20px;
          background: #0d0d14; border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 0; z-index: 200;
        }
        .topbar-left { display: flex; align-items: center; gap: 8px; }
        .brand { font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; color: #a855f7; letter-spacing: 0.15em; white-space: nowrap; margin-right: 20px; }
        nav { display: flex; position: relative; }
        .nav-item {
          font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; color: #6b7280; padding: 0 14px; cursor: pointer;
          position: relative; text-transform: uppercase; transition: color 0.2s;
          border: none; background: none; height: 46px; display: flex; align-items: center; gap: 4px;
        }
        .nav-item:hover { color: #d1d5db; }
        .nav-item.active { color: #fff; }
        .nav-item.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #a855f7; }

        .more-wrap { position: relative; }
        .more-dropdown {
          position: absolute; top: calc(100% + 2px); left: 0;
          background: #0f0f1a; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; overflow: hidden; min-width: 200px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5); z-index: 300;
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
        .more-item {
          display: block; width: 100%; padding: 11px 16px; text-align: left;
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          color: #9ca3af; letter-spacing: 0.14em; text-transform: uppercase;
          background: none; border: none; cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s, color 0.15s;
        }
        .more-item:last-child { border-bottom: none; }
        .more-item:hover { background: rgba(168,85,247,0.08); color: #e5e7eb; }

        .topbar-right { display: flex; align-items: center; gap: 8px; position: relative; }

        .icon-btn {
          width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px; background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #6b7280; transition: border-color 0.2s, color 0.2s, background 0.2s;
          position: relative; flex-shrink: 0;
        }
        .icon-btn:hover { border-color: rgba(168,85,247,0.4); color: #d1d5db; }
        .icon-btn.active { border-color: rgba(168,85,247,0.6); color: #a855f7; background: rgba(168,85,247,0.08); }

        .notif-badge {
          position: absolute; top: -4px; right: -4px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #f87171; border: 2px solid #0d0d14;
          font-family: 'Share Tech Mono', monospace; font-size: 7px;
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 700; pointer-events: none;
        }

        /* Notification panel dropdown */
        .notif-panel {
          position: absolute; top: calc(100% + 8px); right: 0;
          width: 300px;
          background: #0f0f1a; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px; overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.6); z-index: 400;
          animation: fadeIn 0.15s ease;
        }
        .notif-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .notif-header-title {
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          color: #e5e7eb; letter-spacing: 0.2em; text-transform: uppercase;
        }
        .notif-header-clear {
          font-family: 'Share Tech Mono', monospace; font-size: 8px;
          color: #7c3aed; letter-spacing: 0.12em; cursor: pointer;
          background: none; border: none; transition: color 0.2s;
        }
        .notif-header-clear:hover { color: #c084fc; }
        .notif-item { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .notif-item:last-child { border-bottom: none; }
        .notif-item-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .notif-item-type { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 0.14em; }
        .notif-item-time { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #4b5563; }
        .notif-item-body { font-family: 'Rajdhani', sans-serif; font-size: 12px; color: #9ca3af; line-height: 1.4; }
        .notif-empty { padding: 20px 14px; text-align: center; font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #4b5563; letter-spacing: 0.14em; }

        .avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #22d3ee);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #fff;
          cursor: pointer; border: 1px solid rgba(168,85,247,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .avatar:hover { transform: scale(1.05); box-shadow: 0 0 12px rgba(168,85,247,0.4); }

        /* Grid overlay */
        .grid-overlay {
          position: fixed; inset: 0; z-index: 100; pointer-events: none;
          background-image:
            linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridFade 0.3s ease;
        }
        @keyframes gridFade { from { opacity:0; } to { opacity:1; } }

        .layout {
          display: grid; grid-template-columns: 1fr 280px;
          gap: 10px; padding: 10px; background: #0a0a10;
          min-height: calc(100vh - 46px);
        }
        .left-col { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .panel { background: #0f0f1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 4px; overflow: hidden; }
        .panel-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px 10px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .panel-title { display: flex; align-items: center; gap: 9px; font-family: 'Share Tech Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #e5e7eb; text-transform: uppercase; }
        .title-bar { width: 3px; height: 14px; background: #a855f7; border-radius: 2px; flex-shrink: 0; }
        .panel-ts { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #4b5563; letter-spacing: 0.12em; }

        .fleet-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .fleet-table th {
          font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #4b5563;
          letter-spacing: 0.2em; text-align: left; padding: 12px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 400;
          text-transform: uppercase; background: rgba(255,255,255,0.012); white-space: nowrap;
        }
        .fleet-table th:nth-child(1) { width: 22%; }
        .fleet-table th:nth-child(2) { width: 28%; }
        .fleet-table th:nth-child(3) { width: 18%; }
        .fleet-table th:nth-child(4) { width: 20%; }
        .fleet-table th:nth-child(5) { width: 12%; }
        .fleet-table td { padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
        .fleet-table tbody tr { transition: background 0.15s; cursor: pointer; }
        .fleet-table tbody tr:hover { background: rgba(168,85,247,0.04); }
        .fleet-table tbody tr:last-child td { border-bottom: none; }
        .vessel-id { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #22d3ee; letter-spacing: 0.05em; }
        .dest-text { font-family: 'Rajdhani', sans-serif; font-size: 13px; color: #d1d5db; font-weight: 500; }
        .status-cell { display: flex; align-items: center; gap: 7px; font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 0.14em; white-space: nowrap; }
        .sdot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; animation: blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .eta-text { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: 0.05em; }
        .tele-btn { color: #374151; display: flex; align-items: center; cursor: pointer; transition: color 0.2s; }
        .tele-btn:hover { color: #22d3ee; }

        /* MAP */
        .map-panel { flex: 1; min-height: 260px; }
        .map-outer { display: flex; height: 100%; min-height: 260px; }
        .map-wrap { position: relative; flex: 1; background: #141420; overflow: hidden; }
        .map-inner {
          position: absolute; inset: 0;
          transform-origin: center center;
          transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .map-base { position: absolute; inset: 0; background: #1a1a2a; }
        .map-roads {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
        }
        .land { position: absolute; border-radius: 3px; }
        .map-card {
          position: absolute; top: 14px; left: 14px;
          background: rgba(8,5,22,0.92); border: 1px solid rgba(168,85,247,0.45);
          border-radius: 5px; padding: 10px 16px 13px;
          backdrop-filter: blur(10px); min-width: 200px; z-index: 5;
        }
        .map-card-label { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: #a855f7; letter-spacing: 0.28em; margin-bottom: 5px; }
        .map-card-count { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 2px; }
        .map-card-sub { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #22d3ee; letter-spacing: 0.06em; }

        /* Zoom level indicator */
        .zoom-indicator {
          position: absolute; bottom: 14px; left: 14px; z-index: 5;
          background: rgba(10,10,20,0.88); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 3px; padding: 4px 10px;
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          color: #22d3ee; letter-spacing: 0.12em;
          transition: opacity 0.3s;
        }

        .map-controls {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 4px; z-index: 5;
        }
        .map-ctrl {
          width: 28px; height: 28px; background: rgba(10,10,20,0.88);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #6b7280; font-family: 'Share Tech Mono', monospace;
          font-size: 16px; transition: border-color 0.2s, color 0.2s, transform 0.1s; user-select: none;
        }
        .map-ctrl:hover { border-color: rgba(34,211,238,0.4); color: #22d3ee; }
        .map-ctrl:active { transform: scale(0.92); }
        .map-ctrl.disabled { opacity: 0.3; cursor: not-allowed; }
        .map-ctrl.disabled:active { transform: none; }

        .map-text { position: absolute; font-family: 'Share Tech Mono', monospace; font-size: 8px; color: rgba(255,255,255,0.35); pointer-events: none; z-index: 3; }
        .ship-pin { position: absolute; transform: translate(-50%,-50%); z-index: 4; }

        .map-tele {
          width: 170px; flex-shrink: 0;
          background: rgba(9,9,20,0.96); border-left: 1px solid rgba(255,255,255,0.07);
          padding: 14px;
        }
        .tele-title { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #22d3ee; letter-spacing: 0.22em; margin-bottom: 12px; text-transform: uppercase; }
        .tele-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .tele-key { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #6b7280; letter-spacing: 0.12em; }
        .tele-val { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #e5e7eb; letter-spacing: 0.06em; }
        .tele-warn { color: #f87171; }

        .right-col { display: flex; flex-direction: column; gap: 10px; }
        .alerts-header { display: flex; align-items: center; justify-content: space-between; padding: 11px 14px 9px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .alerts-title { display: flex; align-items: center; gap: 7px; font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #e5e7eb; letter-spacing: 0.18em; }
        .alert-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #f87171; box-shadow: 0 0 7px #f87171; animation: blink 1s ease-in-out infinite; }
        .alert-card { padding: 10px 14px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .alert-card:last-child { border-bottom: none; }
        .alert-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .alert-type { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 0.16em; font-weight: 600; }
        .alert-time { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #4b5563; letter-spacing: 0.1em; }
        .alert-body { font-family: 'Rajdhani', sans-serif; font-size: 12px; color: #9ca3af; line-height: 1.5; }

        .fuel-panel { flex: 1; display: flex; flex-direction: column; }
        .fuel-header { padding: 11px 14px 0; font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #a855f7; letter-spacing: 0.2em; text-transform: uppercase; }
        .fuel-chart-area { flex: 1; padding: 12px 14px 8px; display: flex; flex-direction: column; justify-content: flex-end; }
        .bars-row { display: flex; align-items: flex-end; gap: 6px; height: 110px; }
        .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
        .bar-fill { width: 100%; border-radius: 2px 2px 0 0; min-height: 4px; transition: height 0.4s ease; }
        .bar-lbl { margin-top: 5px; font-family: 'Share Tech Mono', monospace; font-size: 6px; color: #4b5563; letter-spacing: 0.03em; text-align: center; width: 100%; }
        .fuel-footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 9px 14px 10px; display: flex; flex-direction: column; gap: 4px; }
        .fuel-row { display: flex; justify-content: space-between; align-items: center; }
        .fuel-key { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #6b7280; letter-spacing: 0.1em; }
        .fuel-val { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #e5e7eb; }
        .fuel-delta { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #4ade80; }

        /* Toast */
        .toast {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: #0f0f1a; border: 1px solid rgba(168,85,247,0.4);
          border-radius: 4px; padding: 10px 20px;
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          color: #a855f7; letter-spacing: 0.16em;
          z-index: 9999; animation: toastIn 0.2s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
        @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(8px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
      `}</style>

      {/* Grid overlay */}
      {showGridOverlay && <div className="grid-overlay" />}

      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-left">
          <span className="brand">PRIME LOG FLEET</span>
          <nav>
            {["DASHBOARD", "FLEET", "MAP", "ANALYTICS"].map((n) => (
              <button key={n} className={`nav-item${activeNav === n ? " active" : ""}`} onClick={() => setActiveNav(n)}>
                {n}
              </button>
            ))}
            <div className="more-wrap" ref={moreRef}>
              <button className={`nav-item${showMore ? " active" : ""}`} onClick={() => setShowMore(v => !v)}>
                MORE
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showMore && (
                <div className="more-dropdown">
                  {moreMenuItems.map(item => (
                    <button key={item} className="more-item" onClick={() => setShowMore(false)}>{item}</button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="topbar-right" ref={notifRef}>
          {/* 1. FULLSCREEN */}
          <div
            className={`icon-btn${isFullscreen ? " active" : ""}`}
            onClick={handleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 0 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
              </svg>
            )}
          </div>

          {/* 2. GRID OVERLAY TOGGLE */}
          <div
            className={`icon-btn${showGridOverlay ? " active" : ""}`}
            onClick={() => setShowGridOverlay(v => !v)}
            title="Toggle Grid Overlay"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </div>

          {/* 3. NOTIFICATION */}
          <div
            className={`icon-btn${showNotifPanel ? " active" : ""}`}
            onClick={handleNotifOpen}
            title="Notifications"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <div className="notif-badge">{unreadCount}</div>
            )}
          </div>

          {/* Notification dropdown panel */}
          {showNotifPanel && (
            <div className="notif-panel">
              <div className="notif-header">
                <span className="notif-header-title">CRITICAL ALERTS</span>
                <button className="notif-header-clear" onClick={() => setShowNotifPanel(false)}>DISMISS ALL</button>
              </div>
              {alertsData.length > 0 ? alertsData.map((a, i) => (
                <div className="notif-item" key={i}>
                  <div className="notif-item-top">
                    <span className="notif-item-type" style={{ color: a.typeColor }}>{a.type}</span>
                    <span className="notif-item-time">{a.time}</span>
                  </div>
                  <p className="notif-item-body">{a.body}</p>
                </div>
              )) : (
                <div className="notif-empty">NO ACTIVE ALERTS</div>
              )}
            </div>
          )}

          {/* Avatar / Logout */}
          <div className="avatar" onClick={() => router.push("/")} title="Logout">PL</div>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <div className="left-col">
          {/* Fleet Overview */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title"><div className="title-bar" />FLEET OVERVIEW</div>
              <span className="panel-ts">LAST UPDATED: {utcTime}</span>
            </div>
            <table className="fleet-table">
              <thead>
                <tr>
                  <th>ID KAPAL</th><th>TUJUAN</th><th>STATUS</th><th>ETA</th><th>MONITORING</th>
                </tr>
              </thead>
              <tbody>
                {vessels.map((v) => (
                  <tr key={v.id}>
                    <td><span className="vessel-id">{v.id}</span></td>
                    <td><span className="dest-text">{v.destination}</span></td>
                    <td>
                      <div className="status-cell">
                        <div className="sdot" style={{ background: v.statusColor, boxShadow: `0 0 6px ${v.statusColor}` }} />
                        <span style={{ color: v.statusColor }}>{v.statusLabel}</span>
                      </div>
                    </td>
                    <td><span className="eta-text" style={{ color: v.etaColor }}>{v.eta}</span></td>
                    <td><div className="tele-btn"><MonitorIcon type={v.monitoring} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map Panel */}
          <div className="panel map-panel">
            <div className="map-outer">
              <div className="map-wrap">
                {/* Map inner — zoom & pan target */}
                <div
                  className="map-inner"
                  style={{ transform: `scale(${mapZoom}) translate(${mapOffset.x}px, ${mapOffset.y}px)` }}
                >
                  <div className="map-base" />
                  <div className="map-roads" />
                  <div className="land" style={{ top:"8%", left:"3%", width:"28%", height:"38%", background:"rgba(255,255,255,0.06)", borderRadius:"40% 25% 35% 20%" }} />
                  <div className="land" style={{ top:"4%", left:"28%", width:"16%", height:"22%", background:"rgba(255,255,255,0.055)", borderRadius:"30% 40% 20% 35%" }} />
                  <div className="land" style={{ top:"30%", left:"5%", width:"32%", height:"50%", background:"rgba(255,255,255,0.065)", borderRadius:"20% 30% 40% 25%" }} />
                  <div className="land" style={{ top:"18%", left:"52%", width:"24%", height:"38%", background:"rgba(255,255,255,0.055)", borderRadius:"25% 35% 25% 40%" }} />
                  <div className="land" style={{ top:"58%", left:"56%", width:"16%", height:"30%", background:"rgba(255,255,255,0.05)", borderRadius:"35% 20% 30% 40%" }} />
                  <div className="map-text" style={{ top:"48%", left:"20%" }}>North Sea</div>
                  <div className="map-text" style={{ top:"22%", left:"56%" }}>Children&apos;s</div>
                  <div className="map-text" style={{ top:"63%", left:"34%" }}>Water Mill</div>
                  <div className="map-text" style={{ top:"54%", left:"50%" }}>HAYG...</div>
                  <div className="map-text" style={{ top:"76%", left:"12%" }}>Parrish Art Museum</div>
                  <div className="map-text" style={{ top:"84%", left:"22%" }}>Tuckahoe</div>
                  <div className="map-text" style={{ top:"89%", left:"2%" }}>Shinnecock</div>

                  {/* Ship pins */}
                  <div className="ship-pin" style={{ top:"62%", left:"13%" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
                      <path d="M3 17l2-5h14l2 5"/><path d="M5 12V8h14v4"/><path d="M8 8V5h8v3"/><line x1="12" y1="5" x2="12" y2="2"/>
                    </svg>
                  </div>
                  <div className="ship-pin" style={{ top:"35%", left:"45%" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#22d3ee", boxShadow:"0 0 8px #22d3ee" }} />
                  </div>
                  <div className="ship-pin" style={{ top:"28%", left:"68%" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#f87171", boxShadow:"0 0 8px #f87171" }} />
                  </div>
                  <div className="ship-pin" style={{ top:"65%", left:"60%" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#8b5cf6", boxShadow:"0 0 8px #8b5cf6" }} />
                  </div>
                </div>

                {/* Map card (outside zoom) */}
                <div className="map-card" style={{ zIndex: 6 }}>
                  <div className="map-card-label">▸ LIVE PROJECTION</div>
                  <div className="map-card-count">Kapal Aktif: 42</div>
                  <div className="map-card-sub">Total Jarak Tempuh: 1.2M NM</div>
                </div>

                {/* Zoom indicator */}
                <div className="zoom-indicator">
                  ZOOM {Math.round(mapZoom * 100)}%
                </div>

                {/* Map controls */}
                <div className="map-controls">
                  {/* Zoom In */}
                  <div
                    className={`map-ctrl${mapZoom >= 2.5 ? " disabled" : ""}`}
                    onClick={handleZoomIn}
                    title="Zoom In"
                  >
                    +
                  </div>

                  {/* Zoom Out */}
                  <div
                    className={`map-ctrl${mapZoom <= 0.5 ? " disabled" : ""}`}
                    onClick={handleZoomOut}
                    title="Zoom Out"
                  >
                    −
                  </div>

                  {/* Compass / Reset */}
                  <div
                    className="map-ctrl"
                    onClick={handleCompassReset}
                    title="Reset View"
                    style={{ overflow: "hidden" }}
                  >
                    <svg
                      width="11" height="11" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ transform: `rotate(${compassHeading}deg)`, transition: "transform 0.05s linear" }}
                    >
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Live Telemetry sidebar */}
              <div className="map-tele">
                <div className="tele-title">LIVE TELEMETRY</div>
                <div className="tele-row">
                  <span className="tele-key">F-V2 SIGNAL</span>
                  <span className="tele-val">98.4%</span>
                </div>
                <div className="tele-row">
                  <span className="tele-key">WEATHER</span>
                  <span className="tele-val tele-warn">WARNING</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-col">
          <div className="panel">
            <div className="alerts-header">
              <div className="alerts-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                CRITICAL ALERTS
              </div>
              <div className="alert-live-dot" />
            </div>
            {alertsData.map((a, i) => (
              <div className="alert-card" key={i}>
                <div className="alert-card-top">
                  <span className="alert-type" style={{ color: a.typeColor }}>{a.type}</span>
                  <span className="alert-time">{a.time}</span>
                </div>
                <p className="alert-body">{a.body}</p>
              </div>
            ))}
          </div>

          <div className="panel fuel-panel">
            <div className="fuel-header">FUEL CONSUMPTION (BAHAN<br />BAKAR)</div>
            <div className="fuel-chart-area">
              <div className="bars-row">
                {fuelBars.map((b, i) => (
                  <div className="bar-col" key={i}>
                    <div className="bar-fill" style={{ height:`${b.h}%`, background:b.color, boxShadow:`0 0 8px ${b.color}55` }} />
                    <div className="bar-lbl">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fuel-footer">
              <div className="fuel-row">
                <span className="fuel-key">Aggregate Fuel Level</span>
                <span className="fuel-val">12.4K Liters</span>
              </div>
              <div className="fuel-row">
                <span className="fuel-key">Consumption Variance</span>
                <span className="fuel-delta">+2.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
