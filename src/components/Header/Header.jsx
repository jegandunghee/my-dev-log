import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FaLaptopCode, FaGithub, FaEnvelope, FaMoon, FaSun, FaGlobe, FaSearch } from 'react-icons/fa';
import './Header.scss';

// 상단 고정 헤더 (글래스모피즘 적용)
const Header = ({ theme, setTheme, language, setLanguage, searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isSearchOpen) {
      gsap.to(searchInputRef.current, { width: 150, padding: '0 10px', opacity: 1, duration: 0.3, ease: 'power2.out' });
      searchInputRef.current.focus();
    } else {
      gsap.to(searchInputRef.current, { width: 0, padding: '0', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isSearchOpen]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <FaLaptopCode className="header__logo-icon" />
          <span className="header__logo-text">{language === 'ko' ? '나의 개발일지' : 'My Dev Log'}</span>
        </div>
        
        <div className="header__controls">
          <div className="header__search">
            <input 
              type="text" 
              ref={searchInputRef}
              className="header__search-input" 
              placeholder={language === 'ko' ? '검색어 입력' : 'Search'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="header__control-btn" onClick={toggleSearch}>
              <FaSearch />
            </button>
          </div>
          
          <button className="header__control-btn" onClick={toggleLanguage}>
            <FaGlobe />
            <span className="header__lang-text">{language.toUpperCase()}</span>
          </button>
          
          <button className="header__control-btn" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        <div className="header__socials">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="header__social-link">
            <FaGithub />
          </a>
          <a href="mailto:example@email.com" className="header__social-link">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
