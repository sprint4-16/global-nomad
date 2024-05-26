import { PropsWithChildren, createContext, useContext, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';

import Button from '@/components/Button/Button';
import styles from './ActivityCard.module.scss';
import useClickOutside from '@/hooks/useClickOutside';
import { RESERVATION_STATE_LABEL_MAP } from '@/constants';
import { StarIcon, MeatballIcon } from '@/images/icon';

type ReservationState = 'completed' | 'canceled' | 'rejected' | 'finished';

interface StarRating {
  rating: number;
  reviewerCount: number;
}

interface ActivityType {
  imgUrl: StaticImageData;
  reservationState?: ReservationState;
  starRating?: StarRating;
  title: string;
  schedule?: string;
  price: number;
}

// 예약 내역 컴포넌트
export function ReservationCard({ activity }: { activity: ActivityType }) {
  return (
    <Activity activity={activity}>
      <Activity.Thumbnail />
      <Activity.Description>
        <Activity.ReservationState />
        <Activity.Title />
        <Activity.Schedule />
        <Footer>
          <Activity.Price />
          <Activity.ReservationButton />
        </Footer>
      </Activity.Description>
    </Activity>
  );
}

// 내 체험 컴포넌트
export function ExperienceCard({ activity }: { activity: ActivityType }) {
  return (
    <Activity activity={activity}>
      <Activity.Thumbnail />
      <Activity.Description>
        <Activity.StarRating />
        <Activity.Title />
        <Footer>
          <Activity.Price />
          <Activity.Dropdown />
        </Footer>
      </Activity.Description>
    </Activity>
  );
}

// 후기 작성 컴포넌트
export function ReviewCard({ activity }: { activity: ActivityType }) {
  return (
    <Activity activity={activity} where="review">
      <Activity.Thumbnail where="review" />
      <Activity.Description where="review">
        <Activity.Title where="review" />
        <Activity.Schedule />
        <Activity.Divider />
        <Activity.Price where="review" />
      </Activity.Description>
    </Activity>
  );
}

const cn = classNames.bind(styles);
const ActivityContext = createContext<ActivityType>({} as ActivityType);

function useActivity() {
  return useContext(ActivityContext);
}

function Activity({ children, activity, where }: PropsWithChildren<{ activity: ActivityType; where?: 'review' }>) {
  return (
    <ActivityContext.Provider value={activity}>
      <div className={cn('activityCard', where)}>{children}</div>
    </ActivityContext.Provider>
  );
}
Activity.Thumbnail = Thumbnail;
Activity.Description = Description;
Activity.ReservationState = ReservationState;
Activity.StarRating = StarRating;
Activity.Title = Title;
Activity.Schedule = Schedule;
Activity.Divider = Divider;
Activity.Price = Price;
Activity.ReservationButton = ReservationButton;
Activity.Dropdown = Dropdown;

function Thumbnail({ where }: { where?: 'review' }) {
  const { imgUrl } = useActivity();

  return <Image className={cn('thumbnail', where)} src={imgUrl} alt="activity thumbnail" priority />;
}

function Description({ where, children }: { where?: 'review'; children: React.ReactNode }) {
  return <div className={cn('description', where)}>{children}</div>;
}

function Title({ where }: { where?: 'review' }) {
  const { title } = useActivity();

  return <div className={cn('title', where)}>{title}</div>;
}

function Schedule() {
  const { schedule } = useActivity();

  return <div className={cn('schedule')}>{schedule}</div>;
}

function ReservationState() {
  const { reservationState } = useActivity();

  if (!reservationState) return null;
  return (
    <div className={cn('reservationState', reservationState)}>{RESERVATION_STATE_LABEL_MAP[reservationState]}</div>
  );
}

function StarRating() {
  const { starRating } = useActivity();

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
  const { price } = useActivity();
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(price));

  return <div className={cn('price', where)}>₩{formattedPrice}</div>;
}

function ReservationButton() {
  const { reservationState } = useActivity();

  const handleReservationCancelClick = () => {
    console.log('예약 취소 버튼 클릭');
  };

  const handleReviewCreateClick = () => {
    console.log('후기 작성');
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
    console.log('수정하기');
  };

  const handleDeleteClick = () => {
    console.log('삭제하기');
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
