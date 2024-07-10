import { render, screen, cleanup, within, fireEvent } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Table from '..';
import useDeleteToken from '../../../hooks/useDeleteToken';
import { TTokenColumn } from '../../ApiTokenTable';
import ApiLastUsedCell from '../../ApiTokenTable/table.lastused.cell';
import ApiTokenCell from '../../ApiTokenTable/table.token.cell';
import ScopesCell from '../scopes.cell';
import TokenActionsCell from '../../ApiTokenTable/delete.token.cell';

jest.mock('../../../hooks/useDeleteToken');

const mockUseDeleteToken = useDeleteToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeleteToken>>
>;

const mockDeleteToken = jest.fn();

mockUseDeleteToken.mockImplementation(() => ({
  deleteToken: mockDeleteToken,
}));

const tableColumns: TTokenColumn[] = [
  {
    Header: 'Name',
    accessor: 'display_name',
  },
  {
    Header: 'Token',
    accessor: 'token',
    Cell: ApiTokenCell,
  },
  {
    Header: 'Scopes',
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: 'Last Used',
    accessor: 'last_used',
    Cell: ApiLastUsedCell,
  },
  {
    Header: 'Valid for IP',
    accessor: 'valid_for_ip',
  },
  {
    Header: 'Actions',
    Cell: TokenActionsCell,
  },
];

const tokens: TTokensArrayType = [
  {
    display_name: '111111',
    last_used: '2022-02-04 10:33:51',
    scopes: ['read', 'trade'],
    token: 'token_1',
    valid_for_ip: '',
  },
  {
    display_name: 'michio_app_pages',
    last_used: '2022-10-04 10:33:51',
    scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
    token: 'token_2',
    valid_for_ip: '',
  },
];

describe('Table', () => {
  beforeEach(() => {
    render(
      <Table
        columns={tableColumns}
        data={tokens}
        initialState={{ hiddenColumns: ['valid_for_ip'] }}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render token cells properly', () => {
    const tokenCells = screen.getAllByTestId('token-cell');
    expect(tokenCells.length).toBe(2);

    const tokenCellsTextContent = tokenCells.map((item) => item.textContent);
    expect(tokenCellsTextContent).toEqual(expect.arrayContaining(['token_1', 'token_2']));
  });

  it('Should render scope cells properly', () => {
    const scopeCells = screen.getAllByTestId('token-cell');
    expect(scopeCells.length).toBe(2);
  });

  it('Should render last used cells properly', () => {
    const lastusedCells = screen.getAllByTestId('lastused-cell');

    expect(lastusedCells.length).toBe(2);

    const lastusedCellsContent = lastusedCells.map((item) => item.firstChild.textContent);

    expect(lastusedCellsContent).toEqual(['2022-02-04', '2022-10-04']);
  });

  it('Should render Never when lastused time is empty', () => {
    cleanup();

    const tokens: TTokensArrayType = [
      {
        display_name: '111111',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
    ];
    render(
      <Table
        columns={tableColumns}
        data={tokens}
        initialState={{ hiddenColumns: ['valid_for_ip'] }}
      />,
    );
    const lastusedCells = screen.getAllByTestId('lastused-cell');

    expect(lastusedCells.length).toBe(1);

    const lastusedCellsContent = lastusedCells.map((item) => item.firstChild.textContent);

    expect(lastusedCellsContent).toEqual(['Never']);
  });

  it('Should delete token on delete button clicked', async () => {
    const actionCells = await screen.findAllByTestId('token-action-cell');
    const firstActionCell = actionCells[0];
    const withinActionCell = within(firstActionCell);

    const openDeleteDialogButton = withinActionCell.getByTestId('delete-token-button');
    await userEvent.click(openDeleteDialogButton);
  });
});
