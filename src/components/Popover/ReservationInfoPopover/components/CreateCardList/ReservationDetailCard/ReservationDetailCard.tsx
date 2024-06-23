import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationDetailCard.module.scss';
import { useQueryClient } from '@tanstack/react-query';

import Button from '../../../../../Button/Button';
import { Chips } from '../../../../../Chips/Chips';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import { UsePatchScheduleStatus } from '@/apis/apiHooks/MyActivities';
import useGetCookie from '@/hooks/useCookies';

import { get, ref, remove, set } from 'firebase/database';
import { database } from '@/firebase';

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

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleConfirmClick = async () => {
    disableOutsideClick();
    handleModalOpen();
    const result = await patchSchedule({ status: 'confirmed' });
    console.log(result);
    changeStatusInFirebase(result.id, result.userId, "accepted")
    setAlertMessage('예약이 확정되었습니다.');
  };

  const handleDeclinedClick = async () => {
    disableOutsideClick();
    handleModalOpen();
    const result = await patchSchedule({ status: 'declined' });
    console.log(result);
    changeStatusInFirebase(result.id, result.userId, "rejected")
    setAlertMessage('예약이 거절되었습니다.');
  };

  const onConfirm = () => {
    queryClient.invalidateQueries({ queryKey: ['reservation'] });
    disableOutsideClick();
  };

  const changeStatusInFirebase = async (reservationId: number, customerId: number, status: "pending" | "rejected" | "accepted") => {
    const { getCookie } = useGetCookie();
    const userId = getCookie('userId');

    try {
      // 기존 위치에서 데이터 가져오기
      console.log(userId, customerId, reservationId)
      const reservationRef = ref(database, `activity/${userId}/${reservationId}`);
      const reservationSnapshot = await get(reservationRef);

      if (reservationSnapshot.exists()) {
        // 데이터 가져오기
        const reservationData = reservationSnapshot.val();
        reservationData.status = status;
        reservationData.createdAt = new Date().toISOString(),

          // 새 위치에 데이터 등록
          await set(ref(database, `activity/${customerId}/${reservationId}`), reservationData);

        // 기존 위치에서 데이터 제거
        await remove(ref(database, `activity/${userId}/${reservationId}`));

        console.log(`Reservation ${reservationId} moved successfully.`);
      } else {
        console.log(`Reservation ${reservationId} not found at ${userId}.`);
      }
    } catch (error) {
      console.error('Error moving reservation:');
    }
  }

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
