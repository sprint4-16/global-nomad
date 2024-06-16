import { useGetActivity } from '@/apis/apiHooks/temporary';
import { useRouter } from 'next/router';
import styles from './Activity.module.scss';
import classNames from 'classnames/bind';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';
import StarIcon from '@/images/icon/icon_star_on.svg';
import LocationIcon from '@/images/icon/icon_location.svg';
import Header from './_skeleton-ui/skeleton-header';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Image from 'next/image';

const cn = classNames.bind(styles);

export default function Activity() {
  const router = useRouter();
  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });
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

  return (
    <>
      {isLoading ? (
        <Header />
      ) : (
        <>
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
                  {data?.subImageUrls && data.subImageUrls[0] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[1] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
              <div className={cn('subCovers-section')}>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[2] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[3] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>체험 설명</h3>
            <p>{data?.description}</p>
          </div>
        </>
      )}
    </>
  );
}
