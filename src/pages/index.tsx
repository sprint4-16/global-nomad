import { useState } from 'react';
import CreateReviewModal from '@/components/Popup/CreateReviewModal';

export default function Home() {
  const onConfirm = () => {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      랜딩페이지
      <button onClick={handleModalOpen}>sss</button>
      <CreateReviewModal onConfirm={onConfirm} isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} />
    </>
  );
}
