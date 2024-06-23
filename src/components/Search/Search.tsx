import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { CSSProperties, useState, useEffect } from 'react';

import Icon from '@/images/icon/icon_bed.svg';
import Button from '../Button/Button';

import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);
interface SearchProps {
  className?: string;
  sx?: CSSProperties;
  titleText?: string;
  inputText?: string;
}

export default function Search({ className, sx, titleText, inputText }: SearchProps) {
  const buttonStyle: CSSProperties = {
    padding: '1.4rem 2rem',
  };
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newKeyword = new URLSearchParams(url.split('?')[1]).get('keyword');
      setSearchTerm(newKeyword || '');
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const isMobile = useMediaQuery({ query: '(max-width: 375px)' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm === '') return;
    router.push({
      query: {
        keyword: searchTerm,
      },
    });
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
