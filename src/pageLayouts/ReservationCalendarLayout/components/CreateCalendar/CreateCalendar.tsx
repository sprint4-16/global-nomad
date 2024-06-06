import classNames from 'classnames/bind';
import styles from './CreateCalendar.module.scss';
import dayjs from 'dayjs';

import { Chips } from '@/components/Chips/Chips';
import ElipseIconGray from '@/images/icon/icon_ellipse_gray.svg';
import ElipseIconBlue from '@/images/icon/icon_ellipse_blue.svg';

const cn = classNames.bind(styles);

interface CalendarData {
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

interface CreateCalendarProps {
  currentMonth: dayjs.Dayjs;
  endOfMonth: dayjs.Dayjs;
  startOfMonth: dayjs.Dayjs;
  data: CalendarData[] | null;
}

export default function CreateCalendar({ currentMonth, endOfMonth, startOfMonth, data }: CreateCalendarProps) {
  console.log(data);

  return (
    <div className={cn('itemsWrapper')}>
      {[...Array(endOfMonth.diff(startOfMonth, 'day') + 1)].map((_, i) => {
        const day = startOfMonth.add(i, 'day');
        if (day.month() === currentMonth.month()) {
          const dayCompleteCount = data?.filter(
            (item) => item.status === 'confirmed' && dayjs(item.date).isSame(day, 'day'),
          ).length;
          const dayReservationCount = data?.filter(
            (item) => item.status === 'pending' && dayjs(item.date).isSame(day, 'day'),
          ).length;
          const dayConfirmCount = data?.filter(
            (item) => item.status === 'confirmed' && dayjs(item.date).isSame(day, 'day'),
          ).length;

          const RenderAlertIcon = () => {
            if (dayReservationCount || dayConfirmCount || dayCompleteCount) {
              return dayReservationCount || dayConfirmCount ? (
                <ElipseIconBlue className={cn('alertIcon')} />
              ) : (
                <ElipseIconGray className={cn('alertIcon')} />
              );
            }
            return null;
          };

          return (
            <div key={day.format('YYYY-MM-DD')} className={cn('item')}>
              <div className={cn('dayWrapper')}>
                {day.format('D')}
                {RenderAlertIcon()}
              </div>
              <div className={cn('chips')}>
                {dayCompleteCount ? (
                  <Chips className={cn('chip')} type="confirmed">
                    완료 {dayCompleteCount}
                  </Chips>
                ) : null}
                {dayReservationCount ? (
                  <Chips className={cn('chip')} type="reservation">
                    예약 {dayReservationCount}
                  </Chips>
                ) : null}
                {dayConfirmCount ? (
                  <Chips className={cn('chip')} type="complete">
                    승인 {dayConfirmCount}
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
