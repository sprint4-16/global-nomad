import classNames from 'classnames/bind';
import styles from './RaitingComponent.module.scss';
import { useState, useRef } from 'react';

import StarOn from '@/images/icon/icon_star_on.svg';
import StarOff from '@/images/icon/icon_star_off.svg';

const cn = classNames.bind(styles);

export default function RatingComponent() {
  const [rating, setRating] = useState({ temporary: 0, permanent: 0 });
  const clicked = useRef(false);

  const handleMouseOver = (index: number) => {
    clicked.current = false;
    setRating({ ...rating, temporary: index + 1 });
  };

  const handleMouseOut = () => {
    setRating({ ...rating, temporary: rating.permanent });
  };

  const onStarClick = (index: number) => {
    setRating({ ...rating, permanent: index + 1 });
    clicked.current = true;
  };

  return (
    <div className={cn('container')}>
      {[...Array(5)].map((star, index) => {
        return index < (clicked.current ? rating.permanent : rating.temporary) ? (
          <StarOn
            key={`star-${index}`}
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={handleMouseOut}
            onClick={() => onStarClick(index)}
          />
        ) : (
          <StarOff key={`star-${index}`} onMouseOver={() => handleMouseOver(index)} onMouseLeave={handleMouseOut} />
        );
      })}
    </div>
  );
}
