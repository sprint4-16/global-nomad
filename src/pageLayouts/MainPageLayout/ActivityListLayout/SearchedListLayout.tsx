import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ActivityListLayout.module.scss';
import { UseGetActivities } from '@/apis/apiHooks/Activities';
import CardContent from '@/components/CardResource/CardContent';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Pagination from '@/components/Pagination/Pagination';

const cn = classNames.bind(styles);

interface SearchedListProps {
  searched: string | undefined;
}
export default function SearchedListLayout({ searched }: SearchedListProps) {
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 1239 });
  const isPC = useMediaQuery({ minWidth: 1240 });

  const [nowPage, setNowPage] = useState(1);
  const [size, setSize] = useState<8 | 9 | 16>(16);

  useEffect(() => {
    if (isPC) {
      setSize(16);
    } else if (isTablet) {
      setSize(9);
    } else if (isMobile) {
      setSize(8);
    }
  }, [isPC, isTablet, isMobile]);

  console.log(searched);
  const { data, error } = UseGetActivities({
    method: 'offset',
    keyword: searched,
    page: nowPage,
    size: size,
  });
  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalpage = Math.ceil(data?.totalCount / size);
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
          {activities.map((item, index: number) => {
            return (
              <div className={cn('card')} key={`${item.id} ${index}`}>
                <Image
                  className={cn('cardImg')}
                  src={item.bannerImageUrl}
                  alt="Card image"
                  width={283}
                  height={283}
                  priority
                  layout="responsive"
                />

                <CardContent size="small" activity={item}>
                  {item.title}
                </CardContent>
              </div>
            );
          })}
        </div>
      </div>

      <Pagination total={totalpage} nowPage={nowPage} setNowPage={setNowPage} />
    </div>
  );
}
