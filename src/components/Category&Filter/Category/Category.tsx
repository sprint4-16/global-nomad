import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cn = classNames.bind(styles);

interface CategoryProps {
  className?: string;
  list: string[];
  onSelected: (index: number) => void;
}
export default function Category({ className, list, onSelected }: CategoryProps) {
  const [clicked, setClicked] = useState<string | ''>('');

  const handleCategoryClick = (item: string) => {
    if (clicked === item) setClicked('');
    else setClicked(item);
  };

  return (
    <div className={cn('container', className)}>
      <div className={cn('scroll-wrapper')}>
        {list.map((item, index) => (
          <div
            className={cn('wrapper', { clickedItem: clicked === item })}
            onClick={() => {
              handleCategoryClick(item);
              onSelected(index);
            }}
            key={`${index} ${item}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
