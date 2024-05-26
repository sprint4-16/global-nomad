import { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

interface ButtonProps {
  children: ReactNode;
  type: Type;
  size: Size;
  sx?: CSSProperties;
  onClick?: () => void;
  className?: string;
}

type Type = 'primary' | 'secondary' | 'disabled';
type Size = 'large' | 'medium' | 'small' | 'full';

const cn = classNames.bind(styles);

export default function Button({ type, size, sx, onClick, className, children }: ButtonProps) {
  return (
    <button onClick={onClick} style={sx} className={cn('btn', type, size, className)}>
      {children}
    </button>
  );
}
