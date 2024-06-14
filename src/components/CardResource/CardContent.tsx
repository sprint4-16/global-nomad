import classNames from 'classnames/bind';
import StarBold from '@/images/icon/icon_star_bold.svg';
import styles from './CardContent.module.scss';

type cardSize = 'large' | 'small';

interface CardContentProps {
  activity: {
    id: number;
    title: string;
    price: string;
    rating: number;
    reviewCount: number;
  };
  size: cardSize;
}

export default function CardContent({ activity, size = 'small' }: CardContentProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('cardContainer', size)}>
      <div className={cn('ratingContainer', size)}>
        <StarBold className={cn('starBold', size)} />
        <div className={cn('rating', size)}>{activity.rating}</div>
        <div className={cn('reviewCount', size)}>({activity.reviewCount})</div>
      </div>
      <h1 className={cn('cardDescription', size)}>{activity.title}</h1>
      <div className={cn('priceContainer', size)}>
        ₩ {activity.price}
        <span className={cn('perPerson', size)}>/ 인</span>
      </div>
    </div>
  );
}
