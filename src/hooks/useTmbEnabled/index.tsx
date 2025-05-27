import { useState, useEffect } from 'react';
import { getTmbConfigUrl } from '@site/src/utils';
import useAuthContext from '@site/src/hooks/useAuthContext';

/**
 * Hook to fetch and determine if TMB (Third-party Marketplace Business) is enabled
 * @returns {[boolean, boolean]} A tuple containing [isTmbEnabled, isLoading]
 */
const useTmbEnabled = (): [boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const { is_tmb_enabled_ff, updateTmbEnabledFF } = useAuthContext();

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

        // Store the value in the auth context
        updateTmbEnabledFF(!!isEnabled);
      } catch (error) {
        console.error('Failed to fetch TMB status:', error);
        updateTmbEnabledFF(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTmbStatus();
  }, [configUrl, updateTmbEnabledFF]);

  return [is_tmb_enabled_ff, isLoading];
};

export default useTmbEnabled;
