"use client";
import { useState, useEffect } from "react";
import PrimeTopbar from "../ui/PrimeTopbar";

const vessels = [
  { id:"PL-992-BUMI", dest:"Port of Rotterdam (NLD)", status:"EN ROUTE", statusColor:"#22d3ee", eta:"24 OCT 14:00", etaColor:"#e5e7eb", mon:"chart" },
  { id:"PL-441-BULAN", dest:"Singapore Harbor (SGP)", status:"IN PORT", statusColor:"#6b7280", eta:"DOCKED", etaColor:"#e5e7eb", mon:"anchor" },
  { id:"PL-770-ORION", dest:"Suez Canal (EGY)", status:"DELAYED", statusColor:"#f87171", eta:"RECALCULATING", etaColor:"#f87171", mon:"warn" },
  { id:"PL-102-MARS", dest:"Dry Dock 4 (HKG)", status:"MAINTENANCE", statusColor:"#a855f7", eta:"30 OCT 08:00", etaColor:"#e5e7eb", mon:"wrench" },
];
const alerts = [
  { type:"WEATHER WARNING", tc:"#f87171", time:"10:45 UTC", body:"Tropical Cyclone Alert: Region IV-B. Reroute mandatory for vessels in sector 7." },
  { type:"ENGINE ISSUE", tc:"#f59e0b", time:"09:12 UTC", body:"Vessel PL-992-ALPHA: P04- Engine Temp High. Cooling system bypass initiated." },
];
const fuel = [
  {c:"#f472b6",h:52,l:"MERCURIUS"},{c:"#a78bfa",h:70,l:"ORION"},{c:"#f472b6",h:45,l:"SATURNUS"},
  {c:"#22d3ee",h:88,l:"MARS"},{c:"#22d3ee",h:95,l:"JUPITER"},{c:"#a78bfa",h:65,l:"BUMI"},{c:"#f472b6",h:60,l:"BULAN"},
];

function MonIcon({t}:{t:string}) {
  if(t==="chart") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
  if(t==="anchor") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>;
  if(t==="warn") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
}

export default function DashboardPage() {
  const [utc, setUtc] = useState("");
  useEffect(() => {
    const t = () => { const n=new Date(); setUtc(`${String(n.getUTCHours()).padStart(2,"0")}:${String(n.getUTCMinutes()).padStart(2,"0")}:${String(n.getUTCSeconds()).padStart(2,"0")} UTC`); };
    t(); const id=setInterval(t,1000); return ()=>clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .layout{display:grid;grid-template-columns:1fr 280px;gap:10px;padding:10px;background:#0a0a10;min-height:calc(100vh - 46px)}
        .left-col{display:flex;flex-direction:column;gap:10px;min-width:0}
        .panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden}
        .ph{display:flex;align-items:center;justify-content:space-between;padding:12px 18px 10px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .pt{display:flex;align-items:center;gap:9px;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#e5e7eb}
        .ptb{width:3px;height:14px;background:#a855f7;border-radius:2px;flex-shrink:0}
        .pts{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.12em}
        table{width:100%;border-collapse:collapse;table-layout:fixed}
        th{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.2em;text-align:left;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.06);font-weight:400;text-transform:uppercase;background:rgba(255,255,255,0.012);white-space:nowrap}
        th:nth-child(1){width:22%}th:nth-child(2){width:28%}th:nth-child(3){width:18%}th:nth-child(4){width:20%}th:nth-child(5){width:12%}
        td{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
        tbody tr{transition:background 0.15s;cursor:pointer}
        tbody tr:hover{background:rgba(168,85,247,0.04)}
        tbody tr:last-child td{border-bottom:none}
        .vid{font-family:'Share Tech Mono',monospace;font-size:11px;color:#22d3ee;letter-spacing:0.05em}
        .sc{display:flex;align-items:center;gap:7px;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.14em;white-space:nowrap}
        .sdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;animation:blink 2s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .eta{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:0.05em}
        .map-panel{flex:1;min-height:260px}
        .map-outer{display:flex;height:100%;min-height:260px}
        .map-wrap{position:relative;flex:1;background:#141420;overflow:hidden}
        .map-base{position:absolute;inset:0;background:#1a1a2a}
        .map-roads{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:80px 80px,80px 80px,20px 20px,20px 20px}
        .land{position:absolute;border-radius:3px}
        .map-card{position:absolute;top:14px;left:14px;background:rgba(8,5,22,0.92);border:1px solid rgba(168,85,247,0.45);border-radius:5px;padding:10px 16px 13px;backdrop-filter:blur(10px);min-width:200px;z-index:5}
        .map-card-label{font-family:'Share Tech Mono',monospace;font-size:7px;color:#a855f7;letter-spacing:0.28em;margin-bottom:5px}
        .map-card-count{font-family:'Orbitron',sans-serif;font-size:22px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:2px}
        .map-card-sub{font-family:'Share Tech Mono',monospace;font-size:9px;color:#22d3ee;letter-spacing:0.06em}
        .map-ctrl-wrap{position:absolute;right:14px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:4px;z-index:5}
        .mc{width:28px;height:28px;background:rgba(10,10,20,0.88);border:1px solid rgba(255,255,255,0.1);border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;font-family:'Share Tech Mono',monospace;font-size:16px;user-select:none}
        .mc:hover{border-color:rgba(34,211,238,0.4);color:#22d3ee}
        .map-txt{position:absolute;font-family:'Share Tech Mono',monospace;font-size:8px;color:rgba(255,255,255,0.35);pointer-events:none;z-index:3}
        .pin{position:absolute;transform:translate(-50%,-50%);z-index:4}
        .map-tele{width:170px;flex-shrink:0;background:rgba(9,9,20,0.96);border-left:1px solid rgba(255,255,255,0.07);padding:14px}
        .tt{font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.22em;margin-bottom:12px}
        .tr{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .tk{font-family:'Share Tech Mono',monospace;font-size:9px;color:#6b7280;letter-spacing:0.12em}
        .tv{font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;letter-spacing:0.06em}
        .right-col{display:flex;flex-direction:column;gap:10px}
        .ah{display:flex;align-items:center;justify-content:space-between;padding:11px 14px 9px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .at{display:flex;align-items:center;gap:7px;font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;letter-spacing:0.18em}
        .ald{width:8px;height:8px;border-radius:50%;background:#f87171;box-shadow:0 0 7px #f87171;animation:blink 1s ease-in-out infinite}
        .ac{padding:10px 14px 12px;border-bottom:1px solid rgba(255,255,255,0.04)}
        .ac:last-child{border-bottom:none}
        .act{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}
        .atype{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.16em;font-weight:600}
        .atime{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.1em}
        .abody{font-family:'Rajdhani',sans-serif;font-size:12px;color:#9ca3af;line-height:1.5}
        .fuel-panel{flex:1;display:flex;flex-direction:column}
        .fh{padding:11px 14px 0;font-family:'Share Tech Mono',monospace;font-size:9px;color:#a855f7;letter-spacing:0.2em}
        .fca{flex:1;padding:12px 14px 8px;display:flex;flex-direction:column;justify-content:flex-end}
        .brow{display:flex;align-items:flex-end;gap:6px;height:110px}
        .bc{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end}
        .bf{width:100%;border-radius:2px 2px 0 0;min-height:4px}
        .bl{margin-top:5px;font-family:'Share Tech Mono',monospace;font-size:6px;color:#4b5563;text-align:center;width:100%}
        .ff{border-top:1px solid rgba(255,255,255,0.06);padding:9px 14px 10px;display:flex;flex-direction:column;gap:4px}
        .fr{display:flex;justify-content:space-between;align-items:center}
        .fk{font-family:'Share Tech Mono',monospace;font-size:9px;color:#6b7280;letter-spacing:0.1em}
        .fv{font-family:'Share Tech Mono',monospace;font-size:9px;color:#e5e7eb}
        .fd{font-family:'Share Tech Mono',monospace;font-size:9px;color:#4ade80}
      `}</style>
      <PrimeTopbar/>
      <div className="layout">
        <div className="left-col">
          {/* Fleet Table */}
          <div className="panel">
            <div className="ph"><div className="pt"><div className="ptb"/>FLEET OVERVIEW</div><span className="pts">LAST UPDATED: {utc}</span></div>
            <table>
              <thead><tr><th>ID KAPAL</th><th>TUJUAN</th><th>STATUS</th><th>ETA</th><th>MONITORING</th></tr></thead>
              <tbody>{vessels.map(v=>(
                <tr key={v.id}>
                  <td><span className="vid">{v.id}</span></td>
                  <td><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#d1d5db",fontWeight:500}}>{v.dest}</span></td>
                  <td><div className="sc"><div className="sdot" style={{background:v.statusColor,boxShadow:`0 0 6px ${v.statusColor}`}}/><span style={{color:v.statusColor}}>{v.status}</span></div></td>
                  <td><span className="eta" style={{color:v.etaColor}}>{v.eta}</span></td>
                  <td><MonIcon t={v.mon}/></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {/* Map */}
          <div className="panel map-panel">
            <div className="map-outer">
              <div className="map-wrap">
                <div className="map-base"/><div className="map-roads"/>
                <div className="land" style={{top:"8%",left:"3%",width:"28%",height:"38%",background:"rgba(255,255,255,0.06)",borderRadius:"40% 25% 35% 20%"}}/>
                <div className="land" style={{top:"30%",left:"5%",width:"32%",height:"50%",background:"rgba(255,255,255,0.065)",borderRadius:"20% 30% 40% 25%"}}/>
                <div className="land" style={{top:"18%",left:"52%",width:"24%",height:"38%",background:"rgba(255,255,255,0.055)",borderRadius:"25% 35% 25% 40%"}}/>
                <div className="map-txt" style={{top:"48%",left:"20%"}}>North Sea</div>
                <div className="map-txt" style={{top:"63%",left:"34%"}}>Water Mill</div>
                <div className="map-txt" style={{top:"76%",left:"12%"}}>Parrish Art Museum</div>
                <div className="map-txt" style={{top:"84%",left:"22%"}}>Tuckahoe</div>
                <div className="map-txt" style={{top:"89%",left:"2%"}}>Shinnecock</div>
                <div className="pin" style={{top:"62%",left:"13%"}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5"><path d="M3 17l2-5h14l2 5"/><path d="M5 12V8h14v4"/><path d="M8 8V5h8v3"/><line x1="12" y1="5" x2="12" y2="2"/></svg>
                </div>
                <div className="pin" style={{top:"35%",left:"45%"}}><div style={{width:8,height:8,borderRadius:"50%",background:"#22d3ee",boxShadow:"0 0 8px #22d3ee"}}/></div>
                <div className="pin" style={{top:"65%",left:"60%"}}><div style={{width:8,height:8,borderRadius:"50%",background:"#8b5cf6",boxShadow:"0 0 8px #8b5cf6"}}/></div>
                <div className="map-card">
                  <div className="map-card-label">▸ LIVE PROJECTION</div>
                  <div className="map-card-count">Kapal Aktif: 42</div>
                  <div className="map-card-sub">Total Jarak Tempuh: 1.2M NM</div>
                </div>
                <div className="map-ctrl-wrap">
                  <div className="mc">+</div><div className="mc">−</div>
                  <div className="mc"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg></div>
                </div>
              </div>
              <div className="map-tele">
                <div className="tt">LIVE TELEMETRY</div>
                <div className="tr"><span className="tk">F-V2 SIGNAL</span><span className="tv">98.4%</span></div>
                <div className="tr"><span className="tk">WEATHER</span><span className="tv" style={{color:"#f87171"}}>WARNING</span></div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="right-col">
          <div className="panel">
            <div className="ah">
              <div className="at">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                CRITICAL ALERTS
              </div>
              <div className="ald"/>
            </div>
            {alerts.map((a,i)=>(
              <div className="ac" key={i}>
                <div className="act"><span className="atype" style={{color:a.tc}}>{a.type}</span><span className="atime">{a.time}</span></div>
                <p className="abody">{a.body}</p>
              </div>
            ))}
          </div>
          <div className="panel fuel-panel">
            <div className="fh">FUEL CONSUMPTION (BAHAN<br/>BAKAR)</div>
            <div className="fca">
              <div className="brow">{fuel.map((b,i)=>(
                <div className="bc" key={i}>
                  <div className="bf" style={{height:`${b.h}%`,background:b.c,boxShadow:`0 0 8px ${b.c}55`}}/>
                  <div className="bl">{b.l}</div>
                </div>
              ))}</div>
            </div>
            <div className="ff">
              <div className="fr"><span className="fk">Aggregate Fuel Level</span><span className="fv">12.4K Liters</span></div>
              <div className="fr"><span className="fk">Consumption Variance</span><span className="fd">+2.4%</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
