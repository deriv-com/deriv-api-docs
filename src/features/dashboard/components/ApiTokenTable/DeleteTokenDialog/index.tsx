import React, { useCallback, useContext } from 'react';
import { TTokenType } from '@site/src/types';
import { Modal } from '@deriv-com/quill-ui';
import { StandaloneTrashRegularIcon } from '@deriv/quill-icons';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { ApiTokenContext } from '@site/src/contexts/api-token/api-token.context';
import useDisableScroll from '../../../hooks/useDisableScroll';
import useDeleteToken from '../../../hooks/useDeleteToken';
import { translate } from '@docusaurus/Translate';

import './delete-token-dialog.scss';

type TDeleteTokenDialogProps = {
  token: TTokenType;
  onClose: () => void;
  isOpen: boolean;
};

const DeleteTokenDialog = ({ token, onClose, isOpen }: TDeleteTokenDialogProps) => {
  const { deleteToken } = useDeleteToken();
  const { deviceType } = useDeviceType();
  const { tokens, updateTokens } = useContext(ApiTokenContext);

  useDisableScroll(isOpen);

  const handleDelete = useCallback(() => {
    deleteToken(token.token);
    updateTokens(tokens.filter((t) => t.token !== token.token));
    onClose();
  }, [onClose, updateTokens, token, deleteToken, tokens]);

  return (
    <Modal
      isOpened={isOpen}
      toggleModal={onClose}
      primaryButtonLabel={translate({ message: 'Yes, delete' })}
      secondaryButtonLabel={translate({ message: 'Cancel' })}
      disableCloseOnOverlay
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      primaryButtonCallback={handleDelete}
      secondaryButtonCallback={onClose}
      showSecondaryButton
      data-testid='delete-token-dialog'
    >
      <div className='modal__icon' style={{ background: 'var(--core-color-solid-red-100)' }}>
        <StandaloneTrashRegularIcon fill='#C40000' iconSize='2xl' />
      </div>
      <div className='modal__content'>
        <h4>{translate({ message: 'Delete token' })}</h4>
        <p>{translate({ message: 'Are you sure you want to delete this token?' })}</p>
      </div>
    </Modal>
  );
};

export default DeleteTokenDialog;
