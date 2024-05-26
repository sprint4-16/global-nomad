import classNames from 'classnames/bind';
import styles from './NavItems.module.scss';
import Link from 'next/link';

const cn = classNames.bind(styles);

import { ROUTE } from '@/constants';
import { ButtonAlertIcon, ButtonProfile } from './items';

export default function NavItems({ loggeninStatus = false }: { loggeninStatus?: boolean }) {
  return (
    <>
      {loggeninStatus ? (
        <div className={cn('loggedOutComponent', 'navItems')}>
          <Link href={ROUTE.LOGIN}>로그인</Link>
          <Link href={ROUTE.SIGNUP}>회원가입</Link>
        </div>
      ) : (
        <div className={cn('loggedInComponent', 'navItems')}>
          <ButtonAlertIcon />
          <ButtonProfile />
        </div>
      )}
    </>
  );
}
