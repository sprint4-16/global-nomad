import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import ReviewModal from './PopupComponents/ReviewModal';

interface ReviewModalParams {
  className?: string;
  onConfirm: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function ReviewModalComponent({
  className,
  onConfirm,
  isModalOpen,
  handleModalOpen,
}: ReviewModalParams) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const renderModal = () => {
    return <ReviewModal className={className} onConfirm={onConfirm} handleModalOpen={handleModalOpen} />;
  };

  return <>{isModalOpen && modalRoot && ReactDOM.createPortal(renderModal(), modalRoot)}</>;
}
