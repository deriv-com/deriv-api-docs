import React, { useState } from 'react';
import styles from './cells.module.scss';
import { LabelPairedTrashSmRegularIcon } from '@deriv/quill-icons';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import CustomTooltip from '@site/src/components/CustomTooltip';

const AppActionsCell = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <div className={styles.appActions} data-testid={'app-action-cell'}>
      <div onClick={handleDeleteClick} data-testid={'delete-app-button'}>
        <CustomTooltip text='Delete application details'>
          <LabelPairedTrashSmRegularIcon />
        </CustomTooltip>
      </div>
      {isDeleteDialogOpen && (
        <DeleteAppDialog onClose={() => setDeleteDialogOpen(false)} appId={0} />
      )}
    </div>
  );
};

export default AppActionsCell;
