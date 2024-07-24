import useWS from '@site/src/hooks/useWs';
import { useCallback, useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useApiToken from '@site/src/hooks/useApiToken';
import { TTokenType } from '@site/src/types';

const useCreateToken = () => {
  const { send, data, is_loading, error } = useWS('api_token');
  const { is_authorized } = useAuthContext();
  const { updateTokens, setLastTokenDisplayName } = useApiToken();

  const createToken = useCallback(
    (tokenName: string, scopes: TTokenType['scopes']) => {
      if (is_authorized) {
        send({ new_token: tokenName, new_token_scopes: scopes });
        setLastTokenDisplayName(tokenName);
      }
    },
    [is_authorized, send, setLastTokenDisplayName],
  );

  useEffect(() => {
    if (data) {
      updateTokens(data.tokens);
    }
  }, [data, updateTokens]);

  return {
    createToken,
    isCreatingToken: is_loading,
    errorCreatingToken: error,
  };
};

export default useCreateToken;
