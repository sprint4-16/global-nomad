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

export function Dropdown({ buttonText, menuItems, onClick, className }: DropdownProps) {
  return (
    <div className={cn('dropdownWrapper', className)}>
      <div className={cn('dropdownBox')}>
        <button className={cn('dropdownButton')}>{buttonText}</button>
        <ArrowDown className={cn('arrowImg')} />
      </div>
    </div>
  );
}

export function DateInput({ dateText, onClick, className }: DateInputProps) {
  return (
    <div className={cn('dateInputWrapper', className)}>
      <div className={cn('dateInputBox')}>
        {dateText}
        <Calendar className={cn('calendarImg')} />
      </div>
    </div>
  );
}
