import React, { useCallback, useEffect, useContext } from 'react';
import { TTokenType } from '@site/src/types';
import { Modal } from '@deriv-com/quill-ui';
import useDeleteToken from '../../../hooks/useDeleteToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import './delete-token-dialog.scss';
import { ApiTokenContext } from '@site/src/contexts/api-token/api-token.context';

type TDeleteTokenDialogProps = {
  token: TTokenType;
  onClose: () => void;
};

const DeleteTokenDialog = ({ token, onClose }: TDeleteTokenDialogProps) => {
  const { deleteToken, data } = useDeleteToken();
  const { deviceType } = useDeviceType();
  const { updateTokens } = useContext(ApiTokenContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDelete = useCallback(() => {
    deleteToken(token.token);
    updateTokens(data.tokens);
    onClose();
  }, [onClose, updateTokens, token, deleteToken, data]);

  return (
    <Modal
      isOpened={true}
      toggleModal={onClose}
      primaryButtonLabel='Yes, delete'
      secondaryButtonLabel='Cancel'
      disableCloseOnOverlay
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      primaryButtonCallback={handleDelete}
      secondaryButtonCallback={onClose}
      showSecondaryButton
    >
      <div className='deleteicon'>
        <img src='img/trash.svg' alt='Trash Icon' />
      </div>
      <div className='delete-content'>
        <h4>Delete token</h4>
        <p>Are you sure you want to delete this token?</p>
      </div>
    </Modal>
  );
};

export default DeleteTokenDialog;
