import { ReactNode } from 'react';
import style from './Chips.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(style);

type ChipType = 'seat' | 'reservation' | 'complete' | 'confirmed';

interface ChipsProps {
  children: ReactNode;
  className?: string;
  type: ChipType;
}

export function Chips({ children, className, type }: ChipsProps) {
  return <div className={cn('chips', className, type)}>{children}</div>;
}
