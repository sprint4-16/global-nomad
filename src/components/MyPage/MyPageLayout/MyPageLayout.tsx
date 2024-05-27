import styles from './MyPageLayout.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MyPageLayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return <div className={cn('layout')}>{children}</div>;
}
