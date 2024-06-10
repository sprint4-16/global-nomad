import React, { useRef } from 'react';
import AddImageIcon from '@/images/btn/btn_add_img.svg';

interface AddImageBtnProps {
  onImageSelect?: (imageUrl: string) => void;
  size?: number;
}

const AddImageBtn = ({ onImageSelect, size = 180 }: AddImageBtnProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = (e.target as FileReader).result as string;
        if (onImageSelect) {
          onImageSelect(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      <button onClick={handleButtonClick}>
        <AddImageIcon width={size} height={size} />
      </button>
    </>
  );
};

export default AddImageBtn;
