import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useCookies from '@/hooks/useCookies';

import { COOKIE, ROUTE } from '@/constants';
import StarIcon from '@/images/icon/icon_star_on.svg';
import LocationIcon from '@/images/icon/icon_location.svg';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';
import Header from './_skeleton-ui/skeleton-header';
import Map from '@/components/Map/Map';
import FloatingBox from '@/components/FloatingBox/FloatingBox';
import Pagination from '@/components/Pagination/Pagination';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useGetActivity } from '@/apis/apiHooks/temporary';
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

export default function Activity() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });
  const { activityId } = router.query;
  const { data: reviewsData } = useGetReviews({
    activityId: String(activityId),
    page,
    size: REVIEWS_PER_PAGE,
  });
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const popoverRef = useRef(null);

  const handleDeleteClick = () => {};

  const handleModifyClick = () => {};

  useOutsideClick({
    ref: popoverRef,
    onClick: () => {
      setIsPopoverOpened(false);
    },
  });

  const { getCookie } = useCookies();
  const accessToken = getCookie(COOKIE.ACCESS_TOKEN);
  const onConfirm = () => {
    router.replace(ROUTE.LOGIN);
  };

  const handleModalOpen = () => {};

  if (!accessToken) {
    return (
      <AlertModal
        alertMessage="로그인 후에 이용할 수 있습니다."
        onConfirm={onConfirm}
        isModalOpen={true}
        handleModalOpen={handleModalOpen}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Header />
      ) : (
        <div className={cn('page-layout')}>
          <header className={cn('header')}>
            <div className={cn('header-contents')}>
              <div className={cn('category')}>{data?.category}</div>
              <h2 className={cn('title')}>{data?.title}</h2>
              <div className={cn('footer')}>
                <span className={cn('rating')}>
                  <StarIcon width={15} height={22} /> <span>({data?.reviewCount})</span>
                </span>
                <span className={cn('address')}>
                  <LocationIcon height={18} />
                  <span>{data?.address}</span>
                </span>
              </div>
            </div>
            <div className={cn('control')}>
              <KebabBtn
                id="kebab-btn"
                size={28}
                onClick={() => {
                  setIsPopoverOpened((toggle) => !toggle);
                }}
              />
              {isPopoverOpened && (
                <div ref={popoverRef} className={cn('popover')}>
                  <button onClick={handleModifyClick}>수정하기</button>
                  <button onClick={handleDeleteClick}>삭제하기</button>
                </div>
              )}
            </div>
          </header>
          <div className={cn('gallery')}>
            <div className={cn('cover')}>
              <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
            </div>
            <div className={cn('subCovers')}>
              <div className={cn('subCovers-section')}>
                <div className={cn('subCover')}>
                  {data?.subImages && data.subImages[0] && (
                    <Image fill src={data.subImages[0].imageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImages && data.subImages[1] && (
                    <Image fill src={data.subImages[1].imageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
              <div className={cn('subCovers-section')}>
                <div className={cn('subCover')}>
                  {data?.subImages && data.subImages[2] && (
                    <Image fill src={data.subImages[2].imageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImages && data.subImages[3] && (
                    <Image fill src={data.subImages[3].imageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={cn('container')}>
            <div className={cn('contents')}>
              <div className={cn('descriptionContainer')}>
                <h3 className={cn('subTitle')}>체험 설명</h3>
                <p className={cn('activityDescription')}>{data?.description}</p>
              </div>
              <div className={cn('mapContainer')}>{data && <Map address={data?.address} />}</div>
              <div className={cn('reviewContaienr')}>
                <h3 className={cn('subTitle')}>후기</h3>
                <div className={cn('header')}>
                  <div className={cn('rating')}>{data?.rating}</div>
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
                        <Image fill src={review.user.profileImageUrl || ''} alt="프로필 이미지를 찾을 수 없습니다" />
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
              </div>
            </div>
            <div className={cn('sidebar')}>
              {data && (
                <FloatingBox activityData={data} price={data?.price} activityId={activityId?.toString() as string} />
              )}
            </div>
          </div>
          <div className={cn('paginationContainer')}>
            <Pagination total={reviewsData?.totalCount as number} nowPage={page} setNowPage={setPage} />
          </div>
        </div>
      )}
    </>
  );
}
