import useApiToken from '@site/src/hooks/useApiToken';
import { renderHook, cleanup, act, waitFor } from '@testing-library/react';
import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { WS } from 'jest-websocket-mock';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import ApiTokenProvider from '@site/src/contexts/api-token/api-token.provider';

const connection = makeMockSocket();

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
}));

const wrapper = ({ children }) => (
  <AuthProvider>
    <ApiTokenProvider>{children}</ApiTokenProvider>
  </AuthProvider>
);

describe('Use Api Token', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
  });
  afterEach(async () => {
    connection.tearDown();
    cleanup();
  });

  it('Should have empty array for tokens', () => {
    const { result } = renderHook(() => useApiToken(), { wrapper });
    expect(result.current.tokens.length).toBe(0);
  });

  it('Should NOT get Api Tokens from server when user is NOT authenticated', async () => {
    mockUseAuthContext.mockImplementationOnce(() => ({
      is_authorized: false,
    }));

    const { result } = renderHook(() => useApiToken(), { wrapper });

    expect(result.current.tokens.length).toBe(0);
  });

  it('Should get Api Tokens from server if user is authenticated', async () => {
    const { result } = renderHook(() => useApiToken(), { wrapper });

    await expect(wsServer).toReceiveMessage({ api_token: 1, req_id: 1 }); // client sends request
    wsServer.send({
      // the server sends the response
      api_token: {
        tokens: [
          {
            display_name: '111111',
            last_used: '',
            scopes: ['read', 'trade'],
            token: 'token_1',
            valid_for_ip: '',
          },
          {
            display_name: 'michio_app_pages',
            last_used: '2022-10-04 10:33:51',
            scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
            token: 'token_2',
            valid_for_ip: '',
          },
        ],
      },
      echo_req: { api_token: 1, req_id: 1 },
      msg_type: 'api_token',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.tokens.length).toBe(2);
      expect(result.current.tokens).toEqual(
        expect.arrayContaining([
          {
            display_name: '111111',
            last_used: '',
            scopes: ['read', 'trade'],
            token: 'token_1',
            valid_for_ip: '',
          },
          {
            display_name: 'michio_app_pages',
            last_used: '2022-10-04 10:33:51',
            scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
            token: 'token_2',
            valid_for_ip: '',
          },
        ]),
      );
    });
  });

  it('Should set the current token with the first item in server response', async () => {
    const { result } = renderHook(() => useApiToken(), { wrapper });

    await expect(wsServer).toReceiveMessage({ api_token: 1, req_id: 1 });
    wsServer.send({
      api_token: {
        tokens: [
          {
            display_name: '111111',
            last_used: '',
            scopes: ['read', 'trade'],
            token: 'token_1',
            valid_for_ip: '',
          },
          {
            display_name: 'michio_app_pages',
            last_used: '2022-10-04 10:33:51',
            scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
            token: 'token_2',
            valid_for_ip: '',
          },
        ],
      },
      echo_req: { api_token: 1, req_id: 1 },
      msg_type: 'api_token',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.currentToken).toEqual({
        display_name: '111111',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      });
    });
  });

  it('Should update tokens on updateTokens call', () => {
    const { result } = renderHook(() => useApiToken(), { wrapper });

    act(() => {
      result.current.updateTokens([
        {
          display_name: 'test',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'first_token',
          valid_for_ip: '',
        },
      ]);
    });

    expect(result.current.tokens.length).toBe(1);
    expect(result.current.tokens).toEqual(
      expect.arrayContaining([
        {
          display_name: 'test',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'first_token',
          valid_for_ip: '',
        },
      ]),
    );
  });

  it('Should update current token properly', async () => {
    const { result } = renderHook(() => useApiToken(), { wrapper });

    act(() => {
      result.current.updateCurrentToken({
        display_name: 'test',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'first_token',
        valid_for_ip: '',
      });
    });

    expect(result.current.currentToken).toEqual({
      display_name: 'test',
      last_used: '',
      scopes: ['read', 'trade'],
      token: 'first_token',
      valid_for_ip: '',
    });
  });
});
