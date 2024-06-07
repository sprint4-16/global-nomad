import React from 'react';
import classNames from 'classnames/bind';

import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface filterListProps {
  filterType: 'activity' | 'reservation';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function FilterList({ filterType, setIsOpen, setSelectedItem, setFilterStatus }: filterListProps) {
  const filter =
    filterType === 'activity'
      ? [
          { element: '많은 리뷰 순', name: '리뷰', status: 'most_reviewed' },
          { element: '낮은 가격 순', name: '가격', status: 'price_asc' },
          { element: '높은 가격 순', name: '가격', status: 'price_desc' },
          { element: '최신 순', name: '최신', status: 'latest' },
        ]
      : [
          { element: '모두 보기', name: '필터', status: undefined },
          { element: '예약 신청', name: '신청', status: 'pending' },
          { element: '예약 취소', name: '취소', status: 'canceled' },
          { element: '예약 승인', name: '승인', status: 'confirmed' },
          { element: '예약 거절', name: '거절', status: 'declined' },
          { element: '체험 완료', name: '완료', status: 'completed' },
        ];
  const handleActivityItemClick = (index: number) => {
    setSelectedItem(filter[index].name);
    setIsOpen(false);
  };
  const handleReservationItemClick = (index: number) => {
    setSelectedItem(filter[index].name);
    setFilterStatus(filter[index].status);
    setIsOpen(false);
  };

  return (
    <div className={cn('dropdown')}>
      {filter.map((item, index) => (
        <div
          key={`${index} ${item.element}`}
          className={cn('item')}
          onClick={() => {
            if (filterType === 'activity') return handleActivityItemClick(index);
            else return handleReservationItemClick(index);
          }}
        >
          {item.element}
        </div>
      ))}
    </div>
  );
}
