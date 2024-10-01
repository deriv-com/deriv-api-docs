import { SkeletonText } from '@site/src/components/SkeletonText';
import React, { HTMLAttributes } from 'react';

interface ISkeletonRow {
  columnCount: number;
}

const SkeletonRow = ({ columnCount }: ISkeletonRow) => (
  <tr data-testid='loading-skeleton-row'>
    {[...Array(columnCount)].map((_, i) => (
      <td data-testid={'loading-table-column'} key={i}>
        <SkeletonText />
      </td>
    ))}
  </tr>
);

interface ILoadingTableProps extends HTMLAttributes<HTMLTableElement> {
  rowCount: number;
  columnCount?: number;
}

const LoadingTable = ({ rowCount, columnCount = 5 }: ILoadingTableProps) => {
  return (
    <table>
      <tbody>
        {[...Array(rowCount)].map((_, i) => (
          <SkeletonRow columnCount={columnCount} key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default LoadingTable;
