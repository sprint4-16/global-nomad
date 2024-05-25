import classNames from 'classnames/bind';
import styles from './ReservationCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import StarIcon from '@/images/icon/icon_star_on.svg';
import MeatballIcon from '@/images/btn/btn_meatball.svg';

type reservationState = 'completed' | 'canceled' | 'rejected' | 'finished';

interface Star {
  rating: number;
  reviewer: number;
}

interface ReservationProps {
  imgUrl?: StaticImageData;
  reservationState?: reservationState;
  star?: Star;
  children: ReactNode;
  schedule?: string;
  price: string;
}

export default function ReservationCard({
  imgUrl,
  reservationState,
  star,
  schedule,
  price,
  children,
}: ReservationProps) {
  const cn = classNames.bind(styles);
  const [viewDropdown, setViewDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const stateClassMap = {
    completed: '예약 완료',
    canceled: '예약 취소',
    rejected: '예약 거절',
    finished: '체험 완료',
  };

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setViewDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className={cn('reservationCard')}>
      {imgUrl ? <Image className={cn('cardImg')} src={imgUrl} alt="Card Image" priority /> : null}
      <div className={cn('cardDescription')}>
        <div className={cn('reservationInfo')}>
          {reservationState ? (
            <div className={cn('reservationState', reservationState)}>{stateClassMap[reservationState]}</div>
          ) : null}
          {star ? (
            <div className={cn('star')}>
              <StarIcon className={cn('starIcon')} viewBox="0 0 56 56" />
              {star.rating} ({star.reviewer})
            </div>
          ) : null}
          <div className={cn('reservationTitle')}>{children}</div>
          {schedule ? <div className={cn('reservationSchedule')}>{schedule}</div> : null}
        </div>
        <div className={cn('reservationFooter')}>
          <div className={cn('reservationPrice')}>₩{price}</div>
          {reservationState === 'completed' && (
            <Button className={cn('reservationBtn')} type="secondary" size="medium">
              예약 취소
            </Button>
          )}
          {reservationState === 'finished' && (
            <Button className={cn('reservationBtn')} type="primary" size="medium">
              후기 작성
            </Button>
          )}
          {star ? (
            <div className={cn('dropdownContainer')} ref={profileRef}>
              <MeatballIcon
                className={cn('meatball')}
                viewBox="0 0 40 40"
                onClick={() => {
                  setViewDropdown(!viewDropdown);
                }}
              />
              {viewDropdown ? (
                <div className={cn('dropdown')}>
                  <div className={cn('dropdownItem')}>수정하기</div>
                  <div className={cn('dropdownItem')}>삭제하기</div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
