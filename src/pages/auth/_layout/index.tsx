import classNames from 'classnames/bind';
import styles from './authLayout.module.scss';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTE } from '@/constants';

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className={cn('container')}>
      <Link href={ROUTE.HOME}>
        <div className={cn('logoContainer')}></div>
      </Link>
      <div className={cn('contents')}>{children}</div>
      <div className={cn('footer')}>
        {pathname === ROUTE.SIGNUP ? (
          <>
            회원이신가요?{' '}
            <Link className={styles.footerLink} href={ROUTE.LOGIN}>
              로그인하기
            </Link>
          </>
        ) : (
          <>
            회원이 아니신가요?{' '}
            <Link className={styles.footerLink} href={ROUTE.SIGNUP}>
              회원가입하기
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
