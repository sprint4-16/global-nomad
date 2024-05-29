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

export default function SideNavigationMenu({ className }: { className: string }) {
  const router = useRouter();

  const handleNavClick = (state: string) => {
    router.push(`/${state}`);
  };

  return (
    <div className={cn('sideNavigationMenu', className)}>
      <div className={cn('profileImgWrapper')}>
        <div className={cn('profileImgContainer')}>
          <Image src={ProfileImg} alt="프로필 이미지" />
          <div className={cn('penWrapper')}>
            <Pen />
          </div>
        </div>
      </div>
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
