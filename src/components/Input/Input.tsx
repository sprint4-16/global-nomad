import { CSSProperties, ChangeEvent, ReactNode, forwardRef, useState } from 'react';
import VisibilityBtn from '@/components/btns/VisibilityBtn/VisibilityBtn';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';

const cn = classNames.bind(styles);

interface InputProps {
  label?: ReactNode;
  type: React.HTMLInputTypeAttribute;
  id?: string;
  placeholder?: string;
  color?: string;
  sx?: CSSProperties;
  className?: string;
  labelClassName?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
  readOnly?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      id,
      placeholder,
      color,
      sx,
      onClick,
      onChange,
      className,
      labelClassName,
      value,
      readOnly,
      register,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const buttonStyle: CSSProperties = {
      padding: '1.4rem 2rem',
      position: 'absolute',
      width: '2.4rem',
      height: '2.4rem',
      bottom: '2.6rem',
      right: '2.6rem',
    };

    return (
      <div className={cn('inputContainer', className)}>
        <label htmlFor={type} className={cn('label', labelClassName)}>
          {label}
        </label>
        <div className={cn('inputWrapper')}>
          <input
            type={type === 'password' && isPasswordVisible ? 'text' : type}
            id={id}
            placeholder={placeholder}
            className={cn('input', color)}
            style={sx}
            value={value}
            ref={ref}
            readOnly={readOnly}
            onChange={onChange}
            {...register}
          />
          {type === 'password' && (
            <VisibilityBtn
              type={isPasswordVisible ? 'on' : 'off'}
              onClickOpenedEye={() => setIsPasswordVisible(false)}
              onClickClosedEye={() => setIsPasswordVisible(true)}
              sx={buttonStyle}
            />
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
