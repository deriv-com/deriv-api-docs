import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import ApiTokenTable from '..';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeleteToken from '../../../hooks/useDeleteToken';
import { cleanup, render, screen } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;
jest.mock('../../../hooks/useDeleteToken');
const mockUseDeleteToken = useDeleteToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeleteToken>>
>;
const mockDeleteToken = jest.fn();
mockUseDeleteToken.mockImplementation(() => ({
  deleteToken: mockDeleteToken,
}));

describe('Api Token Table', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render loading when isLoadingTokens is truthy ', async () => {
    mockUseApiToken.mockImplementationOnce(() => ({
      tokens: [],
      isLoadingTokens: true,
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('dt_spinner');
    expect(loadingElement).toBeVisible();
  });
});

describe('DeleteTokenDialog', () => {
  const fakeTokens: TTokensArrayType = [
    {
      display_name: 'This is my first token',
      last_used: '',
      scopes: ['read', 'trade'],
      token: 'first_token',
      valid_for_ip: '',
    },
  ];

  beforeEach(() => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      isLoadingTokens: true,
    }));
    render(<ApiTokenTable />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render table token items', async () => {
    const token_row = await screen.findByText(/This is my first token/i);
    expect(token_row).toBeInTheDocument();
  });

  it('Should have the table headers and the header description', async () => {
    const header_text = await screen.findByText(/API token manager/i);
    expect(header_text).toBeInTheDocument();

    const header_descr = await screen.findByText(/Access all your API token details here/i);
    expect(header_descr).toBeInTheDocument();
  });

  it('Shows the dialog when pressing the delete button', async () => {
    const delete_button = await screen.findByTestId('delete-token-button');
    await userEvent.click(delete_button);
    expect(delete_button).toBeInTheDocument();
  });

  it('Should delete the token or cancel and close the modal', async () => {
    const actions_token = await screen.findByTestId('token-action-cell');
    await userEvent.click(actions_token);
    expect(actions_token).toBeInTheDocument();
  });

  it('Should have a create new token button', async () => {
    const new_tokenbutton = await screen.findByTestId('create-new-token-button');
    expect(new_tokenbutton).toBeInTheDocument();

    const new_tokenbutton_text = await screen.findByText(/Create new token/i);
    expect(new_tokenbutton_text).toBeInTheDocument();
  });
});
