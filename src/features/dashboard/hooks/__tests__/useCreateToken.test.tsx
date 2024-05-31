import AuthProvider from '@site/src/contexts/auth/auth.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act } from '@testing-library/react-hooks';
import { WS } from 'jest-websocket-mock';
import React from 'react';
import useCreateToken from '../useCreateToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import ApiTokenProvider from '@site/src/contexts/api-token/api-token.provider';
import { TTokensArrayType } from '@site/src/types';
import useApiToken from '@site/src/hooks/useApiToken';

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
}));

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

let tokens: TTokensArrayType = [];

const mockUpdateTokens = jest.fn().mockImplementation((updatedTokens) => {
  tokens = updatedTokens;
});

const mockSetLastTokenDisplayName = jest.fn();

mockUseApiToken.mockImplementation(() => ({
  tokens,
  updateTokens: mockUpdateTokens,
  setLastTokenDisplayName: mockSetLastTokenDisplayName,
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

  it('Should create token', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCreateToken(), { wrapper });

    // since ApiProvider is getting the tokens on render we have to skip this message for server like so:
    await wsServer.nextMessage;

    act(() => {
      result.current.createToken('test', ['read', 'trade']);
    });

    await expect(wsServer).toReceiveMessage({
      api_token: 1,
      new_token: 'test',
      new_token_scopes: ['read', 'trade'],
      req_id: 2,
    });

    wsServer.send({
      api_token: {
        new_token: 1,
        tokens: [
          {
            display_name: 'test',
            last_used: '',
            scopes: ['read', 'trade'],
            token: 'test',
            valid_for_ip: '',
          },
        ],
        setlastTokenDisplayName: '',
      },
      echo_req: {
        api_token: 1,
        new_token: 'test',
        new_token_scopes: ['read', 'trade'],
        req_id: 2,
      },
      msg_type: 'api_token',
      req_id: 2,
    });

    await waitForNextUpdate();

    expect(mockSetLastTokenDisplayName).toHaveBeenCalledWith('test');
    expect(mockUpdateTokens).toHaveBeenCalledTimes(1);
    expect(mockUpdateTokens).toHaveBeenCalledWith([
      {
        display_name: 'test',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'test',
        valid_for_ip: '',
      },
    ]);
    expect(tokens.length).toBe(1);
    expect(tokens).toEqual(
      expect.arrayContaining([
        {
          display_name: 'test',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'test',
          valid_for_ip: '',
        },
      ]),
    );
  });
});
