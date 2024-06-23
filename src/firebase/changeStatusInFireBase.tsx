import { database } from '@/firebase';
import { get, ref, remove, set } from 'firebase/database';

export default async function changeStatusInFirebase(
  reservationId: number,
  customerId: number,
  userId: number,
  status: 'pending' | 'rejected' | 'accepted',
) {
  try {
    // 기존 위치에서 데이터 가져오기
    const reservationRef = ref(database, `activity/${userId}/${reservationId}`);
    const reservationSnapshot = await get(reservationRef);

    if (reservationSnapshot.exists()) {
      // 데이터 가져오기
      const reservationData = reservationSnapshot.val();
      reservationData.status = status;
      (reservationData.createdAt = new Date().toISOString()),
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
