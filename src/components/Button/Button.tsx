import { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type: 'primary' | 'secondary';
  disabled?: boolean;
  size: 'large' | 'medium' | 'small' | 'full';
  sx?: CSSProperties;
  onClick?: () => void;
}

const cn = classNames.bind(styles);

export default function Button({ className, children, type, disabled = false, size, sx, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick} style={sx} className={cn('btn', className, type, size, { disabled })}>
      {children}
    </button>
  );
}
