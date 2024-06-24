import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { TTokensArrayType, TTokenType } from '@site/src/types';
import { ApiTokenContext, IApiTokenContext } from './api-token.context';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
type TTokenProviderProps = {
  children: ReactNode;
};

const ApiTokenProvider = ({ children }: TTokenProviderProps) => {
  const [tokens, setTokens] = useState<TTokensArrayType>([]);
  const [currentToken, setCurrentToken] = useState<TTokenType>();
  const [lastTokenDisplayName, setLastTokenDisplayName] = useState<string>('');

  const { send: getAllTokens, data, is_loading } = useWS('api_token');
  const { is_authorized } = useAuthContext();

  const updateTokens = useCallback((updatedTokens: TTokensArrayType) => {
    setTokens(updatedTokens);
  }, []);

  const updateCurrentToken = useCallback((token: TTokenType) => {
    setCurrentToken(token);
  }, []);

  useEffect(() => {
    if (is_authorized) {
      getAllTokens();
    }
  }, [is_authorized, getAllTokens]);

  useEffect(() => {
    if (data?.tokens?.length) {
      setTokens(data.tokens);
      setCurrentToken(data.tokens[0]);
    } else {
      setTokens([]);
      setCurrentToken(null);
    }
  }, [data]);

  const contextValue: IApiTokenContext = useMemo(() => {
    return {
      tokens,
      isLoadingTokens: is_loading,
      currentToken,
      updateCurrentToken,
      updateTokens,
      lastTokenDisplayName,
      setLastTokenDisplayName,
    };
  }, [
    currentToken,
    is_loading,
    tokens,
    updateCurrentToken,
    updateTokens,
    lastTokenDisplayName,
    setLastTokenDisplayName,
  ]);

  return <ApiTokenContext.Provider value={contextValue}>{children}</ApiTokenContext.Provider>;
};

export default ApiTokenProvider;
