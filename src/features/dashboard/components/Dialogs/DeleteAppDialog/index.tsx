import React, { useCallback, useState } from 'react';
import { Modal } from '@deriv-com/quill-ui';
import { useDeleteApp } from '../../../hooks/useDeleteApp';
import useDeviceType from '@site/src/hooks/useDeviceType';
import './delete-app-dialog.scss';
import useDisableScroll from '../../../hooks/useDisableScroll';

type TDeleteAppDialogProps = {
  appId: number;
  onClose: () => void;
};

const DeleteAppDialog = ({ appId, onClose }: TDeleteAppDialogProps) => {
  const { deleteApp } = useDeleteApp();
  const { deviceType } = useDeviceType();
  const [isDeleteOpen, setIsDeleteOpen] = useState(true); // Assuming the dialog opens immediately

  useDisableScroll(isDeleteOpen);

  const onOpenChange = useCallback(
    (open) => {
      setIsDeleteOpen(open);
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Modal
      isOpened={isDeleteOpen}
      toggleModal={onOpenChange}
      primaryButtonLabel='Yes, delete'
      secondaryButtonLabel='Cancel'
      disableCloseOnOverlay
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      primaryButtonCallback={() => {
        deleteApp(appId);
        onClose();
      }}
      secondaryButtonCallback={onClose}
      showSecondaryButton
    >
      <div className='modal__icon' style={{ background: 'var(--core-color-solid-red-100)' }}>
        <img src='img/trash.svg' alt='Trash Icon' />
      </div>
      <div className='modal__content'>
        <h4>Delete app</h4>
        <p>Are you sure you want to delete this app?</p>
      </div>
    </Modal>
  );
};

export default DeleteAppDialog;
