import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

export default function Footer({ totalCount }: { totalCount: number }) {
  return (
    <div className={cn('footer')}>
      <span className={cn('footerTitle')}>예약현황</span>
      <span className={cn('footerTag')}>
        <span className={cn('point')}>0</span>/{totalCount}
      </span>
    </div>
  );
}
