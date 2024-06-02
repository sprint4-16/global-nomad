import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './SideNavigationMenu.module.scss';

import { ROUTE } from '@/constants/index';
import ProfileImg from '@/images/img/img_resource_profile_img_sample.png';
import Pen from '@/images/icon/icon_pen.svg';
import AccountCheck from '@/images/icon/icon_account_check.svg';
import TextBoxCheck from '@/images/icon/icon_text_box_check.svg';
import CalendarCheck from '@/images/icon/icon_calendar_check.svg';
import Setting from '@/images/icon/icon_setting.svg';

const cn = classNames.bind(styles);

const navItems = [
  { id: 1, icon: <AccountCheck />, title: '내 정보', state: `${ROUTE.USER}` },
  { id: 2, icon: <TextBoxCheck />, title: '예약 내역', state: `${ROUTE.RESERVATIONS}` },
  { id: 3, icon: <CalendarCheck />, title: '내 체험 관리', state: `${ROUTE.USER_ACTIVITIES}` },
  { id: 4, icon: <Setting />, title: '예약 현황', state: `${ROUTE.RESERVATION_CALENDAR}` },
];

export default function SideNavigationMenu({
  className,
  onMenuClick,
}: {
  className: string;
  onMenuClick?: (state: string) => void;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState(ProfileImg);
  const [isCustomImage, setIsCustomImage] = useState(false);

  const handleNavClick = (state: string) => {
    if (onMenuClick) {
      onMenuClick(state);
    } else {
      router.push(`/${state}`);
    }
  };

  const handlePenClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result as string);
          setIsCustomImage(true);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const customLoader = ({ src }) => {
    return src;
  };

  return (
    <div className={cn('sideNavigationMenu', className)}>
      <div className={cn('profileImgWrapper')}>
        <div className={cn('profileImgContainer')}>
          <Image
            src={imageSrc}
            alt="프로필 이미지"
            layout="fill"
            objectFit="cover"
            loader={isCustomImage ? customLoader : undefined}
            className={cn('profileImg')}
          />
          <div className={cn('penWrapper')} onClick={handlePenClick}>
            <Pen />
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
      <div className={cn('navMenuList')}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={cn('navMenu', { active: router.pathname === item.state })}
            onClick={() => handleNavClick(item.state)}
          >
            <div className={cn('navIcon')}>{item.icon}</div>
            <div className={cn('navTitle')}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
