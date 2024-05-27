import classNames from 'classnames/bind';
import styles from './ReservationCalendarLayout.module.scss';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import Calendar from './components/Calendar';
import SideNavigationMenuLayout from '../SideNavigationMenuLayout/SideNavigationMenuLayout';

const cn = classNames.bind(styles);

export default function ReservationCalendarLayout() {
  return (
    <SideNavigationMenuLayout>
      <div className={cn('header')}>
        <div className={cn('text')}>예약 현황</div>
        <div className={cn('dropDownWrapper')}>
          <div className={cn('label')}>체험명</div>
          <Dropdown />
        </div>
      </div>
      <Calendar />
    </SideNavigationMenuLayout>
  );
}
