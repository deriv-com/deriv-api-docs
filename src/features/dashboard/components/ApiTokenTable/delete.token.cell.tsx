import React, { useState } from 'react';
import { LabelPairedTrashMdRegularIcon } from '@deriv/quill-icons';
import CustomTooltip from '@site/src/components/CustomTooltip';
import clsx from 'clsx';
import styles from './cells.module.scss';
import DeleteTokenDialog from './DeleteTokenDialog';

type TAppActionsCellProps = {
  openDeleteDialog: () => void;
  flex_end?: boolean;
};

const TokenActionsCell = ({ openDeleteDialog, flex_end = false }: TAppActionsCellProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    openDeleteDialog();
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div
        className={clsx(styles.appActions, { [styles.flex_end]: flex_end })}
        data-testid={'token-action-cell'}
      >
        <span onClick={handleDeleteButtonClick} data-testid={'delete-token-button'}>
          <CustomTooltip text='Delete token'>
            <LabelPairedTrashMdRegularIcon />
          </CustomTooltip>
        </span>
      </div>
      {isDeleteDialogOpen && (
        <DeleteTokenDialog
          onDelete={() => {
            setIsDeleteDialogOpen(false);
          }}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default TokenActionsCell;
