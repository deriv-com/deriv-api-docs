import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomSelectDropdown from '..';
import AccountDropdown from '../account-dropdown/AccountDropdown';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

const registerMock = jest.fn();

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

jest.mock('@site/src/hooks/useAuthContext');

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

describe('CustomSelectDropdown', () => {
  it('should be able to render the component', () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()}>
        <div>Selected item element</div>
        <div>Dropdown element</div>
      </CustomSelectDropdown>,
    );

    const custom_dropdown = screen.getByTestId('dt_custom_dropdown_test');
    expect(custom_dropdown).toBeInTheDocument();
  });

  it('should be able to render the component with an error message', () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()} is_error>
        <div>Selected item element</div>
        <div>Dropdown element</div>
        <div>Error message</div>
      </CustomSelectDropdown>,
    );

    const error_message = screen.getByText('Error message');
    expect(error_message).toBeVisible();
  });

  it('should be able to show the dropdown when using hotkeys', async () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()}>
        <div>Selected item element</div>
        <div>Dropdown element</div>
      </CustomSelectDropdown>,
    );

    await act(async () => {
      await userEvent.keyboard('{Tab}{ArrowDown}');
    });

    const dropdown_list = screen.getByTestId('dt_custom_dropdown_test');
    expect(dropdown_list.classList.contains('active')).toBe(true);
  });

  it('Opens the dropdown and selects a value', async () => {
    render(
      <AuthProvider>
        <CustomSelectDropdown label='test' value='test' register={registerMock()}>
          <div>Selected item element</div>
          <AccountDropdown />
        </CustomSelectDropdown>
      </AuthProvider>,
    );
    await act(async () => {
      await userEvent.keyboard('{Tab}{ArrowDown}');
    });

    const dropdown_list = screen.getByTestId('dt_custom_dropdown_test');
    expect(dropdown_list.classList.contains('active')).toBe(true);

    await act(async () => {
      await userEvent.keyboard('{Tab}{Enter}');
    });

    expect(mockUpdateCurrentLoginAccount).toBeCalledTimes(1);
    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledWith({
      currency: 'ETH',
      name: 'CR2222222',
      token: 'second_token',
    });
  });
});
