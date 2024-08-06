import React from 'react';
import { CellProps } from 'react-table';
import { TAppColumn } from '.';
import styles from './cells.module.scss';
import Translate from '@docusaurus/Translate';

interface IAppActionsCellProps extends React.PropsWithChildren<CellProps<TAppColumn, string>> {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
}

const AppActionsCell = ({ openDeleteDialog, openEditDialog }: IAppActionsCellProps) => {
  return (
    <div className={styles.appActions} data-testid={'app-action-cell'}>
      <div
        onClick={openEditDialog}
        className={`${styles.updateApp} ${styles.tooltip}`}
        data-testid={'update-app-button'}
      >
        <span className={styles.tooltipText}>
          <Translate>Edit application details</Translate>
        </span>
      </div>
      <div
        onClick={openDeleteDialog}
        className={`${styles.deleteApp} ${styles.tooltip}`}
        data-testid={'delete-app-button'}
      >
        <span className={styles.tooltipText}>
          <Translate>Delete application</Translate>
        </span>
      </div>
    </div>
  );
};

export default AppActionsCell;
