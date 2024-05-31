import { useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import { MeatballIcon, StarIcon } from '@/images/icon';
import { RESERVATION_STATE_LABEL_MAP } from '@/constants';
import useClickOutside from '@/hooks/useClickOutside';
import Button from '../../Button/Button';
import styles from '../Card.module.scss';

type ReservationState = 'completed' | 'canceled' | 'rejected' | 'finished';

interface ReservationButtonProps {
  status: ReservationState;
}

export function Thumbnail({ bannerImageUrl, where }: { bannerImageUrl: string; where?: 'review' }) {
  const cn = classNames.bind(styles);
  return (
    <Image
      className={cn('thumbnail', where)}
      src={bannerImageUrl}
      alt="card thumbnail"
      width={100}
      height={100}
      unoptimized
      priority
    />
  );
}

export function Description({ children, where }: { children: React.ReactNode; where?: 'review' }) {
  const cn = classNames.bind(styles);
  return <div className={cn('description', where)}>{children}</div>;
}

export function Title({ children, where }: { children: React.ReactNode; where?: 'review' }) {
  const cn = classNames.bind(styles);
  return <div className={cn('title', where)}>{children}</div>;
}

export function Schedule({
  date,
  startTime,
  endTime,
  headCount,
}: {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('schedule')}>
      {date} · {startTime} - {endTime} · {headCount}명
    </div>
  );
}

export function ReservationStatus({ status }: { status: ReservationState }) {
  const cn = classNames.bind(styles);

  return <div className={cn('reservationState', status)}>{RESERVATION_STATE_LABEL_MAP[status]}</div>;
}

export function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('starRating')}>
      <StarIcon className={cn('starIcon')} viewBox="0 0 56 56" />
      {rating} ({reviewCount})
    </div>
  );
}

export function Footer({ children }: { children: React.ReactNode }) {
  const cn = classNames.bind(styles);

  return <div className={cn('footer')}>{children}</div>;
}

export function Divider() {
  const cn = classNames.bind(styles);

  return <div className={cn('divider')} />;
}

export function Price({ price, where }: { price: number; where?: 'review' }) {
  const cn = classNames.bind(styles);
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

  return <div className={cn('price', where)}>₩{formattedPrice}</div>;
}

export function CardDropdown() {
  const cn = classNames.bind(styles);
  const [isOpenDropdown, setViewDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setViewDropdown(!isOpenDropdown);
  };

  const closeDropdown = () => {
    setViewDropdown(false);
  };

  const handleModifyClick = () => {
    // 수정하기 구현
  };

  const handleDeleteClick = () => {
    // 삭제하기 구현
  };

  useClickOutside(profileRef, closeDropdown);

  return (
    <div className={cn('dropdownContainer')} ref={profileRef}>
      <MeatballIcon className={cn('meatball')} viewBox="0 0 40 40" onClick={toggleDropdown} />
      {isOpenDropdown && (
        <div className={cn('dropdown')}>
          <div className={cn('dropdownItem')} onClick={handleModifyClick}>
            수정하기
          </div>
          <div className={cn('dropdownItem')} onClick={handleDeleteClick}>
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}

export function ReservationButton({ status }: ReservationButtonProps) {
  const cn = classNames.bind(styles);
  const handleReservationCancelClick = () => {
    // 예약취소 구현
  };

  const handleReviewCreateClick = () => {
    // 후기작성 구현
  };

  if (status === 'completed') {
    return (
      <Button className={cn('reservationButton')} type="secondary" size="medium" onClick={handleReservationCancelClick}>
        예약 취소
      </Button>
    );
  }

  if (status === 'finished') {
    return (
      <Button className={cn('reservationButton')} type="primary" size="medium" onClick={handleReviewCreateClick}>
        후기 작성
      </Button>
    );
  }

  return null;
}
