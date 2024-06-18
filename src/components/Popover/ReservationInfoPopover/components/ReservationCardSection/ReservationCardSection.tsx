import classNames from 'classnames/bind';
import styles from './ReservationCardSection.module.scss';

import CreateCardList from './CreateCardList/CreateCardList';
import Footer from './Footer/Footer';
import { UseGetScheduleHistory } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface ReservationCardSectionProps {
  activityId: number;
  selectedStatus: 'pending' | 'confirmed' | 'declined';
  scheduleId: number;
  disableOutsideClick: () => void;
}

export default function ReservationCardSection({
  activityId,
  selectedStatus,
  scheduleId,
  disableOutsideClick,
}: ReservationCardSectionProps) {
  const { data: scheduleHistoryData } = UseGetScheduleHistory({
    activityId,
    status: selectedStatus,
    scheduleId,
  });

  return (
    <div className={cn('container')}>
      <CreateCardList scheduleHistoryData={scheduleHistoryData} disableOutsideClick={disableOutsideClick} />
      <Footer selectedStatus={selectedStatus} reservations={scheduleHistoryData?.reservations} />
    </div>
  );
}
