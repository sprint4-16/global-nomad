import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCookies from '@/hooks/useCookies';
import classNames from 'classnames/bind';
import styles from './NavItems.module.scss';

const cn = classNames.bind(styles);

import { COOKIE, ROUTE } from '@/constants';
import ButtonAlertIcon from './items/ButtonAlertIcon';
import ButtonProfile from './items/ButtonProfile';
import NotificationPopover from '@/components/Popover/NotificationPopover/NotificationPopover';

export default function NavItems() {
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [notice, setNotice] = useState(false);

  const { getCookie, deleteAllCookie } = useCookies();
  const nickname = getCookie(COOKIE.NICKNAME);
  const profileImageUrl = getCookie(COOKIE.PROFILE_IMAGE_URL);

  useEffect(() => {
    const accessToken = getCookie(COOKIE.ACCESS_TOKEN);
    setLoggedIn(!!accessToken);
  }, [getCookie]);

  const onLogout = () => {
    deleteAllCookie();
    router.replace(ROUTE.HOME);
  };

  const handleNoticeClick = () => {
    setNotice((notice) => !notice);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={cn('loggedInComponent', 'navItems')}>
          <ButtonAlertIcon onClick={handleNoticeClick} />
          {notice && <NotificationPopover className={cn('notice')} onClose={handleNoticeClick} />}
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
