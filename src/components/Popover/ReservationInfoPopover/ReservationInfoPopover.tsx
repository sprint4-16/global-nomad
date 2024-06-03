import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './ReservationInfoPopover.module.scss';
import { CSSProperties, MouseEvent, useState } from 'react';

interface ReservationInfoPopoverProps {
  onClose: () => void;
  className?: string;
  sx?: CSSProperties;
}

const cn = classNames.bind(styles);

export default function ReservationInfoPopover({ sx, className, onClose }: ReservationInfoPopoverProps) {
  const [selectedNavListItem, setSelectedNavListItem] = useState<'applied' | 'confirmed' | 'rejected'>('applied');

  const handleNavListItemClick = (e: MouseEvent) => {
    setSelectedNavListItem((e.target as HTMLElement).id as 'applied' | 'confirmed' | 'rejected');
  };

  return (
    <div style={sx} className={cn('container', className)}>
      <Header title="예약 정보" onClose={onClose} />
      <ul className={cn('navList')}>
        <li className={cn('navListItem', [selectedNavListItem === 'applied' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="applied">
            신청 12
          </button>
        </li>
        <li className={cn('navListItem', [selectedNavListItem === 'confirmed' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="confirmed">
            확정 10
          </button>
        </li>
        <li className={cn('navListItem', [selectedNavListItem === 'rejected' && 'selected'])}>
          <button onClick={handleNavListItemClick} id="rejected">
            거절 0
          </button>
        </li>
      </ul>

      <div className={cn('footer')}>
        <span className={cn('footerTitle')}>예약현황</span>
        <span className={cn('footerTag')}>
          <span className={cn('point')}>0</span>/10
        </span>
      </div>
    </div>
  );
}
