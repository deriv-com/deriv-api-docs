import React from 'react';
import { formatDate } from '@site/src/utils';
import styles from './cells.module.scss';
import { translate } from '@docusaurus/Translate';

type TApiLastUsedCellProps = {
  cell: {
    value: string;
  };
};

const ApiLastUsedCell: React.FC<TApiLastUsedCellProps> = ({ cell }) => (
  <div className={styles.lastused_cell} data-testid={'lastused-cell'}>
    <div>{cell.value ? formatDate(cell.value) : translate({ message: 'Never' })}</div>
  </div>
);

export default ApiLastUsedCell;
