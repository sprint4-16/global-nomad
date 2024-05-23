import { ReactNode } from 'react';
import style from './Chips.module.scss';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

const cn = classNames.bind(style);

type Size = 'large' | 'medium' | 'small';
type ChipType = 'seat' | 'reservation' | 'complete' | 'confirmed';

interface ChipsProps {
  children: ReactNode;
  className?: string;
  size: Size;
  type: ChipType;
}

export function Chips({ children, className, size, type }: ChipsProps) {
  return <div className={cn('chips', size, className, type)}>{children}</div>;
}
