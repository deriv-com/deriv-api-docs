import { useEffect, useState } from 'react';
import { Analytics } from '@deriv-com/analytics';

const useIsGrowthbookIsLoaded = () => {
  const [isGBLoaded, setIsGBLoaded] = useState(false);

  useEffect(() => {
    let checksCounter = 0;
    const analyticsInterval: NodeJS.Timeout = setInterval(() => {
      // Check if the analytics instance is available for 10 seconds before setting the feature flag value
      if (checksCounter > 20) {
        // If the analytics instance is not available after 10 seconds, clear the interval
        clearInterval(analyticsInterval);
        return;
      }
      checksCounter += 1;
      if (Analytics?.getInstances()?.ab) {
        setIsGBLoaded(true);
        clearInterval(analyticsInterval);
      }
    }, 500);

    return () => {
      clearInterval(analyticsInterval);
    };
  }, []);

  return isGBLoaded;
};

export default useIsGrowthbookIsLoaded;
