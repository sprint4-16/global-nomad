import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import { CSSProperties, useEffect, useState } from 'react';
import Notification from './Notification';
import { onValue, ref } from 'firebase/database';
import { database } from '@/firebase';
import styles from './NotificationPopover.module.scss';

interface NotificationPopoverProps {
  className?: string;
  sx?: CSSProperties;
  onClose: () => void;
}

interface ReservationData {
  id: number;
  activityId: number;
  customerId: number;
  schedule: string;
  title: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

const cn = classNames.bind(styles);

export default function NotificationPopover({ sx, className, onClose }: NotificationPopoverProps) {
  const [masterId] = useState(341);
  const [notificationList, setDataBaseData] = useState<ReservationData[]>([]);

  // 실시간 대기
  useEffect(() => {
    const activityRef = ref(database, `activity/${masterId}`);
    const unsubscribe = onValue(activityRef, (data) => {
      const temp = data.val();
      const reservationList = temp ? Object.values(temp) : [];
      setDataBaseData(reservationList as ReservationData[]);
    });

    return () => unsubscribe();
  }, [masterId]);

  return (
    <div style={sx} className={cn('container', className)}>
      <Header title={`알림 ${notificationList.length}개`} onClose={onClose} isNotificationHeader />
      <ul className={cn('notificationList')}>
        {notificationList.map((notification) => (
          <li key={notification.id}>
            <Notification content={notification} />
          </li>
        ))}
      </ul>
    </div>
  );
}
