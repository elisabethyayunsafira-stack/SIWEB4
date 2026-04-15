"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

const missions = [
  {
    number: "01",
    color: "#b66aff",
    title: "KEUNGGULAN OPERASIONAL REAL-TIME",
    description:
      "Menyediakan pemantauan armada yang presisi secara real-time untuk menjamin ketepatan waktu dan keamanan kargo di setiap rute pelayaran.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 18V10"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M9 18V6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M14 18V12"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M19 18V4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M4 18H20"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M6 9L10 5L14 8L19 3"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    color: "#0fd5ff",
    title: "INOVASI TEKNOLOGI MARITIM",
    description:
      "Terus mengembangkan sistem navigasi dan analitik berbasis data satelit yang mampu beradaptasi dengan tantangan cuaca dan teknis paling ekstrem sekalipun.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 19C8 18 11 16 13 13C16 11 18 8 19 5L14.5 6.3L10.8 10"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 14.5L6 18L3 17L4 14L7.5 10.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 6L18 10"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <circle cx="15.7" cy="8.3" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "03",
    color: "#ff7a87",
    title: "EFISIENSI DAN KEBERLANJUTAN",
    description:
      "Mengoptimalkan konsumsi bahan bakar dan utilisasi kargo untuk mengurangi jejak karbon, sekaligus menjaga efisiensi biaya operasional jangka panjang.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4C9.2 5.2 7 8.5 7 11.8C7 15.2 9.3 18 12 18C14.7 18 17 15.2 17 11.8C17 8.5 14.8 5.2 12 4Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M12 5C13.4 7 13.8 9.4 12.9 11.8C12.1 13.9 10.4 15.6 8.4 16.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ProfilePage() {
  const [aboutRef, aboutVisible] = useInView();
  const [visionRef, visionVisible] = useInView();
  const [missionRef, missionVisible] = useInView();
  const [serviceRef, serviceVisible] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Orbitron:wght@500;700;800;900&family=Share+Tech+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{
          background:
            linear-gradient(90deg, rgba(143,54,255,0.10), transparent 52px),
            linear-gradient(180deg, #090909 0%, #0a0a0a 56%, #111111 100%);
          color:#f3f3f3;
          font-family:'Barlow',sans-serif;
          overflow-x:hidden;
        }
        .page{
          position:relative;
          min-height:100vh;
          background:
            radial-gradient(circle at 50% 18%, rgba(178,74,255,0.10), transparent 24%),
            linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0));
        }
        .page::before{
          content:"";
          position:fixed;
          inset:0 auto 0 0;
          width:2px;
          background:linear-gradient(180deg, #15c8ff, rgba(21,200,255,0.1));
          pointer-events:none;
          opacity:0.85;
        }
        .page::after{
          content:"";
          position:fixed;
          inset:0 0 auto 0;
          height:1px;
          background:linear-gradient(90deg, rgba(182,106,255,0.12), rgba(182,106,255,0.02), rgba(182,106,255,0.12));
          pointer-events:none;
        }
        .topbar{
          position:sticky;
          top:0;
          z-index:20;
          height:40px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 18px;
          background:rgba(11,11,11,0.96);
          border-bottom:1px solid rgba(182,106,255,0.12);
          box-shadow:0 14px 30px rgba(121,38,196,0.08);
        }
        .brand{
          font-family:'Share Tech Mono',monospace;
          font-size:11px;
          letter-spacing:0.08em;
          color:#c482ff;
          text-transform:uppercase;
        }
        .topbar-actions{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .topbar-admin,
        .topbar-login{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-width:92px;
          height:26px;
          padding:0 12px;
          border:1px solid rgba(182,106,255,0.28);
          border-radius:999px;
          background:rgba(182,106,255,0.08);
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          text-decoration:none;
          transition:background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .topbar-admin{
          border:1px solid rgba(15,213,255,0.28);
          background:rgba(15,213,255,0.08);
          color:#8aeaff;
        }
        .topbar-admin:hover{
          background:rgba(15,213,255,0.16);
          border-color:rgba(15,213,255,0.46);
          color:#d7fbff;
        }
        .topbar-login{
          color:#d9a1ff;
        }
        .topbar-login:hover{
          background:rgba(182,106,255,0.16);
          border-color:rgba(182,106,255,0.46);
          color:#f2d8ff;
        }
        .hero{
          min-height:540px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-end;
          text-align:center;
          padding:120px 24px 46px;
        }
        .hero-mark{
          width:80px;
          height:80px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:8px;
          border:1px solid #ae35ff;
          background:rgba(173,53,255,0.06);
          color:#d9a1ff;
          box-shadow:0 0 18px rgba(173,53,255,0.28);
          margin-bottom:26px;
        }
        .hero-title{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(44px, 6vw, 58px);
          font-weight:900;
          letter-spacing:-0.05em;
          color:#f5f5f5;
          margin-bottom:14px;
        }
        .hero-subtitle{
          max-width:520px;
          font-family:'Share Tech Mono',monospace;
          font-size:13px;
          line-height:1.45;
          letter-spacing:0.28em;
          color:#09d1ff;
          text-transform:uppercase;
        }
        .section{
          width:min(100%, 1060px);
          margin:0 auto;
          padding:0 22px;
        }
        .about{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 365px;
          gap:56px;
          align-items:start;
          padding-bottom:92px;
        }
        .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:8px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.3em;
          text-transform:uppercase;
          color:#0fd5ff;
          margin-bottom:14px;
        }
        .eyebrow::before{
          content:"";
          width:32px;
          height:1px;
          background:#0fd5ff;
          opacity:0.7;
        }
        .about-title{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(50px, 7vw, 68px);
          line-height:0.95;
          font-weight:900;
          letter-spacing:-0.06em;
          color:#f5f5f5;
          margin-bottom:18px;
        }
        .about-copy{
          max-width:270px;
          font-size:14px;
          line-height:1.95;
          color:#969696;
        }
        .about-card{
          margin-top:76px;
          min-height:160px;
          padding:34px 34px 30px;
          background:#1b1b1b;
          border:1px solid rgba(255,255,255,0.04);
          box-shadow:0 0 0 1px rgba(255,255,255,0.015) inset;
        }
        .about-card-title{
          font-family:'Barlow',sans-serif;
          font-size:15px;
          font-weight:700;
          color:#0fd5ff;
          text-transform:uppercase;
          margin-bottom:18px;
        }
        .about-card-copy{
          font-size:14px;
          line-height:1.85;
          color:#8b8b8b;
        }
        .vision{
          display:grid;
          grid-template-columns:minmax(0, 1fr) 385px;
          gap:44px;
          align-items:start;
          padding:8px 22px 90px;
        }
        .pill{
          display:inline-flex;
          align-items:center;
          min-height:18px;
          padding:0 11px;
          border-left:2px solid #b66aff;
          background:rgba(182,106,255,0.10);
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.34em;
          color:#cc97ff;
          text-transform:uppercase;
          margin-bottom:26px;
        }
        .vision-title{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(44px, 6vw, 60px);
          font-weight:900;
          letter-spacing:-0.06em;
          line-height:0.9;
          margin-bottom:22px;
        }
        .vision-copy{
          max-width:390px;
          font-size:18px;
          line-height:1.22;
          color:#b4b4b4;
        }
        .vision-copy .purple{color:#c582ff;font-weight:700}
        .vision-copy .cyan{color:#14d7ff;font-weight:700}
        .vision-copy .red{color:#ff8c8c;font-weight:700}
        .vision-visual{
          position:relative;
          height:202px;
          margin-top:18px;
          border:1px solid rgba(22,202,255,0.45);
          background:
            radial-gradient(circle at 58% 38%, rgba(77,207,255,0.20), transparent 44%),
            linear-gradient(180deg, rgba(8,31,44,0.95), rgba(11,20,24,0.92));
          box-shadow:
            0 0 0 1px rgba(182,106,255,0.22),
            0 0 18px rgba(20,215,255,0.18);
          overflow:hidden;
        }
        .vision-visual::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size:28px 28px;
          opacity:0.34;
        }
        .hud-top{
          position:absolute;
          top:14px;
          left:18px;
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .hud-line{
          height:4px;
          border-radius:999px;
          background:rgba(61,214,255,0.7);
          box-shadow:0 0 9px rgba(61,214,255,0.28);
        }
        .hud-bars{
          position:absolute;
          left:108px;
          right:74px;
          bottom:44px;
          height:110px;
          display:flex;
          align-items:flex-end;
          gap:7px;
        }
        .hud-bar{
          flex:1;
          min-width:8px;
          border-radius:2px 2px 0 0;
          background:linear-gradient(180deg, rgba(126,237,255,0.95), rgba(65,184,228,0.78));
          box-shadow:0 0 12px rgba(89,226,255,0.15);
        }
        .hud-ring{
          position:absolute;
          inset:28px auto auto 176px;
          width:118px;
          height:118px;
          border-radius:50%;
          border:1px solid rgba(93,215,255,0.16);
          box-shadow:0 0 0 22px rgba(93,215,255,0.04), 0 0 0 48px rgba(93,215,255,0.02);
        }
        .hud-caption{
          position:absolute;
          left:0;
          right:0;
          bottom:28px;
          text-align:center;
          font-family:'Barlow',sans-serif;
          font-size:17px;
          letter-spacing:0.02em;
          color:#d7f8ff;
        }
        .hud-caption span{
          font-family:'Share Tech Mono',monospace;
          font-size:9px;
          letter-spacing:0.28em;
          opacity:0.48;
        }
        .missions{
          padding:2px 22px 84px;
        }
        .section-heading{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-bottom:46px;
        }
        .section-heading h2{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(52px, 6vw, 62px);
          font-weight:900;
          letter-spacing:-0.07em;
          color:#f4f4f4;
        }
        .heading-line{
          width:60px;
          height:3px;
          margin-top:10px;
          background:#c782ff;
          opacity:0.9;
        }
        .mission-grid{
          display:grid;
          grid-template-columns:repeat(3, minmax(0, 1fr));
          gap:14px;
        }
        .mission-card{
          min-height:242px;
          padding:28px 26px 26px;
          background:#171717;
          border:1px solid rgba(255,255,255,0.05);
          position:relative;
          overflow:hidden;
        }
        .mission-card::before{
          content:"";
          position:absolute;
          inset:0;
          background:radial-gradient(circle at 26% 20%, rgba(255,255,255,0.03), transparent 28%);
          pointer-events:none;
        }
        .mission-icon{
          display:inline-flex;
          color:var(--accent);
          margin-bottom:26px;
        }
        .mission-number{
          position:absolute;
          top:24px;
          right:22px;
          font-family:'Orbitron',sans-serif;
          font-size:38px;
          font-weight:800;
          letter-spacing:-0.04em;
          color:var(--accent-soft);
        }
        .mission-title{
          max-width:190px;
          font-family:'Barlow',sans-serif;
          font-size:17px;
          line-height:1.24;
          font-weight:800;
          letter-spacing:0.02em;
          color:#f1f1f1;
          text-transform:uppercase;
          margin-bottom:16px;
        }
        .mission-copy{
          max-width:220px;
          font-size:14px;
          line-height:1.85;
          color:#8f8f8f;
        }
        .services{
          padding:52px 22px 0;
          min-height:470px;
        }
        .service-header{
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          margin-bottom:34px;
        }
        .service-pill{
          display:inline-flex;
          align-items:center;
          min-height:18px;
          padding:0 10px;
          border:1px solid rgba(15,213,255,0.35);
          border-radius:999px;
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.26em;
          color:#0fd5ff;
          text-transform:uppercase;
          margin-bottom:20px;
        }
        .service-title{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(46px, 6vw, 64px);
          font-weight:900;
          letter-spacing:-0.07em;
          color:#f4f4f4;
        }
        .service-copy-wrap{
          width:min(100%, 470px);
          margin:0 auto;
          padding-left:16px;
          border-left:2px solid #962dff;
        }
        .service-copy{
          font-size:15px;
          line-height:1.82;
          color:#9a9a9a;
        }
        .footer-zone{
          margin-top:148px;
          padding:14px 32px 18px;
          border-top:1px solid rgba(255,255,255,0.05);
          background:#151515;
        }
        .footer{
          width:min(100%, 1100px);
          margin:0 auto;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
        }
        .footer-copy{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.1em;
          text-transform:uppercase;
          color:#666;
        }
        .footer-links{
          display:flex;
          gap:22px;
          flex-wrap:wrap;
        }
        .footer-links a{
          font-family:'Share Tech Mono',monospace;
          font-size:8px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#7b7b7b;
          text-decoration:none;
        }
        .reveal{
          opacity:0;
          transform:translateY(28px);
          transition:opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.show{
          opacity:1;
          transform:translateY(0);
        }
        .delay-1{transition-delay:0.08s}
        .delay-2{transition-delay:0.16s}
        .delay-3{transition-delay:0.24s}
        .delay-4{transition-delay:0.32s}
        @media (max-width: 900px){
          .about,
          .vision,
          .mission-grid{
            grid-template-columns:1fr;
          }
          .about-card{
            margin-top:0;
          }
          .mission-card{
            min-height:auto;
          }
          .footer{
            flex-direction:column;
            align-items:flex-start;
          }
        }
        @media (max-width: 640px){
          .hero{
            min-height:460px;
            padding-top:96px;
          }
          .hero-subtitle{
            font-size:11px;
            letter-spacing:0.18em;
          }
          .section{
            padding-left:16px;
            padding-right:16px;
          }
          .vision-copy{
            font-size:16px;
          }
          .vision-visual{
            height:180px;
          }
          .footer-zone{
            margin-top:100px;
            padding-left:16px;
            padding-right:16px;
          }
        }
      `}</style>

      <main className="page">
        <nav className="topbar">
          <span className="brand">SERENE SAIL</span>
          <div className="topbar-actions">
            <Link href="/admin/user-management" className="topbar-admin">
              Admin
            </Link>
            <Link href="/login" className="topbar-login">
              Login
            </Link>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-mark">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 16.8C6.4 13.5 8.3 9.2 11.9 6C13.4 8.9 14.1 12.7 14 16.8"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M12.4 5.8C15.1 7.6 17.2 10.5 18.4 16.8H14.4C14.5 12.8 13.8 9 12.4 5.8Z"
                fill="currentColor"
              />
              <path
                d="M12 3.8V16.8"
                stroke="#20101c"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M3.8 18.5C5.4 17.8 6.5 17.8 8.1 18.5C9.7 19.2 10.8 19.2 12.4 18.5C14 17.8 15.1 17.8 16.7 18.5C18.3 19.2 19.4 19.2 21 18.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M3.8 21C5.4 20.3 6.5 20.3 8.1 21C9.7 21.7 10.8 21.7 12.4 21C14 20.3 15.1 20.3 16.7 21C18.3 21.7 19.4 21.7 21 21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="hero-title">SERENE SAIL</h1>
          <p className="hero-subtitle">
            NAVIGATING THE FUTURE, ANCHORED IN PRECISION.
          </p>
        </section>

        <div ref={aboutRef} className="section">
          <section className="about">
            <div className={`reveal${aboutVisible ? " show" : ""}`}>
              <div className="eyebrow">CORPORATE IDENTITY</div>
              <h2 className="about-title">ABOUT US</h2>
              <p className="about-copy">
                Serene Sail adalah pionir solusi maritim global. Kami
                menciptakan sistem yang presisi dan mudah digunakan oleh semua
                kalangan.
              </p>
            </div>
            <div className={`about-card reveal delay-2${aboutVisible ? " show" : ""}`}>
              <h3 className="about-card-title">OUR CORE IDENTITY</h3>
              <p className="about-card-copy">
                Kami mendigitalkan pencatatan logistik tradisional menjadi
                sistem yang transparan, aman, dan dapat diakses mudah oleh siapa
                saja.
              </p>
            </div>
          </section>
        </div>

        <div ref={visionRef} className="section">
          <section className="vision">
            <div className={`reveal${visionVisible ? " show" : ""}`}>
              <div className="pill">STRATEGIC VISION</div>
              <h2 className="vision-title">VISI</h2>
              <p className="vision-copy">
                Menjadi pionir solusi logistik maritim global yang
                mengintegrasikan kecerdasan data dan teknologi mutakhir untuk
                menciptakan pelayaran yang paling <span className="purple">aman</span>,{" "}
                <span className="cyan">transparan</span>, dan{" "}
                <span className="red">berkelanjutan</span> di dunia.
              </p>
            </div>
            <div className={`vision-visual reveal delay-2${visionVisible ? " show" : ""}`}>
              <div className="hud-top">
                <div className="hud-line" style={{ width: 38 }} />
                <div className="hud-line" style={{ width: 62, opacity: 0.85 }} />
                <div className="hud-line" style={{ width: 84, opacity: 0.6 }} />
              </div>
              <div className="hud-ring" />
              <div className="hud-bars">
                {[38, 62, 78, 58, 92, 66, 84, 55, 73, 99, 68, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="hud-bar"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <div className="hud-caption">
                SAFE WORK <span>+++</span>
              </div>
            </div>
          </section>
        </div>

        <div ref={missionRef} className="section">
          <section className="missions">
            <div className={`section-heading reveal${missionVisible ? " show" : ""}`}>
              <h2>MISI</h2>
              <div className="heading-line" />
            </div>
            <div className="mission-grid">
              {missions.map((mission, index) => (
                <article
                  key={mission.number}
                  className={`mission-card reveal delay-${Math.min(index + 1, 4)}${missionVisible ? " show" : ""}`}
                  style={
                    {
                      "--accent": mission.color,
                      "--accent-soft": `${mission.color}77`,
                    } as CSSProperties
                  }
                >
                  <div className="mission-icon">{mission.icon}</div>
                  <div className="mission-number">{mission.number}</div>
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-copy">{mission.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div ref={serviceRef} className="section">
          <section className="services">
            <div className="service-header">
              <div className={`service-pill reveal${serviceVisible ? " show" : ""}`}>
                SHIPPING SOLUTIONS
              </div>
              <h2 className={`service-title reveal delay-1${serviceVisible ? " show" : ""}`}>
                LAYANAN KAMI
              </h2>
            </div>
            <div
              className={`service-copy-wrap reveal delay-2${serviceVisible ? " show" : ""}`}
            >
              <p className="service-copy">
                Standar pengemasan dengan integrasi logistik maritim yang
                presisi. Kami memastikan setiap kargo melalui rute pelayaran
                terefisienisi dengan protokol keamanan berlapis untuk menjamin
                integritas aset Anda hingga destinasi akhir.
              </p>
            </div>
          </section>
        </div>

        <div className="footer-zone">
          <footer className="footer">
            <span className="footer-copy">
              (C) 2024 SERENE SAIL GLOBAL LOGISTICS. ALL RIGHTS RESERVED.
            </span>
            <div className="footer-links">
              <a href="/admin/security-accounts">PRIVACY PROTOCOL</a>
              <a href="/reference">TERMS OF FLEET</a>
              <a href="/dashboard">SYSTEM STATUS</a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
