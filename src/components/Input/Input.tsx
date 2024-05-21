import { ReactNode } from 'react';
import EyeOff from '@/images/btn/btn_eye_off.svg';
import EyeOn from '@/images/btn/btn_eye_on.svg';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import Calendar from '@/images/icon/icon_calendar.svg';
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
    <div className={cn('input-container', className)}>
      <label htmlFor={type} className={cn('label')}>
        {label}
      </label>
      {type === 'password' ? (
        <>
          <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} />
          <EyeOff className={cn('eye-img')} />
        </>
      ) : (
        <input type={type} id={type} placeholder={placeholder} className={cn('input', color)} />
      )}
    </div>
  );
}

export function Dropdown({ buttonText, menuItems, onClick, className }: DropdownProps) {
  return (
    <div className={cn('dropdown-wrapper', className)}>
      <div className={cn('dropdown-box')}>
        <button className={cn('dropdown-button')}>{buttonText}</button>
        <ArrowDown className={cn('arrow-img')} />
      </div>
    </div>
  );
}

export function DateInput({ dateText, onClick, className }: DateInputProps) {
  return (
    <div className={cn('date-input-wrapper', className)}>
      <div className={cn('date-input-box')}>
        {dateText}
        <Calendar className={cn('calendar-img')} />
      </div>
    </div>
  );
}
