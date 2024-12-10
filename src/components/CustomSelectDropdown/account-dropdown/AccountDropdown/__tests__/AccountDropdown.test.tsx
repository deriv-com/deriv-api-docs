import React from 'react';
import AccountDropdown from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import userEvent from '@testing-library/user-event';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import { render } from '@testing-library/react';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');

const fake_accounts: IUserLoginAccount[] = [
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

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

const mockUpdateCurrentLoginAccount = jest.fn();

mockUseAuthContext.mockImplementation(() => ({
  updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
  loginAccounts: fake_accounts,
  currentLoginAccount: {
    currency: 'USD',
    name: 'CR111111',
    token: 'first_token',
  },
}));

describe('AccountDropdown', () => {
  it('should be able to select an account when pressing Enter', async () => {
    render(
      <AuthProvider>
        <AccountDropdown />
      </AuthProvider>,
    );
    await userEvent.keyboard('{Tab}{Enter}');

    expect(mockUpdateCurrentLoginAccount).toBeCalledTimes(1);
    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledWith({
      currency: 'ETH',
      name: 'CR2222222',
      token: 'second_token',
    });
  });
});
