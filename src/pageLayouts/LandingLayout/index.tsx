import classNames from 'classnames/bind';
import styles from './LandingLayout.module.scss';
import { useRouter } from 'next/router';

import { Carousel, SearchedListLayout, PopularExperiences, ActivityListLayout } from './Components';
import Search from '@/components/Search/Search';
import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';

const cn = classNames.bind(styles);

export default function LandingLayout() {
  const { data, isLoading, error } = useGetPopularActivities();
  const router = useRouter();
  const keyword = Array.isArray(router.query.keyword) ? router.query.keyword[0] : router.query.keyword;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className={cn('landing')}>
      <Carousel data={data.activities.slice(0, 3)} />
      <div className={cn('inner')}>
        <div className={cn('searchWrapper')}>
          <Search titleText="무엇을 체험하고 싶으신가요?" inputText="내가 원하는 체험은" />
        </div>
        {keyword ? (
          <SearchedListLayout keyword={keyword} />
        ) : (
          <>
            <PopularExperiences />
            <ActivityListLayout />
          </>
        )}
      </div>
    </div>
  );
}
