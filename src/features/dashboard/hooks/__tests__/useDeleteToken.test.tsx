import AuthProvider from '@site/src/contexts/auth/auth.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useDeleteToken from '../useDeleteToken';
import ApiTokenProvider from '@site/src/contexts/api-token/api-token.provider';
import useApiToken from '@site/src/hooks/useApiToken';
import { TTokensArrayType } from '@site/src/types';

const connection = makeMockSocket();

const wrapper = ({ children }) => (
  <AuthProvider>
    <ApiTokenProvider>{children}</ApiTokenProvider>
  </AuthProvider>
);

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
  siteActive: true,
}));

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

let tokens: TTokensArrayType = [
  {
    display_name: 'test',
    last_used: '',
    scopes: ['read', 'trade'],
    token: 'test',
    valid_for_ip: '',
  },
];

const mockUpdateTokens = jest.fn().mockImplementation((updatedTokens) => {
  tokens = updatedTokens;
});

mockUseApiToken.mockImplementation(() => ({
  tokens,
  updateTokens: mockUpdateTokens,
}));

describe('Use Create Token', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
  });

  afterEach(() => {
    connection.tearDown();
    cleanup();
  });

  it('Should delete token token', async () => {
    const { result } = renderHook(() => useDeleteToken(), { wrapper });

    // since ApiProvider is getting the tokens on render we have to skip this message for server like so:
    await wsServer.nextMessage;
    await wsServer.nextMessage;

    act(() => {
      result.current.deleteToken('test');
    });

    await expect(wsServer).toReceiveMessage({
      api_token: 1,
      delete_token: 'test',
      req_id: 3,
    });

    wsServer.send({
      api_token: {
        delete_token: 1,
        tokens: [],
      },
      echo_req: { api_token: 1, delete_token: 'test', req_id: 2 },
      msg_type: 'api_token',
      req_id: 3,
    });

    await waitFor(() => {
      expect(mockUpdateTokens).toHaveBeenCalledTimes(1);
    });
  });
});
