import { useRef, useState } from 'react';
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
  const [disabled, setDisabled] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: onClose, disabled });

  if (!isOpen) {
    return null;
  }
  return (
    <div ref={modalRef}>
      <ReservationInfoPopover
        className={cn(modalPosition)}
        activityId={activityId}
        date={date}
        onClose={onClose}
        disableOutsideClick={() => setDisabled((prev) => !prev)}
      />
    </div>
  );
}
