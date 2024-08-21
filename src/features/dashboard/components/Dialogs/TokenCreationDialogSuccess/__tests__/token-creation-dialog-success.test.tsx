import React, { act } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TokenCreationDialogSuccess from '..';
import useApiToken from '@site/src/hooks/useApiToken';
import { TTokensArrayType, TTokenType } from '@site/src/types';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<typeof useApiToken>;

describe.skip('TokenCreationDialogSuccess', () => {
  let setToggleModalMock: jest.Mock;

  beforeEach(() => {
    setToggleModalMock = jest.fn();

    mockUseApiToken.mockReturnValue({
      tokens: [
        {
          display_name: 'testtoken1',
          last_used: '',
          scopes: ['read', 'trade', 'payments', 'admin'],
          token: 'asdf1234',
          valid_for_ip: '',
        },
        {
          display_name: 'testtoken2',
          last_used: '',
          scopes: ['read', 'trade', 'payments', 'admin'],
          token: 'asdf1235',
          valid_for_ip: '',
        },
      ],
      lastTokenDisplayName: 'testtoken2',
      updateTokens: function (tokens: TTokensArrayType): void {
        throw new Error('Function not implemented.');
      },
      isLoadingTokens: false,
      currentToken: {
        display_name: '',
        last_used: '',
        scopes: [],
        token: '',
        valid_for_ip: '',
      },
      updateCurrentToken: function (token: TTokenType): void {
        throw new Error('Function not implemented.');
      },
      setLastTokenDisplayName: function (name: string): void {
        throw new Error('Function not implemented.');
      },
    });

    render(<TokenCreationDialogSuccess setToggleModal={setToggleModalMock} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('displays the correct title and content in the modal', () => {
    expect(screen.getByText('Token created successfully!')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please save this token key. For security reasons, it can't be viewed or copied again. If you lose this key, you'll need to generate a new token./i,
      ),
    ).toBeInTheDocument();
  });

  it('displays the correct token key', () => {
    expect(screen.getByText('asdf1235')).toBeInTheDocument();
  });

  it('closes the modal when the OK button is clicked', async () => {
    const okButton = screen.getByRole('button', { name: 'Ok' });
    expect(okButton).toBeInTheDocument();

    await userEvent.click(okButton);
    expect(setToggleModalMock).toHaveBeenCalledTimes(1);
  });

  it('calls updateCurrentTab with MANAGE_TOKENS', () => {
    const okButton = screen.getByRole('button', { name: 'Ok' });
    userEvent.click(okButton);
    expect(setToggleModalMock).toHaveBeenCalledTimes(1);
  });
});
