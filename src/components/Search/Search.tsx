import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Icon from '@/images/icon/icon_bed.svg';
import Button from '../Button/Button';
import React, { CSSProperties, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const cn = classNames.bind(styles);
interface SearchProps {
  titleText?: string;
  inputText?: string;
  sx?: CSSProperties;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (filteredResults: string | undefined) => void;
}

export function Search({ titleText, inputText, sx, className, onChange, onClick }: SearchProps) {
  const buttonStyle: CSSProperties = {
    padding: '1.4rem 2rem',
  };
  const [searchTerm, setSearchTerm] = useState('');

  const isMobile = useMediaQuery({ query: '(max-width: 375px)' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm === '') return;
    if (onClick) onClick(searchTerm);
  };
  return (
    <div className={cn('wrapper')}>
      <div className={cn('container', className)} style={sx}>
        <div className={cn('searchLabel')}>{titleText}</div>
        <form className={cn('searchBox')} onSubmit={handleSearchSubmit}>
          <Icon className={cn('bedImg')} />
          <div className={cn('inputContainer')}>
            <input
              className={cn('input')}
              type="text"
              id="searchInput"
              placeholder={inputText}
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size={isMobile ? 'small' : 'medium'}
            sx={isMobile ? buttonStyle : undefined}
            className={cn('searchButton')}
          >
            검색하기
          </Button>
        </form>
      </div>
    </div>
  );
}
