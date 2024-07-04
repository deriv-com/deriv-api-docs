import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Modal } from '@deriv-com/quill-ui';
import { useDeleteApp } from '../../../hooks/useDeleteApp';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import './delete-app-dialog.scss';

type TDeleteAppDialogProps = {
  appId: number;
  onClose: () => void;
};

const DeleteAppDialog = ({ appId, onClose }: TDeleteAppDialogProps) => {
  const { deleteApp } = useDeleteApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < 720);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Modal
      isOpened={true}
      toggleModal={onOpenChange}
      primaryButtonLabel='Yes, delete'
      secondaryButtonLabel='Cancel'
      disableCloseOnOverlay
      isMobile={isMobile}
      showHandleBar
      primaryButtonCallback={() => {
        deleteApp(appId);
        onClose();
      }}
      secondaryButtonCallback={onClose}
      showSecondaryButton
    >
      <div className='icon-wrapper'>
        <div className='modal-icon'>
          <img src='img/trash.svg' alt='Trash Icon' />
        </div>
      </div>
      <div className='modal-content'>
        <h4>Delete app</h4>
        <p>Are you sure you want to delete this app?</p>
      </div>
    </Modal>
  );
};

export default DeleteAppDialog;
