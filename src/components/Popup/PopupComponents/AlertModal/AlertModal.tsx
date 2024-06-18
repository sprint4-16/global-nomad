import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AlertModal.module.scss';

import Button from '@/components/Button/Button';
import useOutsideClick from '@/hooks/useOutsideClick';
import useBlockScroll from '@/hooks/useBlockScroll';

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
  const handleConfirm = () => {
    onConfirm();
    handleModalOpen();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleConfirm });
  useBlockScroll();

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('text')}>{alertMessage}</div>
        <Button className={cn('button')} onClick={handleConfirm} type="primary" size="large">
          확인
        </Button>
      </div>
    </div>
  );
}
