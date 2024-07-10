import React, { useCallback, useContext, useEffect } from 'react';
import { TTokenType } from '@site/src/types';
import { Modal } from '@deriv-com/quill-ui';
import useDeleteToken from '../../../hooks/useDeleteToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { ApiTokenContext } from '@site/src/contexts/api-token/api-token.context';
import './delete-token-dialog.scss';

type TDeleteTokenDialogProps = {
  token: TTokenType;
  onClose: () => void;
};

const DeleteTokenDialog = ({ token, onClose }: TDeleteTokenDialogProps) => {
  const { deleteToken } = useDeleteToken();
  const { deviceType } = useDeviceType();
  const { tokens, updateTokens } = useContext(ApiTokenContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDelete = useCallback(() => {
    deleteToken(token.token);
    const newTokens = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].token !== token.token) {
        newTokens.push(tokens[i]);
      }
    }
    updateTokens(newTokens);
    onClose();
  }, [deleteToken, token, tokens, updateTokens, onClose]);

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
