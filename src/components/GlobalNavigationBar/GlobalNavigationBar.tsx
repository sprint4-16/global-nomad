import classNames from 'classnames/bind';
import styles from './GlobalNavigationBar.module.scss';
import Logo from '@/images/logo/logo_small.svg';
import Link from 'next/link';

import NavItems from './NavItems/Navitems';

const cn = classNames.bind(styles);

export default function GlobalNavigationBar() {
  return (
    <div className={cn('background')}>
      <div className={cn('navBar')}>
        <Link href="/">
          <Logo className={cn('logoIcon')} />
        </Link>
        <NavItems />
      </div>
    </div>
  );
}
