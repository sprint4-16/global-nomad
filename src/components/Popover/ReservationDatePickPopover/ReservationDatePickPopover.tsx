import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationDatePickPopover.module.scss';
import CustomedDatePicker from '../../CustomedDatePicker/CustomedDatePicker';
import { CSSProperties } from 'react';
import Button from '@/components/Button/Button';
import { Time } from '@/types/activities.types';

interface ReservationDatePickPopoverProps {
  onClose: () => void;
  className?: string;
  sx?: CSSProperties;
  onMonthChange: (date: Date) => void;
  availableDates: string[];
  obj_mapped_date_times: { [key: string]: Time[] };
  onChangeScheduleId: (scheduleId: number) => void;
  datepick: Date;
  scheduleId: number;
}

const cn = classNames.bind(styles);

export default function ReservationDatePickPopover({
  sx,
  className,
  onClose,
  onMonthChange,
  availableDates,
  obj_mapped_date_times,
  onChangeScheduleId,
  datepick,
  scheduleId,
}: ReservationDatePickPopoverProps) {
  return (
    <div style={sx} className={cn('container', className)}>
      <Header title="날짜" onClose={onClose} />
      <div>
        <CustomedDatePicker
          selected={new Date()}
          onChange={(date: Date) => {
            console.log(date);
          }}
          onMonthChange={onMonthChange}
          availableDates={availableDates}
        />
      </div>
      <section>
        <h3 className={cn('sectionTitle')}>예약 가능한 시간</h3>
        <ul className={cn('tagList')}>
          <li className={cn('tagListItem')}>
            <span className={cn('tag', 'active')}>14:00~15:00</span>
          </li>
          <div className={cn('timeBtns')}>
            {obj_mapped_date_times &&
              `${datepick.getFullYear()}-${(datepick.getMonth() + 1).toString().padStart(2, '0')}-${datepick.getDate().toString().padStart(2, '0')}` in
                obj_mapped_date_times &&
              obj_mapped_date_times[
                `${datepick.getFullYear()}-${(datepick.getMonth() + 1).toString().padStart(2, '0')}-${datepick.getDate().toString().padStart(2, '0')}`
              ]?.map((time) => (
                <div
                  key={time.id}
                  className={cn('btn', { btnClicked: time.id === scheduleId })}
                  onClick={() => onChangeScheduleId(time.id)}
                >
                  {time.startTime}~{time.endTime}
                </div>
              ))}
            {/* <div className={cn('btnClicked')}>15:00~16:00</div> */}
          </div>
        </ul>
      </section>

      <Button type="primary" size="full" sx={{ marginTop: '4rem' }}>
        작성하기
      </Button>
    </div>
  );
}
