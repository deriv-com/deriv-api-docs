import React, { act } from 'react';
import useAuthContext from '../../useAuthContext';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import useAccountSelector from '..';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { renderHook } from '@testing-library/react';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const fakeLoginAccounts = [
  {
    name: 'myDemoAccount',
    token: 'demo_token',
    currency: 'USD',
  },
];

const mockUpdateCurrentLoginAccount = jest.fn();

mockUseAuthContext.mockImplementation(() => ({
  loginAccounts: fakeLoginAccounts,
  updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
}));

describe('useAccountSelector', () => {
  it('should be able to switch to an account', () => {
    const { result } = renderHook(() => useAccountSelector(), { wrapper });

    act(() => {
      result.current.onSelectAccount('myDemoAccount');
    });

    const expected_account = {
      name: 'myDemoAccount',
      token: 'demo_token',
      currency: 'USD',
    };

    expect(mockUpdateCurrentLoginAccount).toBeCalledTimes(1);
    expect(mockUpdateCurrentLoginAccount).toBeCalledWith(expected_account);
  });
});
