import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ReviewModal from './PopupComponents/ReviewModal/ReviewModal';

interface ReviewModalProps {
  className?: string;
  onConfirm: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function CreateReviewModal({ className, onConfirm, isModalOpen, handleModalOpen }: ReviewModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const RenderModal = () => {
    return <ReviewModal className={className} onConfirm={onConfirm} handleModalOpen={handleModalOpen} />;
  };

  return <>{isModalOpen && modalRoot && createPortal(RenderModal(), modalRoot)}</>;
}
