import Popover from '@/components/Popover';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} type="notification" />
      <button onClick={() => setIsOpen(true)}>Popover 키기</button>
    </>
  );
}
