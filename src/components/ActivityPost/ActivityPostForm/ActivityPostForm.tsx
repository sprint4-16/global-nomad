import Button from '@/components/Button/Button';
import styles from './ActivityPostForm.module.scss';
import classNames from 'classnames/bind';
import { Input } from '@/components/Input/Input';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import Textarea from '@/components/Textarea/Textarea';
import { DateInput } from '@/components/DateInput/DateInput';
import AddImageBtn from '@/components/btns/AddImageBtn/AddImageBtn';
import ControlTimeBtn from '@/components/btns/ControlTimeBtn/ControlTimeBtn';

export default function ActivityPostForm() {
  const cn = classNames.bind(styles);
  const menuItems = [
    '0:00',
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];
  return (
    <form>
      <div className={cn('titleBox')}>
        <h1>내 정보</h1>
        <Button type="primary" size="medium" htmlType="submit">
          등록하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <Input type="text" placeholder="제목" />
        <Dropdown isLabelVisible={false} />
        <Textarea placeholder="설명" />
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>가격</label>
          <Input type="text" placeholder="가격" />
        </div>
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>주소</label>
          <Input type="text" placeholder="주소" />
        </div>
        <label className={cn('label')}>예약 가능한 시간대</label>
        <div className={cn('reservationTimeWrapper')}>
          <div className={cn('reservationDateBox')}>
            <label className={cn('smallLabel')}>날짜</label>
            <DateInput dateText="YY/MM/DD" />
          </div>
          <div className={cn('reservationTimeContainer')}>
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>시작 시간</label>
              <Dropdown className={cn('dropdown')} isLabelVisible={false} menuItems={menuItems} />
            </div>
            <p className={cn('wave')}>~</p>
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>종료 시간</label>
              <Dropdown className={cn('dropdown')} isLabelVisible={false} menuItems={menuItems} />
            </div>
          </div>
          <div className={cn('controlTimeBtnContainer')}>
            <ControlTimeBtn type={'plus'} />
          </div>
        </div>
        <label className={cn('label')}>배너 이미지</label>
        <div className={cn('imageContainer')}>
          <AddImageBtn />
        </div>
        <label className={cn('label')}>소개 이미지</label>
        <div className={cn('imageContainer')}>
          <AddImageBtn />
        </div>
      </div>
    </form>
  );
}
