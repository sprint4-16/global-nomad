import { PropsWithChildren, createContext, useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import { RESERVATION_STATE_LABEL_MAP } from '@/constants';
import { StarIcon } from '@/images/icon';
import { CardDropdown } from './Components/CardDropdown';
import { ReservationButton } from './Components/ReservationButton';

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
        <div>
          <Card.ReservationState />
          <Card.Title />
          <Card.Schedule />
        </div>
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
        <div>
          <Card.StarRating />
          <Card.Title />
        </div>
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

export function useCard() {
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
Card.Dropdown = CardDropdown;

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
