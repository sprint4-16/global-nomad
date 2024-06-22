import classNames from 'classnames/bind';
import styles from '../Card.module.scss';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ROUTE } from '@/constants';
import useGetCookie from '@/hooks/useCookies';
import { usePatchReservationCancel } from '@/apis/apiHooks/MyReservations';

import { MeatballIcon, StarIcon } from '@/images/icon';
import { RESERVATION_STATE_LABEL_MAP } from '@/constants';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from '../../Button/Button';

import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import ReviewModal from '@/components/Popup/ReviewModal/ReviewModal';
import ConfirmationModal from '@/components/Popup/ConfirmationModal/ConfirmationModal';
import { UseDeleteSchedule } from '@/apis/apiHooks/MyActivities';

const cn = classNames.bind(styles);

type ReservationState = 'pending' | 'confirmed' | 'canceled' | 'declined' | 'completed';

interface ReservationButtonProps {
  cardData: {
    activity: {
      title: string;
      bannerImageUrl: string;
    };
    id: number;
    reviewSubmitted: boolean;
    status: ReservationState;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export function Thumbnail({ bannerImageUrl, where }: { bannerImageUrl: string; where?: 'review' }) {
  // 임시 Blur 데이터 (추후 수정 예정)
  const BLUR_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0rQcAAR8AzpZX2ywAAAAASUVORK5CYII=';

  return (
    <Image
      className={cn('thumbnail', where)}
      src={bannerImageUrl}
      alt="card thumbnail"
      width={450}
      height={450}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
    />
  );
}

export function Description({ children, where }: { children: React.ReactNode; where?: 'review' }) {
  return <div className={cn('description', where)}>{children}</div>;
}

export function Title({ children, where }: { children: React.ReactNode; where?: 'review' }) {
  return <div className={cn('title', where)}>{children}</div>;
}

export function Schedule({
  date,
  startTime,
  endTime,
  headCount,
}: {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}) {
  return (
    <div className={cn('schedule')}>
      {date} · {startTime} - {endTime} · {headCount}명
    </div>
  );
}

export function ReservationStatus({ status }: { status: ReservationState }) {
  return <div className={cn('reservationState', status)}>{RESERVATION_STATE_LABEL_MAP[status]}</div>;
}

export function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className={cn('starRating')}>
      <StarIcon className={cn('starIcon')} viewBox="0 0 56 56" />
      {rating} ({reviewCount})
    </div>
  );
}

export function Footer({ children }: { children: React.ReactNode }) {
  return <div className={cn('footer')}>{children}</div>;
}

export function Divider() {
  return <div className={cn('divider')} />;
}

export function Price({ price, where }: { price: number; where?: 'review' }) {
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

  return <div className={cn('price', where)}>₩{formattedPrice}</div>;
}

export function CardDropdown({ activityId }: { activityId: number }) {
  const [isOpenDropdown, setViewDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { mutate: deleteActivity, error } = UseDeleteSchedule({ activityId });
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    setViewDropdown(!isOpenDropdown);
  };

  const closeDropdown = () => {
    setViewDropdown(false);
  };

  const handleModifyClick = () => {
    router.push(`${ROUTE.ACTIVITY_EDIT}/${activityId}`);
  };

  const handleDeleteClick = () => {
    deleteActivity();
    setIsModalOpen((prev) => !prev);
  };

  const onConfirm = () => {
    queryClient.invalidateQueries({ queryKey: ['myActivities'] });
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  useOutsideClick({ ref: profileRef, onClick: closeDropdown });

  const alertMessage =
    ((error as AxiosError)?.response?.data as { message: string })?.message || '내 체험이 성공적으로 삭제되었습니다.';

  return (
    <div className={cn('dropdownContainer')} ref={profileRef}>
      <MeatballIcon className={cn('meatball')} viewBox="0 0 40 40" onClick={toggleDropdown} />
      {isOpenDropdown && (
        <div className={cn('dropdown')}>
          <div className={cn('dropdownItem')} onClick={handleModifyClick}>
            수정하기
          </div>
          <div className={cn('dropdownItem')} onClick={handleDeleteClick}>
            삭제하기
          </div>
        </div>
      )}
      <AlertModal
        alertMessage={alertMessage}
        onConfirm={onConfirm}
        isModalOpen={isModalOpen}
        handleModalOpen={handleModalOpen}
      />
    </div>
  );
}

export function ReservationButton({ cardData }: ReservationButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const { updateCookie } = useGetCookie();
  updateCookie('reservationId', cardData.id);

  const { mutate: patchCancelData } = usePatchReservationCancel();

  const handleModalCreateClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleCancelClick = () => {
    patchCancelData();
    setModalOpen(!modalOpen);
  };
  if (cardData.status === 'pending') {
    return (
      <>
        <Button className={cn('reservationButton')} type="secondary" size="medium" onClick={handleModalCreateClick}>
          예약 취소
        </Button>

        <ConfirmationModal
          confirmMessage="예약을 취소하시겠어요?"
          onCancel={handleCancelClick}
          isModalOpen={modalOpen}
          handleModalOpen={handleModalCreateClick}
        />
      </>
    );
  }

  const handleReviewConfirmClick = () => {
    setModalOpen(!modalOpen);
  };
  if (cardData.status === 'completed' && cardData.reviewSubmitted === false) {
    return (
      <>
        <Button className={cn('reservationButton')} type="primary" size="medium" onClick={handleModalCreateClick}>
          후기 작성
        </Button>

        <ReviewModal
          onConfirm={handleReviewConfirmClick}
          isModalOpen={modalOpen}
          handleModalOpen={handleModalCreateClick}
          cardData={cardData}
        />
      </>
    );
  }

  return null;
}
