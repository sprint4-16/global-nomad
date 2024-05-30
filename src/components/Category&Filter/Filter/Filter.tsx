import { useState } from 'react';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';

import FilterList from './FilterList';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterProps {
  filterList: { element: string; name: string; status: string }[];
}
export default function Filter({ filterList }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('필터');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('wrapper')} onClick={toggleDropdown}>
        <span className={cn('text')}>{selectedItem}</span>
        <ArrowDown fill={'#0B3B2D'} />
      </div>
      {isOpen ? <FilterList filterList={filterList} setIsOpen={setIsOpen} setSelectedItem={setSelectedItem} /> : <></>}
    </div>
  );
}
