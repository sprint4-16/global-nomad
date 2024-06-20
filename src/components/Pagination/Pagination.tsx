import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import PageBtn from './PageBtn';

const cn = classNames.bind(styles);
const PAGE_UNIT = 5;

interface PaginationProps {
  total: number;
  nowPage: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function Pagination({ total, nowPage, setNowPage }: PaginationProps) {
  const [endPoint, setEndPoint] = useState<number>(1);
  const [currentPoint, setCurrentPoint] = useState<number>(1);

  const getPages = () => {
    const pages: number[] = [];
    const firstPage = 1 + (page - 1) * PAGE_UNIT;
    const lastPage = firstPage + Math.min(PAGE_UNIT, total - (page - 1) * PAGE_UNIT) - 1;

    for (let i = firstPage; i <= lastPage; i++) pages.push(i);

    return pages;
  };

  const handlePageBtnClick = (direction: 'left' | 'right') => {
    if (direction === 'left') onChangePage(page - 1);
    else onChangePage(page + 1);
  };
  const handlePageNumberClick = (item: number) => {
    setNowPage(item);
  };

  useEffect(() => {
    setEndPoint(Math.ceil(total / PAGE_UNIT));
  }, [total]);

  return (
    <div className={cn('container')}>
      <PageBtn direction={'left'} onClick={() => handlePageBtnClick('left')} disabled={page === 1} />
      {getPages().map((item, index) => (
        <button
          className={cn('page', { clickedPage: nowPage === item })}
          key={`${item} ${index}`}
          onClick={() => handlePageNumberClick(item)}
        >
          {item}
        </button>
      ))}
      <PageBtn
        direction={'right'}
        onClick={() => handlePageBtnClick('right')}
        disabled={currentPoint === endPoint || endPoint === 0}
      />
    </div>
  );
}
