import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './CardResource.module.scss';
import CardContent from './CardContent';
import { CardResourceProps } from './CardResourceType';

export default function CardResource({ imgUrl, rating, reviewCount, price, children }: CardResourceProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('cardResource')}>
      {imgUrl ? <Image className={cn('backgroundImg')} src={imgUrl} alt="배경화면" /> : null}
      <CardContent size="large" rating={rating} reviewCount={reviewCount} price={price}>
        {children}
      </CardContent>
    </div>
  );
}
