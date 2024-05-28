import { CSSProperties, ReactNode, forwardRef, useState } from 'react';
import EyeOff from '@/images/btn/btn_eye_off.svg';
import EyeOn from '@/images/btn/btn_eye_on.svg';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';

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
  register?: UseFormRegisterReturn;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, placeholder, color, sx, onClick, className, labelClassName, register, ...props }, ref) => {
    return (
      <div className={cn('inputContainer', className)}>
        <label htmlFor={type} className={cn('label', labelClassName)}>
          {label}
        </label>
        {type === 'password' ? (
          <>
            <input
              type={type}
              id={type}
              placeholder={placeholder}
              className={cn('input', color)}
              style={sx}
              ref={ref}
              {...register}
            />
            <EyeOff className={cn('eyeImg')} onClick={onClick} />
          </>
        ) : (
          <input
            type={type}
            id={type}
            placeholder={placeholder}
            className={cn('input', color)}
            ref={ref}
            {...register}
          />
        )}
      </div>
    );
  },
);
