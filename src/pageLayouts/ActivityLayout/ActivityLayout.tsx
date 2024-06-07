import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import { ROUTE } from '@/constants';
import { useGetMyActivities } from '@/apis/apiHooks/MyReservations';
import ExperienceCard from '@/pages/card/ExperienceCard';
import Button from '@/components/Button/Button';
import EmptyIcon from '@/images/icon/icon_empty.svg';
import styles from './ActivityLayout.module.scss';

interface CardProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function ActivityLayout() {
  const router = useRouter();
  const cn = classNames.bind(styles);
  const { data, isLoading } = useGetMyActivities();

  const handleClickAddActivity = () => {
    router.push(`${ROUTE.ACTIVITY_POST}`);
  };

  return (
    <div className={cn('activityLayout')}>
      <div className={cn('header')}>
        <h1 className={cn('title')}>내 체험 관리</h1>
        <Button className={cn('button')} type="primary" size="medium" onClick={handleClickAddActivity}>
          체험 등록하기
        </Button>
      </div>
      <div className={cn('cardList')}>
        {isLoading ? (
          <div>로딩중</div>
        ) : data.totalCount == 0 ? (
          <div className={cn('empty')}>
            <EmptyIcon width="24rem" height="24rem" viewBox="0 0 240 240" />
            <div className={cn('description')}>아직 등록한 체험이 없어요</div>
          </div>
        ) : (
          data.activities.map((item: CardProps) => <ExperienceCard key={item.id} cardData={item} />)
        )}
      </div>
    </div>
  );
}
