import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Stroke from '@/images/icon/icon_stroke.svg';
import CustomedDatePicker from '@/components/CustomedDatePicker/CustomedDatePicker';
import styles from './FloatingBox.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Time } from '@/types/activities.types';
import ReservationDatePickPopover from '../Popover/ReservationDatePickPopover/ReservationDatePickPopover';

const cn = classNames.bind(styles);

interface DateInfoProps {
  datepick: Date;
  onChangeDatepick: (date: Date) => void;
  availableDates: string[];
  obj_mapped_date_times: { [key: string]: Time[] };
  onChangeScheduleId: (scheduleId: number) => void;
  scheduleId: number;
}

export default function DateInfo({
  datepick,
  onChangeDatepick,
  availableDates,
  obj_mapped_date_times,
  onChangeScheduleId,
  scheduleId,
}: DateInfoProps) {
  const isTalbet = useMediaQuery({ query: '(max-width: 745px)' });
  const [tabletSize, setTabletSize] = useState(false);

  const [isPopoverOpened, setIsPopoverOpened] = useState(false);

  useEffect(() => {
    setTabletSize(isTalbet);
  }, [isTalbet]);

  return (
    <>
      {isPopoverOpened && (
        <ReservationDatePickPopover
          onMonthChange={(date) => {
            onChangeDatepick(date);
          }}
          availableDates={availableDates}
          onClose={() => setIsPopoverOpened(false)}
          obj_mapped_date_times={obj_mapped_date_times}
          onChangeScheduleId={onChangeScheduleId}
          datepick={datepick}
          scheduleId={scheduleId}
        />
      )}
      <div className={cn('dateInfo')}>
        {!tabletSize ? (
          <div>
            <div className={cn('mainText')}>날짜</div>
            <CustomedDatePicker
              selected={datepick}
              onChange={(date) => {
                onChangeDatepick(date);
              }}
              onMonthChange={(date) => {
                onChangeDatepick(date);
              }}
              availableDates={availableDates}
            />
          </div>
        ) : (
          <>
            <div className={cn('mainText')}>날짜</div>
            <div className={cn('selectDate')} onClick={() => setIsPopoverOpened(true)}>
              날짜 선택하기
            </div>
          </>
        )}
        <div className={cn('reservationTime')}>
          <div className={cn('mainText')}>예약 가능한 시간</div>
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
        </div>
        <Stroke width="100%" className={cn('stroke')} />
      </div>
    </>
  );
}
