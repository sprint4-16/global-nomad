import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Icon from '@/images/icon/icon_bed.svg';
import Button from '../Button/Button';
import { CSSProperties } from 'react';

const cn = classNames.bind(styles);

type Size = 'large' | 'medium' | 'small';

interface SearchProps {
  titleText?: string;
  inputText?: string;
  size: Size;
  sx?: CSSProperties;
  className?: string;
}

export function Search({ titleText, inputText, size, sx, className }: SearchProps) {
  const buttonStyle: CSSProperties = {
    padding: '1.4rem 2rem',
  };

  return (
    <div className={cn('searchContainer', size, className)} style={sx}>
      <div className={cn('searchLabel')}>{titleText}</div>
      <div className={cn('searchBox')}>
        <Icon className={cn('bedImg')} />
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
          className={cn('searchButton')}
          onClick={() => console.log('Button clicked!')}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
