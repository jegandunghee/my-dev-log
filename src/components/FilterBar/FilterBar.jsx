import React from 'react';
import './FilterBar.scss';

// 카테고리 필터링 탭 메뉴
const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <ul className="filter-bar__list">
        {categories.map((category) => (
          <li key={category} className="filter-bar__item">
            <button
              className={`filter-bar__button ${activeCategory === category ? 'filter-bar__button--active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterBar;
