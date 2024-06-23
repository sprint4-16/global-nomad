import classNames from 'classnames/bind';
import styles from './NavItems.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCookies from '@/hooks/useCookies';

import { ROUTE } from '@/constants';
import ButtonAlertIcon from './items/ButtonAlertIcon';
import ButtonProfile from './items/ButtonProfile';

const cn = classNames.bind(styles);

export default function NavItems() {
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);

  const { getCookie, deleteAllCookie } = useCookies();

  const nickname = getCookie('nickname');
  const profileImageUrl = getCookie('profileImageUrl');

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    setLoggedIn(!!accessToken);
  }, [getCookie]);

  const onLogout = () => {
    deleteAllCookie();
    router.replace(ROUTE.HOME);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={cn('loggedInComponent', 'navItems')}>
          <ButtonAlertIcon />
          <ButtonProfile nickname={nickname} profileImageUrl={profileImageUrl} onLogout={onLogout} />
        </div>
      ) : (
        <div className={cn('loggedOutComponent', 'navItems')}>
          <Link href={ROUTE.LOGIN}>로그인</Link>
          <Link href={ROUTE.SIGNUP}>회원가입</Link>
        </div>
      )}
    </>
  );
}
