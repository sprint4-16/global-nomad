import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import CloseBtn from '@/components/btns/CloseBtn/CloseBtn';
import styles from './NotificationPopover.module.scss';
import { ref, remove } from 'firebase/database';
import { database } from '@/firebase';
import useGetCookie from '@/hooks/useCookies';
import { useEffect, useState } from 'react';
import { COOKIE } from '@/constants';

const cn = classNames.bind(styles);

interface NotificationProps {
  content: {
    id: number;
    activityId: number;
    customerId: number;
    schedule: string;
    title: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
  };
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

const STATUS = {
  pending: '새로',
  accepted: '승인',
  rejected: '거절',
};

function getElapsedTime(createdAt: string) {
  return `${dayjs(createdAt).fromNow()}`;
}

const handleDeleteClick = async (reservationId: number, masterId: number) => {
  const setDelete = async (reservationId: number) => {
    await remove(ref(database, `activity/${masterId}/${reservationId}`));
  };

  try {
    await setDelete(reservationId);
  } catch (error) {
    console.log(error);
  }
};

export default function Notification({ content }: NotificationProps) {
  const { getCookie } = useGetCookie();
  const userId = getCookie(COOKIE.USER_ID);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (content.status == 'pending') {
      setIsPending(false);
    } else {
      setIsPending(true);
    }
  }, [content]);

  return (
    <div className={cn('notification')}>
      <div className={cn('header')}>
        <span className={cn('dot', { [content.status]: content.status !== null })}></span>
        {isPending && (
          <CloseBtn
            size={15}
            onClick={() => {
              handleDeleteClick(content.id, Number(userId));
            }}
          />
        )}
      </div>
      <span className={cn('content')}>
        {content.title}({content.schedule}) 예약이
      </span>

      <span className={cn('content', { [content.status]: content.status !== null })}> {STATUS[content.status]}</span>
      {content.status == 'pending' ? (
        <span className={cn('content')}> 추가 되었습니다.</span>
      ) : (
        <span className={cn('content')}> 되었습니다.</span>
      )}
      <div className={cn('footer')}>{getElapsedTime(content.createdAt)}</div>
    </div>
  );
}
