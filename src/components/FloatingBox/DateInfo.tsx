import classNames from 'classnames/bind';
import Stroke from '@/images/icon/icon_stroke.svg';

import styles from './FloatingBox.module.scss';

const cn = classNames.bind(styles);

export default function DateInfo() {
  return (
    <div className={cn('dateInfo')}>
      <div className={cn('mainText')}>날짜</div>
      <div className={cn('temp')}></div>
      <div className={cn('selectDate')}>날짜 선택하기</div>
      <div className={cn('reservationTime')}>
        <div className={cn('mainText')}>예약 가능한 시간</div>
        <div className={cn('tempBtns')}>
          <div className={cn('btn1')}>14:00~15:00</div>
          <div className={cn('btn2')}>15:00~16:00</div>
        </div>
      </div>
      <Stroke width={336} className={cn('stroke')} />
    </div>
  );
}
