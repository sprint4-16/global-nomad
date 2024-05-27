import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import dayjs from 'dayjs';

import PrevArrow from '@/images/btn/btn_prev_arrow.svg';
import NextArrow from '@/images/btn/btn_next_arrow.svg';
import CreateCalendar from './CreateCalendar/CreateCalendar';

const cn = classNames.bind(styles);

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth((nextMonth) => nextMonth.add(1, 'month'));
  };

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');

  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <PrevArrow width="2.4rem" height="2.4rem" onClick={handlePreviousMonth} />
        <div>{currentMonth.format('YYYY년 M월')}</div>
        <NextArrow width="2.4rem" height="2.4rem" onClick={handleNextMonth} />
      </div>
      <div className={cn('content')}>
        <div className={cn('labelWrapper')}>
          {dayLabels.map((label, index) => (
            <div key={`label-${index}`} className={cn('label')}>
              {label}
            </div>
          ))}
        </div>
        <CreateCalendar currentMonth={currentMonth} startOfMonth={startOfMonth} endOfMonth={endOfMonth} />
      </div>
    </div>
  );
}
