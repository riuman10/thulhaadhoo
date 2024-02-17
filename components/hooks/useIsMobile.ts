import { useLayoutEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    let timeoutId: NodeJS.Timeout;

    const debouncedUpdateSize = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 250);
    };

    window.addEventListener('resize', debouncedUpdateSize);
    updateSize();

    return (): void => {
      window.removeEventListener('resize', debouncedUpdateSize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
