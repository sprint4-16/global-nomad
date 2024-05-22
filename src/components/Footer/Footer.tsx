import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Link from 'next/link';

import Facebook from '@/images/icon/icon_facebook.svg';
import Twitter from '@/images/icon/icon_twitter.svg';
import Youtube from '@/images/icon/icon_youtube.svg';
import Instagram from '@/images/icon/icon_instagram.svg';

const cn = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cn('background')}>
      <div className={cn('container')}>
        <div className={cn('copyright')}>©codeit - 2024</div>
        <div className={cn('link')}>
          <Link href="/#">Privacy Policy</Link>
          <Link href="/#">FAQ</Link>
        </div>
        <div className={cn('logo')}>
          <Link href="https://www.facebook.com/">
            <Facebook />
          </Link>
          <Link href="https://x.com/?lang=ko">
            <Twitter />
          </Link>
          <Link href="https://www.youtube.com">
            <Youtube />
          </Link>
          <Link href="https://www.instagram.com">
            <Instagram />
          </Link>
        </div>
      </div>
    </div>
  );
}
