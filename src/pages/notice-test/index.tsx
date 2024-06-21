import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { onValue, ref, remove, set } from 'firebase/database';
import { database } from '../../firebase/index';

interface ReservationData {
  activityId: number;
  reservationId: number;
  masterId: number;
  customerId: number;
  scheduleId: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function NoticeTest() {
  // 임시 데이터 수정 가능성 높음
  const [activityId] = useState(987);
  const [title] = useState('함께하면 즐거운 스트릿 댄스');
  const [reservationId] = useState(1575);
  const [masterId] = useState(343);
  const [customerId] = useState(111);
  const [scheduleId] = useState('2023-01-14 15:00~18:00');
  const [status] = useState('pending');
  const [createdAt] = useState('2024-06-09T23:04:04.903Z');

  const [reservationData] = useState<ReservationData>({
    activityId: activityId,
    title: title,
    reservationId: reservationId,
    masterId: masterId,
    customerId: customerId,
    scheduleId: scheduleId,
    status: status,
    createdAt: createdAt,
  });

  const [dataBaseData, setDataBaseData] = useState<ReservationData[]>([]);

  // 예약 신청
  const handleReservationClick = async () => {
    const setActivityId = async (reservationData: ReservationData) => {
      await set(ref(database, `activity/${masterId}/${reservationId}`), {
        reservationId: reservationData.reservationId,
        activityId: reservationData.activityId,
        title: reservationData.title,
        customerId: reservationData.customerId,
        scheduleId: reservationData.scheduleId,
        status: reservationData.status,
        createdAt: reservationData.createdAt,
      });
    };

    // 게시물 유저정보 등록
    try {
      await setActivityId(reservationData);
    } catch (error) {
      console.log(error);
    }
  };

  // 수락 등록
  const handleAcceptClick = async (reservationId: number, customerId: number) => {
    const setAccept = async (reservationData: ReservationData) => {
      await set(ref(database, `activity/${customerId}/${reservationId}`), {
        masterId: reservationData.masterId,
        scheduleId: reservationData.scheduleId,
        status: 'confirm',
        createdAt: reservationData.createdAt,
      });
      await remove(ref(database, `activity/${masterId}/${reservationId}`));
    };

    // 등록자 대기 상태 삭제 및 예약자 예약완료 상태 변경
    try {
      await setAccept(reservationData);
    } catch (error) {
      console.log(error);
    }
  };

  // 실시간 대기
  useEffect(() => {
    const activityRef = ref(database, `activity/${masterId}`);
    const unsubscribe = onValue(activityRef, (data) => {
      const temp = data.val();
      const reservationList = temp ? Object.values(temp) : [];
      setDataBaseData(reservationList as ReservationData[]);
    });

    return () => unsubscribe();
  }, [masterId]);

  return (
    <div>
      알림 테스트
      <Button size="large" type="primary" onClick={handleReservationClick}>
        예약 신청
      </Button>
      {dataBaseData &&
        dataBaseData.map((reservation) => (
          <div key={reservation.reservationId}>
            <p>예약 ID: {reservation.reservationId}</p>
            <p>유저 ID: {reservation.customerId ? reservation.customerId : reservation.masterId}</p>
            <p>상태: {reservation.status}</p>
            {reservation.status === 'pending' ? (
              <>
                <h1 style={{ color: 'green' }}>예약이 새로 들어왔어요.</h1>
                <Button
                  size="large"
                  type="secondary"
                  onClick={() => {
                    handleAcceptClick(reservation.reservationId, reservation.customerId);
                  }}
                >
                  수락
                </Button>
              </>
            ) : (
              <div>
                <h1 style={{ color: 'blue' }}>예약이 승인 되었습니다.</h1>
              </div>
            )}
            <div>=================================================================</div>
          </div>
        ))}
    </div>
  );
}
