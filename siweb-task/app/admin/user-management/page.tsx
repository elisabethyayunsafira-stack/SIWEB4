"use client";
import { useState } from "react";
import SereneSailTopbar from "../../ui/SereneSailTopbar";

const initialCrew = [
  { id:"SS-001", name:"Captain Elias Thorne", shift:"MORNING", title:"Commanding Officer", hours:"06:00 - 14:00", avatar:"ET" },
  { id:"SS-042", name:"Sarah Jenkins", shift:"NIGHT", title:"Chief Engineer", hours:"22:00 - 06:00", avatar:"SJ" },
  { id:"SS-109", name:"Marcus Vane", shift:"SWING", title:"Navigation Specialist", hours:"14:00 - 22:00", avatar:"MV" },
  { id:"SS-215", name:"Li Wei", shift:"MORNING", title:"Comms Technician", hours:"06:00 - 14:00", avatar:"LW" },
  { id:"SS-055", name:"Dr. Julian Ross", shift:"MORNING", title:"Chief Medical Officer", hours:"08:00 - 16:00", avatar:"JR" },
];
const shiftColor:{[k:string]:{c:string,bg:string,b:string}} = {
  MORNING:{c:"#e5e7eb",bg:"rgba(255,255,255,0.08)",b:"rgba(255,255,255,0.12)"},
  NIGHT:{c:"#9ca3af",bg:"rgba(100,100,120,0.12)",b:"rgba(100,100,120,0.2)"},
  SWING:{c:"#a855f7",bg:"rgba(168,85,247,0.1)",b:"rgba(168,85,247,0.25)"},
};

export default function UserManagementPage() {
  const [crewList, setCrewList] = useState(initialCrew);
  const [popup, setPopup] = useState<number|null>(null);
  const [notice, setNotice] = useState("Crew registry synchronized");

  const totalPersonnel = 137 + crewList.length;

  const handleRegisterCrew = () => {
    const draftNumber = crewList.length + 1;
    const newCrew = {
      id: `SS-${String(300 + draftNumber).padStart(3, "0")}`,
      name: `Pending Crew ${draftNumber}`,
      shift: "SWING",
      title: "Logistics Cadet",
      hours: "Awaiting assignment",
      avatar: "NC",
    };

    setCrewList((current) => [newCrew, ...current]);
    setPopup(0);
    setNotice(`${newCrew.id} draft crew registered`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .ph{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:flex-start;justify-content:space-between;background:rgba(15,15,26,0.5)}
        .ph-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.3em;margin-bottom:6px;display:flex;align-items:center;gap:8px}
        .ph-label::before{content:'';width:28px;height:1px;background:rgba(255,255,255,0.15)}
        .ph-title{font-family:'Rajdhani',sans-serif;font-size:26px;font-weight:700;color:#fff;letter-spacing:0.04em}
        .reg-btn{display:flex;align-items:center;gap:8px;padding:10px 18px;background:linear-gradient(90deg,#bcefff,#cf82ff);border:none;border-radius:4px;color:#1f2630;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.16em;cursor:pointer;transition:opacity 0.2s}
        .reg-btn:hover{opacity:0.88}
        .header-note{margin-top:6px;font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.16em;text-transform:uppercase}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;background:none;border-bottom:none;padding:12px 20px 0}
        .stat{background:#1d1b1c;padding:18px 20px;border:1px solid rgba(255,255,255,0.04)}
        .stat-lbl{font-family:'Share Tech Mono',monospace;font-size:7px;color:#6b7280;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:8px}
        .stat-num{font-family:'Orbitron',sans-serif;font-size:30px;font-weight:700;color:#fff;line-height:1;display:flex;align-items:center;gap:8px}
        .on-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;animation:blink 2s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .stat-num.normal{color:#22d3ee}
        table{width:100%;border-collapse:collapse}
        th{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.2em;text-align:left;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.06);font-weight:400;text-transform:uppercase;background:rgba(255,255,255,0.01)}
        td{padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle;position:relative}
        tbody tr{transition:background 0.15s;cursor:pointer}
        tbody tr:hover{background:rgba(168,85,247,0.03)}
        tbody tr:last-child td{border-bottom:none}
        .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#374151,#6b7280);display:flex;align-items:center;justify-content:center;font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;flex-shrink:0;border:1px solid rgba(255,255,255,0.1)}
        .shift-pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:3px;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.12em;border:1px solid}
        .three-dot{width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4b5563;border-radius:3px;transition:color 0.2s,background 0.2s;border:none;background:none}
        .three-dot:hover{color:#e5e7eb;background:rgba(255,255,255,0.06)}
        .popup{position:absolute;right:40px;top:8px;background:#171617;border:1px solid rgba(24,215,255,0.22);border-radius:4px;padding:14px 16px;min-width:200px;z-index:10;box-shadow:0 0 0 1px rgba(24,215,255,0.05) inset,0 8px 24px rgba(0,0,0,0.5)}
        .popup-key{font-family:'Share Tech Mono',monospace;font-size:7px;color:#6b7280;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:4px}
        .popup-val{font-family:'Rajdhani',sans-serif;font-size:13px;color:#e5e7eb;font-weight:500;margin-bottom:10px}
        .popup-val:last-child{margin-bottom:0}
        .showing{padding:14px 20px;font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.14em;text-transform:uppercase}
        .footer-bar{position:fixed;bottom:0;left:0;right:0;height:32px;background:#0a0a14;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;padding:0 24px}
        .fb-item{font-family:'Share Tech Mono',monospace;font-size:8px;color:#374151;letter-spacing:0.14em}
        .fb-item span{color:#4b5563}
      `}</style>
      <SereneSailTopbar/>
      <div className="ph">
        <div>
          <div className="ph-label">FLEET PERSONNEL COMMAND</div>
          <div className="ph-title">User Management</div>
          <div className="header-note">{notice}</div>
        </div>
        <button type="button" className="reg-btn" onClick={handleRegisterCrew}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          REGISTER NEW CREW
        </button>
      </div>
      <div className="stats-grid">
        <div className="stat"><div className="stat-lbl">ACTIVE CREW</div><div className="stat-num">{totalPersonnel}</div></div>
        <div className="stat"><div className="stat-lbl">ON DECK</div><div className="stat-num"><div className="on-dot"/>38</div></div>
        <div className="stat"><div className="stat-lbl">SHIFT OVERLAP</div><div className="stat-num">12 <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:"#6b7280"}}>HRS</span></div></div>
        <div className="stat"><div className="stat-lbl">SECURITY STATUS</div><div className="stat-num normal" style={{fontSize:22,color:"#22d3ee"}}>Normal</div></div>
      </div>
      <table>
        <thead><tr><th>USER ID</th><th>NAME</th><th>WORK SHIFT</th><th>JOB TITLE</th><th>WORKING HOURS</th><th>ACTION</th></tr></thead>
        <tbody>
          {crewList.map((c,i)=>(
            <tr key={i} onClick={()=>setPopup(popup===i?null:i)}>
              <td><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"#22d3ee",letterSpacing:"0.05em"}}>{c.id}</span></td>
              <td>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div className="avatar">{c.avatar}</div>
                  <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:14,color:"#e5e7eb",fontWeight:500}}>{c.name}</span>
                </div>
              </td>
              <td>
                <span className="shift-pill" style={{color:shiftColor[c.shift].c,background:shiftColor[c.shift].bg,borderColor:shiftColor[c.shift].b}}>
                  {c.shift}
                </span>
              </td>
              <td><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#9ca3af"}}>{c.title}</span></td>
              <td><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"#6b7280"}}>{c.hours}</span></td>
              <td style={{position:"relative"}}>
                <button type="button" className="three-dot" onClick={e=>{e.stopPropagation();setPopup(popup===i?null:i)}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
                {popup===i&&(
                  <div className="popup" onClick={e=>e.stopPropagation()}>
                    <div className="popup-key">ASSIGNED VESSEL</div>
                    <div className="popup-val">Serene Sovereign</div>
                    <div className="popup-key">CURRENT DESTINATION</div>
                    <div className="popup-val">Port of Singapore</div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="showing">DISPLAYING {crewList.length} OF {totalPersonnel} PERSONNEL</div>
      <div className="footer-bar">
        <div style={{display:"flex",gap:20}}>
          <span className="fb-item">● SYSTEM HEALTH: <span>NOMINAL</span></span>
          <span className="fb-item">CONNECTIVITY: <span>ACTIVE</span></span>
        </div>
        <div style={{display:"flex",gap:20}}>
          <span className="fb-item">TELEMETRY: <span>SYNCHRONIZED</span></span>
          <span className="fb-item">LAT: <span>24.1200 N</span></span>
          <span className="fb-item">LON: <span>80.1254 W</span></span>
        </div>
      </div>
    </>
  );
}
