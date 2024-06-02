import { CSSProperties, ReactNode, forwardRef, useState } from 'react';
import VisibilityBtn from '@/components/btns/VisibilityBtn/VisibilityBtn';
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
  readOnly?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, placeholder, color, sx, onClick, className, labelClassName, readOnly, register, ...props }, ref) => {
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
            id={type}
            placeholder={placeholder}
            className={cn('input', color)}
            style={sx}
            ref={ref}
            readOnly={readOnly}
            {...register}
          />
          {type === 'password' && (
            <VisibilityBtn
              type={isPasswordVisible ? 'off' : 'on'}
              onClickOpenedEye={() => setIsPasswordVisible(true)}
              onClickClosedEye={() => setIsPasswordVisible(false)}
              sx={buttonStyle}
            />
          )}
        </div>
      </div>
    );
  },
);
