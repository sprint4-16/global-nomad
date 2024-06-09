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
  activityList?: {
    activities: Activity[];
  };
}

export default function ReservationCalendarLayout(activityList: ActivityListProps) {
  const [activityListData, setActivityListData] = useState<Activity[] | null>(null);
  const [dropdownTitleList, setDropdownTitleList] = useState<[string, number][] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity[] | null>(null);

  useEffect(() => {
    if (activityList.activityList?.activities) {
      const { activities } = activityList.activityList;

      const unDuplicateTitles: [string, number][] = activities
        .filter((activity, index, self) => index === self.findIndex((title) => title.id === activity.id))
        .map((activity) => [activity.title, activity.id]);

      setDropdownTitleList(unDuplicateTitles);
      setActivityListData(activities);

      if (unDuplicateTitles.length > 0) {
        const initialSelectedId = unDuplicateTitles[0][1];
        const initialSelectedItems = activities.filter((item) => item.id === initialSelectedId);
        setSelectedActivity(initialSelectedItems);
      }
    }
  }, [activityList]);

  const onDropdownSelect = (index: number) => {
    if (dropdownTitleList && activityListData) {
      const selectedId = dropdownTitleList?.[index][1];
      const selectedItems = activityListData?.filter((item) => item.id === selectedId);
      setSelectedActivity(selectedItems);
    }
  };

  if (!dropdownTitleList || !activityListData) {
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
          menuItems={dropdownTitleList.map((item) => item[0])}
          onSelect={onDropdownSelect}
        />
      </div>
      <CalendarLayout selectedActivity={selectedActivity} />
    </div>
  );
}
