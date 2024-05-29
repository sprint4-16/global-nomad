import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cn = classNames.bind(styles);

interface CategoryProps {
  list: string[];
}
export default function Category({ list }: CategoryProps) {
  const [clicked, setClicked] = useState<string | ''>('');

  const handleCategoryClick = (item: string) => {
    setClicked(item);
  };

  return (
    <div className={cn('container')}>
      {list.map((item, index) => (
        <div
          className={cn('wrapper', { clickedItem: clicked === item })}
          onClick={() => handleCategoryClick(item)}
          key={`${index} ${item}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
