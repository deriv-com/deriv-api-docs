import { act, renderHook } from '@testing-library/react';
import React from 'react';
import useAuthParams from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '../../useAuthContext';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const mockUpdateLoginAccounts = jest.fn();

mockUseAuthContext.mockImplementation(() => ({
  updateLoginAccounts: mockUpdateLoginAccounts,
}));

describe('Use Auth Params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should update accounts in the context', () => {
    const { result } = renderHook(() => useAuthParams(), { wrapper });
    const test_search_params =
      '?acct1=CR111111&token1=first_token&cur1=USD&acct2=CR2222222&token2=second_token&cur2=ETH';
    act(() => {
      result.current.checkUrlParams(test_search_params);
    });

    const expected_accounts = [
      {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      {
        currency: 'ETH',
        name: 'CR2222222',
        token: 'second_token',
      },
    ];

    expect(mockUpdateLoginAccounts).toBeCalledTimes(1);
    expect(mockUpdateLoginAccounts).toBeCalledWith(expected_accounts);
  });

  it('Should not update accounts in context with empty string as query params', () => {
    const { result } = renderHook(() => useAuthParams(), { wrapper });
    act(() => {
      result.current.checkUrlParams('');
    });

    expect(mockUpdateLoginAccounts).not.toBeCalled();
  });
});
