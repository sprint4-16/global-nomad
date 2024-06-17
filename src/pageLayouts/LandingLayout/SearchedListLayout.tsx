import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { UseGetActivities } from '@/apis/apiHooks/Activities';
import { useMediaQuery } from 'react-responsive';
import Pagination from '@/components/Pagination/Pagination';
import CardResourceSmall from '@/components/CardResource/CardResourceSmall';
import styles from './ActivityListLayout.module.scss';

const cn = classNames.bind(styles);

interface SearchedListProps {
  searched: string | undefined;
}

interface CardResourceProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function SearchedListLayout({ searched }: SearchedListProps) {
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 1239 });
  const isPC = useMediaQuery({ minWidth: 1240 });

  const [nowPage, setNowPage] = useState(1);
  const [size, setSize] = useState<8 | 9 | 16>(16);

  const { data, isLoading, error } = UseGetActivities({
    method: 'offset',
    keyword: searched,
    page: nowPage,
    size: size,
  });
  const totalCount = data?.totalCount ?? 0;
  const totalPage = Math.ceil(data?.totalCount / size);

  useEffect(() => {
    if (isPC) {
      setSize(16);
    } else if (isTablet) {
      setSize(9);
    } else if (isMobile) {
      setSize(8);
    }
  }, [isPC, isTablet, isMobile]);

  return (
    <div className={cn('container')}>
      <div className={cn('header')}></div>
      <div className={cn('content')}>
        {error ? (
          <div className={cn('content_text')}>Error: {error.message}</div>
        ) : (
          <div className={cn('content_text')}>
            {searched}
            <span>으로 검색한 결과입니다.</span>
            <div className={cn('content_result')}>총 {totalCount}개의 결과</div>
          </div>
        )}

        <div className={cn('content_cards')}>
          {!isLoading &&
            data.activities.map((activity: CardResourceProps) => {
              return (
                <div className={cn('card')} key={`${activity.id}`}>
                  <CardResourceSmall activity={activity} />
                </div>
              );
            })}
        </div>
      </div>

      <Pagination total={totalPage} nowPage={nowPage} setNowPage={setNowPage} />
    </div>
  );
}
