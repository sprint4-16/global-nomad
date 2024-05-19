import { ReactNode } from 'react';
import EyeOff from '@/images/btn/btn_eye_off.svg';
import EyeOn from '@/images/btn/btn_eye_on.svg';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProps {
  label: ReactNode;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  color?: string;
  className?: string;
}

interface DropdownProps {
  buttonText?: string;
  menuItems?: string[];
  className?: string;
}

export function Input({ label, type, placeholder, color, className }: InputProps) {
  return (
    <div className={cx('input-container', className)}>
      <label htmlFor={type} className={cx('label')}>
        {label}
      </label>
      {type === 'password' ? (
        <>
          <input type={type} id={type} placeholder={placeholder} className={cx('input', color)} />
          <EyeOff className={cx('eye-img')} />
        </>
      ) : (
        <input type={type} id={type} placeholder={placeholder} className={cx('input', color)} />
      )}
    </div>
  );
}

export function Dropdown({ buttonText, menuItems, className }: DropdownProps) {
  return (
    <div className={cx('dropdown-wrapper', className)}>
      <div className={cx('dropdown-box')}>
        <button className={cx('dropdown-button')}>{buttonText}</button>
        <ArrowDown className={cx('arrow-img')} />
      </div>
    </div>
  );
}
