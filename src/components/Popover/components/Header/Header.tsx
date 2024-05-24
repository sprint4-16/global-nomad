import CloseBtn from '@/components/btns/CloseBtn/CloseBtn';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

interface HeaderProps {
  title: string;
  onClose: () => void;
}

const cn = classNames.bind(styles);

export default function Header({ title, onClose }: HeaderProps) {
  return (
    <div className={cn('container')}>
      <h2 className={cn('title')}>{title}</h2>
      <CloseBtn onClick={onClose} />
    </div>
  );
}
