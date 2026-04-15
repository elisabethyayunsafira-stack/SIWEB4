"use client";
import { useState, useEffect, useRef } from "react";
import PrimeTopbar from "../ui/PrimeTopbar";

export default function MapPage() {
  const [time, setTime] = useState("10:45 AM");
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    const t = () => { const n=new Date(); let h=n.getHours(); const m=String(n.getMinutes()).padStart(2,"0"); const ap=h>=12?"PM":"AM"; h=h%12||12; setTime(`${h}:${m} ${ap}`); };
    t(); const id=setInterval(t,60000); return ()=>clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || leafletRef.current) return;
    const link = document.createElement("link"); link.rel="stylesheet"; link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
    const script = document.createElement("script"); script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      if (!mapRef.current || leafletRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current, { center:[10,80], zoom:4, zoomControl:false, attributionControl:false });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom:19 }).addTo(map);
      const makeIcon = (color:string) => L.divIcon({ className:"", html:`<div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center"><div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid ${color};opacity:0.4;animation:rpl 2s ease-out infinite"></div><svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" style="filter:drop-shadow(0 0 6px ${color})"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2z"/><path d="M3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L19 10.62V6c0-1.1-.9-2-2-2h-3V1H10v3H7c-1.1 0-2 .9-2 2v4.62l-2.28.68c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19z"/></svg></div>`, iconSize:[32,32], iconAnchor:[16,16] });
      [[15.2,78.5,"#22d3ee"],[7.8,80.2,"#a855f7"],[2.5,108.3,"#22d3ee"],[-5.8,115.2,"#a855f7"]].forEach(([lat,lng,c]) => L.marker([lat as number,lng as number],{icon:makeIcon(c as string)}).addTo(map));
      const style=document.createElement("style"); style.textContent=`@keyframes rpl{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.5);opacity:0}}.leaflet-control-attribution{display:none!important}`; document.head.appendChild(style);
      leafletRef.current = map;
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#090910;color:#e5e7eb;font-family:'Rajdhani',sans-serif;height:100%;overflow:hidden}
        .page{display:flex;flex-direction:column;height:100vh;overflow:hidden}
        #map-el{width:100%;height:100%;background:#0d1117}
        .rp{background:rgba(9,9,20,0.92);border-left:2px solid rgba(168,85,247,0.5);border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07);padding:10px 14px;pointer-events:all;backdrop-filter:blur(8px)}
        .rpl{font-family:'Share Tech Mono',monospace;font-size:7px;color:#22d3ee;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:6px}
        .rprow{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
        .rpk{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.12em}
        .rpv{font-family:'Share Tech Mono',monospace;font-size:9px;color:#e5e7eb;letter-spacing:0.06em}
        .sp{position:absolute;bottom:26px;left:0;width:226px;background:rgba(9,9,20,0.94);border-top:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);z-index:500;backdrop-filter:blur(10px)}
        .sp-row{display:flex;align-items:center;justify-content:space-between;padding:11px 18px;border-bottom:1px solid rgba(255,255,255,0.04)}
        .spk{font-family:'Share Tech Mono',monospace;font-size:8px;color:#6b7280;letter-spacing:0.16em}
        .spv{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;letter-spacing:0.05em}
        .sp-btn{margin:10px 18px 14px;width:calc(100% - 36px);height:36px;background:linear-gradient(90deg,#7c3aed,#a855f7);border:none;border-radius:3px;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.2em;cursor:pointer;position:relative;overflow:hidden}
        .sp-btn::after{content:'';position:absolute;top:0;left:-100%;bottom:0;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:shim 2.5s infinite}
        @keyframes shim{100%{left:200%}}
        .bb{position:absolute;bottom:0;left:0;right:0;height:26px;background:rgba(9,9,20,0.95);border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;padding:0 16px;z-index:500}
        .bbi{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.14em;text-transform:uppercase}
        .bbi span{color:#6b7280}
        .zb{position:absolute;right:16px;bottom:50px;display:flex;flex-direction:column;gap:4px;z-index:500}
        .zbtn{width:32px;height:32px;background:rgba(9,9,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;font-size:18px;font-family:'Share Tech Mono',monospace;backdrop-filter:blur(6px)}
        .zbtn:hover{border-color:rgba(168,85,247,0.5);color:#a855f7}
      `}</style>
      <div className="page">
        <PrimeTopbar/>
        <div style={{flex:1,position:"relative",overflow:"hidden"}}>
          <div id="map-el" ref={mapRef}/>
          {/* Right panels */}
          <div style={{position:"absolute",top:12,right:0,width:200,display:"flex",flexDirection:"column",gap:2,zIndex:500}}>
            <div className="rp">
              <div className="rpl">LIVE TELEMETRY</div>
              <div className="rprow"><span className="rpk">F-V2 SIGNAL</span><span className="rpv" style={{color:"#22d3ee"}}>98.4%</span></div>
              <div className="rprow"><span className="rpk">WEATHER</span><span className="rpv" style={{color:"#4ade80"}}>OPTIMAL</span></div>
            </div>
            <div className="rp">
              <div className="rpl">FUEL ECONOMY</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:3,height:28,marginTop:6}}>
                {[55,70,45,85,60,75,50].map((h,i)=><div key={i} style={{flex:1,height:`${h}%`,background:"#a855f7",borderRadius:"1px 1px 0 0",opacity:0.8}}/>)}
              </div>
            </div>
          </div>
          {/* Status Armada */}
          <div className="sp">
            <div style={{padding:"12px 18px 8px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:7,color:"#6b7280",letterSpacing:"0.3em",marginBottom:4}}>LIVE TELEMETRY</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:"0.08em"}}>STATUS ARMADA</span>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:7,color:"#4b5563",letterSpacing:"0.14em"}}>REGION: SE-AS2</span>
              </div>
            </div>
            <div className="sp-row"><span className="spk">ACTIVE VESSELS</span><span className="spv" style={{color:"#e5e7eb"}}>124</span></div>
            <div className="sp-row"><span className="spk">EST. ARRIVALS</span><span className="spv" style={{color:"#22d3ee"}}>18</span></div>
            <div className="sp-row" style={{borderBottom:"none"}}><span className="spk">ALERTS PENDING</span><span className="spv" style={{color:"#f87171"}}>03</span></div>
            <button className="sp-btn">GENERATE REPORT</button>
          </div>
          {/* Zoom */}
          <div className="zb">
            <div className="zbtn" onClick={()=>leafletRef.current?.zoomIn()}>+</div>
            <div className="zbtn" onClick={()=>leafletRef.current?.zoomOut()}>−</div>
            <div className="zbtn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg></div>
          </div>
          {/* Bottom bar */}
          <div className="bb">
            <div style={{display:"flex",gap:20}}><span className="bbi">● SYSTEM: <span>OPERATIONAL</span></span><span className="bbi">AUTH TOKEN: <span>X-771-KPR</span></span></div>
            <div style={{display:"flex",gap:20}}><span className="bbi">GRID: <span>MERCATOR_WGS84</span></span><span className="bbi">LATENCY: <span style={{color:"#4ade80"}}>14MS</span></span></div>
          </div>
        </div>
      </div>
    </>
  );
}
