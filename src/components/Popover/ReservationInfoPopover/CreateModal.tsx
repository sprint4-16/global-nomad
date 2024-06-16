import { useRef } from 'react';

import ReservationInfoPopover from './ReservationInfoPopover';
import useOutsideClick from '@/hooks/useOutsideClick';

interface CreateModalProps {
  activityId: number;
  date: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ activityId, date, isOpen, onClose }: CreateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: onClose });

  if (!isOpen) {
    return null;
  }
  return (
    <div ref={modalRef}>
      <ReservationInfoPopover activityId={activityId} date={date} onClose={onClose} />
    </div>
  );
}
