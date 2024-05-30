import React, { HTMLAttributes } from 'react';
import { Cell, Column, TableState, useTable } from 'react-table';
import './table.scss';

const defaultPropGetter = () => ({});

interface ITableProps<T extends object> extends HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: Column<T>[];
  initialState?: TableState<T>;
  row_height?: number;
  getCustomCellProps?: (cell: Cell<T, unknown>) => object;
}

const Table = <T extends object>({
  data,
  columns,
  initialState,
  getCustomCellProps = defaultPropGetter,
  row_height,
  ...rest
}: ITableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
    initialState: initialState,
  });

  return (
    <table {...getTableProps()} {...rest}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...rest } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...rest}>
              {headerGroup.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps();
                return (
                  <th key={key} {...rest}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rest } = row.getRowProps();
          return (
            <tr style={{ height: `${row_height}px` }} key={key} {...rest}>
              {row.cells.map((cell) => {
                const { key, ...rest } = cell.getCellProps();
                return (
                  <td key={key} {...rest}>
                    {cell.render('Cell', getCustomCellProps(cell))}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
