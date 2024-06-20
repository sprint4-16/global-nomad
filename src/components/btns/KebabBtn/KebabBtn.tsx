import MeatBallBtnIcon from '@/images/btn/btn_meatball.svg';
import { MouseEvent } from 'react';

interface KebabBtnProps {
  id?: string;
  onClick?: (e?: MouseEvent) => void;
  onMouseDown?: (e?: MouseEvent) => void;
  size?: number;
}

export default function KebabBtn({ id, onClick, onMouseDown, size = 40 }: KebabBtnProps) {
  return (
    <button id={id} onClick={(e) => onClick?.(e)} onMouseDown={(e) => onMouseDown?.(e)}>
      <MeatBallBtnIcon width={size} height={size} />
    </button>
  );
}
