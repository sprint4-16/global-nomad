import classNames from 'classnames/bind';
import styles from './ButtonAlertIcon.module.scss';
import Link from 'next/link';
// import NotificationIcon from '@/images/btn/btn_notification.svg';

const cn = classNames.bind(styles);

export default function ButtonAlertIcon({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/alert">{/* <NotificationIcon className={cn('NotificationIcon')} /> */}</Link>
    </div>
  );
}
