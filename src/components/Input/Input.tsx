import { ReactNode } from 'react';
import EyeOff from '@/images/btn/btn_eye_off.svg';
import EyeOn from '@/images/btn/btn_eye_on.svg';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import Calendar from '@/images/icon/icon_calendar.svg';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProps {
  label?: ReactNode;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

interface DropdownProps {
  buttonText?: string;
  menuItems?: string[];
  className?: string;
  onClick?: () => void;
}

interface DateInputProps {
  dateText?: string;
  className?: string;
  onClick?: () => void;
}

export function Input({ label, type, placeholder, color, onClick, className }: InputProps) {
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

export function Dropdown({ buttonText, menuItems, onClick, className }: DropdownProps) {
  return (
    <div className={cx('dropdown-wrapper', className)}>
      <div className={cx('dropdown-box')}>
        <button className={cx('dropdown-button')}>{buttonText}</button>
        <ArrowDown className={cx('arrow-img')} />
      </div>
    </div>
  );
}

export function DateInput({ dateText, onClick, className }: DateInputProps) {
  return (
    <div className={cx('date-input-wrapper', className)}>
      <div className={cx('date-input-box')}>
        {dateText}
        <Calendar className={cx('calendar-img')} />
      </div>
    </div>
  );
}
