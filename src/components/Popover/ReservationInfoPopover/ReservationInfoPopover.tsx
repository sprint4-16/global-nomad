import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationInfoPopover.module.scss';

import Header from '../components/Header/Header';
import NavList from './components/NavList/NavList';
import ScheduleDropdown from './components/ScheduleDropdown/ScheduleDropdown';
import ReservationCardSection from './components/ReservationCardSection/ReservationCardSection';
import { UseGetSchedule } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface ReservationInfoPopoverProps {
  className: string;
  activityId: number;
  date: string;
  onClose: () => void;
  disableOutsideClick: () => void;
}

interface ScheduleData {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export default function ReservationInfoPopover({
  className,
  activityId,
  date,
  onClose,
  disableOutsideClick,
}: ReservationInfoPopoverProps) {
  const [selectedNavListItem, setSelectedNavListItem] = useState<'pending' | 'confirmed' | 'declined'>('pending');
  const [dropdownIndex, setDropdownIndex] = useState(0);

  const { data: scheduleData } = UseGetSchedule({ activityId, date }) as { data: ScheduleData[] | undefined };
  const scheduleId = scheduleData?.[dropdownIndex].scheduleId || undefined;

  const dropdownMenuItems = scheduleData?.map((item) => `${item.startTime} ~ ${item.endTime}`);

  const pendingCount = scheduleData?.[dropdownIndex]?.count.pending || 0;
  const confirmedCount = scheduleData?.[dropdownIndex]?.count.confirmed || 0;
  const declinedCount = scheduleData?.[dropdownIndex]?.count.declined || 0;

  const onSelect = (index: number) => {
    setDropdownIndex(index);
  };

  return (
    <div className={cn('container', className)}>
      <Header title="예약 정보" onClose={onClose} />
      <NavList
        pendingCount={pendingCount}
        confirmedCount={confirmedCount}
        declinedCount={declinedCount}
        selectedNavListItem={selectedNavListItem}
        setSelectedNavListItem={setSelectedNavListItem}
      />
      <div className={cn('contents')}>
        {dropdownMenuItems && (
          <ScheduleDropdown date={date} dropdownMenuItems={dropdownMenuItems} onSelect={onSelect} />
        )}
        {scheduleId && (
          <ReservationCardSection
            activityId={activityId}
            selectedStatus={selectedNavListItem}
            scheduleId={scheduleId}
            disableOutsideClick={disableOutsideClick}
          />
        )}
      </div>
    </div>
  );
}
