import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';
import CardContent from './CardContent';
import errorImg from '@/images/img/img_resource_error.png';
import styles from './CardResource.module.scss';

interface CardResourceProps {
  activity: {
    id: number;
    title: string;
    price: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
  };
}

export default function CardResource({ activity }: CardResourceProps) {
  const cn = classNames.bind(styles);
  const [src, setSrc] = useState<string | StaticImageData>(activity.bannerImageUrl);

  // 임시 데이터 (추후 수정 예정)
  const BLUR_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0rQcAAR8AzpZX2ywAAAAASUVORK5CYII=';

  return (
    <div className={cn('cardResource')}>
      {activity.bannerImageUrl && (
        <Image
          className={cn('backgroundImg')}
          src={src}
          alt="배경화면"
          width={700}
          height={700}
          onError={() => setSrc(errorImg)}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      )}
      <CardContent size="large" activity={activity} />
    </div>
  );
}
