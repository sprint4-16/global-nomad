import classNames from 'classnames/bind';
import styles from './CreateCalendar.module.scss';
import dayjs from 'dayjs';

import { Chips } from '@/components/Chips/Chips';
import ElipseIconGray from '@/images/icon/icon_ellipse_gray.svg';
import ElipseIconBlue from '@/images/icon/icon_ellipse_blue.svg';

const cn = classNames.bind(styles);

interface dashboardDataProps {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface CreateCalendarProps {
  currentMonth: dayjs.Dayjs;
  dashboardData: dashboardDataProps[] | undefined;
  activityId: number;
}

export default function CreateCalendar({ currentMonth, dashboardData, activityId }: CreateCalendarProps) {
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');

  const days = [...Array(endOfMonth.diff(startOfMonth, 'day') + 1)].map((_, i) => {
    const day = startOfMonth.add(i, 'day');

    const dashboardDataForThisDate = dashboardData?.find((d) => d.date === day.format('YYYY-MM-DD'));

    const completedCount = dashboardDataForThisDate?.reservations.completed;
    const pendingCount = dashboardDataForThisDate?.reservations.pending;
    const confirmedCount = dashboardDataForThisDate?.reservations.confirmed;

    return (
      <div key={day.format('YYYY-MM-DD')} className={cn('item')}>
        <div className={cn('dayWrapper')}>
          {day.format('D')}
          {completedCount ? (
            <ElipseIconGray className={cn('alertIcon')} />
          ) : pendingCount || confirmedCount ? (
            <ElipseIconBlue className={cn('alertIcon')} />
          ) : null}
        </div>
        <div className={cn('chips')}>
          {completedCount ? (
            <Chips className={cn('chip')} type="complete">
              완료 {completedCount}
            </Chips>
          ) : pendingCount ? (
            <Chips
              className={cn('chip')}
              type="reservation"
              activityId={activityId}
              date={dashboardDataForThisDate.date}
            >
              예약 {pendingCount}
            </Chips>
          ) : confirmedCount ? (
            <Chips className={cn('chip')} type="confirmed" activityId={activityId} date={dashboardDataForThisDate.date}>
              승인 {confirmedCount}
            </Chips>
          ) : null}
        </div>
      </div>
    );
  });

  return <div className={cn('itemsWrapper')}>{days}</div>;
}
