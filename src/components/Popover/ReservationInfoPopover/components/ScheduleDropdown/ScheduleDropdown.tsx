import classNames from 'classnames/bind';
import styles from './ScheduleDropdown.module.scss';
import dayjs from 'dayjs';

import { Dropdown } from '@/components/Dropdown/Dropdown';

const cn = classNames.bind(styles);

interface ScheduleDropdownProps {
  date: string;
  dropdownMenuItems: string[];
  onSelect: (index: number) => void;
}

export default function ScheduleDropdown({ date, dropdownMenuItems, onSelect }: ScheduleDropdownProps) {
  return (
    <section className={cn('section')}>
      <h2 className={cn('sectionTitle')}>예약 날짜</h2>
      <p className={cn('sectionLabel')}>{dayjs(date).format('YYYY년 M월 D일')}</p>
      <Dropdown className={cn('dropdown')} menuItems={dropdownMenuItems} onSelect={onSelect} />
    </section>
  );
}
