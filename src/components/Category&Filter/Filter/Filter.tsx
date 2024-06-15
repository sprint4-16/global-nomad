import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';

import useOutsideClick from '@/hooks/useOutsideClick';

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

  const handleFilterClick = () => {
    setIsOpen(!isOpen);
  };
  const handleOutsideCilck = () => {
    if (isOpen === true) setIsOpen(false);
  };

  useOutsideClick({ ref: filterRef, onClick: handleOutsideCilck });

  return (
    <div ref={filterRef} className={cn('container')}>
      <div className={cn('wrapper')} onClick={handleFilterClick}>
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
