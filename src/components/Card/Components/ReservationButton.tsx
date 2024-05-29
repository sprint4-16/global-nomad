import { useCard } from '../Card';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import styles from '../Card.module.scss';

const cn = classNames.bind(styles);

export function ReservationButton() {
  const { reservationState } = useCard();

  const handleReservationCancelClick = () => {
    // 예약취소 구현
  };

  const handleReviewCreateClick = () => {
    // 후기작성 구현
  };

  if (reservationState === 'completed') {
    return (
      <Button className={cn('reservationButton')} type="secondary" size="medium" onClick={handleReservationCancelClick}>
        예약 취소
      </Button>
    );
  }

  if (reservationState === 'finished') {
    return (
      <Button className={cn('reservationButton')} type="primary" size="medium" onClick={handleReviewCreateClick}>
        후기 작성
      </Button>
    );
  }

  return null;
}
