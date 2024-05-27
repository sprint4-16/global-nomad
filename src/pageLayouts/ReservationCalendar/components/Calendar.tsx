import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

export default function Calendar() {
  return <div className={cn('container')}>캘린더 컴포넌트</div>;
}
