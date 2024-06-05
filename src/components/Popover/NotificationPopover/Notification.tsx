import classNames from 'classnames/bind';
import styles from './NotificationPopover.module.scss';
import CloseBtn from '@/components/btns/CloseBtn/CloseBtn';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

const cn = classNames.bind(styles);

interface NotificationProps {
  content: string;
  createdAt: string;
  updatedAt: string | null;
  type: 'accepted' | 'rejected';
}

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s 전',
    s: '몇초',
    m: '몇분',
    mm: '%d분',
    h: '몇시간',
    hh: '%d시간',
    d: '하루',
    dd: '%d일',
    M: '한달',
    MM: '%d달',
    y: '일년',
    yy: '%d년',
  },
});

function getElapsedTime(createdAt: string, updatedAt: string | null) {
  if (updatedAt === null) {
    return `${dayjs(createdAt).fromNow()}`;
  }

  return `${dayjs(updatedAt).fromNow()}`;
}

export default function Notification({ content, createdAt, updatedAt, type }: NotificationProps) {
  return (
    <div className={cn('notification')}>
      <div className={cn('header')}>
        <span className={cn('dot', { [type]: updatedAt !== null })}></span>
        <CloseBtn size={15} />
      </div>
      <p className={cn('content')}>{content}</p>
      <div className={cn('footer')}>{getElapsedTime(createdAt, updatedAt)}</div>
    </div>
  );
}
