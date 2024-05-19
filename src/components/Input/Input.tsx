import { ReactNode } from 'react';
import eyeOff from '@/images/btn/btn_eye_off';
import eyeOn from '@/images/btn/btn_eye_on';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProps {
  label: ReactNode;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  color?: string;
  className?: string;
}

export function Input({ label, type, placeholder, color, className }: InputProps) {
  return (
    <div className={cx('input-container', className)}>
      <label htmlFor={type} className={cx('label')}>
        {label}
      </label>
      {type === 'password' ? (
        <>
          <input type={type} id={type} placeholder={placeholder} className={cx('input', color)} />
          <img src={eyeOff} />
        </>
      ) : (
        <input type={type} id={type} placeholder={placeholder} className={cx('input', color)} />
      )}
    </div>
  );
}
