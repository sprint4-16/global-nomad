import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';
import { Search } from '@/components/Search/Search';
import PopulationExperiences from './popularExperiences';
import ActivityListLayout from './ActivityListLayout';
import Carousel from './Carousel';

import classNames from 'classnames/bind';
import styles from './landingLayout.module.scss';
import { useState } from 'react';
import SearchedListLayout from './SearchedListLayout';

const cn = classNames.bind(styles);

export default function LandingLayout() {
  const { data, isLoading, error } = useGetPopularActivities();
  const [keyword, setKeyword] = useState<undefined | string>('');

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
          <Search
            titleText="무엇을 체험하고 싶으신가요?"
            inputText="내가 원하는 체험은"
            onClick={(item: string | undefined) => {
              setKeyword(item);
            }}
          />
        </div>
        {keyword ? (
          <SearchedListLayout searched={keyword} />
        ) : (
          <>
            <PopulationExperiences />
            <ActivityListLayout />
          </>
        )}
      </div>
    </div>
  );
}
