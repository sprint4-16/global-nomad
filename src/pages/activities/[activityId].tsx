import { useGetActivity } from '@/apis/apiHooks/temporary';
import { useRouter } from 'next/router';
import styles from './Activity.module.scss';
import classNames from 'classnames/bind';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';
import StarIcon from '@/images/icon/icon_star_on.svg';

const cn = classNames.bind(styles);

export default function Activity() {
  const router = useRouter();
  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });

  !isLoading && console.log(data);
  return (
    <>
      <header className={cn('header')}>
        <div className={cn('header-contents')}>
          <div className={cn('header')}>{data?.category}</div>
          <h2 className={cn('title')}>{data?.title}</h2>
          <div className={cn('footer')}>
            <span>
              <StarIcon width={20} height={40} /> ({data?.reviewCount})
            </span>
            <span>{data?.address}</span>
          </div>
        </div>
        <KebabBtn size={30} />
      </header>
    </>
  );
}
