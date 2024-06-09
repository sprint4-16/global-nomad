import { ReactNode } from 'react';
import styles from './authLaoyout.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className={cn('container')}>
      <div className={cn('logoContainer')}></div>
      {children}
      <div className={cn('footer')}>
        {pathname === '/auth/signup' ? (
          <>
            회원이신가요?{' '}
            <Link className={styles.footerLink} href="/auth/signin">
              로그인하기
            </Link>
          </>
        ) : (
          <>
            회원이 아니신가요?{' '}
            <Link className={styles.footerLink} href="/auth/signup">
              회원가입하기
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
