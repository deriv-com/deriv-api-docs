import { IAuthContext, IUserLoginAccount } from '@site/src/contexts/auth/auth.context';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import {
  CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
  LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
} from '@site/src/utils/constants';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { act, renderHook, RenderHookResult, cleanup, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import React, { ReactNode } from 'react';
import useAuthContext from '..';

const connection = makeMockSocket();

const authorize_response = {
  authorize: {
    account_list: [
      {
        account_type: 'trading',
        created_at: 1647509550,
        currency: 'USD',
        is_disabled: 0,
        is_virtual: 0,
        landing_company_name: 'svg',
        loginid: 'CR0000000',
        trading: {},
      },
    ],
    balance: 10000,
    country: 'id',
    currency: 'USD',
    email: 'test@jest.com',
    fullname: 'michio uchiha',
    is_virtual: 1,
    landing_company_fullname: 'Test Jest Deriv Limited',
    landing_company_name: 'virtual',
    local_currencies: {
      IDR: {
        fractional_digits: 2,
      },
    },
    loginid: 'VRTC0000000',
    preferred_language: 'EN',
    scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
    trading: {},
    upgradeable_landing_companies: ['svg'],
    user_id: 1234567,
  },
  echo_req: {
    authorize: 'test_token',
    req_id: 1,
  },
  msg_type: 'authorize',
  req_id: 1,
};

const fakeAccounts: IUserLoginAccount[] = [
  {
    name: 'test',
    token: 'test_token',
    currency: 'USD',
  },
  {
    name: 'test2',
    token: 'test_token2',
    currency: 'ETH',
  },
  {
    name: 'VRTC123456',
    token: 'fake_virtual_account_token',
    currency: 'USD',
  },
];

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('Root Context', () => {
  let view: RenderHookResult<{ children: ReactNode }, IAuthContext>;
  let wsServer: WS;

  beforeEach(async () => {
    view = renderHook(() => useAuthContext(), { wrapper });
    wsServer = await connection.setup();
  });

  afterEach(() => {
    cleanup();
    connection.tearDown();
  });

  it('Should have is_logged_in falsy', () => {
    expect(view.result.current.is_logged_in).toBeFalsy();
  });

  it('Should have is_authorized falsy', () => {
    expect(view.result.current.is_authorized).toBeFalsy();
  });

  it('Should have empty array for accounts as initial value', () => {
    expect(view.result.current.loginAccounts.length).toBe(0);
  });

  it('Should have empty values for current account as initial value ', () => {
    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: '',
      token: '',
      currency: '',
    });
  });

  it('Should update accounts in state', async () => {
    const { result } = view;

    act(() => {
      result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(view.result.current.loginAccounts.length).toBe(3);
    expect(view.result.current.loginAccounts).toStrictEqual(fakeAccounts);

    await expect(wsServer).toReceiveMessage({ authorize: 'fake_virtual_account_token', req_id: 1 });

    wsServer.send(authorize_response);

    await waitFor(() => {
      const { account_list, ...user } = authorize_response.authorize;

      expect(result.current.userAccounts).toEqual(account_list);
      expect(result.current.user).toEqual(user);
      expect(result.current.is_authorized).toBeTruthy();
    });
  });

  it('Should update accounts in session storage', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__[LOGIN_ACCOUNTS_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify(fakeAccounts),
    );
  });

  it('Should set the first item in update accounts as current account in state', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });
    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: 'VRTC123456',
      token: 'fake_virtual_account_token',
      currency: 'USD',
    });
  });

  it('Should set the first item in update accounts as current account in session storage', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__[CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify({
        name: 'VRTC123456',
        token: 'fake_virtual_account_token',
        currency: 'USD',
      }),
    );
  });

  it('Should update current account in state', () => {
    const fakeCurrentAccount: IUserLoginAccount = {
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    };
    act(() => {
      view.result.current.updateCurrentLoginAccount(fakeCurrentAccount);
    });

    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    });
  });

  it('Should update current account in session storage', () => {
    const fakeCurrentAccount: IUserLoginAccount[] = [
      {
        name: 'fake_current_account_name',
        token: 'fake_current_account_token',
        currency: 'fake_current_account_currency',
      },
    ];
    act(() => {
      view.result.current.updateLoginAccounts(fakeCurrentAccount);
    });

    expect(sessionStorage.__STORE__[CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify({
        name: 'fake_current_account_name',
        token: 'fake_current_account_token',
        currency: 'fake_current_account_currency',
      }),
    );
  });

  it('Should be considered as logged in when accounts is not empty', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(view.result.current.is_logged_in).toBeTruthy();
  });
});
