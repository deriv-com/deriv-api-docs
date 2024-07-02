import React, { useState } from 'react';
import { TTokenType } from '@site/src/types';
import { formatDate } from '@site/src/utils';
import type { CellProps } from 'react-table';
import styles from './cells.module.scss';

const ApiLastUsedCell = ({ value }: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  return (
    <div className={styles.lastused_cell} data-testid={'lastused-cell'}>
      <div>{value ? formatDate(value) : 'Never'}</div>
      <div></div>
    </div>
  );
};

export default ApiLastUsedCell;
