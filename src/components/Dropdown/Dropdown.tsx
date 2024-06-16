import { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

import ArrowDown from '@/images/btn/btn_chevron_down.svg';
import ArrowUp from '@/images/btn/btn_chevron_up.svg';
import CheckMark from '@/images/icon/icon_checkmark.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface DropdownProps {
  className?: string;
  menuItems: string[];
  onSelect?: (index: number) => void;
  isLabelVisible?: boolean;
  onChange?: (value: string) => void;
}

export function Dropdown({ className, menuItems, onSelect, isLabelVisible = false, onChange, ref }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleDropdownOpen });

  useImperativeHandle(ref, () => ({
    reset() {
      setSelectedItem(menuItems[0]);
      setSelectedItemIndex(0);
    },
  }));

  return (
    <div className={cn('container', className)}>
      {isLabelVisible && <div className={cn('label')}>체험명</div>}
      <div className={cn('textfield')} onClick={handleDropdownOpen}>
        <button className={cn('button', { selected: selectedItemIndex !== null })}>
          {menuItems[selectedItemIndex]}
        </button>
        {isDropdownOpen ? <ArrowUp className={cn('arrowImg')} /> : <ArrowDown className={cn('arrowImg')} />}
      </div>
      {isDropdownOpen && (
        <ul className={cn('menuItems')}>
          {menuItems?.map((item, index) => (
            <li
              key={`item-${index}`}
              className={cn('item', [index === selectedItemIndex && 'selected'])}
              onMouseEnter={() => setSelectedItemIndex(index)}
              onClick={() => {
                setSelectedItem(item);
                handleDropdownOpen();
                if (onSelect) {
                  onSelect(index);
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
      )}
    </div>
  );
}
