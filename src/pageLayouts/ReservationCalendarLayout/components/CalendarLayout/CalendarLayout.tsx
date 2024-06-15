import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CalendarLayout.module.scss';
import dayjs from 'dayjs';

import PrevArrow from '@/images/btn/btn_prev_arrow.svg';
import NextArrow from '@/images/btn/btn_next_arrow.svg';
import Category from '@/components/Category&Filter/Category/Category';
import CreateCalendar from '../CreateCalendar/CreateCalendar';
import { UseGetDashboard } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface DashboardData {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export default function Calendar({ selectedActivity }: { selectedActivity: number | null }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedCategory, setCurrentCategory] = useState('');

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth((nextMonth) => nextMonth.add(1, 'month'));
  };

  const activityId = selectedActivity || 0;
  const { data: dashboardData } = UseGetDashboard({
    activityId,
    year: currentMonth.format('YYYY'),
    month: currentMonth.format('MM'),
  }) as { data: DashboardData[] | undefined };

  const categoryList = [`완료`, `승인`, `예약`];

  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  const onSelect = (index: number) => {
    setCurrentCategory(categoryList[index]);
  };

  return (
    <div className={cn('container')}>
      <Category className={cn('category')} list={categoryList} onSelect={onSelect} />
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
        <CreateCalendar currentMonth={currentMonth} dashboardData={dashboardData} />
      </div>
    </div>
  );
}
