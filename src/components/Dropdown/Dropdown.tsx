import styles from './Dropdown.module.scss';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import CheckMark from '@/images/icon/icon_checkmark.svg';
import { useState } from 'react';

const cn = classNames.bind(styles);

interface DropdownProps {
  menuItems?: string[];
  onSelect?: (index: number) => void;
  className?: string;
  isLabelVisible: boolean;
}

export function Dropdown({
  menuItems = ['문화 예술', '식음료', '스포츠', '투어', '관광'],
  onSelect,
  className,
  isLabelVisible,
}: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItemIndex, SetSelectedItemIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  return (
    <div className={cn('container', className)}>
      {isLabelVisible && <div className={cn('label')}>체험명</div>}
      <div
        className={cn('textfield')}
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        <button className={cn('button', { selected: selectedItemIndex !== null })}>{selectedItem}</button>
        {isDropdownOpen ? <ArrowUp className={cn('arrowImg')} /> : <ArrowDown className={cn('arrowImg')} />}
      </div>
      {isDropdownOpen && (
        <ul className={cn('menuItems')}>
          {menuItems?.map((item, index) => (
            <li
              key={`item-${index}`}
              className={cn('item')}
              onMouseEnter={() => SetSelectedItemIndex(index)}
              onMouseLeave={() => SetSelectedItemIndex(null)}
              onClick={() => {
                setSelectedItem(item);
                setIsDropdownOpen(false);
                if (onSelect) {
                  onSelect(index);
                }
              }}
            >
              {selectedItemIndex === index && <CheckMark className={cn('checkMarkImg')} />}
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
