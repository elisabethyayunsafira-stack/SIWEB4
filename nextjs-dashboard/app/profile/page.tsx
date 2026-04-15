"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const misiItems = [
  { num: "01", color: "#a855f7", title: "KEUNGGULAN OPERASIONAL REAL-TIME", desc: "Memberikan pemantauan armada yang presisi ke seluruh rute yang presisi ke seluruh menciptakan kargo dan layanan optimal di setiap titik pelayaran." },
  { num: "02", color: "#22d3ee", title: "INOVASI TEKNOLOGI MARITIM", desc: "Terus mengembangkan sistem terdepan dan analitik. Berbasis data cerdas yang mampu beradaptasi dengan tantangan cuaca dan teknis paling ekstream sekalipun." },
  { num: "03", color: "#f472b6", title: "EFISIENSI DAN KEBERLANJUTAN", desc: "Mengoptimalkan konsumsi bahan bakar dan emisi kapal untuk memperkecil dampak lingkungan serta meningkatkan profitabilitas jangka panjang." },
];

export default function ProfilePage() {
  const router = useRouter();
  const s1 = useInView(), s2 = useInView(), s3 = useInView(), s4 = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Orbitron:wght@400;600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#05050d;color:#e5e7eb;font-family:'Barlow',sans-serif;overflow-x:hidden}
        .topbar{position:fixed;top:0;left:0;right:0;z-index:100;height:38px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:rgba(5,5,13,0.92);border-bottom:1px solid rgba(168,85,247,0.12);backdrop-filter:blur(10px)}
        .tb-brand{font-family:'Share Tech Mono',monospace;font-size:10px;color:#a855f7;letter-spacing:0.3em}
        .tb-links{display:flex;gap:20px;align-items:center}
        .tb-links a{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;letter-spacing:0.18em;text-decoration:none;text-transform:uppercase;transition:color 0.2s}
        .tb-links a:hover{color:#9ca3af}
        .login-btn{font-family:'Share Tech Mono',monospace;font-size:9px;color:#fff;letter-spacing:0.2em;padding:6px 16px;background:linear-gradient(90deg,#7c3aed,#a855f7);border:none;border-radius:3px;cursor:pointer;transition:opacity 0.2s}
        .login-btn:hover{opacity:0.88}
        .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px 60px;position:relative;overflow:hidden}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)}
        .hero-glow{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:500px;height:300px;background:radial-gradient(ellipse,rgba(168,85,247,0.08),transparent 70%);pointer-events:none}
        .logo-wrap{width:68px;height:68px;margin:0 auto 24px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.35);border-radius:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(168,85,247,0.2);animation:float 4s ease-in-out infinite;position:relative;z-index:2}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .hero-title{font-family:'Orbitron',sans-serif;font-size:clamp(36px,6vw,56px);font-weight:900;color:#fff;letter-spacing:0.12em;margin-bottom:14px;position:relative;z-index:2;text-shadow:0 0 40px rgba(168,85,247,0.3)}
        .hero-sub{font-family:'Share Tech Mono',monospace;font-size:10px;color:#a855f7;letter-spacing:0.3em;text-transform:uppercase;position:relative;z-index:2;margin-bottom:32px}
        .hero-cta{position:relative;z-index:2;display:flex;gap:12px;align-items:center}
        .cta-primary{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.22em;color:#fff;padding:14px 28px;background:linear-gradient(90deg,#7c3aed,#a855f7);border:none;border-radius:4px;cursor:pointer;position:relative;overflow:hidden;transition:opacity 0.2s}
        .cta-primary:hover{opacity:0.9}
        .cta-primary::after{content:'';position:absolute;top:0;left:-100%;bottom:0;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);animation:shim 2.5s infinite}
        @keyframes shim{100%{left:200%}}
        .cta-secondary{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a855f7;padding:13px 22px;background:none;border:1px solid rgba(168,85,247,0.35);border-radius:4px;cursor:pointer;transition:background 0.2s,color 0.2s}
        .cta-secondary:hover{background:rgba(168,85,247,0.08);color:#c084fc}
        .scroll-line{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);width:1px;height:40px;background:linear-gradient(to bottom,transparent,#a855f7);animation:sl 2s ease-in-out infinite}
        @keyframes sl{0%{transform:translateX(-50%) scaleY(0);transform-origin:top}50%{transform:translateX(-50%) scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:translateX(-50%) scaleY(0);transform-origin:bottom}}
        .about-section{max-width:980px;margin:0 auto;padding:80px 40px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
        .about-label{font-family:'Share Tech Mono',monospace;font-size:7px;color:#a855f7;letter-spacing:0.3em;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .about-label::before{content:'';width:3px;height:12px;background:#a855f7;border-radius:2px;flex-shrink:0}
        .about-title{font-family:'Orbitron',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:900;color:#fff;letter-spacing:0.06em;margin-bottom:16px}
        .about-text{font-family:'Barlow',sans-serif;font-size:13px;color:#9ca3af;line-height:1.75}
        .about-right{background:#0a0a18;border:1px solid rgba(168,85,247,0.2);border-radius:8px;padding:20px;position:relative;overflow:hidden}
        .about-right-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#a855f7;letter-spacing:0.28em;margin-bottom:14px}
        .about-right-text{font-family:'Barlow',sans-serif;font-size:12px;color:#9ca3af;line-height:1.7}
        .visi-section{max-width:980px;margin:0 auto;padding:60px 40px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .visi-title{font-family:'Orbitron',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:900;color:#fff;letter-spacing:0.06em;margin-bottom:20px}
        .visi-text{font-family:'Barlow',sans-serif;font-size:14px;color:#9ca3af;line-height:1.75}
        .visi-text strong{color:#a855f7;font-style:italic}
        .visi-visual{position:relative;border:1px solid rgba(168,85,247,0.25);border-radius:8px;overflow:hidden;background:#0a0a18;aspect-ratio:4/3;box-shadow:0 0 40px rgba(168,85,247,0.1)}
        .mock-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(168,85,247,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.06) 1px,transparent 1px);background-size:20px 20px}
        .mock-glow{position:absolute;top:25%;left:50%;transform:translateX(-50%);width:120px;height:120px;background:radial-gradient(circle,rgba(34,211,238,0.15),transparent 70%);border-radius:50%;animation:gp 3s ease-in-out infinite}
        @keyframes gp{0%,100%{opacity:0.6;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.2)}}
        .mock-bars{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:5px;height:70px}
        .mock-bar{width:10px;border-radius:2px 2px 0 0;animation:bg 2s ease-in-out infinite alternate}
        @keyframes bg{from{transform:scaleY(0.7)}to{transform:scaleY(1)}}
        .mock-bar:nth-child(1){height:40%;background:#a855f7;animation-delay:0s}
        .mock-bar:nth-child(2){height:70%;background:#22d3ee;animation-delay:0.1s}
        .mock-bar:nth-child(3){height:55%;background:#a855f7;animation-delay:0.2s}
        .mock-bar:nth-child(4){height:90%;background:#22d3ee;animation-delay:0.3s}
        .mock-bar:nth-child(5){height:65%;background:#a855f7;animation-delay:0.4s}
        .mock-bar:nth-child(6){height:80%;background:#22d3ee;animation-delay:0.5s}
        .mock-safe{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-family:'Share Tech Mono',monospace;font-size:8px;color:#22d3ee;letter-spacing:0.2em;z-index:5}
        .misi-section{max-width:980px;margin:0 auto;padding:60px 40px 40px}
        .misi-title{font-family:'Orbitron',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:900;color:#fff;letter-spacing:0.08em;text-align:center;margin-bottom:50px}
        .misi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
        .misi-card{padding:28px 24px;border-right:1px solid rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.06);position:relative;transition:background 0.2s}
        .misi-card:last-child{border-right:none}
        .misi-card:hover{background:rgba(168,85,247,0.03)}
        .misi-num{font-family:'Orbitron',sans-serif;font-size:26px;font-weight:900;color:rgba(255,255,255,0.05);position:absolute;top:20px;right:20px}
        .misi-card-title{font-family:'Share Tech Mono',monospace;font-size:9px;color:#e5e7eb;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:10px;line-height:1.5}
        .misi-card-desc{font-family:'Barlow',sans-serif;font-size:12px;color:#6b7280;line-height:1.7}
        .layanan-section{max-width:980px;margin:0 auto;padding:60px 40px 40px;text-align:center}
        .layanan-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:#a855f7;letter-spacing:0.3em;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:8px}
        .layanan-label::before,.layanan-label::after{content:'';flex:1;height:1px;background:rgba(168,85,247,0.2)}
        .layanan-title{font-family:'Orbitron',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:900;color:#fff;letter-spacing:0.08em;margin-bottom:24px}
        .layanan-text{font-family:'Barlow',sans-serif;font-size:14px;color:#9ca3af;line-height:1.75;max-width:600px;margin:0 auto 32px}
        .layanan-cta{display:flex;gap:12px;justify-content:center}
        .footer{border-top:1px solid rgba(255,255,255,0.06);padding:18px 40px;display:flex;align-items:center;justify-content:space-between;margin-top:60px}
        .footer-copy{font-family:'Share Tech Mono',monospace;font-size:7px;color:#374151;letter-spacing:0.1em;text-transform:uppercase}
        .footer-links{display:flex;gap:18px}
        .footer-links a{font-family:'Share Tech Mono',monospace;font-size:8px;color:#4b5563;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;transition:color 0.2s}
        .footer-links a:hover{color:#9ca3af}
        .fade-up{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .fade-up.on{opacity:1;transform:translateY(0)}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}
        @media(max-width:680px){.about-section,.visi-section{grid-template-columns:1fr;gap:32px}.misi-grid{grid-template-columns:1fr}.misi-card{border-right:none}}
      `}</style>

      {/* TOPBAR */}
      <nav className="topbar">
        <span className="tb-brand">SERENE SAIL</span>
        <div className="tb-links">
          <a href="#">PRIVACY PROTOCOL</a>
          <a href="#">TERMS OF USE</a>
          <a href="#">SYSTEM STATUS</a>
          <button className="login-btn" onClick={() => router.push("/login")}>→ SYSTEM LOGIN</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" /><div className="hero-glow" />
        <div className="logo-wrap">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M3 17 Q5.5 8 8.5 12 Q10.5 15 12 10 Q13.5 5 16.5 8 Q18.5 11 21 17 Z" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 10 L12 3" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9.5 4 L12 3 L14.5 4" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 19 Q12 23 21 19" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <h1 className="hero-title">SERENE SAIL</h1>
        <p className="hero-sub">NAVIGATING THE FUTURE, ANCHORED IN PRECISION.</p>
        <div className="hero-cta">
          <button className="cta-primary" onClick={() => router.push("/login")}>
            INITIATE ACCESS →
          </button>
          <button className="cta-secondary" onClick={() => router.push("/dashboard")}>
            VIEW DASHBOARD
          </button>
        </div>
        <div className="scroll-line" />
      </section>

      {/* ABOUT */}
      <div ref={s1.ref}>
        <section className="about-section">
          <div className={`fade-up${s1.v ? " on" : ""}`}>
            <div className="about-label">ABOUT US</div>
            <h2 className="about-title">ABOUT US</h2>
            <p className="about-text">Serene Sail adalah pionir solusi logistik maritim global yang mengintegrasikan kecerdasan data dan teknologi mutakhir untuk memudahkan digunakan oleh seluruh kalangan.</p>
          </div>
          <div className={`about-right fade-up d2${s1.v ? " on" : ""}`}>
            <div className="about-right-label">OUR CORE IDENTITY</div>
            <p className="about-right-text">Kami menghadirkan sistem monitoring maritim terbaik yang mampu beroperasi cepat, akurat, dan aman dalam situasi dan kondisi cuaca apapun juga.</p>
          </div>
        </section>
      </div>

      {/* VISI */}
      <div ref={s2.ref}>
        <section className="visi-section">
          <div className={`fade-up${s2.v ? " on" : ""}`}>
            <div className="about-label" style={{ marginBottom: 16 }}>STRATEGIC VISION</div>
            <h2 className="visi-title">VISI</h2>
            <p className="visi-text">Menjadi pionir solusi logistik maritim global yang mengintegrasikan kecerdasan data dan teknologi mutakhir untuk menciptakan pelayaran yang paling <strong>aman</strong>, <strong>transparan</strong>, dan <strong>berkelanjutan</strong> di dunia.</p>
          </div>
          <div className={`visi-visual fade-up d2${s2.v ? " on" : ""}`}>
            <div className="mock-grid" /><div className="mock-glow" />
            <div className="mock-bars">{[1, 2, 3, 4, 5, 6, 7].map((_, i) => <div key={i} className="mock-bar" />)}</div>
            <div className="mock-safe">SAFE WORK</div>
          </div>
        </section>
      </div>

      {/* MISI */}
      <div ref={s3.ref}>
        <section className="misi-section">
          <h2 className={`misi-title fade-up${s3.v ? " on" : ""}`}>MISI</h2>
          <div className="misi-grid">
            {misiItems.map((m, i) => (
              <div key={i} className={`misi-card fade-up d${i + 1}${s3.v ? " on" : ""}`}>
                <div className="misi-num">{m.num}</div>
                <div style={{ marginBottom: 14 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.6">
                    {i === 0 && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
                    {i === 1 && <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>}
                    {i === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  </svg>
                </div>
                <div className="misi-card-title">{m.title}</div>
                <p className="misi-card-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* LAYANAN */}
      <div ref={s4.ref}>
        <section className="layanan-section">
          <div className={`layanan-label fade-up${s4.v ? " on" : ""}`}>LAYANAN SOLUTIONS</div>
          <h2 className={`layanan-title fade-up d1${s4.v ? " on" : ""}`}>LAYANAN KAMI</h2>
          <p className={`layanan-text fade-up d2${s4.v ? " on" : ""}`}>Sistem pengawasan navigasi terpadu logistik maritim yang canggih. Kami menyediakan solusi komprehensif berupa tata kelayanan kefisienan dengan produk keamanan terbaik untuk menjamin integritas aset Armada.</p>
          <div className={`layanan-cta fade-up d3${s4.v ? " on" : ""}`}>
            <button className="cta-primary" onClick={() => router.push("/login")}>MASUK KE SISTEM →</button>
            <button className="cta-secondary" onClick={() => router.push("/admin/user-management")}>ADMIN PANEL</button>
          </div>
        </section>
      </div>

      <footer className="footer">
        <span className="footer-copy">© 2024 SERENE SAIL GLOBAL LOGISTICS. ALL RIGHTS RESERVED.</span>
        <div className="footer-links">
          <a href="#">PRIVACY PROTOCOL</a>
          <a href="#">TERMS OF USE</a>
          <a href="#">SYSTEM STATUS SE</a>
        </div>
      </footer>
    </>
  );
}
