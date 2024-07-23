import { TTokensArrayType, TTokenType } from '@site/src/types';
import React from 'react';
export interface IApiTokenContext {
  tokens: TTokensArrayType;
  updateTokens: (tokens: TTokensArrayType) => void;
  isLoadingTokens: boolean;
  currentToken: TTokenType;
  updateCurrentToken: (token: TTokenType) => void;
  lastTokenDisplayName: string;
  setLastTokenDisplayName: (name: string) => void;
}

export const ApiTokenContext = React.createContext<IApiTokenContext | null>(null);
