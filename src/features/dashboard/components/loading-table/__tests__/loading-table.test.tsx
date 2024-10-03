import { render, screen, cleanup, within } from '@site/src/test-utils';
import React from 'react';
import LoadingTable from '..';

describe('Loading Table', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render correct count of rows with 3 as rowCount prop', () => {
    render(<LoadingTable rowCount={3} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(3);
  });

  it('Should render correct amount of columns', () => {
    render(<LoadingTable rowCount={3} columnCount={4} />);

    const rows = screen.getAllByRole('row');

    const withinFirstRow = within(rows[0]);

    const columnsInFirstRow = withinFirstRow.getAllByTestId('loading-table-column');

    expect(columnsInFirstRow).toHaveLength(4);
  });
});
