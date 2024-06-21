import classNames from 'classnames/bind';
import styles from './ButtonAlertIcon.module.scss';

import NotificationIcon from '@/images/btn/btn_notification.svg';

const cn = classNames.bind(styles);

export default function ButtonAlertIcon({ onClick }: { onClick: () => void }) {
  return (
    <div className={cn('notificationContainer')} onClick={onClick}>
      <NotificationIcon width="20" height="20" viewBox="0 0 24 24" />
    </div>
  );
}
