import React from 'react';
import { LabelPairedPenMdRegularIcon, LabelPairedTrashMdRegularIcon } from '@deriv/quill-icons';
import CustomTooltip from '@site/src/components/CustomTooltip';
import clsx from 'clsx';
import styles from './cells.module.scss';
import { translate } from '@docusaurus/Translate';

type TAppActionsCellProps = {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
  flex_end?: boolean;
};

const AppActionsCell = ({
  openDeleteDialog,
  openEditDialog,
  flex_end = false,
}: TAppActionsCellProps) => {
  return (
    <div
      className={clsx(styles.appActions, { [styles.flex_end]: flex_end })}
      data-testid='app-action-cell'
    >
      <span onClick={openEditDialog} data-testid='update-app-button'>
        <CustomTooltip text={translate({ message: 'Edit application details' })}>
          <LabelPairedPenMdRegularIcon />
        </CustomTooltip>
      </span>

      <span onClick={openDeleteDialog} data-testid='delete-app-button'>
        <CustomTooltip text={translate({ message: 'Delete application' })}>
          <LabelPairedTrashMdRegularIcon />
        </CustomTooltip>
      </span>
    </div>
  );
};

export default AppActionsCell;
