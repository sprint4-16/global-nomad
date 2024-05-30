import classNames from 'classnames/bind';
import styles from './FloatingBox.module.scss';
import Stroke from '@/images/icon/icon_stroke.svg';

const cn = classNames.bind(styles);

export default function DateInfo() {
  return (
    <div className={cn('dateInfo')}>
      <div className={cn('mainText')}>날짜</div>
      <div className={cn('temp')}></div>
      <div className={cn('selectDate')}>날짜 선택하기</div>
      <div className={cn('reservationTime')}>
        <div className={cn('mainText')}>예약 가능한 시간</div>
        <div className={cn('timeBtns')}>
          <div className={cn('btn')}>14:00~15:00</div>
          <div className={cn('btnClicked')}>15:00~16:00</div>
        </div>
      </div>
      <Stroke width={336} className={cn('stroke')} />
    </div>
  );
}
