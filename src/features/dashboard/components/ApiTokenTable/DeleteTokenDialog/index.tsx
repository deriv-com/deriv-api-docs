import React, { useCallback, useContext, useState } from 'react';
import { TTokenType } from '@site/src/types';
import { Modal } from '@deriv-com/quill-ui';
import { StandaloneTrashRegularIcon } from '@deriv/quill-icons';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { ApiTokenContext } from '@site/src/contexts/api-token/api-token.context';
import useDisableScroll from '../../../hooks/useDisableScroll';
import useDeleteToken from '../../../hooks/useDeleteToken';

import './delete-token-dialog.scss';

type TDeleteTokenDialogProps = {
  token: TTokenType;
  onClose: () => void;
};

const DeleteTokenDialog = ({ token, onClose }: TDeleteTokenDialogProps) => {
  const { deleteToken } = useDeleteToken();
  const { deviceType } = useDeviceType();
  const { tokens, updateTokens } = useContext(ApiTokenContext);
  const [isDeleteOpen, setIsDeleteOpen] = useState(true);

  const onOpenChange = useCallback(
    (open) => {
      setIsDeleteOpen(open);
      if (!open) {
        onClose();
      }
    },
    [onClose, setIsDeleteOpen],
  );

  useDisableScroll(isDeleteOpen);

  const handleDelete = useCallback(() => {
    deleteToken(token.token);
    updateTokens(tokens.filter((t) => t.token !== token.token));
    onClose();
  }, [onClose, updateTokens, token, deleteToken, tokens]);

  return (
    <Modal
      isOpened={isDeleteOpen}
      toggleModal={onOpenChange}
      primaryButtonLabel='Yes, delete'
      secondaryButtonLabel='Cancel'
      disableCloseOnOverlay
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      primaryButtonCallback={handleDelete}
      secondaryButtonCallback={onClose}
      showSecondaryButton
      data-testid='delete-token-dialog'
    >
      <div className='deleteicon'>
        <StandaloneTrashRegularIcon fill='#C40000' iconSize='2xl' />
      </div>
      <div className='delete-content'>
        <h4>Delete token</h4>
        <p>Are you sure you want to delete this token?</p>
      </div>
    </Modal>
  );
};

export default DeleteTokenDialog;
