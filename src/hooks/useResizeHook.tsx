import { useState, useEffect } from 'react';

const useResizeHook = (breakpoint: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < breakpoint);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [breakpoint]);

  return isMobile;
};

export default useResizeHook;
