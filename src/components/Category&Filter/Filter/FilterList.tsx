import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import React, { useEffect, useRef } from 'react';

const cn = classNames.bind(styles);

interface filterListProps {
  filterList: { element: string; name: string; status: string }[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
export default function FilterList({ filterList, setIsOpen, setSelectedItem }: filterListProps) {
  const filterRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(filterList[index].name);
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
        <div key={`${index} ${item.element}`} className={cn('item')} onClick={() => handleItemClick(index)}>
          {item.element}
        </div>
      ))}
    </div>
  );
}
