import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SideNavigationMenuLayout.module.scss';

import SideNavigationMenu from '@/components/SideNavigationMenu/SideNavigationMenu';

const cn = classNames.bind(styles);

interface SideNavigationMenuLayoutProps {
  children: ReactNode;
}

export default function SideNavigationMenuLayout({ children }: SideNavigationMenuLayoutProps) {
  return (
    <div className={cn('background')}>
      <div className={cn('container')}>
        <SideNavigationMenu className={cn('sideBar')} />
        <div className={cn('contents')}>{children}</div>
      </div>
    </div>
  );
}
