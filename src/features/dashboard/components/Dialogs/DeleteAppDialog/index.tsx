import React, { useMemo, useCallback } from 'react';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';
import { useDeleteApp } from '../../../hooks/useDeleteApp';
import { translate } from '@docusaurus/Translate';

type TDeleteAppDialogProps = {
  appId: number;
  onClose: () => void;
};

const DeleteAppDialog = ({ appId, onClose }: TDeleteAppDialogProps) => {
  const { deleteApp } = useDeleteApp();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  const actionButtons: TModalActionButton[] = useMemo(
    () => [
      {
        id: 0,
        text: translate({ message: 'Yes, delete' }),
        color: 'primary',
        onClick: () => {
          deleteApp(appId);
          onClose();
        },
      },
      {
        id: 1,
        text: translate({ message: 'Cancel' }),
        color: 'secondary',
        onClick: () => {
          onClose();
        },
      },
    ],
    [appId, deleteApp, onClose],
  );

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.DialogContent
            title={translate({ message: 'Delete app' })}
            content={translate({ message: 'Are you sure you want to delete this app?' })}
            action_buttons={actionButtons}
            has_close_button
          />
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default DeleteAppDialog;
