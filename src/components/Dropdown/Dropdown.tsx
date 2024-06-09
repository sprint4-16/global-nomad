import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import CheckMark from '@/images/icon/icon_checkmark.svg';

const cn = classNames.bind(styles);

interface DropdownProps {
  menuItems?: string[];
  onSelect?: (selectedItem: string) => void;
  className?: string;
  isLabelVisible: boolean;
  onChange?: (value: string) => void;
}

export interface DropdownRef {
  reset: () => void;
}

export const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  (
    {
      menuItems = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'],
      onSelect,
      className,
      isLabelVisible,
      onChange,
    },
    ref,
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    useImperativeHandle(ref, () => ({
      reset() {
        setSelectedItem(menuItems[0]);
        setSelectedItemIndex(null);
      },
    }));

    return (
      <div className={cn('container', className)}>
        {isLabelVisible && <div className={cn('label')}>체험명</div>}
        <div
          className={cn('textfield')}
          onClick={() => {
            setIsDropdownOpen((prev) => !prev);
          }}
        >
          <button type="button" className={cn('button', { selected: selectedItemIndex !== null })}>
            {selectedItem}
          </button>
          {isDropdownOpen ? <ArrowUp className={cn('arrowImg')} /> : <ArrowDown className={cn('arrowImg')} />}
        </div>
        {isDropdownOpen && (
          <div className={cn('menuItemsWrapper')}>
            <ul className={cn('menuItems')}>
              {menuItems?.map((item, index) => (
                <li
                  key={`item-${index}`}
                  className={cn('item')}
                  onMouseEnter={() => setSelectedItemIndex(index)}
                  onMouseLeave={() => setSelectedItemIndex(null)}
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDropdownOpen(false);
                    if (onSelect) {
                      onSelect(item);
                    }
                    if (onChange) {
                      onChange(item);
                    }
                  }}
                >
                  {selectedItemIndex === index && <CheckMark className={cn('checkMarkImg')} />}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
