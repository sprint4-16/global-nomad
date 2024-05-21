import { ReactNode } from 'react';
import style from './Chips.module.scss';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

const cn = classNames.bind(style);

type Size = 'large' | 'medium' | 'small';

interface ChipsProps {
  children: ReactNode;
  className?: string;
  size: Size;
  color?: string;
}

export function Chips({ children, className, size, color }: ChipsProps) {
  const getFontColor = (bgColor: string | undefined): string => {
    if (!bgColor) return '#000';

    switch (bgColor.toLowerCase()) {
      case '#ffffff':
        return '#0085ff';
      case '#0085ff':
        return '#fff';
      case '#dddddd':
        return '#4b4b4b';
      case '#fff4e8':
        return '#ff7c1d';
      default:
        return '#000';
    }
  };
  const chipStyle: CSSProperties = {
    backgroundColor: color,
    color: getFontColor(color),
  };

  return (
    <div className={cn('chips', size, className)} style={chipStyle}>
      {children}
    </div>
  );
}
