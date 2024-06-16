import classNames from 'classnames/bind';
import styles from './CreateCardList.module.scss';

import ReservationDetailCard from './ReservationDetailCard/ReservationDetailCard';

const cn = classNames.bind(styles);

interface CardListProps {
  activityId: number;
  data: {
    reservations: {
      id: number;
      status: 'pending' | 'confirmed' | 'declined';
      totalPrice: number;
      headCount: number;
      nickname: string;
      activityId: number;
      scheduleId: number;
      reviewSubmitted: false;
    }[];
    totalCount: number;
    cursorId: null;
  };
}

export default function CardList({ activityId, data }: CardListProps) {
  return (
    <section className={cn('section')}>
      <h2 className={cn('sectionTitle')}>예약 내역</h2>
      <ul className={cn('cardList')}>
        {data && data.reservations.length ? (
          data.reservations.map((reservation) => (
            <li key={reservation.id} className={cn('cardListItem')}>
              <ReservationDetailCard
                activityId={activityId}
                reservationId={reservation.id}
                nickname={reservation.nickname}
                people={reservation.headCount}
                reservationState={reservation.status}
              />
            </li>
          ))
        ) : (
          <div>요청이 없습니다.</div>
        )}
      </ul>
    </section>
  );
}
