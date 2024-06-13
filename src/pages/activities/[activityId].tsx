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

const cn = classNames.bind(styles);

export default function Activity() {
  const router = useRouter();
  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const popoverRef = useRef(null);

  useOutsideClick({ ref: popoverRef, onClick: () => setIsPopoverOpened(false) });

  return (
    <>
      {isLoading ? (
        <Header />
      ) : (
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
              size={28}
              onClick={() => {
                setIsPopoverOpened((toggle) => !toggle);
              }}
            />
            {isPopoverOpened && (
              <div ref={popoverRef} className={cn('popover')}>
                <button>수정하기</button>
                <button>삭제하기</button>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
}