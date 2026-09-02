import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import CardList from './components/CardList/CardList';
import CardSkeleton from './components/CardSkeleton/CardSkeleton';
import WaveBackground from './components/WaveBackground/WaveBackground';
import Footer from './components/Footer/Footer';
import FloatingTopBtn from './components/FloatingTopBtn/FloatingTopBtn';
import './App.scss';

// 썸네일 이미지 임포트
import imgReactGsap from './assets/images/post_react_gsap.png';
import imgGlassmorphism from './assets/images/post_glassmorphism.png';
import imgPortfolio from './assets/images/post_portfolio.png';
import imgViteScss from './assets/images/post_vite_scss.png';
import imgContextRedux from './assets/images/post_context_redux.png';
import imgDarkMode from './assets/images/post_darkmode.png';

// 카테고리 목록 정의
const CATEGORIES = ['전체', '프론트엔드', 'UI/UX', '일상'];

const DICT = {
  ko: { title: "나의 개발일지", subtitle: "기록은 성장의 밑거름이 됩니다.", footer: "나의 개발일지. All rights reserved." },
  en: { title: "My Dev Log", subtitle: "Records become the foundation of growth.", footer: "My Dev Log. All rights reserved." }
};

// 더미 데이터 생성 (썸네일 이미지 대신 컬러 사용)
const DUMMY_POSTS = [
  {
    id: 1,
    category: '프론트엔드',
    title: 'React와 GSAP를 활용한 부드러운 스크롤 애니메이션 구현',
    description: '웹사이트의 사용자 경험을 극대화하기 위해 GSAP ScrollTrigger를 React 컴포넌트 생명주기와 통합하는 방법을 정리했습니다.',
    date: '2026.05.15',
    color: '#FF6B6B',
    image: imgReactGsap
  },
  {
    id: 2,
    category: 'UI/UX',
    title: '글래스모피즘(Glassmorphism) 트렌드 분석 및 적용기',
    description: '최근 유행하는 글래스모피즘 스타일의 디자인 원칙과 CSS(backdrop-filter)를 활용해 웹에 직접 적용하며 느낀 점을 공유합니다.',
    date: '2026.05.10',
    color: '#4ECDC4',
    image: imgGlassmorphism
  },
  {
    id: 3,
    category: '일상',
    title: '나만의 개발 포트폴리오를 기획하며',
    description: '그동안 진행했던 프로젝트들을 한곳에 모아보고, 나만의 색깔이 묻어나는 블로그형 포트폴리오를 만들기 위한 첫걸음.',
    date: '2026.05.05',
    color: '#45B7D1',
    image: imgPortfolio
  },
  {
    id: 4,
    category: '프론트엔드',
    title: 'Vite 환경에서 SCSS BEM 방법론 적용하기',
    description: '빠른 빌드 속도를 자랑하는 Vite 환경에 SCSS를 세팅하고, BEM 네이밍 컨벤션을 통해 컴포넌트 기반 스타일링을 구성하는 방법.',
    date: '2026.04.28',
    color: '#F9CA24',
    image: imgViteScss
  },
  {
    id: 5,
    category: 'UI/UX',
    title: '다크 모드 디자인 시 주의할 점 3가지',
    description: '순수 블랙(#000000) 피하기, 텍스트 대비(Contrast) 맞추기 등 눈이 편안한 다크 모드 UI를 위한 핵심 디자인 가이드라인.',
    date: '2026.04.20',
    color: '#6C5CE7',
    image: imgDarkMode
  },
  {
    id: 6,
    category: '프론트엔드',
    title: '상태 관리를 위한 Context API vs Redux 고민',
    description: '소규모 프로젝트에서 전역 상태 관리를 도입할 때 Context API로 충분한지, 언제 외부 라이브러리를 써야 할지 고찰해 보았습니다.',
    date: '2026.04.15',
    color: '#55E6C1',
    image: imgContextRedux
  }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const titleRef = useRef(null);

  useEffect(() => {
    // 가상의 데이터 로딩 시간 1.2초로 단축하여 스피디한 경험 제공
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // 선택된 카테고리에 맞게 데이터 필터링
  const filteredPosts = DUMMY_POSTS.filter(post => {
    const matchCategory = activeCategory === '전체' || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 텍스트를 한 글자씩 분리하여 렌더링하기 위한 배열
  const titleChars = DICT[language].title.split('');

  useEffect(() => {
    // 최초 렌더링 시 메인 타이틀 파도타기(Wave Reveal) 페이드인 효과
    // React Strict Mode의 이중 렌더링 버그를 방지하기 위해 fromTo 사용
    const ctx = gsap.context(() => {
      gsap.fromTo('.app__title-char', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.2 // 스켈레톤과 비슷한 타이밍에 나타나도록 약간의 딜레이
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
      <WaveBackground theme={theme} />
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        language={language} 
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="app__main">
        <section className="app__hero">
          <h1 className="app__title" ref={titleRef} key={language}>
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
          <p className="app__subtitle">{DICT[language].subtitle}</p>
        </section>

        <section className="app__content">
          <FilterBar 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          {isLoading ? (
            <div className="card-list">
              {[1, 2, 3, 4, 5, 6].map((key) => (
                <CardSkeleton key={key} />
              ))}
            </div>
          ) : (
            <CardList posts={filteredPosts} />
          )}
        </section>
      </main>

      <Footer language={language} dict={DICT} />
      <FloatingTopBtn />
    </div>
  );
}

export default App;
