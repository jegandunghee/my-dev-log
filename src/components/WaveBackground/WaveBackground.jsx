import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./WaveBackground.scss";

/* ────────────────────────────────────────────
   파티클 색상 팔레트 (라이트/다크 공용)
──────────────────────────────────────────── */
const PARTICLE_COLORS_DARK = [
  "rgba(192,132,252,",   // 보라
  "rgba(244,114,182,",   // 핑크
  "rgba(96,165,250,",    // 파랑
  "rgba(45,212,191,",    // 청록
  "rgba(251,146,60,",    // 오렌지
];
const PARTICLE_COLORS_LIGHT = [
  "rgba(139,47,255,",    // 진보라
  "rgba(219,39,119,",    // 진핑크
  "rgba(59,130,246,",    // 진파랑
  "rgba(20,184,166,",    // 진청록
  "rgba(249,115,22,",    // 진오렌지
];

const PARTICLE_COUNT = 130;

function initParticles(W, H, isDark) {
  const colors = isDark ? PARTICLE_COLORS_DARK : PARTICLE_COLORS_LIGHT;
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const alpha = isDark
      ? (Math.random() * 0.45 + 0.25)   // 다크: 0.25~0.70
      : (Math.random() * 0.35 + 0.20);  // 라이트: 0.20~0.55
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      w: Math.random() * 3 + 2,         // 너비 2~5px
      h: Math.random() * 1.5 + 1,       // 높이 1~2.5px
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      color,
      alpha,
    };
  });
}

const WaveBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const blob1Ref  = useRef(null);
  const blob2Ref  = useRef(null);
  const blob3Ref  = useRef(null);
  const blob4Ref  = useRef(null);

  // ── GSAP 블롭 부유 + 마우스 패럴랙스 ───────────
  useEffect(() => {
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current, blob4Ref.current];
    const cfgs  = [
      { xR: 110, yR:  90, dur: 18 },
      { xR:  90, yR: 120, dur: 22 },
      { xR:  70, yR:  70, dur: 16 },
      { xR: 130, yR:  55, dur: 24 },
    ];

    const tweens = blobs.map((blob, i) =>
      gsap.to(blob, {
        x: () => (Math.random() * 2 - 1) * cfgs[i].xR,
        y: () => (Math.random() * 2 - 1) * cfgs[i].yR,
        scale: () => Math.random() * 0.35 + 0.88,
        duration: () => cfgs[i].dur + Math.random() * 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * -3.5,
      })
    );

    const onMouseMove = (e) => {
      const xN = e.clientX / window.innerWidth  - 0.5;
      const yN = e.clientY / window.innerHeight - 0.5;
      const s  = 70;
      gsap.to(blob1Ref.current, { x: `+=${xN * s}`,       y: `+=${yN * s}`,       duration: 2.5, ease: "power2.out", overwrite: "auto" });
      gsap.to(blob2Ref.current, { x: `-=${xN * s * 0.6}`, y: `-=${yN * s * 0.6}`, duration: 3.0, ease: "power2.out", overwrite: "auto" });
      gsap.to(blob3Ref.current, { x: `+=${xN * s * 1.2}`, y: `-=${yN * s * 0.9}`, duration: 2.0, ease: "power2.out", overwrite: "auto" });
      gsap.to(blob4Ref.current, { x: `-=${xN * s * 0.4}`, y: `+=${yN * s * 1.1}`, duration: 3.5, ease: "power2.out", overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      tweens.forEach(t => t.kill());
    };
  }, []);

  // ── Canvas 파티클 시스템 ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isDark = theme === "dark";
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    let particles = initParticles(W, H, isDark);
    let mouse = { x: W / 2, y: H / 2 };
    let rafId;
    const REPEL_RADIUS = 140;
    const REPEL_FORCE  = 3.5;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      particles = initParticles(W, H, isDark);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        // 마우스 반응 — 반경 내 파티클 밀어내기
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // 속도 감쇠 & 이동
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rot += p.rotSpeed;

        // 경계 처리 (반대편으로 wrap)
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // 타원형 파티클 그리기
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize",    onResize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [theme]);

  return (
    <div className={`wave-bg ${theme}`}>
      {/* SVG 필터 정의 */}
      <svg className="wave-bg__svg">
        <defs>
          <filter id="gooey" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 노이즈 텍스처 */}
      <div className="wave-bg__noise" />

      {/* GSAP 블롭 */}
      <div className="wave-bg__blobs">
        <div className="wave-bg__blob wave-bg__blob--1" ref={blob1Ref} />
        <div className="wave-bg__blob wave-bg__blob--2" ref={blob2Ref} />
        <div className="wave-bg__blob wave-bg__blob--3" ref={blob3Ref} />
        <div className="wave-bg__blob wave-bg__blob--4" ref={blob4Ref} />
      </div>

      {/* Canvas 파티클 */}
      <canvas className="wave-bg__canvas" ref={canvasRef} />
    </div>
  );
};

export default WaveBackground;
