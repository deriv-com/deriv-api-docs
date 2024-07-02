import React, { useState } from 'react';
import { LabelPairedTrashMdRegularIcon } from '@deriv/quill-icons';
import CustomTooltip from '@site/src/components/CustomTooltip';
import clsx from 'clsx';
import styles from './cells.module.scss';
import DeleteTokenDialog from './DeleteTokenDialog'; // Import the DeleteTokenDialog component

type TAppActionsCellProps = {
  openDeleteDialog: () => void;
  flex_end?: boolean;
};

const TokenActionsCell = ({ openDeleteDialog, flex_end = false }: TAppActionsCellProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    openDeleteDialog(); // This will open the delete token dialog
    setIsDeleteDialogOpen(true); // Set state to open the dialog
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false); // Close the dialog
  };

  return (
    <>
      <div
        className={clsx(styles.appActions, { [styles.flex_end]: flex_end })}
        data-testid={'app-action-cell'}
      >
        <span onClick={handleDeleteButtonClick} data-testid={'delete-app-button'}>
          <CustomTooltip text='Delete application'>
            <LabelPairedTrashMdRegularIcon />
          </CustomTooltip>
        </span>
      </div>
      {isDeleteDialogOpen && (
        <DeleteTokenDialog
          onDelete={() => {
            // Perform deletion logic here
            console.log('Deleting token...'); // Placeholder for actual deletion logic
            setIsDeleteDialogOpen(false); // Close the dialog after deletion
          }}
          onClose={handleCloseDialog} // Pass the close handler to the dialog
        />
      )}
    </>
  );
};

export default TokenActionsCell;
