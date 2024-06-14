import NotificationPopover from './NotificationPopover/NotificationPopover';
import ReservationDatePickPopover from './ReservationDatePickPopover/ReservationDatePickPopover';
import ReservationInfoPopover from './ReservationInfoPopover/ReservationInfoPopover';
import classNames from 'classnames/bind';
import styles from './Popover.module.scss';

type PopoverType = 'notification' | 'reservationDatePick' | 'reservationInfo';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopoverType;
  date?: string;
}

function renderPopover(type: PopoverType, onClose: () => void, date?: string) {
  switch (type) {
    case 'notification':
      return <NotificationPopover onClose={onClose} />;
    case 'reservationDatePick':
      return <ReservationDatePickPopover onClose={onClose} />;
    case 'reservationInfo':
      return <ReservationInfoPopover onClose={onClose} date={date ? date : ''} />;
    default:
      return <></>;
  }
}

const cn = classNames.bind(styles);

export default function Popover({ isOpen, onClose, type, date }: PopoverProps) {
  if (!isOpen) {
    return <></>;
  }
  return <div className={cn('container', type)}>{renderPopover(type, onClose, date)}</div>;
}
