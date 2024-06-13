import { ReactNode, useState } from 'react';
import style from './Chips.module.scss';
import classNames from 'classnames/bind';
import CreateModal from '../Popover/ReservationInfoPopover/CreateModal';

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

  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className={cn('chips', className, type)} onClick={handleModalOpen}>
        {children}
      </div>
      {activityId && date && (
        <CreateModal activityId={activityId} date={date} isOpen={isModalOpen} onClose={handleModalOpen} />
      )}
    </>
  );
}
