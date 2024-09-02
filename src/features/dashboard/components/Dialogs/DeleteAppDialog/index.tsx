import React, { useCallback, useState } from 'react';
import { Modal, Heading, Text } from '@deriv-com/quill-ui';
import { useDeleteApp } from '../../../hooks/useDeleteApp';
import useDeviceType from '@site/src/hooks/useDeviceType';
import './delete-app-dialog.scss';
import useDisableScroll from '../../../hooks/useDisableScroll';
import { StandaloneTrashRegularIcon } from '@deriv/quill-icons';

type TDeleteAppDialogProps = {
  appId: number;
  onClose: () => void;
};

const DeleteAppDialog = ({ appId, onClose }: TDeleteAppDialogProps) => {
  const { deleteApp } = useDeleteApp();
  const { deviceType } = useDeviceType();
  const [isDeleteOpen, setIsDeleteOpen] = useState(true);

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
        <StandaloneTrashRegularIcon fill='#C40000' iconSize='2xl' />
      </div>
      <div className='modal__content'>
        <Heading.H4>Delete app</Heading.H4>
        <Text>Are you sure you want to delete this app?</Text>
      </div>
    </Modal>
  );
};

export default DeleteAppDialog;
