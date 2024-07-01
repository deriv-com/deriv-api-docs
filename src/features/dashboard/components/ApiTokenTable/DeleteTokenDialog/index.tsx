import React, { useMemo, useCallback } from 'react';
import { Modal } from '@deriv/ui';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { translate } from '@docusaurus/Translate';

type TDeleteTokendialog = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
};

const DeleteTokenDialog = ({ onDelete, setToggleModal }: TDeleteTokendialog) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setToggleModal(false);
      }
    },
    [setToggleModal],
  );

  const actionButtons: TModalActionButton[] = useMemo(
    () => [
      {
        id: 0,
        text: translate({ message: 'Cancel' }),
        color: 'secondary',
        onClick: () => {
          setToggleModal(false);
        },
      },
      {
        id: 1,
        text: translate({ message: 'Yes, delete' }),
        color: 'primary',
        onClick: () => {
          onDelete();
        },
      },
    ],
    [setToggleModal],
  );

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.DialogContent
            title={translate({ message: 'Delete token' })}
            content={translate({ message: 'Are you sure you want to delete this token?' })}
            action_buttons={actionButtons}
            has_close_button
          />
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default DeleteTokenDialog;
