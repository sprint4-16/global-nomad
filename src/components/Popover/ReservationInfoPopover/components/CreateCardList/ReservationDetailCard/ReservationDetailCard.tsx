import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationDetailCard.module.scss';
import { useQueryClient } from '@tanstack/react-query';

import Button from '../../../../../Button/Button';
import { Chips } from '../../../../../Chips/Chips';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import { UsePatchScheduleStatus } from '@/apis/apiHooks/MyActivities';
import useGetCookie from '@/hooks/useCookies';
import changeStatusInFirebase from '@/firebase/changeStatusInFireBase';
import { COOKIE } from '@/constants';

const cn = classNames.bind(styles);

interface Props {
  activityId: number;
  reservationId: number;
  nickname: string;
  headCount: number;
  reservationState: 'pending' | 'confirmed' | 'declined';
  disableOutsideClick: () => void;
}

export default function ReservationDetailCard({
  activityId,
  reservationId,
  nickname,
  headCount,
  reservationState,
  disableOutsideClick,
}: Props) {
  const { mutateAsync: patchSchedule } = UsePatchScheduleStatus({ activityId, reservationId });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const queryClient = useQueryClient();

  const { getCookie } = useGetCookie();
  const userId = Number(getCookie(COOKIE.USER_ID));

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleConfirmClick = async () => {
    disableOutsideClick();
    handleModalOpen();
    const result = await patchSchedule({ status: 'confirmed' });
    console.log(result);
    changeStatusInFirebase(result.id, result.userId, userId, 'accepted');
    setAlertMessage('예약이 확정되었습니다.');
  };

  const handleDeclinedClick = async () => {
    disableOutsideClick();
    handleModalOpen();
    const result = await patchSchedule({ status: 'declined' });
    console.log(result);
    changeStatusInFirebase(result.id, result.userId, userId, 'rejected');
    setAlertMessage('예약이 거절되었습니다.');
  };

  const onConfirm = () => {
    queryClient.invalidateQueries({ queryKey: ['reservation'] });
    disableOutsideClick();
  };

  return (
    <>
      <div className={cn('reservationDetailCard')}>
        <div className={cn('infoContainer')}>
          <div className={cn('info')}>
            닉네임 <p className={cn('bold')}>{nickname}</p>
          </div>
          <div className={cn('info')}>
            인원 <p className={cn('bold')}>{headCount}명</p>
          </div>
        </div>
        <div className={cn('footer')}>
          {reservationState == 'pending' && (
            <>
              <Button className={cn('button')} type="primary" size="small" onClick={handleConfirmClick}>
                확정하기
              </Button>
              <Button className={cn('button')} type="secondary" size="small" onClick={handleDeclinedClick}>
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
      {isModalOpen && (
        <AlertModal
          alertMessage={alertMessage}
          onConfirm={onConfirm}
          isModalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
        />
      )}
    </>
  );
}
