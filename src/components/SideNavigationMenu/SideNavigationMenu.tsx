import classNames from 'classnames/bind';
import styles from './SideNavigationMenu.module.scss';
import ProfileImg from '@/images/img/img_resource_profile_img_sample.png';
import Pen from '@/images/icon/icon_pen.svg';
import AccountCheck from '@/images/icon/icon_account_check.svg';
import TextBoxCheck from '@/images/icon/icon_text_box_check.svg';
import CalendarCheck from '@/images/icon/icon_calendar_check.svg';
import Setting from '@/images/icon/icon_setting.svg';
import Image from 'next/image';

const navItems = [
  { id: 1, icon: <AccountCheck />, title: '내 정보' },
  { id: 2, icon: <TextBoxCheck />, title: '예약 내역' },
  { id: 3, icon: <CalendarCheck />, title: '내 체험 관리' },
  { id: 4, icon: <Setting />, title: '예약 현황' },
];

export default function SideNavigationMenu() {
  const cn = classNames.bind(styles);

  return (
    <div className={cn(styles.sideNavigationMenu)}>
      <div className={cn(styles.profileImgWrapper)}>
        <div className={cn(styles.profileImgContainer)}>
          <Image src={ProfileImg} alt="프로필 이미지" />
          <div className={cn(styles.penWrapper)}>
            <Pen />
          </div>
        </div>
      </div>
      <div className={cn(styles.navMenuList)}>
        {navItems.map((item) => (
          <div key={item.id} className={cn(styles.navMenu)}>
            <div className={cn(styles.navIcon)}>{item.icon}</div>
            <div className={cn(styles.navTitle)}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
