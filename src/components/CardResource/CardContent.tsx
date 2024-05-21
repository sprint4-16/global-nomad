import classNames from 'classnames/bind';
import styles from './CardContent.module.scss';
import StarBold from '@/images/icon/icon_star_bold.svg';
import { CardContentProps } from './CardType';

export default function CardContent({ state, rating, reviewCount, price, children }: CardContentProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('cardContainer', state)}>
      <div className={cn('ratingContainer', state)}>
        <StarBold className={cn('starBold', state)} />
        <div className={cn('rating', state)}>{rating}</div>
        <div className={cn('reviewCount', state)}>({reviewCount})</div>
      </div>
      <h1 className={cn('cardDescription', state)}>{children}</h1>
      <div className={cn('priceContainer', state)}>
        ₩ {price}
        <span className={cn('perPerson', state)}>/ 인</span>
      </div>
    </div>
  );
}
