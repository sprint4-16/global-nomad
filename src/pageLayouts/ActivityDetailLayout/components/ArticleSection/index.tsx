import classNames from 'classnames/bind';
import styles from './ArticleSection.module.scss';

import Image from 'next/image';

const cn = classNames.bind(styles);

interface ArticleProps {
  bannerImageUrl: string;
  subImages: {
    imageUrl: string;
  }[];
}

export default function ArticleSection({ bannerImageUrl, subImages }: ArticleProps) {
  return (
    <div className={cn('gallery')}>
      <div className={cn('cover')}>
        <Image fill src={bannerImageUrl} alt="배너이미지" />
      </div>
      <div className={cn('subCovers')}>
        <div className={cn('subCovers-section')}>
          <div className={cn('subCover')}>
            {subImages && subImages[0] && <Image fill src={subImages[0].imageUrl} alt="배너이미지" />}
          </div>
          <div className={cn('subCover')}>
            {subImages && subImages[1] && <Image fill src={subImages[1].imageUrl} alt="배너이미지" />}
          </div>
        </div>
        <div className={cn('subCovers-section')}>
          <div className={cn('subCover')}>
            {subImages && subImages[2] && <Image fill src={subImages[2].imageUrl} alt="배너이미지" />}
          </div>
          <div className={cn('subCover')}>
            {subImages && subImages[3] && <Image fill src={subImages[3].imageUrl} alt="배너이미지" />}
          </div>
        </div>
      </div>
    </div>
  );
}
