import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationInfoPopover.module.scss';

import Header from '../components/Header/Header';
import NavList from './components/NavList/NavList';
import ScheduleDropdown from './components/ScheduleDropdown/ScheduleDropdown';
import CreateCardList from './components/CreateCardList/CreateCardList';
import useOutsideClick from '@/hooks/useOutsideClick';
import { UseGetSchedule } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface ReservationInfoPopoverProps {
  activityId: number;
  date: string;
  isOpen: boolean;
  onClose: () => void;
  modalPosition: 'notOverflowed' | 'overflowed';
}

export default function ReservationInfoPopover({
  activityId,
  date,
  isOpen,
  onClose,
  modalPosition,
}: ReservationInfoPopoverProps) {
  const [selectedNavListItem, setSelectedNavListItem] = useState<'pending' | 'confirmed' | 'declined'>('pending');
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const {
    data: scheduleData,
  }: {
    data:
      | {
          scheduleId: number;
          startTime: string;
          endTime: string;
          count: {
            declined: number;
            confirmed: number;
            pending: number;
          };
        }[]
      | undefined;
  } = UseGetSchedule({ activityId, date });
  const scheduleId = scheduleData?.[dropdownIndex]?.scheduleId || undefined;

  const dropdownMenuItems = scheduleData?.map((item) => `${item.startTime} ~ ${item.endTime}`);

  const pendingCount = scheduleData?.[dropdownIndex]?.count.pending || 0;
  const confirmedCount = scheduleData?.[dropdownIndex]?.count.confirmed || 0;
  const declinedCount = scheduleData?.[dropdownIndex]?.count.declined || 0;

  const onSelect = (index: number) => {
    setDropdownIndex(index);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: onClose, disabled });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn('container', modalPosition)} ref={modalRef}>
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
          <CreateCardList
            activityId={activityId}
            selectedStatus={selectedNavListItem}
            scheduleId={scheduleId}
            disableOutsideClick={() => setDisabled((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
