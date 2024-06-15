import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import { ArrowButtonLeft, ArrowButtonRight } from '@/images/btn';
import { Search } from '@/components/Search/Search';
import CardResource from '@/components/CardResource/CardResource';
import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';
import useResizeHook from '@/hooks/useResizeHook';
import styles from './landing.module.scss';

const cn = classNames.bind(styles);

interface CardResourceProps {
  id: number;
  title: string;
  price: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function Landing() {
  const { data, isLoading } = useGetPopularActivities();
  const month = new Date().getMonth() + 1;
  const isSlideMode = useResizeHook(1248);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const scrollAmount = currentIndex * 408;

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. 화살표 버튼
  useEffect(() => {
    if (!isLoading) {
      setMaxIndex(data.totalCount);
    }
  }, [isLoading]);

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
    if (!isSlideMode || !isDown) return
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
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>| React.TouchEvent<HTMLDivElement>, id: number) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // 카드 클릭시 작동 되는곳
    }
  };

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

  return (
    <div className={cn('landing')}>
      <div className={cn('inner')}>
        {!isLoading && (
          <Image
            className={cn('bannerImg')}
            src={data.activities[0].bannerImageUrl}
            alt="배너"
            width={1920}
            height={550}
            priority
          />
        )}

        <div className={cn('mainTitle')}>
          {!isLoading && <div className={cn('title')}>{data.activities[0].title}</div>}
          <div className={cn('description')}>{month}월의 인기 체험 BEST 🔥</div>
        </div>

        <div className={cn('searchWrapper')}>
          <Search titleText="무엇을 체험하고 싶으신가요?" inputText="내가 원하는 체험은" />
        </div>

        <div className={cn('popularExperiences')}>
          <div className={cn('header')}>
            <div className={cn('title')}>🔥 인기 체험</div>
            <div className={cn('buttonArrowContainer')}>
              <ArrowButtonLeft className={cn('buttonArrow')} width={40} height={40} onClick={handlePrevClick} />
              <ArrowButtonRight className={cn('buttonArrow')} width={40} height={40} onClick={handleNextClick} />
            </div>
          </div>
          <div            className={cn('scroll')}
            ref={scrollContainerRef}
          >
            <div className={cn('cardContainer')} style={{ transform: `translateX(-${scrollAmount}px)` }}>
              {!isLoading &&
                data.activities.map((activity: CardResourceProps) => (
                  <div key={activity.id} onClick={(e) => handleCardClick(e, activity.id)} onTouchEnd={(e) => handleCardClick(e, activity.id)}>
                    <CardResource activity={activity} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
