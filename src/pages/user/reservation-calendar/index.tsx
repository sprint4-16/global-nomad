import ReservationCalendarLayout from '@/pageLayouts/ReservationCalendarLayout/ReservationCalendarLayout';
import { useGetReservation } from '@/apis/apiHooks/MyReservations';

export default function ReservationCalendarPage() {
  const { data } = useGetReservation();
  return <ReservationCalendarLayout data={data} />;
}
