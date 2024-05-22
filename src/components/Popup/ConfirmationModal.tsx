import classNames from 'classnames/bind';
import styles from './Confirmation.module.scss';
import { MouseEvent } from 'react';

import CheckIcon from '@/images/icon/icon_check.svg';

const cn = classNames.bind(styles);

interface ConfirmationProps {
  confirmMessage?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function Confirmation({
  confirmMessage = '메시지가 없습니다.',
  onConfirm = () => {},
  onCancel = () => {},
}: ConfirmationProps) {
  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form className={cn('container')}>
      <div className={cn('IconContainer')}>
        <CheckIcon />
      </div>
      <div className={cn('text')}>{confirmMessage}</div>
      <div className={cn('buttonContainer')}>
        <button className={cn('button')} onClick={handleConfirm}>
          아니오
        </button>
        <button className={cn('button')} onClick={handleCancel}>
          취소하기
        </button>
      </div>
    </form>
  );
}
