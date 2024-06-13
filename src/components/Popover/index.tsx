import NotificationPopover from './NotificationPopover/NotificationPopover';
import ReservationDatePickPopover from './ReservationDatePickPopover/ReservationDatePickPopover';
import classNames from 'classnames/bind';
import styles from './Popover.module.scss';

type PopoverType = 'notification' | 'reservationDatePick';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopoverType;
}

function renderPopover(type: PopoverType, onClose: () => void) {
  switch (type) {
    case 'notification':
      return <NotificationPopover onClose={onClose} />;
    case 'reservationDatePick':
      return <ReservationDatePickPopover onClose={onClose} />;
    default:
      return <></>;
  }
}

const cn = classNames.bind(styles);

export default function Popover({ isOpen, onClose, type }: PopoverProps) {
  if (!isOpen) {
    return <></>;
  }
  return <div className={cn('container', type)}>{renderPopover(type, onClose)}</div>;
}
