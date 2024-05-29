import { useState, useRef } from 'react';
import classNames from 'classnames/bind';

import { MeatballIcon } from '@/images/icon';
import styles from '../Card.module.scss';
import useClickOutside from '@/hooks/useClickOutside';

const cn = classNames.bind(styles);

export function CardDropdown() {
  const [isOpenDropdown, setViewDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setViewDropdown(!isOpenDropdown);
  };

  const closeDropdown = () => {
    setViewDropdown(false);
  };

  const handleModifyClick = () => {
    // 수정하기 구현
  };

  const handleDeleteClick = () => {
    // 삭제하기 구현
  };

  useClickOutside(profileRef, closeDropdown);

  return (
    <div className={cn('dropdownContainer')} ref={profileRef}>
      <MeatballIcon className={cn('meatball')} viewBox="0 0 40 40" onClick={toggleDropdown} />
      {isOpenDropdown && (
        <div className={cn('dropdown')}>
          <div className={cn('dropdownItem')} onClick={handleModifyClick}>
            수정하기
          </div>
          <div className={cn('dropdownItem')} onClick={handleDeleteClick}>
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
