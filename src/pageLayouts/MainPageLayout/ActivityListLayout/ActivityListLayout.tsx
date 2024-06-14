import Category from '@/components/Category&Filter/Category/Category';
import Filter from '@/components/Category&Filter/Filter/Filter';
import { useState } from 'react';

export default function ActivityListLayout() {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

  const category = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
  return (
    <>
      <Category list={category} />
      <Filter filterType="activity" setFilterStatus={setFilterStatus} />
    </>
  );
}
