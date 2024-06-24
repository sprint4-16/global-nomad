import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './DateInput.module.scss';
import classNames from 'classnames/bind';
import Calendar from '@/images/icon/icon_calendar.svg';
import CustomedDatePicker from '@/components/CustomedDatePicker/CustomedDatePicker';

const cn = classNames.bind(styles);

interface DateInputProps {
  dateText?: string;
  className?: string;
  onClick?: () => void;
  onChange?: (date: Date) => void;
}

export interface DateInputRef {
  reset: () => void;
}

export const DateInput = forwardRef<DateInputRef, DateInputProps>(({ dateText, className, onChange }, ref) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDateText, setDisplayDateText] = useState<string>(dateText || '');

  useImperativeHandle(ref, () => ({
    reset() {
      setSelectedDate(null);
      setDisplayDateText(dateText || '');
    },
  }));

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date: Date) => {
    const timezoneOffsetInMs = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() - timezoneOffsetInMs);

    setSelectedDate(adjustedDate);
    const formattedDate = `${adjustedDate.getFullYear().toString().slice(-2)}/${(adjustedDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${adjustedDate.getUTCDate().toString().padStart(2, '0')}`;
    setDisplayDateText(formattedDate);
    setShowDatePicker(false);
    if (onChange) {
      onChange(adjustedDate);
    }
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
});
