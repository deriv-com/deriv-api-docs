import React from 'react';
import userEvent from '@testing-library/user-event';
import AccountDropdown from '..';
import ApiTokenProvider from '@site/src/contexts/api-token/api-token.provider';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { render } from '@testing-library/react';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
}));

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

const mockUpdateCurrentToken = jest.fn();

mockUseApiToken.mockImplementation(() => ({
  currentToken: {
    display_name: 'test_token1',
    token: 'tokenvalue1',
    scopes: ['admin', 'read'],
  },
  tokens: [
    {
      display_name: 'test_token1',
      token: 'tokenvalue1',
      scopes: ['admin', 'read'],
    },
    {
      display_name: 'test_token2',
      token: 'tokenvalue2',
      scopes: ['admin', 'read', 'trade'],
    },
  ],
  updateCurrentToken: mockUpdateCurrentToken,
}));

describe('AccountDropdown', () => {
  it('should be able to select an account when pressing Enter', async () => {
    render(
      <ApiTokenProvider>
        <AccountDropdown />
      </ApiTokenProvider>,
    );
    await userEvent.keyboard('{Tab}{Enter}');

    expect(mockUpdateCurrentToken).toBeCalledTimes(1);
    expect(mockUpdateCurrentToken).toHaveBeenCalledWith({
      display_name: 'test_token2',
      token: 'tokenvalue2',
      scopes: ['admin', 'read', 'trade'],
    });
  });
});
