import classNames from 'classnames/bind';
import styles from './CreateCalendar.module.scss';
import dayjs from 'dayjs';

import { Chips } from '@/components/Chips/Chips';
import ElipseIconGray from '@/images/icon/icon_ellipse_gray.svg';
import ElipseIconBlue from '@/images/icon/icon_ellipse_blue.svg';

const cn = classNames.bind(styles);

interface CreateCalendarProps {
  currentMonth: dayjs.Dayjs;
  endOfMonth: dayjs.Dayjs;
  startOfMonth: dayjs.Dayjs;
  completeCount?: number;
  reservationCount?: number;
  confirmedCount?: number;
}

export default function CreateCalendar({
  currentMonth,
  endOfMonth,
  startOfMonth,
  completeCount = 0,
  reservationCount = 0,
  confirmedCount = 0,
}: CreateCalendarProps) {
  const RenderAlertIcon = () => {
    if (reservationCount || confirmedCount || completeCount) {
      return reservationCount || confirmedCount ? (
        <ElipseIconBlue className={cn('alertIcon')} />
      ) : (
        <ElipseIconGray className={cn('alertIcon')} />
      );
    }
    return null;
  };

  return (
    <div className={cn('itemsWrapper')}>
      {[...Array(endOfMonth.diff(startOfMonth, 'day') + 1)].map((_, i) => {
        const day = startOfMonth.add(i, 'day');
        if (day.month() === currentMonth.month()) {
          return (
            <div key={day.format('YYYY-MM-DD')} className={cn('item')}>
              <div className={cn('dayWrapper')}>
                {day.format('D')}
                {RenderAlertIcon()}
              </div>
              <div className={cn('chips')}>
                {completeCount ? (
                  <Chips className={cn('chip')} type="confirmed">
                    완료 {completeCount}
                  </Chips>
                ) : null}
                {reservationCount ? (
                  <Chips className={cn('chip')} type="reservation">
                    예약 {reservationCount}
                  </Chips>
                ) : null}
                {confirmedCount ? (
                  <Chips className={cn('chip')} type="complete">
                    승인 {confirmedCount}
                  </Chips>
                ) : null}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
