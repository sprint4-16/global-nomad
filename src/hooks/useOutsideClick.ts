import { RefObject, useEffect } from 'react';

interface useOutsideClickProps {
  ref: RefObject<HTMLDivElement>;
  onClick: () => void;
  disabled?: boolean;
}

export default function useOutsideClick({ ref, onClick, disabled }: useOutsideClickProps) {
  useEffect(() => {
    if (!disabled) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClick();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [ref, onClick, disabled]);
}
