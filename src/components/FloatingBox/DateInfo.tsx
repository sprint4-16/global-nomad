import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Stroke from '@/images/icon/icon_stroke.svg';
import CustomedDatePicker from '@/components/CustomedDatePicker/CustomedDatePicker';
import styles from './FloatingBox.module.scss';
import { useMediaQuery } from 'react-responsive';

const cn = classNames.bind(styles);

export default function DateInfo() {
  const isTalbet = useMediaQuery({ query: '(max-width: 745px)' });
  const [tabletSize, setTabletSize] = useState(false);

  const [selectedDate, setSelectedDate] = useState('날짜 선택하기');
  const [datepick, setDatepick] = useState(new Date());

  const handleTempClick = () => {
    setSelectedDate(datepick.toLocaleDateString() + ' 15:00 ~ 16:00');
  };

  useEffect(() => {
    setTabletSize(isTalbet);
  }, [isTalbet]);

  return (
    <div className={cn('dateInfo')}>
      {!tabletSize ? (
        <div>
          <div className={cn('mainText')}>날짜</div>
          <CustomedDatePicker
            selected={datepick}
            onChange={(date) => {
              setDatepick(date);
            }}
          />
        </div>
      ) : (
        <>
          <div className={cn('mainText')}>날짜</div>
          <div className={cn('selectDate')} onClick={handleTempClick}>
            {selectedDate}
          </div>
        </>
      )}
      <div className={cn('reservationTime')}>
        <div className={cn('mainText')}>예약 가능한 시간</div>
        <div className={cn('timeBtns')}>
          <div className={cn('btn')}>14:00~15:00</div>
          <div className={cn('btnClicked')}>15:00~16:00</div>
        </div>
      </div>
      <Stroke width="100%" className={cn('stroke')} />
    </div>
  );
}
