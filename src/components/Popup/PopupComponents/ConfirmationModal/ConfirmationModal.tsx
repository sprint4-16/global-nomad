import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ConfirmationModal.module.scss';

import CheckIcon from '@/images/icon/icon_check.svg';
import Button from '@/components/Button/Button';
import useOutsideClick from '@/hooks/useOutsideClick';
import useBlockScroll from '@/hooks/useBlockScroll';

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
  const handleCancel = () => {
    onCancel();
    handleModalOpen();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });
  useBlockScroll();

  return (
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
}
