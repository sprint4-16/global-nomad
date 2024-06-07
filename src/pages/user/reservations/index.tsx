import { useState } from 'react';
import { useGetReservation } from '@/apis/apiHooks/MyReservations';

import Filter from '@/components/Category&Filter/Filter/Filter';
import ReservationCard from '@/pages/card/ReservationCard';
import EmptyIcon from '@/images/icon/icon_empty.svg';

import classNames from 'classnames/bind';
import styles from './reservations.module.scss';

const cn = classNames.bind(styles);

export default function ReservationsPage() {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const { data, isFetching } = useGetReservation(filterStatus);
  const reservations = data?.reservations ?? [];

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <div className={cn('header_text')}>예약 내역</div>
        <Filter filterType="reservation" setFilterStatus={setFilterStatus} />
      </div>
      <div className={cn('content')}>
        {isFetching || reservations.length === 0 ? (
          <div className={cn('content_empty')}>
            <EmptyIcon width="24rem" height="24rem" />
            <div className={cn('content_text')}>아직 등록한 체험이 없어요</div>
          </div>
        ) : (
          reservations.map((item, index: number) => {
            return <ReservationCard className={''} cardData={item} key={`${index} ${item.activity.title}`} />;
          })
        )}
      </div>
    </div>
  );
}
