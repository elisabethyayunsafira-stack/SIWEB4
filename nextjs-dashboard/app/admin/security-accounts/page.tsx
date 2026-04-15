"use client";
import { useState } from "react";
import SereneSailTopbar from "../../ui/SereneSailTopbar";

const sessions = [
  { name:"COMMANDER_ALPHA", role:"ROOT", ip:"192.168.1.104", loc:"BRIDGE TERMINAL 01", dur:"04:12:33" },
  { name:"LOGISTICS_COORD", role:"SECURE", ip:"172.16.0.45", loc:"REMOTE DECK OPS", dur:"00:45:12" },
  { name:"MAINTENANCE_BOT_04", role:"GUEST", ip:"10.0.0.12", loc:"ENGINE ROOM LINK", dur:"12:01:05" },
];
const logs = [
  { time:"14:22:01", msg:"Root access granted to terminal B-01", color:"#22c55e" },
  { time:"12:15:44", msg:"Multiple failed attempts - IP 104.22.1.9", color:"#f87171" },
  { time:"09:00:12", msg:"Protocol key rotation initiated", color:"#a855f7" },
];
const roleStyle:{[k:string]:{c:string,bg:string,b:string}} = {
  ROOT:{c:"#f87171",bg:"rgba(248,113,113,0.1)",b:"rgba(248,113,113,0.3)"},
  SECURE:{c:"#22d3ee",bg:"rgba(34,211,238,0.1)",b:"rgba(34,211,238,0.3)"},
  GUEST:{c:"#9ca3af",bg:"rgba(156,163,175,0.1)",b:"rgba(156,163,175,0.25)"},
};

export default function SecurityAccountsPage() {
  const [newKey, setNewKey] = useState("**************");
  const [confirmKey, setConfirmKey] = useState("**************");
  const [adminId, setAdminId] = useState("SRN-SAIL-ADMN-001");
  const [twofa, setTwofa] = useState(true);
  const [authing, setAuthing] = useState(false);
  const [authLetters, setAuthLetters] = useState(["S","I","G","N"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .ph{padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:flex-start;justify-content:space-between}
        .ph-pre{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:6px}
        .ph-title{font-family:'Rajdhani',sans-serif;font-size:26px;font-weight:700;color:#fff;letter-spacing:0.04em}
        .ph-right{display:flex;gap:20px;align-items:center}
        .ph-stat{text-align:right}
        .ph-stat-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.18em;margin-bottom:3px}
        .ph-stat-val{font-family:'Orbitron',sans-serif;fontSize:12px;fontWeight:700}
        .layout3{display:grid;grid-template-columns:1fr 500px;gap:0;padding:20px 24px;gap:24px;min-height:calc(100vh - 160px)}
        .lc3{display:flex;flex-direction:column;gap:16px}
        .session-card{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between}
        .session-left{display:flex;align-items:flex-start;gap:12px}
        .session-bar{width:3px;height:40px;background:rgba(168,85,247,0.5);border-radius:2px;flex-shrink:0}
        .session-name{font-family:'Share Tech Mono',monospace;font-size:11px;color:#e5e7eb;letter-spacing:0.1em;margin-bottom:4px;display:flex;align-items:center;gap:8px}
        .role-badge{font-family:'Share Tech Mono',monospace;font-size:8px;padding:2px 8px;border-radius:3px;border:1px solid}
        .session-meta{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.1em}
        .session-right{display:flex;align-items:center;gap:16px}
        .dur-label{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563;letter-spacing:0.18em;margin-bottom:3px}
        .dur-val{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:600;color:#e5e7eb}
        .force-btn{padding:8px 14px;background:none;border:1px solid rgba(168,85,247,0.4);border-radius:3px;color:#a855f7;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.14em;cursor:pointer;transition:background 0.2s,color 0.2s}
        .force-btn:hover{background:rgba(168,85,247,0.1)}
        .terminate-btn{width:100%;padding:13px;background:none;border:1px dashed rgba(168,85,247,0.3);border-radius:4px;color:#a855f7;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.22em;cursor:pointer;transition:background 0.2s}
        .terminate-btn:hover{background:rgba(168,85,247,0.05)}
        .rc3{display:flex;flex-direction:column;gap:14px}
        .cred-panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:18px}
        .cred-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;letter-spacing:0.18em}
        .cred-sub{font-family:'Rajdhani',sans-serif;font-size:12px;color:#6b7280;margin-bottom:18px;line-height:1.5}
        .field-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:7px;display:block}
        .inp{width:100%;height:44px;padding:0 14px;background:#0a0a18;border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#e5e7eb;font-family:'Share Tech Mono',monospace;font-size:12px;outline:none;transition:border-color 0.2s;margin-bottom:14px}
        .inp:focus{border-color:rgba(168,85,247,0.4)}
        .auth-section{background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2);border-radius:4px;padding:14px;margin-bottom:14px}
        .auth-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .auth-label{font-family:'Share Tech Mono',monospace;font-size:9px;color:#a855f7;letter-spacing:0.22em}
        .auth-letters{display:flex;gap:6px;margin-top:0}
        .al{width:28px;height:28px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);border-radius:3px;display:flex;align-items:center;justify-content:center;font-family:'Share Tech Mono',monospace;font-size:12px;font-weight:700;color:#a855f7}
        .exe-btn{width:100%;height:48px;background:linear-gradient(90deg,#22d3ee 0%,#a855f7 100%);border:none;border-radius:4px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;cursor:pointer;margin-bottom:14px;position:relative;overflow:hidden}
        .exe-btn::after{content:'';position:absolute;top:0;left:-100%;bottom:0;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);animation:shim 2.5s infinite}
        @keyframes shim{100%{left:200%}}
        .twofa-row{display:flex;align-items:center;justify-content:space-between}
        .twofa-label{font-family:'Share Tech Mono',monospace;font-size:9px;color:#6b7280;letter-spacing:0.14em;display:flex;align-items:center;gap:6px}
        .twofa-dot{width:8px;height:8px;border-radius:50%;background:#f87171;box-shadow:0 0 6px #f87171}
        .emrg{font-family:'Share Tech Mono',monospace;font-size:9px;color:#22d3ee;cursor:pointer;letter-spacing:0.14em;transition:color 0.2s}
        .emrg:hover{color:#67e8f9}
        .logs-panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:16px}
        .logs-title{font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb;letter-spacing:0.18em;margin-bottom:14px}
        .log-item{display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
        .log-item:last-child{border-bottom:none}
        .log-time{font-family:'Share Tech Mono',monospace;font-size:9px;min-width:60px;flex-shrink:0}
        .log-bar{width:2px;min-height:16px;border-radius:1px;flex-shrink:0;margin-top:1px}
        .log-msg{font-family:'Rajdhani',sans-serif;font-size:12px;color:#9ca3af;line-height:1.4}
        .footer-bar3{position:fixed;bottom:0;left:0;right:0;height:28px;background:#0a0a14;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;padding:0 24px}
        .fb3{font-family:'Share Tech Mono',monospace;font-size:8px;color:#374151;letter-spacing:0.12em}
        .fb3 span{color:#4b5563}
        .prog3{width:80px;height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden}
        .pf3{height:100%;width:60%;background:linear-gradient(90deg,#22d3ee,#a855f7);border-radius:2px}
      `}</style>
      <SereneSailTopbar/>
      <div className="ph">
        <div>
          <div className="ph-pre">SYSTEM PROTOCOL 9.4</div>
          <div className="ph-title">Security & Control</div>
        </div>
        <div className="ph-right">
          <div className="ph-stat">
            <div className="ph-stat-label">GLOBAL STATUS</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 7px #22c55e"}}/><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"#22c55e",letterSpacing:"0.14em"}}>ENCRYPTED</span></div>
          </div>
          <div className="ph-stat">
            <div className="ph-stat-label">ACTIVE LINKS</div>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:14,fontWeight:700,color:"#fff"}}>14 NODES</div>
          </div>
        </div>
      </div>
      <div className="layout3">
        <div className="lc3">
          {/* Remote Session Management */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#e5e7eb",letterSpacing:"0.2em"}}>REMOTE SESSION MANAGEMENT</span>
            </div>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#22d3ee",letterSpacing:"0.16em"}}>LIVE TELEMETRY</span>
          </div>
          {sessions.map((s,i)=>(
            <div className="session-card" key={i}>
              <div className="session-left">
                <div className="session-bar"/>
                <div>
                  <div className="session-name">
                    {s.name}
                    <span className="role-badge" style={{color:roleStyle[s.role].c,background:roleStyle[s.role].bg,borderColor:roleStyle[s.role].b}}>{s.role}</span>
                  </div>
                  <div className="session-meta">IP: {s.ip} &nbsp;|&nbsp; LOC: {s.loc}</div>
                </div>
              </div>
              <div className="session-right">
                <div>
                  <div className="dur-label">DURATION</div>
                  <div className="dur-val">{s.dur}</div>
                </div>
                <button className="force-btn">FORCE LOGOUT</button>
              </div>
            </div>
          ))}
          <button className="terminate-btn">TERMINATE ALL NON-ESSENTIAL SESSIONS</button>
        </div>
        <div className="rc3">
          {/* Credential Control */}
          <div className="cred-panel">
            <div className="cred-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              CREDENTIAL CONTROL
            </div>
            <p className="cred-sub">Update administrative access tokens and authorization protocols.</p>
            <label className="field-label">ADMIN IDENTIFIER</label>
            <input className="inp" type="text" value={adminId} onChange={e=>setAdminId(e.target.value)}/>
            <label className="field-label">NEW PROTOCOL KEY (PASSWORD)</label>
            <input className="inp" type="password" value={newKey} onChange={e=>setNewKey(e.target.value)}/>
            <label className="field-label">CONFIRM PROTOCOL KEY</label>
            <input className="inp" type="password" value={confirmKey} onChange={e=>setConfirmKey(e.target.value)}/>
            <div className="auth-section">
              <div className="auth-header">
                <span className="auth-label">AUTHORIZING CHANGES</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="auth-letters">
                {authLetters.map((l,i)=><div key={i} className="al">{l}</div>)}
              </div>
            </div>
            <button className="exe-btn">EXECUTE OVERRIDE</button>
            <div className="twofa-row">
              <div className="twofa-label">
                <div className="twofa-dot"/>
                2FA REQUIRED
              </div>
              <a href="#" className="emrg">EMERGENCY RECOVERY</a>
            </div>
          </div>
          {/* Recent Access Logs */}
          <div className="logs-panel">
            <div className="logs-title">RECENT ACCESS LOGS</div>
            {logs.map((l,i)=>(
              <div className="log-item" key={i}>
                <span className="log-time" style={{color:l.color}}>{l.time}</span>
                <div className="log-bar" style={{background:l.color,opacity:0.6}}/>
                <span className="log-msg">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bar3">
        <div style={{display:"flex",gap:20}}>
          <span className="fb3">● SYSTEM HEALTH: <span>NOMINAL</span></span>
          <span className="fb3">CONNECTIVITY: <span>ACTIVE</span></span>
        </div>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          <span className="fb3">TELEMETRY: <span>SYNCHRONIZED</span></span>
          <div className="prog3"><div className="pf3"/></div>
        </div>
      </div>
    </>
  );
}
