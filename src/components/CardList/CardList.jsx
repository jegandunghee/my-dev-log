import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);
import Card from '../Card/Card';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import './CardList.scss';

// 카드 리스트 컨테이너 컴포넌트
const CardList = ({ posts }) => {
  const listRef = useRef(null);
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const layoutState = useRef();
  const isInitialMount = useRef(true);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      // 초기 마운트 시에는 페이드인 애니메이션만
      gsap.fromTo(
        '.card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' }
      );
      isInitialMount.current = false;
      return;
    }

    // posts props가 변경되어 새로운 데이터를 렌더링하기 전에 이전 상태 캡처
    if (posts !== renderedPosts) {
      const cards = gsap.utils.toArray('.card', listRef.current);
      if (cards.length > 0) {
        layoutState.current = Flip.getState(cards);
      }
      setRenderedPosts(posts); // 새 데이터로 상태 업데이트하여 리렌더링 유발
    }
  }, [posts, renderedPosts]);

  useLayoutEffect(() => {
    // 렌더링이 완료되고 레이아웃 캡처가 존재하면 Flip 애니메이션 실행
    if (layoutState.current) {
      const cards = gsap.utils.toArray('.card', listRef.current);
      Flip.from(layoutState.current, {
        targets: cards,
        duration: 0.6,
        ease: 'power2.out',
        absolute: true,
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 })
      });
      layoutState.current = null;
    }
  }, [renderedPosts]);

  // isLoading 분기는 상위(App.jsx)에서 처리하므로 삭제

  return (
    <div className="card-list" ref={listRef}>
      {renderedPosts.length > 0 ? (
        renderedPosts.map((post) => <Card key={post.id} post={post} />)
      ) : (
        <div className="card-list__empty">해당 카테고리의 일지가 없습니다.</div>
      )}
    </div>
  );
};

export default CardList;
