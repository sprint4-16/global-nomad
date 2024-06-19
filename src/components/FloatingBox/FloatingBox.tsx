import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import Stroke from '@/images/icon/icon_stroke.svg';

import DateInfo from './DateInfo';
import HeadCountInfo from './HeadCountInfo';
import PriceInfo from './PriceInfo';
import { priceDataForm } from './priceDataForm';
import styles from './FloatingBox.module.scss';
import { useGetAvailableSchedule } from '@/apis/apiHooks/temporary';
import { AvailableScheduleType, Time } from '@/types/activities.types';

const cn = classNames.bind(styles);

interface FloatingBoxProps {
  price: number;
  activityId: string;
}

function getObjMappedDateAndTimes(datas: AvailableScheduleType) {
  let results = {};
  datas.forEach((data) => {
    results = {
      ...results,
      [data.date]: data.times,
    };
  });

  return results;
}

export default function FloatingBox({ price, activityId }: FloatingBoxProps) {
  const [count, setCount] = useState(1);

  const [datepick, setDatepick] = useState(new Date());
  const [scheduleId, setScheduleId] = useState(-1);
  const { data } = useGetAvailableSchedule({
    activityId,
    year: String(datepick.getFullYear()),
    month: String(datepick.getMonth() + 1 < 10 ? `0${datepick.getMonth() + 1}` : `${datepick.getMonth() + 1}`),
  });

  const obj_mapped_date_times = (data && getObjMappedDateAndTimes(data)) as { [key: string]: Time[] };

  return (
    <div className={cn('container')}>
      <div className={cn('price')}>
        {priceDataForm(price, 1)}
        <span className={cn('per')}>/ 인</span>
      </div>
      <Stroke width="100%" className={cn('stroke')} />
      <DateInfo
        datepick={datepick}
        onChangeDatepick={(date: Date) => {
          setDatepick(date);
        }}
        availableDates={data?.map((item) => item.date.split('-')[2]) as string[]}
        obj_mapped_date_times={obj_mapped_date_times}
        onChangeScheduleId={(scheduleId: number) => setScheduleId(scheduleId)}
        scheduleId={scheduleId}
      />
      <HeadCountInfo count={count} setCount={setCount} />
      <Button type="primary" size="large" className={cn('reservationBtn')}>
        예약하기
      </Button>
      <Stroke width="100%" className={cn('stroke')} />
      <PriceInfo price={price} count={count} />
    </div>
  );
}
