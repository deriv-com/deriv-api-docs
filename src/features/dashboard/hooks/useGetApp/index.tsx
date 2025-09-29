import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

const useGetApps = () => {
  const { send, data, is_loading } = useWS('app_list');

  const getAllApps = useCallback(() => {
    send();
  }, [send]);

  return { getAllApps, apps: data, is_loading };
};

export default useGetApps;
