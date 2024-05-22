import Category from '@/components/Category&Filter/Category/Category';
import Filter from '@/components/Category&Filter/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';

export default function Home() {
  const TEMP_LIST = ['스포츠', '식음료', '투어', '웰빙', '문화 · 예술'];
  return (
    <>
      <div>\n</div>
      <Category list={TEMP_LIST} />
      <Filter />
      <Pagination total={12} />
    </>
  );
}
