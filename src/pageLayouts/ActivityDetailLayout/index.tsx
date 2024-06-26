import classNames from 'classnames/bind';
import styles from './ActivityDetailLayout.module.scss';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { ActivityType } from '@/types/activities.types';
import StarIcon from '@/images/icon/icon_star_on.svg';
import LocationIcon from '@/images/icon/icon_location.svg';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';
import FloatingBox from '@/components/FloatingBox/FloatingBox';
import ArticleSection from './components/ArticleSection';
import DescriptionSection from './components/DescriptionSection';
import ReviewSection from './components/ReviewSection';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface ActivityDetailLayoutProps {
  data: ActivityType | undefined;
}

export default function ActivityDetailLayout({ data }: ActivityDetailLayoutProps) {
  const router = useRouter();
  const { activityId } = router.query;
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const popoverRef = useRef(null);

  useOutsideClick({
    ref: popoverRef,
    onClick: () => {
      setIsPopoverOpened(false);
    },
  });

  const handleDeleteClick = () => {};

  const handleModifyClick = () => {};

  if (!data) {
    return null;
  }

  return (
    <div className={cn('page-layout')}>
      <div className={cn('header')}>
        <div className={cn('header-contents')}>
          <div className={cn('category')}>{data?.category}</div>
          <h2 className={cn('title')}>{data?.title}</h2>
          <div className={cn('footer')}>
            <span className={cn('rating')}>
              <StarIcon width={15} height={22} /> <span>({data?.reviewCount})</span>
            </span>
            <span className={cn('address')}>
              <LocationIcon height={18} />
              <span>{data?.address}</span>
            </span>
          </div>
        </div>
        <div className={cn('control')}>
          <KebabBtn
            id="kebab-btn"
            size={28}
            onClick={() => {
              setIsPopoverOpened((prev) => !prev);
            }}
          />
          {isPopoverOpened && (
            <div ref={popoverRef} className={cn('popover')}>
              <button onClick={handleModifyClick}>수정하기</button>
              <button onClick={handleDeleteClick}>삭제하기</button>
            </div>
          )}
        </div>
      </div>
      <ArticleSection bannerImageUrl={data?.bannerImageUrl} subImages={data?.subImages} />
      <div className={cn('container')}>
        <div className={cn('contents')}>
          <DescriptionSection description={data?.description} address={data?.address} />
          <ReviewSection rating={data?.rating} />
        </div>
        <div className={cn('sidebar')}>
          {data && (
            <FloatingBox activityData={data} price={data?.price} activityId={activityId?.toString() as string} />
          )}
        </div>
      </div>
    </div>
  );
}
