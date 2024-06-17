import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateReservationModal.module.scss';

import ReservationInfoPopover from './ReservationInfoPopover';
import useOutsideClick from '@/hooks/useOutsideClick';

interface CreateModalProps {
  activityId: number;
  date: string;
  isOpen: boolean;
  onClose: () => void;
  modalPosition: 'notOverflowed' | 'overflowed';
}

const cn = classNames.bind(styles);

export default function CreateReservationModal({ activityId, date, isOpen, onClose, modalPosition }: CreateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: onClose });

  if (!isOpen) {
    return null;
  }
  return (
    <div ref={modalRef}>
      <ReservationInfoPopover className={cn(modalPosition)} activityId={activityId} date={date} onClose={onClose} />
    </div>
  );
}
