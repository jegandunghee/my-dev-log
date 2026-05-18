import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Card from '../Card/Card';
import './CardList.scss';

// 카드 리스트 컨테이너 컴포넌트
const CardList = ({ posts }) => {
  const listRef = useRef(null);

  useEffect(() => {
    // GSAP 애니메이션: 카드가 렌더링될 때 순차적으로 나타나는 페이드인/업 애니메이션
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          // 카테고리 필터 클릭 시 가속도를 더 부드럽고 다이내믹하게 조정 (시작은 민첩, 끝은 부드럽게)
          ease: 'expo.out',
        }
      );
    }, listRef);

    // 컴포넌트 언마운트 시 또는 posts가 변경되어 리렌더링될 때 컨텍스트 정리
    return () => ctx.revert();
  }, [posts]);

  return (
    <div className="card-list" ref={listRef}>
      {posts.length > 0 ? (
        posts.map((post) => <Card key={post.id} post={post} />)
      ) : (
        <div className="card-list__empty">해당 카테고리의 일지가 없습니다.</div>
      )}
    </div>
  );
};

export default CardList;
