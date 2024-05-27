import { CSSProperties, ReactNode, useState } from 'react';
import EyeOff from '@/images/btn/btn_eye_off.svg';
import EyeOn from '@/images/btn/btn_eye_on.svg';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface InputProps {
  label?: ReactNode;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  color?: string;
  sx?: CSSProperties;
  className?: string;
  labelClassName?: string;
  onClick?: () => void;
}

export function Input({ label, type, placeholder, color, sx, onClick, className, labelClassName }: InputProps) {
  return (
    <div className={cn('inputContainer', className)}>
      <label htmlFor={type} className={cn('label', labelClassName)}>
        {label}
      </label>
      {type === 'password' ? (
        <>
          <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} style={sx} />
          <EyeOff className={cn('eyeImg')} onClick={onClick} />
        </>
      ) : (
        <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} />
      )}
    </div>
  );
}
