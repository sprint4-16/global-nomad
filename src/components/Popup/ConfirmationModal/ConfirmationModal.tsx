import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './ConfirmationModal.module.scss';

import CheckIcon from '@/images/icon/icon_check.svg';
import Button from '@/components/Button/Button';
import useOutsideClick from '@/hooks/useOutsideClick';
import useBlockScroll from '@/hooks/useBlockScroll';

const cn = classNames.bind(styles);

interface ConfirmationProps {
  className?: string;
  confirmMessage: string;
  onCancel: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function ConfirmationModal({
  className,
  confirmMessage = '메시지가 없습니다.',
  onCancel,
  isModalOpen,
  handleModalOpen,
}: ConfirmationProps) {
  const handleCancel = () => {
    onCancel();
    handleModalOpen();
  };

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });
  useBlockScroll(!isModalOpen);

  if (!isModalOpen || !modalRoot) {
    return null;
  }

  const RenderModal = () => (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('IconContainer')}>
          <CheckIcon />
        </div>
        <div className={cn('text')}>{confirmMessage}</div>
        <div className={cn('buttonContainer')}>
          <Button className={cn('button')} onClick={handleModalOpen} type="secondary" size="small">
            아니오
          </Button>
          <Button className={cn('button')} onClick={handleCancel} type="primary" size="small">
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );

  return <>{createPortal(RenderModal(), modalRoot)}</>;
}
