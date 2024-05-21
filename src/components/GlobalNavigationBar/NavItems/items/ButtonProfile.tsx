import classNames from 'classnames/bind';
import styles from './ButtonProfile.module.scss';
import Link from 'next/link';
import ProfileImg from '@/images/img/profile.svg';
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function ButtonProfile({ userName = '프로필' }: { userName?: string }) {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  const onLogout = () => {};

  return (
    <div className={cn('profileContainer')}>
      <ProfileImg className={cn('profileImg')} />
      <div onClick={handleDropDown}>{userName}</div>
      {isDropDown && (
        <div className={cn('dropdown')}>
          <div onClick={onLogout}>로그아웃</div>
          <div>
            <Link href="/userpage">마이페이지</Link>
          </div>
        </div>
      )}
    </div>
  );
}
