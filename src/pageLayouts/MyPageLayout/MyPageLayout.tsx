import classNames from 'classnames/bind';
import styles from './MyPageLayout.module.scss';
import { ReactNode } from 'react';

const cn = classNames.bind(styles);

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return <div className={cn('wrapper')}>{children}</div>;
}
