import { ref, set } from 'firebase/database';
import { database } from '@/firebase';

interface ScheduleEntry {
  id: number;
  startTime: string;
  endTime: string;
}

interface Data {
  [key: string]: ScheduleEntry[];
}

interface activityData {
  id: number;
  userId: number;
  title: string;
  createdAt: string;
}

export default async function saveActivityToFirebase(
  activityData: activityData,
  obj_mapped_date_times: Data,
  scheduleId: number,
  reservationId: number,
) {
  const findScheduleById = (data: Data, id: number) => {
    for (const date in data) {
      const schedules = data[date];
      for (const schedule of schedules) {
        if (schedule.id === id) {
          return { date, ...schedule };
        }
      }
    }
    return null;
  };

  const setActivityId = async (activityData: activityData) => {
    const schedule = findScheduleById(obj_mapped_date_times, scheduleId);
    const scheduleString = schedule
      ? `${schedule.date} ${schedule.startTime} ~ ${schedule.endTime}`
      : 'No schedule available';

    await set(ref(database, `activity/${activityData.userId}/${reservationId}`), {
      id: reservationId,
      activityId: activityData.id,
      title: activityData.title,
      customerId: 1234,
      schedule: scheduleString,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
  };

  // 게시물 유저정보 등록
  try {
    await setActivityId(activityData);
  } catch (error) {
    console.log(error);
  }
}
