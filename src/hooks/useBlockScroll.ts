import { useEffect } from 'react';

const blockScroll = () => {
  const currentScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.body.style.top = `-${currentScrollY}px`;
  document.body.style.overflowY = 'scroll';
  return currentScrollY;
};

const allowScroll = (prevScrollY: number) => {
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, prevScrollY);
};

const useBlockScroll = () => {
  useEffect(() => {
    const prevScrollY = blockScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);
};

export default useBlockScroll;
