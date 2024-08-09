import userEvent from '@testing-library/user-event';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import React from 'react';
import UserNavbarItem from '..';
import { cleanup, render, screen, waitFor } from '@site/src/test-utils';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@site/src/hooks/useLogout');
jest.mock('@site/src/hooks/useLoginUrl');

const mockLogout = jest.fn();
const mockUpdateAccounts = jest.fn();
const mockUpdateCurrentAccount = jest.fn();
const mockGetUrl = jest.fn().mockReturnValue('https://www.example.com');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;
const mockUseLoginUrl = useLoginUrl as jest.MockedFunction<typeof useLoginUrl>;

mockUseLogout.mockImplementation(() => {
  return {
    logout: mockLogout,
  };
});

mockUseLoginUrl.mockImplementation(() => {
  return {
    getUrl: mockGetUrl,
  };
});

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

describe('Given device type is desktop', () => {
  mockUseAuthContext.mockImplementation(() => {
    return {
      loginAccounts: fake_accounts,
      currentLoginAccount: {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      is_logged_in: true,
      updateLoginAccounts: mockUpdateAccounts,
      updateCurrentLoginAccount: mockUpdateCurrentAccount,
    };
  });
  beforeEach(() => {
    render(<UserNavbarItem mobile={false} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it.skip('Should render User Navbar Desktop item', () => {
    const current_account = screen.getByRole<HTMLButtonElement>('button', {
      name: /CR111111/i,
    });
    expect(current_account).toBeInTheDocument();
  });

  it.skip('Should close the account dropdown when clicking outside of it', async () => {
    const current_account_button = screen.getByRole('button', { name: /CR111111/i });
    userEvent.click(current_account_button);

    const alternative_account = await screen.findByText(/CR2222222/i);
    expect(alternative_account).toBeVisible();

    userEvent.click(document.body);
    await waitFor(() => expect(alternative_account).not.toBeVisible());
  });
});
