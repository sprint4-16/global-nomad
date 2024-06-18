import classNames from 'classnames/bind';
import styles from './CreateCardList.module.scss';

import ReservationDetailCard from './ReservationDetailCard/ReservationDetailCard';

const cn = classNames.bind(styles);

interface CardListProps {
  scheduleHistoryData: {
    reservations: {
      id: number;
      status: 'pending' | 'confirmed' | 'declined';
      totalPrice: number;
      headCount: number;
      nickname: string;
      activityId: number;
    }[];
  };
  disableOutsideClick: () => void;
}

export default function CreateCardList({ scheduleHistoryData, disableOutsideClick }: CardListProps) {
  const CardRender = () => {
    if (!scheduleHistoryData || !scheduleHistoryData.reservations.length) {
      return <div>예약 요청이 없습니다.</div>;
    }
    return scheduleHistoryData.reservations.map((reservation) => (
      <li key={reservation.id} className={cn('cardListItem')}>
        <ReservationDetailCard
          activityId={reservation.activityId}
          reservationId={reservation.id}
          nickname={reservation.nickname}
          headCount={reservation.headCount}
          reservationState={reservation.status}
          disableOutsideClick={disableOutsideClick}
        />
      </li>
    ));
  };

  return (
    <section className={cn('section')}>
      <h2 className={cn('sectionTitle')}>예약 내역</h2>
      <ul className={cn('cardList')}>
        <CardRender />
      </ul>
    </section>
  );
}
