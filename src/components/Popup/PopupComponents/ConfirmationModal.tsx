import classNames from 'classnames/bind';
import styles from './Confirmation.module.scss';
import { MouseEvent } from 'react';

import CheckIcon from '@/images/icon/icon_check.svg';

const cn = classNames.bind(styles);

interface ConfirmationProps {
  confirmMessage?: string;
  onCancel: () => void;
  handleModalOpen: () => void;
}

export default function ConfirmationModal({
  confirmMessage = '메시지가 없습니다.',

  onCancel,
  handleModalOpen,
}: ConfirmationProps) {
  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className={cn('background')}>
      <form className={cn('container')}>
        <div className={cn('IconContainer')}>
          <CheckIcon />
        </div>
        <div className={cn('text')}>{confirmMessage}</div>
        <div className={cn('buttonContainer')}>
          <button className={cn('button')} onClick={handleModalOpen}>
            아니오
          </button>
          <button className={cn('button')} onClick={handleCancel}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
