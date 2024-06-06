import React, { useState } from 'react';
import styles from './DateInput.module.scss';
import classNames from 'classnames/bind';
import Calendar from '@/images/icon/icon_calendar.svg';
import CustomedDatePicker from '@/components/CustomedDatePicker/CustomedDatePicker';

const cn = classNames.bind(styles);

interface DateInputProps {
  dateText?: string;
  className?: string;
  onClick?: () => void;
}

export function DateInput({ dateText, className }: DateInputProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDateText, setDisplayDateText] = useState<string>(dateText || '');

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getFullYear().toString().slice(-2)}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    setDisplayDateText(formattedDate);
    setShowDatePicker(false);
  };

  return (
    <div className={cn('dateInputWrapper', className)}>
      <div className={cn('dateInputBox', { dateSelected: selectedDate })}>
        {displayDateText}
        <Calendar className={cn('calendarImg')} onClick={handleCalendarClick} />
      </div>
      {showDatePicker && (
        <div className={cn('calendarContainer')}>
          <CustomedDatePicker selected={selectedDate || new Date()} onChange={handleDateChange} />
        </div>
      )}
    </div>
  );
}
