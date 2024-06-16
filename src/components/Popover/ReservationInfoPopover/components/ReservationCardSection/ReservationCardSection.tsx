import classNames from 'classnames/bind';
import styles from './ReservationCardSection.module.scss';

import CreateCardList from './CreateCardList/CreateCardList';
import Footer from './Footer/Footer';
import { UseGetScheduleHistory } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface ReservationCardSectionProps {
  activityId: number;
  status: 'pending' | 'confirmed' | 'declined';
  scheduleId: number;
}

export default function ReservationCardSection({ activityId, status, scheduleId }: ReservationCardSectionProps) {
  const { data: scheduleHistoryData } = UseGetScheduleHistory({
    activityId,
    status,
    scheduleId,
  });

  return (
    <div className={cn('container')}>
      <CreateCardList activityId={activityId} data={scheduleHistoryData} />
      <Footer totalCount={scheduleHistoryData?.totalCount || 0} />
    </div>
  );
}
