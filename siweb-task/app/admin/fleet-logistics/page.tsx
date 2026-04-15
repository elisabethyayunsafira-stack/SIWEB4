"use client";
import { useState } from "react";
import SereneSailTopbar from "../../ui/SereneSailTopbar";

const vessels4 = [
  {id:"V-902 STELLAR",sub:"XJ-902-25",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-66",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-88",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-80",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-83",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-66",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-902 AQUILA",sub:"XJ-902-88",dest:"Reykjavik, ISL",status:"IN TRANSIT",pct:78},
  {id:"V-412 NEPTUNE",sub:"XJ-412-31",dest:"Singapore, SGP",status:"IN TRANSIT",pct:42},
  {id:"V-771 ORION",sub:"XJ-771-86",dest:"Rotterdam, NLD",status:"APPROACHING PORT",pct:96},
  {id:"V-118 TITAN",sub:"XJ-118-24",dest:"Dubai, ARE",status:"DEPARTURE PHASE",pct:16},
];
const packages = [
  {id:"PKG-100293",size:"MEDIUM",dest:"Japan (HND)"},
  {id:"PKG-100412",size:"SMALL",dest:"Germany (FRA)"},
  {id:"PKG-100881",size:"LARGE",dest:"USA (JFK)"},
  {id:"PKG-100994",size:"MEDIUM",dest:"UK (LHR)"},
  {id:"PKG-101221",size:"LARGE",dest:"Brazil (GRU)"},
  {id:"PKG-101552",size:"SMALL",dest:"Norway (OSL)"},
];
const sizes = ["SMALL","MEDIUM","LARGE"];

export default function FleetLogisticsPage() {
  const [activeSize, setActiveSize] = useState("MEDIUM");
  const [showAllSegments, setShowAllSegments] = useState(false);
  const visiblePackages = showAllSegments
    ? packages
    : packages.filter((item) => item.size === activeSize);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .ph{padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .ph-title{display:flex;align-items:center;gap:14px;margin-bottom:4px}
        .ph-t{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:700;color:#fff;letter-spacing:0.04em}
        .live-badge{display:flex;align-items:center;gap:6px;font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.16em;padding:4px 10px;border:1px solid rgba(34,211,238,0.3);border-radius:3px;background:rgba(34,211,238,0.06)}
        .ph-sub{font-family:'Rajdhani',sans-serif;font-size:13px;color:#6b7280}
        .layout{display:grid;grid-template-columns:1fr 1fr;gap:0;margin:0;min-height:calc(100vh - 140px)}
        .left-panel{border-right:1px solid rgba(255,255,255,0.07)}
        .fl-header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .fl-title{font-family:'Share Tech Mono',monospace;font-size:9px;color:#a855f7;letter-spacing:0.22em}
        .av-badge{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.14em}
        table{width:100%;border-collapse:collapse}
        th{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563;letter-spacing:0.2em;text-align:left;padding:9px 18px;border-bottom:1px solid rgba(255,255,255,0.05);font-weight:400;text-transform:uppercase;background:rgba(255,255,255,0.01)}
        td{padding:10px 18px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
        tbody tr{transition:background 0.15s;cursor:pointer}
        tbody tr:hover{background:rgba(168,85,247,0.03)}
        .vid3{font-family:'Share Tech Mono',monospace;font-size:10px;color:#a855f7;display:block}
        .vsub{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563}
        .prog-wrap{display:flex;align-items:center;gap:10px}
        .prog-status{font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.1em;min-width:100px}
        .prog-pct{font-family:'Share Tech Mono',monospace;font-size:9px;color:#6b7280;min-width:28px;text-align:right}
        .prog-track{flex:1;height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;max-width:80px}
        .prog-fill{height:100%;background:#a855f7;border-radius:2px;box-shadow:0 0 6px rgba(168,85,247,0.5)}
        .right-panel{display:flex;flex-direction:column}
        .size-tabs{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid rgba(255,255,255,0.07);background:#1f1d1f;padding:4px}
        .stab{padding:12px;text-align:center;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.14em;cursor:pointer;transition:background 0.15s;border:none;background:none;color:#6b7280}
        .stab.active{background:#c57cff;color:#25182c}
        .pkg-header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px 10px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .pkg-title{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#fff}
        th.pkg{font-size:7px;color:#4b5563;padding:8px 16px}
        td.pkg{padding:10px 16px}
        .pkg-id{font-family:'Share Tech Mono',monospace;font-size:10px;color:#6b7280}
        .size-badge{display:flex;align-items:center;gap:5px;font-family:'Share Tech Mono',monospace;font-size:9px;color:#a855f7;letter-spacing:0.1em}
        .size-icon{width:14px;height:14px;border-radius:50%;background:rgba(168,85,247,0.2);border:1px solid rgba(168,85,247,0.4)}
        .view-all{text-align:center;padding:12px;font-family:'Share Tech Mono',monospace;font-size:9px;color:#22d3ee;cursor:pointer;border-top:1px solid rgba(255,255,255,0.05);letter-spacing:0.14em;transition:color 0.2s;border:none;background:none}
        .view-all:hover{color:#67e8f9}
        .health-section{padding:14px 20px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.01)}
        .health-title{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.2em;margin-bottom:10px}
        .health-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .hk{font-family:'Rajdhani',sans-serif;font-size:13px;color:#9ca3af}
        .hv{font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb}
        .footer-bar2{position:fixed;bottom:0;left:0;right:0;height:28px;background:#0a0a14;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:20px;padding:0 24px}
        .fb2{font-family:'Share Tech Mono',monospace;font-size:8px;color:#374151;letter-spacing:0.14em}
        .fb2 span{color:#4b5563}
      `}</style>
      <SereneSailTopbar/>
      <div className="ph">
        <div className="ph-title">
          <div className="ph-t">OPERATIONS HUB</div>
          <div className="live-badge" style={{color:"#22d3ee"}}>LIVE TELEMETRY</div>
        </div>
        <div className="ph-sub">Real-time oversight of global maritime assets and high-priority logistics segments.</div>
      </div>
      <div style={{padding:"14px 20px 6px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#a855f7",letterSpacing:"0.22em"}}>FLEET OVERVIEW</span>
          <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#4b5563",letterSpacing:"0.14em"}}>ACTIVE VESSELS: 14</span>
        </div>
      </div>
      <div className="layout">
        <div className="left-panel">
          <table>
            <thead><tr><th>VESSEL ID & NAME</th><th>DESTINATION</th><th>DELIVERY PROGRESS</th></tr></thead>
            <tbody>{vessels4.map((v,i)=>(
              <tr key={i}>
                <td><span className="vid3">{v.id}</span><span className="vsub">{v.sub}</span></td>
                <td><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:12,color:"#d1d5db"}}>{v.dest}</span></td>
                <td>
                  <div className="prog-wrap">
                    <span className="prog-status">{v.status}</span>
                    <div className="prog-track"><div className="prog-fill" style={{width:`${v.pct}%`}}/></div>
                    <span className="prog-pct">{v.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="right-panel">
          <div className="size-tabs">
            {sizes.map(s=>(
              <button key={s} className={`stab${activeSize===s?" active":""}`} onClick={()=>setActiveSize(s)}>{s}</button>
            ))}
          </div>
          <div className="pkg-header">
            <span className="pkg-title">PACKAGE OVERVIEW</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
          </div>
          <table>
            <thead><tr><th className="pkg">ITEM ID</th><th className="pkg">SIZE</th><th className="pkg">DESTINATION</th></tr></thead>
            <tbody>{visiblePackages.map((p,i)=>(
              <tr key={i}>
                <td className="pkg"><span className="pkg-id">{p.id}</span></td>
                <td className="pkg"><div className="size-badge"><div className="size-icon"/>{p.size}</div></td>
                <td className="pkg"><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:12,color:"#9ca3af"}}>{p.dest}</span></td>
              </tr>
            ))}</tbody>
          </table>
          <button
            type="button"
            className="view-all"
            onClick={() => setShowAllSegments((current) => !current)}
          >
            {showAllSegments ? "SHOW FILTERED SEGMENTS" : "VIEW ALL SEGMENTS"}
          </button>
          <div className="health-section">
            <div className="health-title">OPERATIONAL HEALTH</div>
            <div className="health-row"><span className="hk">Bandwidth Efficiency</span><span className="hv">98.2%</span></div>
            <div className="health-row"><span className="hk">Signal Integrity</span><span className="hv">Normal</span></div>
            <div className="health-row" style={{marginBottom:0}}><span className="hk">Last Sync</span><span className="hv" style={{color:"#4b5563"}}>0.02s ago</span></div>
          </div>
        </div>
      </div>
      <div className="footer-bar2">
        <span className="fb2">● SYSTEM HEALTH: <span>NOMINAL</span></span>
        <span className="fb2">CONNECTIVITY: <span>ACTIVE</span></span>
        <span className="fb2">TELEMETRY: <span>SYNCHRONIZES</span></span>
      </div>
    </>
  );
}
