import classNames from 'classnames/bind';
import styles from './CardContent.module.scss';
import StarBold from '@/images/icon/icon_star_bold.svg';
import { CardContentProps } from './CardResourceType';

export default function CardContent({ size, rating, reviewCount, price, children }: CardContentProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('cardContainer', size)}>
      <div className={cn('ratingContainer', size)}>
        <StarBold className={cn('starBold', size)} />
        <div className={cn('rating', size)}>{rating}</div>
        <div className={cn('reviewCount', size)}>({reviewCount})</div>
      </div>
      <h1 className={cn('cardDescription', size)}>{children}</h1>
      <div className={cn('priceContainer', size)}>
        ₩ {price}
        <span className={cn('perPerson', size)}>/ 인</span>
      </div>
    </div>
  );
}
