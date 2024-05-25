import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import AlertModal from './PopupComponents/AlertModal/AlertModal';
import ConfirmationModal from './PopupComponents/ConfirmationModal/ConfirmationModal';

interface PopupComponentProps {
  className?: string;
  modalType: 'alert' | 'confirm';
  alertMessage: string;
  onConfirm: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function CreatePopupModal({
  className,
  modalType,
  alertMessage,
  onConfirm,
  isModalOpen,
  handleModalOpen,
}: PopupComponentProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const RenderModal = () => {
    if (modalType === 'alert') {
      return (
        <AlertModal
          className={className}
          alertMessage={alertMessage}
          onConfirm={onConfirm}
          handleModalOpen={handleModalOpen}
        />
      );
    }
    if (modalType === 'confirm') {
      return (
        <ConfirmationModal
          className={className}
          confirmMessage={alertMessage}
          onCancel={onConfirm}
          handleModalOpen={handleModalOpen}
        />
      );
    }
  };

  return <>{isModalOpen && modalRoot && createPortal(RenderModal(), modalRoot)}</>;
}
