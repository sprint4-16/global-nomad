import './ButtonProfile.module.scss';
import Link from 'next/link';

export default function ButtonProfile({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/profile">프로필</Link>
    </div>
  );
}
