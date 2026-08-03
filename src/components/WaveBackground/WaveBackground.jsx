import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './WaveBackground.scss';

const WaveBackground = ({ theme }) => {
  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    // 블롭들이 무작위로 부유하는 애니메이션
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current];
    
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: () => Math.random() * 200 - 100,
        y: () => Math.random() * 200 - 100,
        scale: () => Math.random() * 0.5 + 0.8,
        duration: () => Math.random() * 10 + 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * -2
      });
    });

    // 마우스 움직임에 반응하는 패럴랙스 효과
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 50;
      const yPos = (e.clientY / innerHeight - 0.5) * 50;

      gsap.to(blob1Ref.current, { x: `+=${xPos}`, y: `+=${yPos}`, duration: 2, ease: 'power2.out' });
      gsap.to(blob2Ref.current, { x: `-=${xPos * 0.5}`, y: `-=${yPos * 0.5}`, duration: 2.5, ease: 'power2.out' });
      gsap.to(blob3Ref.current, { x: `+=${xPos * 1.5}`, y: `-=${yPos * 1.2}`, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(blobs);
    };
  }, []);

  return (
    <div className={`wave-bg ${theme}`} ref={containerRef}>
      {/* SVG 필터를 이용한 Gooey (액체) 효과 */}
      <svg className="wave-bg__svg">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0  
            0 1 0 0 0  
            0 0 1 0 0  
            0 0 0 30 -10" result="gooey" />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </svg>
      <div className="wave-bg__blobs">
        <div className="wave-bg__blob wave-bg__blob--1" ref={blob1Ref}></div>
        <div className="wave-bg__blob wave-bg__blob--2" ref={blob2Ref}></div>
        <div className="wave-bg__blob wave-bg__blob--3" ref={blob3Ref}></div>
      </div>
    </div>
  );
};

export default WaveBackground;
