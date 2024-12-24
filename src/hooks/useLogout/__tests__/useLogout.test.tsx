import { act, renderHook } from '@testing-library/react';
import React from 'react';
import useLogout from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '../../useAuthContext';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import WS from 'jest-websocket-mock';

jest.mock('@site/src/hooks/useAuthContext');

const connection = makeMockSocket();

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const mockUpdateLoginAccounts = jest.fn();
const mockUpdateCurrentLoginAccount = jest.fn();

mockUseAuthContext.mockImplementation(() => ({
  updateLoginAccounts: mockUpdateLoginAccounts,
  updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
  siteActive: true,
}));

jest.mock('@deriv-com/auth-client', () => ({
  OAuth2Logout: jest.fn((WSLogoutAndRedirect) => {
    const mockIframe = document.createElement('iframe');
    mockIframe.id = 'logout-iframe';
    document.body.appendChild(mockIframe);
    setTimeout(() => {
      const event = new MessageEvent('message', { data: 'logout_complete' });
      window.dispatchEvent(event);
    }, 100);
    WSLogoutAndRedirect();
  }),
}));

const logout_response = {
  logout: 1,
  req_id: 2,
};

describe('Login', () => {
  let wsServer: WS;

  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
  });

  it('Should clear context accounts on logout', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });

    await wsServer.nextMessage;

    act(() => {
      result.current.logout();
    });

    await expect(wsServer).toReceiveMessage(logout_response);
    wsServer.send({ logout: 1 });

    expect(mockUpdateLoginAccounts).toBeCalledTimes(1);
  });
});
