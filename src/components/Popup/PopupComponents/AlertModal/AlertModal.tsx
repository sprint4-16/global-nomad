import { MouseEvent, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './AlertModal.module.scss';

import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface PopupModalProps {
  className?: string;
  alertMessage: string;
  onConfirm: () => void;
  handleModalOpen: () => void;
}

export default function AlertModal({
  className,
  alertMessage = '알림 메시지가 없습니다.',
  onConfirm,
  handleModalOpen,
}: PopupModalProps) {
  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
    handleModalOpen();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('text')}>{alertMessage}</div>
        <button className={cn('button')} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
