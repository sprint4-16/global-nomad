import classNames from 'classnames/bind';
import ExperienceCard from '@/pages/card/ExperienceCard';
import Button from '@/components/Button/Button';
import styles from './ActivityLayout.module.scss';

// 임시 데이터
const data = {
  activities: [
    {
      id: 989,
      userId: 341,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-16_341_1717458560103.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-04T08:17:47.820Z',
      updatedAt: '2024-06-04T08:17:47.820Z',
    },
    {
      id: 988,
      userId: 341,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-16_341_1717458560103.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-04T08:15:14.993Z',
      updatedAt: '2024-06-04T08:15:14.993Z',
    },
    {
      id: 987,
      userId: 341,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-16_341_1717458560103.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-04T07:59:23.416Z',
      updatedAt: '2024-06-04T07:59:23.416Z',
    },
    {
      id: 986,
      userId: 341,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-16_341_1717458560103.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-04T07:59:22.429Z',
      updatedAt: '2024-06-04T07:59:22.429Z',
    },
    {
      id: 985,
      userId: 341,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-16_341_1717458560103.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-04T07:59:17.706Z',
      updatedAt: '2024-06-04T07:59:17.706Z',
    },
  ],
  totalCount: 5,
  cursorId: null,
};

interface CardProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function ActivityLayout() {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('activityLayout')}>
      <div className={cn('header')}>
        <h1 className={cn('title')}>내 체험 관리</h1>
        <Button className={cn('button')} type="primary" size="medium">
          체험 등록하기
        </Button>
      </div>
      <div className={cn('cardList')}>
        {data.activities.map((item: CardProps) => {
          return <ExperienceCard key={item.id} cardData={item} />;
        })}
      </div>
    </div>
  );
}
