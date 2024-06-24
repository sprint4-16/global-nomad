import CloseBtn from '@/components/btns/CloseBtn/CloseBtn';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

interface HeaderProps {
  title: string;
  isNotificationHeader?: boolean;
  onClose: () => void;
}

const CLOSE_BUTTON_SIZE = { small: 20, large: 30 };

const cn = classNames.bind(styles);

export default function Header({ title, isNotificationHeader = false, onClose }: HeaderProps) {
  return (
    <div className={cn('container')}>
      <h2 className={cn('title', { notificationTitle: isNotificationHeader })}>{title}</h2>
      <CloseBtn onClick={onClose} size={isNotificationHeader ? CLOSE_BUTTON_SIZE.small : CLOSE_BUTTON_SIZE.large} />
    </div>
  );
}
