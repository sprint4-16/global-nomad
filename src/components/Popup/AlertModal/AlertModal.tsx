import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function AlertModal({
  className,
  alertMessage = '알림 메시지가 없습니다.',
  onConfirm,
  isModalOpen,
  handleModalOpen,
}: PopupModalProps) {
  const handleConfirm = () => {
    onConfirm();
    handleModalOpen();
  };

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleConfirm });
  useBlockScroll();

  if (!isModalOpen || !modalRoot) {
    return null;
  }

  const RenderModal = () => (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('text')}>{alertMessage}</div>
        <Button className={cn('button')} onClick={handleConfirm} type="primary" size="large">
          확인
        </Button>
      </div>
    </div>
  );

  return <>{createPortal(RenderModal(), modalRoot)}</>;
}
