import classNames from 'classnames/bind';
import styles from './NavList.module.scss';

const cn = classNames.bind(styles);

type ReservationState = 'pending' | 'confirmed' | 'declined';

interface NavListProps {
  pendingCount: number;
  confirmedCount: number;
  declinedCount: number;
  selectedNavListItem: string;
  setSelectedNavListItem: (state: ReservationState) => void;
}

export default function NavList({
  pendingCount,
  confirmedCount,
  declinedCount,
  selectedNavListItem,
  setSelectedNavListItem,
}: NavListProps) {
  return (
    <ul className={cn('navList')}>
      <li className={cn('navListItem', [selectedNavListItem === 'pending' && 'selected'])}>
        <button onClick={() => setSelectedNavListItem('pending')}>신청 {pendingCount}</button>
      </li>
      <li className={cn('navListItem', [selectedNavListItem === 'confirmed' && 'selected'])}>
        <button onClick={() => setSelectedNavListItem('confirmed')}>확정 {confirmedCount}</button>
      </li>
      <li className={cn('navListItem', [selectedNavListItem === 'declined' && 'selected'])}>
        <button onClick={() => setSelectedNavListItem('declined')}>거절 {declinedCount}</button>
      </li>
    </ul>
  );
}
