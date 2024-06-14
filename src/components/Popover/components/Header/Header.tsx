import CloseBtn from '@/components/btns/CloseBtn/CloseBtn';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

interface HeaderProps {
  title: string;
  onClose: () => void;
  isNotificationHeader?: boolean;
}

const cn = classNames.bind(styles);

export default function Header({ title, onClose, isNotificationHeader = false }: HeaderProps) {
  return (
    <div className={cn('container')}>
      <h2 className={cn('title', { notificationTitle: isNotificationHeader })}>{title}</h2>
      <CloseBtn onClick={onClose} size={isNotificationHeader ? 20 : 30} />
    </div>
  );
}
