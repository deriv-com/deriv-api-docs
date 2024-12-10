import { TSocketRequestCleaned } from '@site/src/configs/websocket/types';
import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

const useRegisterApp = () => {
  const { send, data, is_loading } = useWS('app_register');

  const registerApp = useCallback(
    (data: TSocketRequestCleaned<'app_register'>) => {
      send(data);
    },
    [send],
  );

  return { registerApp, data, is_loading };
};

export default useRegisterApp;
