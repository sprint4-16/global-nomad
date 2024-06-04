import classNames from 'classnames/bind';
import Button from '../../components/Button/Button';
import { Chips } from '../../components/Chips/Chips';
import styles from './ReservationDetailCard.module.scss';

type ReservationState = 'pending' | 'confirmed' | 'declined';

interface Props {
  nickname: string;
  people: number;
  reservationState: ReservationState;
}

export default function ReservationDetailCard({ nickname, people, reservationState }: Props) {
  const cn = classNames.bind(styles);

  const handleConfirmClick = () => {
    console.log('확정하기');
  };

  const handleRejectedClick = () => {
    console.log('거절하기');
  };

  return (
    <div className={cn('reservationDetailCard')}>
      <div className={cn('infoContainer')}>
        <div className={cn('info')}>
          닉네임 <p className={cn('bold')}>{nickname}</p>
        </div>
        <div className={cn('info')}>
          인원 <p className={cn('bold')}>{people}명</p>
        </div>
      </div>
      <div className={cn('footer')}>
        {reservationState == 'pending' && (
          <>
            <Button className={cn('button')} type="primary" size="small" onClick={handleConfirmClick}>
              확정하기
            </Button>
            <Button className={cn('button')} type="secondary" size="small" onClick={handleRejectedClick}>
              거절하기
            </Button>
          </>
        )}
        {reservationState == 'confirmed' && (
          <Chips className={cn('chips', 'confirmed')} type="reservation">
            예약확정
          </Chips>
        )}
        {reservationState == 'declined' && (
          <Chips className={cn('chips', 'declined')} type="confirmed">
            예약거절
          </Chips>
        )}
      </div>
    </div>
  );
}
