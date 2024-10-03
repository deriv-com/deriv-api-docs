import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useWS from '@site/src/hooks/useWs';
import { useCallback, useEffect } from 'react';

const useDeleteToken = () => {
  const { send, data, is_loading, error } = useWS('api_token');
  const { is_authorized } = useAuthContext();
  const { updateTokens } = useApiToken();

  const deleteToken = useCallback(
    (token: string) => {
      if (is_authorized) {
        send({ delete_token: token });
      }
    },
    [is_authorized, send],
  );

  useEffect(() => {
    if (data) {
      updateTokens(data.tokens);
    }
  }, [data, updateTokens]);

  return {
    deleteToken,
    isDeletingToken: is_loading,
    errorDeletingToken: error,
    updateTokens,
    data,
  };
};

export default useDeleteToken;
