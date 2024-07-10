import { render, screen, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ApiTokenTable from '..';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { TTokensArrayType } from '@site/src/types';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeleteToken from '../../../hooks/useDeleteToken';

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

jest.mock('@site/src/hooks/useDeviceType');
const mockDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));

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
  jest.clearAllMocks();
});

describe('Api Token Table', () => {
  const renderApiTokenTable = () => {
    render(<ApiTokenTable />);
  };

  it('Should render all tokens properly', () => {
    renderApiTokenTable();
  });

  it('Should open delete dialog for the token row properly', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');
    await userEvent.click(openDeleteDialogButton);
  });

  it('Should close delete dialog on cancel', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];
    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');
    await userEvent.click(openDeleteDialogButton);
  });

  it('Should close delete dialog when pressing the delete button', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');
    await userEvent.click(openDeleteDialogButton);
  });

  it('Opens modal for delete token', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];
    const withinActionCell = within(firstActionCell);

    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');
    await userEvent.click(openDeleteDialogButton);
  });

  it('Should render responsive view properly', () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderApiTokenTable();
    const accordion = screen.getAllByTestId('dt_accordion_root');
    expect(accordion.length).toBe(1);
  });

  it('Should open first accordion on item click', async () => {
    renderApiTokenTable();
    const item = await screen.findAllByText('This is my first token');
    await userEvent.click(item[0]);
  });

  it('Should update current tab on clicking Create new token button', async () => {
    renderApiTokenTable();
    const createTokenButton = screen.getAllByTestId('create-new-token-button');
    await userEvent.click(createTokenButton[0]);
  });
});
