import { useEffect, useState } from 'react';

import Category from '@/components/Category&Filter/Category/Category';
import Filter from '@/components/Category&Filter/Filter/Filter';

import classNames from 'classnames/bind';
import styles from './ActivityListLayout.module.scss';
import { UseGetActivities } from '@/apis/apiHooks/Activities';
import CardContent from '@/components/CardResource/CardContent';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Pagination from '@/components/Pagination/Pagination';

const cn = classNames.bind(styles);

export default function ActivityListLayout() {
  const [sort, setSort] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
  const handleCategorySelect = (index: number) => {
    setNowPage(1);
    if (category === categoryList[index]) setCategory(undefined);
    else setCategory(categoryList[index]);
  };
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 1239 });
  const isPC = useMediaQuery({ minWidth: 1240 });

  const [nowPage, setNowPage] = useState(1);
  const [size, setSize] = useState<4 | 8 | 9>(8);

  useEffect(() => {
    if (isPC) {
      setSize(8);
    } else if (isTablet) {
      setSize(9);
    } else if (isMobile) {
      setSize(4);
    }
  }, [isPC, isTablet, isMobile]);

  const { data } = UseGetActivities({ method: 'offset', category: category, sort: sort, page: nowPage, size: size });
  const activities = data?.activities ?? [];
  const totalpage = Math.ceil(data?.totalCount / size);

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <Category className={cn('header_category')} list={categoryList} onSelected={handleCategorySelect} />
        <Filter filterType="activity" setFilterStatus={setSort} />
      </div>
      <div className={cn('content')}>
        <div className={cn('content_text')}>{category ? category : '모든 체험'}</div>
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

                <CardContent size="small" rating={item.rating} reviewCount={item.reviewCount} price={item.price}>
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
