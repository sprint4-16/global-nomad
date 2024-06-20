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
      <header>
        <div className={cn('header-contents')}>
          <div className={cn('header')}>문화-예술</div>
          <h2 className={cn('title')}>함께 배우면 즐거운 스트릿 댄스</h2>
          <div className={cn('footer')}>
            <span>
              <StarIcon width={20} height={40} /> (293)
            </span>
            <span>서울 중구 청계천로 100 10F</span>
          </div>
        </div>
        <KebabBtn />
      </header>
      <div>hihi</div>
    </>
  );
}
