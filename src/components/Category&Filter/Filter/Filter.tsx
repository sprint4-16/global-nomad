import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import ArrowDown from '@/images/btn/btn_arrow_down.svg';

import FilterList from './FilterList';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterProps {
  filterType: 'activity' | 'reservation';
}
export default function Filter({ filterType }: FilterProps) {
  const activityFilter = [
    { element: '많은 리뷰 순', name: '리뷰', status: 'most_reviewed' },
    { element: '낮은 가격 순', name: '가격', status: 'price_asc' },
    { element: '높은 가격 순', name: '가격', status: 'price_desc' },
    { element: '최신 순', name: '최신', status: 'latest' },
  ];
  const reservationFilter = [
    { element: '예약 신청', name: '신청', status: 'pending' },
    { element: '예약 취소', name: '취소', status: 'canceled' },
    { element: '예약 승인', name: '승인', status: 'confirmed' },
    { element: '예약 거절', name: '거절', status: 'declined' },
    { element: '체험 완료', name: '완료', status: 'completed' },
  ];

  const filterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('필터');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div ref={filterRef} className={cn('container')}>
      <div className={cn('wrapper')} onClick={toggleDropdown}>
        <span className={cn('text')}>{selectedItem}</span>
        <ArrowDown fill={'#0B3B2D'} />
      </div>
      {isOpen ? (
        <FilterList
          filterList={filterType === 'activity' ? activityFilter : reservationFilter}
          setIsOpen={setIsOpen}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
