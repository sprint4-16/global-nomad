import classNames from 'classnames/bind';
import styles from './AlertModal.module.scss';
import { MouseEvent } from 'react';

const cn = classNames.bind(styles);

interface PopupModalParams {
  alertMessage?: string;
  onConfirm?: () => void;
}

export default function PopupModal({
  alertMessage = '알림 메시지가 없습니다.',
  onConfirm = () => {},
}: PopupModalParams) {
  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <form className={cn('container')}>
      <div className={cn('text')}>{alertMessage}</div>
      <button className={cn('button')} onClick={handleConfirm}>
        확인
      </button>
    </form>
  );
}
