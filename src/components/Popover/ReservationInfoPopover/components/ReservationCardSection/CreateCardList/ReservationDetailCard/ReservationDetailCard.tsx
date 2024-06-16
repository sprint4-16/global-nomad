import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationDetailCard.module.scss';

import Button from '../../../../../../Button/Button';
import { Chips } from '../../../../../../Chips/Chips';
import CreatePopupModal from '@/components/Popup/CreatePopupModal';
import { UsePatchScheduleStatus } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

interface Props {
  activityId: number;
  reservationId: number;
  nickname: string;
  people: number;
  reservationState: 'pending' | 'confirmed' | 'declined';
}

export default function ReservationDetailCard({
  activityId,
  reservationId,
  nickname,
  people,
  reservationState,
}: Props) {
  const { mutate: patchSchedule } = UsePatchScheduleStatus({ activityId, reservationId });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmClick = () => {
    handleModalOpen();
    patchSchedule({ status: 'confirmed' });
  };

  const handleRejectedClick = () => {
    patchSchedule({ status: 'declined' });
  };

  const onConfirm = () => {
    window.location.reload();
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
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
      {isModalOpen && (
        <CreatePopupModal
          modalType="alert"
          alertMessage="test"
          onConfirm={onConfirm}
          isModalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
        />
      )}
    </div>
  );
}
