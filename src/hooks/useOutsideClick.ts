import { RefObject, useEffect } from 'react';

interface useOutsideClickProps {
  ref: RefObject<HTMLDivElement>;
  onClick: () => void;
}

export default function useOutsideClick({ ref, onClick }: useOutsideClickProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
}
