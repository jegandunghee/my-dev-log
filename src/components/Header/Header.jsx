import React from 'react';
import { FaLaptopCode, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Header.scss';

// 상단 고정 헤더 (글래스모피즘 적용)
const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <FaLaptopCode className="header__logo-icon" />
          <span className="header__logo-text">나의 개발일지</span>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#about" className="header__nav-link">About</a>
            </li>
            <li className="header__nav-item">
              <a href="#work" className="header__nav-link">Work</a>
            </li>
            <li className="header__nav-item">
              <a href="#contact" className="header__nav-link">Contact</a>
            </li>
          </ul>
        </nav>
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
