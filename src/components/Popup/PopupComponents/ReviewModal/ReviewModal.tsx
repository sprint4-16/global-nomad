import { FormEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewModal.module.scss';

import CloseIcon from '@/images/btn/btn_X.svg';
import RaitingComponent from './RaitingComponent/RaitingComponent';
import Textarea from '@/components/Textarea/Textarea';
import useOutsideClick from '@/hooks/useOutsideClick';
import { usePostReservationReview } from '@/apis/apiHooks/MyReservations';

const cn = classNames.bind(styles);

interface ReviewModalProps {
  className?: string;
  onConfirm: () => void;
  handleModalOpen: () => void;
}

export default function ReviewModal({ className, onConfirm, handleModalOpen }: ReviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [bodyData, setBodydata] = useState({
    rating: 1,
    content: '',
  });
  const { mutate: postBodyData } = usePostReservationReview();

  const onRatingChange = (rating: number) => {
    setBodydata({ ...bodyData, rating });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodydata({ ...bodyData, content: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postBodyData(bodyData);
    onConfirm();
  };
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });

  return (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('header')}>
          <span>후기 작성</span>
          <CloseIcon width="4rem" height="4rem" onClick={handleModalOpen} />
        </div>
        <form className={cn('form')} onSubmit={onSubmit}>
          <div className={cn('card')} />
          <RaitingComponent onRatingChange={onRatingChange} />
          <Textarea onChange={onChange} />
          <button className={cn('button')}>작성하기</button>
        </form>
      </div>
    </div>
  );
}
