import React from 'react';
import './Card.scss';

// 개별 개발 일지 포스트 카드 컴포넌트
const Card = ({ post }) => {
  return (
    <article className="card">
      <div className="card__thumbnail">
        {/* 임시 썸네일: 더미 색상 div. 향후 실제 이미지 태그로 대체 */}
        <div 
          className="card__thumbnail-dummy" 
          style={{ backgroundColor: post.color }}
        ></div>
      </div>
      <div className="card__content">
        <span className="card__tag">{post.category}</span>
        <h3 className="card__title">{post.title}</h3>
        <p className="card__desc">{post.description}</p>
        <span className="card__date">{post.date}</span>
      </div>
    </article>
  );
};

export default Card;
