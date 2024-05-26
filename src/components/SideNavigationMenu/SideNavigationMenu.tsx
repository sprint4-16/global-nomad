import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './SideNavigationMenu.module.scss';
import ProfileImg from '@/images/img/img_resource_profile_img_sample.png';
import Pen from '@/images/icon/icon_pen.svg';
import AccountCheck from '@/images/icon/icon_account_check.svg';
import TextBoxCheck from '@/images/icon/icon_text_box_check.svg';
import CalendarCheck from '@/images/icon/icon_calendar_check.svg';
import Setting from '@/images/icon/icon_setting.svg';
import { NavItem, NavState, SideNavigationMenuProps } from './SideNavigationType';

const navItems: NavItem[] = [
  { id: 1, icon: <AccountCheck />, title: '내 정보', state: 'profile' },
  { id: 2, icon: <TextBoxCheck />, title: '예약 내역', state: 'history' },
  { id: 3, icon: <CalendarCheck />, title: '내 체험 관리', state: 'experiences' },
  { id: 4, icon: <Setting />, title: '예약 현황', state: 'status' },
];

export default function SideNavigationMenu({ onNavClick }: SideNavigationMenuProps) {
  const cn = classNames.bind(styles);

  const handleNavClick = (state: NavState) => {
    onNavClick(state);
  };

  return (
    <div className={cn('sideNavigationMenu')}>
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
          <div key={item.id} className={cn('navMenu')} onClick={() => handleNavClick(item.state)}>
            <div className={cn('navIcon')}>{item.icon}</div>
            <div className={cn('navTitle')}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
