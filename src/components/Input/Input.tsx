import { ReactNode, useState } from 'react';
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

interface menuItem {
  id: number;
  itemText: string;
}

interface DropdownProps {
  buttonText?: string;
  menuItems?: menuItem[];
  className?: string;
  onClick?: () => void;
}

interface DateInputProps {
  dateText?: string;
  className?: string;
  onClick?: () => void;
}

const defaultMenuItems: menuItem[] = [
  { id: 1, itemText: '문화 예술' },
  { id: 2, itemText: '식음료' },
  { id: 3, itemText: '스포츠' },
  { id: 4, itemText: '투어' },
  { id: 5, itemText: '관광' },
];

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

export function Dropdown({ buttonText, menuItems = defaultMenuItems, onClick, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('dropdownWrapper', className)}>
      <div
        className={cn('dropdownBox')}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <button className={cn('dropdownButton')}>{buttonText}</button>
        <ArrowDown className={cn('arrowImg')} />
      </div>
      {isOpen && (
        <ul className={cn('menuItems')}>
          {menuItems?.map((item) => (
            <li key={item.id} className={cn('menuItem')}>
              {item.itemText}
            </li>
          ))}
        </ul>
      )}
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
