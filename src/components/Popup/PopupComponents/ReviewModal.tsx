import classNames from 'classnames/bind';
import styles from './ReviewModal.module.scss';
import { MouseEvent, useRef } from 'react';

import CloseIcon from '@/images/btn/btn_X.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface ReviewModalParams {
  className?: string;
  onConfirm: () => void;
  handleModalOpen: () => void;
}

export default function ReviewModal({ className, onConfirm, handleModalOpen }: ReviewModalParams) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
    handleModalOpen();
  };

  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('header')}>
          <span>후기 작성</span>
          <CloseIcon />
        </div>
        <form className={cn('form')}>
          <div className={cn('card')}></div>
          <div className={cn('rating')}></div>
          <div className={cn('textarea')}></div>
          <button className={cn('button')} onClick={handleConfirm}>
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
}
