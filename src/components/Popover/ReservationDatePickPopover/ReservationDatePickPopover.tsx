import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationDatePickPopover.module.scss';
import CustomedDatePicker from '../../CustomedDatePicker/CustomedDatePicker';
import { CSSProperties } from 'react';

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
        <CustomedDatePicker />
      </div>
    </div>
  );
}
