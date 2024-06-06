import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationCalendarLayout.module.scss';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import CalendarLayout from './components/CalendarLayout/CalendarLayout';
import EmptyIcon from '@/images/icon/icon_empty.svg';

const cn = classNames.bind(styles);

interface Reservation {
  activity: {
    id: number;
    title: string;
  };
  date: string;
  endTime: string;
  headCount: number;
  id: number;
  reviewSubmitted: false;
  scheduleId: number;
  startTime: string;
  status: 'declined' | 'confirmed' | 'pending';
  totalPrice: number;
  userId: number;
}

interface DataProps {
  data?: {
    reservations: Reservation[];
  };
}

export default function ReservationCalendarLayout(data: DataProps) {
  const [reservationTitleList, setReservationTitleList] = useState<[string, number][] | null>(null);
  const [reservationDataList, setReservationDataList] = useState<Reservation[] | null>(null);
  const [selectedItemData, setSelectedItemData] = useState<Reservation[] | null>(null);

  useEffect(() => {
    if (data.data?.reservations) {
      const { reservations } = data.data;

      const unDuplicateTitles: [string, number][] = reservations
        .filter(
          (reservation, index, self) => index === self.findIndex((t) => t.activity.id === reservation.activity.id),
        )
        .map((reservation) => [reservation.activity.title, reservation.activity.id]);

      setReservationTitleList(unDuplicateTitles);
      setReservationDataList(reservations);

      if (unDuplicateTitles.length > 0) {
        const initialSelectedId = unDuplicateTitles[0][1];
        const initialSelectedItems = reservations.filter((item) => item.activity.id === initialSelectedId);
        setSelectedItemData(initialSelectedItems);
      }
    }
  }, [data]);

  const onDropdownSelect = (index: number) => {
    if (reservationTitleList && reservationDataList) {
      const selectedId = reservationTitleList?.[index][1];
      const selectedItems = reservationDataList?.filter((item) => item.activity.id === selectedId);
      setSelectedItemData(selectedItems);
    }
  };

  if (!reservationTitleList || !reservationDataList) {
    return (
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('text')}>예약 현황</div>
        </div>
        <div className={cn('empty')}>
          <EmptyIcon width="24rem" height="24rem" viewBox="0 0 240 240" />
          <div className={cn('description')}>아직 등록한 체험이 없어요</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <div className={cn('text')}>예약 현황</div>
        <Dropdown
          isLabelVisible={true}
          menuItems={reservationTitleList.map((item) => item[0])}
          onSelect={onDropdownSelect}
        />
      </div>
      <CalendarLayout data={selectedItemData} />
    </div>
  );
}
