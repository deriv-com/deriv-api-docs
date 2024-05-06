import React, { useState } from 'react';
import styles from './cells.module.scss';
import { LabelPairedPenSmRegularIcon, LabelPairedTrashSmRegularIcon } from '@deriv/quill-icons';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import UpdateAppDialog from '../Dialogs/UpdateAppDialog';
import CustomTooltip from '@site/src/components/CustomTooltip';

const AppActionsCell = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleUpdateClick = () => {
    setUpdateDialogOpen(true);
  };

  return (
    <div className={styles.appActions} data-testid={'app-action-cell'}>
      <div onClick={handleUpdateClick} data-testid={'update-app-button'}>
        <CustomTooltip text='Edit application details'>
          <LabelPairedPenSmRegularIcon />
        </CustomTooltip>
      </div>
      <div onClick={handleDeleteClick} data-testid={'delete-app-button'}>
        <CustomTooltip text='Delete application details'>
          <LabelPairedTrashSmRegularIcon />
        </CustomTooltip>
      </div>
      {isDeleteDialogOpen && (
        <DeleteAppDialog onClose={() => setDeleteDialogOpen(false)} appId={0} />
      )}
      {isUpdateDialogOpen && (
        <UpdateAppDialog onClose={() => setUpdateDialogOpen(false)} app={undefined} />
      )}
    </div>
  );
};

export default AppActionsCell;
