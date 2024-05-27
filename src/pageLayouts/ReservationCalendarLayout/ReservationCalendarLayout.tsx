import classNames from 'classnames/bind';
import styles from './ReservationCalendarLayout.module.scss';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import Calendar from './components/Calendar';
import SideNavigationMenuLayout from '../SideNavigationMenuLayout/SideNavigationMenuLayout';
import EmptyIcon from '@/images/icon/icon_empty.svg';

const cn = classNames.bind(styles);

export default function ReservationCalendarLayout() {
  const reservationCount = 0;
  return (
    <SideNavigationMenuLayout>
      {reservationCount ? (
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <div className={cn('text')}>예약 현황</div>
            <Dropdown isLabelVisible={true} />
          </div>
          <Calendar />
        </div>
      ) : (
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <div className={cn('text')}>예약 현황</div>
          </div>
          <div className={cn('empty')}>
            <EmptyIcon width="24rem" height="24rem" viewBox="0 0 240 240" />
            <div className={cn('description')}>아직 등록한 체험이 없어요</div>
          </div>
        </div>
      )}
    </SideNavigationMenuLayout>
  );
}
