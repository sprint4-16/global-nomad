import Image from 'next/image';
import classNames from 'classnames/bind';

import { Search } from '@/components/Search/Search';
import PopulationExperiences from './popularExperiences';
import ActivityListLayout from './ActivityListLayout';
import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';
import styles from './landingLayout.module.scss';

const cn = classNames.bind(styles);

export default function LandingLayout() {
  const { data, isLoading, error } = useGetPopularActivities();
  const month = new Date().getMonth() + 1;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={cn('landing')}>
      <div className={cn('inner')}>
        <Image
          className={cn('bannerImg')}
          src={data.activities[0].bannerImageUrl}
          alt="배너"
          width={1920}
          height={550}
          style={{ width: 1920, height: 550 }}
          priority
          unoptimized
        />
        <div className={cn('mainTitle')}>
          <div className={cn('title')}>{data.activities[0].title}</div>
          <div className={cn('description')}>{month}월의 인기 체험 BEST 🔥</div>
        </div>
        <div className={cn('searchWrapper')}>
          <Search titleText="무엇을 체험하고 싶으신가요?" inputText="내가 원하는 체험은" />
        </div>
        <PopulationExperiences />
        <ActivityListLayout />
      </div>
    </div>
  );
}
