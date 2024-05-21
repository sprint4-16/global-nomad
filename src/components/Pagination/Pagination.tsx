import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import PageBtn from './PageBtn';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);
const PAGE_UNIT = 5;

interface tempProps {
  total: number;
}
export default function Pagination({ total }: tempProps) {
  const [endPoint, setEndPoint] = useState<number>(1);
  const [currentPoint, setCurrentPoint] = useState<number>(1);
  const [clicked, setClicked] = useState<number>(1);

  const getPages = () => {
    const pages: number[] = [];
    const firstPage = 1 + (currentPoint - 1) * PAGE_UNIT;
    const lastPage = firstPage + Math.min(PAGE_UNIT, total - (currentPoint - 1) * PAGE_UNIT) - 1;

    for (let i = firstPage; i <= lastPage; i++) pages.push(i);

    return pages;
  };

  const handlePageBtnClick = (direction: 'left' | 'right') => {
    if (direction === 'left') setCurrentPoint(currentPoint - 1);
    else setCurrentPoint(currentPoint + 1);
  };
  const handlePageNumberClick = (item: number) => {
    setClicked(item);
  };

  useEffect(() => {
    setEndPoint(Math.ceil(total / PAGE_UNIT));
  }, []);

  return (
    <div className={cn('container')}>
      <PageBtn direction={'left'} onClick={() => handlePageBtnClick('left')} disabled={currentPoint === 1} />
      {getPages().map((item, index) => (
        <button
          className={cn('page', { clickedPage: clicked === item })}
          key={`${item} ${index}`}
          onClick={() => handlePageNumberClick(item)}
        >
          {item}
        </button>
      ))}
      <PageBtn direction={'right'} onClick={() => handlePageBtnClick('right')} disabled={currentPoint === endPoint} />
    </div>
  );
}
