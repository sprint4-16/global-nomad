import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationDatePickPopover.module.scss';

interface ReservationDatePickPopoverProps {
  onClose: () => void;
}

const cn = classNames.bind(styles);

export default function ReservationDatePickPopover({ onClose }: ReservationDatePickPopoverProps) {
  return (
    <div className={cn('container')}>
      <Header title="날짜" onClose={onClose} />
    </div>
  );
}
