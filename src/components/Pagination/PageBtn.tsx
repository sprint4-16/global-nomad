import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';

import styles from './Pagination.module.scss';

const cn = classNames.bind(styles);

interface PageBtnProps {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}
export default function PageBtn({ direction, disabled, onClick }: PageBtnProps) {
  return (
    <button className={cn('pageBtn')} onClick={onClick} disabled={disabled}>
      <ArrowDown
        className={cn(direction === 'left' ? 'pageLeft' : 'pageRight')}
        fill={disabled ? '#A1A1A1' : '#0B3B2D'}
      />
    </button>
  );
}
