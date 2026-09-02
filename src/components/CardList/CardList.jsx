import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Card from "../Card/Card";
import "./CardList.scss";

const CardList = ({ posts }) => {
  const listRef = useRef(null);
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const isFirstRender = useRef(true);

  // 초기 로딩 시 카드 fade-in
  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".card");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }, []);

  // 필터 변경 시 — fade out → 데이터 교체 → fade in
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!listRef.current) return;

    const cards = listRef.current.querySelectorAll(".card");

    if (cards.length > 0) {
      // 기존 카드 fade out
      gsap.to(cards, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        ease: "power1.in",
        onComplete: () => {
          setRenderedPosts(posts);   // 데이터 교체
        },
      });
    } else {
      setRenderedPosts(posts);
    }
  }, [posts]);

  // 데이터 교체 후 새 카드 fade in
  useEffect(() => {
    if (isFirstRender.current) return;
    if (!listRef.current) return;

    const cards = listRef.current.querySelectorAll(".card");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.42, stagger: 0.055, ease: "power2.out" }
    );
  }, [renderedPosts]);

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
