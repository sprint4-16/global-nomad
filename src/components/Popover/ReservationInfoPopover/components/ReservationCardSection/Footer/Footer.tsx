import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

interface FooterProps {
  selectedStatus: 'pending' | 'confirmed' | 'declined';
  reservations: {
    status: 'pending' | 'confirmed' | 'declined';
  }[];
}

export default function Footer({ selectedStatus, reservations }: FooterProps) {
  const confirmedCount = reservations?.filter((reservation) => reservation.status === 'confirmed').length;
  const declinedCount = reservations?.filter((reservation) => reservation.status === 'declined').length;

  return (
    <div className={cn('footer')}>
      <span className={cn('footerTitle')}>
        {selectedStatus === 'confirmed' || selectedStatus === 'declined' ? '예약 현황' : ''}
      </span>
      <span className={cn('footerTag')}>
        {selectedStatus === 'confirmed' && `${confirmedCount}명`}
        {selectedStatus === 'declined' && `${declinedCount}명`}
      </span>
    </div>
  );
}
