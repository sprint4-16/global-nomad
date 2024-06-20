import { useGetPopularActivities } from '@/apis/apiHooks/MyReservations';
import { Search } from '@/components/Search/Search';
import PopulationExperiences from './popularExperiences';
import Carousel from './Carousel';

import classNames from 'classnames/bind';
import styles from './landingLayout.module.scss';

const cn = classNames.bind(styles);

interface LandingProps {
  searched: string | undefined;
  setSearched: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function LandingLayout({ searched, setSearched }: LandingProps) {
  const { data, isLoading, error } = useGetPopularActivities();

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
              setSearched(item);
            }}
          />
        </div>
        {searched ? <></> : <PopulationExperiences />}
      </div>
    </div>
  );
}
