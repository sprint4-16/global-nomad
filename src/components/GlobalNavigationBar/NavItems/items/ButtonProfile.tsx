import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ButtonProfile.module.scss';

import { ROUTE } from '@/constants';
import ProfileImg from '@/images/img/profile.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface ButtonProfileProps {
  nickname?: string;
  profileImageUrl?: string;
  onLogout: () => void;
}
export default function ButtonProfile({ nickname = '프로필', profileImageUrl, onLogout }: ButtonProfileProps) {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleDropDown });

  return (
    <div className={cn('profileContainer')}>
      {profileImageUrl ? (
        <Image className={cn('profileImg')} src={profileImageUrl} alt="프로필 이미지" width={32} height={32} />
      ) : (
        <ProfileImg className={cn('profileImg')} />
      )}
      <div className={cn('nickname')} onClick={handleDropDown}>
        {nickname}
      </div>
      {isDropDown && (
        <div className={cn('dropdown')} ref={modalRef}>
          <div onClick={onLogout}>로그아웃</div>
          <div>
            <Link href={ROUTE.USER}>마이페이지</Link>
          </div>
        </div>
      )}
    </div>
  );
}
