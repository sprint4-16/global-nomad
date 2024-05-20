import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';
import { useState } from 'react';
import FilterList from './FilterList';

const cn = classNames.bind(styles);

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('필터');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('wrapper')} onClick={toggleDropdown}>
        <span className={cn('text')}>{selectedItem}</span>
        <ArrowDown />
      </div>
      {isOpen ? <FilterList setIsOpen={setIsOpen} setSelectedItem={setSelectedItem} /> : <></>}
    </div>
  );
}
