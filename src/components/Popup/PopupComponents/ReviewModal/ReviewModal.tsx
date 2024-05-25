import { MouseEvent, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './ReviewModal.module.scss';

import CloseIcon from '@/images/btn/btn_X.svg';
import RaitingComponent from './RaitingComponent/RaitingComponent';
import Textarea from '@/components/Textarea/Textarea';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface ReviewModalProps {
  className?: string;
  onConfirm: () => void;
  handleModalOpen: () => void;
}

export default function ReviewModal({ className, onConfirm, handleModalOpen }: ReviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
    handleModalOpen();
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleConfirm;
  };
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('header')}>
          <span>후기 작성</span>
          <CloseIcon width="4rem" height="4rem" onClick={handleModalOpen} />
        </div>
        <form className={cn('form')}>
          <div className={cn('card')} />
          <RaitingComponent />
          <Textarea />
          <button className={cn('button')} onClick={onClick}>
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
}
