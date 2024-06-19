import classNames from 'classnames/bind';
import styles from './CreateCardList.module.scss';

import ReservationDetailCard from './ReservationDetailCard/ReservationDetailCard';
import Footer from './Footer/Footer';
import { UseGetScheduleHistory } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface CardListProps {
  activityId: number;
  selectedStatus: 'pending' | 'confirmed' | 'declined';
  scheduleId: number;
  disableOutsideClick: () => void;
}

export default function CreateCardList({ activityId, selectedStatus, scheduleId, disableOutsideClick }: CardListProps) {
  const {
    data: scheduleHistoryData,
  }: {
    data:
      | {
          reservations: {
            id: number;
            status: 'pending' | 'confirmed' | 'declined';
            headCount: number;
            nickname: string;
            activityId: number;
          }[];
        }
      | undefined;
  } = UseGetScheduleHistory({
    activityId,
    status: selectedStatus,
    scheduleId,
  });

  return (
    <>
      <section className={cn('section')}>
        <h2 className={cn('sectionTitle')}>예약 내역</h2>
        <ul className={cn('cardList')}>
          {!scheduleHistoryData || !scheduleHistoryData?.reservations?.length ? (
            <div>예약 요청이 없습니다.</div>
          ) : (
            scheduleHistoryData.reservations.map((reservation) => (
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
            ))
          )}
        </ul>
      </section>
      <Footer selectedStatus={selectedStatus} reservations={scheduleHistoryData?.reservations} />
    </>
  );
}
