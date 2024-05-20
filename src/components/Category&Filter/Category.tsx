import { useState } from 'react';
import styles from './Category.module.scss';

interface tempType {
  list: string[];
}
export default function Category({ list }: tempType) {
  const [clicked, setClicked] = useState<string | ''>('');

  const handleCategoryClick = (item: string) => {
    setClicked(item);
  };

  return (
    <div className={styles.container}>
      {list.map((item, index) => {
        return (
          <div
            className={`${styles.wrapper} ${clicked === item ? styles.clicked : ''}`}
            onClick={() => handleCategoryClick(item)}
            key={`${index} ${item}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
