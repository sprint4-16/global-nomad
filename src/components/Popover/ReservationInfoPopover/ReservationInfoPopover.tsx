import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationInfoPopover.module.scss';
import { CSSProperties, MouseEvent, useState } from 'react';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import ReservationDetailCard from '@/pages/card/ReservationDetailCard';

interface ReservationInfoPopoverProps {
  onClose: () => void;
  className?: string;
  sx?: CSSProperties;
  date: string;
}

type ReservationState = 'pending' | 'confirmed' | 'declined';

const cn = classNames.bind(styles);

const SAMPLE_DATAS = {
  pending: {
    cursorId: 0,
    totalCount: 0,
    reservations: [
      {
        id: 0,
        nickname: '김진주',
        status: 'pending',
        headCount: 10,
      },
      {
        id: 0,
        nickname: '김태야',
        status: 'pending',
        headCount: 8,
      },
    ],
  },

  confirmed: {
    cursorId: 0,
    totalCount: 0,
    reservations: [
      {
        id: 0,
        nickname: '김주진',
        status: 'confirmed',
        headCount: 5,
      },
    ],
  },

  declined: {
    cursorId: 0,
    totalCount: 0,
    reservations: [
      {
        id: 0,
        nickname: '김야태',
        status: 'declined',
        headCount: 3,
      },
    ],
  },
} as const;

export default function ReservationInfoPopover({ sx, className, onClose, date }: ReservationInfoPopoverProps) {
  const [selectedNavListItem, setSelectedNavListItem] = useState<ReservationState>('pending');

  const handleNavListItemClick = (e: MouseEvent) => {
    setSelectedNavListItem((e.target as HTMLElement).id as ReservationState);
  };

  return (
    <div style={sx} className={cn('container', className)}>
      <Header title="예약 정보" onClose={onClose} />
      <ul className={cn('navList')}>
        <li className={cn('navListItem', [selectedNavListItem === 'pending' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="pending">
            신청 {SAMPLE_DATAS.pending.reservations.length}
          </button>
        </li>
        <li className={cn('navListItem', [selectedNavListItem === 'confirmed' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="confirmed">
            확정 {SAMPLE_DATAS.confirmed.reservations.length}
          </button>
        </li>
        <li className={cn('navListItem', [selectedNavListItem === 'declined' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="declined">
            거절 {SAMPLE_DATAS.declined.reservations.length}
          </button>
        </li>
      </ul>

      <div className={cn('contents')}>
        <section className={cn('section')}>
          <h2 className={cn('sectionTitle')}>예약 날짜</h2>
          {/* 이 부분 props로*/}
          <p
            className={cn('sectionLabel')}
          >{`${date.split('-')[0]}년 ${date.split('-')[1]}월 ${date.split('-')[2]}일`}</p>
          <Dropdown isLabelVisible={false} menuItems={['14:00 ~ 15:00']} className={styles.dropdown} />
        </section>

        <section className={cn('section')}>
          <h2 className={cn('sectionTitle')}>예약 내역</h2>
          <ul className={cn('cardList')}>
            {SAMPLE_DATAS[selectedNavListItem].reservations.map((reservation) => (
              <li key={reservation.id} className={cn('cardListItem')}>
                <ReservationDetailCard
                  nickname={reservation.nickname}
                  people={reservation.headCount}
                  reservationState={reservation.status}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className={cn('footer')}>
        <span className={cn('footerTitle')}>예약현황</span>
        <span className={cn('footerTag')}>
          <span className={cn('point')}>0</span>/10
        </span>
      </div>
    </div>
  );
}
