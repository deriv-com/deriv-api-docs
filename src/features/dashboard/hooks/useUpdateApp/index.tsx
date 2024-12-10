import { TSocketRequestCleaned } from '@site/src/configs/websocket/types';
import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

const useUpdateApp = () => {
  const { send, data, is_loading } = useWS('app_update');

  const updateApp = useCallback(
    (data: TSocketRequestCleaned<'app_update'>) => {
      send(data);
    },
    [send],
  );

  return { updateApp, data, is_loading };
};

export default useUpdateApp;
