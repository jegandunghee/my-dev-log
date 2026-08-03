import React from 'react';
import { FaReact, FaJsSquare, FaSass, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, FaNodeJs, FaNpm, FaYarn } from 'react-icons/fa';
import './Footer.scss';

const Footer = ({ language, dict }) => {
  const techStack = [
    { icon: <FaReact />, name: 'React' },
    { icon: <FaJsSquare />, name: 'JavaScript' },
    { icon: <FaSass />, name: 'Sass' },
    { icon: <FaHtml5 />, name: 'HTML5' },
    { icon: <FaCss3Alt />, name: 'CSS3' },
    { icon: <FaGitAlt />, name: 'Git' },
    { icon: <FaFigma />, name: 'Figma' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <FaNpm />, name: 'NPM' },
    { icon: <FaYarn />, name: 'Yarn' },
  ];

  return (
    <footer className="footer">
      <div className="footer__marquee">
        <div className="footer__marquee-track">
          {/* 마키 애니메이션을 위해 2세트를 이어붙임 */}
          {[...techStack, ...techStack].map((tech, index) => (
            <div className="footer__marquee-item" key={index}>
              <span className="icon">{tech.icon}</span>
              <span className="text">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} {dict[language].footer}</p>
      </div>
    </footer>
  );
};

export default Footer;
