import React from 'react';
import './CardSkeleton.scss';

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__image skeleton-shimmer"></div>
      <div className="card-skeleton__content">
        <div className="card-skeleton__meta">
          <span className="card-skeleton__category skeleton-shimmer"></span>
          <span className="card-skeleton__date skeleton-shimmer"></span>
        </div>
        <div className="card-skeleton__title skeleton-shimmer"></div>
        <div className="card-skeleton__title skeleton-shimmer" style={{ width: '60%' }}></div>
        <div className="card-skeleton__desc skeleton-shimmer"></div>
        <div className="card-skeleton__desc skeleton-shimmer" style={{ width: '80%' }}></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
