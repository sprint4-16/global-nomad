import { ReactNode, useState } from 'react';
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
  className?: string;
  onClick?: () => void;
}

export function Input({ label, type, placeholder, color, onClick, className }: InputProps) {
  return (
    <div className={cn('inputContainer', className)}>
      <label htmlFor={type} className={cn('label')}>
        {label}
      </label>
      {type === 'password' ? (
        <>
          <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} />
          <EyeOff className={cn('eyeImg')} />
        </>
      ) : (
        <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} />
      )}
    </div>
  );
}
