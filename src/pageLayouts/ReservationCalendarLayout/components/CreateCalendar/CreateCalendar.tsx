import classNames from 'classnames/bind';
import styles from './CreateCalendar.module.scss';
import dayjs from 'dayjs';

import { Chips } from '@/components/Chips/Chips';
import ElipseIconGray from '@/images/icon/icon_ellipse_gray.svg';
import ElipseIconBlue from '@/images/icon/icon_ellipse_blue.svg';

const cn = classNames.bind(styles);

interface CreateCalendarProps {
  currentMonth: dayjs.Dayjs;
  dashboardData:
    | {
        date: string;
        reservations: {
          completed: number;
          confirmed: number;
          pending: number;
        };
      }[]
    | undefined;
  activityId: number;
}

export default function CreateCalendar({ currentMonth, dashboardData, activityId }: CreateCalendarProps) {
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');

  const startDay = startOfMonth.day();

  const days = [...Array(startDay).fill(''), ...Array(endOfMonth.diff(startOfMonth, 'day') + 1)].map((_, i) => {
    const day = i >= startDay ? startOfMonth.add(i - startDay, 'day') : null;

    const dashboardDataForThisDate = day ? dashboardData?.find((d) => d.date === day.format('YYYY-MM-DD')) : undefined;

    const reservationCounts = {
      completed: dashboardDataForThisDate?.reservations.completed || 0,
      pending: dashboardDataForThisDate?.reservations.pending || 0,
      confirmed: dashboardDataForThisDate?.reservations.confirmed || 0,
    };

    return (
      <div key={day ? day.format('YYYY-MM-DD') : `empty-${i}`} className={cn('item', { none: !day })}>
        <div className={cn('dayWrapper')}>
          {day ? day.format('D') : ''}
          {getAlertIcon(reservationCounts)}
        </div>
        <div className={cn('chips')}>{getChips(reservationCounts, activityId, dashboardDataForThisDate?.date)}</div>
      </div>
    );
  });

  return <div className={cn('itemsWrapper')}>{days}</div>;
}

interface ReservationCounts {
  completed: number;
  pending: number;
  confirmed: number;
}

function getAlertIcon(reservationCounts: ReservationCounts) {
  if (reservationCounts.completed) {
    return <ElipseIconGray className={cn('alertIcon')} />;
  } else if (reservationCounts.pending || reservationCounts.confirmed) {
    return <ElipseIconBlue className={cn('alertIcon')} />;
  } else {
    return null;
  }
}

function getChips(reservationCounts: ReservationCounts, activityId: number, date?: string) {
  const chipTypes: { type: 'complete' | 'reservation' | 'confirmed'; text: string; count: number }[] = [
    { type: 'complete', text: '완료', count: reservationCounts.completed },
    { type: 'reservation', text: '예약', count: reservationCounts.pending },
    { type: 'confirmed', text: '승인', count: reservationCounts.confirmed },
  ];

  return chipTypes
    .filter((chipType) => chipType.count > 0)
    .map((chipType) => (
      <Chips key={chipType.text} type={chipType.type} activityId={activityId} date={date}>
        {chipType.text} {chipType.count}
      </Chips>
    ));
}
