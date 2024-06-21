import { CSSProperties, ChangeEvent, LegacyRef, ReactNode, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import styles from './AddressInput.module.scss';
import classNames from 'classnames/bind';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

interface AddressInputProps {
  label?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  placeholder?: string;
  sx?: CSSProperties;
  className?: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressInput({ label, type, id, placeholder, sx, className, onChange }: AddressInputProps) {
  const [address, setAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      margin: 'auto',
      width: '500px',
      height: '600px',
      padding: '0',
      overflow: 'hidden',
      borderRadius: '10px',
    },
  };

  const completeHandler = (data: { address: string }) => {
    const { address } = data;
    setAddress(address);
    if (onChange) {
      onChange({ target: { value: address } } as ChangeEvent<HTMLInputElement>);
    }
  };

  const closeHandler = (state: string) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const handleOutsideCilck = () => {
    if (isOpen === true) setIsOpen(false);
  };

  useOutsideClick({ ref: modalRef, onClick: handleOutsideCilck });

  return (
    <>
      <div className={cn('inputContainer', className)}>
        <label htmlFor={type} className={cn('label')}>
          {label}
        </label>
        <div className={cn('inputWrapper')}>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={cn('input')}
            style={sx}
            onClick={toggleHandler}
            onChange={onChange}
            value={address}
          />
          <div ref={modalRef}>
            <Modal isOpen={isOpen} style={customStyles}>
              <DaumPostcode theme={themeObj} onComplete={completeHandler} onClose={closeHandler} shorthand={false} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
