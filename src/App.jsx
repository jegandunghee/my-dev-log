import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import CardList from './components/CardList/CardList';
import './App.scss';

// 카테고리 목록 정의
const CATEGORIES = ['전체', '프론트엔드', 'UI/UX', '일상'];

// 더미 데이터 생성 (썸네일 이미지 대신 컬러 사용)
const DUMMY_POSTS = [
  {
    id: 1,
    category: '프론트엔드',
    title: 'React와 GSAP를 활용한 부드러운 스크롤 애니메이션 구현',
    description: '웹사이트의 사용자 경험을 극대화하기 위해 GSAP ScrollTrigger를 React 컴포넌트 생명주기와 통합하는 방법을 정리했습니다.',
    date: '2026.05.15',
    color: '#FF6B6B'
  },
  {
    id: 2,
    category: 'UI/UX',
    title: '글래스모피즘(Glassmorphism) 트렌드 분석 및 적용기',
    description: '최근 유행하는 글래스모피즘 스타일의 디자인 원칙과 CSS(backdrop-filter)를 활용해 웹에 직접 적용하며 느낀 점을 공유합니다.',
    date: '2026.05.10',
    color: '#4ECDC4'
  },
  {
    id: 3,
    category: '일상',
    title: '나만의 개발 포트폴리오를 기획하며',
    description: '그동안 진행했던 프로젝트들을 한곳에 모아보고, 나만의 색깔이 묻어나는 블로그형 포트폴리오를 만들기 위한 첫걸음.',
    date: '2026.05.05',
    color: '#45B7D1'
  },
  {
    id: 4,
    category: '프론트엔드',
    title: 'Vite 환경에서 SCSS BEM 방법론 적용하기',
    description: '빠른 빌드 속도를 자랑하는 Vite 환경에 SCSS를 세팅하고, BEM 네이밍 컨벤션을 통해 컴포넌트 기반 스타일링을 구성하는 방법.',
    date: '2026.04.28',
    color: '#F9CA24'
  },
  {
    id: 5,
    category: 'UI/UX',
    title: '다크 모드 디자인 시 주의할 점 3가지',
    description: '순수 블랙(#000000) 피하기, 텍스트 대비(Contrast) 맞추기 등 눈이 편안한 다크 모드 UI를 위한 핵심 디자인 가이드라인.',
    date: '2026.04.20',
    color: '#6C5CE7'
  },
  {
    id: 6,
    category: '프론트엔드',
    title: '상태 관리를 위한 Context API vs Redux 고민',
    description: '소규모 프로젝트에서 전역 상태 관리를 도입할 때 Context API로 충분한지, 언제 외부 라이브러리를 써야 할지 고찰해 보았습니다.',
    date: '2026.04.15',
    color: '#55E6C1'
  }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const titleRef = useRef(null);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // 선택된 카테고리에 맞게 데이터 필터링
  const filteredPosts = activeCategory === '전체'
    ? DUMMY_POSTS
    : DUMMY_POSTS.filter(post => post.category === activeCategory);

  // 텍스트를 한 글자씩 분리하여 렌더링하기 위한 배열
  const titleChars = "나의 개발일지".split('');

  useEffect(() => {
    // 최초 렌더링 시 메인 타이틀 파도타기(Wave Reveal) 페이드인 효과
    // React Strict Mode의 이중 렌더링 버그를 방지하기 위해 fromTo 사용
    const ctx = gsap.context(() => {
      gsap.fromTo('.app__title-char', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // 마우스 호버 시 글자가 둥둥 뜨는(Bounce Loop) 효과를 주는 핸들러
  const handleCharMouseEnter = (e) => {
    gsap.to(e.target, { y: -10, duration: 0.3, ease: 'power1.out', yoyo: true, repeat: -1 });
  };

  // 마우스가 벗어나면 원위치로 돌아오는 핸들러
  const handleCharMouseLeave = (e) => {
    gsap.killTweensOf(e.target);
    gsap.to(e.target, { y: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <div className="app">
      <Header />
      
      <main className="app__main">
        <section className="app__hero">
          <h1 className="app__title" ref={titleRef}>
            {/* 메인 타이틀을 span으로 쪼개어 개별 애니메이션 제어 */}
            {titleChars.map((char, index) => (
              <span 
                key={index} 
                className="app__title-char"
                onMouseEnter={handleCharMouseEnter}
                onMouseLeave={handleCharMouseLeave}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="app__subtitle">기록은 성장의 밑거름이 됩니다.</p>
        </section>

        <section className="app__content">
          <FilterBar 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <CardList posts={filteredPosts} />
        </section>
      </main>

      <footer className="app__footer">
        <p>&copy; {new Date().getFullYear()} 나의 개발일지. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
