import { useState, useEffect } from 'react';
import { debounceTime, fromEvent } from 'rxjs';

type TDeviceType = 'mobile' | 'tablet' | 'desktop';

type TUseDeviceType = {
  deviceType: TDeviceType;
};

const useDeviceType = (): TUseDeviceType => {
  const [deviceType, setDeviceType] = useState<TDeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setDeviceType('mobile');
      } else if (window.matchMedia('(max-width: 1023px)').matches) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    const resize = fromEvent(window, 'resize');
    const result = resize.pipe(debounceTime(600));
    result.subscribe(handleResize);
  }, []);

  return { deviceType };
};

export default useDeviceType;
