import { PropsWithChildren, createContext, useContext, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';

import Button from '@/components/Button/Button';
import styles from './Card.module.scss';
import useClickOutside from '@/hooks/useClickOutside';
import { RESERVATION_STATE_LABEL_MAP } from '@/constants';
import { StarIcon, MeatballIcon } from '@/images/icon';

type ReservationState = 'completed' | 'canceled' | 'rejected' | 'finished';

interface StarRating {
  rating: number;
  reviewerCount: number;
}

interface ScheduleType {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}

interface CardProps {
  imgUrl: StaticImageData;
  reservationState?: ReservationState;
  starRating?: StarRating;
  title: string;
  schedule?: ScheduleType;
  price: number;
}

// 예약 내역 컴포넌트
export function ReservationCard({ card }: { card: CardProps }) {
  return (
    <Card card={card}>
      <Card.Thumbnail />
      <Card.Description>
        <Card.ReservationState />
        <Card.Title />
        <Card.Schedule />
        <Card.Footer>
          <Card.Price />
          <Card.ReservationButton />
        </Card.Footer>
      </Card.Description>
    </Card>
  );
}

// 내 체험 컴포넌트
export function ExperienceCard({ card }: { card: CardProps }) {
  return (
    <Card card={card}>
      <Card.Thumbnail />
      <Card.Description>
        <Card.StarRating />
        <Card.Title />
        <Card.Footer>
          <Card.Price />
          <Card.Dropdown />
        </Card.Footer>
      </Card.Description>
    </Card>
  );
}

// 후기 작성 컴포넌트
export function ReviewCard({ card }: { card: CardProps }) {
  return (
    <Card card={card} where="review">
      <Card.Thumbnail where="review" />
      <Card.Description where="review">
        <Card.Title where="review" />
        <Card.Schedule />
        <Card.Divider />
        <Card.Price where="review" />
      </Card.Description>
    </Card>
  );
}

const cn = classNames.bind(styles);
const CardContext = createContext<CardProps>({} as CardProps);

function useCard() {
  return useContext(CardContext);
}

function Card({ children, card, where }: PropsWithChildren<{ card: CardProps; where?: 'review' }>) {
  return (
    <CardContext.Provider value={card}>
      <div className={cn('card', where)}>{children}</div>
    </CardContext.Provider>
  );
}
Card.Thumbnail = Thumbnail;
Card.Description = Description;
Card.ReservationState = ReservationState;
Card.StarRating = StarRating;
Card.Title = Title;
Card.Schedule = Schedule;
Card.Divider = Divider;
Card.Footer = Footer;
Card.Price = Price;
Card.ReservationButton = ReservationButton;
Card.Dropdown = Dropdown;

function Thumbnail({ where }: { where?: 'review' }) {
  const { imgUrl } = useCard();

  return <Image className={cn('thumbnail', where)} src={imgUrl} alt="card thumbnail" priority />;
}

function Description({ where, children }: { where?: 'review'; children: React.ReactNode }) {
  return <div className={cn('description', where)}>{children}</div>;
}

function Title({ where }: { where?: 'review' }) {
  const { title } = useCard();

  return <div className={cn('title', where)}>{title}</div>;
}

function Schedule() {
  const { schedule } = useCard();

  if (!schedule) return null;
  return (
    <div className={cn('schedule')}>
      {schedule.date} · {schedule.startTime} - {schedule.endTime} · {schedule.headCount}명
    </div>
  );
}

function ReservationState() {
  const { reservationState } = useCard();

  if (!reservationState) return null;
  return (
    <div className={cn('reservationState', reservationState)}>{RESERVATION_STATE_LABEL_MAP[reservationState]}</div>
  );
}

function StarRating() {
  const { starRating } = useCard();

  if (!starRating) return null;
  return (
    <div className={cn('starRating')}>
      <StarIcon className={cn('starIcon')} viewBox="0 0 56 56" />
      {starRating.rating} ({starRating.reviewerCount})
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className={cn('footer')}>{children}</div>;
}

function Divider() {
  return <div className={cn('divider')} />;
}

function Price({ where }: { where?: 'review' }) {
  const { price } = useCard();
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(price));

  return <div className={cn('price', where)}>₩{formattedPrice}</div>;
}

function ReservationButton() {
  const { reservationState } = useCard();

  const handleReservationCancelClick = () => {
    // 예약취소 구현
  };

  const handleReviewCreateClick = () => {
    // 후기작성 구현
  };

  if (reservationState === 'completed') {
    return (
      <Button className={cn('reservationButton')} type="secondary" size="medium" onClick={handleReservationCancelClick}>
        예약 취소
      </Button>
    );
  }

  if (reservationState === 'finished') {
    return (
      <Button className={cn('reservationButton')} type="primary" size="medium" onClick={handleReviewCreateClick}>
        후기 작성
      </Button>
    );
  }

  return null;
}

function Dropdown() {
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
