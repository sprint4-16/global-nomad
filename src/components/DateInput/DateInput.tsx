import styles from './DateInput.module.scss';
import classNames from 'classnames/bind';
import Calendar from '@/images/icon/icon_calendar.svg';

const cn = classNames.bind(styles);

interface DateInputProps {
  dateText?: string;
  className?: string;
  onClick?: () => void;
}

export function DateInput({ dateText, onClick, className }: DateInputProps) {
  return (
    <div className={cn('dateInputWrapper', className)}>
      <div className={cn('dateInputBox')}>
        {dateText}
        <Calendar className={cn('calendarImg')} />
      </div>
    </div>
  );
}
