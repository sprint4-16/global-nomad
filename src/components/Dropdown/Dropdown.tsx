import { useState, useEffect, useRef } from 'react';
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
  onSelect?: (value: string) => void;
  isLabelVisible?: boolean;
  selectedValue?: string;
}

export function Dropdown({ className, menuItems, onSelect, isLabelVisible = false, selectedValue }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    if (selectedValue) {
      const index = menuItems.indexOf(selectedValue);
      setSelectedItemIndex(index !== -1 ? index : 0);
    }
  }, [selectedValue, menuItems]);

  const handleDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleDropdownOpen });

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedItemIndex(index);
    handleDropdownOpen();

    if (onSelect) {
      onSelect(menuItems[index]);
    }
  };

  return (
    <div className={cn('container', className)}>
      {isLabelVisible && <div className={cn('label')}>체험명</div>}
      <div className={cn('textfield')} onClick={handleDropdownOpen}>
        <button type="button" className={cn('button', { selected: selectedItemIndex !== null })}>
          {menuItems[selectedItemIndex]}
        </button>
        {isDropdownOpen ? <ArrowUp className={cn('arrowImg')} /> : <ArrowDown className={cn('arrowImg')} />}
      </div>
      {isDropdownOpen && (
        <div className={cn('menuItems')} ref={modalRef}>
          {menuItems?.map((item, index) => (
            <li
              key={`item-${index}`}
              className={cn('item', [index === selectedItemIndex && 'selected'])}
              onMouseEnter={() => setSelectedItemIndex(index)}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {selectedItemIndex === index && <CheckMark className={cn('checkMarkImg')} />}
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
