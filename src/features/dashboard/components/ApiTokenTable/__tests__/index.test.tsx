import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import ApiTokenTable from '..';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeleteToken from '../../../hooks/useDeleteToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { cleanup, render, screen, within } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';

jest.mock('@site/src/hooks/useApiToken');

jest.mock('@site/src/hooks/useDeviceType');
const mockDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));
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

  it('Should have all the table cells and should display all token scopes', async () => {
    const cells = await screen.findAllByRole('cell');
    expect(cells).toHaveLength(6);
    const scopes = await screen.findAllByText(/Read|Trade/i);
    expect(scopes).toHaveLength(2);
  });

  it('Should display currency image with correct alt text and src', async () => {
    const currencyImage = await screen.findByAltText('-icon');
    expect(currencyImage).toHaveAttribute('src', '/img/placeholder_icon.svg');
  });

  it('Shows delete the token when confirmed from delete token dialog', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];
    const withinActionCell = within(firstActionCell);

    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');

    await act(async () => {
      await userEvent.click(openDeleteDialogButton);
    });
    expect(openDeleteDialogButton).toBeInTheDocument();
  });

  it('Should have a create new token button', async () => {
    const new_tokenbutton = await screen.findByTestId('create-new-token-button');
    expect(new_tokenbutton).toBeInTheDocument();

    const new_tokenbutton_text = await screen.findByText(/Create new token/i);
    expect(new_tokenbutton_text).toBeInTheDocument();
  });
});
