import './ButtonRegister.module.scss';
import Link from 'next/link';

export default function ButtonRegister({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/register">회원가입</Link>
    </div>
  );
}
