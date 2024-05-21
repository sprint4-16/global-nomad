import './ButtonLogin.module.scss';
import Link from 'next/link';

export default function ButtonLogin({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/login">로그인</Link>
    </div>
  );
}
