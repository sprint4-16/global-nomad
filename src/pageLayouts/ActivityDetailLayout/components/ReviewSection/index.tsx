import classNames from 'classnames/bind';
import styles from './ReviewSection.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Profile from '@/images/img/profile.svg';
import StarIcon from '@/images/icon/icon_star_on.svg';
import Pagination from '@/components/Pagination/Pagination';
import { useGetReviews } from '@/apis/apiHooks/Review';

const cn = classNames.bind(styles);

const REVIEWS_PER_PAGE = 3;

function FormatDate(dateString: string): string {
  // Date 객체 생성
  const date = new Date(dateString);

  // 년, 월, 일을 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
  const day = date.getDate();

  // 원하는 형식으로 반환
  return `${year}. ${month}. ${day}`;
}

export default function ReviewSection({ rating }: { rating: number }) {
  const router = useRouter();
  const activityId = String(router.query.activityId);

  const [page, setPage] = useState(1);
  const { data: reviewsData } = useGetReviews({
    activityId,
    page,
    size: REVIEWS_PER_PAGE,
  });

  if (!reviewsData) return <div className={cn('reviewContaienr')}></div>;

  const totalPage = Math.ceil(reviewsData?.totalCount / REVIEWS_PER_PAGE);

  return (
    <div className={cn('reviewContaienr')}>
      <h3 className={cn('subTitle')}>후기</h3>
      <div className={cn('header')}>
        <div className={cn('rating')}>{rating}</div>
        <div>
          <div className={cn('satisfaction')}>매우 만족</div>
          <div className={cn('reviewCount')}>
            <StarIcon width={15} height={15} /> <span>{reviewsData?.totalCount}개의 후기</span>
          </div>
        </div>
      </div>
      <ul className={cn('reviews')}>
        {reviewsData?.reviews.map((review) => (
          <li key={review.id} className={cn('review')}>
            <div className={cn('profile')}>
              {review.user.profileImageUrl ? (
                <Image
                  className={cn('profileImage')}
                  src={review.user.profileImageUrl || ''}
                  alt="프로필 이미지를 찾을 수 없습니다"
                />
              ) : (
                <Profile width="50" height="50" viewBox="0 0 30 30" />
              )}
            </div>
            <div className={cn('reviewContents')}>
              <div className={cn('header')}>
                <div className={cn('reviewer')}>{review.user.nickname}</div>
                <div className={cn('date')}>{FormatDate(review.createdAt)}</div>
              </div>
              <p className={cn('reviewDescription')}>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={cn('paginationContainer')}>
        <Pagination total={totalPage} nowPage={page} setNowPage={setPage} />
      </div>
    </div>
  );
}
