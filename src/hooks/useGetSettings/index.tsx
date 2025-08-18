import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

export const useGetSettings = () => {
  const { data, send, is_loading } = useWS('get_settings');

  const getSettings = useCallback(async () => {
    await send({ get_settings: '1' });
  }, [send]);

  return {
    isLoading: is_loading,
    getSettings,
    data,
  };
};
