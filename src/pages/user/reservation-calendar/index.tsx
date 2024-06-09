import ReservationCalendarLayout from '@/pageLayouts/ReservationCalendarLayout/ReservationCalendarLayout';

import { UseGetMyReservationList } from '@/apis/apiHooks/MyActivities';

export default function ReservationCalendarPage() {
  const { data: activityList } = UseGetMyReservationList();

  return <ReservationCalendarLayout activityList={activityList} />;
}
