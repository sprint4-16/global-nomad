import classNames from 'classnames/bind';
import styles from './GlobalNavigationBar.module.scss';
import Logo from '@/images/logo/logo_small.svg';
import Link from 'next/link';

import { ROUTE } from '@/constants';
import NavItems from './NavItems/Navitems';

const cn = classNames.bind(styles);

export default function GlobalNavigationBar() {
  return (
    <div className={cn('background')}>
      <div className={cn('navBar')}>
        <Link href={ROUTE.HOME}>
          <Logo width="165.51" height="28" />
        </Link>
        <NavItems />
      </div>
    </div>
  );
}
