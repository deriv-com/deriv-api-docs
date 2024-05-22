import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from '@deriv/ui';
import styles from './token-creation-dialog-sucess.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import CopyButton from '../../ApiTokenTable/CopyButton';

type ITokenCreationDialogSuccessProps = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenCreationDialogSuccess = ({
  setToggleModal,
}: ITokenCreationDialogSuccessProps) => {
  const { tokens, lastTokenDisplayName } = useApiToken();
  const [latestToken, setLatestToken] = useState('');
  // const has_admin_scope = cell.row?.original?.scopes?.includes('admin');

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

  useEffect(() => {
    if (tokens.length > 0) {
      tokens.forEach((token) => {
        if (token.display_name.toLowerCase() === lastTokenDisplayName.toLowerCase()) {
          setLatestToken(token.token);
        }
      });
    }
  }, [tokens, lastTokenDisplayName]);

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
            <div className={styles.button_wrapper}>
              <div className={styles.textField}>
                <div>
                  <div className={styles.key}>Key</div>
                  {latestToken}
                </div>
                <CopyButton value={latestToken} has_admin={false} />
              </div>
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
