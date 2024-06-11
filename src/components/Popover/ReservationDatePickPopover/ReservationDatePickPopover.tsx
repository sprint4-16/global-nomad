import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationDatePickPopover.module.scss';
import CustomedDatePicker from '../../CustomedDatePicker/CustomedDatePicker';
import { CSSProperties } from 'react';
import Button from '@/components/Button/Button';

interface ReservationDatePickPopoverProps {
  onClose: () => void;
  className?: string;
  sx?: CSSProperties;
}

const cn = classNames.bind(styles);

export default function ReservationDatePickPopover({ sx, className, onClose }: ReservationDatePickPopoverProps) {
  return (
    <div style={sx} className={cn('container', className)}>
      <Header title="날짜" onClose={onClose} />
      <div>
        <CustomedDatePicker
          selected={new Date()}
          onChange={(date: Date) => {
            console.log(date);
          }}
        />
      </div>
      <section>
        <h3 className={cn('sectionTitle')}>예약 가능한 시간</h3>
        <ul className={cn('tagList')}>
          <li className={cn('tagListItem')}>
            <span className={cn('tag', 'active')}>14:00~15:00</span>
          </li>
          <li className={cn('tagListItem')}>
            <span className={cn('tag')}>15:00~16:00</span>
          </li>
        </ul>
      </section>

      <Button type="primary" size="full" sx={{ marginTop: '4rem' }}>
        작성하기
      </Button>
    </div>
  );
}
