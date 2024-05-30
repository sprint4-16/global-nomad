import React from 'react';
import classNames from 'classnames/bind';

import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface filterListProps {
  filterList: { element: string; name: string; status: string }[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
export default function FilterList({ filterList, setIsOpen, setSelectedItem }: filterListProps) {
  const handleItemClick = (index: number) => {
    setSelectedItem(filterList[index].name);
    setIsOpen(false);
  };

  return (
    <div className={cn('dropdown')}>
      {filterList.map((item, index) => (
        <div key={`${index} ${item.element}`} className={cn('item')} onClick={() => handleItemClick(index)}>
          {item.element}
        </div>
      ))}
    </div>
  );
}
