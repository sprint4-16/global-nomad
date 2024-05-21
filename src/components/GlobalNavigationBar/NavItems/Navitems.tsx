import classNames from 'classnames/bind';
import styles from './NavItems.module.scss';
import Link from 'next/link';

const cn = classNames.bind(styles);

import { ButtonAlertIcon, ButtonProfile } from './items';

export default function NavItems({ loggeninStatus = false }: { loggeninStatus?: boolean }) {
  return (
    <>
      {loggeninStatus ? (
        <div className={cn('loggedOutComponent', 'navItems')}>
          <Link href="/signin">로그인</Link>
          <Link href="signup">회원가입</Link>
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
