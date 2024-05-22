import AlertModal from '@/components/Popup/PopupComponents/AlertModal';
import ConfirmationModal from '@/components/Popup/PopupComponents/ConfirmationModal';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupComponentParams {
  modalType: 'alert' | 'confirm';
  alertMessage: string;
  onConfirm: () => void;
  isModalOpen: boolean;
  handleModalOpen: () => void;
}

export default function PopUpComponent({
  modalType,
  alertMessage,
  onConfirm,
  isModalOpen,
  handleModalOpen,
}: PopupComponentParams) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const renderModal = () => {
    if (modalType === 'alert') {
      return <AlertModal alertMessage={alertMessage} onConfirm={onConfirm} handleModalOpen={handleModalOpen} />;
    }
    if (modalType === 'confirm') {
      return <ConfirmationModal confirmMessage={alertMessage} onCancel={onConfirm} handleModalOpen={handleModalOpen} />;
    }
  };

  return <>{isModalOpen && modalRoot && ReactDOM.createPortal(renderModal(), modalRoot)}</>;
}
