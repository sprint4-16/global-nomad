import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import React, { useEffect, useRef } from 'react';

const cn = classNames.bind(styles);

interface filterListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
export default function FilterList({ setIsOpen, setSelectedItem }: filterListProps) {
  const filterList = ['많은 리뷰 순', '낮은 가격 순', '높은 가격 순', '최신 순'];
  const filterRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (index: number) => {
    if (index === 0) setSelectedItem('리뷰');
    else if (index === 1 || index === 2) setSelectedItem('가격');
    else setSelectedItem('최신');

    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div ref={filterRef} className={cn('dropdown')}>
      {filterList.map((item, index) => (
        <div key={`${index} ${item}`} className={cn('item')} onClick={() => handleItemClick(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}
