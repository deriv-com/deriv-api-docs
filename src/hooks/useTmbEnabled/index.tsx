import { useState, useEffect } from 'react';
import { getTmbConfigUrl } from '@site/src/utils';

/**
 * Hook to fetch and determine if TMB (Third-party Marketplace Business) is enabled
 * @returns {[boolean, boolean]} A tuple containing [isTmbEnabled, isLoading]
 */
const useTmbEnabled = (): [boolean, boolean] => {
  const [isTmbEnabled, setIsTmbEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get the TMB config URL from utils
  const configUrl = getTmbConfigUrl();

  // Fetch TMB enabled status from remote config
  useEffect(() => {
    if (!configUrl) return;

    const fetchTmbStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(configUrl);
        const data = await response.json();

        // Use the "api" key from the response, default to false if undefined
        const isEnabled = data?.api === true;

        // Store the value in localStorage for other components to use
        if (typeof window !== 'undefined') {
          localStorage.setItem('is_tmb_enabled', JSON.stringify(!!isEnabled));
        }

        setIsTmbEnabled(!!isEnabled);
      } catch (error) {
        console.error('Failed to fetch TMB status:', error);
        setIsTmbEnabled(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTmbStatus();
  }, [configUrl]);

  return [isTmbEnabled, isLoading];
};

export default useTmbEnabled;
