import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import { axiosInstanceToken } from '@/apis/axiosInstance';
import ExperienceCard from '@/pages/card/ExperienceCard';
import Button from '@/components/Button/Button';
import styles from './ActivityLayout.module.scss';
import { ROUTE } from '@/constants';

interface CardProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function ActivityLayout() {
  const router = useRouter();
  const cn = classNames.bind(styles);
  const [activities, setActivities] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQxLCJ0ZWFtSWQiOiI0LTE2IiwiaWF0IjoxNzE3NDcxNzc4LCJleHAiOjE3MTc0NzM1NzgsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.XmGLc4d-9J0NuIG0c3mG-59tA7qZxgMC2CmQBkS9XY8';
        const { data } = await axiosInstanceToken(accessToken).get(`my-activities?size=20`);
        setActivities(data.activities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClickAddActivity = () => {
    // 체험 등록하기
    router.push(`/${ROUTE.ACTIVITY_POST}`);
  };

  return (
    <div className={cn('activityLayout')}>
      <div className={cn('header')}>
        <h1 className={cn('title')}>내 체험 관리</h1>
        <Button className={cn('button')} type="primary" size="medium" onClick={handleClickAddActivity}>
          체험 등록하기
        </Button>
      </div>
      <div className={cn('cardList')}>
        {activities.map((item: CardProps) => {
          return <ExperienceCard key={item.id} cardData={item} />;
        })}
      </div>
    </div>
  );
}
