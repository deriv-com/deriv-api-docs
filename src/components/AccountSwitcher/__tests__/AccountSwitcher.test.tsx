import React, { act } from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import AccountSwitcher from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import useLogout from '@site/src/hooks/useLogout';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@site/src/hooks/useLogout');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const mockLogout = jest.fn();
const mockUpdateLoginAccounts = jest.fn();
const mockUpdateCurrentLoginAccount = jest.fn();

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

mockUseLogout.mockImplementation(() => {
  return {
    logout: mockLogout,
  };
});

describe('HeroHeader', () => {
  beforeEach(() => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateLoginAccounts: mockUpdateLoginAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
      };
    });
    render(
      <AuthProvider>
        <AccountSwitcher />
      </AuthProvider>,
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it.skip('Should render current account ', () => {
    const current_account_button = screen.getByRole('button', { name: /CR111111/i });

    expect(current_account_button).toBeInTheDocument();
  });

  it.skip('Should call do logout on logout button click', async () => {
    const current_account_button = await screen.findByRole('button', { name: /CR111111/i });

    await act(async () => {
      await userEvent.click(current_account_button);
    });

    const logout_button = await screen.findByRole('button', { name: /log out/i });

    await act(async () => {
      await userEvent.click(logout_button);
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it.skip('should be able to close the dropdown by clicking on the arrow', async () => {
    const current_account_button = await screen.findByRole('button', { name: /CR111111/i });

    await act(async () => {
      await userEvent.click(current_account_button);
    });

    const close_dropdown_button = await screen.findByTestId('dt_close_dropdown_arrow');

    await act(async () => {
      await userEvent.click(close_dropdown_button);
    });

    expect(close_dropdown_button).not.toBeVisible();
  });

  it.skip('Should render Accounts when no account is selected', () => {
    cleanup();
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: '',
          name: '',
          token: '',
        },
        is_logged_in: false,
        updateLoginAccounts: mockUpdateLoginAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
      };
    });
    render(
      <AuthProvider>
        <AccountSwitcher />
      </AuthProvider>,
    );

    const accounts_button = screen.getByRole('button', { name: /accounts/i });
    expect(accounts_button).toBeInTheDocument();
  });

  it.skip('Should render the dropdown menu on current account button click', async () => {
    const current_account_button = screen.getByRole('button', { name: /USD/i });

    await act(async () => {
      await userEvent.click(current_account_button);
    });

    const menu_items = screen.getAllByRole('menuitem');

    expect(menu_items.length).toBe(1);
  });

  it.skip('Should update current account on menu item click', async () => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateLoginAccounts: mockUpdateLoginAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
      };
    });

    const current_account_button = screen.getByRole('button', { name: /CR111111/i });

    await act(async () => {
      await userEvent.click(current_account_button);
    });

    const first_menu_item = screen.getByText(/CR2222222/i);
    await act(async () => {
      await userEvent.click(first_menu_item);
    });

    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledTimes(1);

    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledWith({
      currency: 'ETH',
      name: 'CR2222222',
      token: 'second_token',
    });
  });
});
