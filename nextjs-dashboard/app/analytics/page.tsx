"use client";
import { useState, useEffect } from "react";
import PrimeTopbar from "../ui/PrimeTopbar";

const fuelData = [{c:"#f472b6",h:55,l:"MERCURIUS"},{c:"#a78bfa",h:72,l:"ORION"},{c:"#f472b6",h:48,l:"SATURNUS"},{c:"#22d3ee",h:85,l:"MARS"},{c:"#22d3ee",h:92,l:"JUPITER"},{c:"#a78bfa",h:68,l:"BUMI"},{c:"#f472b6",h:58,l:"MOOON"}];
const vessels3 = [{id:"PL-4822",name:"Bumi",cap:94,color:"#a855f7"},{id:"PL-9011",name:"Moon",cap:78,color:"#22d3ee"},{id:"PL-3310",name:"Mars",cap:42,color:"#f87171"}];
const locations = [
  {id:"PL-4822 Bumi",coord:"1.2902° N, 103.6519° E",region:"Selat Singapura",color:"#22d3ee"},
  {id:"PL-9011 Moon",coord:"22.3193° N, 114.1694° E",region:"Hong Kong Port",color:"#22d3ee"},
  {id:"PL-3310 Mars",coord:"34.6937° N, 135.5023° E",region:"Teluk Osaka",color:"#f87171"},
];

export default function AnalyticsPage() {
  const [time, setTime] = useState("10:45 AM");
  useEffect(() => {
    const t=()=>{const n=new Date();let h=n.getHours();const m=String(n.getMinutes()).padStart(2,"0");const ap=h>=12?"PM":"AM";h=h%12||12;setTime(`${h}:${m} ${ap}`);};
    t(); const id=setInterval(t,60000); return ()=>clearInterval(id);
  },[]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#0a0a10;color:#e5e7eb;font-family:'Rajdhani',sans-serif;min-height:100vh}
        .pg{padding:20px 24px;display:grid;grid-template-columns:1fr 360px;gap:20px;min-height:calc(100vh - 46px)}
        .lc{display:flex;flex-direction:column;gap:16px}
        .rc{display:flex;flex-direction:column;gap:14px}
        .panel{background:#0f0f1a;border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden}
        .kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
        .kpi{padding:20px 22px;border-right:1px solid rgba(255,255,255,0.07);position:relative;overflow:hidden}
        .kpi:last-child{border-right:none}
        .kpi-label{font-family:'Share Tech Mono',monospace;font-size:7px;color:#6b7280;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:10px}
        .kpi-num{font-family:'Orbitron',sans-serif;font-size:36px;font-weight:700;line-height:1;margin-bottom:6px}
        .kpi-unit{font-family:'Share Tech Mono',monospace;font-size:14px;color:#6b7280;margin-left:4px}
        .kpi-sub{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.14em}
        .kpi-icon{position:absolute;top:16px;right:16px;opacity:0.2}
        .kpi-border-l{position:absolute;left:0;top:0;bottom:0;width:3px}
        .bahan-section{padding:16px 20px}
        .bahan-title{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;color:#fff;margin-bottom:16px}
        .bbars{display:flex;align-items:flex-end;gap:8px;height:140px;padding-bottom:4px}
        .bcol{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end}
        .bbar{width:100%;border-radius:2px 2px 0 0;min-height:4px}
        .blbl{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563;margin-top:6px;text-align:center}
        .loc-section{padding:16px 20px}
        .loc-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .loc-title{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;color:#fff}
        .live-fd{display:flex;align-items:center;gap:6px;font-family:'Share Tech Mono',monospace;font-size:9px;color:#f87171;letter-spacing:0.16em}
        .loc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .loc-card{background:#0a0a18;border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:14px}
        .loc-id{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.1em;margin-bottom:10px}
        .loc-key{font-family:'Share Tech Mono',monospace;font-size:7px;color:#4b5563;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:3px}
        .loc-val{font-family:'Share Tech Mono',monospace;font-size:9px;color:#9ca3af;letter-spacing:0.06em;margin-bottom:8px}
        .sys-sec{padding:8px 20px;border-top:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;gap:8px}
        .sys-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;animation:blink 2s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .sys-txt{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.14em}
        .cargo-panel{}
        .cargo-hdr{padding:14px 16px 10px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:start}
        .cargo-title{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#fff;margin-bottom:3px}
        .cargo-sub{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.1em}
        .cargo-log{font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.14em;cursor:pointer;display:flex;align-items:center;gap:4px}
        .cargo-item{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04)}
        .cargo-item:last-child{border-bottom:none}
        .cargo-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .cid{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.06em}
        .cpct{font-family:'Share Tech Mono',monospace;font-size:10px;color:#e5e7eb}
        .ctrack{height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden}
        .cfill{height:100%;border-radius:3px;transition:width 0.6s ease}
        .op-panel{}
        .op-hdr{padding:14px 16px 10px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .op-title{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#fff}
        .op-stats{display:grid;grid-template-columns:1fr 1fr;padding:14px 16px;gap:8px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .ops-num{font-family:'Orbitron',sans-serif;font-size:28px;font-weight:700;line-height:1;margin-bottom:3px}
        .ops-lbl{font-family:'Share Tech Mono',monospace;font-size:7px;color:#6b7280;letter-spacing:0.16em}
        .donut-wrap{display:flex;align-items:center;justify-content:center;padding:16px}
        .donut{position:relative;width:100px;height:100px}
        .donut-txt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .donut-pct{font-family:'Orbitron',sans-serif;font-size:20px;font-weight:700;color:#a855f7}
        .donut-sub{font-family:'Share Tech Mono',monospace;font-size:7px;color:#6b7280;letter-spacing:0.1em;text-align:center;margin-top:2px}
      `}</style>
      <PrimeTopbar/>
      <div style={{padding:"20px 24px 0",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"#fff",letterSpacing:"0.02em",marginBottom:4}}>Analytics</div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#6b7280"}}>Surveilans data real-time untuk armada PrimeLog.</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#4b5563",letterSpacing:"0.14em"}}>TERAKHIR DIPERBARUI</div>
          <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:16,fontWeight:700,color:"#fff"}}>{time}</div>
        </div>
      </div>
      <div className="pg">
        <div className="lc">
          {/* KPI Cards */}
          <div className="panel kpi-grid">
            {[
              {label:"CARGO ARRIVAL RATE",num:"88.2",unit:"%",sub:"◉ SUCCESS DELIVERY",subC:"#22d3ee",accent:"#a855f7",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>},
              {label:"AVERAGE ETA ACCURACY",num:"92",unit:"%",sub:"↑ +2.4% MOM",subC:"#4ade80",accent:"#22d3ee",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>},
              {label:"FUEL EFFICIENCY INDEX",num:"0.85",unit:" L/nm",sub:"◉ OPTIMAL RANGE",subC:"#f87171",accent:"#f87171",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V8.5C3 7.1 4.1 6 5.5 6S8 7.1 8 8.5V16h8V8.5C16 7.1 17.1 6 18.5 6S21 7.1 21 8.5V22"/><line x1="3" y1="12" x2="21" y2="12"/></svg>},
            ].map((k,i)=>(
              <div className="kpi" key={i}>
                <div className="kpi-border-l" style={{background:k.accent}}/>
                <div className="kpi-label">{k.label}</div>
                <div style={{marginBottom:6}}><span className="kpi-num" style={{color:"#fff"}}>{k.num}</span><span className="kpi-unit">{k.unit}</span></div>
                <div className="kpi-sub" style={{color:k.subC}}>{k.sub}</div>
                <div className="kpi-icon" style={{color:k.accent}}>{k.icon}</div>
              </div>
            ))}
          </div>
          {/* Bahan Bakar Chart */}
          <div className="panel">
            <div className="bahan-section">
              <div className="bahan-title">Bahan Bakar</div>
              <div className="bbars">{fuelData.map((b,i)=>(
                <div className="bcol" key={i}>
                  <div className="bbar" style={{height:`${b.h}%`,background:b.c,boxShadow:`0 0 8px ${b.c}55`}}/>
                  <div className="blbl">{b.l}</div>
                </div>
              ))}</div>
            </div>
          </div>
          {/* Lokasi Terakhir */}
          <div className="panel">
            <div className="loc-section">
              <div className="loc-header">
                <div>
                  <div className="loc-title">LOKASI TERAKHIR</div>
                  <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,color:"#6b7280",marginTop:3}}>Tracking koordinat real-time unit utama PrimeLog.</div>
                </div>
                <div className="live-fd"><div style={{width:6,height:6,borderRadius:"50%",background:"#f87171",boxShadow:"0 0 6px #f87171",animation:"blink 1s ease-in-out infinite"}}/> LIVE FEED</div>
              </div>
              <div className="loc-grid">{locations.map((l,i)=>(
                <div className="loc-card" key={i}>
                  <div className="loc-id" style={{color:l.color}}>{l.id}</div>
                  <div className="loc-key">COORDINATES</div>
                  <div className="loc-val">{l.coord}</div>
                  <div className="loc-key">REGION</div>
                  <div className="loc-val" style={{marginBottom:0}}>{l.region}</div>
                </div>
              ))}</div>
            </div>
            <div className="sys-sec">
              <div className="sys-dot"/>
              <span className="sys-txt">SYSTEM SECURE: AES-256 ENCRYPTED STREAM</span>
            </div>
          </div>
        </div>
        <div className="rc">
          {/* Kapasitas Kargo */}
          <div className="panel cargo-panel">
            <div className="cargo-hdr">
              <div>
                <div className="cargo-title">KAPASITAS KARGO PER KAPAL</div>
                <div className="cargo-sub">Persentase muatan aktif terhadap kapasitas maksimal unit.</div>
              </div>
              <div className="cargo-log">AUDIT LOG <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>
            </div>
            {vessels3.map((v,i)=>(
              <div className="cargo-item" key={i}>
                <div className="cargo-row">
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:8,padding:"2px 6px",borderRadius:2,background:`${v.color}22`,color:v.color,border:`1px solid ${v.color}44`}}>{v.id}</span>
                    <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:"#e5e7eb",fontWeight:500}}>{v.name}</span>
                  </div>
                  <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:v.color}}>{v.cap}% Capacity</span>
                </div>
                <div className="ctrack"><div className="cfill" style={{width:`${v.cap}%`,background:v.color,boxShadow:`0 0 8px ${v.color}55`}}/></div>
              </div>
            ))}
          </div>
          {/* Operational Status */}
          <div className="panel op-panel">
            <div className="op-hdr"><div className="op-title">Operational Status</div></div>
            <div className="op-stats">
              <div><div className="ops-num" style={{color:"#fff"}}>18</div><div className="ops-lbl">DI PELABUHAN</div></div>
              <div><div className="ops-num" style={{color:"#f87171"}}>04</div><div className="ops-lbl">PEMELIHARAAN</div></div>
            </div>
            <div className="donut-wrap">
              <div className="donut">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12"
                    strokeDasharray={`${2*Math.PI*40*0.75} ${2*Math.PI*40*0.25}`}
                    strokeDashoffset={2*Math.PI*40*0.25}
                    strokeLinecap="round"
                    style={{filter:"drop-shadow(0 0 8px rgba(168,85,247,0.5))"}}
                    transform="rotate(-90 50 50)"/>
                </svg>
                <div className="donut-txt">
                  <div className="donut-pct">75%</div>
                  <div className="donut-sub">DALAM<br/>PERJALANAN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
