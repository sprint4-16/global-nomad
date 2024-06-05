import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './NotificationPopover.module.scss';
import { CSSProperties } from 'react';
import Notification from './Notification';

interface NotificationPopoverProps {
  onClose: () => void;
  className?: string;
  sx?: CSSProperties;
}

const cn = classNames.bind(styles);

const SAMPLE_DATA = {
  cursorId: 0,
  notifications: [
    {
      id: 0,
      teamId: 'zy',
      userId: 0,
      content: '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
      createdAt: '2024-06-05T01:18:12.331Z',
      updatedAt: '2024-06-05T01:18:12.331Z',
      deletedAt: '2024-06-04T08:18:12.331Z',
    },
  ],
  totalCount: 0,
};

export default function NotificationPopover({ sx, className, onClose }: NotificationPopoverProps) {
  return (
    <div style={sx} className={cn('container', className)}>
      <Header title="알림 5개" onClose={onClose} isNotificationHeader />
      <ul className={cn('notificationList')}>
        {SAMPLE_DATA.notifications.map((notification) => (
          <li key={notification.id}>
            <Notification
              content={notification.content}
              createdAt={notification.createdAt}
              updatedAt={notification.updatedAt}
              type="accepted"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
