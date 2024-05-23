import styles from './Dropdown.module.scss';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import CheckMark from '@/images/icon/icon_checkmark.svg';
import { useState } from 'react';

const cn = classNames.bind(styles);

export interface menuItem {
  id: number;
  itemText: string;
}

interface DropdownProps {
  buttonText?: string;
  menuItems?: menuItem[];
  className?: string;
  onClick?: () => void;
  onSelect?: (selectedItem: menuItem) => void;
}

const defaultMenuItems: menuItem[] = [
  { id: 1, itemText: '문화 예술' },
  { id: 2, itemText: '식음료' },
  { id: 3, itemText: '스포츠' },
  { id: 4, itemText: '투어' },
  { id: 5, itemText: '관광' },
];

export function Dropdown({
  buttonText: initialButtonText,
  menuItems = defaultMenuItems,
  onClick,
  onSelect,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [buttonText, setButtonText] = useState(initialButtonText || 'Select');
  const isDefaultButtonText = buttonText === (initialButtonText || 'Select');

  return (
    <div className={cn('dropdownWrapper', className)}>
      <div
        className={cn('dropdownBox')}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <button className={cn('dropdownButton', { 'dropdownButton--selected': !isDefaultButtonText })}>
          {buttonText}
        </button>
        {isOpen ? <ArrowUp className={cn('arrowImg')} /> : <ArrowDown className={cn('arrowImg')} />}
      </div>
      {isOpen && (
        <ul className={cn('menuItems')}>
          {menuItems?.map((item) => (
            <li
              key={item.id}
              className={cn('menuItem')}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              onClick={() => {
                setButtonText(item.itemText);
                setIsOpen(false);
                if (onSelect) {
                  onSelect(item);
                }
              }}
            >
              {hoveredItemId === item.id && <CheckMark className={cn('checkMarkImg')} />}
              {item.itemText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
