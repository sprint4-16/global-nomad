import { MouseEvent, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './ConfirmationModal.module.scss';

import CheckIcon from '@/images/icon/icon_check.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface ConfirmationProps {
  className?: string;
  confirmMessage?: string;
  onCancel: () => void;
  handleModalOpen: () => void;
}

export default function ConfirmationModal({
  className,
  confirmMessage = '메시지가 없습니다.',
  onCancel,
  handleModalOpen,
}: ConfirmationProps) {
  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
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
      </div>
    </div>
  );
}
