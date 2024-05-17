import React, { useCallback, useState } from 'react';
import { Button, Modal } from '@deriv/ui';
import styles from './token-creation-dialog-sucess.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';

type ITokenCreationDialogSuccessProps = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  inputTokenName: string;
};

export const TokenCreationDialogSuccess = ({
  setToggleModal,
}: ITokenCreationDialogSuccessProps) => {
  const { tokens } = useApiToken();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setToggleModal(false);
      }
    },
    [setToggleModal],
  );

  const handleToggle = () => {
    setToggleModal(false);
  };

  const latestToken = tokens && tokens.length > 0 ? tokens[0] : null;

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent
            title={'Token created successfully!'}
            has_close_button
            className={styles.wrapper}
          >
            <div className={styles.modal}>
              <p>
                Please save this token key. For security reasons, it can&apos;t be viewed or copied
                again. If you lose this key, you&apos;ll need to generate a new token.
              </p>
            </div>

            <span className={styles.textField}>
              {latestToken && latestToken?.scopes?.includes('admin') && latestToken.token}
            </span>

            <div className={styles.buttonWrapper}>
              <Button color='primary' onClick={handleToggle} className={styles.btn}>
                OK
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default TokenCreationDialogSuccess;
