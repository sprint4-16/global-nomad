import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';
import CardContent from './CardContent';
import errorImg from '@/images/img/img_resource_error.png';
import styles from './CardResourceSmall.module.scss';

interface CardResourceProps {
  activity: {
    id: number;
    title: string;
    price: number;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
  };
}

const cn = classNames.bind(styles);

export default function CardResourceSmall({ activity }: CardResourceProps) {
  const [src, setSrc] = useState<string | StaticImageData>(activity.bannerImageUrl);

  // 임시 데이터 (추후 수정 예정)
  const BLUR_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0rQcAAR8AzpZX2ywAAAAASUVORK5CYII=';

  return (
    <>
      <div className={cn('cardImgWrapper')}>
        <Image
          className={cn('cardImg')}
          src={src}
          alt="Card image"
          width={283}
          height={283}
          onError={() => setSrc(errorImg)}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      <CardContent activity={activity} />
    </>
  );
}
