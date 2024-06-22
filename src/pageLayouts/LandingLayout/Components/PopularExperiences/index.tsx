import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import classNames from 'classnames/bind';

import useResizeHook from '@/hooks/useResizeHook';
import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';
import { ArrowButtonLeft, ArrowButtonRight } from '@/images/btn';
import CardResource from '@/components/CardResource/CardResource';
import styles from './PopularExperiences.module.scss';

interface CardResourceProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const cn = classNames.bind(styles);

export default function PopulationExperiences() {
  const { data, isLoading, error } = useGetPopularActivities();
  const isSlideMode = useResizeHook(1248);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(20);
  const scrollAmount = currentIndex * 408;

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. 화살표 버튼
  useEffect(() => {
    if (data.totalCount < 20) {
      setMaxIndex(data.totalCount);
    }
  }, [data]);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener('mousedown', handleStart);
      element.addEventListener('mouseup', handleEnd);
      element.addEventListener('mouseleave', handleEnd);
      element.addEventListener('mousemove', handleMove);
      element.addEventListener('touchstart', handleStart, { passive: false });
      element.addEventListener('touchend', handleEnd, { passive: false });
      element.addEventListener('touchmove', handleMove, { passive: false });

      return () => {
        element.removeEventListener('mousedown', handleStart);
        element.removeEventListener('mouseup', handleEnd);
        element.removeEventListener('mouseleave', handleEnd);
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('touchstart', handleStart);
        element.removeEventListener('touchend', handleEnd);
        element.removeEventListener('touchmove', handleMove);
      };
    }
  }, [isDown, startX, scrollLeft, dragged]);

  // 이전 버튼
  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 3, 0));
  };

  // 다음 버튼
  const handleNextClick = () => {
    setCurrentIndex(Math.min(currentIndex + 3, maxIndex - 3));
  };

  // 2. 슬라이드 드래그
  const getPageX = (e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent) {
      return e.pageX;
    } else {
      return e.touches[0].pageX;
    }
  };

  // 눌렀을 때
  const handleStart = (e: MouseEvent | TouchEvent) => {
    if (scrollContainerRef.current) {
      setIsDown(true);
      setStartX(getPageX(e) - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      e.preventDefault();
    }
  };

  // 누르고 땔 때
  const handleEnd = () => {
    setIsDown(false);
    setTimeout(() => {
      setDragged(false);
    }, 0);
  };

  // 누르고 움직였을 때
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isSlideMode || !isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = getPageX(e) - scrollContainerRef.current.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        setDragged(true);
      }
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // 카드 클릭시
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: number) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      Router.push(`/activities/${id}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={cn('popularExperiences')}>
      <div className={cn('header')}>
        <div className={cn('title')}>🔥 인기 체험</div>
        <div className={cn('buttonArrowContainer', { hide: isSlideMode })}>
          <ArrowButtonLeft className={cn('buttonArrow')} width={40} height={40} onClick={handlePrevClick} />
          <ArrowButtonRight className={cn('buttonArrow')} width={40} height={40} onClick={handleNextClick} />
        </div>
      </div>
      <div className={cn('scroll')} ref={scrollContainerRef}>
        <div className={cn('cardContainer')} style={{ transform: `translateX(-${scrollAmount}px)` }}>
          {data.activities.map((activity: CardResourceProps) => (
            <div
              key={activity.id}
              onClick={(e) => handleCardClick(e, activity.id)}
              onTouchEnd={(e) => handleCardClick(e, activity.id)}
            >
              <CardResource activity={activity} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
