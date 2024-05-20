import { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

interface ButtonProps {
  children: ReactNode;
  type: ButtonType;
}

type ButtonType = 'primary' | 'secondary' | 'disabled';

const cn = classNames.bind(styles);

export default function Button({ type, children }: ButtonProps) {
  return <button className={cn(type)}>{children}</button>;
}
