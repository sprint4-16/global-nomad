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
}

export default function CreateCalendar({ currentMonth, endOfMonth, startOfMonth }: CreateCalendarProps) {
  const confirmedCount = 1;
  const reservationCount = 1;
  const completeCount = 1;

  return (
    <div className={cn('itemsWrapper')}>
      {[...Array(endOfMonth.diff(startOfMonth, 'day') + 1)].map((_, i) => {
        const day = startOfMonth.add(i, 'day');
        if (day.month() === currentMonth.month()) {
          return (
            <div key={day.format('YYYY-MM-DD')} className={cn('item')}>
              <div className={cn('dayWrapper')}>
                {day.format('D')}
                {reservationCount ? (
                  <ElipseIconGray className={cn('alertIcon')} />
                ) : (
                  <ElipseIconBlue className={cn('alertIcon')} />
                )}
              </div>
              <div className={cn('chips')}>
                {confirmedCount && (
                  <Chips className={cn('chip')} type="confirmed">
                    완료 {confirmedCount}
                  </Chips>
                )}
                {reservationCount && (
                  <Chips className={cn('chip')} type="reservation">
                    예약 {reservationCount}
                  </Chips>
                )}
                {completeCount && (
                  <Chips className={cn('chip')} type="complete">
                    승인 {completeCount}
                  </Chips>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
