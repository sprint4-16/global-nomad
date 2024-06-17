import LandingLayout from '@/pageLayouts/LandingLayout/landingLayout';
import ActivityListLayout from '@/pageLayouts/MainPageLayout/ActivityListLayout/ActivityListLayout';
import SearchedListLayout from '@/pageLayouts/MainPageLayout/ActivityListLayout/SearchedListLayout';
import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState<undefined | string>();

  return (
    <>
      <LandingLayout searched={keyword} setSearched={setKeyword} />
      {keyword ? <SearchedListLayout searched={keyword} /> : <ActivityListLayout />}
    </>
  );
}
