import React from 'react';
import { TTokenType } from '@site/src/types';
import { CellProps } from 'react-table';
import styles from './token-cell.module.scss';

const ApiTokenCell = ({ cell }: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  return (
    <div data-testid={'token-cell'} className={styles.token_cell}>
      <div>{cell.value}</div>
    </div>
  );
};

export default ApiTokenCell;
