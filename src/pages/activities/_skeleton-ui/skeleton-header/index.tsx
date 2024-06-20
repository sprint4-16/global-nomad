import classNames from 'classnames/bind';
import styles from './skeleton-header.module.scss';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';

const cn = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cn('header')}>
      <div className={cn('header-contents')}>
        <div className={cn('category')}></div>
        <h2 className={cn('title')}></h2>
        <div className={cn('footer')}></div>
      </div>
      <KebabBtn size={28} />
    </header>
  );
}
