import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { Modal, Heading, Text } from '@deriv-com/quill-ui';
import { StandaloneTrashRegularIcon } from '@deriv/quill-icons';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { useDeleteApp } from '../../../hooks/useDeleteApp';
import useDisableScroll from '../../../hooks/useDisableScroll';
import './delete-app-dialog.scss';

type TDeleteAppDialogProps = {
  appId: number;
  onClose: () => void;
};

const DeleteAppDialog = ({ appId, onClose }: TDeleteAppDialogProps) => {
  const { deleteApp } = useDeleteApp();
  const { deviceType } = useDeviceType();

  useDisableScroll(true);

  return (
    <Modal
      isOpened
      toggleModal={onClose}
      primaryButtonLabel={translate({ message: 'Yes, delete' })}
      secondaryButtonLabel={translate({ message: 'Cancel' })}
      disableCloseOnOverlay
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      primaryButtonCallback={() => {
        deleteApp(appId);
        onClose();
      }}
      secondaryButtonCallback={onClose}
      showSecondaryButton
      showCrossIcon={false}
    >
      <div className='modal__icon' style={{ background: 'var(--core-color-solid-red-100)' }}>
        <StandaloneTrashRegularIcon fill='#C40000' iconSize='2xl' />
      </div>
      <div className='modal__content'>
        <Heading.H4>
          <Translate>Delete app</Translate>
        </Heading.H4>
        <Text>
          <Translate>Are you sure you want to delete this app?</Translate>
        </Text>
      </div>
    </Modal>
  );
};

export default DeleteAppDialog;
