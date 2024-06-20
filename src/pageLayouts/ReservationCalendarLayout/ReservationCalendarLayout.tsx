import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationCalendarLayout.module.scss';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import CalendarLayout from './components/CalendarLayout/CalendarLayout';
import EmptyIcon from '@/images/icon/icon_empty.svg';

const cn = classNames.bind(styles);

interface Activity {
  id: number;
  userId: number;
  title: string;
}

interface ActivityListProps {
  activityList: {
    activities: Activity[];
  };
}

export default function ReservationCalendarLayout({ activityList }: ActivityListProps) {
  const [activityListData, setActivityListData] = useState<Activity[] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  useEffect(() => {
    if (activityList?.activities) {
      const { activities } = activityList;
      setActivityListData(activities);

      setSelectedActivity(activities[0].id);
    }
  }, [activityList]);

  const onDropdownSelect = (index: number) => {
    if (activityListData) {
      setSelectedActivity(activityListData[index].id);
    }
  };

  if (!activityListData || activityListData.length === 0) {
    return (
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('text')}>예약 현황</div>
        </div>
        <div className={cn('empty')}>
          <EmptyIcon width="24rem" height="24rem" viewBox="0 0 240 240" />
          <div className={cn('description')}>아직 등록한 체험이 없어요</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <div className={cn('text')}>예약 현황</div>
        <Dropdown
          isLabelVisible={true}
          menuItems={activityListData.map((item) => item.title)}
          onSelect={onDropdownSelect}
        />
      </div>
      <CalendarLayout selectedActivity={selectedActivity} />
    </div>
  );
}
