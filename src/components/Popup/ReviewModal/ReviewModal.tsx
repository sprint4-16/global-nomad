import { useState, useEffect, useRef, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './ReviewModal.module.scss';

import CloseIcon from '@/images/btn/btn_X.svg';
import ReviewCard from '@/pages/card/ReviewCard';
import RaitingComponent from './RaitingComponent/RaitingComponent';
import Textarea from '@/components/Textarea/Textarea';
import Button from '@/components/Button/Button';
import useBlockScroll from '@/hooks/useBlockScroll';
import useOutsideClick from '@/hooks/useOutsideClick';
import { usePostReservationReview } from '@/apis/apiHooks/MyReservations';

const cn = classNames.bind(styles);

interface ReviewModalProps {
  className?: string;
  onConfirm: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
  cardData: {
    activity: {
      title: string;
      bannerImageUrl: string;
    };
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReviewModal({
  className,
  onConfirm,
  isModalOpen,
  handleModalOpen,
  cardData,
}: ReviewModalProps) {
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

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: modalRef, onClick: handleModalOpen });
  useBlockScroll();

  if (!isModalOpen || !modalRoot) {
    return null;
  }

  const RenderModal = () => (
    <div className={cn('background')}>
      <div className={cn('container', className)} ref={modalRef}>
        <div className={cn('header')}>
          <span>후기 작성</span>
          <CloseIcon width="4rem" height="4rem" onClick={handleModalOpen} />
        </div>
        <form className={cn('form')} onSubmit={onSubmit}>
          <ReviewCard cardData={cardData} className={cn('card')} />
          <RaitingComponent onRatingChange={onRatingChange} />
          <Textarea onChange={onChange} />
          <Button className={cn('button')} type="primary" size="large">
            작성하기
          </Button>
        </form>
      </div>
    </div>
  );

  return <>{createPortal(RenderModal(), modalRoot)}</>;
}
