"use client";
import PrimeTopbar from "../ui/PrimeTopbar";

const deployments = [
  { id:"PL-902-BUMI", type:"PULSE-CLASS FREIGHTER", dest:"Titan Gateway Alpha", eta:"14:20:00", status:"ACTIVE", sc:"#22d3ee", sb:"rgba(34,211,238,0.08)", sbc:"rgba(34,211,238,0.4)" },
  { id:"VX-441-MOON", type:"VOID-CLASS TANKER", dest:"Europan Ice Depot", eta:"16:45:12", status:"DELAYED", sc:"#f87171", sb:"rgba(248,113,113,0.08)", sbc:"rgba(248,113,113,0.4)" },
  { id:"DS-112-MARS", type:"DATA-STREAM INTERCEPTOR", dest:"Neo-Tokyo Orbital 3", eta:"21:05:40", status:"EN ROUTE", sc:"#a855f7", sb:"rgba(168,85,247,0.08)", sbc:"rgba(168,85,247,0.4)" },
];
const fuelDays = ["MON","TUE","WED","THU","FRI","SAT"];
const fuelH = [65,52,80,45,92,70];

export default function VesselDeploymentPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .page{display:flex;flex-direction:column;min-height:calc(100vh - 46px);padding:20px 24px}
        .ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}
        .brand2{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:"#a855f7"}
        .title{font-family:'Rajdhani',sans-serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:0.04em}
        .live-badge{display:flex;align-items:center;gap:6px;font-family:'Share Tech Mono',monospace;font-size:9px;color:#22d3ee;letter-spacing:0.18em}
        .live-dot{width:7px;height:7px;border-radius:50%;background:#22d3ee;box-shadow:0 0 7px #22d3ee;animation:blink 1.5s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden;margin-bottom:20px}
        .stat-card{background:#0f0f1a;padding:24px 28px;position:relative;overflow:hidden}
        .stat-card.danger{background:rgba(248,113,113,0.05);border:1px solid rgba(248,113,113,0.2)}
        .stat-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:10px}
        .stat-num{font-family:'Orbitron',sans-serif;font-size:42px;font-weight:700;line-height:1;margin-bottom:4px}
        .stat-sub{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.14em}
        .stat-sep{position:absolute;left:0;top:20%;bottom:20%;width:3px;background:linear-gradient(to bottom,transparent,var(--acc,#22d3ee),transparent)}
        .stat-icon{position:absolute;bottom:20px;right:24px;opacity:0.08}
        .layout2{display:grid;grid-template-columns:1fr 420px;gap:16px}
        .panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden}
        .panel-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 12px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .panel-title{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;color:#fff;letter-spacing:0.04em}
        table{width:100%;border-collapse:collapse}
        th{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.2em;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,0.05);font-weight:400;text-transform:uppercase;background:rgba(255,255,255,0.01);white-space:nowrap}
        td{padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
        tbody tr{transition:background 0.15s;cursor:pointer}
        tbody tr:hover{background:rgba(168,85,247,0.04)}
        tbody tr:last-child td{border-bottom:none}
        .vid2{font-family:'Share Tech Mono',monospace;font-size:12px;color:#22d3ee;display:block;margin-bottom:2px}
        .vtype{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.1em}
        .spill{display:inline-flex;align-items:center;padding:4px 10px;border-radius:20px;border:1px solid;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.12em;white-space:nowrap}
        .fuel-area{padding:14px 20px}
        .fuel-ch{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#fff;margin-bottom:16px}
        .fbars{display:flex;align-items:flex-end;gap:8px;height:130px}
        .fc{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end}
        .fb{width:100%;border-radius:2px 2px 0 0;background:#22d3ee}
        .fd{font-family:'Share Tech Mono',monospace;font-size:7px;color:#374151;margin-top:5px}
        .feff{margin-top:16px;padding:14px;background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2);border-radius:4px}
        .feff-title{font-family:'Share Tech Mono',monospace;font-size:8px;color:#a855f7;letter-spacing:0.2em;margin-bottom:8px;display:flex;align-items:center;gap:6px}
        .feff-text{font-family:'Rajdhani',sans-serif;font-size:12px;color:#9ca3af;line-height:1.5}
      `}</style>
      <PrimeTopbar/>
      <div className="page">
        <div className="ph">
          <div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#6b7280",letterSpacing:"0.2em",marginBottom:6}}>AETHER FLUX</div>
            <div className="title">Vessel Deployment</div>
          </div>
          <div className="live-badge"><div className="live-dot"/>LIVE DATA STREAMING</div>
        </div>
        {/* Stats */}
        <div className="stats">
          {[
            {label:"EN ROUTE",num:"42",sub:"VESSELS",color:"#22d3ee",icon:"🚢"},
            {label:"IN PORT",num:"18",sub:"VESSELS",color:"#a855f7",icon:"⚓"},
            {label:"DELAYED",num:"03",sub:"CRITICAL",color:"#f87171",icon:"⚠",danger:true},
            {label:"MAINTENANCE",num:"07",sub:"UNITS",color:"#a855f7",icon:"🔧"},
          ].map((s,i)=>(
            <div className={`stat-card${s.danger?" danger":""}`} key={i} style={{"--acc":s.color} as any}>
              <div className="stat-sep"/>
              <div className="stat-label">{s.label}</div>
              <div className="stat-num" style={{color:s.color}}>{s.num}</div>
              <div className="stat-sub">{s.sub}</div>
              <div className="stat-icon" style={{fontSize:48}}>{s.icon}</div>
            </div>
          ))}
        </div>
        <div className="layout2">
          <div className="panel">
            <div className="panel-hdr">
              <span className="panel-title">Recent Deployments</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
            </div>
            <table>
              <thead><tr><th>VESSEL IDENTIFIER</th><th>DESTINATION NODE</th><th>ETA (UTC)</th><th>STATUS</th></tr></thead>
              <tbody>{deployments.map((d,i)=>(
                <tr key={i}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:32,height:32,background:"rgba(168,85,247,0.15)",border:"1px solid rgba(168,85,247,0.3)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8"><path d="M3 17l2-5h14l2 5"/><path d="M5 12V8h14v4"/><path d="M8 8V5h8v3"/><line x1="12" y1="5" x2="12" y2="2"/></svg>
                      </div>
                      <div><span className="vid2">{d.id}</span><span className="vtype">{d.type}</span></div>
                    </div>
                  </td>
                  <td><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#d1d5db",fontWeight:500}}>{d.dest}</span></td>
                  <td><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:"#e5e7eb"}}>{d.eta}</span></td>
                  <td><span className="spill" style={{color:d.sc,background:d.sb,borderColor:d.sbc}}>{d.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="panel">
            <div className="fuel-area">
              <div className="fuel-ch">Daily Fuel Monitoring (Company Fleet)</div>
              <div className="fbars">{fuelH.map((h,i)=>(
                <div className="fc" key={i}>
                  <div className="fb" style={{height:`${h}%`,boxShadow:"0 0 10px rgba(34,211,238,0.4)"}}/>
                  <div className="fd">{fuelDays[i]}</div>
                </div>
              ))}</div>
              <div className="feff">
                <div className="feff-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  FLEET EFFICIENCY STATUS
                </div>
                <p className="feff-text">Total fleet efficiency is currently 12% above benchmark for all 10 active vessels. Operational performance is optimal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
