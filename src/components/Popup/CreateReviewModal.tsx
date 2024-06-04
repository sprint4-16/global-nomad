import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ReviewModal from './PopupComponents/ReviewModal/ReviewModal';

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

export default function CreateReviewModal({
  className,
  onConfirm,
  isModalOpen,
  handleModalOpen,
  cardData,
}: ReviewModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const RenderModal = () => {
    return (
      <ReviewModal cardData={cardData} className={className} onConfirm={onConfirm} handleModalOpen={handleModalOpen} />
    );
  };

  return <>{isModalOpen && modalRoot && createPortal(RenderModal(), modalRoot)}</>;
}
