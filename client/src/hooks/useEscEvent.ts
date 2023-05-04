import { useEffect } from 'react';

export default (fn: (...args: any) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', fn, false);

    return () => {
      document.removeEventListener('keydown', fn, false);
    };
  }, [fn]);
};
