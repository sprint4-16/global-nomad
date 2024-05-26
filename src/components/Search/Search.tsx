import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Icon from '@/images/icon/icon_bed.svg';
import Button from '../Button/Button';
import { CSSProperties, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const cn = classNames.bind(styles);

interface SearchProps {
  titleText?: string;
  inputText?: string;
  sx?: CSSProperties;
  className?: string;
  data?: any[]; // 어떤 타입이 올지 몰라서 일단 any로 뒀습니다!
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (filteredResults: any[]) => void;
}

export function Search({ titleText, inputText, sx, className, data = [], onChange, onClick }: SearchProps) {
  const buttonStyle: CSSProperties = {
    padding: '1.4rem 2rem',
  };
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 375px)' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSearchClick = () => {
    const results = data.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    if (onClick) onClick(results);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('container', className)} style={sx}>
        <div className={cn('searchLabel')}>{titleText}</div>
        <div className={cn('searchBox')}>
          <Icon className={cn('bedImg')} />
          <div className={cn('inputContainer')}>
            <input
              className={cn('input')}
              type="text"
              id="searchInput"
              placeholder=" "
              value={searchTerm}
              onChange={handleInputChange}
            />
            <label className={cn('placeholder')} htmlFor="searchInput">
              {inputText}
            </label>
          </div>
          <Button
            type="primary"
            size={isMobile ? 'small' : 'medium'}
            sx={isMobile ? buttonStyle : undefined}
            className={cn('searchButton')}
            onClick={handleSearchClick}
          >
            검색하기
          </Button>
        </div>
      </div>
    </div>
  );
}