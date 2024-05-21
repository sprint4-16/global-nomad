import { ReactNode } from 'react';
import style from './Chips.module.scss';
import classNames from 'classnames';
import { CSSProperties } from 'react';

const cn = classNames.bind(style);

type Size = 'large' | 'medium' | 'small';

interface ChipsProps {
  children: ReactNode;
  className?: string;
  size: Size;
  color?: CSSProperties;
}

export function Chips({ children, className, size, color }: ChipsProps) {
  return (
    <div className={cn('chips', size, className)} style={color}>
      {children}
    </div>
  );
}
