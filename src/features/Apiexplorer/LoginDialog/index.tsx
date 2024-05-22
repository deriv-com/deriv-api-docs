import React, { useCallback } from 'react';
import { Modal, Button } from '@deriv/ui';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import styles from './LoginDialog.module.scss';
import Translate from '@docusaurus/Translate';

type TLoginDialog = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginDialog = ({ setToggleModal }: TLoginDialog) => {
  const { getUrl } = useLoginUrl();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setToggleModal(false);
    },
    [setToggleModal],
  );

  const handleClick = () => {
    location.assign(getUrl('en'));
  };

  const handleSignUp = () => {
    location.assign('https://deriv.com/signup/');
  };
  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent
            title={'Authorisation required'}
            has_close_button
            className={styles.wrapper}
          >
            <div className={styles.modal}>
              <p>
                <Translate>
                  This API call must be authorised because it requires access to your account
                  information.
                </Translate>
              </p>
              <p>
                <Translate>
                  Log in to your Deriv account to proceed. If you don’t have a Deriv account, sign
                  up first.
                </Translate>
              </p>
            </div>

            <div className={styles.buttonWrapper}>
              <Button color='tertiary' onClick={handleSignUp} className={styles.btn}>
                <Translate>Sign up</Translate>
              </Button>
              <Button color='primary' onClick={handleClick} className={styles.btn}>
                <Translate>Log in</Translate>
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default LoginDialog;
