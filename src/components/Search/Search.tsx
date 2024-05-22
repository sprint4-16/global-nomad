import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Bed from '@/images/icon/icon_bed.svg';
import Button from '../Button/Button';
import { CSSProperties } from 'react';

const cn = classNames.bind(styles);

type Size = 'large' | 'medium' | 'small';

interface SearchProps {
  text?: string;
  inputText?: string;
  size: Size;
  sx?: CSSProperties;
}

export function Search({ text, inputText, size, sx }: SearchProps) {
  const buttonStyle: CSSProperties = {
    padding: '1.4rem 2rem',
  };

  return (
    <div className={cn('searchContainer', size)} style={sx}>
      <div className={cn('searchLabel')}>{text}</div>
      <div className={cn('searchBox')}>
        <Bed className={cn('bedImg')} />
        <div className={cn('inputContainer')}>
          <input className={cn('input')} type="text" id="searchInput" placeholder=" " />
          <label className={cn('placeholder')} htmlFor="searchInput">
            {inputText}
          </label>
        </div>
        <Button
          type="primary"
          size={size === 'small' ? 'small' : 'medium'}
          sx={size === 'small' ? buttonStyle : undefined}
          onClick={() => console.log('Button clicked!')}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
