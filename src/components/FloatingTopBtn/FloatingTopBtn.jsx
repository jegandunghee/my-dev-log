import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowUp } from 'react-icons/fa';
import './FloatingTopBtn.scss';

gsap.registerPlugin(ScrollTrigger);

const FloatingTopBtn = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    // 300px 이상 스크롤 했을 때 버튼 등장
    gsap.fromTo(btnRef.current, 
      { autoAlpha: 0, scale: 0.5, y: 20 },
      { 
        autoAlpha: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.3,
        scrollTrigger: {
          trigger: "body",
          start: "150px top",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="floating-top-btn" ref={btnRef} onClick={scrollToTop} aria-label="Scroll to Top">
      <FaArrowUp />
    </button>
  );
};

export default FloatingTopBtn;
