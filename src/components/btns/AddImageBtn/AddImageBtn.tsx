import React from 'react';
import AddImageIcon from '@/images/btn/btn_add_img.svg';

interface AddImageBtnProps {
  onClick?: () => void;
  size?: number;
}

export default function AddImageBtn({ onClick, size = 180 }: AddImageBtnProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick}>
      <AddImageIcon width={size} height={size} />
    </button>
  );
}
