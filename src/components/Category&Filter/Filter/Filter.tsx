import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';

import FilterList from './FilterList';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterProps {
  filterType: 'activity' | 'reservation';
  setFilterStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function Filter({ filterType, setFilterStatus }: FilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('필터');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    <div ref={filterRef} className={cn('container')}>
      <div className={cn('wrapper')} onClick={toggleDropdown}>
        <span className={cn('text')}>{selectedItem}</span>
        <ArrowDown fill={'#0B3B2D'} />
      </div>
      {isOpen ? (
        <FilterList
          filterType={filterType}
          setIsOpen={setIsOpen}
          setSelectedItem={setSelectedItem}
          setFilterStatus={setFilterStatus}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
