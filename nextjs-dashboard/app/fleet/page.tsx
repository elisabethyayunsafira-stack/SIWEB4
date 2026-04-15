"use client";
import { useState, useEffect } from "react";
import PrimeTopbar from "../ui/PrimeTopbar";

const vessels = [
  { id:"PL-4822", name:"ATLAS", dest:"Singapore Hub", status:"EN ROUTE", st:"enroute", eta:"14:20:00", etaC:"#e5e7eb", mon:"chart" },
  { id:"PL-9011", name:"BOREALIS", dest:"Port of Rotterdam", status:"DELAYED", st:"delayed", eta:"UNKNOWN", etaC:"#f87171", mon:"warn" },
  { id:"PL-3310", name:"CENTAURI", dest:"Busan Terminal", status:"IN PORT", st:"inport", eta:"–", etaC:"#9ca3af", mon:"anchor" },
  { id:"PL-2105", name:"DRIFT", dest:"Dry Dock C", status:"MAINTENANCE", st:"maint", eta:"–", etaC:"#9ca3af", mon:"wrench" },
];
const alerts2 = [
  { type:"WEATHER WARNING", tc:"#f87171", time:"12m ago", body:"Tropical depression identified in Sector 7-B. Rerouting recommended for PL-4822." },
  { type:"ENGINE ISSUE", tc:"#f59e0b", time:"45m ago", body:"Fuel pressure drop detected in Port Engine #2 on PL-9011. Efficiency down 15%." },
];
const fuel2 = [
  {c:"#f472b6",h:52,l:"MERCURIUS"},{c:"#a78bfa",h:70,l:"ORION"},{c:"#f472b6",h:45,l:"SATURNUS"},
  {c:"#22d3ee",h:88,l:"MARS"},{c:"#22d3ee",h:95,l:"JUPITER"},{c:"#a78bfa",h:65,l:"BUMI"},{c:"#f472b6",h:60,l:"BULAN"},
];

function StatusPill({t}:{t:string}) {
  const map:{[k:string]:{c:string,bg:string,border:string}} = {
    enroute:{c:"#22d3ee",bg:"rgba(34,211,238,0.08)",border:"rgba(34,211,238,0.5)"},
    delayed:{c:"#f87171",bg:"rgba(248,113,113,0.08)",border:"rgba(248,113,113,0.5)"},
    inport:{c:"#9ca3af",bg:"rgba(156,163,175,0.06)",border:"rgba(156,163,175,0.4)"},
    maint:{c:"#f87171",bg:"rgba(248,113,113,0.08)",border:"rgba(248,113,113,0.5)"},
  };
  const s = vessels.find(v=>v.st===t);
  const style = map[t]||map.inport;
  return <span style={{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:20,border:`1px solid ${style.border}`,fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:"0.14em",color:style.c,background:style.bg,whiteSpace:"nowrap"}}>{s?.status}</span>;
}

export default function FleetPage() {
  const [time, setTime] = useState("10:45 AM");
  useEffect(() => {
    const t = () => { const n=new Date(); let h=n.getHours(); const m=String(n.getMinutes()).padStart(2,"0"); const ap=h>=12?"PM":"AM"; h=h%12||12; setTime(`${h}:${m} ${ap}`); };
    t(); const id=setInterval(t,60000); return ()=>clearInterval(id);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .layout{display:grid;grid-template-columns:1fr 290px;gap:12px;padding:14px;background:#0a0a10;min-height:calc(100vh - 50px)}
        .lc{display:flex;flex-direction:column;gap:12px}
        .rc{display:flex;flex-direction:column;gap:12px}
        .panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden}
        .phead{display:flex;align-items:center;justify-content:space-between;padding:12px 20px 10px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .badges{display:flex;gap:8px;align-items:center}
        .badge{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.14em;padding:4px 10px;border-radius:3px;border:1px solid;white-space:nowrap}
        table{width:100%;border-collapse:collapse;table-layout:fixed}
        th{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.22em;text-align:left;padding:11px 20px;border-bottom:1px solid rgba(255,255,255,0.05);font-weight:400;text-transform:uppercase;background:rgba(255,255,255,0.01)}
        th:nth-child(1){width:18%}th:nth-child(2){width:22%}th:nth-child(3){width:20%}th:nth-child(4){width:18%}th:nth-child(5){width:22%}
        td{padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
        tbody tr{transition:background 0.15s;cursor:pointer}
        tbody tr:hover{background:rgba(168,85,247,0.04)}
        tbody tr:last-child td{border-bottom:none}
        .bar-row{margin-bottom:14px}
        .bar-label-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .bar-lbl{font-family:'Share Tech Mono',monospace;font-size:9px;color:#9ca3af;letter-spacing:0.18em}
        .bar-track{height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden}
        .bar-fill2{height:100%;border-radius:3px;transition:width 0.6s ease}
        .reg-blocks{display:flex;align-items:flex-end;height:80px;gap:6px;padding:14px 20px 0}
        .rb{border-radius:3px 3px 0 0;flex:1;min-height:20px}
        .ah2{display:flex;align-items:center;gap:8px;padding:14px 16px 12px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;letter-spacing:0.18em}
        .acard{margin:10px 12px;border-radius:4px;padding:12px 14px;border:1px solid}
        .atop{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .fuel2{flex:1}
        .fh2{display:flex;justify-content:space-between;align-items:center;padding:14px 16px 0;margin-bottom:12px}
        .ft{font-family:'Share Tech Mono',monospace;font-size:9px;color:#a855f7;letter-spacing:0.2em}
        .fa{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.14em}
        .fbars{display:flex;align-items:flex-end;gap:6px;height:80px;padding:0 16px}
        .fcol{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end}
        .fbar{width:100%;border-radius:2px 2px 0 0;min-height:4px}
        .fday{font-family:'Share Tech Mono',monospace;font-size:6px;color:#374151;letter-spacing:0.04em;margin-top:5px}
        .fstats{display:grid;grid-template-columns:1fr 1fr 1fr;margin:12px 0 0;border-top:1px solid rgba(255,255,255,0.06)}
        .fstat{padding:10px 16px}
        .fsl{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563;letter-spacing:0.16em;margin-bottom:4px}
        .fsv{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.05em}
      `}</style>
      <PrimeTopbar/>
      <div style={{padding:"20px 24px 0",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:22,fontWeight:700,color:"#fff",letterSpacing:"0.06em",marginBottom:4}}>FLEET OVERVIEW</div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#6b7280",letterSpacing:"0.04em"}}>Logistik global dan pelacakan kapal</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#22d3ee",letterSpacing:"0.2em",marginBottom:3}}>SYSTEM STATUS: NOMINAL</div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4b5563",letterSpacing:"0.12em"}}>Last Updated: {time}</div>
        </div>
      </div>
      <div className="layout">
        <div className="lc">
          <div className="panel">
            <div className="phead">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#6b7280",letterSpacing:"0.25em"}}>ARMADA AKTIF</span>
              <div className="badges">
                <span className="badge" style={{color:"#22d3ee",borderColor:"rgba(34,211,238,0.3)",background:"rgba(34,211,238,0.06)"}}>LIVE_STREAM</span>
                <span className="badge" style={{color:"#9ca3af",borderColor:"rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)"}}>42 TOTAL VESSELS</span>
              </div>
            </div>
            <table>
              <thead><tr><th>ID KAPAL</th><th>TUJUAN</th><th>STATUS</th><th>ETA</th><th>MONITORING</th></tr></thead>
              <tbody>{vessels.map(v=>(
                <tr key={v.id}>
                  <td>
                    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:"#22d3ee",letterSpacing:"0.05em",display:"block",marginBottom:2}}>{v.id}</span>
                    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#4b5563",letterSpacing:"0.18em"}}>{v.name}</span>
                  </td>
                  <td><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#d1d5db",fontWeight:500}}>{v.dest}</span></td>
                  <td><StatusPill t={v.st}/></td>
                  <td><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:v.etaC,letterSpacing:"0.05em"}}>{v.eta}</span></td>
                  <td><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {/* Logistics Efficiency */}
          <div className="panel" style={{padding:"14px 20px 18px"}}>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4b5563",letterSpacing:"0.25em",marginBottom:14}}>LOGISTICS EFFICIENCY</div>
            <div className="bar-row">
              <div className="bar-label-row">
                <span className="bar-lbl">CARGO UTILIZATION</span>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#22d3ee",letterSpacing:"0.08em"}}>92.4%</span>
              </div>
              <div className="bar-track"><div className="bar-fill2" style={{width:"92.4%",background:"#22d3ee"}}/></div>
            </div>
            <div className="bar-row" style={{marginBottom:0}}>
              <div className="bar-label-row">
                <span className="bar-lbl">ROUTE OPTIMIZATION</span>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#a855f7",letterSpacing:"0.08em"}}>87.1%</span>
              </div>
              <div className="bar-track"><div className="bar-fill2" style={{width:"87.1%",background:"#a855f7"}}/></div>
            </div>
          </div>
          {/* Regional Distribution */}
          <div className="panel">
            <div style={{padding:"14px 20px 12px",fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4b5563",letterSpacing:"0.25em",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>REGIONAL DISTRIBUTION</div>
            <div className="reg-blocks">
              <div className="rb" style={{height:"80%",background:"#22d3ee",flex:3}}/>
              <div className="rb" style={{height:"65%",background:"#a855f7",flex:2}}/>
              <div className="rb" style={{height:"75%",background:"#22d3ee",flex:2.5}}/>
              <div className="rb" style={{height:"55%",background:"#a855f7",flex:2.2}}/>
            </div>
            <div style={{height:14}}/>
          </div>
        </div>
        <div className="rc">
          <div className="panel">
            <div className="ah2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              CRITICAL ALERTS
            </div>
            {alerts2.map((a,i)=>(
              <div className="acard" key={i} style={{background:i===0?"rgba(248,113,113,0.07)":"rgba(245,158,11,0.05)",borderColor:i===0?"rgba(248,113,113,0.2)":"rgba(245,158,11,0.15)"}}>
                <div className="atop">
                  <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:"0.16em",fontWeight:600,color:a.tc}}>{a.type}</span>
                  <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#4b5563"}}>{a.time}</span>
                </div>
                <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:12,color:"#9ca3af",lineHeight:1.5}}>{a.body}</p>
              </div>
            ))}
          </div>
          <div className="panel fuel2">
            <div className="fh2">
              <span className="ft">FUEL CONSUMPTION<br/>(BAHAN BAKAR)</span>
              <span className="fa">WEEKLY AVG</span>
            </div>
            <div className="fbars">{fuel2.map((b,i)=>(
              <div className="fcol" key={i}>
                <div className="fbar" style={{height:`${b.h}%`,background:b.c,boxShadow:`0 0 8px ${b.c}55`}}/>
                <div className="fday">{b.l.slice(0,3)}</div>
              </div>
            ))}</div>
            <div className="fstats">
              <div className="fstat"><div className="fsl">PEAK</div><div className="fsv" style={{color:"#22d3ee"}}>1.2M L</div></div>
              <div className="fstat" style={{borderLeft:"1px solid rgba(255,255,255,0.05)"}}><div className="fsl">ECONOMY</div><div className="fsv" style={{color:"#a855f7"}}>8.0M L</div></div>
              <div className="fstat" style={{borderLeft:"1px solid rgba(255,255,255,0.05)"}}><div className="fsl">VARIANCE</div><div className="fsv" style={{color:"#4ade80"}}>+4.2%</div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
