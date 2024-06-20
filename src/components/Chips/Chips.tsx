import { ReactNode, useState, MouseEvent } from 'react';
import classNames from 'classnames/bind';
import style from './Chips.module.scss';

import ReservationInfoPopover from '../Popover/ReservationInfoPopover/ReservationInfoPopover';

const cn = classNames.bind(style);

interface ChipsProps {
  children: ReactNode;
  className?: string;
  type: 'seat' | 'reservation' | 'complete' | 'confirmed';
  activityId?: number;
  date?: string;
}

export function Chips({ children, className, type, activityId, date }: ChipsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<'notOverflowed' | 'overflowed'>('notOverflowed');

  const handleModalPosition = (e: MouseEvent) => {
    if (e && !(e.clientX <= window.innerWidth - 42.9 * 10)) {
      setModalPosition('overflowed');
    }
  };

  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={cn('chips', className, type)}
        onClick={(e) => {
          if (type === 'complete') return;
          handleModalOpen();
          handleModalPosition(e);
        }}
      >
        {children}
      </div>
      {activityId && date && (
        <ReservationInfoPopover
          activityId={activityId}
          date={date}
          isOpen={isModalOpen}
          onClose={handleModalOpen}
          modalPosition={modalPosition}
        />
      )}
    </>
  );
}
